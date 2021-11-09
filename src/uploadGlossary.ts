import { readFile } from "fs/promises";
import { join } from "path";

import fetch from "node-fetch";

import {
  AddStorageResponse,
  ImportGlossaryResponse,
} from "./interfaces/CrowdinResponses";
import { GlossaryConfig } from "./interfaces/GlossaryConfig";
import { logHandler } from "./utils/logHandler";
import { sleep } from "./utils/sleep";

/**
 * This module posts a glossary CSV to the Crowdin storage API, imports that stored
 * data into the given glossary, then deletes the stored data after import.
 *
 * @param {string} name The name of the glossary to import, e.g. "testing".
 * @param {GlossaryConfig} config The Crowdin-expected config data.
 * @param {number} glossaryId The Crowdin ID of the glossary to update.
 */
export const uploadGlossary = async (
  name: string,
  config: GlossaryConfig,
  glossaryId: number
): Promise<void> => {
  const auth = `Bearer ${process.env.CROWDIN_API}`;

  logHandler.log("debug", `Reading /glossaries/${name}.csv.`);

  const glossaryContents = await readFile(
    join(process.cwd() + `/glossaries/${name}.csv`),
    "utf-8"
  );

  logHandler.log(
    "debug",
    `Found glossary with ${glossaryContents.split("\n").length - 1} entries.`
  );

  logHandler.log("debug", "Uploading to Crowdin storage.");

  const storageUpload = await fetch(
    "https://freecodecamp.crowdin.com/api/v2/storages",
    {
      method: "POST",
      headers: {
        "Crowdin-API-FileName": `${name}.csv`,
        Authorization: auth,
        "Content-Type": "application/octet-stream",
      },
      body: glossaryContents,
    }
  ).catch((err) => {
    logHandler.log("error", `Upload failed with ${err.message}`);
    process.exit(1);
  });

  const storageUploadResponse =
    (await storageUpload.json()) as AddStorageResponse;

  logHandler.log(
    "debug",
    `Uploaded file! Storage ID is ${storageUploadResponse.data.id}`
  );

  config.storageId = storageUploadResponse.data.id;

  const glossaryImport = await fetch(
    `https://freecodecamp.crowdin.com/api/v2/glossaries/${glossaryId}/imports`,
    {
      method: "POST",
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(config),
    }
  ).catch((err) => {
    logHandler.log("error", `Import failed with ${err.message}`);
    process.exit(1);
  });

  const glossaryImportResponse =
    (await glossaryImport.json()) as ImportGlossaryResponse;

  let state = glossaryImportResponse.data.status;
  const importId = glossaryImportResponse.data.identifier;

  logHandler.log("debug", `Import ${importId} started!`);

  while (state === "created") {
    const importStatus = await fetch(
      `https://freecodecamp.crowdin.com/api/v2/glossaries/${glossaryId}/imports/${importId}`,
      {
        method: "GET",
        headers: {
          Authorization: auth,
        },
      }
    );
    const importStatusData =
      (await importStatus.json()) as ImportGlossaryResponse;
    state = importStatusData.data.status;
    logHandler.log(
      "debug",
      `Import ${importId} is ${state} with an ETA of ${importStatusData.data.eta}`
    );
    await sleep(5000);
  }

  logHandler.log("debug", `Import ${importId} finished!`);

  const storageDelete = await fetch(
    `https://freecodecamp.crowdin.com/api/v2/storages/${config.storageId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: auth,
      },
    }
  ).catch((err) => {
    logHandler.log(
      "error",
      `Failed to delete storage ${config.storageId} because ${err.message}`
    );
    process.exit(1);
  });

  if (storageDelete.status === 204) {
    logHandler.log("debug", `Deleted storage ${config.storageId}`);
  } else {
    logHandler.log(
      "error",
      `Failed to delete ${config.storageId} with a status of ${storageDelete.status}`
    );
  }
};

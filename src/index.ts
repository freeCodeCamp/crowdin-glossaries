import { clientOpts, glossaryIds, testingOpts } from "./configs/glossaryOpts";
import { uploadGlossary } from "./uploadGlossary";
import { logHandler } from "./utils/logHandler";

(async () => {
  const fileName = process.argv[2];

  switch (fileName) {
    case "client":
      logHandler.log("debug", `Starting process for ${fileName}.csv.`);
      await uploadGlossary("client", clientOpts, glossaryIds.client);
      break;
    case "curriculum":
      logHandler.log("debug", `Starting process for ${fileName}.csv.`);
      await uploadGlossary("curriculum", testingOpts, glossaryIds.curriculum);
      break;
    case "docs":
      logHandler.log("debug", `Starting process for ${fileName}.csv.`);
      await uploadGlossary("docs", testingOpts, glossaryIds.docs);
      break;
    case "testing":
      logHandler.log("debug", `Starting process for ${fileName}.csv.`);
      await uploadGlossary("testing", testingOpts, glossaryIds.testing);
      break;
    default:
      logHandler.log("error", `${fileName}.csv is not a valid glossary.`);
  }
})();

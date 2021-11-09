import { writeFile } from "fs/promises";
import { join } from "path";

import { languageCodes } from "./configs/languageCodes";
import { logHandler } from "./utils/logHandler";

(async () => {
  const fileName = process.argv[2];
  logHandler.log(
    "debug",
    `Generating new glossary template in /glossaries/${fileName}.csv`
  );
  let str = "";
  let i = 0;
  const config: { [key: string]: number } = {};

  for (const lang in languageCodes) {
    const langCode = languageCodes[lang];
    if (lang === "English") {
      str += `Term:${lang},Description:${lang},Part:${lang},`;
      config[`term_${langCode}`] = i++;
      config[`description_${langCode}`] = i++;
      config[`partOfSpeech_${langCode}`] = i++;
    } else {
      str += `Term:${lang},Description:${lang},`;
      config[`term_${langCode}`] = i++;
      config[`description_${langCode}`] = i++;
    }
  }

  await writeFile(
    join(process.cwd() + `/glossaries/${fileName}.csv`),
    str.slice(0, -1) + "\n",
    "utf-8"
  );

  logHandler.log("debug", "New glossary generated!");

  await writeFile(
    join(process.cwd() + "/glossaries/_config.json"),
    JSON.stringify(config),
    "utf-8"
  );

  logHandler.log(
    "debug",
    "A config file has been generated in /glossaries/_config.json. You can use this for the scheme property of your new glossary's config object."
  );
})();

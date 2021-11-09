import { glossaryIds, testingOpts } from "./configs/glossaryOpts";
import { uploadGlossary } from "./uploadGlossary";
import { logHandler } from "./utils/logHandler";

(async () => {
  const fileName = process.argv[2];

  switch (fileName) {
    case "testing":
      logHandler.log("debug", `Starting process for ${fileName}.csv.`);
      await uploadGlossary("testing", testingOpts, glossaryIds.testing);
      break;
    default:
      logHandler.log("error", `${fileName}.csv is not a valid glossary.`);
  }
})();

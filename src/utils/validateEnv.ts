import { logHandler } from "./logHandler";

/**
 * Quick module to confirm environment values are present.
 */
export const validateEnv = () => {
  if (!process.env.CROWDIN_API) {
    logHandler.log("error", "Missing API key!");
    process.exit(1);
  }
  logHandler.log("debug", "env values are present!");
};

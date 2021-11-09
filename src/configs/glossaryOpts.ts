/* eslint-disable camelcase */
import { GlossaryConfig } from "../interfaces/GlossaryConfig";

import { defaultScheme } from "./defaultScheme";

/**
 * These ID values are obtained from the API, and should not need
 * to be changed unless we either add a new glossary or delete and
 * recreate an existing one.
 */
export const glossaryIds = {
  testing: 20,
  curriculum: 2,
  docs: 8,
  client: 18,
};

export const curriculumOpts = {
  storageId: null,
  firstLineContainsHeader: true,
  scheme: defaultScheme,
};

export const docsOpts = {
  storageId: null,
  firstLineContainsHeader: true,
  scheme: defaultScheme,
};

export const clientOpts = {
  storageId: null,
  firstLineContainsHeader: true,
  scheme: defaultScheme,
};

export const testingOpts: GlossaryConfig = {
  storageId: null,
  firstLineContainsHeader: true,
  scheme: defaultScheme,
};

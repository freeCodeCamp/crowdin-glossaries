/* eslint-disable camelcase */
import { GlossaryConfig } from "../interfaces/GlossaryConfig";

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

export const curriculumOpts = {};

export const docsOpts = {};

export const clientOpts = {};

export const testingOpts: GlossaryConfig = {
  storageId: null,
  firstLineContainsHeader: true,
  scheme: {
    term_en: 0,
    description_en: 1,
    partOfSpeech_en: 2,
    "term_zh-CN": 3,
    "description_zh-CN": 4,
    "partOfSpeech_zh-CN": 5,
    "term_es-EM": 6,
    "description_es-EM": 7,
    "partOfSpeech_es-EM": 8,
    term_ach: 9,
    description_ach: 10,
    partOfSpeech_ach: 11,
  },
};

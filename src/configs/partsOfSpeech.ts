/**
 * This object is a map between:
 * Value saved in glossary -> Value shown in dropdown.
 *
 * For example, if you were editing the glossary on Crowdin's UI,
 * and you set the part of speech to "Adverb", the actual saved value would be ADV.
 *
 * If you are setting a part of speech, refer to the values on the right to determine which
 * code to use, and add the VALUE ON THE LEFT to the CSV.
 */
export const partsOfSpeechMap = {
  NOUN: "Noun",
  VERB: "Verb",
  ADJ: "Adjective",
  PRON: "Pronoun",
  PROPN: "Proper noun",
  DET: "Determiner",
  ADV: "Adverb",
  ADP: "Adposition",
  CCONJ: "Coordinating conjunction",
  SCONJ: "Subordinating conjunction",
  NUM: "Numeral",
  INTJ: "Interjection",
  AUX: "Auxiliary",
  PART: "Particle",
  SYM: "Symbol",
  X: "Other",
};

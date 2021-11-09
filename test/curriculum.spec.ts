import { readFileSync } from "fs";
import { join } from "path";

import { assert } from "chai";

import { testingOpts } from "../src/configs/glossaryOpts";
import { languageCodes } from "../src/configs/languageCodes";
import { partsOfSpeechMap } from "../src/configs/partsOfSpeech";

suite("curriculum.csv validation", () => {
  const data = readFileSync(
    join(process.cwd(), "glossaries/curriculum.csv"),
    "utf-8"
  );

  const [header, ...entries] = data.split("\n");
  const last = entries.pop(); // EOF NL means last line is empty, remove.

  test("file should have a blank line at the end", () => {
    assert.isEmpty(last); // test it just to be sure.
  });

  test("file should start with English", () => {
    const [term, desc, part] = header.split(",");
    assert.equal(term, "Term:English", "First column is not the English term.");
    assert.equal(
      desc,
      "Description:English",
      "Second column is not the English description."
    );
    assert.equal(
      part,
      "Part:English",
      "Third column is not the English part of speech."
    );
  });

  test("header row should match config", () => {
    const columns = header.split(",");
    for (const index in columns) {
      const [rawType, rawLang] = columns[index].split(":");
      const lang = languageCodes[rawLang.replace(/\r/g, "")];
      const type = rawType === "Part" ? "partOfSpeech" : rawType.toLowerCase();
      assert.equal(
        testingOpts.scheme[`${type}_${lang}`],
        parseInt(index),
        `The ${type}_${lang} config index is incorrect.`
      );
    }
  });

  for (const line of entries) {
    const [term, , part] = line.split(",");
    const lineNumber = entries.indexOf(line) + 2;
    test(`Line ${lineNumber} should have an English term`, () => {
      assert.isNotEmpty(term, "The term appears empty.");
    });

    // currently don't require part of speech, but if provided it must be valid.
    if (part) {
      test(`Line ${lineNumber} should have a valid part of speech`, () => {
        assert.include(
          Object.keys(partsOfSpeechMap),
          part,
          `${part} is not a valid part of speech.`
        );
      });
    }
  }
});

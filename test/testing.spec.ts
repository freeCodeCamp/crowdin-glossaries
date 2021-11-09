import { readFileSync } from "fs";
import { join } from "path";

import { assert } from "chai";

import { testingOpts } from "../src/configs/glossaryOpts";
import { partsOfSpeechMap } from "../src/configs/partsOfSpeech";

suite("testing.csv validation", () => {
  const data = readFileSync(
    join(process.cwd(), "glossaries/testing.csv"),
    "utf-8"
  );

  const [header, ...entries] = data.split("\n");
  const last = entries.pop(); // EOF NL means last line is empty, remove.

  test("file should have a blank line at the end", () => {
    assert.isEmpty(last); // test it just to be sure.
  });

  test("file should start with English", () => {
    const [term, desc, part] = header.split(",");
    assert.equal(term, "Term [en]", "First column is not the English term.");
    assert.equal(
      desc,
      "Description [en]",
      "Second column is not the English description."
    );
    assert.equal(
      part,
      "Part of Speech [en]",
      "Third colum is not the English part of speech."
    );
  });

  test("header row should match config", () => {
    const columns = header.split(",");
    for (const index in columns) {
      const rawType = columns[index].split(/\s/);
      console.log(rawType);
      // hacky fallback here for the last one having a newline.
      const rawLang = rawType.pop() || rawType.pop();
      const lang = rawLang.replace(/\[|\]/g, "");
      const type =
        rawType.length > 1 ? "partOfSpeech" : rawType[0].toLowerCase();
      assert.equal(
        testingOpts.scheme[`${type}_${lang}`],
        parseInt(index),
        `The ${type}_${lang} config index is incorrect.`
      );
    }
  });

  for (const line of entries) {
    const [term, , part] = line.split(",");
    const lineNumber = entries.indexOf(line) + 1;
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

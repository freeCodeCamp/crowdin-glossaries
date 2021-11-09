# Crowdin Glossaries

This repository serves as our single source of truth for the Crowdin glossaries. We should no longer be adding terms through the Crowdin interface.

## Editing A Glossary

Glossaries are stored in the `glossaries` directory. Each glossary is a `.csv` file, which is the format Crowdin accepts. To edit a glossary, open the file using your editor of choice. Because these are large files, you might have a better experience with a spreadsheet programme such as OpenOffice.

### Existing Terms

The English form of existing terms is found in the very first column. To add a translation to an existing term, find your language's columns as `Term:<lang>` and `Description:<lang>`. The `Term` column is where your translation should go. The `Description` column is where you can add a description of the term, which Crowdin will display in the translation interface. Your `Description` can be written in your language, it does not have to be written in English.

### New Terms

If you are adding a new term, you will need to add it in a new row. The English form will need the `Term` and `Description`, but will _also_ accept a `Part` in the third column. The `Part` value is not mandatory - if you do not wish to specify the part of speech, leave this blank.

If you DO wish to specify a part of speech, you will need to refer to the `src/configs/partsOfSpeech` file to identify the correct code Crowdin expects for a given part of speech. For example, if I am adding an adjective, I would use `ADJ` in the `Part` column.

### Important Notes

- The `Description` field cannot contain a `,` character, or any line breaks. These will break the tests.

## Creating A Glossary

To add a new glossary to this project, use the `npm run generate` command and pass the name of the glossary. For example, `npm run generate -- nhcarrigan` would create a new CSV template as `glossaries/nhcarrigan.csv`.

This tool will prepare all of the column headers for you so you do not have to manually fill them in, and will include all of our currently supported languages.

Then you can follow the process above to add your terms.

Finally, you'd need to add a new test suite in `test` to cover your glossary, and a new workflow in `.github/workflows` to allow uploading.

## Glossary Details

| Glossary Name    | Crowdin Project                                                         |
| ---------------- | ----------------------------------------------------------------------- |
| `client.csv`     | Learn UI                                                                |
| `curriculum.csv` | Curriculum                                                              |
| `docs.csv`       | Docs                                                                    |
| `testing.csv`    | This is used for a hidden test project to confirm the glossary is valid |

## Questions

If you have any questions, feel free to reach out to @nhcarrigan in our [contributor chat room](https://chat.freecodecamp.org/channel/contributors).

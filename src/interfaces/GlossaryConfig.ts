/**
 * @property {number | null} storageId The storageId value in the /src/configs should
 * be set to `null`. It will be assigned a number dynamically during the upload process.
 * @property {boolean} firstLineContainsHeader This should typically be set to `true`. It would
 * only be set to false if the CSV did not have a header row.
 * @property {object} scheme This one is tricky. This creates a map of the column data to the
 * Crowdin glossary property. The keys represent the Crowdin property, and the values represent
 * the zero-indexed column number of the CSV that matches.
 */
export interface GlossaryConfig {
  storageId: number | null;
  firstLineContainsHeader: boolean;
  scheme: { [key: string]: number };
}

export interface GlossaryConfig {
  storageId: number | null;
  firstLineContainsHeader: boolean;
  scheme: { [key: string]: number };
}

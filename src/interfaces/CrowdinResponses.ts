import { GlossaryConfig } from "./GlossaryConfig";

export interface AddStorageResponse {
  data: {
    id: number;
    fileName: string;
  };
}

export interface ImportGlossaryResponse {
  data: {
    identifier: string;
    status: string;
    progress: number;
    attributes: GlossaryConfig;
    createdAt: string;
    updatedAt: string;
    startedAt: string;
    finishedAt: string;
    eta: string;
  };
}

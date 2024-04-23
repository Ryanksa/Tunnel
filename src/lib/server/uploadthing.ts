import { env } from "$env/dynamic/private";
import { UTApi } from "uploadthing/server";

export const utapi = new UTApi({
  apiKey: env.UPLOADTHING_SECRET,
  defaultKeyType: "customId",
});

export interface FileEsque extends Blob {
  name: string;
  customId?: string;
}

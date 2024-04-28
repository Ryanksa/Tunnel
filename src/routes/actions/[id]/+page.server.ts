import { redirect } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";
import { sql } from "$lib/server/database";
import { utapi, type FileEsque } from "$lib/server/uploadthing";
import { v4 as uuidv4 } from "uuid";

export const actions: Actions = {
  send: async ({ request, params }) => {
    const id = params.id?.toUpperCase();
    const data = await request.formData();

    let file = data.get("file") as FileEsque | null;
    if (file?.size === 0) {
      file = null;
    }

    let fileId;
    if (file) {
      fileId = uuidv4();
    }

    let content = data.get("content")?.toString();
    if (!content) {
      content = file?.name;
    }

    if (!content) {
      throw redirect(303, `/${id}`);
    }

    await sql()`INSERT INTO messages (content, tunnel_id, file_id) VALUES (${content}, ${id}, ${fileId})`;
    if (file) {
      file.customId = fileId;
      await utapi.uploadFiles([file]);
    }

    throw redirect(303, `/${id}`);
  },

  close: async ({ params, fetch }) => {
    await fetch(`/api/${params.id}`, { method: "DELETE" });
    throw redirect(303, "/");
  },
};

export const prerender = false;

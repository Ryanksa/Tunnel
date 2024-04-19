import { redirect, fail } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";
import { sql } from "$lib/server/database";

export const actions: Actions = {
  send: async ({ request, params }) => {
    const data = await request.formData();
    const content = data.get("content")?.toString();

    if (!content) {
      throw redirect(303, `/${params.id}`);
    }

    await sql()`INSERT INTO messages (content, tunnel_id) VALUES (${content}, ${params.id})`;

    throw redirect(303, `/${params.id}`);
  },

  close: async ({ params, fetch }) => {
    await fetch(`/api/${params.id}`, { method: "DELETE" });
    throw redirect(303, "/");
  },
};

export const prerender = false;

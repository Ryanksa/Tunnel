import { error, fail, redirect } from "@sveltejs/kit";
import { client } from "$lib/server/database";
import type { Message } from "$lib/server/database";
import { EXPIRY_SEC } from "$lib/server/utils";

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
  const conn = client.connection();

  const tunnelQuery = conn.execute(
    `
    SELECT created
    FROM tunnels
    WHERE id = ?
    AND created >= NOW() - INTERVAL ? SECOND
    `,
    [params.id, EXPIRY_SEC]
  );

  const messageQuery = conn.execute(
    `
    SELECT id, content
    FROM messages
    WHERE tunnel_id = ?
    ORDER BY id DESC
    `,
    [params.id]
  );

  const results = await Promise.all([tunnelQuery, messageQuery]);

  if (results[0].size === 0) {
    throw error(404, "Not found");
  }

  return {
    id: params.id,
    // @ts-ignore
    created: new Date(results[0].rows[0].created + "Z"),
    // these messages don't have the tunnel_id field
    messages: results[1].rows as Message[],
  };
}

export const actions = {
  send: async ({ request, params }) => {
    const data = await request.formData();
    const content = data.get("content")?.toString();

    if (!content) {
      return fail(400, { content, missing: true });
    }

    const conn = client.connection();
    await conn.execute(
      "INSERT INTO messages (content, tunnel_id) VALUES (?, ?)",
      [content, params.id]
    );
  },
  close: async ({ params }) => {
    const conn = client.connection();
    await conn.execute("DELETE FROM messages WHERE tunnel_id = ?", [params.id]);
    await conn.execute("DELETE FROM tunnels WHERE id = ?", [params.id]);
    throw redirect(303, "/");
  },
};

export const prerender = false;

import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";
import { client } from "$lib/server/database";
import type { Message } from "$lib/server/database";
import { EXPIRY_SEC } from "$lib/server/utils";

export const load = (async ({ params }) => {
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
}) satisfies PageServerLoad;

export const prerender = false;

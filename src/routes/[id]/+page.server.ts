import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";
import { sql } from "$lib/server/database";
import type { Message } from "$lib/server/database";

export const load = (async ({ params }) => {
  const tunnelQuery = sql()`
    SELECT created
    FROM tunnels
    WHERE id = ${params.id}
    AND created >= CURRENT_TIMESTAMP - INTERVAL '60 seconds'
  `;

  const messageQuery = sql()`
    SELECT *
    FROM messages
    WHERE tunnel_id = ${params.id}
    ORDER BY id DESC
  `;

  const [tunnelResults, messageResults] = await Promise.all([
    tunnelQuery,
    messageQuery,
  ]);

  if (tunnelResults.length === 0) {
    throw error(404, "Not found");
  }

  return {
    id: params.id,
    created: new Date(tunnelResults[0].created + "Z"),
    messages: messageResults as Message[],
  };
}) satisfies PageServerLoad;

export const prerender = false;

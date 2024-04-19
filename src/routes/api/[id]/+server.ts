import type { RequestHandler } from "@sveltejs/kit";
import { sql } from "$lib/server/database";

export const DELETE = (async ({ params }) => {
  await sql()`DELETE FROM messages WHERE tunnel_id = ${params.id}`;
  await sql()`DELETE FROM tunnels WHERE id = ${params.id}`;
  return new Response();
}) satisfies RequestHandler;

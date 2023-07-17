import type { RequestHandler } from "@sveltejs/kit";
import { client } from "$lib/server/database";

export const DELETE = (async ({ params }) => {
  const conn = client.connection();
  await conn.execute("DELETE FROM messages WHERE tunnel_id = ?", [params.id]);
  await conn.execute("DELETE FROM tunnels WHERE id = ?", [params.id]);
  return new Response();
}) satisfies RequestHandler;

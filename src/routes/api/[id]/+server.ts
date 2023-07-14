import { client } from "$lib/database";

/** @type {import('./$types').RequestHandler} */
export async function DELETE({ params }) {
  const conn = client.connection();
  await conn.execute("DELETE FROM messages WHERE tunnel_id = ?", [params.id]);
  await conn.execute("DELETE FROM tunnels WHERE id = ?", [params.id]);
  return new Response();
}

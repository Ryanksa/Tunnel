import type { RequestHandler } from "@sveltejs/kit";
import { sql } from "$lib/server/database";
import { utapi } from "$lib/server/uploadthing";

export const DELETE = (async ({ params }) => {
  const id = params.id?.toUpperCase();
  const results =
    await sql()`SELECT file_id FROM messages WHERE tunnel_id = ${id} AND file_id IS NOT NULL`;
  const fileIds = results.map((result) => result.file_id as string);
  await utapi.deleteFiles(fileIds);

  await sql()`DELETE FROM messages WHERE tunnel_id = ${id}`;
  await sql()`DELETE FROM tunnels WHERE id = ${id}`;

  return new Response();
}) satisfies RequestHandler;

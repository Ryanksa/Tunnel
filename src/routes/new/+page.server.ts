import { client } from "$lib/server/database.js";
import { generateId } from "$lib/server/utils.js";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types.js";

export const load = (async () => {
  const id = generateId();

  const conn = client.connection();
  await conn.execute("INSERT INTO tunnels (id) VALUES (?)", [id]);

  throw redirect(303, `/${id}`);
}) satisfies PageServerLoad;

export const prerender = false;

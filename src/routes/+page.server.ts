import { redirect, fail } from "@sveltejs/kit";
import type { Actions } from "@sveltejs/kit";
import { client } from "$lib/server/database";
import type { Tunnel } from "$lib/server/database";
import { generateId, isExpired } from "$lib/server/utils";

export const actions: Actions = {
  create: async () => {
    const id = generateId();

    const conn = client.connection();
    await conn.execute("INSERT INTO tunnels (id) VALUES (?)", [id]);

    throw redirect(303, `/${id}`);
  },
  join: async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id")?.toString();

    if (!id) {
      return fail(400, { id, missing: true });
    }

    const conn = client.connection();
    const results = await conn.execute(
      "SELECT id, created FROM tunnels WHERE id = ?",
      [id]
    );
    if (results.size === 0) {
      return fail(400, { id, incorrect: true });
    }

    const tunnel = results.rows[0] as Tunnel;
    if (isExpired(tunnel)) {
      return fail(400, { id, incorrect: true });
    }

    throw redirect(303, `/${tunnel.id}`);
  },
};

export const prerender = false;

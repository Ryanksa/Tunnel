import { error, redirect, type RequestHandler } from "@sveltejs/kit";
import { utapi } from "$lib/server/uploadthing";

export const GET = (async ({ params }) => {
  if (!params.id) {
    throw error(404);
  }

  const files = await utapi.getFileUrls(params.id);
  if (files.length === 0) {
    throw error(404);
  }

  throw redirect(303, files[0].url);
}) satisfies RequestHandler;

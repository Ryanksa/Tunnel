import type { Config } from "@sveltejs/adapter-vercel";

export const prerender = true;

export const config: Config = {
  runtime: "edge",
};

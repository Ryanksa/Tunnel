import type { Tunnel } from "./database";

const ID_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export const EXPIRY_SEC = 60;
const EXPIRY_MS = EXPIRY_SEC * 1000;

export const generateId = () => {
  let id = "";
  for (let i = 0; i < 6; i++) {
    id += ID_CHARS.charAt(Math.floor(Math.random() * ID_CHARS.length));
  }
  return id;
};

export const isExpired = (tunnel: Tunnel) => {
  const created = new Date(tunnel.created + "Z");
  const expiry = new Date(Date.now() - EXPIRY_MS);
  return created < expiry;
};

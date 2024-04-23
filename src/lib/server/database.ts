import { neon } from "@neondatabase/serverless";
import { DATABASE_URL } from "$env/static/private";

export const sql = () => {
  return neon(DATABASE_URL);
};

/**
  CREATE TABLE tunnels (
    id varchar(6) PRIMARY KEY, 
    created timestamp DEFAULT CURRENT_TIMESTAMP
  );
 */
export type Tunnel = {
  id: string;
  created: string;
};

/**
  CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    content TEXT,
    tunnel_id varchar(6) REFERENCES tunnels(id),
    file_id varchar(36) NULL
  );
 */
export type Message = {
  id: number;
  content: string;
  tunnel_id: string;
  file_id?: string;
};

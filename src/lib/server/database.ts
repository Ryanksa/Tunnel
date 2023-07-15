import { Client } from "@planetscale/database";
import { DATABASE_HOST, DATABASE_USERNAME, DATABASE_PASSWORD } from "$env/static/private";

export const client = new Client({
  host: DATABASE_HOST,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
});

/**
  +---------+------------+------+-----+-------------------+-------------------+
  | Field   | Type       | Null | Key | Default           | Extra             |
  +---------+------------+------+-----+-------------------+-------------------+
  | id      | varchar(6) | NO   | PRI | NULL              |                   |
  | created | datetime   | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
  +---------+------------+------+-----+-------------------+-------------------+
 */
export type Tunnel = {
  id: string;
  created: string;
};

/**
  +-----------+------------+------+-----+---------+----------------+
  | Field     | Type       | Null | Key | Default | Extra          |
  +-----------+------------+------+-----+---------+----------------+
  | id        | int        | NO   | PRI | NULL    | auto_increment |
  | content   | text       | NO   |     | NULL    |                |
  | tunnel_id | varchar(6) | NO   | MUL | NULL    |                |
  +-----------+------------+------+-----+---------+----------------+
 */
export type Message = {
  id: number;
  content: string;
  tunnel_id: string;
};

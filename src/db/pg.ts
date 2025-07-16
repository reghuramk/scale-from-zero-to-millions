import { Pool } from "pg";

const pool = new Pool({
  database: "zero-to-million",
  host: "localhost",
  password: "postgres",
  port: 5432,
  user: "postgres",
});

export default {
  query: (text: string, params?: unknown[]) => pool.query(text, params),
};

import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.PG_URI,
});

export default {
  query: (text: string, params?: unknown[]) => pool.query(text, params),
};

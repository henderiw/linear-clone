import { Pool } from "pg";

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "linearclone",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
});

export async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS issues (
      id SERIAL PRIMARY KEY,
      identifier VARCHAR(10) NOT NULL UNIQUE,
      title VARCHAR(500) NOT NULL,
      description TEXT DEFAULT '',
      status VARCHAR(20) NOT NULL DEFAULT 'backlog',
      priority VARCHAR(20) NOT NULL DEFAULT 'none',
      assignee VARCHAR(100) DEFAULT '',
      labels TEXT[] DEFAULT '{}',
      project VARCHAR(100) DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  // Create a sequence tracker for identifiers
  await pool.query(`
    CREATE TABLE IF NOT EXISTS id_counter (
      prefix VARCHAR(10) PRIMARY KEY,
      counter INTEGER NOT NULL DEFAULT 0
    )
  `);

  // Seed with initial prefix
  await pool.query(`
    INSERT INTO id_counter (prefix, counter)
    VALUES ('SAN', 0)
    ON CONFLICT (prefix) DO NOTHING
  `);
}

export async function getNextIdentifier(): Promise<string> {
  const result = await pool.query(
    `UPDATE id_counter SET counter = counter + 1 WHERE prefix = 'SAN' RETURNING prefix, counter`
  );
  const { prefix, counter } = result.rows[0];
  return `${prefix}-${counter}`;
}

export default pool;

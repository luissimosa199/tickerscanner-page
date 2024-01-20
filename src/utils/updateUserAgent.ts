import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.PG_URI,
});

export const updateUserAgent = async (email: string, user_agent_id: string) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const queryText = `
      UPDATE user_agents
      SET user_id = (
        SELECT id
        FROM users
        WHERE email = $1
      )
      WHERE id = $2;
    `;

    await client.query(queryText, [email, user_agent_id]);

    await client.query("COMMIT");
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

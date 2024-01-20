import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { Client } from "pg";

export async function POST(req: Request) {
  const useCookie = cookies();
  const { userData } = await req.json();
  const newUserAgentId = uuidv4() as string;

  const client = new Client({
    connectionString: process.env.PG_URI,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  await client.connect();

  try {
    await client.query("BEGIN");
    const userId = null;

    await client.query(
      `
    INSERT INTO user_agents (id, user_id)
    VALUES ($1, $2)
  `,
      [newUserAgentId, userId]
    );

    const visitId = uuidv4();
    const timestamp = new Date();
    const { utm_params, entry_point, device, os, browser } = userData;

    await client.query(
      `
    INSERT INTO visits (id, user_agent_id, timestamp, utm_params, entry_point, device, os, browser)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  `,
      [
        visitId,
        newUserAgentId,
        timestamp,
        utm_params,
        entry_point,
        device,
        os,
        browser,
      ]
    );

    await client.query("COMMIT");

    useCookie.set("user_agent_id", newUserAgentId, {
      httpOnly: process.env.NODE_ENV !== "development",
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      sameSite: "strict",
      path: "/",
    });

    return Response.json({ message: "userAgent registered" });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creating UserAgent:", error);
    return Response.json({ error: "Failed to create userAgent" });
  } finally {
    await client.end();
  }
}

export async function PUT(req: Request) {
  const { userData, id } = await req.json();

  const client = new Client({
    connectionString: process.env.PG_URI,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  await client.connect();

  try {
    const visitId = uuidv4();
    const userAgentId = id;
    const timestamp = new Date();
    const { utm_params, entry_point, device, os, browser } = userData;

    await client.query(
      `
      INSERT INTO visits (id, user_agent_id, timestamp, utm_params, entry_point, device, os, browser)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `,
      [
        visitId,
        userAgentId,
        timestamp,
        utm_params,
        entry_point,
        device,
        os,
        browser,
      ]
    );

    return Response.json({ message: "UserAgent updated" });
  } catch (error) {
    console.error("Error updating UserAgent:", error);
    return Response.json({ error: "Failed to update userAgent" });
  } finally {
    await client.end();
  }
}

import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// Use a connection pool instead of a single client
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Connect to the database and handle errors
const main = async () => {
  try {
    await pool.connect(); // connect to the database
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1);
  }
};

main();

const db = drizzle(pool, { schema, logger: true });

export default db;
export { pool };

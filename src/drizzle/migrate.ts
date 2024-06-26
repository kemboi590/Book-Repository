import db, { pool } from "./db";
import { migrate } from "drizzle-orm/node-postgres/migrator";

async function migration() {
  console.log("======Migration Started ======");
  try {
    await migrate(db, { migrationsFolder: __dirname + "/migrations" }); // Run the migration of the database
    console.log("======Migration Ended======");
  } catch (error) {
    console.error("Migration failed", error);
  } finally {
    await pool.end(); // End the pool
    process.exit(0);
  }
}

migration().catch((e) => {
  console.log(e);
  process.exit(1);
});

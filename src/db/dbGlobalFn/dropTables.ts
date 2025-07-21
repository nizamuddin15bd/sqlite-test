import { db } from "../connection";

/**
 * Drops specific tables if provided.
 * If no argument is given, drops all tables in the database.
 * @param tableNames - Optional: single table name or array of table names
 */
export const dropTables = async (tableNames?: string | string[]) => {
  try {
    let tablesToDrop: string[] = [];

    if (!tableNames) {
      // Get all table names from sqlite_master
      const results: { name: string }[] = await db.getAllAsync(
        `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';`
      );
      tablesToDrop = results.map((row) => row.name);
    } else {
      tablesToDrop = Array.isArray(tableNames) ? tableNames : [tableNames];
    }

    if (tablesToDrop.length === 0) {
      console.log("ℹ️ No tables found to drop.");
      return;
    }

    for (const table of tablesToDrop) {
      await db.execAsync(`DROP TABLE IF EXISTS ${table};`);
      console.log(`✅ Dropped table: ${table}`);
    }
  } catch (error) {
    console.error("❌ Error dropping tables:", error);
  }
};

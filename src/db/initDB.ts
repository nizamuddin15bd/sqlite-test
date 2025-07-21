import { createTable } from "./dbGlobalFn/createTable";
import { schemas } from "./schemas";

export const initDB = async () => {
  try {
    // await dropTables(); // Drop tables if they exist
    for (const { tableName, schema } of schemas) {
      await createTable(tableName, schema);
    }
    console.log("✅ All tables initialized.");
  } catch (err) {
    console.error(" Error initializing DB:", err);
  }
};
// initDB()

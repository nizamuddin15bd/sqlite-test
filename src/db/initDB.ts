import { createTable } from "./dbGlobalFn/createTable";
import { schemas } from "./schemas";

export const initDB = async () => {
  try {
    for (const { tableName, schema } of schemas) {
      await createTable(tableName, schema);
    }
    // await dropTables();
    console.log("✅ All tables initialized.");
  } catch (err) {
    console.error(" Error initializing DB:", err);
  }
};
// initDB()

import { db } from "../connection";

export const createTable = async (
  tableName: string,
  columnsAndConstraints: string[]
) => {
  const columnsSql = columnsAndConstraints.join(",\n  ");
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      ${columnsSql}
    );
  `;

  try {
    // await db.execAsync(createTableSQL);
    await db.runAsync(createTableSQL);
    console.log(`Table "${tableName}" created or already exists.`);
  } catch (err) {
    console.error(`Error creating table "${tableName}":`, err);
  }
};

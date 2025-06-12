import { db } from './connection';

export const createTable = async (tableName: string, columnsAndConstraints: string[]) => {
  const columnsSql = columnsAndConstraints.join(",\n  ");
  const createTableSQL = `
    CREATE TABLE IF NOT EXISTS ${tableName} (
      ${columnsSql}
    );
  `;

  try {
    await db.runAsync(createTableSQL);
    console.log(`Table "${tableName}" created or already exists.`);
  } catch (err) {
    console.error(`Error creating table "${tableName}":`, err);
  }
};

export const initDB = async () => {
  try {
    await createTable("courses", [
      "id INTEGER PRIMARY KEY AUTOINCREMENT",
      "name TEXT NOT NULL",
      "fees INTEGER",
    ]);

    await createTable("subjects", [
      "id INTEGER PRIMARY KEY AUTOINCREMENT",
      "name TEXT NOT NULL",
      "course_id INTEGER",
      "FOREIGN KEY(course_id) REFERENCES courses(id)",
    ]);

    console.log("Tables created");
  } catch (err) {
    console.error("Error initializing DB:", err);
  }
};

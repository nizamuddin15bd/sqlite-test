import { createTable } from "./dbGlobalFn/createTable";
import {
  CREATED_AT,
  INTEGER,
  // foreignKey,
  INTEGER_PK,
  TEXT_NOT_NULL,
  UPDATED_AT,
} from "./dbGlobalFn/dbSchemaUtils";

// export const createTable = async (
//   tableName: string,
//   columnsAndConstraints: string[]
// ) => {
//   const columnsSql = columnsAndConstraints.join(",\n  ");
//   const createTableSQL = `
//     CREATE TABLE IF NOT EXISTS ${tableName} (
//       ${columnsSql}
//     );
//   `;

//   try {
//     await db.runAsync(createTableSQL);
//     console.log(`Table "${tableName}" created or already exists.`);
//   } catch (err) {
//     console.error(`Error creating table "${tableName}":`, err);
//   }
// };

// export const initDB = async () => {
//   try {
//     await createTable("courses", [
//       "id INTEGER PRIMARY KEY AUTOINCREMENT",
//       "name TEXT NOT NULL",
//       "fees INTEGER",
//     ]);

//     await createTable("subjects", [
//       "id INTEGER PRIMARY KEY AUTOINCREMENT",
//       "name TEXT NOT NULL",
//       "course_id INTEGER",
//       "FOREIGN KEY(course_id) REFERENCES courses(id)",
//     ]);

//     console.log("Tables created");
//   } catch (err) {
//     console.error("Error initializing DB:", err);
//   }
// };

export const foreignKey = (
  column: string,
  referenceTable: string,
  referenceColumn = "id"
) => `FOREIGN KEY(${column}) REFERENCES ${referenceTable}(${referenceColumn})`;
const courseSchema = [
  `id ${INTEGER_PK}`,
  `name ${TEXT_NOT_NULL}`,
  `fees ${INTEGER}`,
  CREATED_AT,
  UPDATED_AT,
];

const subjectSchema = [
  `id ${INTEGER_PK}`,
  `name ${TEXT_NOT_NULL}`,
  `course_id ${INTEGER}`,
  CREATED_AT,
  UPDATED_AT,
  foreignKey("course_id", "courses"), // Place constraints last
];

async function initDB() {
  try {
    // await db.execAsync("DROP TABLE IF EXISTS subjects;");
    // await db.execAsync("DROP TABLE IF EXISTS courses;");

    await createTable("courses", courseSchema);
    await createTable("subjects", subjectSchema);
  } catch (err) {
    console.error("Error creating tables:", err);
  }
}

initDB();

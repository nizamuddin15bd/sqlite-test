import { db } from './connection';

export const initDB = async () => {
  try {
    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS courses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        fees INTEGER
      );
    `);

    await db.runAsync(`
      CREATE TABLE IF NOT EXISTS subjects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        course_id INTEGER,
        FOREIGN KEY(course_id) REFERENCES courses(id)
      );
    `);

    console.log("Tables created");
  } catch (err) {
    console.error("Error initializing DB:", err);
  }
};

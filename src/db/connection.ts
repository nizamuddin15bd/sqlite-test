import * as SQLite from "expo-sqlite";

// Open the database
export const db = SQLite.openDatabaseSync("studentapp.db");

// Enable foreign key constraints
// db.execAsync("PRAGMA foreign_keys = ON;");

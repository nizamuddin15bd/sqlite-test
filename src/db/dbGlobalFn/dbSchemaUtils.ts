// dbSchemaUtils.ts

// 🧱 Base Types
export const INTEGER = "INTEGER";
export const TEXT = "TEXT";
export const REAL = "REAL";
export const BLOB = "BLOB";
export const NUMERIC = "NUMERIC";
export const UUID = "TEXT NOT NULL UNIQUE";

// 🖼️ Image Fields
export const IMAGE_BLOB = `${BLOB} NOT NULL`;
export const IMAGE_URL = `${TEXT} NOT NULL`;

// 🔒 Constraints
export const PRIMARY_KEY = "PRIMARY KEY";
export const AUTOINCREMENT = "AUTOINCREMENT";
export const NOT_NULL = "NOT NULL";
export const UNIQUE = "UNIQUE";
export const DEFAULT = (value: string | number | boolean) =>
  `DEFAULT ${typeof value === "string" ? `'${value}'` : value}`;
export const CHECK = (expression: string) => `CHECK (${expression})`;
export const COLLATE = (collation: string) => `COLLATE ${collation}`;

// 🧩 Common Definitions
export const INTEGER_PK = `${INTEGER} ${PRIMARY_KEY} ${AUTOINCREMENT}`;
export const TEXT_NOT_NULL = `${TEXT} ${NOT_NULL}`;
export const INTEGER_NOT_NULL = `${INTEGER} ${NOT_NULL}`;
export const REAL_NOT_NULL = `${REAL} ${NOT_NULL}`;
export const BLOB_NOT_NULL = `${BLOB} ${NOT_NULL}`;

// 🌍 Foreign Key
export const foreignKey = (
  column: string,
  referenceTable: string,
  referenceColumn = "id"
) => `FOREIGN KEY(${column}) REFERENCES ${referenceTable}(${referenceColumn})`;

// 🕒 Timestamp Fields
// 🕒 Timestamp Fields (fixed)
// export const CREATED_AT = "created_at TEXT DEFAULT CURRENT_TIMESTAMP";
// export const UPDATED_AT = "updated_at TEXT DEFAULT CURRENT_TIMESTAMP";
export const CREATED_AT = "created_at DATETIME DEFAULT (datetime('now'))";
export const UPDATED_AT = "updated_at DATETIME DEFAULT (datetime('now'))";

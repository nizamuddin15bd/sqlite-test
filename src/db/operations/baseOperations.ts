import { db } from "@/src/db/connection";

// Insert
export const insertData = async ({
  table,
  data,
}: {
  table: string;
  data: Record<string, any>;
}): Promise<{ success: boolean; message: string }> => {
  try {
    const keys = Object.keys(data);
    const placeholders = keys.map(() => "?").join(", ");
    const values = keys.map((k) => data[k]);

    const query = `INSERT INTO ${table} (${keys.join(
      ", "
    )}) VALUES (${placeholders})`;
    await db.runAsync(query, values);

    return { success: true, message: `${table} record inserted.` };
  } catch (err) {
    console.error(`Insert error in ${table}:`, err);
    return { success: false, message: "Insert failed" };
  }
};

// Update
export const updateData = async ({
  table,
  data,
  whereColumn,
  whereValue,
}: {
  table: string;
  data: Record<string, any>;
  whereColumn: string;
  whereValue: any;
}): Promise<{ success: boolean; message: string }> => {
  try {
    const columns = Object.keys(data);
    const setClause = columns.map((col) => `${col} = ?`).join(", ");
    const values = columns.map((key) => data[key]);

    // Add the WHERE value to parameters
    const query = `UPDATE ${table} SET ${setClause} WHERE ${whereColumn} = ?`;

    await db.runAsync(query, [...values, whereValue]);

    return { success: true, message: `${table} record updated` };
  } catch (err) {
    console.error(`Update error in ${table}:`, err);
    return { success: false, message: "Update failed" };
  }
};

// Delete
export const deleteById = async ({
  table,
  id,
}: {
  table: string;
  id: number;
}): Promise<{ success: boolean; message: string }> => {
  try {
    await db.runAsync(`DELETE FROM ${table} WHERE id = ?`, [id]);
    return { success: true, message: `${table} record deleted.` };
  } catch (err) {
    console.error(`Delete error in ${table}:`, err);
    return { success: false, message: "Delete failed" };
  }
};

// Get All
export const getAllData = async <T>(table: string): Promise<T[]> => {
  const result = await db.getAllSync(`SELECT * FROM ${table}`);
  return result as T[];
};

// Get by ID
export const getById = async <T>(
  table: string,
  id: number
): Promise<T | null> => {
  const result = await db.getAllSync(`SELECT * FROM ${table} WHERE id = ?`, [
    id,
  ]);
  return (result[0] as T) ?? null;
};

// Get single by column
export const getSingleRecordByColumn = async <T>(
  table: string,
  column: string,
  value: any
): Promise<T | null> => {
  const result = await db.getAllSync(
    `SELECT * FROM ${table} WHERE ${column} = ?`,
    [value]
  );
  return (result[0] as T) ?? null;
};

// Get SUM
export const getSumByColumn = async (
  table: string,
  column: string
): Promise<number> => {
  const result = await db.getAllSync<{ total: number }>(
    `SELECT SUM(${column}) as total FROM ${table}`
  );
  return result?.[0]?.total ?? 0;
};

// Search
export const searchByColumn = async <T>(
  table: string,
  column: string,
  query: string
): Promise<T[]> => {
  const result = await db.getAllSync(
    `SELECT * FROM ${table} WHERE ${column} LIKE ?`,
    [`${query}%`]
  );
  return result as T[];
};

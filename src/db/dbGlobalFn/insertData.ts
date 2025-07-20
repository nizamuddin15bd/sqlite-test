import { db } from "../connection";

export const insertData = async ({
  table,
  data,
}: {
  table: string;
  data: Record<string, any>;
}): Promise<{ success: boolean; message: string }> => {
  try {
    const columns = Object.keys(data);
    const placeholders = columns.map(() => "?").join(", ");
    const values = columns.map((key) => data[key]);

    const query = `INSERT INTO ${table} (${columns.join(
      ", "
    )}) VALUES (${placeholders})`;

    await db.runAsync(query, values);

    return { success: true, message: `${table} record inserted` };
  } catch (err: any) {
    if (err?.message?.includes("UNIQUE constraint failed")) {
      return {
        success: false,
        message: "A record with the same unique field already exists.",
      };
    }
    console.error(`Insert error in ${table}:`, err);
    return { success: false, message: "Insert failed" };
  }
};

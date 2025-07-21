// createInsertData.ts
import { db } from "../connection";

export const createInsertData = async ({
  table,
  data,
}: {
  table: string;
  data: Record<string, any>;
}): Promise<{ success: boolean; message?: string }> => {
  try {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => "?").join(", ");

    const query = `INSERT INTO ${table} (${keys.join(
      ", "
    )}) VALUES (${placeholders})`;
    await db.runAsync(query, values);

    return { success: true, message: `${table} record created` };
  } catch (err: any) {
    console.error(`Insert error in ${table}:`, err);
    return { success: false, message: err?.message ?? "Insert failed" };
  }
};

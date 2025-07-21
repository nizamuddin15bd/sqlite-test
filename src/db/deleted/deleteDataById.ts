// deleteDataById.ts
import { db } from "../connection";

export const deleteDataById = async ({
  table,
  id,
}: {
  table: string;
  id: number;
}): Promise<{ success: boolean; message?: string }> => {
  try {
    await db.runAsync(`DELETE FROM ${table} WHERE id = ?`, [id]);
    return { success: true };
  } catch (error: any) {
    console.error(`Delete failed for table ${table}:`, error);
    return { success: false, message: error?.message ?? "Unknown error" };
  }
};

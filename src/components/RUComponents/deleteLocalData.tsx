import { db } from "@/src/db/connection";

export const deleteLocalData = async ({
  table,
  id,
}: {
  table: string;
  id: number | string;
}) => {
  try {
    const query = `DELETE FROM ${table} WHERE id = ?`;
    await db.runAsync(query, [id]);
    console.log(`${table} row with id=${id} deleted`);
    return { success: true };
  } catch (err) {
    console.error(`Error deleting from ${table}:`, err);
    return { success: false, message: "Local delete failed" };
  }
};

import { db } from "../connection";

export const updateData = async ({
  table,
  data,
  id,
}: {
  table: string;
  data: Record<string, any>;
  id: number;
}): Promise<{ success: boolean; message: string }> => {
  try {
    const columns = Object.keys(data);
    const values = Object.values(data);

    const setClause = columns.map((col) => `${col} = ?`).join(", ");
    const query = `UPDATE ${table} SET ${setClause} WHERE id = ?`;

    await db.runAsync(query, [...values, id]);

    return { success: true, message: `${table} record updated` };
  } catch (err: any) {
    console.error(`Update error in ${table}:`, err);
    return { success: false, message: "Update failed" };
  }
};

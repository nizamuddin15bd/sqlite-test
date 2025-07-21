// handleLocalDeleteData.ts
import { deleteDataById } from "./deleteDataById";

export const handleLocalDeleteData = async ({
  route,
  id,
}: {
  route: string;
  id: number;
}): Promise<{ success: boolean; message?: string }> => {
  try {
    const table = route.replace("/", ""); // e.g., "/courses" → "courses"
    return await deleteDataById({ table, id });
  } catch (err: any) {
    console.error("handleLocalDeleteData error:", err);
    return { success: false, message: err?.message ?? "Local delete failed" };
  }
};

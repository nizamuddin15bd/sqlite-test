// handleLocalPostData.ts
import { createInsertData } from "./createInsertData";

export const handleLocalPostData = async ({
  route,
  data,
  formatted,
  dataType,
}: {
  route: string;
  data: FormData | Record<string, any>;
  formatted?: boolean;
  dataType?: "json" | "formData";
}): Promise<{ success: boolean; message?: string }> => {
  try {
    const resolvedDataType =
      dataType ?? (formatted === true ? "formData" : "json");

    let parsedData: Record<string, any> = {};

    if (resolvedDataType === "formData" && data instanceof FormData) {
      data.forEach((value, key) => {
        parsedData[key] = value;
      });
    } else if (typeof data === "object") {
      parsedData = data;
    }

    const table = route.replace("/", ""); // e.g., "/courses" → "courses"

    const result = await createInsertData({ table, data: parsedData });
    return result;
  } catch (err: any) {
    console.error("handleLocalPostData error:", err);
    return { success: false, message: err?.message ?? "Local insert failed" };
  }
};

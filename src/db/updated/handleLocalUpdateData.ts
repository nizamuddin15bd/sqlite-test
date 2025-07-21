import { updateData } from "./updateData";

export const handleLocalUpdateData = async ({
  route,
  data,
  id,
  dataType,
  formatted,
}: {
  route: string;
  data: FormData | Record<string, any>;
  id: number;
  dataType?: "json" | "formData";
  formatted?: boolean;
}) => {
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

    return await updateData({ table, data: parsedData, id });
  } catch (err) {
    console.error("handleLocalUpdateData error:", err);
    return { success: false, message: "Local update failed" };
  }
};

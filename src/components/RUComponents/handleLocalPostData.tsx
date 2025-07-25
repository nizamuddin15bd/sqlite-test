import { createInsertData } from "@/src/db/created/createInsertData";

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

    // Removed duplicate check here

    return await createInsertData({ table, data: parsedData });
  } catch (err) {
    console.error("handleLocalPostData error:", err);
    return { success: false, message: "Local insert failed" };
  }
};

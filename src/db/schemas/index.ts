import { courseSchema } from "./courseSchema";
import { subjectSchema } from "./subjectSchema";

export const schemas = [
  { tableName: "courses", schema: courseSchema },
  { tableName: "subjects", schema: subjectSchema },
];

import { dbRName } from "../operations/utils";
import { courseSchema } from "./courseSchema";
import { subjectSchema } from "./subjectSchema";

export const schemas = [
  { tableName: `${dbRName?.courses}`, schema: courseSchema },
  { tableName: `${dbRName?.subjects}`, schema: subjectSchema },
];

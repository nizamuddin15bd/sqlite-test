import {
  CREATED_AT,
  foreignKey,
  INTEGER,
  INTEGER_PK,
  TEXT_NOT_NULL,
  UPDATED_AT,
} from "../dbGlobalFn/dbSchemaUtils";

export const subjectSchema = [
  `id ${INTEGER_PK}`,
  `name ${TEXT_NOT_NULL}`,
  `course_id ${INTEGER}`,
  CREATED_AT,
  UPDATED_AT,
  foreignKey("course_id", "courses"), // Place constraints last
];

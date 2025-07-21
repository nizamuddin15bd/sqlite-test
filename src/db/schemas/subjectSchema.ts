import {
  CREATED_AT,
  foreignKey,
  INTEGER,
  INTEGER_PK,
  NOT_NULL,
  TEXT_NOT_NULL,
  UPDATED_AT,
} from "../dbGlobalFn/dbSchemaUtils";

export const subjectSchema = [
  `id ${INTEGER_PK}`,
  `name ${TEXT_NOT_NULL}`,
  `course_id ${INTEGER} ${NOT_NULL}`, // ✅ define the column
  `course_name ${TEXT_NOT_NULL}`, // ✅ define the column
  CREATED_AT,
  UPDATED_AT,
  foreignKey("course_id", "courses"), // ✅ create the relation
];

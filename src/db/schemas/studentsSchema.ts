import {
  CREATED_AT,
  foreignKey,
  INTEGER,
  INTEGER_PK,
  TEXT_NOT_NULL,
  UNIQUE_NOT_NULL,
  UPDATED_AT,
} from "../dbGlobalFn/dbSchemaUtils";
import { studentsProps } from "../operations/utils";

export const studentsSchema = [
  `${studentsProps?.id} ${INTEGER_PK}`,
  `${studentsProps?.name} ${TEXT_NOT_NULL}`,
  `${studentsProps?.email} ${UNIQUE_NOT_NULL}`,
  `${studentsProps?.password} ${TEXT_NOT_NULL}`,
  `${studentsProps?.course_id} ${INTEGER}`,
  CREATED_AT,
  UPDATED_AT,
  foreignKey("course_id", "courses"),
  //   foreignKey("course_id", "courses(id)"),
];

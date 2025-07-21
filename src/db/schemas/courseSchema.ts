import {
  CREATED_AT,
  INTEGER,
  INTEGER_PK,
  TEXT_NOT_NULL,
  UPDATED_AT,
} from "../dbGlobalFn/dbSchemaUtils";

export const courseSchema = [
  `id ${INTEGER_PK}`,
  `name ${TEXT_NOT_NULL}`,
  `fees ${INTEGER}`,
  CREATED_AT,
  UPDATED_AT,
];

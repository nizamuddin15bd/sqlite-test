// schemaBuilder.ts

export const buildSchema = (fields: string[]): string =>
  `(${fields.join(", ")})`;

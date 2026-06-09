import { z } from "zod";

/**
 * Column Schema
 */
const ColumnSchema = z.string().trim().min(1, "Column name cannot be empty");

/**
 * Table Schema
 */
const TableSchema = z
  .object({
    name: z.string().trim().min(1, "Table name is required"),
    cols: z.array(ColumnSchema).min(1, "A table must have at least one column"),
  })
  .refine((table) => new Set(table.cols).size === table.cols.length, {
    message: "Duplicate column names are not allowed",
    path: ["cols"],
  });

/**
 * Database Schema
 */
const DatabaseSchema = z
  .object({
    databaseName: z
      .string()
      .trim()
      .min(4, "Database name must be at least 4 characters long"),

    tables: z
      .array(TableSchema)
      .min(1, "Database must contain at least one table"),
  })
  .refine(
    (db) => {
      const tableNames = db.tables.map((table) => table.name);
      return new Set(tableNames).size === tableNames.length;
    },
    {
      message: "Duplicate table names are not allowed",
      path: ["tables"],
    },
  );

/**
 * Multiple Databases Schema
 */
const DBSchema = z.array(DatabaseSchema);

/**
 * Types
 */
export type Column = z.infer<typeof ColumnSchema>;
export type Table = z.infer<typeof TableSchema>;
export type Database = z.infer<typeof DatabaseSchema>;
export type Databases = z.infer<typeof DBSchema>;

export { ColumnSchema, TableSchema, DatabaseSchema, DBSchema };

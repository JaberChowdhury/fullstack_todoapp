import { join } from "node:path";
const tablepathbuilder = (database: string, table: string) => {
  const rootDbsPath = join(process.cwd(), "dbs");
  const dbPath = join(rootDbsPath, database);
  const table_path = dbPath + "/" + table + ".json";
  return table_path;
};
export { tablepathbuilder };

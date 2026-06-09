import { tablepathbuilder } from "../lib/tablepathbuilder";
const readTable = async (database: string, table: string) => {
  const table_path = tablepathbuilder(database, table);
  const data = await Bun.file(table_path).json();
  return data;
};

export { readTable };

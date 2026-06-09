import { tablepathbuilder } from "../lib/tablepathbuilder";

const writeTable = async (
  database: string,
  table: string,
  data: Record<string, string>[],
) => {
  const table_path = tablepathbuilder(database, table);
  const current_data_as_json = await Bun.file(table_path).json();
  const current_data = await JSON.parse(current_data_as_json);
  current_data.push(data);
  return true; // !!!!!
};

export { writeTable };

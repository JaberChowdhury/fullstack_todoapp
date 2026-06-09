import { tablepathbuilder } from "../lib/tablepathbuilder";

const writeTable = async (
  database: string,
  table: string,
  data: Record<string, any>,
) => {
  const table_path = tablepathbuilder(database, table);
  const current_data = await Bun.file(table_path).json();
  
  if (!current_data.data) {
    current_data.data = [];
  }
  
  current_data.data.push(data);
  await Bun.write(table_path, JSON.stringify(current_data, null, 2));
  return true;
};

export { writeTable };

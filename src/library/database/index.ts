import { init } from "./services/init";
import { readTable } from "./services/readTable";
import { writeTable } from "./services/writeTable";
import { setTableData } from "./services/setTableData";

class filedb {
  init = init;
  readTable = readTable;
  writeTable = writeTable;
  setTableData = setTableData;
}

export { filedb };

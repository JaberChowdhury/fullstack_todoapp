import { init } from "./services/init";
import { readTable } from "./services/readTable";
import { writeTable } from "./services/writeTable";
class filedb {
  init = init;
  readTable = readTable;
  writeTable = writeTable;
}

export { filedb };

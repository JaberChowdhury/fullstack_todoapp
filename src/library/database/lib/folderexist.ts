import { stat } from "node:fs/promises";
const folderexist = async (dirpath: string): Promise<boolean> => {
  try {
    const result = await stat(dirpath);
    return result.isDirectory();
  } catch (error) {
    return false;
  }
};
export default folderexist;

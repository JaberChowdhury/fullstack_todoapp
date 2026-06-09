import { mkdir } from "node:fs/promises";
import { join } from "node:path";

import folderexist from "../lib/folderexist";
import type { Database } from "../scheme/scheme";

const init = async (dbScheme: Database): Promise<void> => {
  const currentPath = import.meta.dir;

  const rootDbsPath = join(currentPath, "dbs");
  const dbPath = join(rootDbsPath, dbScheme.databaseName);

  // Ensure root dbs folder exists
  const rootDbDirExists = await folderexist(rootDbsPath);

  if (!rootDbDirExists) {
    await mkdir(rootDbsPath, { recursive: true });
    console.info("Root databases directory created");
  } else {
    console.info("Root databases directory already exists");
  }

  // Ensure database folder exists
  const dbDirExists = await folderexist(dbPath);

  if (!dbDirExists) {
    await mkdir(dbPath, { recursive: true });
    console.info(`Database '${dbScheme.databaseName}' created`);
  } else {
    console.info(`Database '${dbScheme.databaseName}' already exists`);
  }

  // Create table files
  for (const table of dbScheme.tables) {
    const tablePath = join(dbPath, `${table.name}.json`);

    const tableExists = await Bun.file(tablePath).exists();

    if (!tableExists) {
      await Bun.write(
        tablePath,
        // JSON.stringify(
        //   {
        //     tableName: table.name,
        //     columns: table.cols,
        //     data: [],
        //   },
        //   null,
        //   2,
        // ),
        "",
      );

      console.info(`Table '${table.name}' created`);
    } else {
      console.info(`Table '${table.name}' already exists`);
    }
  }
};

export { init };

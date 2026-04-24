import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// Ensure database folder exists
const dbFolder = path.join(process.cwd(), "database");
if (!fs.existsSync(dbFolder)) {
  fs.mkdirSync(dbFolder);
}

const dbPath = path.join(dbFolder, "database.sqlite");

// Open SQLite database
const db = new Database(dbPath);

// Enable foreign keys
db.pragma("foreign_keys = ON");

export default db;

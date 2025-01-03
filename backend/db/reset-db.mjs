import { promises as fs } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { User } from '../models/user.mjs';

const DB_FILE = 'db.json';
const DB_DIR = dirname(fileURLToPath(import.meta.url));
const fileName = resolve(DB_DIR, DB_FILE);

try {
  await fs.rm(fileName);
} catch (error) {
  if (error.code !== 'ENOENT') {
    log(error);
    process.exit(1);
  }
}

const currentDir = dirname(fileURLToPath(import.meta.url));
const usersJson = resolve(currentDir, 'reset', 'users.json');

const users = JSON.parse(await fs.readFile(usersJson));

log('Adding users to database');
let userCount = 0;

for (const data of users) {
  try {
    const user = new User(data);
    await user.save();
    userCount += 1;
  } catch (error) {
    log('%O', error.details);
  }
}

log('Added %d/%d users to database', userCount, users.length);

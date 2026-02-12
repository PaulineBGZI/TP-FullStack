import fs from 'fs';
import path from 'path';
import pool from './db.js';

const waitForDb = async (retries = 30, delayMs = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await pool.query('SELECT 1');
      return;
    } catch (err) {
      console.log(`DB not ready yet (attempt ${i + 1}/${retries}), retrying in ${delayMs}ms...`);
      await new Promise((r) => setTimeout(r, delayMs));
    }
  }
  throw new Error('Database did not become available in time');
};


(async function run() {
  try {
    await waitForDb();
    const sqlPath = path.resolve(__dirname, '..', 'migrations', 'create_commands_table.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    console.log('Running migration...');
    await pool.query(sql);
    console.log('Commands migration finished');
    await pool.end();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();

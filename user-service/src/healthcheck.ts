import { Client } from "pg";

async function testDb() {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  await client.query("SELECT 1;");
  await client.end();
  console.log("DB OK");
}

testDb().catch(err => {
  console.error(err);
  process.exit(1);
});
console.log("DB connection test completed.");
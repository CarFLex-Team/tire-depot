import { Pool } from "pg";

declare global {
  var pgCarsPool: Pool | undefined;
}

const carsPool =
  global.pgCarsPool ??
  new Pool({
    connectionString: process.env.DATABASECARS_URL,
    ssl: { rejectUnauthorized: false },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 20000,
  });

if (!global.pgCarsPool) global.pgCarsPool = carsPool;

export default carsPool;

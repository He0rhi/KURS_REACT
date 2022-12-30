import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  password: "135790Egor",
  host: "localhost",
  port: 5432,
  database: "shopreact",
});

export default pool;

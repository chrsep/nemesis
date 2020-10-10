import { Pool } from "pg"

const pgPool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT ?? "5432", 10),
  max: parseInt(process.env.MAX_CLIENTS ?? "10", 10),
  ssl: process.env.NODE_ENV === "production" && {
    cert: process.env.PG_CERT,
    rejectUnauthorized: false,
  },
})

pgPool.on("error", (err) => {
  console.error("Unexpected error in PostgresSQL connection pool", err)
})

import { Pool } from "pg"
import { ConcertEvent } from "../domain"

const pgPool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: parseInt(process.env.PG_PORT ?? "5432", 10),
  max: parseInt(process.env.MAX_CLIENTS ?? "10", 10),
  ssl: {
    rejectUnauthorized: false,
  },
})

pgPool.on("error", (err) => {
  console.error("Unexpected error in PostgresSQL connection pool", err)
})

const query = async (sql: string, params: string[]) => {
  const client = await pgPool.connect()
  try {
    return await client.query(sql, params)
  } finally {
    client.release()
  }
}

export const insertUser = async (
  id: string,
  email: string,
  name: string,
  role: string
) => {
  try {
    // language=PostgreSQL
    await query(`BEGIN TRANSACTION`, [])
    await query(
      `
          insert into users (id, email, name, role)
          values ($1, $2, $3, $4)
      `,
      [id, email, name, role]
    )
    return true
  } catch (e) {
    await query(`ROLLBACK`, [])
    throw e
  }
}

export const listEvents = async (): Promise<ConcertEvent[]> => {
  // language=PostgreSQL
  const result = await query(
    `
        select *
        from events s
    `,
    []
  )
  return result.rows
}

export const listEventIds = async (): Promise<{ id: string }[]> => {
  // language=PostgreSQL
  const result = await query(
    `
        select id 
        from events s
    `,
    []
  )
  return result.rows
}

export const findEventsById = async (id: string): Promise<ConcertEvent> => {
  // language=PostgreSQL
  const result = await query(
    `
        select *
        from events e
        where e.id = $1
    `,
    [id]
  )
  return result.rows[0]
}

export const insertEvent = async (
  name: string,
  date: string,
  totalTickets: string
) => {
  try {
    // language=PostgreSQL
    await query(`BEGIN TRANSACTION`, [])
    await query(
      `
          insert into events (name,date,totalTickets)
          values ($1, $2,$3)
      `,
      [name, date, totalTickets]
    )
    return true
  } catch (e) {
    await query(`ROLLBACK`, [])
    throw e
  }
}

export const updateEventAttendance = async (id: string, attendance: string) => {
  // language=PostgreSQL
  const result = await query(
    `
        update events
        set attendance = $1
        where id = $2
    `,
    [attendance, id]
  )
  return result.rowCount
}

export const updateEventTicketSold = async (
  id: string,
  ticketsSold: string
) => {
  // language=PostgreSQL
  const result = await query(
    `
        update events
        set ticketsSold = $1
        where id = $2
    `,
    [ticketsSold, id]
  )
  return result.rowCount
}

export const insertOrder = async (
  userId: string,
  eventId: string,
  price: string
) => {
  try {
    // language=PostgreSQL
    await query(`BEGIN TRANSACTION`, [])
    await query(
      `
          insert into orders (userId,eventId,price,buyDate)
          values ($1,$2,$3,NOW())
      `,
      [userId, eventId, price]
    )
    return true
  } catch (e) {
    await query(`ROLLBACK`, [])
    throw e
  }
}

export const getOrderByUser = async (userId: string) => {
  const order = await query(
    `
          select * from  orders
          where userId = $1
      `,
    [userId]
  )
  return order
}

export const getOrderById = async (id: string) => {
  const order = await query(
    `
          select * from  orders
          where id = $1
      `,
    [id]
  )
  return order
}

export const deleteOrder = async (id: string) => {
  // language=PostgreSQL
  const result = await query(
    `
        delete from orders
        where id = $2
    `,
    [id]
  )
  return result.rowCount
}

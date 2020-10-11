import { Pool } from "pg"
import dayjs from "dayjs"
import { ConcertEvent, OrderData } from "../domain"

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

const query = async (sql: string, params: Array<string | number>) => {
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
          ON CONFLICT (id) DO NOTHING
      `,
      [id, email, name, role]
    )
    await query(`COMMIT TRANSACTION`, [])
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
        order by "startTime" desc
    `,
    []
  )

  return result.rows.map((row) => {
    return {
      ...row,
      startTime: dayjs(row.startTime).toISOString(),
      endTime: dayjs(row.endTime).toISOString(),
    }
  })
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

export const listUpcomingEvents = async (): Promise<{ id: string }[]> => {
  // language=PostgreSQL
  const result = await query(
    `
        select *
        from events s
        where "startTime" > now()
        order by "startTime" desc
    `,
    []
  )
  return result.rows.map((row) => {
    return {
      ...row,
      startTime: dayjs(row.startTime).toISOString(),
      endTime: dayjs(row.endTime).toISOString(),
    }
  })
}

export const listPastEvents = async (): Promise<{ id: string }[]> => {
  // language=PostgreSQL
  const result = await query(
    `
        select *
        from events s
        where "startTime" < now()
        order by "startTime" desc
    `,
    []
  )
  return result.rows.map((row) => {
    return {
      ...row,
      startTime: dayjs(row.startTime).toISOString(),
      endTime: dayjs(row.endTime).toISOString(),
    }
  })
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
  return {
    ...result.rows[0],
    startTime: dayjs(result.rows[0].startTime).toISOString(),
    endTime: dayjs(result.rows[0].endTime).toISOString(),
  }
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
        set "ticketsSold" = $1
        where id = $2
    `,
    [ticketsSold, id]
  )
  return result.rowCount
}

export const insertOrder = async (userId: string, eventId: string) => {
  try {
    const event = await findEventsById(eventId)
    // language=PostgreSQL
    await query(`BEGIN TRANSACTION`, [])
    await query(
      `
          insert into orders ("userId", "eventId", "price", "buyDate")
          values ($1, $2, $3, now())
      `,
      [userId, eventId, event.price]
    )
    await query(`COMMIT TRANSACTION`, [])
    return true
  } catch (e) {
    await query(`ROLLBACK`, [])
    throw e
  }
}

export const getOrderByUser = async (userId: string): Promise<OrderData[]> => {
  const result = await query(
    `
          select * from  orders
          where userId = $1
      `,
    [userId]
  )
  return result.rows
}

export const getOrderById = async (id: string): Promise<OrderData[]> => {
  const result = await query(
    `
          select * from  orders
          where id = $1
      `,
    [Number(id)]
  )
  return result.rows
}

export const deleteOrder = async (id: string) => {
  // language=PostgreSQL
  const result = await query(
    `
        delete
        from orders
        where id = $2
    `,
    [Number(id)]
  )
  return result.rowCount
}

export const listDailyRevenues = async (id?: number) => {
  if (id === undefined) {
    const order = await query(
      `
          select sum(orders.price), date_trunc('day', orders."buyDate")
          from orders
          group by date_trunc('day', orders."buyDate")
      `,
      []
    )
    return order.rows.map((row) => {
      return { date: dayjs(row.data).toISOString() }
    })
  }

  const order = await query(
    `
          select sum(orders.price), orders."buyDate"
          from orders
          where "eventId"=$1
          group by orders."buyDate"
      `,
    [id]
  )
  return order.rows.map((row) => {
    return { date: dayjs(row.data).toISOString() }
  })
}

export const listMonthlyRevenues = async (id?: number) => {
  if (id === undefined) {
    const result = await query(
      `
        select to_char("buyDate",'Mon') as mon,
               extract(year from "buyDate") as yyyy,
               sum(orders.price)
        from orders
        group by 1,2;
    `,
      []
    )
    return result.rows.map((row) => {
      return { date: dayjs(row.data).toISOString() }
    })
  }

  const result = await query(
    `
        select to_char("buyDate",'Mon') as mon,
               extract(year from "buyDate") as yyyy,
               sum(orders.price)
        from orders
        where "eventId"=$1
        group by 1,2;
    `,
    [id]
  )
  return result.rows.map((row) => {
    return { date: dayjs(row.data).toISOString() }
  })
}

export const listMonthlyTicketSold = async (id?: number) => {
  if (id === undefined) {
    const result = await query(
      `
        select to_char("buyDate",'Mon') as mon,
               extract(year from "buyDate") as yyyy,
               count(*) as ticketsold
        from orders
        group by 1,2;
    `,
      []
    )
    return result.rows.map((row) => {
      return { date: dayjs(row.data).toISOString() }
    })
  }

  const result = await query(
    `
        select to_char("buyDate",'Mon') as mon,
               extract(year from "buyDate") as yyyy,
               count(*) as ticketsold
        from orders
        where "eventId"=$1
        group by 1,2;
    `,
    [id]
  )
  return result.rows.map((row) => {
    return { date: dayjs(row.data).toISOString() }
  })
}

export const listDailyTicketSold = async (id?: number) => {
  if (id === undefined) {
    const result = await query(
      `
          select count(*), date_trunc('day', orders."buyDate")
          from orders
          group by date_trunc('day', orders."buyDate")
      `,
      []
    )
    return result.rows.map((row) => {
      return { date: dayjs(row.data).toISOString() }
    })
  }

  const result = await query(
    `
          select count(*), date_trunc('day', orders."buyDate")
          from orders
          where "eventId"=$1
          group by date_trunc('day', orders."buyDate")
      `,
    [id]
  )
  return result.rows.map((row) => {
    return { date: dayjs(row.data).toISOString() }
  })
}

export const listUserUpcomingEvents = async (userId: string) => {
  // language=PostgreSQL
  const result = await query(
    `
          select e.id 
          from orders as o
          join events e on o.price = e.price
          where o."userId" = $1 and e."startTime" > now()
      `,
    [userId]
  )
  return result.rows
}

export const insertNewLivestream = async (
  eventId: string,
  livestreamId: string,
  streamKey: string,
  playbackId: string
) => {
  // language=PostgreSQL
  await query(`BEGIN TRANSACTION`, [])
  await query(
    `
          insert into livestream ("id", "streamKey", "playbackId", "eventId")
          values ($1, $2, $3, $4)
      `,
    [livestreamId, streamKey, playbackId, eventId]
  )
  return query(`COMMIT TRANSACTION`, [])
}

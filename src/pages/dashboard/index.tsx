import React, { FC } from "react"
import { Heading } from "theme-ui"
import DashboardPage from "../../components/dashboardPage"
import { listDailyRevenues, listEvents } from "../../db"
import { ConcertEvent } from "../../domain"

interface Props {
  events: ConcertEvent[]
  topThree: ConcertEvent[]
  revenues: Array<{
    date: string
    revenue: number
  }>
}
const Dashboard: FC<Props> = ({ events, topThree, revenues }) => {
  return (
    <div>
      <Heading sx={{ fontSize: 5, fontWeight: 900 }} px={3} pt={4} pb={2}>
        Dashboard
      </Heading>
      <DashboardPage events={events} topThree={topThree} revenues={revenues} />
    </div>
  )
}

export async function getStaticProps() {
  const events = await listEvents()
  const revenues = await listDailyRevenues()

  const sortByRevenue = [...events]
    .map((el) => ({ ...el, revenue: el.ticketsSold * el.price }))
    .sort((a, b) => {
      return b.revenue - a.revenue
    })
  return {
    props: {
      events,
      topThree: [sortByRevenue[0], sortByRevenue[1], sortByRevenue[2]],
      revenues,
    },
    // we will attempt to re-generate the page:
    // - when a request comes in
    // - at most once every second
    revalidate: 1,
  }
}

export default Dashboard

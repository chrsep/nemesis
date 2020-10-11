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
      <Heading sx={{ fontSize: 5 }} p={3}>
        Dashboard
      </Heading>
      <DashboardPage events={events} topThree={topThree} revenues={revenues} />
    </div>
  )
}

export async function getStaticProps() {
  const events = await listEvents()
  const revenues = await listDailyRevenues()

  const sortByRevenue = [...events].sort((a, b) => {
    return a.ticketsSold * a.price - b.ticketsSold * b.price
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

import React, { FC } from "react"
import { Heading } from "theme-ui"
import DashboardPage from "../../components/dashboardPage"
import { listEvents } from "../../db"
import { ConcertEvent } from "../../domain"

interface Props {
  events: ConcertEvent[]
}
const Dashboard: FC<Props> = ({ events }) => {
  return (
    <div>
      <Heading sx={{ fontSize: 5 }} p={3}>
        Dashboard
      </Heading>
      <DashboardPage events={events} />
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      events: await listEvents(),
    },
    // we will attempt to re-generate the page:
    // - when a request comes in
    // - at most once every second
    revalidate: 1,
  }
}

export default Dashboard

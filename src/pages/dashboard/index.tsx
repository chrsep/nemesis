import React from "react"
import { Heading } from "theme-ui"
import DashboardPage from "../../components/dashboardPage"

const Dashboard = () => {
  return (
    <div>
      <Heading sx={{ fontSize: 5 }} p={3}>
        Dashboard
      </Heading>
      <DashboardPage data={["", "", "", "", "", ""]} />
    </div>
  )
}

export default Dashboard

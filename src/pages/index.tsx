import Head from "next/head"
import React, { FC } from "react"
import { Heading } from "theme-ui"
import HomePage from "../components/homePage"
import { listEvents } from "../db"

interface Props {
  events: Array<{
    attendance: 0
    date: string
    id: number
    name: string
    price: number
    ticketsSold: number
    totalTickets: number
  }>
}

const Home: FC<Props> = ({ events }) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />

        {/* <script */}
        {/*  dangerouslySetInnerHTML={{ */}
        {/*    __html: ` */}
        {/*      (function() { */}
        {/*        const cookies = document.cookie.replace(" ", "").split(";") */}
        {/*        const isLoggedIn = cookies.findIndex((item) => item === "loggedIn=1") */}
        {/*        if (isLoggedIn < 0) { */}
        {/*          window.location.href  = "/login" */}
        {/*        }    */}
        {/*      })() */}
        {/*  `, */}
        {/*  }} */}
        {/* /> */}
      </Head>

      <Heading sx={{ fontSize: 6 }} p={3} pt={4}>
        Cari Konser
      </Heading>

      <main>
        <HomePage events={events} />
      </main>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      events: [],
    },
    // we will attempt to re-generate the page:
    // - when a request comes in
    // - at most once every second
    revalidate: 1,
  }
}

export default Home

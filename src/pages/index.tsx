import Head from "next/head"
import React, { FC } from "react"
import { Box, Heading } from "theme-ui"
import HomePage from "../components/homePage"
import { listPastEvents, listUpcomingEvents } from "../db"
import { ConcertEvent } from "../domain"

interface Props {
  upcomingEvents: ConcertEvent[]
  pastEvents: ConcertEvent[]
}

const Home: FC<Props> = ({ upcomingEvents, pastEvents }) => {
  return (
    <div>
      <Head>
        <title>Nemesis</title>
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

      <Heading
        sx={{ fontSize: 6, fontWeight: 900, lineHeight: 0.9 }}
        px={3}
        pt={5}
      >
        Konser Mendatang
      </Heading>

      <HomePage events={upcomingEvents} />

      <Heading
        sx={{ fontSize: 6, fontWeight: 900, lineHeight: 0.9 }}
        px={3}
        pt={5}
      >
        Konser Yang lalu
      </Heading>
      <Box sx={{ opacity: 0.7 }}>
        <HomePage events={pastEvents} />
      </Box>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      upcomingEvents: await listUpcomingEvents(),
      pastEvents: await listPastEvents(),
    },
    // we will attempt to re-generate the page:
    // - when a request comes in
    // - at most once every second
    revalidate: 1,
  }
}

export default Home

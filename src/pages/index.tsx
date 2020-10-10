import Head from "next/head"
import React, { FC } from "react"
import HomePage from "../components/homePage"

interface Props {
  data: string[]
}

const Home: FC<Props> = ({ data }) => (
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

    <HomePage data={["", "", "", "", "", ""]} />
    <main>app</main>
  </div>
)

export default Home

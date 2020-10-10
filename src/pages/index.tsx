import Head from "next/head"
import { FC } from "react"

const Home: FC = () => (
  <div>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const cookies = document.cookie.replace(" ", "").split(";")
              const isLoggedIn = cookies.findIndex((item) => item === "loggedIn=1")
              if (isLoggedIn < 0) {
                window.location.href  = "/login"
              }    
            })()
        `,
        }}
      />
    </Head>

    <main>app</main>
  </div>
)

export default Home

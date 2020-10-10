import React, { FC, useEffect, useState } from "react"
import { AppPropsType } from "next/dist/next-server/lib/utils"
import {
  Box,
  Button,
  Flex,
  Heading,
  ThemeProvider,
  Link as LinkComponent,
} from "theme-ui"
import Link from "next/link"
import theme from "../theme"

const Layout: FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const d = new Date()
    d.setTime(d.getTime() + 1000)
    const expires = `expires=${d.toUTCString()}`

    document.cookie = `a0:session=new_value;path=/;${expires}`
    if (document.cookie.indexOf(`a0:session=`) === -1) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  return (
    <Box>
      <Flex
        as="nav"
        p={3}
        sx={{ height: 60, alignItems: "center", maxWidth: 1200 }}
        mx="auto"
      >
        <Link href="/">
          <LinkComponent>
            <Heading>Nemesis</Heading>
          </LinkComponent>
        </Link>
        {!isLoggedIn && (
          <LinkComponent href="/api/auth/login" ml="auto">
            <Button>Log In</Button>
          </LinkComponent>
        )}
      </Flex>
      <Box
        mx="auto"
        sx={{
          alignItems: "center",
          maxWidth: 1200,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

const MyApp: FC<AppPropsType> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Box>
    </ThemeProvider>
  )
}

export default MyApp

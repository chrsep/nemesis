import React, { FC } from "react"
import { AppPropsType } from "next/dist/next-server/lib/utils"
import {
  Box,
  Button,
  Flex,
  Heading,
  Link as LinkComponent,
  ThemeProvider,
} from "theme-ui"
import Link from "next/link"
import theme from "../theme"
import useIsLoggedIn from "../hooks/useIsLoggedIn"
import useGetMe from "../hooks/useGetMe"

const Layout: FC = ({ children }) => {
  const isLoggedIn = useIsLoggedIn()
  useGetMe() // just so that me will always be in cache.

  return (
    <Box sx={{ position: "relative" }}>
      <Flex
        as="nav"
        p={3}
        sx={{ alignItems: "flex-end", maxWidth: 1200 }}
        mx="auto"
      >
        <Link href="/">
          <LinkComponent>
            <Heading as="h1" sx={{ fontWeight: 900 }}>
              NEMESIS
            </Heading>
          </LinkComponent>
        </Link>

        {!isLoggedIn ? (
          <LinkComponent href="/api/auth/login" ml="auto">
            <Button>Log In</Button>
          </LinkComponent>
        ) : (
          <LinkComponent href="/api/auth/logout" ml="auto">
            <Button variant="outline">Log Out</Button>
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

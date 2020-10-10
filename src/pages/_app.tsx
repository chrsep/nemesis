import React, { FC } from "react"
import { AppPropsType } from "next/dist/next-server/lib/utils"
import { Box, Button, Flex, Heading, ThemeProvider } from "theme-ui"
import Link from "next/link"
import theme from "../theme"

const Layout: FC = ({ children }) => {
  return (
    <Box>
      <Flex
        as="nav"
        p={3}
        sx={{ height: 60, alignItems: "center", maxWidth: 1200 }}
        mx="auto"
      >
        <Link href="/">
          <a>
            <Heading>Nemesis</Heading>
          </a>
        </Link>
        <Button ml="auto">Logout</Button>
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

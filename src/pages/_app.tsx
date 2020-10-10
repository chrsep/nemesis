import React, { FC } from "react"
import { AppPropsType } from "next/dist/next-server/lib/utils"
import { ThemeProvider } from "theme-ui"
import theme from "../theme"

const MyApp: FC<AppPropsType> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp

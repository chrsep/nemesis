import Link from "next/link"
import React from "react"
import { Button, Flex, Heading } from "theme-ui"
import { useQueryString } from "../hooks/useQueryString"

const PaymentPage = () => {
  const redirectUrl = useQueryString("redirectUrl")
  return (
    <Flex
      sx={{ alignItems: "center", justifyContent: "center", height: "100vh" }}
    >
      <Flex sx={{ flexDirection: "column" }}>
        <Heading mb={3}>Halaman 3rd party Payment Vendor</Heading>
        <Link href={redirectUrl}>
          <Button mx="auto">Confirm</Button>
        </Link>
      </Flex>
    </Flex>
  )
}

export default PaymentPage

import Link from "next/link"
import React, { FC } from "react"
import { Button, Flex, Heading } from "theme-ui"
import { useQueryString } from "../hooks/useQueryString"
import { ConcertEvent } from "../domain"

interface Props {
  event?: ConcertEvent
}
const PaymentPage: FC<Props> = ({ event }) => {
  const redirectUrl = useQueryString("redirectUrl")
  return (
    <Flex
      sx={{ alignItems: "center", justifyContent: "center", height: "100vh" }}
    >
      <Flex sx={{ flexDirection: "column" }}>
        <Heading mb={3} sx={{ textAlign: "center" }}>
          Halaman 3rd party Payment Vendor
        </Heading>
        <Link href={redirectUrl}>
          <Button mx="auto">Confirm</Button>
        </Link>
      </Flex>
    </Flex>
  )
}

export default PaymentPage

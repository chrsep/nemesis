import React from "react"
import { Box, Button, Card, Flex, Heading, Text } from "theme-ui"
import Link from "next/link"

const ConcertPage = () => {
  return (
    <Box mx="auto" sx={{ maxWidth: 1200 }}>
      <Card sx={{ width: "100%", height: 382, backgroundColor: "black" }} />
      <Flex sx={{ flexDirection: ["column", "row"], alignItems: "flex-start" }}>
        <Box m={3} sx={{ width: "100%" }}>
          <Heading>Nama Concert</Heading>
          <Text mb={3}>John Mayer</Text>
          <Text sx={{ opacity: 0.75, fontSize: 3 }} mb={3}>
            The guitar is a fretted musical instrument that usually has six
            strings.[1] It is typically played with both hands by strumming or
            plucking the strings with either a guitar pick or the
            fingers/fingernails of one hand, while simultaneously fretting
            (pressing the strings against the frets) with the fingers of the
            other hand.
          </Text>
          <Text sx={{ opacity: 0.75, fontSize: 3 }}>
            The modern guitar was preceded by the gittern, the vihuela, the
            four-course Renaissance guitar, and the five-course baroque guitar,
            all of which contributed to the development of the modern six-string
            instrument.
          </Text>
        </Box>
        <Card
          m={[0, 3]}
          p={3}
          sx={{
            maxWidth: [undefined, 400],
            width: "100%",
            backgroundColor: "grey",
          }}
        >
          <Flex sx={{ flexDirection: "column" }}>
            <Heading mb={2}>Harga</Heading>
            <Heading as="h3">Rp. 99999999/pax</Heading>
            {/* TODO: use real page id */}
            <Link href="/payment?redirectUrl=/concerts/1">
              <Button sx={{ ml: "auto" }}>Beli tiket</Button>
            </Link>
          </Flex>
        </Card>
      </Flex>
    </Box>
  )
}

export default ConcertPage

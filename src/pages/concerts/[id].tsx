import React, { FC } from "react"
import { Box, Button, Card, Flex, Heading, Text } from "theme-ui"
import Link from "next/link"
import { GetStaticPaths, GetStaticProps } from "next"
import { ConcertEvent } from "../../domain"
import { findEventsById } from "../../db"

interface Props {
  event?: ConcertEvent
}
const ConcertPage: FC<Props> = ({ event }) => {
  if (!event) {
    return <div />
  }

  return (
    <Box mx="auto" sx={{ maxWidth: 1200 }}>
      <Card
        sx={{
          width: "100%",
          height: 382,
          backgroundColor: "black",
          borderRadius: [0, 6],
        }}
      />
      <Flex sx={{ flexDirection: ["column", "row"], alignItems: "flex-start" }}>
        <Box
          p={3}
          sx={{
            width: "100%",
            position: "sticky",
            maxWidth: [undefined, 400],
            top: 0,
            zIndex: 100,
          }}
        >
          <Card p={3} sx={{ backgroundColor: "white" }}>
            <Flex>
              <div>
                <Heading sx={{ fontSize: [3, 4] }} mb={2}>
                  Harga
                </Heading>
                <Text sx={{ fontSize: [1, 2] }} as="h3">
                  {Intl.NumberFormat("id", {
                    style: "currency",
                    currency: "IDR",
                  }).format(event?.price)}
                  /pax
                </Text>
              </div>
              {/* TODO: use real page id */}
              <Link href="/payment?redirectUrl=/concerts/1">
                <Button sx={{ ml: "auto" }}>Beli tiket</Button>
              </Link>
            </Flex>
          </Card>
        </Box>
        <Box p={3} sx={{ width: "100%" }}>
          <Heading mb={3}>{event.name}</Heading>
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
      </Flex>
    </Box>
  )
}

export const getStaticProps: GetStaticProps<Props, { id: string }> = async ({
  params,
}) => {
  const id = params?.id ?? ""

  return {
    props: {
      event: await findEventsById(id),
    },
    revalidate: 3600,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: true }
}

export default ConcertPage

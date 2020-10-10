import React, { FC } from "react"
import { Box, Card, Flex, Heading, Text } from "theme-ui"
import { GetStaticPaths, GetStaticProps } from "next"
import { findEventsById, listEventIds } from "../../../db"
import { ConcertEvent } from "../../../domain"

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
        mb={2}
      >
        <Box p={3} sx={{ width: "100%", color: "white" }}>
          <Heading>{event.name}</Heading>
          <Text mb={3}>John Mayer</Text>
        </Box>
      </Card>
      <Flex sx={{ flexWrap: "wrap" }}>
        <Box px={3} sx={{ width: ["100%", "33%"] }}>
          <Card p={3} my={2}>
            <Heading as="h4">Jumlah Terjual</Heading>
          </Card>
        </Box>

        <Box px={3} sx={{ width: ["100%", "33%"] }}>
          <Card p={3} my={2}>
            <Heading as="h4">Jumlah Penonton</Heading>
          </Card>
        </Box>

        <Box px={3} sx={{ width: ["100%", "33%"] }}>
          <Card p={3} my={2}>
            <Heading as="h4">Jumlah Viewer</Heading>
          </Card>
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
  const ids = await listEventIds()
  return {
    paths: ids.map(({ id }) => `/dashboard/analytics/${id}`),
    fallback: true,
  }
}

export default ConcertPage

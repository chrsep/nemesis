import React, { FC } from "react"
import { Box, Card, Flex, Heading, Image, Text } from "theme-ui"
import { GetStaticPaths, GetStaticProps } from "next"
import dayjs from "dayjs"
import { ResponsiveLine } from "@nivo/line"
import { findEventsById, listEventIds } from "../../../db"
import { ConcertEvent } from "../../../domain"

interface Props {
  event?: ConcertEvent
}
const ConcertPage: FC<Props> = ({ event }) => {
  if (!event) {
    return <div />
  }

  const dates: string[] = []
  for (let i = 0; i < 30; i += 1) {
    dates.push(
      dayjs()
        .add(-1 * i, "day")
        .format("DD MMMM")
    )
  }

  return (
    <Box mx="auto" sx={{ maxWidth: 1200 }}>
      <Card
        sx={{
          width: "100%",
          height: ["auto", 382],
          backgroundColor: "black",
          borderRadius: [0, 6],
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
        mb={2}
      >
        <Image
          src={event.thumbnailUrl}
          sx={{
            objectFit: "cover",
            maxWidth: "100%",
            maxHeight: "100%",
            height: ["auto", "100%"],
            width: ["100%", "auto"],
          }}
        />
        <Box
          p={3}
          sx={{
            width: "100%",
            color: "white",
            position: "absolute",
            top: 0,
            left: 0,
            backgroundImage:
              "linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,1))",
          }}
        >
          <Heading>{event.name}</Heading>
          <Text mb={3}>{event.artists}</Text>
        </Box>
      </Card>
      <Flex sx={{ flexWrap: "wrap" }}>
        <Box px={3} sx={{ width: ["100%", "33%"] }}>
          <Card my={2}>
            <Box
              p={3}
              sx={{
                borderBottomColor: "border",
                borderBottomStyle: "solid",
                borderBottomWidth: 1,
              }}
            >
              <Heading as="h3" mb={1}>
                Revenue
              </Heading>
              <Text sx={{ fontSize: 1, opacity: 0.7 }}>30 hari terakhir</Text>
            </Box>
            <Box sx={{ height: "8rem" }} mb={4}>
              <ResponsiveLine
                enableGridX={false}
                useMesh={false}
                data={[
                  {
                    id: "Revenue",
                    color: "#004daa",
                    data: dates.map((date) => {
                      return { x: date, y: 0 }
                    }),
                  },
                ]}
              />
            </Box>
          </Card>
        </Box>

        <Box px={3} sx={{ width: ["100%", "33%"] }}>
          <Card my={2}>
            <Box
              p={3}
              sx={{
                borderBottomColor: "border",
                borderBottomStyle: "solid",
                borderBottomWidth: 1,
              }}
            >
              <Heading as="h3" mb={1}>
                Tiket Terjual
              </Heading>
              <Text sx={{ fontSize: 1, opacity: 0.7 }}>30 hari terakhir</Text>
            </Box>
            <Box sx={{ height: "8rem" }} mb={4}>
              <ResponsiveLine
                enableGridX={false}
                useMesh={false}
                data={[
                  {
                    id: "Revenue",
                    color: "#004daa",
                    data: dates.map((date) => {
                      return { x: date, y: 0 }
                    }),
                  },
                ]}
              />
            </Box>
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

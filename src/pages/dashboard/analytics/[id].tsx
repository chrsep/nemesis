import React, { FC } from "react"
import { Box, Card, Flex, Heading, Image, Text } from "theme-ui"
import { GetStaticPaths, GetStaticProps } from "next"
import dayjs from "dayjs"
import { ResponsivePie } from "@nivo/pie"

import { findEventsById, listEventIds } from "../../../db"
import { ConcertEvent } from "../../../domain"
import formatCurrency from "../../../utils/formatter"

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
            <Flex>
              <Box p={3}>
                <Image
                  src="/money.png"
                  sx={{
                    objectFit: "cover",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    height: ["auto", "100%"],
                    width: ["100%", "auto"],
                  }}
                />
              </Box>
              <Box p={2}>
                <Text sx={{ fontSize: 3, fontWeight: "bolder" }}>Revenue</Text>
                <Text sx={{ fontSize: 1 }}>
                  {formatCurrency(event.ticketsSold * event.price)}
                </Text>
              </Box>
            </Flex>
          </Card>
        </Box>

        <Box px={3} sx={{ width: ["100%", "33%"] }}>
          <Card my={2}>
            <Flex>
              <Box p={3}>
                <Image
                  src="/ticket.png"
                  sx={{
                    objectFit: "cover",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    height: ["auto", "100%"],
                    width: ["100%", "auto"],
                  }}
                />
              </Box>
              <Box p={2}>
                <Text sx={{ fontSize: 3, fontWeight: "bolder" }}>
                  Tickets Sold
                </Text>
                <Text sx={{ fontSize: 1 }}>
                  {event.ticketsSold} / {event.totalTickets}
                </Text>
              </Box>
            </Flex>
          </Card>
        </Box>

        <Box px={3} sx={{ width: ["100%", "33%"] }}>
          <Card my={2}>
            <Flex>
              <Box p={3}>
                <Image
                  src="/person.png"
                  sx={{
                    objectFit: "cover",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    height: ["auto", "100%"],
                    width: ["100%", "auto"],
                  }}
                />
              </Box>
              <Box p={2}>
                <Text sx={{ fontSize: 3, fontWeight: "bolder" }}>
                  Attendance
                </Text>
                <Text sx={{ fontSize: 1 }}>{event.attendance}</Text>
              </Box>
            </Flex>
          </Card>
        </Box>
        <Box px={3} sx={{ width: ["50%", "50%"] }}>
          <Card my={2}>
            <ResponsivePie
              data={[
                {
                  id: "male",
                  label: "male",
                  value: 70,
                  color: "hsl(80, 70%, 50%)",
                },
                {
                  id: "female",
                  label: "female",
                  value: 30,
                  color: "hsl(142, 70%, 50%)",
                },
              ]}
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              colors={{ scheme: "nivo" }}
              borderWidth={1}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              radialLabelsSkipAngle={10}
              radialLabelsTextXOffset={6}
              radialLabelsTextColor="#333333"
              radialLabelsLinkOffset={0}
              radialLabelsLinkDiagonalLength={16}
              radialLabelsLinkHorizontalLength={24}
              radialLabelsLinkStrokeWidth={1}
              radialLabelsLinkColor={{ from: "color" }}
              slicesLabelsSkipAngle={10}
              slicesLabelsTextColor="#333333"
              animate
              motionStiffness={90}
              motionDamping={15}
              defs={[
                {
                  id: "dots",
                  type: "patternDots",
                  background: "inherit",
                  color: "rgba(255, 255, 255, 0.3)",
                  size: 4,
                  padding: 1,
                  stagger: true,
                },
                {
                  id: "lines",
                  type: "patternLines",
                  background: "inherit",
                  color: "rgba(255, 255, 255, 0.3)",
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10,
                },
              ]}
              fill={[
                {
                  match: {
                    id: "male",
                  },
                  id: "dots",
                },
                {
                  match: {
                    id: "female",
                  },
                  id: "lines",
                },
              ]}
              legends={[
                {
                  anchor: "bottom",
                  direction: "row",
                  translateY: 56,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: "#999",
                  symbolSize: 18,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: "#000",
                      },
                    },
                  ],
                },
              ]}
            />
          </Card>
        </Box>
        <Box px={3} sx={{ width: ["50%", "50%"] }}>
          <Card my={2}>
            <Heading p={2}>Social Media Interactions</Heading>
            <Flex>
              <Box p={3}>
                <Image
                  src="/twitter.png"
                  sx={{
                    objectFit: "cover",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    height: ["auto", "100%"],
                    width: ["100%", "auto"],
                  }}
                />
              </Box>
              <Box p={2}>
                <Text sx={{ fontSize: 3, fontWeight: "bolder" }}>Twitter</Text>
                <Text sx={{ fontSize: 1 }}>
                  1,000,000 <Text sx={{ opacity: 0.5 }}>tweets</Text>
                </Text>
              </Box>
              <Box p={3}>
                <Image
                  src="/instagram.png"
                  sx={{
                    objectFit: "cover",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    height: ["auto", "100%"],
                    width: ["100%", "auto"],
                  }}
                />
              </Box>
              <Box p={2}>
                <Text sx={{ fontSize: 3, fontWeight: "bolder" }}>
                  Instagram
                </Text>
                <Text sx={{ fontSize: 1 }}>
                  1,307,400 <Text sx={{ opacity: 0.5 }}>mentions</Text>
                </Text>
              </Box>
            </Flex>
          </Card>
        </Box>
        <Box />
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

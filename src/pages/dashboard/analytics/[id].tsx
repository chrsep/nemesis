import React, { FC } from "react"
import { Box, Button, Card, Flex, Heading, Text, Image } from "theme-ui"
import { GetStaticPaths, GetStaticProps } from "next"
import dayjs, { Dayjs } from "dayjs"
import { ResponsivePie } from "@nivo/pie"

import {
  findEventsById,
  findStreamKeyByEventId,
  listEventIds,
} from "../../../db"
import { ConcertEvent } from "../../../domain"
import formatCurrency from "../../../utils/formatter"
import useCountdown from "../../../hooks/useCountdown"
import useCreateLivestream from "../../../hooks/useCreateLivestream"
import useGetStreamKey from "../../../hooks/useGetStreamKey"

interface Props {
  event?: ConcertEvent
  streamKey: string
}
const ConcertPage: FC<Props> = ({ event, streamKey }) => {
  const notDone = dayjs(event?.endTime).isAfter(dayjs())
  const liveStreamKey = useGetStreamKey(event?.id, streamKey)

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
      {notDone && (
        <GoLiveCard
          streamKey={liveStreamKey.data?.streamKey}
          eventId={event.id}
          startTime={dayjs(event.startTime)}
        />
      )}
      <Box px={[0, 3]}>
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
            alt="thumbnail"
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
              backgroundimg:
                "linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,1))",
            }}
          >
            <Heading>{event.name}</Heading>
            <Text mb={3}>{event.artists}</Text>
          </Box>
        </Card>
      </Box>
      <Flex sx={{ flexWrap: "wrap" }}>
        <Box px={3} sx={{ width: ["100%", "33%"] }}>
          <Card my={2}>
            <Flex>
              <Box p={2}>
                <img
                  alt="money"
                  src="/money.svg"
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
              <Box p={2}>
                <img
                  alt="video"
                  src="/ticket.svg"
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
              <Box p={2}>
                <img
                  alt="person"
                  src="/person.svg"
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
        <Box px={3} sx={{ width: ["100%", "50%"] }}>
          <Card my={2} sx={{ height: "20rem" }}>
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
              // animate
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
        <Box px={3} sx={{ width: ["100%", "50%"] }}>
          <Card my={2}>
            <Heading p={2}>Social Media Interactions</Heading>
            <Flex sx={{ flexWrap: "wrap" }}>
              <Box sx={{ width: ["100%", "33.33%"] }}>
                {/* <Flex> */}
                <Box p={3}>
                  <img
                    alt="twitter"
                    src="/twitter.svg"
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
                    Twitter
                  </Text>
                  <Text sx={{ fontSize: 1 }}>
                    1,000,000 <Text sx={{ opacity: 0.5 }}>tweets</Text>
                  </Text>
                </Box>
                {/* </Flex> */}
              </Box>
              <Box sx={{ width: ["100%", "33.33%"] }}>
                <Box p={3}>
                  <img
                    alt="instagram"
                    src="/instagram.svg"
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
              </Box>
              <Box sx={{ width: ["100%", "33.33%"] }}>
                <Box p={3}>
                  <img
                    alt="facebook"
                    src="/facebook.svg"
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
                    Facebook
                  </Text>
                  <Text sx={{ fontSize: 1 }}>
                    2,307,400 <Text sx={{ opacity: 0.5 }}>posts</Text>
                  </Text>
                </Box>
              </Box>
            </Flex>
          </Card>
        </Box>
        <Box />
      </Flex>
    </Box>
  )
}

const GoLiveCard: FC<{
  streamKey?: string
  startTime: Dayjs
  eventId: number
}> = ({ streamKey, startTime, eventId }) => {
  const [createLivestream] = useCreateLivestream(eventId)
  const { formattedCountdown, countdown } = useCountdown(dayjs(startTime))

  return (
    <Card
      mx={[0, 3]}
      mb={3}
      p={3}
      sx={{ backgroundColor: "white", borderRadius: [0, 6] }}
    >
      <Flex>
        {streamKey ? (
          <Box>
            <Text>Mux Livestream Key </Text>
            <Heading as="h3">{streamKey}</Heading>
          </Box>
        ) : (
          <Box>
            <Text>Countdown</Text>
            <Heading as="h3">{formattedCountdown}</Heading>
          </Box>
        )}

        <Button
          ml="auto"
          disabled={countdown > 1800000 || streamKey !== ""}
          onClick={async () => {
            await createLivestream()
          }}
        >
          {streamKey ? "YOU'RE LIVE" : "GO LIVE"}
        </Button>
      </Flex>
    </Card>
  )
}

export const getStaticProps: GetStaticProps<Props, { id: string }> = async ({
  params,
}) => {
  const id = params?.id ?? ""
  const { streamkey } = await findStreamKeyByEventId(id)

  return {
    props: {
      event: await findEventsById(id),
      streamKey: streamkey ?? null,
    },
    revalidate: 1,
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

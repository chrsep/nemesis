import React, { FC, Fragment } from "react"
import Link from "next/link"
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Image,
  Link as ThemeUiLink,
  Text,
} from "theme-ui"
import { GetStaticPaths, GetStaticProps } from "next"
import dayjs from "dayjs"
import { ConcertEvent } from "../../domain"
import { findEventsById, findPlaybackIdByEventId, listEventIds } from "../../db"
import useIsLoggedIn from "../../hooks/useIsLoggedIn"
import formatCurrency from "../../utils/formatter"
import useGetMe from "../../hooks/useGetMe"
import useCountdown from "../../hooks/useCountdown"
import useGetPlaybackId from "../../hooks/useGetPlaybackId"

interface Props {
  event?: ConcertEvent
  playbackId: string
}
const ConcertPage: FC<Props> = ({ event, playbackId }) => {
  const livePlaybackId = useGetPlaybackId(event?.id, playbackId)
  const isLoggedIn = useIsLoggedIn()
  const { data } = useGetMe()

  const { formattedCountdown } = useCountdown(dayjs(event?.startTime))

  const isBought =
    (data?.upcomingEvents?.findIndex(({ id }) => {
      return id === event?.id
    }) ?? -1) > -1

  if (!event) {
    return <div />
  }

  return (
    <Box mx="auto" sx={{ maxWidth: 1200 }}>
      <Box
        px={[0, 3]}
        pb={[0, 3]}
        sx={{
          width: "100%",
        }}
      >
        <Card
          sx={{
            width: "100%",
            height: ["auto", 382],
            textAlign: "center",
            borderRadius: [0, 6],
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            src={event.thumbnailUrl}
            sx={{
              objectFit: "cover",
              height: ["auto", "100%"],
              width: ["100%", "auto"],
              maxWidth: "100%",
              maxHeight: "100%",
            }}
          />
        </Card>
      </Box>
      <Flex sx={{ flexDirection: ["column", "row"], alignItems: "flex-start" }}>
        <Box
          px={[2, 3]}
          pt={3}
          pb={[2, 0]}
          sx={{
            width: "100%",
            position: ["fixed", "sticky"],
            maxWidth: [undefined, 400],
            top: [undefined, 0],
            bottom: [0, undefined],
            backgroundImage: [
              "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.3))",
              "none",
            ],
            zIndex: 100,
          }}
        >
          {dayjs(event.startTime).isBefore(dayjs(), "date") ? (
            <Card p={3} sx={{ backgroundColor: "white" }}>
              <Heading>Konser Telah Berlalu</Heading>
            </Card>
          ) : (
            <Card p={3} sx={{ backgroundColor: "white" }}>
              {isBought && (
                <Fragment>
                  <Text
                    mb={2}
                    sx={{ fontWeight: "bold", fontSize: 1, color: "secondary" }}
                  >
                    Terbeli
                  </Text>
                  {!livePlaybackId.data?.playbackId ? (
                    <Box mb={2}>
                      <Text sx={{ fontSize: [1, 2] }}>Countdown</Text>
                      <Text sx={{ fontSize: [1, 2] }} as="h3">
                        {formattedCountdown}
                      </Text>
                    </Box>
                  ) : (
                    <Box mb={2}>
                      <Text sx={{ fontSize: [1, 2], fontWeight: "bold" }}>
                        STREAMING NOW
                      </Text>
                    </Box>
                  )}
                </Fragment>
              )}
              <Flex sx={{ alignItems: "center" }}>
                <div>
                  <Text sx={{ fontSize: [1, 2] }}>Harga</Text>
                  <Text sx={{ fontSize: [1, 2] }} as="h3">
                    {formatCurrency(event.price)}
                  </Text>
                </div>
                {!isLoggedIn && (
                  <ThemeUiLink
                    href={`/api/auth/login?redirectTo=/buy/${event.id}`}
                    sx={{ ml: "auto", display: "block" }}
                  >
                    <Button>Beli tiket</Button>
                  </ThemeUiLink>
                )}
                {isLoggedIn && !livePlaybackId.data?.playbackId && (
                  <Link href={`/buy/${event.id}`}>
                    <Button sx={{ ml: "auto" }} disabled={isBought}>
                      {isBought ? "Belum Mulai" : "Beli tiket"}
                    </Button>
                  </Link>
                )}
                {isLoggedIn && livePlaybackId.data?.playbackId && isBought && (
                  <Link href={`/play?eventId=${event.id}`}>
                    <Button sx={{ ml: "auto" }}>Tonton Live</Button>
                  </Link>
                )}
                {isLoggedIn && livePlaybackId.data?.playbackId && !isBought && (
                  <Link href={`/buy/${event.id}`}>
                    <Button sx={{ ml: "auto" }}>Beli tiket</Button>
                  </Link>
                )}
              </Flex>
            </Card>
          )}
        </Box>
        <Box p={3} pb={6} sx={{ width: "100%" }}>
          <Text mb={1} sx={{ fontWeight: "bold" }}>
            {event.artists}
          </Text>
          <Heading mb={1} sx={{ fontWeight: 900 }}>
            {event.name}
          </Heading>
          <Flex sx={{ alignItems: "center", opacity: 0.8 }} mb={1}>
            <Text>{dayjs(event.startTime).format("DD MMM YYYY")}</Text>
            <Text px={2}>•</Text>
            <Text>{dayjs(event.startTime).format("hh:mm A")}</Text>
          </Flex>
          <Card
            mb={3}
            px={2}
            py={1}
            sx={{
              fontSize: 0,
              backgroundColor: "secondary",
              boxRadius: 6,
              display: "inline-block",
              color: "white",
            }}
          >
            {event.genre}
          </Card>
          <Text sx={{ opacity: 0.75 }} mb={6}>
            {event.description}
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
  const { playbackid } = await findPlaybackIdByEventId(id)

  return {
    props: {
      event: await findEventsById(id),
      playbackId: playbackid ?? null,
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await listEventIds()
  return { paths: ids.map(({ id }) => `/concerts/${id}`), fallback: true }
}

export default ConcertPage

import React, { FC, Fragment, useEffect, useState } from "react"
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
import { findEventsById, listEventIds } from "../../db"
import useIsLoggedIn from "../../hooks/useIsLoggedIn"
import formatCurrency from "../../utils/formatter"
import useGetMe from "../../hooks/useGetMe"

function msToHMS(ms: number) {
  const seconds = Math.floor((ms / 1000) % 60)
  const minutes = Math.floor((ms / 1000 / 60) % 60)
  const hours = Math.floor((ms / 1000 / 3600) % 24)

  return `${hours}h ${minutes}m ${seconds}s`
}

interface Props {
  event?: ConcertEvent
}
const ConcertPage: FC<Props> = ({ event }) => {
  const isLoggedIn = useIsLoggedIn()
  const { data } = useGetMe()
  const [countdown, setCountdown] = useState(0)

  const formattedCountdown = msToHMS(countdown)

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(dayjs(event?.startTime).diff(dayjs()))
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

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
            ""
          ) : (
            <Card p={3} sx={{ backgroundColor: "white" }}>
              {isBought && (
                <Fragment>
                  <Text
                    mb={2}
                    sx={{ fontWeight: "bold", fontSize: 1, color: "green" }}
                  >
                    Terbeli
                  </Text>
                  <Box mb={2}>
                    <Text sx={{ fontSize: [1, 2] }}>Countdown</Text>
                    <Text sx={{ fontSize: [1, 2] }} as="h3">
                      {formattedCountdown}
                    </Text>
                  </Box>
                </Fragment>
              )}
              <Flex sx={{ alignItems: "center" }}>
                <div>
                  <Text sx={{ fontSize: [1, 2] }}>Harga</Text>
                  <Text sx={{ fontSize: [1, 2] }} as="h3">
                    {formatCurrency(event.price)}
                  </Text>
                </div>
                {/* TODO: use real page id */}
                {isLoggedIn ? (
                  <Link href={`/buy/${event.id}`}>
                    <Button sx={{ ml: "auto" }} disabled={isBought}>
                      {" "}
                      {isBought ? "Belum Mulai" : "Beli tiket"}
                    </Button>
                  </Link>
                ) : (
                  <ThemeUiLink
                    href={`/api/auth/login?redirectTo=/buy/${event.id}`}
                    sx={{ ml: "auto", display: "block" }}
                  >
                    <Button>Beli tiket</Button>
                  </ThemeUiLink>
                )}
              </Flex>
            </Card>
          )}
        </Box>
        <Box p={3} pb={6} sx={{ width: "100%" }}>
          <Heading mb={2}>{event.name}</Heading>
          <Flex>
            <Text mb={3}>{event.artists}</Text>
            <Text px={2}>•</Text>
            <Text mb={3}>{dayjs(event.startTime).format("DD MMMM YYYY")}</Text>
          </Flex>
          <Text sx={{ opacity: 0.75 }} mb={3}>
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

  return {
    props: {
      event: await findEventsById(id),
    },
    revalidate: 3600,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await listEventIds()
  return { paths: ids.map(({ id }) => `/concerts/${id}`), fallback: true }
}

export default ConcertPage

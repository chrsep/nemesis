import React, { FC } from "react"
import Link from "next/link"
import {
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Link as ThemeUiLink,
  Text,
} from "theme-ui"
import { GetStaticPaths, GetStaticProps } from "next"
import { ConcertEvent } from "../../domain"
import { findEventsById, listEventIds } from "../../db"
import useIsLoggedIn from "../../hooks/useIsLoggedIn"
import formatCurrency from "../../utils/formatter"

interface Props {
  event?: ConcertEvent
}
const ConcertPage: FC<Props> = ({ event }) => {
  const isLoggedIn = useIsLoggedIn()

  if (!event) {
    return <div />
  }

  return (
    <Box mx="auto" sx={{ maxWidth: 1200 }}>
      <Box
        p={[0, 3]}
        sx={{
          width: "100%",
        }}
      >
        <Card
          sx={{
            width: "100%",
            height: 382,
            backgroundColor: "black",
            borderRadius: [0, 6],
          }}
        />
      </Box>
      <Flex sx={{ flexDirection: ["column", "row"], alignItems: "flex-start" }}>
        <Box
          p={3}
          sx={{
            width: "100%",
            position: ["fixed", "sticky"],
            maxWidth: [undefined, 400],
            top: [undefined, 0],
            bottom: [0, undefined],
            zIndex: 100,
          }}
        >
          <Card p={3} sx={{ backgroundColor: "white" }}>
            <Flex sx={{ alignItems: "center" }}>
              <div>
                <Heading sx={{ fontSize: [3, 4] }} mb={2}>
                  Harga
                </Heading>
                <Text sx={{ fontSize: [1, 2] }} as="h3">
                  {formatCurrency(event.price)}
                  /pax
                </Text>
              </div>
              {/* TODO: use real page id */}
              {isLoggedIn ? (
                <Link href={`/buy/${event.id}`}>
                  <Button sx={{ ml: "auto" }}>Beli tiket</Button>
                </Link>
              ) : (
                <ThemeUiLink
                  href={`/api/auth/login?redirectTo=/concerts/${event.id}`}
                  sx={{ ml: "auto", display: "block" }}
                >
                  <Button>Beli tiket</Button>
                </ThemeUiLink>
              )}
            </Flex>
          </Card>
        </Box>
        <Box p={3} pb={6} sx={{ width: "100%" }}>
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
  const ids = await listEventIds()
  return { paths: ids.map(({ id }) => `/concerts/${id}`), fallback: true }
}

export default ConcertPage

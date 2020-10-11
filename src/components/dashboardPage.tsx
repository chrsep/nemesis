import Link from "next/link"
import React, { FC, useState } from "react"
import { Box, Card, Flex, Heading, Image, Input, Text } from "theme-ui"
import dayjs from "dayjs"
import Head from "next/head"
import { ConcertEvent } from "../domain"

interface Props {
  events: ConcertEvent[]
  topThree: ConcertEvent[]
}

const DashboardPage: FC<Props> = ({ events }) => {
  const [search, setSearch] = useState("")

  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              const cookies = document.cookie.replace(" ", "").split(";")
              const isLoggedIn = cookies.findIndex((item) => item === "loggedIn=1")
              if (isLoggedIn < 0) {
                window.location.href  = "/api/auth/login?redirectTo=/dashboard"
              }    
            })()
        `,
          }}
        />
      </Head>
      <main>
        <Flex sx={{ flexWrap: "wrap" }} mb={4} px={2}>
          <Box px={2} sx={{ width: ["100%", "33.3333%"] }}>
            <Card p={3} my={2}>
              <Heading as="h4">Revenue</Heading>
            </Card>
          </Box>

          <Box px={2} sx={{ width: ["100%", "33.3333%"] }}>
            <Card p={3} my={2}>
              <Heading as="h4">Audience</Heading>
            </Card>
          </Box>

          <Box px={2} sx={{ width: ["100%", "33.33333%"] }}>
            <Card p={3} my={2}>
              <Heading as="h4">Top Three by Revenue</Heading>
            </Card>
          </Box>
        </Flex>

        <Box sx={{ width: ["100%", 300] }} px={3}>
          <Input
            p={2}
            sx={{ fontSize: 1 }}
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>

        <Box p={3} sx={{}}>
          <Card sx={{ flexWrap: "wrap", width: "100%", overflowX: "auto" }}>
            <Flex
              p={3}
              sx={{
                alignItems: "center",
                fontSize: [0, 1],
                borderBottomStyle: "solid",
                borderBottomWidth: 1,
                borderColor: "rgba(0,0,0,0.2)",
                backgroundColor: "rgba(0,0,0,0.07)",
                minWidth: "30rem",
              }}
            >
              <Text
                sx={{
                  width: "3rem",
                  display: ["none", "block"],
                }}
                mr={3}
              />
              <Text sx={{ width: "35%" }}>Konser</Text>
              <Text ml={2} sx={{ width: "30%" }}>
                Artis
              </Text>
              <Text ml={2} sx={{ width: "35%" }}>
                Tanggal
              </Text>
            </Flex>
            {events
              .filter(({ name }) => name.match(search))
              .map((event) => (
                <Link href={`/dashboard/analytics/${event.id}`} key={event.id}>
                  <Flex
                    p={3}
                    sx={{
                      minWidth: "30rem",
                      cursor: "pointer",
                      alignItems: "center",
                      borderBottomStyle: "solid",
                      borderBottomWidth: 1,
                      borderColor: "rgba(0,0,0,0.2)",
                      fontSize: [0, 1],
                      whiteSpace: "nowrap",
                      "&:hover": {
                        backgroundColor: "rgba(0,0,0,0.04)",
                      },
                    }}
                  >
                    <Image
                      src={event.thumbnailUrl}
                      sx={{
                        objectFit: "cover",
                        borderRadius: 6,
                        height: "2rem",
                        width: "3rem",
                        backgroundColor: "black",
                        display: ["none", "block"],
                      }}
                      mr={3}
                    />
                    <Text
                      sx={{
                        width: "35%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {event.name}
                    </Text>
                    <Text
                      ml={2}
                      sx={{
                        width: "30%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {event.artists}
                    </Text>
                    <Text
                      ml={2}
                      sx={{
                        width: "35%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {dayjs(event.date).format("DD MMM YYYY")}
                    </Text>
                  </Flex>
                </Link>
              ))}
          </Card>
        </Box>
      </main>
    </>
  )
}

export default DashboardPage

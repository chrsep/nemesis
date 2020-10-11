import Link from "next/link"
import React, { FC, useState } from "react"
import { Box, Card, Flex, Heading, Image, Input, Text } from "theme-ui"
import dayjs from "dayjs"
import Head from "next/head"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  ResponsiveContainer,
} from "recharts"
import { ConcertEvent } from "../domain"
import formatCurrency from "../utils/formatter"

interface Props {
  events: ConcertEvent[]
  topThree: ConcertEvent[]
  revenues: Array<{
    date: string
    revenue: number
  }>
}

const DashboardPage: FC<Props> = ({ topThree, events }) => {
  const today = dayjs()
  const [search, setSearch] = useState("")
  const month: any = {
    1: { name: "Jan", revenue: 0 },
    2: { name: "Feb", revenue: 0 },
    3: { name: "Mar", revenue: 0 },
    4: { name: "Apr", revenue: 0 },
    5: { name: "May", revenue: 0 },
    6: { name: "Jun", revenue: 0 },
    7: { name: "Jul", revenue: 0 },
    8: { name: "Aug", revenue: 0 },
    9: { name: "Sept", revenue: 0 },
    10: { name: "Oct", revenue: 0 },
    11: { name: "Nov", revenue: 0 },
    12: { name: "Dec", revenue: 0 },
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const event of events) {
    const m = dayjs(event.startTime).get("month")
    month[m + 1].revenue = event.price * event.ticketsSold
  }
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
          <Box px={2} sx={{ width: ["100%", "50%"] }}>
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
                  Monthly Revenue
                </Heading>
                <Text sx={{ fontSize: 1, opacity: 0.7 }}>MTD</Text>
              </Box>
              <Flex
                px={3}
                py={2}
                sx={{
                  cursor: "pointer",
                  alignItems: "center",
                  borderBottomStyle: "solid",
                  borderBottomWidth: 1,
                  borderColor: "rgba(0,0,0,0.2)",
                  fontSize: 0,
                  whiteSpace: "nowrap",
                  backgroundColor: "darkBackground",
                }}
              >
                <Text
                  ml={2}
                  sx={{
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Revenue by Month
                </Text>
              </Flex>
              <Box sx={{ height: "20em" }} mb={4}>
                <ResponsiveContainer>
                  <LineChart
                    width={550}
                    height={300}
                    data={Object.values(month)}
                    margin={{
                      top: 20,
                      right: 0,
                      left: 40,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" interval="preserveStartEnd" />
                    <YAxis interval="preserveEnd" />
                    <Tooltip
                      formatter={(value, name) => [
                        formatCurrency(value as number),
                        name,
                      ]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </Card>
          </Box>

          <Box px={2} sx={{ width: ["100%", "50%"] }}>
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
                  Device Usage %
                </Heading>
                <Text sx={{ fontSize: 1, opacity: 0.7 }}>All events</Text>
              </Box>

              <Flex
                px={3}
                py={2}
                sx={{
                  cursor: "pointer",
                  alignItems: "center",
                  borderBottomStyle: "solid",
                  borderBottomWidth: 1,
                  borderColor: "rgba(0,0,0,0.2)",
                  fontSize: 0,
                  whiteSpace: "nowrap",
                  backgroundColor: "darkBackground",
                }}
              >
                <Text
                  ml={2}
                  sx={{
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Streaming Devices
                </Text>
              </Flex>

              <Box sx={{ height: "20rem" }} mb={4}>
                <ResponsiveContainer>
                  <PieChart
                    width={500}
                    height={300}
                    margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                  >
                    <Pie
                      dataKey="value"
                      isAnimationActive={false}
                      data={[
                        { name: "Android", value: 80 },
                        { name: "ios", value: 20 },
                      ]}
                      // cx={200}
                      // cy={200}
                      // outerRadius={80}
                      fill="#8884d8"
                      label
                    />
                    <Pie
                      dataKey="value"
                      isAnimationActive={false}
                      data={[
                        { name: "Chrome", value: 50 },
                        { name: "Safari", value: 30 },
                        { name: "Firefox", value: 20 },
                      ]}
                      outerRadius={80}
                      fill="#82ca9d"
                      label
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                {/* <PieChart width={200} height={400}>
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={[
                      { name: "Chrome", value: 50 },
                      { name: "Safari", value: 30 },
                      { name: "Firefox", value: 20 },
                    ]}
                    cx={200}
                    cy={200}
                    outerRadius={80}
                    fill="#82ca9d"
                    label
                  />
                  <Tooltip />
                </PieChart> */}
              </Box>
            </Card>
          </Box>

          <Box px={2} sx={{ width: ["100%", "100%"] }}>
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
                  Top Konser by Revenue
                </Heading>
                <Text sx={{ fontSize: 1, opacity: 0.7 }}>All Time</Text>
              </Box>
              <Flex
                px={3}
                py={2}
                sx={{
                  cursor: "pointer",
                  alignItems: "center",
                  borderBottomStyle: "solid",
                  borderBottomWidth: 1,
                  borderColor: "rgba(0,0,0,0.2)",
                  fontSize: 0,
                  whiteSpace: "nowrap",
                  backgroundColor: "darkBackground",
                }}
              >
                <Text
                  sx={{
                    width: "70%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontWeight: "bold",
                  }}
                >
                  Konser
                </Text>
                <Text
                  ml={2}
                  sx={{
                    width: "30%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    fontWeight: "bold",
                  }}
                >
                  Revenue
                </Text>
              </Flex>
              <Box>
                {topThree
                  .filter(({ name }) => name.match(search))
                  .map((event) => (
                    <Link
                      href={`/dashboard/analytics/${event.id}`}
                      key={event.id}
                    >
                      <Flex
                        p={3}
                        sx={{
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
                        <Text
                          sx={{
                            width: "70%",
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
                          {formatCurrency(event.ticketsSold * event.price)}
                        </Text>
                      </Flex>
                    </Link>
                  ))}
              </Box>
            </Card>
          </Box>
        </Flex>

        <Heading as="h2" mb={2} px={3} sx={{ fontWeight: 900 }}>
          Semua Konser-mu
        </Heading>
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
              <Text ml={2} sx={{ width: "30%", fontWeight: "bold" }}>
                Konser
              </Text>
              <Text ml={2} sx={{ width: "25%", fontWeight: "bold" }}>
                Artis
              </Text>
              <Text ml={2} sx={{ width: "25%", fontWeight: "bold" }}>
                Tanggal
              </Text>
              <Text
                ml={2}
                sx={{
                  width: "20%",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight: "bold",
                }}
              >
                Total Revenue
              </Text>
            </Flex>
            {events
              .filter(({ name }) => name.match(search))
              .map((event) => {
                const startDiff = today.diff(event.startTime)
                const endDiff = today.diff(event.endTime)
                let color = "black"
                if (startDiff < 0) color = "upcoming"
                if (startDiff > 0 && endDiff < 0) color = "live"
                if (endDiff > 0) color = "past"

                return (
                  <Link
                    href={`/dashboard/analytics/${event.id}`}
                    key={event.id}
                  >
                    <Flex
                      py={3}
                      pr={3}
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
                      <Box
                        mx={2}
                        sx={{
                          flexShrink: 0,
                          borderRadius: 100,
                          backgroundColor: color,
                          height: "8px",
                          width: "8px",
                        }}
                      />
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
                          width: "30%",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {event.name}
                      </Text>
                      <Text
                        ml={2}
                        sx={{
                          width: "25%",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {event.artists}
                      </Text>
                      <Text
                        ml={2}
                        sx={{
                          width: "25%",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {dayjs(event.startTime).format("DD MMM YYYY")}
                      </Text>
                      <Text
                        ml={2}
                        sx={{
                          width: "20%",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {formatCurrency(event.price * event.ticketsSold)}
                      </Text>
                    </Flex>
                  </Link>
                )
              })}
          </Card>
        </Box>
      </main>
    </>
  )
}

export default DashboardPage

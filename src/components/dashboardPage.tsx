import Link from "next/link"
import React, { FC } from "react"
import { Box, Card, Flex, Heading, Input, Text } from "theme-ui"
import dayjs from "dayjs"

interface Props {
  data: string[]
}

const DashboardPage: FC<Props> = ({ data }) => {
  return (
    <main>
      <Flex sx={{ flexWrap: "wrap" }} mb={4}>
        <Box px={3} sx={{ width: ["100%", "33.3333%"] }}>
          <Card p={3} my={2}>
            <Heading as="h4">Revenue</Heading>
          </Card>
        </Box>

        <Box px={3} sx={{ width: ["100%", "33.3333%"] }}>
          <Card p={3} my={2}>
            <Heading as="h4">Audience</Heading>
          </Card>
        </Box>

        <Box px={3} sx={{ width: ["100%", "33.33333%"] }}>
          <Card p={3} my={2}>
            <Heading as="h4">Engangement Metric</Heading>
          </Card>
        </Box>
      </Flex>

      <Box sx={{ width: ["100%", 200] }} px={3}>
        <Input p={2} sx={{ fontSize: 1 }} placeholder="Search" />
      </Box>

      <Box p={3} sx={{}}>
        <Card sx={{ flexWrap: "wrap", width: "100%" }}>
          <Flex
            p={3}
            sx={{
              alignItems: "center",
              fontSize: [0, 1],
              borderBottomStyle: "solid",
              borderBottomWidth: 1,
              borderColor: "rgba(0,0,0,0.2)",
              backgroundColor: "rgba(0,0,0,0.07)",
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
          {data.map(() => (
            <Link href="/dashboard/analytics/1">
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
                <Card
                  sx={{
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
                  Nama Concert
                </Text>
                <Text
                  ml={2}
                  sx={{
                    width: "30%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  Nama Artist
                </Text>
                <Text
                  ml={2}
                  sx={{
                    width: "35%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {dayjs().format("DD MMM YYYY")}
                </Text>
              </Flex>
            </Link>
          ))}
        </Card>
      </Box>
    </main>
  )
}

export default DashboardPage

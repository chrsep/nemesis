import Link from "next/link"
import React, { FC } from "react"
import { Box, Card, Flex, Heading, Text } from "theme-ui"

interface Props {
  data: string[]
}

const DashboardPage: FC<Props> = ({ data }) => {
  return (
    <main>
      <Flex sx={{ flexWrap: "wrap", width: "100%" }}>
        {data.map(() => {
          return (
            <Link href="/dashboard/analytics/1">
              <Card
                p={3}
                sx={{
                  cursor: "pointer",
                  width: ["100%", "50%", "25%"],
                }}
              >
                <Box
                  sx={{
                    height: "10rem",
                    backgroundColor: "black",
                  }}
                  mb={2}
                />
                <Heading>Nama Concert</Heading>
                <Text>Nama Artist</Text>
                <Text>Rp. 20.000.000</Text>
              </Card>
            </Link>
          )
        })}
      </Flex>
    </main>
  )
}

export default DashboardPage

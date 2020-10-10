import Link from "next/link"
import React, { FC } from "react"
import { Box, Card, Flex, Heading, Text } from "theme-ui"

interface Props {
  events: Array<{
    attendance: 0
    date: string
    id: number
    name: string
    price: number
    ticketsSold: number
    totalTickets: number
  }>
}
const HomePage: FC<Props> = ({ events }) => {
  return (
    <main>
      <Flex sx={{ flexWrap: "wrap", width: "100%" }}>
        {events.map((event) => {
          return (
            <Link href="/concerts/1" key={event.id}>
              <Box
                p={3}
                sx={{
                  cursor: "pointer",
                  width: ["100%", "50%", "25%"],
                }}
              >
                <Card
                  sx={{
                    height: "10rem",
                    backgroundColor: "black",
                  }}
                  mb={2}
                />
                <Heading>{event.name}</Heading>
                <Text>Nama Artist</Text>
                <Text>
                  {Intl.NumberFormat("id", {
                    style: "currency",
                    currency: "IDR",
                  }).format(event.price)}
                </Text>
              </Box>
            </Link>
          )
        })}
      </Flex>
    </main>
  )
}

export default HomePage

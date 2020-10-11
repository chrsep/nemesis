import Link from "next/link"
import React, { FC, useState } from "react"
import { Box, Card, Flex, Heading, Image, Input, Text } from "theme-ui"
import { ConcertEvent } from "../domain"
import formatCurrency from "../utils/formatter"

interface Props {
  events: ConcertEvent[]
}
const HomePage: FC<Props> = ({ events }) => {
  const [search, setSearch] = useState("")

  const filteredEvents = events.filter(({ name }) => name.match(search))

  return (
    <main>
      <Box px={3} pt={3}>
        <Input
          placeholder="Cari"
          sx={{ maxWidth: 400 }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>
      {search && filteredEvents.length === 0 && (
        <Box p={3}>
          <Heading>Oops, tidak ada concert "{search}"</Heading>
        </Box>
      )}
      <Flex sx={{ flexWrap: "wrap", width: "100%" }}>
        {filteredEvents.map((event) => {
          return (
            <Link href={`/concerts/${event.id}`} key={event.id}>
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
                    textAlign: "center",
                    backgroundColor: "black",
                    overflow: "hidden",
                  }}
                  mb={2}
                >
                  <Image
                    src={event.thumbnailUrl}
                    style={{
                      objectFit: "cover",
                      maxWidth: "100%",
                      maxHeight: "100%",
                      height: "100%",
                    }}
                  />
                </Card>
                <Text mb={1} sx={{ fontWeight: "bold" }}>
                  {event.artists}
                </Text>
                <Text mb={1}>{event.name}</Text>
                <Text>{formatCurrency(event.price)}</Text>
              </Box>
            </Link>
          )
        })}
      </Flex>
    </main>
  )
}

export default HomePage

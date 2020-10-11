import Link from "next/link"
import React, { FC, useState } from "react"
import { Box, Card, Flex, Heading, Input, Text, Image } from "theme-ui"
import { ConcertEvent } from "../domain"
import formatCurrency from "../utils/formatter"

interface Props {
  events: ConcertEvent[]
}
const HomePage: FC<Props> = ({ events }) => {
  const [search, setSearch] = useState("")

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
      <Flex sx={{ flexWrap: "wrap", width: "100%" }}>
        {events
          .filter(({ name }) => name.match(search))
          .map((event) => {
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

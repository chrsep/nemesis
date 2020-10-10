import React from "react"
import { Box, Card, Flex, Heading, Text } from "theme-ui"

const ConcertPage = () => {
  return (
    <Box mx="auto" sx={{ maxWidth: 1200 }}>
      <Card
        sx={{
          width: "100%",
          height: 382,
          backgroundColor: "black",
          borderRadius: [0, 6],
        }}
        mb={2}
      >
        <Box p={3} sx={{ width: "100%", color: "white" }}>
          <Heading>Nama Concert</Heading>
          <Text mb={3}>John Mayer</Text>
        </Box>
      </Card>
      <Flex sx={{ flexWrap: "wrap" }}>
        <Box px={3} sx={{ width: ["100%", "33%"] }}>
          <Card p={3} my={2}>
            <Heading as="h4">Jumlah Terjual</Heading>
          </Card>
        </Box>

        <Box px={3} sx={{ width: ["100%", "33%"] }}>
          <Card p={3} my={2}>
            <Heading as="h4">Jumlah Penonton</Heading>
          </Card>
        </Box>

        <Box px={3} sx={{ width: ["100%", "33%"] }}>
          <Card p={3} my={2}>
            <Heading as="h4">Jumlah Viewer</Heading>
          </Card>
        </Box>
      </Flex>
    </Box>
  )
}

export default ConcertPage

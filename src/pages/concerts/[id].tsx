import React from "react"
import { Box, Button, Card, Flex, Heading, Text } from "theme-ui"

const ConcertPage = () => {
  return (
    <Box mx="auto" sx={{ maxWidth: 1200 }}>
      <Card sx={{ width: "100%", height: 382, backgroundColor: "black" }} />
      <Flex sx={{ flexDirection: ["column", "row"] }}>
        <Box m={3} sx={{ width: "100%" }}>
          <Heading>Nama Concert</Heading>
          <Text>John Mayer</Text>
        </Box>
        <Card
          m={[0, 3]}
          p={3}
          sx={{
            maxWidth: [undefined, 400],
            width: "100%",
            backgroundColor: "grey",
          }}
        >
          <Flex sx={{ flexDirection: "column" }}>
            <Heading mb={2}>Harga</Heading>
            <Heading as="h3">Rp. 99999999/pax</Heading>
            <Button ml="auto">Beli</Button>
          </Flex>
        </Card>
      </Flex>
    </Box>
  )
}

export default ConcertPage

import Head from "next/head"
import React, { FC } from "react"
import { Button, Card, Flex, Heading, Input, Label } from "theme-ui"

const Home: FC = () => (
  <div>
    <Head>
      <title>Nemesis</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Flex
      as="main"
      sx={{ alignItems: "center", justifyContent: "center", height: "100vh" }}
    >
      <Card pb={6} sx={{ display: "flex", flexDirection: "column" }}>
        <Heading mb={4} sx={{ textAlign: "center" }}>
          Sign Up PLZ
        </Heading>
        <Label>e-mail</Label>
        <Input mb={3} />
        <Button ml="auto">Log In</Button>
      </Card>
    </Flex>
  </div>
)

export default Home

import Head from "next/head"
import React, { FC } from "react"
import { Button, Card, Flex, Heading, Input, Label, Text } from "theme-ui"
import Link from "next/link"

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
          Login
        </Heading>
        <Label>e-mail</Label>
        <Input mb={3} />
        <Button ml="auto" mb={3}>
          Log In
        </Button>

        <Text>
          Don't have an account?{" "}
          <Link href="/signup">
            <a>Sign Up</a>
          </Link>
        </Text>
      </Card>
    </Flex>
  </div>
)

export default Home

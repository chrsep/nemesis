import Link from "next/link"
import React, { FC } from "react"
import { Card, Flex } from "theme-ui"

interface Props {
  data: string[]
}
const HomePage: FC<Props> = ({ data }) => {
  return (
    <main>
      <Flex sx={{ flexWrap: "wrap", width: "100%" }}>
        {data.map(() => {
          return (
            <Link href="/concerts">
              <Card
                m={3}
                sx={{
                  height: "10rem",
                  backgroundColor: "black",
                  width: ["100%", "50%", "25%", "20%"],
                }}
              />
            </Link>
          )
        })}
      </Flex>
    </main>
  )
}

export default HomePage

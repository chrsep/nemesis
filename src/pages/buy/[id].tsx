import React, { FC, useState } from "react"
import Link from "next/link"
import { Button, Flex, Heading, Image, Input, Label, Text } from "theme-ui"
import { GetStaticPaths, GetStaticProps } from "next"
import { findEventsById, listEventIds } from "../../db"
import { ConcertEvent } from "../../domain"
import formatCurrency from "../../utils/formatter"
import useGetMe from "../../hooks/useGetMe"

interface Props {
  event?: ConcertEvent
}
const BuyPage: FC<Props> = ({ event }) => {
  const me = useGetMe()
  const [step, setStep] = useState(0)

  if (!event) {
    return <div />
  }

  return (
    <Flex p={3} sx={{ justifyContent: "center", maxWidth: 400 }} mx="auto">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              const cookies = document.cookie.replace(" ", "").split(";")
              const isLoggedIn = cookies.findIndex((item) => item === "loggedIn=1")
              if (isLoggedIn < 0) {
                window.location.href  = "/api/auth/login?redirectTo=/buy/${event.id}"
              }    
            })()
        `,
          }}
        />
      </head>
      <Flex pt={[0, 4]} sx={{ flexDirection: "column", width: "100%" }}>
        <Heading mb={4} sx={{ textAlign: "center" }}>
          Beli Tiket
        </Heading>
        <Image
          mx="auto"
          src={event.thumbnailUrl}
          sx={{
            boxShadow:
              "0 6px 12px -2px rgba(50,50,93,.12),0 3px 7px -3px rgba(0,0,0,.15)",
            borderRadius: 6,
            maxWidth: "18rem",
            maxHeight: "18rem",
            backgroundColor: "black",
          }}
          mb={3}
        />
        <Text sx={{ fontWeight: "bold", textAlign: "center" }}>
          {event.name}
        </Text>

        <Text mb={3} sx={{ textAlign: "center" }}>
          {formatCurrency(event.price)}
        </Text>

        {step === 0 && me.isSuccess && (
          <DataDiri
            onNext={() => setStep(1)}
            originalName={me.data?.name}
            originalEmail={me.data?.email}
          />
        )}
        {step === 1 && <Payment id={event.id} onBack={() => setStep(0)} />}
      </Flex>
    </Flex>
  )
}

const DataDiri: FC<{
  onNext: () => void
  originalName?: string
  originalEmail?: string
}> = ({ onNext, originalName, originalEmail }) => {
  const [name, setName] = useState(originalName)
  const [email, setEmail] = useState(originalEmail)

  return (
    <>
      <Label mb={2}>Data Diri</Label>
      <Input
        mb={2}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        mb={2}
        placeholder="Nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input mb={2} placeholder="Gender" />
      <Input mb={3} placeholder="Umur" />

      <Button mx="auto" sx={{ width: "100%" }} onClick={onNext}>
        Lanjutkan
      </Button>
    </>
  )
}

const Payment: FC<{ id: number; onBack: () => void }> = ({ id, onBack }) => {
  return (
    <>
      <Label mb={2}>Credit Card</Label>
      <Input mb={2} placeholder="Number" />
      <Flex>
        <Input mb={3} mr={2} placeholder="MM / YY" />
        <Input mb={3} placeholder="CVC" />
      </Flex>

      <Flex>
        <Button
          variant="outline"
          mx="auto"
          sx={{ width: "100%" }}
          mr={2}
          onClick={onBack}
        >
          Kembali
        </Button>
        <Link href={`/concerts/${id}`}>
          <Button mx="auto" sx={{ width: "100%" }}>
            Bayar
          </Button>
        </Link>
      </Flex>
    </>
  )
}

export const getStaticProps: GetStaticProps<Props, { id: string }> = async ({
  params,
}) => {
  const id = params?.id ?? ""

  return {
    props: {
      event: await findEventsById(id),
    },
    revalidate: 3600,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await listEventIds()
  return { paths: ids.map(({ id }) => `/buy/${id}`), fallback: true }
}

export default BuyPage

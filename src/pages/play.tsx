/** @jsx jsx */
import React, { useEffect, useRef } from "react"
import { jsx, Box, Heading } from "theme-ui"
import Hls from "hls.js"
import { useQueryString } from "../hooks/useQueryString"
import useGetPlaybackId from "../hooks/useGetPlaybackId"

const Play = () => {
  const ref = useRef<HTMLVideoElement>(null)
  const id = useQueryString("eventId")
  const playbackId = useGetPlaybackId(parseInt(id, 10))

  const playbackUrl = `https://stream.mux.com/${playbackId.data?.playbackId}.m3u8`

  useEffect(() => {
    console.log("tes")
    if ((playbackId.data?.playbackId, ref.current)) {
      console.log("test")
      const hls = new Hls()
      hls.loadSource(playbackUrl)
      hls.attachMedia(ref.current)
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        ref.current?.play()
      })
    }
  }, [playbackUrl, playbackId.data])

  if (playbackId.isLoading) {
    return (
      <div>
        <Heading>Loading</Heading>
      </div>
    )
  }

  return (
    <Box>
      <video id="player" ref={ref} />
    </Box>
  )
}

export default Play

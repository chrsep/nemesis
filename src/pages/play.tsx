/** @jsx jsx */
import React, { useEffect, useRef, useState } from "react"
import { Box, Heading, jsx } from "theme-ui"
import Hls from "hls.js"
import { useQueryString } from "../hooks/useQueryString"
import useGetPlaybackId from "../hooks/useGetPlaybackId"

const Play = () => {
  const [isLoded, setIsLoaded] = useState(false)
  const ref = useRef<HTMLVideoElement>(null)
  const id = useQueryString("eventId")
  const playbackId = useGetPlaybackId(parseInt(id, 10))

  useEffect(() => {
    console.log("tes")
    if (!isLoded && playbackId.data?.playbackId !== undefined && ref.current) {
      const playbackUrl = `https://stream.mux.com/${playbackId.data?.playbackId}.m3u8`
      console.log(playbackUrl)
      const hls = new Hls()
      hls.loadSource(playbackUrl)
      hls.attachMedia(ref.current)
      setIsLoaded(true)
    }
  }, [playbackId.data])

  if (playbackId.isLoading) {
    return (
      <div>
        <Heading>Loading</Heading>
      </div>
    )
  }

  return (
    <Box>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        id="player"
        ref={ref}
        sx={{ width: "100%", backgroundColor: "black" }}
        controls
      />
    </Box>
  )
}

export default Play

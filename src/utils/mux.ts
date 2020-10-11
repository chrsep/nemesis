import Mux from "@mux/mux-node"

const { Video } = new Mux()

export const startLiveStream = async () => {
  return Video.LiveStreams.create({
    playback_policy: "public",
    test: process.env.NODE_ENV === "development",
  })
}

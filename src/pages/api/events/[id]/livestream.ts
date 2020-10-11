import { NextApiHandler } from "next"
import auth0, { getQueryString } from "../../../../utils/auth0"
import { startLiveStream } from "../../../../utils/mux"
import { insertNewLivestream } from "../../../../db"

const handlerPost: NextApiHandler = async (req, res) => {
  const eventId = getQueryString(req, "id")
  if (!eventId) {
    res.status(403).end()
    return
  }
  const livestream = await startLiveStream()
  if (
    !livestream.id ||
    !livestream.stream_key ||
    !livestream.playback_ids ||
    livestream.playback_ids.length <= 0
  ) {
    throw new Error("failed to create livestream")
  }

  await insertNewLivestream(
    eventId,
    livestream.id,
    livestream.stream_key,
    livestream.playback_ids[0].id
  )
  res.status(201).json({
    livestream: {
      id: livestream.id,
      key: livestream.stream_key,
      url: livestream.playback_ids,
    },
  })
}

const livestream: NextApiHandler = auth0.requireAuthentication(
  async (req, res) => {
    try {
      if (req.method === "POST") {
        await handlerPost(req, res)
      }

      res.status(200)
    } catch (error) {
      console.log(error)
    }
  }
)

export default livestream

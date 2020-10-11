import { NextApiHandler } from "next"
import auth0, { getQueryString } from "../../../../utils/auth0"
import { findPlaybackIdByEventId } from "../../../../db"

export interface GetPlaybackIdResponse {
  playbackId: string
}
const livestreamId: NextApiHandler = auth0.requireAuthentication(
  async (req, res) => {
    const id = getQueryString(req, "id")
    if (!id) {
      res.status(400).end()
      return
    }

    try {
      const playbackId = await findPlaybackIdByEventId(id)
      if (playbackId.playbackid) {
        res.json({
          playbackId: playbackId.playbackid,
        } as GetPlaybackIdResponse)
      }
      res.json({})
    } catch (error) {
      console.log(error)
    }
  }
)

export default livestreamId

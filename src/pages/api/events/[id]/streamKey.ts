import { NextApiHandler } from "next"
import auth0, { getQueryString } from "../../../../utils/auth0"
import { findStreamKeyByEventId } from "../../../../db"

export interface GetStreamKeyResponse {
  streamKey: string
}
const streamKeyHandler: NextApiHandler = auth0.requireAuthentication(
  async (req, res) => {
    const id = getQueryString(req, "id")
    if (!id) {
      res.status(400).end()
      return
    }

    try {
      const streamKey = await findStreamKeyByEventId(id)
      console.log(streamKey)
      if (streamKey.streamkey) {
        res.json({
          streamKey: streamKey.streamkey,
        })
      }
      res.json({})
    } catch (error) {
      console.log(error)
    }
  }
)

export default streamKeyHandler

import { NextApiHandler } from "next"
import { insertOrder } from "../../../db"
import auth0 from "../../../utils/auth0"

export interface PostNewOrder {
  eventId: number
}
const handlerPost: NextApiHandler = async (req, res) => {
  const session = await auth0.getSession(req)
  const body = await JSON.parse(req.body)
  await insertOrder(session?.user.sub, body.eventId)
}

const order: NextApiHandler = auth0.requireAuthentication(async (req, res) => {
  try {
    if (req.method === "POST") {
      await handlerPost(req, res)
    }

    res.status(200)
  } catch (error) {
    console.log(error)
  }
})

export default order

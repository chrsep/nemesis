import auth0 from "../../../utils/auth0"
import { insertOrder } from "../../../db"

export interface PostNewOrder {
  event_id: string
  price: string
}

const createOrder = auth0.requireAuthentication(async function me(req, res) {
  try {
    const session = await auth0.getSession(req)
    if (!session) {
      res.status(401).end("unauthorized")
      return
    }

    const body: PostNewOrder = JSON.parse(req.body)
    await insertOrder(session?.user?.sub, body.event_id, body.price)
    res.status(201).end()
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
})

export default createOrder

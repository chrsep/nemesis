import { NextApiRequest, NextApiResponse } from "next"
import auth0 from "../../../utils/auth0"
import { insertUser } from "../../../db"

const userHandler = auth0.requireAuthentication(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (req.method === "POST") {
        await insertUser(
          req.body.id,
          req.body.email,
          req.body.email,
          "customer"
        )
      } else {
        res.status(405)
      }
    } catch (error) {
      console.error(error)
      res.status(error.status || 500).end(error.message)
    }
  }
)
export default userHandler

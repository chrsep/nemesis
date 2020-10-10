import { NextApiRequest, NextApiResponse } from "next"
import { destroyCookie } from "nookies"
import auth0 from "../../../utils/auth0"

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    destroyCookie({ res }, "loggedIn", {
      path: "/",
    })
    await auth0.handleLogout(req, res)
  } catch (error) {
    console.error(error)
    res.status(error.status || 400).end(error.message)
  }
}

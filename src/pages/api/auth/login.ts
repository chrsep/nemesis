import { NextApiHandler } from "next"
import auth0, { getQueryString } from "../../../utils/auth0"

const login: NextApiHandler = async (req, res) => {
  const redirectTo = getQueryString(req, "redirectTo")
  try {
    const session = await auth0.getSession(req)
    if (session) {
      res.setHeader("Location", "/")
      res.status(302).end()
      return
    }
    await auth0.handleLogin(req, res, {
      redirectTo,
    })
  } catch (error) {
    console.error(error)
    res.status(error.status || 400).end(error.message)
  }
}

export default login

import { NextApiHandler } from "next"
import auth0, { getQueryString } from "../../../utils/auth0"

const login: NextApiHandler = async (req, res) => {
  const redirectTo = getQueryString(req, "redirectTo")
  try {
    await auth0.handleLogin(req, res, {
      redirectTo,
    })
  } catch (error) {
    console.error(error)
    res.status(error.status || 400).end(error.message)
  }
}

export default login

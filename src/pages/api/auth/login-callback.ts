import { NextApiRequest, NextApiResponse } from "next"
import { setCookie } from "nookies"
import auth0 from "../../../utils/auth0"

export default async function callback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await auth0.handleCallback(req, res, {
      onUserLoaded: async (authReq, authRes, session) => {
        setCookie({ res: authRes }, "loggedIn", "1", {
          secure: process.env.NODE_ENV === "production",
          sameSite: true,
          path: "/",
          httpOnly: false,
        })
        return session
      },
    })
  } catch (error) {
    console.error(error)
    res.status(error.status || 400).end(error.message)
  }
}

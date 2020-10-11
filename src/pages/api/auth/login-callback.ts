import { NextApiRequest, NextApiResponse } from "next"
import { setCookie } from "nookies"
import auth0 from "../../../utils/auth0"
import { insertUser } from "../../../db"

export default async function callback(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await auth0.handleCallback(req, res, {
      onUserLoaded: async (authReq, authRes, session) => {
        const { user } = session
        await insertUser(user.sub, user.email, user.email, "customer")
        // const protocol = req.headers["x-forwarded-proto"]
        // const host = req.headers["x-forwarded-host"]
        // const rest = await fetch(`${protocol}://${host}/api/user/`, {
        //   method: "POST",
        //   body: JSON.stringify({
        //     id: user.sub,
        //     name: user.email,
        //     email: user.email,
        //     role: "customer",
        //   }),
        // })
        setCookie({ res: authRes }, "loggedIn", "1", {
          maxAge: 5184000,
          expires: new Date(Date.now() + 60 * 60 * 24 * 60 * 1000),
          domain: process.env.AUTH0_COOKIE_DOMAIN,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Lax",
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

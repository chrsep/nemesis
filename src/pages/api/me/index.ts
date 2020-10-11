import auth0 from "../../../utils/auth0"
import { listUserUpcomingEvents } from "../../../db"

export interface GetMeResponse {
  family_name: string
  given_name: string
  locale: string
  name: string
  nickname: string
  picture: string
  sub: string
  updated_at: string
  email: string
  email_verified: boolean
  upcomingEvents: Array<{
    id: number
  }>
}

export default auth0.requireAuthentication(async function me(req, res) {
  try {
    const session = await auth0.getSession(req)
    const upcomingEvents = await listUserUpcomingEvents(session?.user.sub)
    res.json({ ...session?.user, upcomingEvents })
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
})

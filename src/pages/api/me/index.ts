import auth0 from "../../../utils/auth0"

export interface UserData {
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
}

export default auth0.requireAuthentication(async function me(req, res) {
  try {
    const session = await auth0.getSession(req)
    res.json(session?.user)
  } catch (error) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
})

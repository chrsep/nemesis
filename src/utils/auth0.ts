import { initAuth0 } from "@auth0/nextjs-auth0"

if (
  !process.env.AUTH0_DOMAIN ||
  !process.env.AUTH0_CLIENT_ID ||
  !process.env.AUTH0_REDIRECT_URI ||
  !process.env.AUTH0_POST_LOGOUT_REDIRECT_URI ||
  !process.env.AUTH0_COOKIE_SECRET
) {
  throw new Error("incomplete auth0 env")
}

export default initAuth0({
  domain: process.env.AUTH0_DOMAIN,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: "openid profile email",
  redirectUri: process.env.AUTH0_REDIRECT_URI,
  postLogoutRedirectUri: process.env.AUTH0_POST_LOGOUT_REDIRECT_URI,
  session: {
    cookieSecret: process.env.AUTH0_COOKIE_SECRET,
    cookieLifetime: 60 * 60 * 24 * 60,
    cookieDomain: process.env.AUTH0_COOKIE_DOMAIN,
    storeIdToken: false,
    storeAccessToken: false,
    storeRefreshToken: false,
  },
})

import { createCookieSessionStorage } from '@remix-run/node'
import { Authenticator } from 'remix-auth'
import {
  type GitHubExtraParams,
  type GitHubProfile,
  GitHubStrategy,
} from 'remix-auth-github'
import invariant from 'tiny-invariant'

invariant(process.env.GITHUB_CLIENT_ID, 'GITHUB_CLIENT_ID is required')
invariant(process.env.GITHUB_CLIENT_SECRET, 'GITHUB_CLIENT_SECRET is required')
invariant(process.env.BASE_URL, 'BASE_URL is required')
invariant(process.env.SESSION_SECRET, 'SESSION_SECRET is required')

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
})

export const auth = new Authenticator<{
  profile: GitHubProfile
  accessToken: string
  extraParams: GitHubExtraParams
}>(sessionStorage)

auth.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: new URL(
        '/auth/github/callback',
        process.env.BASE_URL,
      ).toString(),
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    async (params) => {
      console.log('verify', params)
      return params
    },
  ),
)

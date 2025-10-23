import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  logger: {
    error(code, ...message) {
      console.error(code, message)
    },
    warn(code, ...message) {
      console.error(code, message)
    },
    debug(code, ...message) {
      console.error(code, message)
    },
  },
  providers: [GitHub],
})
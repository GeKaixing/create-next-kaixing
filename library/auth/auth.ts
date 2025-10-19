import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

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
  providers: [Google],
})
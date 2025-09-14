import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId:"222700097232-h8qpdrjgqa303msd9oovp8v9pmlfl9l6.apps.googleusercontent.com",
      clientSecret:"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",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }

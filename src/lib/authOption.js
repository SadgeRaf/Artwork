
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import { loginUser } from "../actions/server/auth";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
     CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          console.log("Auth attempt with credentials:", { email: credentials?.email, hasPassword: !!credentials?.password });
          
          if (!credentials?.email || !credentials?.password) {
            console.log("Missing credentials");
            return null;
          }

          // Test credentials for development
          if (credentials.email === 'admin@gmail.com' && credentials.password === 'monsterwhite') {
            console.log("Test credentials matched");
            return {
              id: 'test-admin-id',
              email: 'admin@gmail.com',
              name: 'Admin User',
              role: 'admin'
            };
          }

          console.log("Trying database authentication");
          // Try to authenticate with database
          const user = await loginUser({
            email: credentials.email,
            password: credentials.password
          });

          if (user) {
            console.log("Database user found:", { id: user._id, email: user.email });
            // Return user object with required fields
            return {
              id: user._id.toString(),
              email: user.email,
              name: user.name,
              role: user.role
            };
          }
          
          console.log("No user found");
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    }),
    // Google Provider (only if environment variables are set)
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
    ] : [])
  ],
  pages: {
    signIn: '/login',
    // Remove error redirect to prevent loops
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT callback - token:", token, "user:", user);
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback - session:", session, "token:", token);
      if (token) {
        session.user.id = token.sub;
        session.user.role = token.role;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
}
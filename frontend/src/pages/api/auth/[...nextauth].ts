import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
        role: { label: 'Role', type: 'text' },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(`${API}/auth/login`, {
            email: credentials?.email,
            password: credentials?.password,
            role: credentials?.role,
          });
          if (res.data.accessToken) {
            return {
              id: res.data.user.id,
              email: res.data.user.email,
              role: res.data.user.role,
              name: res.data.user.name,
              accessToken: res.data.accessToken,
            };
          }
          return null;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = (user as any).role || 'shopper';
        token.accessToken = (user as any).accessToken;
      }
      if (account?.provider === 'google') {
        token.role = 'shopper';
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).role = token.role;
      (session as any).accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: { strategy: 'jwt' },
  secret: process.env.NEXTAUTH_SECRET,
});
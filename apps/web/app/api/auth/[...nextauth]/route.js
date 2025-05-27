// apps/web/app/api/auth/[...nextauth]/route.js
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

import { clientPromise } from "@repo/db/lib/mongodb"; 

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // ✅ Pasa la promesa del cliente nativo de MongoDB al adaptador
  
  adapter: MongoDBAdapter(clientPromise), 
  
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
        // Si el usuario ya existe, no hacemos nada
        if (user) {
            token.id = user.id; // Guardamos el ID del usuario en el token
        }
        return token;
    },
    async session({ session, token, user }) {
        // Aquí puedes agregar más información al objeto de sesión
        if (token.id) {
            session.user.id = token.id; // Agrega el ID del usuario al objeto de sesión
            }
      return session;
    },
  },
 
  pages: {
    signIn: '/',
  },
  // debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
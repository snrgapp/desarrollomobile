import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { ObjectId } from 'mongodb';

import { clientPromise } from '@repo/db/lib/mongodb';
import { usernumber } from '@/lib/generateusernumber';
import { parse } from 'cookie';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  adapter: MongoDBAdapter(clientPromise),

  session: {
    strategy: 'jwt',
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },

  callbacks: {
  async jwt({ token, user }) {
    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection('users');

    // Solo en el primer login, guardar el ID
    if (user) {
      token.email = user.email; // Necesario si no está en el token
    }

    if (token.email) {
      const existingUser = await usersCollection.findOne({ email: token.email });

      if (existingUser) {

        // Actualizar la fecha de último inicio de sesión
        await usersCollection.updateOne(
          { email: token.email },
          { $set: { lastLogin: new Date() } }
        );

        token.typeofuser = existingUser.typeofuser || 'user';
        token.id = existingUser._id.toString();
        token.isAdmin = ['admin', 'superadmin'].includes(token.typeofuser);
      } else {
        token.typeofuser = 'user';
        token.isAdmin = false;
      }
    }

    return token;
  },

  async session({ session, token }) {
    session.user.id = token.id;
    session.user.typeofuser = token.typeofuser;
    session.user.isAdmin = token.isAdmin;
    return session;
  },
},

  events: {
    async createUser({ user,req }) {
      try {
        const client = await clientPromise;
        const db = client.db();
        const usersCollection = db.collection('users');

        // Leer cookies
        const cookies = req?.headers?.cookie ? parse(req.headers.cookie) : {};
        const loginFrom = cookies.loginSource || 'web'; // por defecto 'web'

        console.log(loginFrom, 'loginFrom')

        console.log(user)

        // Total usuarios en BD
        const totalUsers = await usersCollection.countDocuments();

        // Buscar si ya hay admin
        const existingAdmin = await usersCollection.findOne({ typeofuser: 'admin' });

        // Aquí deberías determinar loginFrom, por ejemplo, desde user.metadata o algún campo que pases
        // Como NextAuth no lo pasa directamente, considera usar un query param en signin URL y guardarlo en cookie para leerlo aquí.
        // Por ejemplo, para este ejemplo, asumiré 'web' siempre:

        ////const loginFrom = 'web'; // <-- AJUSTA según tu implementación real

        let type = 'user';
        let source = loginFrom; // Asignar fuente por defecto

        if (totalUsers === 0) {
          // BD vacía: el primer usuario puede ser admin si viene de web
          type = source === 'web' ? 'admin' : 'user';
        } else if (!existingAdmin && source === 'web') {
          // BD NO vacía y no hay admin → nuevo usuario desde web es admin
          type = 'admin';
        } else {
          // Caso general
          type = 'user';
        }

        const generatedUserNumber = await usernumber();

        // Actualizar usuario con tipo y demás info
        await usersCollection.updateOne(
          { _id: new ObjectId(user.id) },
          {
            $set: {
              profileCompleted: false,
              userNumber: generatedUserNumber,
              typeofuser: type,
              source: source,
              createdAt: new Date(),
              updatedAt: new Date(),
              lastLogin: new Date()
            },
          }
        );

        console.log(`✅ Usuario creado: ${user.email} como ${type} con número ${generatedUserNumber}`);
      } catch (err) {
        console.error('❌ Error en createUser:', err.message);
      }
    },
  },

  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

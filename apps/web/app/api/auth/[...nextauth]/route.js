// // apps/web/app/api/auth/[...nextauth]/route.js
// import NextAuth from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// import { MongoDBAdapter } from '@next-auth/mongodb-adapter';

// import { clientPromise } from "@repo/db/lib/mongodb"; 

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   // ✅ Pasa la promesa del cliente nativo de MongoDB al adaptador
  
//   adapter: MongoDBAdapter(clientPromise), 
  
//   session: {
//     strategy: "jwt",
//   },
//   jwt: {
//     secret: process.env.NEXTAUTH_SECRET,
//   },
//   callbacks: {
//     async jwt({ token, user, account, profile }) {
//         // Si el usuario ya existe, no hacemos nada
//         if (user) {
//             token.id = user.id; // Guardamos el ID del usuario en el token
//         }
//         return token;
//     },
//     async session({ session, token, user }) {
//         // Aquí puedes agregar más información al objeto de sesión
//         if (token.id) {
//             session.user.id = token.id; // Agrega el ID del usuario al objeto de sesión
//             }
//       return session;
//     },
//   },
 
//   pages: {
//     signIn: '/',
//   },
//   // debug: process.env.NODE_ENV === "development",
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };


import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { ObjectId } from 'mongodb';

// Asume que este clientPromise es la promesa de tu cliente nativo de MongoDB
import { clientPromise } from "@repo/db/lib/mongodb"; 

import { UserModel } from '@repo/db/models/user';
import { usernumber } from '@/lib/generateusernumber';

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
    async jwt({ token, user, account, profile, isNewUser }) { // Agrega `isNewUser` aquí
      // Si el usuario existe (ya sea nuevo o existente)

      if (user) {
        token.id = user.id; // Guarda el ID del usuario (el _id de MongoDB) en el token
      }

      // Si es un usuario nuevo (primera vez que inicia sesión con este proveedor)
      if (isNewUser) {
        token.isNewUser = true; // Marca el token para indicar que el usuario es nuevo
      }
      return token;
    },
    async session({ session, token, user }) {
      // Aquí puedes agregar más información al objeto de sesión
      if (token.id) {
        session.user.id = token.id; // Agrega el ID del usuario al objeto de sesión
      }
      // Pasa la bandera `isNewUser` del token a la sesión
      if (token.isNewUser) {
        session.isNewUser = token.isNewUser;
      }
      return session;
    },
  },
  // Añade el objeto `events` para manejar acciones al crear un usuario
  events: {
    async createUser(message) {
      console.log('Nuevo usuario creado en la base de datos (por NextAuth):', message.user);
    
      try {
          // Usa el cliente nativo de MongoDB que ya está conectado por el adaptador
          const client = await clientPromise;
          const db = client.db(); // Obtiene la base de datos (por defecto o especifica el nombre)
          
          const userNumber = await usernumber()
          // Actualiza el documento del usuario directamente usando el driver nativo
          // message.user.id ya es el _id del documento de MongoDB
          const result = await db.collection("users").updateOne(
                { _id: new ObjectId(message.user.id) }, // Busca por _id usando ObjectId
                { $set: { profileCompleted: false,
                          userNumber: userNumber // Establece el campo
                 } } // Establece el campo
          );
          
          if (result.modifiedCount === 1) {
              console.log(`Campo 'profileCompleted' establecido a false para el usuario ${message.user.id} en la DB.`);
          } else {
              console.warn(`Advertencia: No se pudo establecer 'profileCompleted' para el usuario ${message.user.id} en el evento createUser. Modificados: ${result.modifiedCount}`);
          }

          } catch (error) {
              console.error("Error al actualizar 'profileCompleted' en createUser event (driver nativo):", error);
          }

    },
  },
      
      pages: {
        signIn: '/', // Esto redirige a la raíz si no está autenticado. La lógica del frontend manejará la redirección a /complete-profile.
      },
      // debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


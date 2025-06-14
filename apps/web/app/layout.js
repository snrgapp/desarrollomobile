import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; // Asegúrate de que la ruta sea correcta

// apps/web/app/layout.js
import { SessionProvider } from 'next-auth/react';
import { headers } from 'next/headers'; // Para obtener la cookie de la sesión

// Para usar getServerSession en un componente de servidor
// Necesitas importar la función desde 'next-auth/next'
// y pasarle las opciones de autenticación
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route"; // Importa tus opciones de auth

// Importa el nuevo Client Component
import AuthSessionProvider from '@/components/AuthSessionProvider';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Usa el nuevo Client Component para envolver children */}
        <AuthSessionProvider session={session}>
          {children}
        </AuthSessionProvider>
      </body>
    </html>
  );
}

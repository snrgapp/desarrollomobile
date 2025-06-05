"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";


export default function WelcomePage() {


  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      console.log("usuario autenticado:", session.user);
      //router.push("/dashboard"); // Redirige a la página principal si ya está autenticado
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Cargando sesión...</p>;
  }

  console.log("WelcomePage");
  

  const handleEnter = () => {
     console.log("Redirigiendo a login...");
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900 px-6 py-12">
      {/* Contenedor principal con un fondo claro y texto oscuro */}

      
      <motion.div
        className="flex flex-col items-center justify-center bg-white p-8 sm:p-12 rounded-3xl shadow-xl max-w-2xl w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Un contenedor blanco que centra el contenido y le da un aspecto más de "tarjeta" */}

        <motion.img
          src="/logo-claro.png" // Asegúrate de tener este logo en /public y que sea preferiblemente un SVG con colores neutros
          alt="Logo Synergy"
          className="w-24 h-24 sm:w-28 sm:h-28 mb-6 sm:mb-8" // Ajuste de tamaño para responsividad
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.1 }}
        />

        <motion.h1
          className="text-4xl sm:text-5xl font-bold text-gray-800 mb-3 sm:mb-4 tracking-tight" // Font más sobria, espaciado de letras
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          ¡Bienvenido a Synergy App!
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 max-w-xl leading-relaxed" // Texto más claro, altura de línea
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Gestiona tu información con precisión y estilo. <br />
          Haz clic en el botón de abajo para comenzar tu experiencia.
        </motion.p>

        <motion.button
          onClick={handleEnter}
          className="bg-blue-600 text-white font-medium py-3 px-10 rounded-full text-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition ease-in-out duration-300 transform" // Botón más limpio, sin gradiente, con efecto hover
          whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)" }} // Sutil sombra en hover
          whileTap={{ scale: 0.98 }}
        >
          Ingresa a Synergy Dashboard
        </motion.button>
      </motion.div>
    </div>
  );
}
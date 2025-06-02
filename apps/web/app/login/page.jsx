"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log("LoginPage session:", session);

  
  const handleLocalLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/login", { email, password });
      const { token, user } = res.data;
      
      localStorage.setItem("apiToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      //Swal.fire("Bienvenido", `Hola ${user.name}`, "success");
      router.push("/dashboard");
    } catch (err) {
      console.error("Error de login:", err);
      Swal.fire("Error", err.response?.data?.message || "Error al iniciar sesión", "error");
    }
  };
  
  // Manejara el registro de usuarios correo e email y contraseña y proceso de creacion de cuenta
  // Este método se encargará de registrar un nuevo usuario
  const handleRegister = async () => {
    try {
      const res = await axios.post("/api/register", { email, password });
      
      Swal.fire("Registrado", "Cuenta creada con éxito", "success");
      // Opcional: login automático
      await handleLocalLogin({ preventDefault: () => {} });
    } catch (err) {
      console.error("Error de registro:", err);
      Swal.fire("Error", err.response?.data?.message || "No se pudo registrar", "error");
    }
  };

  // Redirige si el usuario está autenticado con NextAuth
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/swagger");
    }
  }, [status, router]);
  
  if (status === "loading") return <p>Cargando sesión...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleLocalLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md mb-6"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full mb-4 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full mb-4 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Iniciar sesión
        </button>
        <br />

        <button
          type="button"
          onClick={handleRegister}
          className="w-full mt-4 bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
        >
          Registrarse
        </button>
      </form>

      <div className="bg-white p-6 rounded shadow-md w-full max-w-md text-center">
        <h3 className="text-xl font-semibold mb-4">O usa tu cuenta de Google</h3>
        {session ? (
          <div>
            <p className="mb-2">Autenticado como {session.user.email}</p>
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="flex items-center justify-center bg-white border p-2 rounded shadow hover:bg-gray-50"
          >
            <img
            src="/Google.png" // Example URL
            alt="Google Logo"
            width={120}
            height={50}
            style={{ verticalAlign: 'middle' }} 
              />
            Iniciar con Google
          </button>
        )}
      </div>
    </div>
  );
}

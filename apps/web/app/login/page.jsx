// apps/web/app/login/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/login", { email, password });

      const { token, user } = res.data;

      // Guardar token en localStorage
      localStorage.setItem("apiToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/homeuser"); // Redirige al home
    } catch (err) {
      console.error("Error de login", err);
      setError("Credenciales inválidas o error del servidor");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Iniciar Sesión</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

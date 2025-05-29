"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

// Función para decodificar el JWT sin verificar la firma
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

// Función para verificar si el token JWT expiró
function isTokenExpired(token) {
  const payload = parseJwt(token);
  if (!payload || !payload.exp) return true; // Token inválido o sin campo exp
  const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
  return payload.exp < now; // true si expiró
}

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [apiToken, setApiToken] = useState(null);
  const [loadingToken, setLoadingToken] = useState(true);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [usersError, setUsersError] = useState(null);

  // 1. Si no está autenticado en NextAuth, redirige al login
  useEffect(() => {
    const storedToken = localStorage.getItem("apiToken")
   if (status === "unauthenticated" && !storedToken) {


      router.push("/");
    }
  }, [status, router]);

  // 2. Obtener token API desde localStorage o llamando a la API
  useEffect(() => {
    const getAndStoreApiToken = async () => {
      const storedToken = localStorage.getItem("apiToken");

      if (storedToken) {
        // Verificamos si el token almacenado expiró
        if (isTokenExpired(storedToken)) {
          console.log("Token expirado, eliminando token...");
          localStorage.removeItem("apiToken");
        } else {
          console.log("📦 Token válido obtenido de localStorage:", storedToken);
          setApiToken(storedToken);
          setLoadingToken(false);
          return;
        }
      }

      if (status === "authenticated") {
        try {
          const res = await fetch("/api/auth/mobile-token"); // Ruta para obtener token nuevo
          if (res.ok) {
            const data = await res.json();
            setApiToken(data.token);
            localStorage.setItem("apiToken", data.token);
            console.log("Token nuevo obtenido y almacenado:", data.token);
          } else {
            console.error("Error al obtener token nuevo:", res.status, await res.text());
          }
        } catch (error) {
          console.error("Error en fetch para obtener token:", error);
        } finally {
          setLoadingToken(false);
        }
      }
    };

    getAndStoreApiToken();
  }, [status]);

  // 3. Con el token válido, hacemos la llamada a la API para obtener usuarios
  useEffect(() => {
    if (!apiToken) return;
    if (loadingUsers || users.length > 0 || usersError) return;

    // Verificar expiración antes de llamar
    if (isTokenExpired(apiToken)) {
      alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
      localStorage.removeItem("apiToken");
      router.push("/");
      return;
    }

    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const res = await axios.get("/api/user", {
          headers: { Authorization: `Bearer ${apiToken}` },
        });

        setUsers(res.data.data || []);
        setUsersError(null);
        console.log("✅ Usuarios obtenidos:", res.data);
      } catch (error) {
        console.error("Error al llamar /api/user:", error);

        if (error.response) {
          if (error.response.status === 401) {
            alert("Token inválido o expirado. Inicia sesión nuevamente.");
            localStorage.removeItem("apiToken");
            router.push("/");
          } else {
            setUsersError(`Error ${error.response.status}: ${error.response.data?.error || "Error desconocido"}`);
          }
        } else if (error.request) {
          setUsersError("No se recibió respuesta del servidor.");
        } else {
          setUsersError("Error desconocido al hacer la solicitud.");
        }
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, [apiToken]);

  if (status === "loading" || loadingToken) {
    return <p>Cargando información...</p>;
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>¡Bienvenido, {session?.user?.name || JSON.parse(localStorage.getItem("user"))?.name || "Usuario"}!</h1>

      <p>Has iniciado sesión correctamente con NextAuth.js.</p>

      <h2>Lista de Usuarios Registrados</h2>

      {loadingUsers ? (
        <p>Cargando usuarios desde la base de datos...</p>
      ) : usersError ? (
        <p style={{ color: "red" }}>Error al cargar usuarios: {usersError}</p>
      ) : users.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {users.map((user) => (
            <li
              key={user.id || user._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <p>
                <strong>Nombre:</strong> {user.name} {user.lastname}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Número de Usuario:</strong> {user.userNumber}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay usuarios registrados en la base de datos.</p>
      )}

      <button
        onClick={() => {
          localStorage.removeItem("apiToken"); // Limpiar token local
          signOut();
        }}
        style={{ marginTop: "30px", padding: "10px 20px", fontSize: "16px" }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
}

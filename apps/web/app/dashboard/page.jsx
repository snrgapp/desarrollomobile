'use client'

import { useEffect, useState } from 'react';
import { useSession, signOut } from "next-auth/react";
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useRouter } from "next/navigation";

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



export default function Dashboard() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState(null);


  const [apiToken, setApiToken] = useState(null);
  const [loadingToken, setLoadingToken] = useState(true);
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [usersError, setUsersError] = useState(null);
  const router = useRouter();



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

  // 3. Con el token válido, hacemos la llamada a la API para mostrar el dasboard
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

        const fetchStats = async () => {
            setLoadingUsers(true);
            try {
                console.log("📦 Llamando a /api/admin con token:", apiToken);
                const res = await axios.get("/api/admin", {
                headers: { Authorization: `Bearer ${apiToken}` },
                });

                setStats(res.data);//(res.data.data || []);
                setUsersError(null);
                console.log("✅ Usuarios obtenidos:", res.data);

                
            } catch (error) {
                console.error("Error al llamar /api/admin", error);

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

        fetchStats();
  }, [apiToken]);

  if (status === "loading" || loadingToken) {
    return <p>Cargando información...</p>;
  }


















//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await axios.get('/api/admin',{
//             headers: {
//                  Authorization: `Bearer ${token}`, // podés sacarlo del localStorage o contexto
//             },
//         });
        
//         setStats(res.data);
//       } catch (err) {
//         console.error('Error al obtener estadísticas:', err);
//       }
//     };
//     fetchStats();
//   }, []);

  if (!stats) return <div className="p-10 text-center text-gray-600">Cargando estadísticas...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard del Administrador</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card title="Usuarios registrados" value={stats.usersTotal} />
        <Card title="Inicios últimos 24h" value={stats.login24h} />
        <Card title="Inicios últimos 72h" value={stats.login72h} />
        <Card title="Usuarios con Match" value={stats.matched} />
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Actividad semanal (Registros por día)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stats.activity}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" stroke="#3182CE" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-gray-500 text-sm uppercase">{title}</h2>
      <p className="text-2xl font-semibold mt-2">{value}</p>
    </div>
  );
}

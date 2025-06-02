'use client'

import { useEffect, useState } from 'react';
import { useSession, signOut } from "next-auth/react";
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useRouter } from "next/navigation";
import { FaUsers, FaClock, FaCalendarAlt, FaHeart, FaSignOutAlt, FaChartLine, FaChartBar, FaSearch } from 'react-icons/fa';
import { IoStatsChart } from "react-icons/io5";

// --- Funciones de Utilidad (sin cambios) ---
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

function isTokenExpired(token) {
  const payload = parseJwt(token);
  if (!payload || !payload.exp) return true;
  const now = Math.floor(Date.now() / 1000);
  return payload.exp < now;
}

// --- Componente Dashboard ---
export default function Dashboard() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState(null);
  const [apiToken, setApiToken] = useState(null);
  const [loadingToken, setLoadingToken] = useState(true);
  const [loadingStats, setLoadingStats] = useState(false);
  const [statsError, setStatsError] = useState(null);
  const [localUser, setLocalUser] = useState(null);
  const router = useRouter();

  // Estado para filtros
  const [dateRange, setDateRange] = useState('7d');
  const [userType, setUserType] = useState('all');

  // ✅ NUEVO ESTADO para detectar el modo oscuro
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Efecto para detectar el modo oscuro del sistema
  useEffect(() => {
    // Función para actualizar el estado del modo oscuro
    const checkDarkMode = () => {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    };

    // Ejecutar al montar el componente
    checkDarkMode();

    // Añadir listener para cambios en el modo oscuro
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkDarkMode);

    // Limpiar listener al desmontar el componente
    return () => mediaQuery.removeEventListener('change', checkDarkMode);
  }, []); // Se ejecuta solo una vez al montar

  // Efecto para cargar usuario local
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setLocalUser(JSON.parse(storedUser));
    }
  }, []);

  // Efecto para redirigir si no está autenticado
  useEffect(() => {
    const storedToken = localStorage.getItem("apiToken");
    if (status === "unauthenticated" && !storedToken) {
      router.push("/");
    }
  }, [status, router]);

  // Efecto para obtener y almacenar el token API
  useEffect(() => {
    const getAndStoreApiToken = async () => {
      setLoadingToken(true);
      const storedToken = localStorage.getItem("apiToken");

      if (storedToken && !isTokenExpired(storedToken)) {
        console.log("📦 Token válido obtenido de localStorage.");
        setApiToken(storedToken);
        setLoadingToken(false);
        return;
      }

      if (status === "authenticated") {
        try {
          console.log("Intentando obtener token nuevo...");
          const res = await fetch("/api/auth/mobile-token");
          if (res.ok) {
            const data = await res.json();
            setApiToken(data.token);
            localStorage.setItem("apiToken", data.token);
            console.log("✅ Token nuevo obtenido y almacenado.");
          } else {
            console.error("Error al obtener token nuevo:", res.status, await res.text());
            signOut({ callbackUrl: "/" });
          }
        } catch (error) {
          console.error("Error en fetch para obtener token:", error);
          signOut({ callbackUrl: "/" });
        } finally {
          setLoadingToken(false);
        }
      } else {
        setLoadingToken(false);
      }
    };

    getAndStoreApiToken();
  }, [status, router]);

  // 3. Con el token válido, hacemos la llamada a la API para mostrar el dasboard
useEffect(() => {
  const fetchDashboardStats = async () => {
    if (!apiToken) return; // No hay token, no se puede hacer la llamada

    // Mover la verificación de expiración aquí para asegurar que siempre haya un token válido
    if (isTokenExpired(apiToken)) {
      alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
      localStorage.removeItem("apiToken");
      localStorage.removeItem("user"); // También limpiar user
      signOut({ callbackUrl: "/" }); // Cerrar sesión de NextAuth
      return;
    }

    // ✅ Importante: Mueve el chequeo de loadingStats *dentro* de la función si la vas a usar
    // Pero es mejor usarla como condición para llamar a fetchDashboardStats, NO como dependencia del useEffect.
    if (loadingStats) return; // Si ya está cargando, no hacer otra llamada

    setLoadingStats(true); // Renombrado
    setStatsError(null); // Renombrado

    try {
      console.log("📦 Llamando a /api/admin con token...");
      const queryParams = new URLSearchParams({
        dateRange,
        userType,
      }).toString();

      const res = await axios.get(`/api/admin?${queryParams}`, {
        headers: { Authorization: `Bearer ${apiToken}` },
      });

      setStats(res.data);
      console.log("✅ Información para el dashboard:", res.data);
    } catch (error) {
      console.error("Error al llamar /api/admin", error);
      if (error.response) {
        if (error.response.status === 401) {
          alert("Token inválido o expirado. Inicia sesión nuevamente.");
          localStorage.removeItem("apiToken");
          localStorage.removeItem("user");
          signOut({ callbackUrl: "/" });
        } else {
          setStatsError(`Error ${error.response.status}: ${error.response.data?.error || "Error desconocido"}`);
        }
      } else if (error.request) {
        setStatsError("No se recibió respuesta del servidor.");
      } else {
        setStatsError("Error desconocido al hacer la solicitud.");
      }
    } finally {
      setLoadingStats(false);
    }
  };

  // ✅ AQUÍ ESTÁ EL CAMBIO CLAVE:
  // El useEffect solo se dispara cuando apiToken, dateRange o userType cambian.
  // La condición `!loadingStats` se asegura de que solo se inicie la llamada
  // si no hay una ya en curso.
  if (apiToken) { // Solo si tenemos un apiToken
    fetchDashboardStats();
  }

}, [apiToken, dateRange, userType, router]); // ✅ ¡loadingStats HA SIDO ELIMINADO DE LAS DEPENDENCIAS!


  // Manejo de estados de carga y error
  if (status === "loading" || loadingToken) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <IoStatsChart className="animate-spin text-blue-500 text-6xl mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  if (statsError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-50">
        <div className="text-center p-6 rounded-lg bg-white shadow-lg">
          <p className="text-red-700 text-xl font-semibold mb-4">Error al cargar el dashboard:</p>
          <p className="text-gray-700">{statsError}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!stats && loadingStats) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <IoStatsChart className="animate-spin text-blue-500 text-6xl mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <p className="text-gray-600 dark:text-gray-400 text-lg">No se pudo cargar el dashboard. Intenta de nuevo más tarde.</p>
      </div>
    );
  }

  // --- Renderizado del Dashboard ---
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 sm:p-8 font-sans transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header del Dashboard */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tight mb-2">
              Bienvenido,{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {session?.user?.name
                  ? session.user.name.split(' ')[0]
                  : localUser
                  ? localUser.name.split(' ')[0]
                  : "Usuario"}
              </span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-md">Dashboard de Administración de Synergy App</p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("apiToken");
              localStorage.removeItem("user");
              signOut({ callbackUrl: "/" });
            }}
            className="mt-4 sm:mt-0 inline-flex items-center px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 text-sm"
          >
            <FaSignOutAlt className="mr-2 text-lg" />
            Cerrar sesión
          </button>
        </header>

        {/* Sección de Filtros */}
        <section className="mb-8 p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <label htmlFor="dateRange" className="text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap">Rango de Fecha:</label>
            <select
              id="dateRange"
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 w-full"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            >
              <option value="24h">Últimas 24 horas</option>
              <option value="7d">Últimos 7 días</option>
              <option value="30d">Últimos 30 días</option>
              <option value="all">Todo el tiempo</option>
            </select>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <label htmlFor="userType" className="text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap">Tipo de Usuario:</label>
            <select
              id="userType"
              className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 w-full"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="all">Todos</option>
              <option value="web">Web</option>
              <option value="mobile">Móvil</option>
            </select>
          </div>
        </section>

        {/* Sección de Tarjetas de Métricas */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card title="Usuarios Registrados" value={stats.usersTotal} icon={FaUsers} color="bg-gradient-to-br from-blue-500 to-blue-600" />
          <Card title="Inicios Sesión (24h)" value={stats.login24h} icon={FaClock} color="bg-gradient-to-br from-green-500 to-green-600" />
          <Card title="Inicios Sesión (72h)" value={stats.login72h} icon={FaCalendarAlt} color="bg-gradient-to-br from-purple-500 to-purple-600" />
          <Card title="Usuarios con Match" value={stats.matched} icon={FaHeart} color="bg-gradient-to-br from-pink-500 to-pink-600" />
        </section>

        {/* Sección de Gráficos */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Gráfico de Actividad Semanal (Registros) */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 xl:col-span-1">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
              <FaChartLine className="mr-2 text-blue-500" />
              Actividad (Registros por día)
            </h2>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={stats.activity} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                {/* ✅ Corrección aquí: Usar isDarkMode para el color del stroke */}
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#4a5568" : "#e0e0e0"} />
                <XAxis
                  dataKey="_id"
                  stroke={isDarkMode ? "#a0aec0" : "#6b7280"} // gray-400 o gray-500
                  tick={{ fontSize: 13, fill: isDarkMode ? '#a0aec0' : '#6b7280' }}
                  padding={{ left: 20, right: 20 }}
                />
                <YAxis
                  stroke={isDarkMode ? "#a0aec0" : "#6b7280"}
                  tick={{ fontSize: 13, fill: isDarkMode ? '#a0aec0' : '#6b7280' }}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    borderColor: isDarkMode ? "#2d3748" : "#cbd5e0", // gray-800 o gray-300
                    background: isDarkMode ? '#1a202c' : '#ffffff', // gray-900 o white
                    boxShadow: isDarkMode ? '0 4px 12px rgba(0,0,0,0.5)' : '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                  itemStyle={{ fontWeight: "bold", color: isDarkMode ? "#63b3ed" : "#3182ce" }} // blue-300 o blue-600
                  labelStyle={{ color: isDarkMode ? '#e2e8f0' : '#4a5568' }} // gray-200 o gray-700
                  cursor={{ stroke: isDarkMode ? '#2c5282' : '#90cdf4', strokeWidth: 2 }} // blue-800 o blue-200
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#3b82f6" // blue-500 (este color puede ser fijo o también condicional)
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#3b82f6", stroke: isDarkMode ? '#1a202c' : '#ffffff', strokeWidth: 1 }}
                  activeDot={{ r: 7, strokeWidth: 3, stroke: "#60a5fa", fill: isDarkMode ? '#1a202c' : '#ffffff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico de Usuarios por Fuente */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 xl:col-span-1">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
              <FaChartBar className="mr-2 text-emerald-500" />
              Usuarios por Fuente
            </h2>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={stats.usersBySource || []} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                {/* ✅ Corrección aquí: Usar isDarkMode para el color del stroke */}
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#4a5568" : "#e0e0e0"} />
                <XAxis dataKey="_id" stroke={isDarkMode ? "#a0aec0" : "#6b7280"} tick={{ fontSize: 13, fill: isDarkMode ? '#a0aec0' : '#6b7280' }} />
                <YAxis stroke={isDarkMode ? "#a0aec0" : "#6b7280"} tick={{ fontSize: 13, fill: isDarkMode ? '#a0aec0' : '#6b7280' }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    borderColor: isDarkMode ? "#2d3748" : "#cbd5e0",
                    background: isDarkMode ? '#1a202c' : '#ffffff',
                    boxShadow: isDarkMode ? '0 4px 12px rgba(0,0,0,0.5)' : '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                  itemStyle={{ fontWeight: "bold", color: isDarkMode ? "#38a169" : "#10b981" }} // green-400 o emerald-500
                  labelStyle={{ color: isDarkMode ? '#e2e8f0' : '#4a5568' }}
                  cursor={{ fill: isDarkMode ? '#2d3748' : '#e0e0e0', opacity: 0.3 }}
                />
                <Bar dataKey="count" fill="#10b981" barSize={30} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

      </div>
    </div>
  );
}

// --- Componente Card (sin cambios, ya está bien) ---
function Card({ title, value, icon: Icon, color }) {
  return (
    <div className={`relative ${color} text-white rounded-xl shadow-lg p-6 flex flex-col items-start transform hover:scale-102 transition-transform duration-300 ease-in-out overflow-hidden`}>
      <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-20 text-white">
        {Icon && <Icon className="text-7xl opacity-50" />}
      </div>
      <div className="flex items-center mb-4">
        {Icon && <Icon className="text-3xl mr-3" />}
        <h3 className="text-sm font-medium uppercase tracking-wider opacity-90">{title}</h3>
      </div>
      <p className="text-4xl font-extrabold mt-auto">{value}</p>
    </div>
  );
}
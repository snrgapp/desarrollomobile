// apps/web/app/home/page.js
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [apiToken, setApiToken] = useState(null);
  const [loadingToken, setLoadingToken] = useState(true); // Empieza en true para que muestre "Cargando..."
  const [users, setUsers] = useState([]); // Estado para almacenar la lista de usuarios
  const [loadingUsers, setLoadingUsers] = useState(false); // Estado para la carga de usuarios
  const [usersError, setUsersError] = useState(null); // Estado para manejar errores al obtener usuarios

  // Redirigir a login si no está autenticado
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  // Efecto para obtener el token de API una vez que la sesión esté autenticada
  useEffect(() => {
    const getAndStoreApiToken = async () => {

        // Intenta obtener primero desde localStorage
        const storedToken = localStorage.getItem('apiToken');
        if (storedToken) {
        console.log("📦 Token obtenido de localStorage:", storedToken);
        setApiToken(storedToken);
        setLoadingToken(false);
        return;
        }

      if (status === "authenticated" && !apiToken && loadingToken) { // Solo si aún no hay token y estamos cargando
        try {
          const res = await fetch('/api/auth/mobile-token'); // Llama a tu ruta de generación de tokens
          if (res.ok) {
            const data = await res.json();
            setApiToken(data.token); // Guarda el token
            console.log("Token de API obtenido con éxito. Token:", data.token);
            localStorage.setItem('apiToken', data.token);
            
            
          } else {
            console.error("Error al obtener el token de API:", res.status, await res.text());
            // Maneja el error, tal vez redirigir o mostrar un mensaje
          }
        } catch (error) {
          console.error("Fallo la llamada para obtener el token de API:", error);
          // Maneja el error
        } finally {
          setLoadingToken(false); // Deja de cargar el token
        }
      }
    };
    getAndStoreApiToken();
  }, [status, apiToken, loadingToken]);


 useEffect(() => {
     console.log("🧪 useEffect ejecutado con apiToken:", apiToken);
  // Solo ejecuta cuando apiToken esté definido
  if (!apiToken || loadingUsers || users.length > 0 || usersError) {
    return; // Evita ejecución innecesaria
  }


  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await axios.get('/api/user', {
        headers: {
          'Authorization': `Bearer ${apiToken}`
        }
      });

      const data = res.data;
      setUsers(data.data || []);
      setUsersError(null);
      console.log("✅ Lista de usuarios obtenida:", data);
    } catch (error) {
      console.error("❌ Fallo la llamada a /api/user:", error);
      if (error.response) {
        setUsersError(`Error ${error.response.status}: ${error.response.data?.error || 'Error desconocido'}`);
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
}, [apiToken, loadingUsers, users.length, usersError]);



  // Muestra "Cargando..." mientras la sesión o el token se están obteniendo
  if (status === "loading" || loadingToken) {
    return <p>Cargando información...</p>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1>¡Bienvenido, {session?.user?.name || 'Usuario'}!</h1>
      <p>Has iniciado sesión correctamente con NextAuth.js.</p>

      <h2>Lista de Usuarios Registrados</h2>
      {loadingUsers ? (
        <p>Cargando usuarios desde la base de datos...</p>
      ) : usersError ? (
        <p style={{ color: 'red' }}>Error al cargar usuarios: {usersError}</p>
      ) : users.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {users.map((user) => (
            // Usa user.id o user._id según cómo venga de tu base de datos (MongoDB suele usar _id)
            <li key={user.id || user._id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px' }}>
              <p><strong>Nombre:</strong> {user.name} {user.lastname}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Número de Usuario:</strong> {user.userNumber}</p>
              {/* Puedes mostrar más campos del usuario aquí si los tienes en la DB */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay usuarios registrados en la base de datos.</p>
      )}

      <button onClick={() => signOut()} style={{ marginTop: '30px', padding: '10px 20px', fontSize: '16px' }}>Cerrar Sesión</button>
    </div>
  );
}
"use client"; // Este componente es del lado del cliente
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Para useRouter en App Router

  
  export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/homeuser"); // Redirige a la página principal si ya está autenticado
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Cargando sesión...</p>;
  }

  const handleLogin = () => {
    router.push("/login");
  }

  return (
    <div>

    <div>
      <h1>Pagina Principal</h1>
      <p>Bienvenido a la aplicación de Synergy Match </p>
      <p>Inicia sesión para continuar.</p>
      <p>
        Si no tienes una cuenta, puedes registrarte en el siguiente enlace:
        <br />
        <button onClick={() => signIn("google")}>Iniciar sesión con Google
          <img
            src="/Google.png" // Example URL
            alt="Google Logo"
            width={120}
            height={50}
            style={{ verticalAlign: 'middle' }} // Basic alignment
            />
          Login
        </button>
        .
      </p>
    </div>
    <div>
          <h1>Ya tiene cuenta Ingresa aca:  </h1>
          {session ? (
            <div>
              <p>Autenticado como {session.user.name}</p>
              <button onClick={() => signOut()}>Cerrar Sesión</button>
            </div>
          ) : (
            <div>
              
              <button onClick={() => signIn("google")}>Iniciar sesión con Google</button> <br /><br />
              <button onClick={()=> handleLogin()}>Inicia datos de acceso</button> <br />
              {/* Puedes añadir más botones para otros proveedores */}
            </div>
          )}
        </div>
          </div>
  );
}

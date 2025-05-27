// apps/web/app/login/page.js
"use client"; // Este componente es del lado del cliente

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Para useRouter en App Router

export default function LoginPage() {
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

  return (
    <div>
      <h1>Login</h1>
      {session ? (
        <div>
          <p>Autenticado como {session.user.name}</p>
          <button onClick={() => signOut()}>Cerrar Sesión</button>
        </div>
      ) : (
        <div>
          <p>No autenticado</p>
          <button onClick={() => signIn("google")}>Iniciar sesión con Google</button> <br />
            <button onClick={() => signIn("Instagram")}>Iniciar sesión con Instagram</button><br />
            <button onClick={() => signIn("facebook")}>Iniciar sesión con Facebook</button><br />

          {/* Puedes añadir más botones para otros proveedores */}
        </div>
      )}
    </div>
  );
}




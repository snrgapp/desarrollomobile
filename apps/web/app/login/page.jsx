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

  // Nuevos estados para registro
  // Estado para manejar el registro de usuarios
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");

  const [isRegistering, setIsRegistering] = useState(false);

  const [userType, setUserType] = useState("user"); // user o admin
  const [adminSecret, setAdminSecret] = useState(""); // clave para admin

  //console.log("LoginPage session:", session);

  // Manejara el inicio de sesión local con correo y contraseña
  // Este método se encargará de iniciar sesión con correo y contraseña
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
      Swal.fire("Error", err.response?.data?.error 
        || err.response?.data?.message 
        || err.message 
        || "Error al iniciar sesión", "error");
    }
  };
  
  // Manejara el registro de usuarios correo e email y contraseña y proceso de creacion de cuenta
  // Este método se encargará de registrar un nuevo usuario
  const handleRegister = async (e) => {
  e.preventDefault();

  // Verifica si quiere registrarse como admin
  if (userType === "admin") {
    // Cargar la clave del entorno
    const expectedAdminKey = process.env.NEXT_PUBLIC_ADMIN_REGISTRATION_SECRET;
    console.log("expectedAdminKey:", expectedAdminKey);
    console.log("adminSecret:", adminSecret);

    if (adminSecret !== expectedAdminKey) {
      return Swal.fire({
        title: "Clave incorrecta",
        text: "La clave para registrarse como administrador es incorrecta.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  }

  //Limpia los campos del formulario después de enviar
    const resetForm = () => {
      setName("");
      setLastname("");
      setPhone("");
      setEmail("");
      setPassword("");
      setAdminSecret("");
      setUserType("user");
    };

  try {
    const res = await axios.post("/api/user", {
      name,
      lastname,
      phone,
      email,
      password,
      typeofuser: userType, // envías 'admin' o 'user'
      source: "web",
    });

    Swal.fire({
      title: "Registrado",
      text: "Cuenta creada con éxito",
      icon: "success",
      confirmButtonText: "Continuar",
    }).then(() => {
        setIsRegistering(false);
        resetForm();
    });
  } catch (err) {
    Swal.fire({
      title: "Error al registrar",
      text: err.response?.data?.error || "No se pudo registrar",
      icon: "error",
      confirmButtonColor: "#d33",
    });
  }
};


  // Redirige si el usuario está autenticado con NextAuth
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);
  
  
 const loginWithGoogleAs = (type) => {
  document.cookie = `loginSource=${type}; path=/; max-age=3600; SameSite=Lax`; // guarda la fuente por 1 hora
  signIn("google", { callbackUrl: "/login" });
};
  
  useEffect(() => {
    setEmail("");
    setPassword("");
    setName("");
    setLastname("");
    setPhone("");
  }, [isRegistering]);

  // para front de mobile 
  
  // signIn("google", { callbackUrl: "/", redirect: true, loginFrom: "mobile" });
  
  
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={isRegistering ? handleRegister : handleLocalLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-md mb-6"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isRegistering ? "Registro de Admin" : "Admin Login"}
        </h2>

        {isRegistering && (
          <>
            <input
              type="text"
              placeholder="Nombre"
              className="w-full mb-4 p-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Apellido"
              className="w-full mb-4 p-2 border rounded"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
            <input
              type="tel"
              placeholder="Teléfono"
              className="w-full mb-4 p-2 border rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
             
              <select
                className="w-full mb-4 p-2 border rounded"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                required
              >
                <option value="user">Usuario: </option>
                <option value="admin">Administrador: </option>
              </select>

              {userType === "admin" && (
                <input
                  type="password"
                  placeholder="Clave secreta de administrador"
                  className="w-full mb-4 p-2 border rounded"
                  value={adminSecret}
                  onChange={(e) => setAdminSecret(e.target.value)}
                  required
                />
              )}
            </>
                
        )}

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
          {isRegistering ? "Registrarse" : "Iniciar sesión"}
        </button>

        <button
          type="button"
          onClick={() => setIsRegistering(!isRegistering)}
          className="w-full mt-4 bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
        >
          {isRegistering ? "Ya tengo cuenta" : "Registrarme"}
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
              onClick={() => loginWithGoogleAs("web")}
              className="flex items-center gap-2 justify-center bg-white border p-2 rounded shadow hover:bg-gray-50 w-full"
            >
              <img
                src="/Google.png"
                alt="Google Logo"
                width={20}
                height={20}
                className="inline-block"
              />
              <span>Iniciar con Google</span>
            </button>
        )}
      </div>
    </div>
    
  );
  
}


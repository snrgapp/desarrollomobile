
export default function Home() {
  return (
    <div>
      <h1>Pagina Principal</h1>
      <p>Bienvenido a la aplicación de Synergy Match </p>
      <p>Inicia sesión para continuar.</p>
      <p>
        Si no tienes una cuenta, puedes registrarte en el siguiente enlace:
        <br />
        <a href="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <img
            src="/Google.png" // Example URL
            alt="Google Logo"
            width={120}
            height={50}
            style={{ verticalAlign: 'middle' }} // Basic alignment
          />
          Login
        </a>
        .
      </p>
    </div>
  );
}
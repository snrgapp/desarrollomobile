// next.config.mjs o next.config.js
const nextConfig = {
  serverExternalPackages: ['mongoose', '@aws-sdk/client-s3'] // La opción se movió fuera de 'experimental'
  // ... otras configuraciones
};
export default nextConfig;
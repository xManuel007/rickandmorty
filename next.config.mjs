/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['rickandmortyapi.com', 'media1.tenor.com', 'media3.giphy.com'], // Agrega el hostname aquí
  },
};

export default nextConfig;

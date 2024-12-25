/** @type {import('next').NextConfig} */
import path from 'path';

const __dirname = new URL('.', import.meta.url).pathname;

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/editor',
        destination: '/builder',
        permanent: true,
      },
    ];
  },
  webpack(config) {
    config.cache = false; // Disable webpack caching
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

export default nextConfig;

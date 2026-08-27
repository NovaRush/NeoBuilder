import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    tsconfigPath: './tsconfig.json',
  },
  // Support for subdomain routing
  experimental: {
    allowedOrigins: ['*.example.com'],
  },
};

export default nextConfig;

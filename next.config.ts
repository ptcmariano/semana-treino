import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'docs',
  trailingSlash: true,
  basePath: '/semana-treino',
  assetPrefix: '/semana-treino/_next/static/',
};

export default nextConfig;

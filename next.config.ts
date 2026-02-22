import type { NextConfig } from "next";
import { withSerwist } from "@serwist/turbopack";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'docs',
  trailingSlash: true,
  basePath: '/semana-treino',
  images: {
    unoptimized: true,
  },
};

export default withSerwist(nextConfig);

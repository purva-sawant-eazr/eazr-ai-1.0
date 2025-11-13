//next.config.ts
import type { NextConfig } from "next";
 
const nextConfig: NextConfig = {
  eslint: {
    // ❗ Allow production builds to complete even with ESLint errors
    ignoreDuringBuilds: true,
  },
};
 
export default nextConfig;
 
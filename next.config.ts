//next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ❗ Allow production builds to complete even with ESLint errors
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raceabove-dev.s3.ap-south-1.amazonaws.com",
        pathname: "/eaza_images/**",
      },
    ],
  },
};

export default nextConfig;
 
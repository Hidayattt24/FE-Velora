import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "*.vercel.app",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "*.herokuapp.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "*.railway.app",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;

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
      // Supabase Storage
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      // Specific Supabase project (for better security)
      {
        protocol: "https",
        hostname: "baisblpccyajqfasyicx.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;

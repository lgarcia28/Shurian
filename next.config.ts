import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.elit.com.ar",
      },
      {
        protocol: "https",
        hostname: "elit.com.ar",
      },
    ],
  },
};

export default nextConfig;

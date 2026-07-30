import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      /* Local Strapi — any port, so a non-default dev port still serves media */
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "**",
      },
      /* Hosted Strapi */
      {
        protocol: "https",
        hostname: "ojas-web.redtenx.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;

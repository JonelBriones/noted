import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "i.redd.it",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/tag",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['loca.lt', 'tidy-beers-fix.loca.lt'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
  },
};

export default nextConfig;
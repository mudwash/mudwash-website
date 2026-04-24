import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  disable: false,
  workboxOptions: {
    disableDevLogs: true,
  },
});

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.20.22', 'localhost:3000', '192.168.20.22:3000'],
  turbopack: {},
  /* config options here */
};


export default withPWA(nextConfig);


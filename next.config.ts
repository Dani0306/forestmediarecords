import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // a fixed "now" baked into server and client alike, so the hero picks the same
    // main event on both sides of hydration before the live clock takes over
    BUILD_TIME: String(Date.now()),
  },
};

export default nextConfig;

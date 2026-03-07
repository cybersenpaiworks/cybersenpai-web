import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  allowedDevOrigins: ["dev.cybersenpaiworks.com.br", "https://dev.cybersenpaiworks.com.br"],
};

export default nextConfig;

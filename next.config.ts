import type { NextConfig } from "next";
import { execSync } from "child_process";

// Captura o hash do commit atual durante o build
let commitHash = "dev";
try {
  commitHash = execSync("git rev-parse --short HEAD").toString().trim();
} catch (e) {
  // Ignora erros se não estiver em ambiente Git
}

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  allowedDevOrigins: ["dev.cybersenpaiworks.com.br", "https://dev.cybersenpaiworks.com.br"],
  env: {
    NEXT_PUBLIC_COMMIT_HASH: commitHash,
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  }
};

export default nextConfig;

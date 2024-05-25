/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./env.js");

/** @type {import("next").NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
      concurrentFeatures: false,
    },
    images: {
      domains: ['firebasestorage.googleapis.com'],
    },  
    reactStrictMode: true,
  }
  


export default nextConfig;

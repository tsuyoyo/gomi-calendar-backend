/** @type {import('next').NextConfig} */
const nextConfig = {
  api: {
    cors: {
      origins: ['https://example.com'],
    },
  },
};

export default nextConfig;

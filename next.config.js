/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.pixabay.com', 'http2.mlstatic.com'],
  },
};

module.exports = nextConfig;

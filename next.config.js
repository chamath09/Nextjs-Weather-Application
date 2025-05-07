/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.weatherapi.com'],
  },
  // Add this to suppress hydration warnings during development
  reactStrictMode: true,
}

module.exports = nextConfig
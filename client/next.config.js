/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['lh3.googleusercontent.com', 's.gravatar.com', 's.yimg.com'],
    formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'res.cloudinary.com', 's3.amazonaws.com'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://e-commerce-t702.onrender.com/api/v1',
  },
  redirects: async () => [
    {
      source: '/',
      destination: '/login',
      permanent: false,
    },
  ],
};
module.exports = nextConfig;

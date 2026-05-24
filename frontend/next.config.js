/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: { appDir: false },
  experimental: { appDir: false },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'res.cloudinary.com', 's3.amazonaws.com'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  i18n: {
    locales: ['en', 'ar'],
    defaultLocale: 'en',
  },
  env: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
  },
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
    },
  ],
  redirects: async () => [
    {
      source: '/',
      destination: '/home',
      permanent: false,
    },
  ],
};

module.exports = nextConfig;

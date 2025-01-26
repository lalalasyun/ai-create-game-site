/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,
  images: {
    domains: ['placehold.co'], // プレースホルダー画像用のドメインを許可
  }
};

module.exports = nextConfig;

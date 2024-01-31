/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true,
    },
    reactStrictMode: true,
    images: {
        domains: ['upload.wikimedia.org', 'placekitten.com'],
    }
  
};

module.exports = nextConfig

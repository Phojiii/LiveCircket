/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [320, 640, 1024],
    imageSizes: [64, 96, 128],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cricbuzz-cricket.p.rapidapi.com',
        pathname: '/**', // allow all paths under this host
      },
    ],
  },
};

module.exports = nextConfig;

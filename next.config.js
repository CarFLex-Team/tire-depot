/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.beta.businesscenter.tireguru.net",
      },
      {
        protocol: "https",
        hostname: "cdn.tirelink.tireguru.net",
      },
    ],
  },
};

module.exports = nextConfig;

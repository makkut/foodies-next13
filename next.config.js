/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // unoptimized: true,
    // path: "/_next/image",
    loader: "default",
    domains: [process.env.SANITY_API],
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MAPBOX_KEY: process.env.MAPBOX_PUBLIC_KEY,
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    domains: ["olbslxizqtmbegcnprfb.supabase.co"], // Add your Supabase domain here
  },
};

module.exports = nextConfig;
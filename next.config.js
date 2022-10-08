/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    domains: ['7th-team2-seeya-archive.s3.ap-northeast-2.amazonaws.com'],
  },
  // Docker를 위한 설정
  // https://nextjs.org/docs/advanced-features/output-file-tracing
  output: 'standalone',
};

module.exports = nextConfig;

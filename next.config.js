/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async () => {
    return [
      {
        source: "/python/:path*",
        destination: "http://127.0.0.1:5001/:path*",
      },
    ];
  },
};

module.exports = nextConfig;

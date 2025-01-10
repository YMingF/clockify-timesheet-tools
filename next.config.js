/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/exportSvc/:path*",
        destination:
          process.env.NODE_ENV === "production"
            ? "https://clocklify.vercel.app/:path*"
            : "http://localhost:17903/:path*",
      },
    ];
  },
};

module.exports = nextConfig

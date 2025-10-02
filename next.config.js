/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
  env: {
    MCP_SERVER_URL: process.env.MCP_SERVER_URL || 'http://localhost:3001',
  },
  async rewrites() {
    return [
      {
        source: '/api/mcp/:path*',
        destination: `${process.env.MCP_SERVER_URL || 'http://localhost:3001'}/:path*`,
      },
    ]
  },
}

module.exports = nextConfig

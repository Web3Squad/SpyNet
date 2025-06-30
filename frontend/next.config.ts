import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://spynet-5ifn.onrender.com/:path*',
      },
    ]
  },
}

export default nextConfig
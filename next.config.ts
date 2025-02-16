import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // output: 'export',
  // distDir: 'dist',
  images: {
    remotePatterns: [
      {
        hostname: 'localhost'
      }
    ]
  },
  compiler: {
    styledComponents: true
  }
}

export default nextConfig

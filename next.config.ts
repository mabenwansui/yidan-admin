import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // output: 'export',
  // distDir: 'dist',
  sassOptions: {
    implementation: 'sass-embedded'
  },
  images: {
    remotePatterns: [
      {
        hostname: 'localhost'
      }
    ]
  }
  // reactStrictMode: false
}

export default nextConfig

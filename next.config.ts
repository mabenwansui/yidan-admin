import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // output: 'export',
  // distDir: 'dist',
  hotReload: false,
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

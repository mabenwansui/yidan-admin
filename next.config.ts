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
  },
  reactStrictMode: false,
  compiler: {
    styledComponents: true
  }
}

export default nextConfig

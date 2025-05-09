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
  // turbopack: {
  //   rules: {
  //     '*.worker.js': {
  //       loaders: ['worker-loader'],
  //       // options: {
  //       //   worker: 'SharedWorker',
  //       //   publicPath: '/_next/static/workers/'
  //       // }
  //     }
  //   }
  // }
  // reactStrictMode: false
}

export default nextConfig

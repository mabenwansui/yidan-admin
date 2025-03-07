import type { NextConfig } from 'next'

// import theme from './src/common/css/theme.config'
// function transformTheme() {
//   const json = theme()
//   const css = Object.entries(json)
//     .map(([key, value]) => `$${key}: ${value};`)
//     .join('\n')
//   return '\n' + css
// }

const nextConfig: NextConfig = {
  // output: 'export',
  // distDir: 'dist',
  sassOptions: {
    // additionalData: ``,
    implementation: 'sass-embedded'
  },
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

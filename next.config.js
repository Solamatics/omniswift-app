/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
    baseURL: 'https://test.omniswift.com.ng/api',
  },
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // images: {
  //   domains: ['res.cloudinary.com'],
  // },
}


module.exports = nextConfig

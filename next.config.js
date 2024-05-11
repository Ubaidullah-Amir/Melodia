/** @type {import('next').NextConfig} */
const nextConfig = {
      eslint: {
            ignoreDuringBuilds: true,
        },
      images: {
            remotePatterns: [
                  {
                        protocol: 'https',
                        hostname: 'lh3.googleusercontent.com',
                        port: '',
                        pathname: '/a/ACg8ocLDL_748die7pavrRY4ibfYtJSkYe-ylkx87MIvImAP=s96-c',
                  },
            ],
            domains: ["i.ytimg.com"]
      },
}

module.exports = nextConfig

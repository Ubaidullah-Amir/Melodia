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
                  {
                        protocol: 'https',
                        hostname: 'lastfm.freetls.fastly.net',
                        port: '',
                        pathname: 'i/u/64s/**',
                  },
            ],
            domains: ["i.ytimg.com",'lastfm.freetls.fastly.net']
      },
}

module.exports = nextConfig

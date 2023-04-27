/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['is3.cloudhost.id','accountabilitylab.org','flowbite.com','cms.kedaiprogrammer.com'],
  },
  server :{
    port : 3500,
  },
}

module.exports = nextConfig


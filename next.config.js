/** @type {import('next').NextConfig} */
const nextConfig = {}

const withPWA = require("next-pwa");
// const withOffline = require('next-offline')

module.exports = withPWA({
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === 'development'
  },

  reactStrictMode: true,
});

// module.exports = withOffline({
//   workboxOpts: {
//     runtimeCaching: [
//       {
//         urlPattern: /^https?.*/,
//         handler: 'NetworkFirst',
//         options: {
//           cacheName: 'offlineCache',
//           expiration: {
//             maxEntries: 200
//           }
//         }
//       },
//     ]
//   }
// })


module.exports = nextConfig

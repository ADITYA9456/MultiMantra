/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
            {
                protocol: 'http',
                hostname: '**',
            }
        ],
        // Optimize image handling for Vercel
        minimumCacheTTL: 60,
    },
    // Enable production source maps for better error tracking
    productionBrowserSourceMaps: true,
    // Improve build speed
    swcMinify: true,
    // Enable Next.js to automatically determine when to perform static optimization
    typescript: {
        // Speedier builds when using TypeScript
        ignoreBuildErrors: process.env.CI === 'true',
    },
    eslint: {
        // Speedier builds
        ignoreDuringBuilds: process.env.CI === 'true',
    },
}

module.exports = nextConfig
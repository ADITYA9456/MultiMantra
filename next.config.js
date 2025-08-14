/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // Use object for serverActions instead of boolean
        serverActions: {
            enabled: true
        }
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
    // Enable Next.js to automatically determine when to perform static optimization
    typescript: {
        // Speedier builds when using TypeScript
        ignoreBuildErrors: process.env.CI === 'true',
    },
    eslint: {
        // Speedier builds
        ignoreDuringBuilds: true, // Always ignore during builds for now
    },
}

module.exports = nextConfig
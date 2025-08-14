#!/usr/bin/env node

/**
 * This is a pre-build script that runs before Vercel builds the app.
 * It helps ensure environment variables are properly configured.
 */

console.log('🔍 Checking environment variables for Vercel deployment...');

const requiredEnvVars = [
  'MONGODB_URI',
  'NEXTAUTH_SECRET',
];

const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingVars.length > 0) {
  console.error(`❌ Missing required environment variables: ${missingVars.join(', ')}`);
  console.error('Please set these environment variables in your Vercel project settings.');
  
  if (process.env.VERCEL_ENV === 'production') {
    process.exit(1); // Fail the build in production
  } else {
    console.warn('⚠️ Continuing build despite missing variables (non-production environment)');
  }
} else {
  console.log('✅ All required environment variables are set!');
}

// Validate MongoDB URI format
const mongoUri = process.env.MONGODB_URI;
if (mongoUri && !mongoUri.startsWith('mongodb')) {
  console.error('❌ MONGODB_URI does not appear to be in the correct format');
  
  if (process.env.VERCEL_ENV === 'production') {
    process.exit(1); // Fail the build in production
  }
}

console.log('🚀 Pre-build checks completed, proceeding with build...');

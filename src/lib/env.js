// lib/env.js
// This file allows us to centralize environment variables
// We can use this both in frontend and backend (by calling getEnvVars directly)

export const getEnvVars = () => {
    const isProduction = process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';

    return {
        // General
        isProduction: isProduction,
        
        baseUrl: isProduction
            ? process.env.NEXT_PUBLIC_BASE_URL_PROD
            : process.env.NEXT_PUBLIC_BASE_URL_DEV,

        // Supabase
        supabaseUrl: isProduction
            ? process.env.NEXT_PUBLIC_SUPABASE_URL_PROD
            : process.env.NEXT_PUBLIC_SUPABASE_URL_DEV,

        supabaseAnonKey: isProduction
            ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_PROD
            : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY_DEV,

    };
};

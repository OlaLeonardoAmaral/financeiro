/** @type {import('next').NextConfig} */
const config = {
    env: {
        BACKEND_URL: process.env.BACKEND_URL,
        BACKEND_LOCAL_URL: process.env.BACKEND_LOCAL_URL,
    },
};

export default config;

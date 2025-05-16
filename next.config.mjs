// const path = require('path');
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [path.join('src', 'scss')]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: 'png.pngtree.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
};


export default nextConfig;

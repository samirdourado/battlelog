// const path = require('path');
import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [path.join('src', 'scss')]
    }
};

export default nextConfig;

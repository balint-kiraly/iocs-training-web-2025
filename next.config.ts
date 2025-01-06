import {NextConfig} from 'next';

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: '/application-form',
                destination: '/',
                permanent: false,
            },
        ];
    },
};

export default nextConfig;

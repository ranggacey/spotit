/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // This is all the known domains Spotify host its images on. You need to provide them all to avoid CORS issues from Next.js and the Spotify API.
        domains: [
            'i.scdn.co',
            'thisis-images.spotifycdn.com',
            'wrapped-images.spotifycdn.com',
            'mosaic.scdn.co',
            'blend-playlist-covers.spotifycdn.com',
            'newjams-images.scdn.co',
            'pl.scdn.co',
            'charts-images.scdn.co',
            'daily-mix.scdn.co',
            'seeded-session-images.scdn.co',
            'image-cdn-fa.spotifycdn.com',
            'image-cdn-ak.spotifycdn.com',
            'lineup-images.scdn.co',
            'i2o.scdn.co',
            't.scdn.co'
        ],
    },
};

export default nextConfig;

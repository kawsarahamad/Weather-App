/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: 'openweathermap.org' }]
  }
};
export default nextConfig;

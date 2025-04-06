/** @type {import('next').NextConfig} */
const nextConfig ={
    reactStrictMode: true,
    devIndicators: {
      buildActivity: false, // Disable build activity indicator
      buildActivityPosition: 'bottom-right', // (Optional) Change position
    },
  };

export default nextConfig;

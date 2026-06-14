/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better dev experience
  reactStrictMode: true,

  // Experimental features
  experimental: {
    // Optimise package imports
    optimizePackageImports: ["framer-motion", "lucide-react", "@radix-ui/react-slot"],
  },
};

export default nextConfig;

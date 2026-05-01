import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better dev experience
  reactStrictMode: true,

  // Image domains for external sources (bank logos, etc.)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
    ],
  },

  // Experimental features
  experimental: {
    // Optimise package imports
    optimizePackageImports: [
      "framer-motion",
      "gsap",
      "lucide-react",
      "@radix-ui/react-slot",
    ],
  },
};

export default withNextIntl(nextConfig);

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 keeps the text in the website screenshots crisp
    qualities: [75, 90],
  },
};

export default nextConfig;

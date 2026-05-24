/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["html2canvas", "jspdf"],
  },
};

export default nextConfig;

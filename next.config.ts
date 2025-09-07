/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com', // Google profile images
      'avatars.githubusercontent.com' // GitHub profile images (if needed later)
    ],
  },
  serverExternalPackages: ['@prisma/client'],
}

export default nextConfig
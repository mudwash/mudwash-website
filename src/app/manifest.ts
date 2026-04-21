import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MUDWASH Auto Detailers',
    short_name: 'MUDWASH',
    description: 'Premium Auto Detailing Services',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#f69621',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      // You should add larger icons (192x192, 512x512) here for full PWA support
    ],
  };
}

import { publicConfig } from '@airdev/next/common/config';
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  const { name, description } = publicConfig.app;

  return {
    name,
    short_name: name,
    description,
    id: '/',
    scope: '/',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    related_applications: [],
    prefer_related_applications: false,
    display_override: ['window-controls-overlay'],
    launch_handler: { client_mode: 'focus-existing' },
    icons: [{ src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' }],
    theme_color: '#fff',
    background_color: '#fff',
    // "features": ["Cross Platform", "fast", "simple"],
    categories: ['financial'],
  };
}

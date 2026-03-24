import { publicConfig } from '@/config/public';
import type { MetadataRoute } from 'next';

export function generateRootManifest(): MetadataRoute.Manifest {
  return {
    name: publicConfig.app.name,
    short_name: publicConfig.app.name,
    description: publicConfig.app.description,
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
    categories: ['financial'],
  };
}

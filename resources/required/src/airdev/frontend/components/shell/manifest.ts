/* "@airdev/next": "managed" */

import { airdevPublicConfig } from '@/airdev/config/public';
import type { MetadataRoute } from 'next';

export function generateRootManifest(): MetadataRoute.Manifest {
  return {
    name: airdevPublicConfig.app.name,
    short_name: airdevPublicConfig.app.name,
    description: airdevPublicConfig.app.description,
    categories: airdevPublicConfig.app.categories,
    id: '/',
    scope: '/',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    related_applications: [],
    prefer_related_applications: false,
    display_override: ['window-controls-overlay'],
    launch_handler: { client_mode: 'focus-existing' },
    icons: [
      {
        src: airdevPublicConfig.shell.assets.iconSrc,
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
    theme_color: '#fff',
    background_color: '#fff',
  };
}

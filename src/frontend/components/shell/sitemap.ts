import { publicConfig } from '@/config/public';
import { MetadataRoute } from 'next';

export function generateRootSitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: publicConfig.service.baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${publicConfig.service.baseUrl}/privacy`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${publicConfig.service.baseUrl}/terms`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}

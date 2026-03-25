import { publicConfig } from '@/config/public';
import { shellConfig } from '@/config/shell';
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
      url: new URL(
        shellConfig.routes.privacyHref,
        publicConfig.service.baseUrl
      ).toString(),
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: new URL(
        shellConfig.routes.termsHref,
        publicConfig.service.baseUrl
      ).toString(),
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}

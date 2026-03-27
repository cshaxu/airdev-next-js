/* "@airdev/next": "managed" */

import { PRIVACY_HREF, TERMS_HREF } from '@/airdev/common/constant';
import { publicConfig } from '@/config/json/public';
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
      url: new URL(PRIVACY_HREF, publicConfig.service.baseUrl).toString(),
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: new URL(TERMS_HREF, publicConfig.service.baseUrl).toString(),
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}

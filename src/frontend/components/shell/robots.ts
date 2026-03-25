import { ADMIN_HREF, AUTH_HREF, SETTINGS_HREF } from '@/common/constant';
import { publicConfig } from '@/config/public';
import { shellConfig } from '@/config/shell';
import { MetadataRoute } from 'next';

export function generateRootRobots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: [
          ADMIN_HREF,
          AUTH_HREF,
          SETTINGS_HREF,
          shellConfig.routes.homeHref,
          ...shellConfig.routes.disallowRobots,
        ],
      },
    ],
    sitemap: `${publicConfig.service.baseUrl}/sitemap.xml`,
    host: publicConfig.service.baseUrl,
  };
}

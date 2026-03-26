import { ADMIN_HREF, AUTH_HREF, SETTINGS_HREF } from '@/common/constant';
import { publicConfig } from '@/config/json/public';
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
          publicConfig.shell.routes.homeHref,
          ...publicConfig.shell.routes.disallowRobots,
        ],
      },
    ],
    sitemap: `${publicConfig.service.baseUrl}/sitemap.xml`,
    host: publicConfig.service.baseUrl,
  };
}

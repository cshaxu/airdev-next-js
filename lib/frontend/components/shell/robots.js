import { publicConfig } from '@/config/public';
import { shellConfig } from '@/config/shell';
export function generateRootRobots() {
    return {
        rules: [
            {
                userAgent: '*',
                disallow: [
                    shellConfig.routes.adminHref,
                    shellConfig.routes.authHref,
                    shellConfig.routes.homeHref,
                    shellConfig.routes.settingsHref,
                    ...shellConfig.routes.disallowRobots,
                ],
            },
        ],
        sitemap: `${publicConfig.service.baseUrl}/sitemap.xml`,
        host: publicConfig.service.baseUrl,
    };
}
//# sourceMappingURL=robots.js.map
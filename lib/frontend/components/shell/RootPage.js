import { jsx as _jsx } from "react/jsx-runtime";
import { clientComponentConfig } from '@/config/component/client';
import { publicConfig } from '@/config/public';
import { currentUserServerQueryOptions } from '../../hooks/data/user-server.js';
import { pageTitle, withError } from '../../utils/page.js';
import { QueryClient } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
export async function generateRootPageMetadata() {
    return {
        title: pageTitle(publicConfig.app.name),
        description: publicConfig.app.description,
        alternates: { canonical: '/' },
    };
}
async function RootPage() {
    const queryClient = new QueryClient();
    const currentUser = await queryClient.fetchQuery(currentUserServerQueryOptions);
    if (currentUser !== null) {
        redirect(publicConfig.shell.routes.homeHref);
    }
    const { LandingPage } = clientComponentConfig;
    return _jsx(LandingPage, {});
}
export default withError(RootPage);
//# sourceMappingURL=RootPage.js.map
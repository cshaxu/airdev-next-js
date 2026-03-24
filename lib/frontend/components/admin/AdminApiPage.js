import { jsx as _jsx } from "react/jsx-runtime";
import { serverComponentConfig } from '@/config/component/server';
import { withError } from '../../utils/page';
async function Page() {
    const { AdminApiPage } = serverComponentConfig;
    return _jsx(AdminApiPage, {});
}
const SafePage = withError(Page);
export default SafePage;
//# sourceMappingURL=AdminApiPage.js.map
import { jsx as _jsx } from "react/jsx-runtime";
import { withError } from '../../utils/page.js';
import UserSearch from './UserSearch.js';
function Page() {
    return _jsx(UserSearch, {});
}
const SafePage = withError(Page);
export default SafePage;
//# sourceMappingURL=UsersPage.js.map
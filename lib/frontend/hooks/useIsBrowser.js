"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useIsBrowser;
const react_1 = require("react");
// Both server and client components are pre-rendered on the server
// Server components are not hydrated on the client
// Client components are hydrated on the client
// However, there are "browser components" that cannot be pre-rendered on the server
// Use this hook to stop them from running on the server
function useIsBrowser() {
    const [isBrowser, setIsBrowser] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        setIsBrowser(true);
    }, []);
    return isBrowser;
}
//# sourceMappingURL=useIsBrowser.js.map
"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TranslateButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const Button_1 = require("@airdev/next/frontend/components/ui/Button");
const lucide_react_1 = require("lucide-react");
const react_1 = require("react");
function TranslateButton() {
    const [showGoogleTranslate, setShowGoogleTranslate] = (0, react_1.useState)(false);
    const [isInitialized, setIsInitialized] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        if (!showGoogleTranslate || isInitialized) {
            return;
        }
        const googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement({
                pageLanguage: 'en',
                layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
                autoDisplay: false,
                multilanguagePage: true,
            }, 'google_translate_element');
            // Add custom styles
            const style = document.createElement('style');
            style.textContent = `
        .goog-te-gadget {
          display: inline-flex !important;
          align-items: center !important;
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          height: 32px !important;
          white-space: nowrap !important;
        }
        .goog-te-gadget-simple {
          border: none !important;
          background-color: transparent !important;
          padding: 0 !important;
          display: flex !important;
          align-items: center !important;
          width: 100% !important;
          height: 100% !important;
          white-space: nowrap !important;
        }
        .goog-te-gadget-simple > span {
          display: inline-flex !important;
          align-items: center !important;
          width: 100% !important;
          height: 100% !important;
          white-space: nowrap !important;
        }
        .goog-te-gadget-simple .goog-te-menu-value {
          display: inline-flex !important;
          align-items: center !important;
          margin: 0 !important;
          padding: 0 !important;
          color: inherit !important;
          width: 100% !important;
          justify-content: space-between !important;
          height: 100% !important;
          white-space: nowrap !important;
        }
        .goog-te-gadget-simple .goog-te-menu-value span {
          display: inline-flex !important;
          align-items: center !important;
          border: none !important;
          padding: 0 !important;
          margin: 0 !important;
          height: 100% !important;
          white-space: nowrap !important;
        }
        .goog-te-combo {
          margin: 0 !important;
          padding: 0 4px !important;
          border: none !important;
          background: transparent !important;
          color: inherit !important;
          font-family: inherit !important;
          font-size: inherit !important;
          min-width: 200px !important;
          width: 100% !important;
          height: 100% !important;
        }
        .goog-te-gadget img {
          margin-left: 8px !important;
          vertical-align: middle !important;
        }
        .goog-te-gadget .goog-te-gadget-simple > span > a {
          display: inline-flex !important;
          align-items: center !important;
          white-space: nowrap !important;
          text-decoration: none !important;
        }
        .goog-te-banner-frame {
          display: none !important;
        }
      `;
            document.head.appendChild(style);
            setIsInitialized(true);
        };
        // Check if script is already loaded
        if (!document.querySelector('script[src*="translate_a/element.js"]')) {
            const addScript = document.createElement('script');
            addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
            document.body.appendChild(addScript);
        }
        window.googleTranslateElementInit = googleTranslateElementInit;
    }, [showGoogleTranslate, isInitialized]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: showGoogleTranslate ? ((0, jsx_runtime_1.jsx)("div", { id: "google_translate_element", style: {
                display: 'inline-flex',
                alignItems: 'center',
                width: '100%',
                minWidth: '300px',
                maxWidth: '400px',
                height: '32px',
                whiteSpace: 'nowrap',
            } })) : ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "ghost", onClick: () => setShowGoogleTranslate(true), children: (0, jsx_runtime_1.jsx)(lucide_react_1.Globe, { className: "size-4" }) })) }));
}
//# sourceMappingURL=TranslateButton.js.map
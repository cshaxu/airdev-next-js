declare global {
    interface Window {
        google: {
            translate: {
                TranslateElement: {
                    InlineLayout: {
                        HORIZONTAL: number;
                    };
                    new (options: any, element: string): any;
                };
            };
        };
        googleTranslateElementInit: () => void;
    }
}
export default function TranslateButton(): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TranslateButton.d.ts.map
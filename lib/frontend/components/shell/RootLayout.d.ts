import '../../styles/globals.css';
import { ReactNodeProps } from '../../types/props.js';
export declare function generateRootLayoutMetadata(): {
    metadataBase: URL;
    title: string;
    description: string;
    applicationName: string;
    authors: {
        name: string;
    }[];
    creator: string;
    publisher: string;
    keywords: string[];
    robots: {
        index: boolean;
        follow: boolean;
    };
    openGraph: {
        type: string;
        url: string;
        siteName: string;
        title: string;
        description: string;
        images: {
            url: string;
            alt: string;
        }[];
    };
    twitter: {
        card: string;
        title: string;
        description: string;
        images: string[];
    };
    icons: {
        icon: string;
        apple: string;
    };
};
export default function RootLayout({ children }: ReactNodeProps): import("react/jsx-runtime").JSX.Element;

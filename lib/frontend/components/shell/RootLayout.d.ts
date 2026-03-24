import '../../styles/globals.css';
import { ReactNodeProps } from '../../types/props';
export declare function generateRootLayoutMetadata(): {
    metadataBase: URL;
    title: string;
    description: any;
    applicationName: any;
    authors: {
        name: any;
    }[];
    creator: any;
    publisher: any;
    keywords: any;
    robots: {
        index: boolean;
        follow: boolean;
    };
    openGraph: {
        type: string;
        url: any;
        siteName: any;
        title: string;
        description: any;
        images: {
            url: string;
            alt: any;
        }[];
    };
    twitter: {
        card: string;
        title: string;
        description: any;
        images: string[];
    };
    icons: {
        icon: string;
        apple: string;
    };
};
export default function RootLayout({ children }: ReactNodeProps): import("react/jsx-runtime").JSX.Element;

'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from '../ui/Button.js';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';
export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return null;
    }
    return (_jsx(Button, { variant: "outline", size: "iconSm", onClick: () => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'), children: resolvedTheme === 'dark' ? _jsx(Sun, {}) : _jsx(Moon, {}) }));
}
//# sourceMappingURL=ThemeToggle.js.map
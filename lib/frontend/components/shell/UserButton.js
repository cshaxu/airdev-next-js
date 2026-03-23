"use strict";
'use client';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UserButton;
const jsx_runtime_1 = require("react/jsx-runtime");
const Avatar_1 = require("@airdev/next/frontend/components/ui/Avatar");
const BottomPopupSheet_1 = require("@airdev/next/frontend/components/ui/BottomPopupSheet");
const Button_1 = require("@airdev/next/frontend/components/ui/Button");
const DropdownMenu_1 = require("@airdev/next/frontend/components/ui/DropdownMenu");
const user_1 = require("@airdev/next/frontend/hooks/data/user");
const cn_1 = require("@airdev/next/frontend/lib/cn");
const becameUserStore_1 = require("@airdev/next/frontend/stores/becameUserStore");
const outline_1 = require("@heroicons/react/24/outline");
const react_query_1 = require("@tanstack/react-query");
const lucide_react_1 = require("lucide-react");
const react_1 = require("next-auth/react");
const link_1 = __importDefault(require("next/link"));
const react_2 = require("react");
function useUserInitials() {
    const { data: user } = (0, user_1.useRequiredCurrentUser)();
    const [firstName, lastName] = user.name.split(' ') ?? [];
    const initials = firstName && lastName
        ? `${firstName[0]}${lastName[0]}`
        : (user.email.at(0)?.toUpperCase() ?? '?');
    return { user, initials };
}
function renderSidebarTrigger(userEmail, initials, imageUrl, isFull) {
    if (isFull) {
        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex w-full cursor-pointer items-center space-x-2 pl-2", children: [(0, jsx_runtime_1.jsxs)(Avatar_1.Avatar, { className: "size-8", children: [(0, jsx_runtime_1.jsx)(Avatar_1.AvatarImage, { src: imageUrl ?? undefined, alt: userEmail ?? 'User' }), (0, jsx_runtime_1.jsx)(Avatar_1.AvatarFallback, { children: initials })] }), (0, jsx_runtime_1.jsx)("span", { className: "text-muted-foreground flex-grow truncate text-sm", children: userEmail }), (0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "ghost", size: "icon", children: (0, jsx_runtime_1.jsx)(outline_1.EllipsisVerticalIcon, { className: "size-4 stroke-2" }) })] }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-center", children: (0, jsx_runtime_1.jsxs)(Avatar_1.Avatar, { className: "size-8 cursor-pointer", children: [(0, jsx_runtime_1.jsx)(Avatar_1.AvatarImage, { src: imageUrl ?? undefined, alt: userEmail ?? 'User' }), (0, jsx_runtime_1.jsx)(Avatar_1.AvatarFallback, { children: initials })] }) }));
}
function renderBottomNavTrigger(userName, initials, imageUrl, showLabel) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: (0, jsx_runtime_1.jsxs)("button", { type: "button", className: "flex w-full cursor-pointer flex-col items-center gap-1", children: [(0, jsx_runtime_1.jsxs)(Avatar_1.Avatar, { className: "size-6", children: [(0, jsx_runtime_1.jsx)(Avatar_1.AvatarImage, { src: imageUrl ?? undefined, alt: userName ?? 'User' }), (0, jsx_runtime_1.jsx)(Avatar_1.AvatarFallback, { children: initials })] }), showLabel && (0, jsx_runtime_1.jsx)("span", { className: "text-[11px]", children: "Account" })] }) }));
}
function AccountActionRow({ action, onDone, }) {
    const classes = (0, cn_1.cn)('flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors', action.tone === 'danger'
        ? 'border-border text-red-700 hover:bg-red-50'
        : 'border-border hover:bg-muted/60');
    if (action.href) {
        return ((0, jsx_runtime_1.jsxs)(link_1.default, { href: action.href, className: classes, onClick: onDone, children: [(0, jsx_runtime_1.jsx)("span", { className: "shrink-0", children: action.icon }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-sm font-medium", children: action.label }), (0, jsx_runtime_1.jsx)(outline_1.ChevronRightIcon, { className: "size-4 shrink-0 opacity-60" })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("button", { type: "button", className: classes, onClick: async () => {
            await action.onClick?.();
            onDone?.();
        }, children: [(0, jsx_runtime_1.jsx)("span", { className: "shrink-0", children: action.icon }), (0, jsx_runtime_1.jsx)("span", { className: "flex-1 text-sm font-medium", children: action.label })] }));
}
function UserButton(props) {
    const { user, initials } = useUserInitials();
    const queryClient = (0, react_query_1.useQueryClient)();
    const became = (0, becameUserStore_1.useBecameUser)();
    const setBecameUser = (0, becameUserStore_1.useSetBecameUser)();
    const [mobileOpen, setMobileOpen] = (0, react_2.useState)(false);
    const [desktopOpen, setDesktopOpen] = (0, react_2.useState)(false);
    const [sheetOffset, setSheetOffset] = (0, react_2.useState)(0);
    const [sheetHeight, setSheetHeight] = (0, react_2.useState)(0);
    const [isDraggingSheet, setIsDraggingSheet] = (0, react_2.useState)(false);
    const sheetContentRef = (0, react_2.useRef)(null);
    const dragStartYRef = (0, react_2.useRef)(null);
    const dragStartOffsetRef = (0, react_2.useRef)(0);
    const activePointerIdRef = (0, react_2.useRef)(null);
    const settleTimeoutRef = (0, react_2.useRef)(null);
    const handleSignOut = async () => {
        queryClient.clear();
        await (0, react_1.signOut)({ callbackUrl: props.logoutCallbackUrl });
    };
    const handleRevertSelf = async () => {
        await props.becomeUser(null);
        setBecameUser(null);
        window.location.reload();
    };
    const clearSettleTimeout = () => {
        if (settleTimeoutRef.current !== null) {
            window.clearTimeout(settleTimeoutRef.current);
            settleTimeoutRef.current = null;
        }
    };
    const resetSheetDragState = () => {
        setIsDraggingSheet(false);
        dragStartYRef.current = null;
        dragStartOffsetRef.current = 0;
        activePointerIdRef.current = null;
    };
    const measureSheetHeight = () => sheetContentRef.current?.getBoundingClientRect().height ?? 0;
    const animateSheetTo = (nextOffset, onComplete, durationMs = 260) => {
        clearSettleTimeout();
        setSheetOffset(nextOffset);
        if (!onComplete) {
            return;
        }
        settleTimeoutRef.current = window.setTimeout(() => {
            settleTimeoutRef.current = null;
            onComplete();
        }, durationMs);
    };
    const openMobileSheet = () => {
        clearSettleTimeout();
        setMobileOpen(true);
        resetSheetDragState();
        const initialOffset = typeof window === 'undefined' ? 0 : window.innerHeight;
        setSheetOffset(initialOffset);
    };
    const forceCloseMobileSheet = (0, react_2.useCallback)(() => {
        clearSettleTimeout();
        setMobileOpen(false);
        setSheetOffset(0);
        setSheetHeight(0);
        resetSheetDragState();
    }, []);
    const forceCloseDesktopMenu = (0, react_2.useCallback)(() => {
        setDesktopOpen(false);
    }, []);
    const resetResponsiveUserMenu = (0, react_2.useCallback)(() => {
        forceCloseMobileSheet();
        forceCloseDesktopMenu();
    }, [forceCloseDesktopMenu, forceCloseMobileSheet]);
    const closeMobileSheet = () => {
        const currentHeight = measureSheetHeight() || sheetHeight;
        if (currentHeight <= 0) {
            forceCloseMobileSheet();
            return;
        }
        resetSheetDragState();
        animateSheetTo(currentHeight, () => {
            forceCloseMobileSheet();
        });
    };
    (0, react_2.useEffect)(() => () => {
        clearSettleTimeout();
    }, []);
    (0, react_2.useEffect)(() => {
        if (typeof window === 'undefined') {
            return;
        }
        const mediaQuery = window.matchMedia('(min-width: 768px)');
        const legacyMediaQuery = mediaQuery;
        const handleChange = () => {
            resetResponsiveUserMenu();
        };
        if ('addEventListener' in mediaQuery) {
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
        legacyMediaQuery.addListener?.(handleChange);
        return () => legacyMediaQuery.removeListener?.(handleChange);
    }, [resetResponsiveUserMenu]);
    (0, react_2.useEffect)(() => {
        if (!mobileOpen) {
            setSheetHeight(0);
            return;
        }
        const measureAndAnimateOpen = () => {
            const nextHeight = measureSheetHeight();
            if (!nextHeight) {
                return;
            }
            setSheetHeight(nextHeight);
            setSheetOffset(0);
        };
        const frameId = window.requestAnimationFrame(measureAndAnimateOpen);
        const observer = new ResizeObserver(() => {
            const nextHeight = measureSheetHeight();
            if (nextHeight) {
                setSheetHeight(nextHeight);
            }
        });
        if (sheetContentRef.current) {
            observer.observe(sheetContentRef.current);
        }
        return () => {
            window.cancelAnimationFrame(frameId);
            observer.disconnect();
        };
    }, [mobileOpen]);
    const handleSheetPointerDown = (event) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        clearSettleTimeout();
        setIsDraggingSheet(true);
        dragStartYRef.current = event.clientY;
        dragStartOffsetRef.current = sheetOffset;
        activePointerIdRef.current = event.pointerId;
    };
    const handleSheetPointerMove = (event) => {
        if (!isDraggingSheet ||
            dragStartYRef.current === null ||
            activePointerIdRef.current !== event.pointerId) {
            return;
        }
        const nextOffset = Math.max(dragStartOffsetRef.current + (event.clientY - dragStartYRef.current), 0);
        setSheetOffset(nextOffset);
    };
    const handleSheetPointerEnd = (event) => {
        if (!isDraggingSheet ||
            (activePointerIdRef.current !== null &&
                activePointerIdRef.current !== event.pointerId)) {
            return;
        }
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
        const currentHeight = measureSheetHeight() || sheetHeight;
        const visibleRatio = currentHeight > 0 ? (currentHeight - sheetOffset) / currentHeight : 1;
        resetSheetDragState();
        if (currentHeight > 0 && visibleRatio < 0.75) {
            animateSheetTo(currentHeight, () => {
                setMobileOpen(false);
                setSheetOffset(0);
            });
            return;
        }
        animateSheetTo(0);
    };
    const mobileActions = [
        ...(user.isAdmin && props.adminHref
            ? [
                {
                    key: 'admin',
                    label: 'Admin',
                    href: props.adminHref,
                    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Wrench, { className: "size-5" }),
                },
            ]
            : []),
        {
            key: 'settings',
            label: 'Settings',
            href: props.settingsHref,
            icon: (0, jsx_runtime_1.jsx)(outline_1.Cog6ToothIcon, { className: "size-5" }),
        },
        became
            ? {
                key: 'revert',
                label: 'Revert to self',
                onClick: handleRevertSelf,
                icon: (0, jsx_runtime_1.jsx)(lucide_react_1.LogOut, { className: "size-5" }),
                tone: 'danger',
            }
            : {
                key: 'logout',
                label: 'Log out',
                onClick: handleSignOut,
                icon: (0, jsx_runtime_1.jsx)(lucide_react_1.LogOut, { className: "size-5" }),
                tone: 'danger',
            },
    ];
    const trigger = props.mode === 'sidebar'
        ? renderSidebarTrigger(user.email, initials, user.imageUrl, props.isFull)
        : renderBottomNavTrigger(user.name, initials, user.imageUrl, props.showLabel);
    if (props.mode === 'bottom-nav') {
        const safeSheetHeight = sheetHeight ||
            sheetContentRef.current?.getBoundingClientRect().height ||
            1;
        const overlayOpacity = Math.max(0, Math.min(1, 1 - sheetOffset / safeSheetHeight));
        return ((0, jsx_runtime_1.jsxs)(BottomPopupSheet_1.BottomPopupSheet, { open: mobileOpen, onOpenChange: (open) => {
                if (open) {
                    openMobileSheet();
                    return;
                }
                closeMobileSheet();
            }, children: [(0, jsx_runtime_1.jsx)(BottomPopupSheet_1.BottomPopupSheetTrigger, { asChild: true, children: trigger }), (0, jsx_runtime_1.jsxs)(BottomPopupSheet_1.BottomPopupSheetContent, { ref: sheetContentRef, className: "max-h-[50vh] min-h-[20rem] overflow-y-auto rounded-t-3xl px-0", onRequestClose: closeMobileSheet, overlayStyle: {
                        opacity: overlayOpacity,
                        transition: isDraggingSheet
                            ? 'none'
                            : 'opacity 260ms cubic-bezier(0.4, 0, 1, 1)',
                    }, style: {
                        transform: `translateY(${sheetOffset}px)`,
                        transition: isDraggingSheet
                            ? 'none'
                            : 'transform 260ms cubic-bezier(0.4, 0, 1, 1)',
                    }, children: [(0, jsx_runtime_1.jsxs)(BottomPopupSheet_1.BottomPopupSheetHeader, { className: "touch-none px-4 pt-5 pb-3", onPointerDown: handleSheetPointerDown, onPointerMove: handleSheetPointerMove, onPointerUp: handleSheetPointerEnd, onPointerCancel: handleSheetPointerEnd, children: [(0, jsx_runtime_1.jsx)("div", { className: "bg-muted mx-auto mb-3 h-1.5 w-12 rounded-full" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-3", children: [(0, jsx_runtime_1.jsxs)(Avatar_1.Avatar, { className: "size-11", children: [(0, jsx_runtime_1.jsx)(Avatar_1.AvatarImage, { src: user.imageUrl ?? undefined, alt: user.name ?? 'User' }), (0, jsx_runtime_1.jsx)(Avatar_1.AvatarFallback, { children: initials })] }), (0, jsx_runtime_1.jsxs)("div", { className: "min-w-0", children: [(0, jsx_runtime_1.jsx)(BottomPopupSheet_1.BottomPopupSheetTitle, { className: "truncate", children: user.name }), (0, jsx_runtime_1.jsx)(BottomPopupSheet_1.BottomPopupSheetDescription, { className: "truncate", children: user.email })] })] })] }), (0, jsx_runtime_1.jsx)("div", { className: "space-y-3 px-4 pb-4", children: mobileActions.map((action) => ((0, jsx_runtime_1.jsx)(AccountActionRow, { action: action, onDone: closeMobileSheet }, action.key))) })] })] }));
    }
    const sideOffset = props.isFull ? 12 : 16;
    return ((0, jsx_runtime_1.jsxs)(DropdownMenu_1.DropdownMenu, { open: desktopOpen, onOpenChange: setDesktopOpen, children: [(0, jsx_runtime_1.jsx)(DropdownMenu_1.DropdownMenuTrigger, { asChild: true, children: trigger }), (0, jsx_runtime_1.jsxs)(DropdownMenu_1.DropdownMenuContent, { className: "w-56", side: "right", align: "end", alignOffset: 0, sideOffset: sideOffset, children: [(0, jsx_runtime_1.jsx)(DropdownMenu_1.DropdownMenuLabel, { children: "My Account" }), (0, jsx_runtime_1.jsx)(DropdownMenu_1.DropdownMenuSeparator, {}), user.isAdmin && props.adminHref && ((0, jsx_runtime_1.jsx)(DropdownMenu_1.DropdownMenuItem, { asChild: true, children: (0, jsx_runtime_1.jsxs)(link_1.default, { href: props.adminHref, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Wrench, { className: "mr-2 size-4" }), (0, jsx_runtime_1.jsx)("span", { children: "Admin" })] }) })), (0, jsx_runtime_1.jsx)(DropdownMenu_1.DropdownMenuItem, { asChild: true, children: (0, jsx_runtime_1.jsxs)(link_1.default, { href: props.settingsHref, children: [(0, jsx_runtime_1.jsx)(outline_1.Cog6ToothIcon, { className: "mr-2 size-4" }), (0, jsx_runtime_1.jsx)("span", { children: "Settings" })] }) }), (0, jsx_runtime_1.jsx)(DropdownMenu_1.DropdownMenuSeparator, {}), became ? ((0, jsx_runtime_1.jsx)("button", { className: "w-full", onClick: () => void handleRevertSelf(), children: (0, jsx_runtime_1.jsxs)(DropdownMenu_1.DropdownMenuItem, { className: "w-full cursor-pointer", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.LogOut, { className: "mr-2 size-4" }), (0, jsx_runtime_1.jsx)("span", { children: "Revert to self" })] }) })) : ((0, jsx_runtime_1.jsx)("button", { className: "w-full", onClick: () => void handleSignOut(), children: (0, jsx_runtime_1.jsxs)(DropdownMenu_1.DropdownMenuItem, { className: "w-full cursor-pointer", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.LogOut, { className: "mr-2 size-4" }), (0, jsx_runtime_1.jsx)("span", { children: "Log out" })] }) }))] })] }));
}
//# sourceMappingURL=UserButton.js.map
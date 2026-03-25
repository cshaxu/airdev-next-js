'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ADMIN_HREF, ROOT_HREF, SETTINGS_HREF } from '../../../common/constant.js';
import { clientFunctionConfig } from '@/config/function/client';
import { Avatar, AvatarFallback, AvatarImage, } from '../ui/Avatar.js';
import { BottomPopupSheet, BottomPopupSheetContent, BottomPopupSheetDescription, BottomPopupSheetHeader, BottomPopupSheetTitle, BottomPopupSheetTrigger, } from '../ui/BottomPopupSheet.js';
import { Button } from '../ui/Button.js';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from '../ui/DropdownMenu.js';
import { useRequiredCurrentUser } from '../../hooks/data/user.js';
import { useBecameUser, useSetBecameUser, } from '../../stores/becameUserStore.js';
import { cn } from '../../utils/cn.js';
import { ChevronRightIcon, Cog6ToothIcon, EllipsisVerticalIcon, } from '@heroicons/react/24/outline';
import { LogOut, Wrench } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, } from 'react';
function useUserInitials() {
    const { data: user } = useRequiredCurrentUser();
    const [firstName, lastName] = user.name.split(' ') ?? [];
    const initials = firstName && lastName ? `${firstName[0]}${lastName[0]}` : 'A';
    return { user, initials };
}
function renderSidebarTrigger(userEmail, initials, imageUrl, isFull) {
    if (isFull) {
        return (_jsxs("div", { className: "flex w-full cursor-pointer items-center space-x-2 pl-2", children: [_jsxs(Avatar, { className: "size-8", children: [_jsx(AvatarImage, { src: imageUrl ?? undefined, alt: userEmail ?? 'User' }), _jsx(AvatarFallback, { children: initials })] }), _jsx("span", { className: "text-muted-foreground flex-grow truncate text-sm", children: userEmail }), _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(EllipsisVerticalIcon, { className: "size-4 stroke-2" }) })] }));
    }
    return (_jsx("div", { className: "flex justify-center", children: _jsxs(Avatar, { className: "size-8 cursor-pointer", children: [_jsx(AvatarImage, { src: imageUrl ?? undefined, alt: userEmail ?? 'User' }), _jsx(AvatarFallback, { children: initials })] }) }));
}
function renderBottomNavTrigger(userName, initials, imageUrl, showLabel) {
    return (_jsx("div", { className: "flex-1", children: _jsxs("button", { type: "button", className: "flex w-full cursor-pointer flex-col items-center gap-1", children: [_jsxs(Avatar, { className: "size-6", children: [_jsx(AvatarImage, { src: imageUrl ?? undefined, alt: userName ?? 'User' }), _jsx(AvatarFallback, { children: initials })] }), showLabel && _jsx("span", { className: "text-[11px]", children: "Account" })] }) }));
}
function AccountActionRow({ action, onDone, }) {
    const classes = cn('flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors', action.tone === 'danger'
        ? 'border-border text-red-700 hover:bg-red-50'
        : 'border-border hover:bg-muted/60');
    if (action.href) {
        return (_jsxs(Link, { href: action.href, className: classes, onClick: onDone, children: [_jsx("span", { className: "shrink-0", children: action.icon }), _jsx("span", { className: "flex-1 text-sm font-medium", children: action.label }), _jsx(ChevronRightIcon, { className: "size-4 shrink-0 opacity-60" })] }));
    }
    return (_jsxs("button", { type: "button", className: classes, onClick: async () => {
            await action.onClick?.();
            onDone?.();
        }, children: [_jsx("span", { className: "shrink-0", children: action.icon }), _jsx("span", { className: "flex-1 text-sm font-medium", children: action.label })] }));
}
export default function UserButton(props) {
    const { user, initials } = useUserInitials();
    const became = useBecameUser();
    const setBecameUser = useSetBecameUser();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [desktopOpen, setDesktopOpen] = useState(false);
    const [sheetOffset, setSheetOffset] = useState(0);
    const [sheetHeight, setSheetHeight] = useState(0);
    const [isDraggingSheet, setIsDraggingSheet] = useState(false);
    const sheetContentRef = useRef(null);
    const dragStartYRef = useRef(null);
    const dragStartOffsetRef = useRef(0);
    const activePointerIdRef = useRef(null);
    const settleTimeoutRef = useRef(null);
    const handleSignOut = async () => {
        await clientFunctionConfig.apiClient.auth.signOut({
            callbackUrl: ROOT_HREF,
        });
    };
    const handleRevertSelf = async () => {
        await clientFunctionConfig.apiClient.auth.become(null);
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
    const forceCloseMobileSheet = useCallback(() => {
        clearSettleTimeout();
        setMobileOpen(false);
        setSheetOffset(0);
        setSheetHeight(0);
        resetSheetDragState();
    }, []);
    const forceCloseDesktopMenu = useCallback(() => {
        setDesktopOpen(false);
    }, []);
    const resetResponsiveUserMenu = useCallback(() => {
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
    useEffect(() => () => {
        clearSettleTimeout();
    }, []);
    useEffect(() => {
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
    useEffect(() => {
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
        ...(user.isAdmin
            ? [
                {
                    key: 'admin',
                    label: 'Admin',
                    href: ADMIN_HREF,
                    icon: _jsx(Wrench, { className: "size-5" }),
                },
            ]
            : []),
        {
            key: 'settings',
            label: 'Settings',
            href: SETTINGS_HREF,
            icon: _jsx(Cog6ToothIcon, { className: "size-5" }),
        },
        became
            ? {
                key: 'revert',
                label: 'Revert to self',
                onClick: handleRevertSelf,
                icon: _jsx(LogOut, { className: "size-5" }),
                tone: 'danger',
            }
            : {
                key: 'logout',
                label: 'Log out',
                onClick: handleSignOut,
                icon: _jsx(LogOut, { className: "size-5" }),
                tone: 'danger',
            },
    ];
    const trigger = props.mode === 'sidebar'
        ? renderSidebarTrigger(user.name, initials, user.imageUrl, props.isFull)
        : renderBottomNavTrigger(user.name, initials, user.imageUrl, props.showLabel);
    if (props.mode === 'bottom-nav') {
        const safeSheetHeight = sheetHeight ||
            sheetContentRef.current?.getBoundingClientRect().height ||
            1;
        const overlayOpacity = Math.max(0, Math.min(1, 1 - sheetOffset / safeSheetHeight));
        return (_jsxs(BottomPopupSheet, { open: mobileOpen, onOpenChange: (open) => {
                if (open) {
                    openMobileSheet();
                    return;
                }
                closeMobileSheet();
            }, children: [_jsx(BottomPopupSheetTrigger, { asChild: true, children: trigger }), _jsxs(BottomPopupSheetContent, { ref: sheetContentRef, className: "max-h-[50vh] min-h-[20rem] overflow-y-auto rounded-t-3xl px-0", onRequestClose: closeMobileSheet, overlayStyle: {
                        opacity: overlayOpacity,
                        transition: isDraggingSheet
                            ? 'none'
                            : 'opacity 260ms cubic-bezier(0.4, 0, 1, 1)',
                    }, style: {
                        transform: `translateY(${sheetOffset}px)`,
                        transition: isDraggingSheet
                            ? 'none'
                            : 'transform 260ms cubic-bezier(0.4, 0, 1, 1)',
                    }, children: [_jsxs(BottomPopupSheetHeader, { className: "touch-none px-4 pt-5 pb-3", onPointerDown: handleSheetPointerDown, onPointerMove: handleSheetPointerMove, onPointerUp: handleSheetPointerEnd, onPointerCancel: handleSheetPointerEnd, children: [_jsx("div", { className: "bg-muted mx-auto mb-3 h-1.5 w-12 rounded-full" }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs(Avatar, { className: "size-11", children: [_jsx(AvatarImage, { src: user.imageUrl ?? undefined, alt: user.name ?? 'User' }), _jsx(AvatarFallback, { children: initials })] }), _jsxs("div", { className: "min-w-0", children: [_jsx(BottomPopupSheetTitle, { className: "truncate", children: user.name }), _jsx(BottomPopupSheetDescription, { className: "truncate", children: user.email })] })] })] }), _jsx("div", { className: "space-y-3 px-4 pb-4", children: mobileActions.map((action) => (_jsx(AccountActionRow, { action: action, onDone: closeMobileSheet }, action.key))) })] })] }));
    }
    const sideOffset = props.isFull ? 12 : 16;
    return (_jsxs(DropdownMenu, { open: desktopOpen, onOpenChange: setDesktopOpen, children: [_jsx(DropdownMenuTrigger, { asChild: true, children: trigger }), _jsxs(DropdownMenuContent, { className: "w-56", side: "right", align: "end", alignOffset: 0, sideOffset: sideOffset, children: [_jsx(DropdownMenuLabel, { children: "My Account" }), _jsx(DropdownMenuSeparator, {}), user.isAdmin && (_jsx(DropdownMenuItem, { asChild: true, children: _jsxs(Link, { href: ADMIN_HREF, children: [_jsx(Wrench, { className: "mr-2 size-4" }), _jsx("span", { children: "Admin" })] }) })), _jsx(DropdownMenuItem, { asChild: true, children: _jsxs(Link, { href: SETTINGS_HREF, children: [_jsx(Cog6ToothIcon, { className: "mr-2 size-4" }), _jsx("span", { children: "Settings" })] }) }), _jsx(DropdownMenuSeparator, {}), became ? (_jsx("button", { className: "w-full", onClick: handleRevertSelf, children: _jsxs(DropdownMenuItem, { className: "w-full cursor-pointer", children: [_jsx(LogOut, { className: "mr-2 size-4" }), _jsx("span", { children: "Revert to self" })] }) })) : (_jsx("button", { className: "w-full", onClick: handleSignOut, children: _jsxs(DropdownMenuItem, { className: "w-full cursor-pointer", children: [_jsx(LogOut, { className: "mr-2 size-4" }), _jsx("span", { children: "Log out" })] }) }))] })] }));
}
//# sourceMappingURL=UserButton.js.map
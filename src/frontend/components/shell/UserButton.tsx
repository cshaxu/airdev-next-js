'use client';

import { ADMIN_HREF, ROOT_HREF, SETTINGS_HREF } from '@/common/constant';
import { clientFunctionConfig } from '@/config/function/client';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/frontend/components/ui/Avatar';
import {
  BottomPopupSheet,
  BottomPopupSheetContent,
  BottomPopupSheetDescription,
  BottomPopupSheetHeader,
  BottomPopupSheetTitle,
  BottomPopupSheetTrigger,
} from '@/frontend/components/ui/BottomPopupSheet';
import { Button } from '@/frontend/components/ui/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/frontend/components/ui/DropdownMenu';
import { useRequiredCurrentUser } from '@/frontend/hooks/data/user';
import {
  useBecameUser,
  useSetBecameUser,
} from '@/frontend/stores/becameUserStore';
import { cn } from '@/frontend/utils/cn';
import {
  ChevronRightIcon,
  Cog6ToothIcon,
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import { LogOut, Wrench } from 'lucide-react';
import Link from 'next/link';
import {
  ReactNode,
  PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

type SidebarProps = { mode: 'sidebar'; isFull: boolean };

type BottomNavProps = {
  mode: 'bottom-nav';
  showLabel: boolean;
};

type Props = SidebarProps | BottomNavProps;

function useUserInitials() {
  const { data: user } = useRequiredCurrentUser();
  const [firstName, lastName] = user.name.split(' ') ?? [];
  const initials =
    firstName && lastName ? `${firstName[0]}${lastName[0]}` : 'A';

  return { user, initials };
}

function renderSidebarTrigger(
  userEmail: string | null,
  initials: string,
  imageUrl: string | null,
  isFull: boolean
): ReactNode {
  if (isFull) {
    return (
      <div className="flex w-full cursor-pointer items-center space-x-2 pl-2">
        <Avatar className="size-8">
          <AvatarImage src={imageUrl ?? undefined} alt={userEmail ?? 'User'} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <span className="text-muted-foreground flex-grow truncate text-sm">
          {userEmail}
        </span>
        <Button variant="ghost" size="icon">
          <EllipsisVerticalIcon className="size-4 stroke-2" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <Avatar className="size-8 cursor-pointer">
        <AvatarImage src={imageUrl ?? undefined} alt={userEmail ?? 'User'} />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    </div>
  );
}

function renderBottomNavTrigger(
  userName: string | null,
  initials: string,
  imageUrl: string | null,
  showLabel: boolean
): ReactNode {
  return (
    <div className="flex-1">
      <button
        type="button"
        className="flex w-full cursor-pointer flex-col items-center gap-1"
      >
        <Avatar className="size-6">
          <AvatarImage src={imageUrl ?? undefined} alt={userName ?? 'User'} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        {showLabel && <span className="text-[11px]">Account</span>}
      </button>
    </div>
  );
}

type AccountAction = {
  key: string;
  label: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void | Promise<void>;
  tone?: 'default' | 'danger';
};

function AccountActionRow({
  action,
  onDone,
}: {
  action: AccountAction;
  onDone?: () => void;
}) {
  const classes = cn(
    'flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors',
    action.tone === 'danger'
      ? 'border-border text-red-700 hover:bg-red-50'
      : 'border-border hover:bg-muted/60'
  );

  if (action.href) {
    return (
      <Link href={action.href} className={classes} onClick={onDone}>
        <span className="shrink-0">{action.icon}</span>
        <span className="flex-1 text-sm font-medium">{action.label}</span>
        <ChevronRightIcon className="size-4 shrink-0 opacity-60" />
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      onClick={async () => {
        await action.onClick?.();
        onDone?.();
      }}
    >
      <span className="shrink-0">{action.icon}</span>
      <span className="flex-1 text-sm font-medium">{action.label}</span>
    </button>
  );
}

export default function UserButton(props: Props) {
  const { user, initials } = useUserInitials();
  const became = useBecameUser();
  const setBecameUser = useSetBecameUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [sheetOffset, setSheetOffset] = useState(0);
  const [sheetHeight, setSheetHeight] = useState(0);
  const [isDraggingSheet, setIsDraggingSheet] = useState(false);
  const sheetContentRef = useRef<HTMLDivElement | null>(null);
  const dragStartYRef = useRef<number | null>(null);
  const dragStartOffsetRef = useRef(0);
  const activePointerIdRef = useRef<number | null>(null);
  const settleTimeoutRef = useRef<number | null>(null);

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

  const measureSheetHeight = () =>
    sheetContentRef.current?.getBoundingClientRect().height ?? 0;

  const animateSheetTo = (
    nextOffset: number,
    onComplete?: () => void,
    durationMs: number = 260
  ) => {
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
    const initialOffset =
      typeof window === 'undefined' ? 0 : window.innerHeight;
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

  useEffect(
    () => () => {
      clearSettleTimeout();
    },
    []
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const legacyMediaQuery = mediaQuery as MediaQueryList & {
      addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
      removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
    };
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

  const handleSheetPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    clearSettleTimeout();
    setIsDraggingSheet(true);
    dragStartYRef.current = event.clientY;
    dragStartOffsetRef.current = sheetOffset;
    activePointerIdRef.current = event.pointerId;
  };

  const handleSheetPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (
      !isDraggingSheet ||
      dragStartYRef.current === null ||
      activePointerIdRef.current !== event.pointerId
    ) {
      return;
    }

    const nextOffset = Math.max(
      dragStartOffsetRef.current + (event.clientY - dragStartYRef.current),
      0
    );
    setSheetOffset(nextOffset);
  };

  const handleSheetPointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (
      !isDraggingSheet ||
      (activePointerIdRef.current !== null &&
        activePointerIdRef.current !== event.pointerId)
    ) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const currentHeight = measureSheetHeight() || sheetHeight;
    const visibleRatio =
      currentHeight > 0 ? (currentHeight - sheetOffset) / currentHeight : 1;

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

  const mobileActions: AccountAction[] = [
    ...(user.isAdmin
      ? [
          {
            key: 'admin',
            label: 'Admin',
            href: ADMIN_HREF,
            icon: <Wrench className="size-5" />,
          },
        ]
      : []),
    {
      key: 'settings',
      label: 'Settings',
      href: SETTINGS_HREF,
      icon: <Cog6ToothIcon className="size-5" />,
    },
    became
      ? {
          key: 'revert',
          label: 'Revert to self',
          onClick: handleRevertSelf,
          icon: <LogOut className="size-5" />,
          tone: 'danger',
        }
      : {
          key: 'logout',
          label: 'Log out',
          onClick: handleSignOut,
          icon: <LogOut className="size-5" />,
          tone: 'danger',
        },
  ];

  const trigger =
    props.mode === 'sidebar'
      ? renderSidebarTrigger(user.name, initials, user.imageUrl, props.isFull)
      : renderBottomNavTrigger(
          user.name,
          initials,
          user.imageUrl,
          props.showLabel
        );

  if (props.mode === 'bottom-nav') {
    const safeSheetHeight =
      sheetHeight ||
      sheetContentRef.current?.getBoundingClientRect().height ||
      1;
    const overlayOpacity = Math.max(
      0,
      Math.min(1, 1 - sheetOffset / safeSheetHeight)
    );

    return (
      <BottomPopupSheet
        open={mobileOpen}
        onOpenChange={(open) => {
          if (open) {
            openMobileSheet();
            return;
          }
          closeMobileSheet();
        }}
      >
        <BottomPopupSheetTrigger asChild>{trigger}</BottomPopupSheetTrigger>
        <BottomPopupSheetContent
          ref={sheetContentRef}
          className="max-h-[50vh] min-h-[20rem] overflow-y-auto rounded-t-3xl px-0"
          onRequestClose={closeMobileSheet}
          overlayStyle={{
            opacity: overlayOpacity,
            transition: isDraggingSheet
              ? 'none'
              : 'opacity 260ms cubic-bezier(0.4, 0, 1, 1)',
          }}
          style={{
            transform: `translateY(${sheetOffset}px)`,
            transition: isDraggingSheet
              ? 'none'
              : 'transform 260ms cubic-bezier(0.4, 0, 1, 1)',
          }}
        >
          <BottomPopupSheetHeader
            className="touch-none px-4 pt-5 pb-3"
            onPointerDown={handleSheetPointerDown}
            onPointerMove={handleSheetPointerMove}
            onPointerUp={handleSheetPointerEnd}
            onPointerCancel={handleSheetPointerEnd}
          >
            <div className="bg-muted mx-auto mb-3 h-1.5 w-12 rounded-full" />
            <div className="flex items-center gap-3">
              <Avatar className="size-11">
                <AvatarImage
                  src={user.imageUrl ?? undefined}
                  alt={user.name ?? 'User'}
                />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <BottomPopupSheetTitle className="truncate">
                  {user.name}
                </BottomPopupSheetTitle>
                <BottomPopupSheetDescription className="truncate">
                  {user.email}
                </BottomPopupSheetDescription>
              </div>
            </div>
          </BottomPopupSheetHeader>
          <div className="space-y-3 px-4 pb-4">
            {mobileActions.map((action) => (
              <AccountActionRow
                key={action.key}
                action={action}
                onDone={closeMobileSheet}
              />
            ))}
          </div>
        </BottomPopupSheetContent>
      </BottomPopupSheet>
    );
  }

  const sideOffset = props.isFull ? 12 : 16;

  return (
    <DropdownMenu open={desktopOpen} onOpenChange={setDesktopOpen}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        side="right"
        align="end"
        alignOffset={0}
        sideOffset={sideOffset}
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user.isAdmin && (
          <DropdownMenuItem asChild>
            <Link href={ADMIN_HREF}>
              <Wrench className="mr-2 size-4" />
              <span>Admin</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link href={SETTINGS_HREF}>
            <Cog6ToothIcon className="mr-2 size-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {became ? (
          <button className="w-full" onClick={handleRevertSelf}>
            <DropdownMenuItem className="w-full cursor-pointer">
              <LogOut className="mr-2 size-4" />
              <span>Revert to self</span>
            </DropdownMenuItem>
          </button>
        ) : (
          <button className="w-full" onClick={handleSignOut}>
            <DropdownMenuItem className="w-full cursor-pointer">
              <LogOut className="mr-2 size-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </button>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { LayoutDashboard, MessageCircle, Wrench } from 'lucide-react';

type IconRenderer = (className: string) => React.ReactNode;
type PathMatcher = (pathname: string) => boolean;

export type NavItem = {
  key: string;
  label: string;
  to: string;
  isActive: PathMatcher;
  renderIcon: IconRenderer;
};

const startsWith =
  (prefix: string): PathMatcher =>
  (pathname) =>
    pathname.startsWith(prefix);

export const MAIN_NAV_ITEMS: NavItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    to: '/dashboard',
    isActive: startsWith('/dashboard'),
    renderIcon: (className) => <LayoutDashboard className={className} />,
  },
  {
    key: 'chats',
    label: 'Chats',
    to: '/chats',
    isActive: startsWith('/chats'),
    renderIcon: (className) => <MessageCircle className={className} />,
  },
];

export const ADMIN_ITEM: NavItem = {
  key: 'admin',
  label: 'Admin',
  to: '/admin',
  isActive: startsWith('/admin'),
  renderIcon: (className) => <Wrench className={className} />,
};

export default function NavConfig() {
  return { primaryItems: MAIN_NAV_ITEMS, adminItem: ADMIN_ITEM };
}

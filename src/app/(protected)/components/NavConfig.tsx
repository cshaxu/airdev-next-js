type IconRenderer = (className: string) => React.ReactNode;
type PathMatcher = (pathname: string) => boolean;

export type NavItem = {
  key: string;
  label: string;
  to: string;
  isActive: PathMatcher;
  renderIcon: IconRenderer;
};

// This file intentionally only defines shared nav types, but the repo lint rule
// requires a default export function in every module.
export default function NavConfig() {
  return null;
}

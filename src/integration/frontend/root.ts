import type { ComponentType } from 'react';

export interface RootFrontendIntegration {
  defaultLoggedInRoute: string;
  LandingComponent: ComponentType;
}

function EmptyLanding() {
  return null;
}

const defaultIntegration: RootFrontendIntegration = {
  defaultLoggedInRoute: '/dashboard',
  LandingComponent: EmptyLanding,
};

let rootFrontendIntegration: RootFrontendIntegration | null = null;

export function setRootFrontendIntegration(
  integration: RootFrontendIntegration
): void {
  rootFrontendIntegration = integration;
}

export function getRootFrontendIntegration(): RootFrontendIntegration {
  return rootFrontendIntegration ?? defaultIntegration;
}

export function hasRootFrontendIntegration(): boolean {
  return rootFrontendIntegration !== null;
}

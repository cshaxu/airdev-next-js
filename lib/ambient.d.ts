declare module '@/config/public' {
  export const publicConfig: import('./common/types/config').PublicConfig;
}

declare module '@/config/private' {
  export const privateConfig: import('./common/types/config').PrivateConfig;
}

declare module '@/config/edge' {
  export const edgeConfig: import('./common/types/config').EdgeConfig;
}

declare module '@/config/function/common' {
  export const commonFunctionConfig: import('./common/types/config').CommonFunctionConfig;
}

declare module '@/config/function/client' {
  export const clientFunctionConfig: import('./common/types/config').ClientFunctionConfig;
}

declare module '@/config/function/server' {
  export const serverFunctionConfig: import('./common/types/config').ServerFunctionConfig;
}

declare module '@/config/function/edge' {
  export const edgeFunctionConfig: import('./common/types/config').EdgeFunctionConfig;
}

declare module '@/config/function/backend' {
  export const backendFunctionConfig: import('./common/types/config').BackendFunctionConfig;
}

declare module '@/config/component/client' {
  export const clientComponentConfig: import('./common/types/config').ClientComponentConfig;
}

declare module '@/config/component/server' {
  export const serverComponentConfig: import('./common/types/config').ServerComponentConfig;
}

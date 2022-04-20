declare module '*.css';
declare module '*.less';
declare global {
  interface Window {
    tmapCallback: () => void;
    TMap: unknown;
  }
}
export {};

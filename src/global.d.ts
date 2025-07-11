declare global {
  interface Window {
    cyDataCyHighlightElements: (attribute: string) => void;
    cyDataCyExportElements: (attribute: string) => string;
  }
}

export {};

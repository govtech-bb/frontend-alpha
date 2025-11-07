import "@testing-library/jest-dom";

// Polyfill ResizeObserver for Radix UI components
global.ResizeObserver = class ResizeObserver {
  // biome-ignore lint/suspicious/noEmptyBlockStatements: Required polyfill stub
  observe() {}
  // biome-ignore lint/suspicious/noEmptyBlockStatements: Required polyfill stub
  unobserve() {}
  // biome-ignore lint/suspicious/noEmptyBlockStatements: Required polyfill stub
  disconnect() {}
};

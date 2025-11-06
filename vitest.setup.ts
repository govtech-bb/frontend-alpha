import "@testing-library/jest-dom";

// Mock ResizeObserver for Radix UI components
global.ResizeObserver = class ResizeObserver {
  observe() {
    // Mock implementation - intentionally empty
  }
  unobserve() {
    // Mock implementation - intentionally empty
  }
  disconnect() {
    // Mock implementation - intentionally empty
  }
};

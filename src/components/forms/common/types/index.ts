/**
 * Common types for multi-step government forms
 * Shared across all form implementations (birth, death, marriage, etc.)
 */

/**
 * Represents a single step in a multi-step form
 * Uses stable ID for logic and user-friendly title for display
 *
 * @example
 * {
 *   id: 'father-details',
 *   title: 'Father's details'
 * }
 */
export type FormStep = {
  /** Stable identifier used for routing and logic */
  id: string;
  /** User-friendly display title */
  title: string;
};

/**
 * Versioned wrapper for form data stored in localStorage
 * Includes versioning to handle data structure changes between deployments
 *
 * @template T - The form data type
 */
export type VersionedFormData<T> = {
  /** Version identifier (e.g., 'birth-v1.0.0') */
  version: string;
  /** Unix timestamp when data was saved */
  timestamp: number;
  /** Unix timestamp when data expires */
  expiresAt: number;
  /** The actual form data */
  data: T;
};

/**
 * Represents a single form validation error
 * Used by ErrorSummary component to display validation issues
 */
export type FormError = {
  /** The field identifier (used for linking to the input) */
  field: string;
  /** Human-readable error message */
  message: string;
};

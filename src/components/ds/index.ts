/**
 * Design System Component Exports
 *
 * This file serves as an alias for @govtech-bb/react components.
 * Import from this file to ensure consistent usage across the application.
 *
 * @example
 * import { Button, Input, ErrorSummary } from '@/components/ds';
 */

export type {
  ButtonProps,
  CheckboxProps,
  ErrorItem,
  ErrorSummaryProps,
  FooterProps,
  InputProps,
  LinkProps,
  LogoProps,
  OfficialBannerProps,
  RadioGroupProps,
  RadioProps,
  SelectProps,
  ShowHideProps,
  StatusBannerProps,
  TextareaProps,
  TypographyProps,
} from "@govtech-bb/react";
// Core Components
// Form Controls
// Layout Components
// Utility Components
export {
  Button,
  Checkbox,
  ErrorSummary,
  Footer,
  Input,
  Link,
  Logo,
  OfficialBanner,
  Radio,
  RadioGroup,
  Select,
  ShowHide,
  StatusBanner,
  TextArea,
  Typography,
} from "@govtech-bb/react";

// Note: DateInput is NOT exported here - we use our custom implementation
// See MIGRATION.md for rationale

# Design System Migration Guide

## Overview

This document tracks our migration from custom components to the @govtech-bb/react design system (v1.0.0-alpha.4).

**Migration Start Date:** November 6, 2025
**Design System Version:** 1.0.0-alpha.4 (pre-release)
**Migration Strategy:** Incremental "strangler fig" pattern

## Why We're Migrating

- **Consistency**: Standardized component library across government services
- **Accessibility**: Radix UI primitives provide enterprise-grade a11y
- **Maintenance**: Reduce custom code burden
- **Design Alignment**: Official government design patterns

## Migration Status

### Phase 1: Foundation & Theming ✓ COMPLETED
- [x] Install packages (exact version lock)
- [x] Create design system alias (`src/components/ds/index.ts`)
- [x] Import design tokens
- [x] Migrate color tokens
- [x] Migrate typography
- [x] Restyle custom DateInput
- [x] Delete dead code (form-progress-indicator)
- [ ] Set up visual regression testing (deferred to Phase 4)

### Phase 2: Core Interactive Elements ✓ COMPLETE
- [x] Button migration (all 8 form step files)
- [x] Input migration (4 of 4 files: child-details, contact-info, mothers-details, fathers-details)
- [x] ErrorSummary migration (7 form step files)
- [~] Link migration - DEFERRED (check-answers "Change" buttons are semantically buttons, not links)

### Phase 3: Enhanced Form Controls ✓ COMPLETE
- [x] Radio migration (2 files: marriage-status, include-father-details)
- [~] Checkbox migration - NOT NEEDED (no checkboxes in form)
- [x] Select migration (1 file: child-details)
- [x] TextArea migration (2 files: mothers-details, fathers-details)

### Phase 4: Specialized Components (PLANNED)
- [ ] StatusBanner migration
- [ ] Optional: OfficialBanner, Footer, Logo

## Component Mapping

| Our Component | Design System Component | Status | Notes |
|---------------|-------------------------|--------|-------|
| Button | DS Button | ✓ Complete | Phase 2 - 8 files |
| Link | DS Link | Deferred | Phase 2 - Semantically buttons |
| Input | DS Input | ✓ Complete | Phase 2 - 4 files, 19 inputs |
| ErrorSummary | DS ErrorSummary | ✓ Complete | Phase 2 - 7 files |
| Radio | DS Radio | ✓ Complete | Phase 3 - 2 files, Radix UI |
| Checkbox | DS Checkbox | N/A | Phase 3 - Not used in forms |
| Select | DS Select | ✓ Complete | Phase 3 - 1 file |
| TextArea | DS TextArea | ✓ Complete | Phase 3 - 2 files |
| Typography | DS Typography | Pending | Phase 1 |
| **DateInput** | **KEEP CUSTOM** | N/A | See rationale below |
| HelpfulBox | KEEP CUSTOM | N/A | No DS equivalent |
| MarkdownContent | KEEP CUSTOM | N/A | No DS equivalent |
| FormProgressIndicator | DELETE | ✓ Complete | Phase 1 - Deleted |

## Why We Keep Custom DateInput

**Decision Date:** November 6, 2025

**Rationale:**
1. **Recent Investment**: Just completed complex per-field validation implementation (validateDateFields)
2. **Battle-tested**: Supports text month names (Jan, Feb, etc.) and numeric months
3. **Validation Logic**: Granular day/month/year error messages with timezone handling
4. **Works Well**: No user-reported issues

**Strategy:**
- **Short-term**: Restyle with DS design tokens for visual consistency
- **Long-term**: Create tech debt ticket to evaluate DS DateInput when stable 1.0.0 releases

**Styling Approach:**
Apply DS tokens to match visual appearance:
- Colors: DS color palette
- Typography: DS font sizes and weights
- Spacing: DS spacing scale
- Borders: DS border styles
- Focus states: DS focus rings

## Using Design System Components

### Correct Import Pattern

```typescript
// ✓ CORRECT - Use the alias
import { Button, Input, ErrorSummary } from '@/components/ds';

// ✗ WRONG - Don't import directly
import { Button } from '@govtech-bb/react';
```

### ESLint Enforcement

We use ESLint rules to prevent importing deprecated custom components:

```json
{
  "rules": {
    "no-restricted-imports": ["error", {
      "patterns": [{
        "group": ["@/components/forms/common/error-summary"],
        "message": "Use @govtech-bb/react ErrorSummary via @/components/ds instead"
      }]
    }]
  }
}
```

## Design Tokens

### Color Palette

Design system colors are imported via `@govtech-bb/design`:

```css
/* globals.css */
@import "@govtech-bb/design";
```

### Color Token Mapping

| Our Custom Token | DS Token | CSS Variable |
|------------------|----------|--------------|
| --teal-dark | teal-dark | #0e5f64 |
| --teal-bright | teal-100 | #30c0c8 |
| --blue-dark | blue-dark | #00164a |
| --blue-100 | blue-100 | #00267f |
| --yellow-dark | yellow-dark | - |
| --yellow-bright | yellow-100 | - |
| --neutral-black | neutral-black | - |
| --neutral-white | neutral-white | - |

## Typography Mapping

| Our Variant | DS Variant | Usage |
|-------------|------------|-------|
| display | display | 80px - Hero headings |
| h1 | h1 | 56px - Page titles |
| h2 | h2 | 40px - Section headings |
| h3 | h3 | 24px - Subsection headings |
| h4 | h4 | 20px - Minor headings |
| subheading | body-lg | 32px - Large body text |
| paragraph / body | body | 20px - Standard body text |
| small | CUSTOM | Keep custom variant |
| muted | CUSTOM | Keep custom variant |
| link | CUSTOM | Keep custom variant |
| code | CUSTOM | Keep custom variant |

## Testing Requirements

### Unit Tests
- **Requirement**: All 361 tests must pass after EACH change
- **Command**: `npm run test:unit:run`
- **When**: After every component migration

### Visual Regression Tests
- **Tool**: Playwright visual snapshots
- **Baseline**: Captured before migration
- **Command**: `npm run test:e2e` (verify no unintended visual changes)
- **When**: After each phase

### E2E Tests
- **Critical Flow**: Complete birth registration form submission
- **Command**: `npm run test:e2e`
- **When**: After each phase

### Manual Accessibility Testing
Use this checklist for each migrated component:

- [ ] Keyboard-only navigation works
- [ ] Screen reader announces correctly (VoiceOver/NVDA)
- [ ] Focus indicators visible and high contrast
- [ ] Error messages accessible (aria-live)
- [ ] Zoom to 200% - no horizontal scroll
- [ ] Color contrast meets WCAG AA standards

## Risk Management

### Pre-release Version Risks

**Risk**: Breaking changes in alpha.5, alpha.6, or beta versions

**Mitigation:**
1. Version locked to exact `1.0.0-alpha.4` (no ^ or ~)
2. Monitor GitHub releases: https://github.com/govtech-bb/design-system/releases
3. Weekly check for updates

**Contingency Plan for Bugs:**
1. Report issue: https://github.com/govtech-bb/design-system/issues
2. Use `patch-package` for critical bugs:
   ```bash
   npm install --save-dev patch-package
   npx patch-package @govtech-bb/react
   ```
3. Remove patch when official fix released

### Upgrade Path to 1.0.0 Stable

**When stable 1.0.0 releases:**
1. Create branch: `chore/upgrade-design-system-v1.0.0`
2. Review CHANGELOG for breaking changes
3. Update version: `npm install @govtech-bb/react@1.0.0 @govtech-bb/design@1.0.0`
4. Run full test suite
5. Update visual regression baselines
6. Merge after QA approval

## Gotchas & Learnings

### Issue #1: ResizeObserver not available in test environment
**Problem**: Radix UI components (Radio, Checkbox, etc.) use ResizeObserver which is not available in the Vitest test environment, causing all tests to fail with "ResizeObserver is not defined"
**Solution**: Added ResizeObserver mock to vitest.setup.ts with empty implementations for observe(), unobserve(), and disconnect() methods
**Date**: November 6, 2025

### Issue #2: Radix Radio uses data-state instead of checked property
**Problem**: Tests checking `radio.checked` property failed because Radix UI Radio elements don't expose the native checked property
**Solution**: Updated tests to check `data-state="checked"` or `data-state="unchecked"` attributes instead. Also changed from checking individual radio buttons to checking the RadioGroup for aria-invalid state
**Date**: November 6, 2025

## Questions?

- **Design System Docs**: https://govtech-bb.github.io/design-system/
- **GitHub Repo**: https://github.com/govtech-bb/design-system
- **Internal Contact**: [Your team lead or architect]

## References

- Expert Review: Incorporated feedback from design system migration analysis (Nov 6, 2025)
- Original Plan: See git history for detailed migration strategy

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

### Phase 2: Core Interactive Elements ✓ IN PROGRESS
- [x] Button migration (all 8 form step files)
- [ ] Link migration (Change buttons in check-answers)
- [~] Input migration (2 of 4 files: child-details, contact-info)
- [ ] ErrorSummary migration

### Phase 3: Enhanced Form Controls (PLANNED)
- [ ] Radio migration (Radix UI)
- [ ] Checkbox migration (Radix UI)
- [ ] Select migration
- [ ] TextArea migration

### Phase 4: Specialized Components (PLANNED)
- [ ] StatusBanner migration
- [ ] Optional: OfficialBanner, Footer, Logo

## Component Mapping

| Our Component | Design System Component | Status | Notes |
|---------------|-------------------------|--------|-------|
| Button | DS Button | Pending | Phase 2 |
| Link | DS Link | Pending | Phase 2 |
| Input | DS Input | Pending | Phase 2 |
| ErrorSummary | DS ErrorSummary | Pending | Phase 2 |
| Radio | DS Radio | Pending | Phase 3 - Radix UI |
| Checkbox | DS Checkbox | Pending | Phase 3 - Radix UI |
| Select | DS Select | Pending | Phase 3 |
| TextArea | DS TextArea | Pending | Phase 3 |
| Typography | DS Typography | Pending | Phase 1 |
| **DateInput** | **KEEP CUSTOM** | N/A | See rationale below |
| HelpfulBox | KEEP CUSTOM | N/A | No DS equivalent |
| MarkdownContent | KEEP CUSTOM | N/A | No DS equivalent |
| FormProgressIndicator | DELETE | Pending | Dead code, not used |

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

### Issue #1: [To be filled as we discover issues]
**Problem**: [Description]
**Solution**: [How we fixed it]
**Date**: [When discovered]

## Questions?

- **Design System Docs**: https://govtech-bb.github.io/design-system/
- **GitHub Repo**: https://github.com/govtech-bb/design-system
- **Internal Contact**: [Your team lead or architect]

## References

- Expert Review: Incorporated feedback from design system migration analysis (Nov 6, 2025)
- Original Plan: See git history for detailed migration strategy

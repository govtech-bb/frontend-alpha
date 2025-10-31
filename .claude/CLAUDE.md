# Project-Specific Instructions: frontend-alpha

## Test Organization

This project has two separate test suites:

### Unit Tests (Vitest)
- **Location**: `src/**/tests/` subdirectories
- **Naming**: `*.{ts,tsx}` (no `.test` or `.spec` suffix)
- **Count**: 17 test files, 361 tests
- **Speed**: ~2 seconds
- **Runner**: Vitest

### Integration Tests (Playwright)
- **Location**: `tests/` directory
- **Naming**: `*.spec.{ts,tsx}`
- **Examples**: `broken-links.spec.ts`, `e2e/visual.spec.ts`
- **Speed**: Minutes (visual regression + browser automation)
- **Runner**: Playwright

## Test Commands

```bash
# Unit tests (development)
npm test                  # Watch mode - runs on file changes
npm run test:unit         # Same as above
npm run test:unit:run     # Run once and exit

# Integration tests
npm run test:e2e          # Run Playwright tests
npm run test:e2e:update   # Update snapshots
```

## Claude Test Protocol

When working on this project, follow this protocol:

### During Development
1. **After making changes**: Run `npm run test:unit:run` to verify unit tests pass
2. **Do NOT use watch mode** (`npm test`) - it creates background processes that clutter the session
3. **Run-once mode only**: Always use `npm run test:unit:run` for clean execution

### Before Committing
1. **MUST run**: `npm run test:unit:run`
2. **MUST verify**: All 361 unit tests pass
3. **MUST verify**: No type errors (`npx tsc --noEmit` if TypeScript project)
4. **MUST verify**: No linter errors
5. **Only then**: Proceed with `git add` and `git commit`

### Integration Tests
- **Do NOT run** integration tests (`npm run test:e2e`) during normal development
- Integration tests are for CI/CD or explicit user request
- They are slow and require full builds

## Vitest Configuration

The vitest config (`vitest.config.ts`) is set to:
- **Include**: `src/**/tests/**/*.{ts,tsx}` and `**/*.test.{ts,tsx}`
- **Exclude**: `tests/**` and `**/*.spec.{ts,tsx}` (Playwright tests)

This ensures unit tests run fast without triggering slow integration tests.

## Test File Structure

```
src/
  components/
    forms/
      common/
        hooks/
          tests/           # Unit tests for hooks
            use-form-navigation.ts
            use-form-storage.ts
      register-birth/
        tests/             # Unit tests for form logic
          schema.ts
          use-register-birth-steps.ts
        steps/
          tests/           # Unit tests for step components
            marriage-status.tsx
            child-details.tsx
  lib/
    tests/                 # Unit tests for utilities
      date-format.ts
      date-validation.ts

tests/                     # Playwright integration tests (excluded from Vitest)
  broken-links.spec.ts
  e2e/
    visual.spec.ts
```

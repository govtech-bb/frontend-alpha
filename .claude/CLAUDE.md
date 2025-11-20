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


# Ultracite Code Standards

This project uses **Ultracite**, a zero-config Biome preset that enforces strict code quality standards through automated formatting and linting.

## Quick Reference

- **Format code**: `npx ultracite fix`
- **Check for issues**: `npx ultracite check`
- **Diagnose setup**: `npx ultracite doctor`

Biome (the underlying engine) provides extremely fast Rust-based linting and formatting. Most issues are automatically fixable.

---

## Core Principles

Write code that is **accessible, performant, type-safe, and maintainable**. Focus on clarity and explicit intent over brevity.

### Type Safety & Explicitness

- Use explicit types for function parameters and return values when they enhance clarity
- Prefer `unknown` over `any` when the type is genuinely unknown
- Use const assertions (`as const`) for immutable values and literal types
- Leverage TypeScript's type narrowing instead of type assertions
- Use meaningful variable names instead of magic numbers - extract constants with descriptive names

### Modern JavaScript/TypeScript

- Use arrow functions for callbacks and short functions
- Prefer `for...of` loops over `.forEach()` and indexed `for` loops
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safer property access
- Prefer template literals over string concatenation
- Use destructuring for object and array assignments
- Use `const` by default, `let` only when reassignment is needed, never `var`

### Async & Promises

- Always `await` promises in async functions - don't forget to use the return value
- Use `async/await` syntax instead of promise chains for better readability
- Handle errors appropriately in async code with try-catch blocks
- Don't use async functions as Promise executors

### React & JSX

- Use function components over class components
- Call hooks at the top level only, never conditionally
- Specify all dependencies in hook dependency arrays correctly
- Use the `key` prop for elements in iterables (prefer unique IDs over array indices)
- Nest children between opening and closing tags instead of passing as props
- Don't define components inside other components
- Use semantic HTML and ARIA attributes for accessibility:
  - Provide meaningful alt text for images
  - Use proper heading hierarchy
  - Add labels for form inputs
  - Include keyboard event handlers alongside mouse events
  - Use semantic elements (`<button>`, `<nav>`, etc.) instead of divs with roles

### Error Handling & Debugging

- Remove `console.log`, `debugger`, and `alert` statements from production code
- Throw `Error` objects with descriptive messages, not strings or other values
- Use `try-catch` blocks meaningfully - don't catch errors just to rethrow them
- Prefer early returns over nested conditionals for error cases

### Code Organization

- Keep functions focused and under reasonable cognitive complexity limits
- Extract complex conditions into well-named boolean variables
- Use early returns to reduce nesting
- Prefer simple conditionals over nested ternary operators
- Group related code together and separate concerns

### Security

- Add `rel="noopener"` when using `target="_blank"` on links
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary
- Don't use `eval()` or assign directly to `document.cookie`
- Validate and sanitize user input

### Performance

- Avoid spread syntax in accumulators within loops
- Use top-level regex literals instead of creating them in loops
- Prefer specific imports over namespace imports
- Avoid barrel files (index files that re-export everything)
- Use proper image components (e.g., Next.js `<Image>`) over `<img>` tags

### Framework-Specific Guidance

**Next.js:**
- Use Next.js `<Image>` component for images
- Use `next/head` or App Router metadata API for head elements
- Use Server Components for async data fetching instead of async Client Components

**React 19+:**
- Use ref as a prop instead of `React.forwardRef`

**Solid/Svelte/Vue/Qwik:**
- Use `class` and `for` attributes (not `className` or `htmlFor`)

---

## Testing

- Write assertions inside `it()` or `test()` blocks
- Avoid done callbacks in async tests - use async/await instead
- Don't use `.only` or `.skip` in committed code
- Keep test suites reasonably flat - avoid excessive `describe` nesting

## When Biome Can't Help

Biome's linter will catch most issues automatically. Focus your attention on:

1. **Business logic correctness** - Biome can't validate your algorithms
2. **Meaningful naming** - Use descriptive names for functions, variables, and types
3. **Architecture decisions** - Component structure, data flow, and API design
4. **Edge cases** - Handle boundary conditions and error states
5. **User experience** - Accessibility, performance, and usability considerations
6. **Documentation** - Add comments for complex logic, but prefer self-documenting code

---

Most formatting and common issues are automatically fixed by Biome. Run `npx ultracite fix` before committing to ensure compliance.

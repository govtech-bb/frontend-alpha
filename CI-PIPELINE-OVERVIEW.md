# Frontend Alpha CI/CD Pipeline

## Overview

The enhanced CI/CD pipeline automatically runs quality checks on every push to the `sandbox` and `ci-testing` branches. The pipeline ensures code quality, type safety, and security before changes reach production.

## Pipeline Stages

The pipeline runs the following checks in parallel where possible:

### 1. Lint
- **Purpose**: Enforces code style and catches common programming errors
- **Tool**: Biome (configured in `biome.jsonc`)
- **Run locally**: `npm run lint`
- **What it checks**:
  - Code formatting consistency
  - Unused variables and imports
  - Potential bugs (e.g., missing switch defaults)
  - Code complexity issues

### 2. Type Check
- **Purpose**: Validates TypeScript types across the entire codebase
- **Tool**: TypeScript Compiler (`tsc`)
- **Run locally**: `npx tsc --noEmit`
- **What it checks**:
  - Type errors and mismatches
  - Missing type declarations
  - Invalid property access
  - Function signature mismatches

### 3. Unit Tests
- **Purpose**: Runs automated tests to verify code functionality
- **Tool**: Vitest
- **Run locally**: `npm run test:unit`
- **What it checks**:
  - Component behavior
  - Utility function correctness
  - Business logic validation

### 4. Build
- **Purpose**: Verifies the application can be built for production
- **Tool**: Next.js build system
- **Run locally**: `npm run build`
- **Dependencies**: Requires Lint and Type Check to pass first
- **What it checks**:
  - Build configuration validity
  - Import/export correctness
  - Production bundle generation

### 5. Security Scan
- **Purpose**: Identifies potential security vulnerabilities
- **Tool**: GitHub CodeQL
- **What it checks**:
  - SQL injection vulnerabilities
  - Cross-site scripting (XSS) risks
  - Insecure dependencies
  - Authentication/authorization issues
- **Note**: This runs in parallel and won't block the pipeline, but findings should be reviewed

## Enhanced Error Reporting

When a check fails, the pipeline now provides:

1. **Clear failure summary** in the GitHub Actions UI
2. **Detailed error output** in collapsible sections
3. **Instructions to reproduce locally** with exact commands
4. **File and line numbers** for errors

Example: If type check fails, you'll see exactly which files have type errors and what the errors are, without digging through logs.

## Branches Monitored

- `sandbox` - Testing branch for experimental features
- `ci-testing` - Dedicated branch for CI/CD testing

## Issues Identified and Fixed

When the enhanced pipeline was first introduced, it identified several code quality issues that were previously undetected:

### Type Errors Fixed
1. **Window interface declarations** - `DD_RUM` and `_paq` properties weren't properly declared on the global Window type
2. **Date formatting function** - `formatForDisplay` had incorrect type signature
3. **Error handling** - Generic error types in E2E tests weren't properly typed

### Linting Issues Fixed
1. **Duplicate type declarations** - DD_RUM type was declared twice
2. **Biome-ignore comments** - Had placeholder `<explanation>` text instead of actual explanations
3. **Missing switch defaults** - Switch statements without default cases
4. **Unused async functions** - Functions marked async that didn't use await
5. **Unused variables** - Variables declared but never used
6. **Missing image dimensions** - Images without width/height attributes
7. **Archive test files** - Obsolete test files in `public/archive-tests/` causing lint errors

### Configuration Updates
1. **Lint script** - Changed from non-existent `eslint` to `biome check .`
2. **Biome configuration** - Added overrides for `.d.ts` files to allow `interface` syntax (required for extending global types)

## Benefits

The enhanced pipeline provides:

- **Early detection** of issues before code review
- **Consistent code quality** across the team
- **Faster debugging** with detailed error messages
- **Confidence** that code builds and passes tests before merging
- **Security awareness** through automated vulnerability scanning

## Running Checks Locally

Before pushing code, run these commands to catch issues early:

```bash
# Run all checks
npm run lint
npx tsc --noEmit
npm run test:unit
npm run build

# Or run them in sequence
npm run lint && npx tsc --noEmit && npm run test:unit && npm run build
```

## Viewing Pipeline Results

1. Go to the **Actions** tab in the GitHub repository
2. Click on the latest workflow run
3. Review the status of each job
4. Click on failed jobs to see detailed error output in the summary

## Questions?

If you encounter pipeline failures:
1. Check the error summary in the GitHub Actions UI
2. Run the failing check locally using the provided command
3. Fix the issues and push again
4. The pipeline will automatically re-run on the new push

# Frontend Alpha CI/CD Pipeline

## Overview

The enhanced CI/CD pipeline automatically runs quality checks on every push to the `sandbox` and `ci-testing` branches. The pipeline ensures code quality, type safety, and security before changes reach production.

## Pipeline Stages

The pipeline runs the following checks (6 stages total):

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
- **Blocking**: Yes - failing tests will block the build

### 4. Build
- **Purpose**: Verifies the application can be built for production
- **Tool**: Next.js build system
- **Run locally**: `npm run build`
- **Dependencies**: Requires Lint and Type Check to pass first
- **What it checks**:
  - Build configuration validity
  - Import/export correctness
  - Production bundle generation

### 5. Secrets Scan
- **Purpose**: Detects hardcoded secrets to prevent introducing new secrets into the codebase
- **Tool**: Gitleaks (CLI)
- **Scanning strategy**: 
  - **Primary scan**: Current commit only (fast, blocks build)
  - **Secondary scan**: If secrets found, also scans git history for context (warning only)
- **What it checks**:
  - API keys and tokens
  - Passwords and credentials
  - Private keys (SSH, PGP, etc.)
  - OAuth tokens
  - Database connection strings
  - AWS keys, GitHub tokens, etc.
- **Blocking behavior**: 
  - ⛔ **Blocks build** if secrets found in current commit
  - ⚠️ **Warning only** if secrets found in git history or other branches
- **Error reporting**: 
  - Shows exact file locations, line numbers, and masked secret values
  - Separates current commit secrets (must fix) from historical secrets (should review)
- **Action required**: Replace hardcoded secrets with safe placeholder values

**Safe placeholder patterns that won't trigger the scanner:**
- Environment variables: `process.env.NEXT_PUBLIC_DD_CLIENT_TOKEN`
- Descriptive text: `'your-datadog-token-here'`, `'replace-with-your-api-key'`
- Obvious fake values: `'xxxx-xxxx-xxxx-xxxx'`, `'0000000000000000'`
- Example format: `'pub_EXAMPLE_TOKEN_12345'` (prefix with EXAMPLE)
- Create `.env.example` with placeholder values

**Example:**
```javascript
// ❌ BAD: const token = 'pub_EXAMPLE_REAL_TOKEN_12345'
// ✅ GOOD: const token = process.env.NEXT_PUBLIC_DD_CLIENT_TOKEN
// ✅ GOOD: const token = 'your-datadog-client-token-here'
```

**Why this approach?**
- Fast feedback: Scans current commit first (seconds)
- Context awareness: Shows if similar secrets exist elsewhere (for awareness)
- Strict enforcement: Only blocks build for new secrets being introduced
- GitHub Advanced Security provides continuous monitoring of the entire repository

### 6. Security Scan (Code Vulnerabilities)
- **Purpose**: Identifies potential security vulnerabilities in current code changes
- **Tool**: GitHub CodeQL
- **Scope**: Analyzes code patterns and data flow in current commit
- **What it checks**:
  - SQL injection vulnerabilities
  - Cross-site scripting (XSS) risks
  - Insecure dependencies
  - Authentication/authorization issues
- **Blocking behavior**:
  - ⛔ **Blocks build** if Critical or High severity issues found
  - ⚠️ **Warning only** for Medium and Low severity issues
- **Severity levels**:
  - 🔴 Critical (9.0-10.0) - Blocks build
  - 🟠 High (7.0-8.9) - Blocks build
  - 🟡 Medium (4.0-6.9) - Warning only
  - 🟢 Low (0.0-3.9) - Warning only

**Note**: GitHub Advanced Security continuously monitors the entire repository. This CI check focuses on preventing new vulnerabilities from being introduced.

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

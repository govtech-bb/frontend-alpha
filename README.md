## Alpha.Gov.bb

This repo uses the latest build of Next.js (v15.5.x)

### Usage

First, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Pull Requests

We utilize [trunk-based development](https://trunkbaseddevelopment.com/) whereby all changes are submitted as a Pull Request to the `main` (base) branch. Each PR is then automatically tested using Github CI/CD and AWS Inspector. PRs are also reviewed manually and if approved, are merged.

PRs are not merged if the build or tests are failing. 

### Publishing

- Updates to the `main` branch are published to https://dev.alpha.gov.bb
- Updates to the `prod` branch are published to https://alpha.gov.bb

### Testing

We use Playwright `@playwright/test@^1.55.1` to run automated end-to-end tests against the codebase. Playwright is currently used to run Visual Regression Tests (`visual.spec.ts`) to detect any visible changes made during a commit so that any unintentional changes may be avoided from being published. 

#### Updating Snapshots

Visual Regression Testing is a process through which we commit snapshots of the expected visual appearance of the web application then compare future commits against those snapshots. These snapshots are updated intentional changes (e.g. new content or visual changes) are made to the site design or functionality. Snapshots are stored in the folder: `tests/e2e/visual.spec.ts-snapshots`

### CI/CD Integration

Whenever a new PR or commit is made to the `main` or `prod` branches, the Github Action Workflow will run the Playwright tests against the code commit. 
- Tests automatically run on pushes to `main` and `prod` branches
- Failures prevent merges if visual changes are detected
- HTML reports available as GitHub Actions artifacts

The Github Action is configured using the `playwright.yml` file as follows:
  - Automatic server startup on port 3000
  - Multi-browser testing (Chromium, WebKit)
  - CI/CD optimizations with retry logic
  - Disabled animations and cursors for consistent screenshots

#### Run tests locally

The Playwright tests can be run locally using the following commands

```bash
# Run visual regression tests
npm run test:e2e

# Update baselines after intentional changes
npm run test:e2e:update

# Update baselines (optional - only for Linux environments)
npm run test:e2e:update:linux

# View detailed HTML reports
npm run test:e2e:report
```


## Alpha.Gov.bb

This repo uses the latest build of [Next.js](https://nextjs.org/) (v15.5.x). The tech stack involves the following tools:
- [BiomeJS](https://biomejs.dev/) (configured by [Ultracite](https://www.ultracite.ai/))
- [Playwright](https://playwright.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- Amazon Web Services [Simple Email Service](https://aws.amazon.com/ses/)
- [Nodemailer](https://nodemailer.com/)

### Usage

First, rename the `env.local.example` file to `.env.local`. Update the environment variables as necessary

Then, install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Pull Requests

We utilize [trunk-based development](https://trunkbaseddevelopment.com/) whereby all changes are submitted as a Pull Request to the `main` (base) branch. Each PR is then automatically tested using Github CI/CD and AWS Code Inspection Tools. PRs are also reviewed manually and if approved, are merged.

PRs are not merged if the build or tests are failing. 

### Add new Entry Points

New Entry Points must be added to `/src/content` folder as markdown files. 

Each markdown file must have one or more of the following attributes in its frontmatter:

- Title (mandatory)
- Description 
- Stage: used to display a banner
- Source_url: used to identify where the content was sourced/migrated from
- Featured: used to add a link on the homepage to the entry point
- Publish_date (mandatory)

Additionally, the `content-directory.ts` must be updated to list the new entry point in the respective category

> When adding new markdown content, make sure that you update the test snapshots. See below for instructions

### Branch deployments to Live/Dev custom domains

Code is deployed and hosted via AWS Amplify where the environment variables are also stored. Note the following:

- Updates to the `main` branch are deployed to https://dev.alpha.gov.bb
- Updates to the `prod` branch are deployed to https://alpha.gov.bb

### Testing

We use Playwright `@playwright/test@^1.55.1` to run automated end-to-end tests against the codebase. Playwright is currently used to run Visual Regression Tests (`visual.spec.ts`) to detect any visible changes made during a commit so that any unintentional changes may be avoided from being deployed to the live/dev domains. 

#### Updating Snapshots

Visual Regression Testing is a process through which we commit snapshots of the expected visual appearance of the web application then compare future commits against those snapshots. These snapshots are updated intentional changes (e.g. new content or visual changes) are made to the site design or functionality. Snapshots are stored in the folder: `tests/e2e/visual.spec.ts-snapshots`

### CI/CD Integration

Whenever a new PR or commit is made to the `main` or `prod` branches, the Github Action Workflow will run the Playwright tests against the code commit. 
- Tests automatically run on pushes to `main` and `prod` branches
- Failures prevent merges if visual changes are detected
- HTML reports available as [GitHub Actions artifacts](https://github.com/govtech-bb/frontend-alpha/actions)

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

You can also run tests individually. For instance, you can run the visual regression tests separately as follows

```bash
# Run tests with the word `visual` in their filename 
npx playwright test visual

# Run a specific test by its title
npx playwright test -g "should find all broken links across the site"
```


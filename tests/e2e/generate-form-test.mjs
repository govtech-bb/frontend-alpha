#!/usr/bin/env node

/**
 * Script to generate a new generic form test file
 *
 * Usage:
 *   node tests/e2e/generate-form-test.mjs <schema-name> <form-url> <form-title>
 *
 * Example:
 *   node tests/e2e/generate-form-test.mjs get-passport-application /travel-identity/get-passport/form "Get Passport Application"
 */

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Parse command line arguments
const args = process.argv.slice(2);

if (args.length < 3) {
  console.error("❌ Error: Missing required arguments\n");
  console.log("Usage:");
  console.log(
    "  node tests/e2e/generate-form-test.mjs <schema-name> <form-url> <form-title>\n"
  );
  console.log("Example:");
  console.log(
    '  node tests/e2e/generate-form-test.mjs get-passport-application /travel-identity/get-passport/form "Get Passport Application"\n'
  );
  process.exit(1);
}

const [schemaName, formUrl, formTitle] = args;

// Generate the test file content
const testContent = `import { createFormTest, type FormTestConfig } from "./generic-form.spec";
import { formSteps } from "@/schema/${schemaName}";

/**
 * ${formTitle} Form Test using Generic Test Framework
 */

const config: FormTestConfig = {
  schemaPath: "@/schema/${schemaName}",
  formUrl: "${formUrl}",
  formName: "${formTitle}",
};

createFormTest(config, formSteps);
`;

// Generate the output filename
const outputFilename = `${schemaName}-generic.spec.ts`;
const outputPath = join(__dirname, outputFilename);

// Write the file
try {
  writeFileSync(outputPath, testContent);
  console.log("✅ Test file generated successfully!\n");
  console.log("📄 File:", outputFilename);
  console.log("📂 Location:", outputPath);
  console.log("\n🚀 Run your test with:");
  console.log(`   npx playwright test tests/e2e/${outputFilename}`);
  console.log("\n💡 Or in UI mode:");
  console.log(`   npx playwright test tests/e2e/${outputFilename} --ui\n`);
} catch (error) {
  console.error("❌ Error writing file:", error.message);
  process.exit(1);
}

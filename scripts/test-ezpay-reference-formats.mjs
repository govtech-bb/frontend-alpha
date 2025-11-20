/**
 * Test Script: EZPay Reference Number Format Validation
 *
 * This script tests whether ez_reference_number accepts:
 * - UUID format (current implementation)
 * - Integer format
 * - Base64 encoded strings
 * - Other string formats
 *
 * Run with: source .env.local && node scripts/test-ezpay-reference-formats.mjs
 */

import crypto from "crypto";

// Read from environment variables or use defaults
const EZPAY_API_URL = process.env.EZPAY_API_URL || "";
const EZPAY_API_KEY = process.env.EZPAY_API_KEY || "";
const EZPAY_PAYMENT_CODE =
  process.env.EZPAY_PASSPORT_CODE || process.env.EZPAY_PAYMENT_CODE || "";

// Generate a simple UUID v4 (for older Node versions without crypto.randomUUID)
function generateUUID() {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older Node versions
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Test different reference number formats
const testCases = [
  {
    name: "UUID v4 (current implementation)",
    value: generateUUID(),
    description:
      "Standard UUID format like: 550e8400-e29b-41d4-a716-446655440000",
  },
  {
    name: "Integer as string",
    value: "123456789",
    description: "Pure numeric string",
  },
  {
    name: "Large integer as string",
    value: String(Date.now()),
    description: "Timestamp as integer string",
  },
  {
    name: "Base64 encoded UUID",
    value: Buffer.from(generateUUID()).toString("base64"),
    description: "Base64 encoded UUID string",
  },
  {
    name: "Base64 URL-safe",
    value: Buffer.from(generateUUID()).toString("base64url"),
    description: "Base64 URL-safe encoding (no + or / characters)",
  },
  {
    name: "Alphanumeric with hyphens",
    value: `REF-${Date.now()}-${Math.random().toString(36).substring(7)}`,
    description: "Custom format with prefix and random string",
  },
  {
    name: "Short alphanumeric",
    value: Math.random().toString(36).substring(2, 15),
    description: "Short random alphanumeric string",
  },
  {
    name: "Long alphanumeric",
    value: Array(50)
      .fill(0)
      .map(() => Math.random().toString(36).charAt(2))
      .join(""),
    description: "50 character random string",
  },
  {
    name: "With special characters",
    value: `TEST_${Date.now()}_#${Math.floor(Math.random() * 1000)}`,
    description: "String with underscores and hash symbol",
  },
  {
    name: "Very short (5 chars)",
    value: Math.random().toString(36).substring(2, 7),
    description: "Only 5 characters",
  },
];

/**
 * Test a specific reference number format against EZPay API
 */
async function testReferenceFormat(referenceNumber, testName) {
  try {
    // Create minimal cart item for testing
    const cartItems = [
      {
        code: EZPAY_PAYMENT_CODE,
        amount: 1.0, // Minimum test amount
        details: `Test: ${testName}`,
        reference: referenceNumber,
      },
    ];

    const formData = new URLSearchParams();
    formData.append("ez_cart_array", JSON.stringify(cartItems));
    formData.append("ez_reference_email", "test@example.com");
    formData.append("ez_reference_name", "Test User");
    formData.append("ez_reference_number", referenceNumber);
    formData.append("ez_allow_credit", "true");
    formData.append("ez_allow_debit", "true");
    formData.append("ez_allow_payce", "true");

    console.log(`\n🧪 Testing: ${testName}`);
    console.log(`   Value: ${referenceNumber}`);
    console.log(`   Length: ${referenceNumber.length} characters`);

    const response = await fetch(`${EZPAY_API_URL}/ezpay_receivecart`, {
      method: "POST",
      headers: {
        EZPluginKey: EZPAY_API_KEY,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const responseText = await response.text();
    let responseData;

    try {
      responseData = JSON.parse(responseText);
    } catch {
      responseData = responseText;
    }

    const result = {
      testCase: testName,
      value: referenceNumber,
      success: response.ok,
      statusCode: response.status,
      response: responseData,
    };

    if (response.ok) {
      console.log(`   ✅ SUCCESS - Status: ${response.status}`);
      console.log(`   Response:`, JSON.stringify(responseData, null, 2));
    } else {
      console.log(`   ❌ FAILED - Status: ${response.status}`);
      console.log(`   Error:`, responseText);
      result.error = responseText;
    }

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log(`   💥 EXCEPTION: ${errorMessage}`);

    return {
      testCase: testName,
      value: referenceNumber,
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Sleep helper for rate limiting
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Main test runner
 */
async function runTests() {
  console.log("=".repeat(80));
  console.log("EZPay Reference Number Format Testing");
  console.log("=".repeat(80));
  console.log(`API URL: ${EZPAY_API_URL}`);
  console.log(`Payment Code: ${EZPAY_PAYMENT_CODE}`);
  console.log(`Total Tests: ${testCases.length}`);
  console.log("=".repeat(80));

  // Validate configuration
  if (!EZPAY_API_URL) {
    console.error("\n❌ ERROR: EZPAY_API_URL not configured");
    console.error(
      "Please run: source .env.local && node scripts/test-ezpay-reference-formats.mjs"
    );
    process.exit(1);
  }

  if (!EZPAY_API_KEY) {
    console.error("\n❌ ERROR: EZPAY_API_KEY not configured");
    console.error(
      "Please run: source .env.local && node scripts/test-ezpay-reference-formats.mjs"
    );
    process.exit(1);
  }

  if (!EZPAY_PAYMENT_CODE) {
    console.error(
      "\n❌ ERROR: EZPAY_PASSPORT_CODE (or EZPAY_PAYMENT_CODE) not configured"
    );
    console.error(
      "Please run: source .env.local && node scripts/test-ezpay-reference-formats.mjs"
    );
    process.exit(1);
  }

  const results = [];

  // Run tests sequentially to avoid rate limiting
  for (const testCase of testCases) {
    const result = await testReferenceFormat(testCase.value, testCase.name);
    results.push(result);

    // Small delay between requests to be polite to the API
    await sleep(1000);
  }

  // Summary
  console.log("\n" + "=".repeat(80));
  console.log("TEST SUMMARY");
  console.log("=".repeat(80));

  const successful = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);

  console.log(`\n✅ Successful: ${successful.length}/${results.length}`);
  successful.forEach((r) => {
    console.log(`   • ${r.testCase}`);
    console.log(`     Value: ${r.value}`);
  });

  console.log(`\n❌ Failed: ${failed.length}/${results.length}`);
  failed.forEach((r) => {
    console.log(`   • ${r.testCase}`);
    console.log(`     Value: ${r.value}`);
    if (r.error) {
      const errorPreview =
        r.error.length > 100 ? r.error.substring(0, 100) + "..." : r.error;
      console.log(`     Error: ${errorPreview}`);
    }
  });

  // Detailed results table
  console.log("\n" + "=".repeat(80));
  console.log("DETAILED RESULTS");
  console.log("=".repeat(80));
  console.table(
    results.map((r) => ({
      Test: r.testCase,
      Value: r.value.substring(0, 30) + (r.value.length > 30 ? "..." : ""),
      Length: r.value.length,
      Status: r.statusCode || "N/A",
      Success: r.success ? "✅" : "❌",
    }))
  );

  // Recommendations
  console.log("\n" + "=".repeat(80));
  console.log("RECOMMENDATIONS");
  console.log("=".repeat(80));

  if (successful.length === results.length) {
    console.log(
      "\n✅ All formats accepted! EZPay is flexible with reference numbers."
    );
    console.log("   You can use UUID, integers, base64, or custom formats.");
    console.log("\n   Suggested formats (in order of preference):");
    console.log("   1. UUID v4 (current) - Globally unique, standard format");
    console.log("   2. Timestamp + random - Shorter, still unique");
    console.log("   3. Integer - Simplest, but need to manage uniqueness");
  } else if (successful.length > 0) {
    console.log("\n⚠️  Some formats work, others don't. Accepted formats:");
    successful.forEach((r) => {
      const valuePreview =
        r.value.length > 40 ? r.value.substring(0, 40) + "..." : r.value;
      console.log(`   • ${r.testCase}`);
      console.log(`     Example: ${valuePreview}`);
      console.log(`     Length: ${r.value.length} chars`);
    });
    console.log("\n   Rejected formats:");
    failed.forEach((r) => {
      console.log(`   • ${r.testCase}`);
      console.log(`     Length: ${r.value.length} chars`);
    });
  } else {
    console.log("\n❌ No formats accepted. Possible issues:");
    console.log("   • Check API credentials (EZPAY_API_KEY)");
    console.log("   • Verify API URL is correct");
    console.log("   • Ensure payment code exists in EZPay admin");
    console.log("   • Check if API is accessible from this network");
  }

  console.log("\n" + "=".repeat(80));

  // Exit with appropriate code
  process.exit(failed.length === 0 ? 0 : 1);
}

// Run the tests
runTests().catch((error) => {
  console.error("\n💥 Fatal error:", error);
  process.exit(1);
});

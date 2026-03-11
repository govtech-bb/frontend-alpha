# Local Testing Guide: Modular Form System with S3/CloudFront Runtime Loading

This guide explains how to test the modular form system locally before deploying to AWS.

## Overview

The modular form system loads patterns and service contracts at runtime from S3/CloudFront. For local testing, we serve these JSON files from the `public/` directory, simulating the production S3/CloudFront setup.

## Architecture

```
Browser Request
    ↓
Frontend (localhost:3000)
    ↓
Fetches patterns from /patterns/*.json (served from public/patterns/)
    ↓
Fetches service contracts from /service-contracts/*.json (served from public/service-contracts/)
    ↓
Backend (localhost:8000) - also fetches patterns for validation
```

## Setup

### 1. Pattern and Service Contract Files

All pattern and service contract files are already copied to:
- `frontend-alpha/public/patterns/` - 7 pattern files
- `frontend-alpha/public/service-contracts/` - 3 service contract files

### 2. Environment Configuration

**Frontend** (`.env.local`):
```env
NEXT_PUBLIC_PATTERNS_CDN_URL=http://localhost:3000/patterns
NEXT_PUBLIC_SERVICE_CONTRACTS_CDN_URL=http://localhost:3000/service-contracts
```

**Backend** (`.env.local`):
```env
PATTERNS_CDN_URL=http://localhost:3000/patterns
SERVICE_CONTRACTS_CDN_URL=http://localhost:3000/service-contracts
```

### 3. Code Components

**Frontend**:
- `src/lib/pattern-loader.ts` - Service for fetching patterns and contracts
- Functions: `fetchPattern()`, `fetchServiceContract()`, `fetchPatterns()`
- Includes caching to avoid redundant fetches

**Backend**:
- `src/validation/pattern-fetcher.service.ts` - NestJS service for fetching patterns
- Includes caching and logging
- Used by schema builder for validation

## Testing

### Quick Test: Static HTML Page

1. Start the frontend dev server:
   ```bash
   cd frontend-alpha
   npm run dev
   ```

2. Open in browser:
   ```
   http://localhost:3000/test-pattern-loader.html
   ```

3. Click the test buttons to verify:
   - Single pattern fetch works
   - Service contract fetch works
   - Multiple patterns fetch works

### Test: Frontend Pattern Loader

```typescript
import { fetchPattern, fetchServiceContract } from '@/lib/pattern-loader';

// Fetch a single pattern
const pattern = await fetchPattern('personal-details-barbados');
console.log(pattern);

// Fetch a service contract
const contract = await fetchServiceContract('birth-certificate');
console.log(contract);

// Fetch multiple patterns with caching
const patterns = await fetchPatterns([
  'personal-details-barbados',
  'address-barbados',
  'contact-details-barbados'
]);
console.log(patterns);
```

### Test: Backend Pattern Fetcher

```typescript
import { PatternFetcherService } from './validation/pattern-fetcher.service';

// In your controller or service
const pattern = await this.patternFetcherService.fetchPattern('personal-details-barbados');
console.log(pattern);

// Fetch service contract
const contract = await this.patternFetcherService.fetchServiceContract('birth-certificate');
console.log(contract);
```

## Available Patterns

1. `personal-details-barbados.json` - Title, first name, middle name, last name
2. `address-barbados.json` - Address lines, parish, postal code
3. `contact-details-barbados.json` - Email, phone
4. `parent-information-barbados.json` - Father and mother names
5. `person-name-simple.json` - Simple name fields
6. `national-identity-adaptive.json` - ID/passport fields
7. `address-adaptive.json` - Flexible address fields

## Available Service Contracts

1. `service-contract-birth-certificate.json` - Full birth certificate application
2. `service-contract-birth-certificate-annotated.json` - With comments
3. `service-contract-birth-certificate-international.json` - International variant

## Troubleshooting

### Pattern not loading

1. Check browser console for fetch errors
2. Verify file exists in `public/patterns/` directory
3. Check environment variable is set correctly
4. Ensure dev server is running

### CORS errors

If testing backend separately, you may need to enable CORS in NestJS:
```typescript
app.enableCors({
  origin: 'http://localhost:3000',
  credentials: true,
});
```

### Cache issues

Clear pattern cache:
```typescript
// Frontend
import { clearPatternCache } from '@/lib/pattern-loader';
clearPatternCache();

// Backend
this.patternFetcherService.clearCache();
```

## Next Steps

Once local testing is complete:

1. Create S3 bucket for patterns
2. Create CloudFront distribution
3. Upload patterns to S3
4. Update environment variables to point to CloudFront URL
5. Deploy frontend and backend with new environment variables

## Production Environment Variables

**Frontend**:
```env
NEXT_PUBLIC_PATTERNS_CDN_URL=https://d1234567890.cloudfront.net/patterns
NEXT_PUBLIC_SERVICE_CONTRACTS_CDN_URL=https://d1234567890.cloudfront.net/service-contracts
```

**Backend**:
```env
PATTERNS_CDN_URL=https://d1234567890.cloudfront.net/patterns
SERVICE_CONTRACTS_CDN_URL=https://d1234567890.cloudfront.net/service-contracts
```

## Benefits of This Approach

1. **Instant Updates**: Change patterns without redeploying apps
2. **Consistency**: Frontend and backend use identical patterns
3. **Caching**: Browser and server cache patterns for performance
4. **Scalability**: CloudFront handles global distribution
5. **Cost**: ~$1/month for typical government form traffic
6. **Testing**: Full local testing before AWS deployment

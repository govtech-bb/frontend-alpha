# Government Directory & Search Implementation Plan

## Overview

Build a hierarchical, Yahoo-style directory of Barbados government content with stub pages and local Python-based semantic search.

## Architecture

### Content Layer
- Hierarchical markdown stubs in `src/content/`
- Organized by user-centric information architecture
- Each stub contains metadata and links to source

### Search Layer
- Python FastAPI server with local embedding model
- FAISS vector index for semantic search
- Runs separately from Next.js app (demo/dev mode)

---

## Phase 1: Content Structure

### 1.1 Information Architecture

```
src/content/
├── services/
│   ├── life-events/
│   │   ├── _index.md (category page)
│   │   ├── register-birth.md
│   │   ├── register-marriage.md
│   │   ├── register-death.md
│   │   └── marriage-licenses.md
│   ├── identity/
│   │   ├── _index.md
│   │   ├── apply-passport.md
│   │   ├── national-registration.md
│   │   └── driver-licence.md
│   ├── business/
│   │   ├── _index.md
│   │   ├── start-business.md
│   │   ├── register-business-name.md
│   │   └── tax-information.md
│   ├── employment/
│   │   ├── _index.md
│   │   ├── job-seekers.md
│   │   └── national-insurance.md
│   └── _index.md (services landing)
│
├── government/
│   ├── ministries/
│   │   ├── _index.md
│   │   ├── health.md
│   │   ├── education.md
│   │   ├── finance.md
│   │   └── [...other ministries]
│   ├── departments/
│   │   ├── _index.md
│   │   ├── immigration.md
│   │   ├── customs.md
│   │   ├── police.md
│   │   └── [...other departments]
│   ├── agencies/
│   │   ├── _index.md
│   │   ├── central-bank.md
│   │   ├── revenue-authority.md
│   │   └── [...other agencies]
│   └── _index.md (government landing)
│
├── about-barbados/
│   ├── history/
│   │   ├── _index.md
│   │   └── history.md
│   ├── national-symbols/
│   │   ├── _index.md
│   │   ├── coat-of-arms.md
│   │   ├── national-anthem.md
│   │   └── flag-etiquette.md
│   ├── visiting/
│   │   ├── _index.md
│   │   ├── getting-around.md
│   │   └── visa-information.md
│   └── _index.md (about landing)
│
└── directory.md (main directory page)
```

### 1.2 Stub Page Format

```yaml
---
title: "Register a Birth"
type: "stub"
category: "services/life-events"
sourceUrl: "https://www.gov.bb/citizens/register-birth"
captureDate: "2025-10-09"
description: "Register births in Barbados within 28 days. Learn who can register, required documents, fees, and where to go based on the district where the child was born."
keywords: ["birth registration", "birth certificate", "newborn", "vital records"]
relatedPages:
  - "services/life-events/register-marriage"
  - "services/identity/national-registration"
---

## This content hasn't been migrated yet

This information is currently available on the [existing gov.bb website](https://www.gov.bb/citizens/register-birth).

We're working to bring all government services to the new alpha.gov.bb platform. In the meantime, you can access this information on the current government website.

### Quick Summary

{{ description }}

### Related Information

- [Register a Marriage](../register-marriage)
- [National Registration](../../identity/national-registration)
```

### 1.3 Category Index Format

```yaml
---
title: "Life Events"
type: "category"
category: "services/life-events"
description: "Government services for major life events including births, marriages, and deaths."
---

## Life Events Services

Essential government services for registering and documenting major life events in Barbados.

### Available Services

- [Register a Birth](./register-birth)
- [Register a Marriage](./register-marriage)
- [Register a Death](./register-death)
- [Marriage Licenses](./marriage-licenses)
```

---

## Phase 2: Python Search Server

### 2.1 Technology Stack

- **FastAPI**: Modern Python web framework
- **sentence-transformers**: Local embedding model
- **FAISS**: Vector similarity search
- **uvicorn**: ASGI server
- **pydantic**: Data validation

### 2.2 Directory Structure

```
search-server/
├── requirements.txt
├── main.py                 # FastAPI app
├── indexer.py              # Content indexing
├── search_engine.py        # Search logic
├── models.py               # Pydantic models
├── config.py               # Configuration
├── data/
│   ├── index.faiss         # Vector index
│   └── metadata.json       # Document metadata
└── README.md
```

### 2.3 Core Components

#### Indexer (`indexer.py`)
```python
# Responsibilities:
- Parse markdown front matter
- Extract searchable content (title, description, keywords)
- Generate embeddings using sentence-transformers
- Build FAISS index
- Store metadata mapping
```

#### Search Engine (`search_engine.py`)
```python
# Responsibilities:
- Load FAISS index
- Embed query using same model
- Perform similarity search
- Rank and filter results
- Return metadata with scores
```

#### API (`main.py`)
```python
# Endpoints:
GET  /api/search?q={query}&limit={n}    # Semantic search
GET  /api/browse/{category}              # Browse by category
POST /api/index/rebuild                  # Rebuild index
GET  /api/index/stats                    # Index statistics
GET  /api/health                         # Health check
```

### 2.4 Embedding Model

Use `all-MiniLM-L6-v2`:
- Lightweight (80MB)
- Fast inference
- Good quality embeddings
- Runs locally without API

---

## Phase 3: Frontend Integration

### 3.1 Homepage Updates

Add "Government Directory" section:

```jsx
<section className="directory-section">
  <Typography variant="h2">Government Directory</Typography>
  <Typography variant="body">
    Browse government services, departments, and information
  </Typography>

  <div className="directory-categories">
    <DirectoryCard
      title="Services"
      description="Life events, business, identity, and more"
      href="/directory/services"
      count={85}
    />
    <DirectoryCard
      title="Government"
      description="Ministries, departments, and agencies"
      href="/directory/government"
      count={180}
    />
    <DirectoryCard
      title="About Barbados"
      description="History, culture, and visitor information"
      href="/directory/about-barbados"
      count={25}
    />
  </div>
</section>
```

### 3.2 Directory Navigation

Create `/app/directory/` route structure:

```
app/
├── directory/
│   ├── page.tsx                    # Main directory
│   ├── services/
│   │   ├── page.tsx                # Services index
│   │   ├── life-events/
│   │   │   ├── page.tsx            # Category page
│   │   │   └── [slug]/
│   │   │       └── page.tsx        # Stub page
│   │   └── [...other categories]
│   ├── government/
│   │   └── [similar structure]
│   └── about-barbados/
│       └── [similar structure]
```

### 3.3 Search Interface (Placeholder)

```jsx
// For demo: Document how to start Python server
// Future: Integrate via API proxy

<div className="search-section">
  <Typography variant="h3">Search Government Information</Typography>
  <Typography variant="body" className="text-gray-600">
    Search is currently available via our local demo server.
    See README for setup instructions.
  </Typography>

  <input
    type="search"
    placeholder="Search government services..."
    className="search-input"
    disabled
  />

  <Typography variant="small">
    Coming soon: Integrated semantic search across all government content
  </Typography>
</div>
```

---

## Phase 4: Content Generation

### 4.1 AI Description Generation

Use scraped content to generate descriptions:

```python
def generate_description(content: str, max_length: int = 200) -> str:
    """
    Generate concise description from scraped content.
    Focus on: what, who, where, when, how
    """
    # Extract key information
    # Summarize in 2-3 sentences
    # Include actionable details
    pass
```

### 4.2 Source URL Mapping

Generate logical URLs based on category:

```python
URL_PATTERNS = {
    "services/life-events": "https://www.gov.bb/citizens/{slug}",
    "services/business": "https://www.gov.bb/business/{slug}",
    "government/ministries": "https://www.gov.bb/ministries/{slug}",
    "government/departments": "https://www.gov.bb/departments/{slug}",
    "government/agencies": "https://www.gov.bb/state-bodies/{slug}",
}
```

### 4.3 Batch Generation Script

```python
# scripts/generate-stubs.py

# 1. Read scraped content from govdotbb
# 2. Classify into IA categories
# 3. Generate descriptions
# 4. Create stub markdown files
# 5. Log any issues or manual review needed
```

---

## Implementation Sequence

### Week 1: Foundation
1. ✅ Create PLAN.md
2. Read existing stub format
3. Analyze scraped content structure
4. Create directory structure
5. Generate first 20 stub pages manually

### Week 2: Search Server
1. Setup Python environment
2. Build indexer
3. Create search API
4. Test with sample content
5. Document usage

### Week 3: Frontend
1. Update homepage
2. Create directory navigation
3. Create category pages
4. Create stub page template
5. Add breadcrumb navigation

### Week 4: Content Generation
1. Build content generation script
2. Generate remaining stubs
3. Review and refine
4. Update search index
5. Final testing

---

## Testing Strategy

### Content Testing
- Verify all stubs have required front matter
- Check broken links
- Validate category structure
- Test breadcrumb navigation

### Search Testing
- Test query variations
- Verify ranking quality
- Check performance with full index
- Test edge cases (empty query, special chars)

### Integration Testing
- Directory navigation flows
- Stub page rendering
- Category browsing
- Search result links

---

## Future Enhancements

### Phase 2 (Future)
- Integrate Python search into Next.js via API proxy
- Add faceted search (filter by category)
- Implement autocomplete
- Add search analytics

### Phase 3 (Future)
- Migrate actual content from stubs
- Add rich content types (forms, videos)
- Implement content versioning
- Add user feedback on stubs

### Phase 4 (Future)
- Production search infrastructure
- Scale to full government content
- Multi-language support
- Advanced search features

---

## Success Metrics

- ✅ 200+ stub pages organized hierarchically
- ✅ Working semantic search with <200ms response time
- ✅ Clear navigation from homepage to any stub
- ✅ All stubs link back to source
- ✅ Search index covers 100% of stubs
- ✅ Documentation for local development

---

## Notes

- Start with representative sample (~50 stubs) before full generation
- Focus on high-traffic services first (births, business, ID)
- Keep descriptions under 200 characters for better UX
- Use consistent naming conventions for slugs
- Document any manual categorization decisions

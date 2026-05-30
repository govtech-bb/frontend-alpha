---
name: ref-invest-barbados
description: Invest Barbados — contacts, statutory basis, mandate, ministry attribution, and start-a-business.md findings (F-086/F-087)
metadata:
  type: reference
---

## Invest Barbados (BIBPC)

**Official name:** Barbados International Business Promotion Corporation (BIBPC), trading as Invest Barbados
**Statutory basis:** Barbados International Business Promotion Corporation Act, CAP 340A (established 10 November 2005; operational 1 October 2006)
**Mandate:** Attract, land, facilitate and sustain international investment for Barbados. Provides "one-stop shop" facilitation services; acts as liaison between foreign investors and government departments.

**Address:** Trident Financial Centre, Hastings, Christ Church, Barbados, BB15156
**Phone:** (246) 626-2000 or (246) 626-2099
**Email:** info@investbarbados.org
**Source:** [gov.bb — State Bodies: Invest Barbados](https://www.gov.bb/State-Bodies/invest-barbados)

## Website access note

investbarbados.org returns HTTP 403 on programmatic fetch (anti-bot/geo-restriction). Both root and subpages are blocked. URL `https://www.investbarbados.org/starting-a-business-in-barbados/` is in Google Search index and appears live for human browsers — manual verification required.

## Ministry attribution

**gov.bb footer on Invest Barbados page** lists MIST (Ministry of Industry, Innovation, Science and Technology) — consistent with current `src/data/ministries.ts` attribution (lines 731–734).

**However**: no gov.bb ministry page explicitly lists Invest Barbados in its associated bodies:
- MIST's own page does not list Invest Barbados
- Ministry of Energy and Business Development does not list Invest Barbados
- Ministry of Finance, Economic Affairs and Investment does not list Invest Barbados

**Current cabinet**: the Minister of Public and Private Investment (Hon. Indar A. Weir, M.P.) holds the investment promotion portfolio, per barbadosparliament.com cabinet listing. This minister's portfolio is not mapped to a specific ministry in ministries.ts.

**Conclusion**: MIST attribution in ministries.ts is partially corroborated but not definitively confirmed. Certainty 50%. Needs agency confirmation.

## Audience note

Invest Barbados's mandate is specifically **international investment promotion**, not domestic business registration. Barbadian residents seeking to register a business should use Business Barbados (caipo.gov.bb) — the `registering-a-business-name` page. The `start-a-business` page does not clarify this distinction.

## Issues filed

- **F-086 (Tier A)**: Remove "Analytical Services" category label from `src/content/start-a-business.md` lines 15–18 — gov.bb metadata artefact visible to citizens
- **F-087 (Tier B)**: Verify Invest Barbados link destination — returns 403 on automated fetch; manual verification needed; clarify domestic vs. international investor audience

See also: [[ref-caipo-business-barbados-rebrand]]

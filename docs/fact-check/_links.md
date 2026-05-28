# External link audit

- **Last checked:** 2026-05-27
- **Scope (Slice 1):** spot-checks of frequently-referenced external URLs found during Phase D. A full sweep of every URL in `src/content/` is scheduled for a later slice.
- **Method:** Direct HTTP fetch of each URL. Status notes whether the URL resolves to a real, on-topic page or returns 404/error.

---

## Status legend

- ✅ **Live** — URL resolves to a working page that matches the linking intent.
- ⚠️ **Live but…** — URL resolves but has a TLS/cert issue, redirect chain, or other concern.
- ❌ **Broken** — URL returns 404 / DNS error / blank.
- ⏳ **Pending** — not yet checked in this slice.

---

## Source URLs declared in `src/data/content-directory.ts`

These are the canonical `source_url` references for each public page.

| Page | source_url | Status |
|---|---|---|
| register-a-death | `https://www.gov.bb/Citizens/register-death` | ✅ Live |
| register-a-marriage | `https://www.gov.bb/Citizens/register-marriage` | ⏳ |
| marriage-licences | `https://www.gov.bb/Citizens/marriage-licence` | ⏳ |
| jobseekers | `https://www.gov.bb/Citizens/job-seekers` | ⏳ |
| ezpay | `https://www.gov.bb/Citizens/ezpay` | ✅ Live |
| tax-online | `https://www.gov.bb/Citizens/tax-online` | ⏳ |
| apply-for-a-passport | `https://www.gov.bb/Citizens/apply-passport` | ✅ Live |
| visa-information | `https://www.gov.bb/Visit-Barbados/visa-information` | ⏳ |
| visitor-permit-application | `https://www.gov.bb/Visit-Barbados/visitorpermitapplication` | ⏳ |
| medical-requirements | `https://www.gov.bb/Visit-Barbados/medical-requirements` | ⏳ |
| apply-for-a-drivers-licence | `https://www.gov.bb/Citizens/driver-licence` | ✅ Live |
| national-registration | `https://www.gov.bb/Citizens/national-registration` | ✅ Live |
| getting-around-barbados | `https://www.gov.bb/Visit-Barbados/getting-around-barbados` | ⏳ |
| local-information | `https://www.gov.bb/Visit-Barbados/local-information` | ⏳ |
| ports-of-entry | `https://www.gov.bb/Visit-Barbados/ports-of-entry` | ⏳ |
| **get-a-document-notarised** | `https://www.gov.bb/Citizens/notarize-document` | **❌ Broken — 404** |
| start-a-business | `https://www.gov.bb/Business/start-business` | ⏳ |
| registering-a-business-name | `https://www.gov.bb/Business/registering-business-name` | ⏳ |
| business-policies-and-law | `https://www.gov.bb/Business/policies-laws` | ⏳ |
| financial-services-for-businesses | `https://www.gov.bb/State-Bodies/financial-services-commission` | ⏳ |
| government-requirements | `https://www.gov.bb/Business/government-requirements` | ⏳ |
| information-about-business-tax | `https://www.gov.bb/tax-information` | ⏳ |

**Action for the broken one:** update `src/data/content-directory.ts` line 431 to a working authoritative URL, e.g. `https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates`.

---

## In-body external links (sampled)

URLs found in markdown content body. Spot-checks below; full sweep pending.

### Verified live

- ✅ `http://www.immigration.gov.bb/` — `apply-for-a-passport.md` line 13
- ✅ `https://immigration.gov.bb/pages/passport.aspx` — referenced in fact-check sources
- ✅ `https://www.barbadoslawcourts.gov.bb/...` (Notarizing Documents page) — referenced in fact-check sources
- ✅ `https://liquorlicence.gov.bb/` — `loud-music-permit.md` line 11
- ✅ `https://bla.gov.bb` — `apply-for-a-drivers-licence.md` line 61 (verified by inference; site is live)
- ✅ `https://caipo.gov.bb/` — `registering-a-business-name.md` line 13

### Live but with concerns

- ⚠️ `https://publicentertainment.bra.gov.bb/` — `loud-music-permit.md` line 45. **TLS certificate validation error** ("unable to verify the first certificate"). The site may still be operational in some browsers but the cert issue is a citizen-trust concern. **Action:** flag for BRA's IT team; this is a real defect on the third-party site.

### Pending verification

The following URLs appear in content body and have not yet been HEAD-checked:

- `https://coscap.org/tariffs` — `loud-music-permit.md` line 13
- `https://bra.gov.bb/` — `loud-music-permit.md` line 23
- `https://forms.gov.bb/CertificateOfCharacter` — referenced from 4 pages
- `https://barbados.seamlessdocs.com/f/pvyf07u3v0j2` — `apply-for-a-position-as-a-temporary-teacher.md` line 27 (third-party SaaS form)
- `https://forms.office.com/Pages/ResponsePage.aspx?id=...` — `apply-financial-assistance.md` line 55 (Microsoft Forms)
- `https://portal.bra.gov.bb/VisitorPermit` — `visitor-permit-application.md` line 11, 18
- `https://bb.surepaybillsonline.com/cc` — `visitor-permit-application.md` line 48
- `https://www.gov.bb/media_files/PostOffice_RedirNotice.pdf` — referenced from 3 post-office redirection pages
- `https://www.gov.bb/media_files/Visitor_Permit_Application.pdf` — `visitor-permit-application.md` line 53
- `https://www.investbarbados.org/starting-a-business-in-barbados/` — `start-a-business.md` line 13
- `http://www.fsc.gov.bb/` — `financial-services-for-businesses.md` line 30 (uses `http://`, not HTTPS — flag for upgrade)
- `https://tamis.bra.gov.bb/` — `tax-online.md` line 22
- ✅ `https://www.ezpay.gov.bb` — `ezpay.md` line 17. Portal live; internal title shows "EZ123" (possible unreleased rebrand — gov.bb public pages still say "EZpay+").
- ✅ `https://www.ezpay.gov.bb/login.php` — `ezpay.md` line 37. URL resolves and returns login form. Canonical form indexed by search engines is `/login` (no `.php`); consider updating.
- `http://www.transportboard.com/route-finder/` — `getting-around-barbados.md` line 25 (third-party `.com`; check it's still authoritative)
- `https://nis.gov.bb/severance/` — `calculate-severance-pay/index.md` line 9
- `https://youthaffairs.gov.bb/programme-channels/youth-development-programme/` — `register-for-community-sports-training-programme/index.md` line 46
- `https://labour.gov.bb/` — `business-policies-and-law.md` line 15 and others
- `https://labour.gov.bb/jobstartplus/` — `apply-to-jobstart-plus-programme/index.md` line 9
- `https://labour.gov.bb/employment-services/one-stop-resource-centre/` — `jobseekers.md` line 13
- `https://labour.gov.bb/employment-services/overseas-employment-programmes/` — `jobseekers.md` line 14
- `https://mps.gov.bb/People_Resourcing/` and `https://mps.gov.bb` — `jobseekers.md` line 36, ministry pages
- `https://www.economicaffairs.gov.bb` — ministry page
- `https://energy.gov.bb` and many social-media links in `ministries/ministry-of-energy-and-business-development.md`
- `https://biodiversity.gov.bb/`, `http://www.nhdbdos.com/`, `https://solid.gov.bb/`, `http://www.weplantin.org/` — environment ministry page
- `http://www.barbadosport.com/`, `http://www.gaia.bb/`, `http://www.portstcharles.com/` — `ports-of-entry.md`
- `https://governmentprintery.gov.bb/gazette/` — `justice-of-the-peace.md` line 75
- `https://alpha.gov.bb/terms-conditions` — internal but uses absolute URL; should ideally be a relative link

---

## URLs explicitly using HTTP instead of HTTPS

These should be reviewed for upgrade to HTTPS where possible:

- `http://www.immigration.gov.bb/` (and child `/documents/*.pdf` paths) — `apply-for-a-passport.md` lines 13, 15, 18, 21, 22
- `http://www.fsc.gov.bb/` — `financial-services-for-businesses.md` line 30
- `http://www.barbadosport.com/`, `http://www.gaia.bb/`, `http://www.portstcharles.com/` — `ports-of-entry.md`
- `http://www.transportboard.com/route-finder/` — `getting-around-barbados.md` line 25
- `http://twitter.com/BarbadosGreen` — `ministries/ministry-of-environment-and-national-beautification.md` line 179
- `http://www.weplantin.org/` — `ministries/ministry-of-environment-and-national-beautification.md` line 202
- `http://www.nhdbdos.com/` — `ministries/ministry-of-environment-and-national-beautification.md` line 119

Many `gov.bb` subdomains do redirect HTTP → HTTPS but it's worth using HTTPS in source content to avoid mixed-content warnings.

---

## Next steps for a full link sweep

1. Write a small script (Node or `lychee`) that walks every URL referenced anywhere under `src/content/` and `src/data/*.{ts,json}`.
2. For each: HEAD request, follow redirects (max 3), record final status + final URL + redirect chain.
3. Emit a CSV or markdown table; flag every `404`, every TLS cert error, every `http://` that doesn't auto-redirect to HTTPS.
4. Each broken/concerning URL gets a fact-check entry in its source page's `docs/fact-check/<slug>.md`.

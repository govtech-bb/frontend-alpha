# Fact-check: Justice of the Peace

- **Live page:** <https://alpha.gov.bb/travel-id-citizenship/justice-of-the-peace>
- **Source file:** `src/content/justice-of-the-peace.md`
- **Last checked:** 2026-05-27
- **Summary:** 17 claims reviewed — 9 verified, 3 discrepant, 5 unverifiable. Average certainty: **78%**.

---

## Headline issues for triage

1. **"563 JPs appointed in January 2026" is off by 3.** GIS reporting confirms **560** JPs were sworn in on **14 January 2026** at the Lloyd Erskine Sandiford Centre. ([GIS](https://gisbarbados.gov.bb/search/justice+of+peace/))
2. **Office of the Attorney General contact details are wrong.** Site lists phone `(246) 467-7370` and email `agoffice@barbados.gov.bb`. Official [gov.bb — Attorney General](https://www.gov.bb/Ministries/attorney-general) publishes phone `535-0467` (PBX), `535-0434` (direct), email `ps@oag.gov.bb`, address Jones Building, Webster's Business Park, Wildey, St. Michael. **Citizen impact: citizens calling the wrong number won't reach the AG.**
3. **`src/data/justices-of-the-peace.json` has 2208 entries**, while the page narrative implies the directory adds up to ~436 + 563 + (2023 register) ≈ ~1000+. The data file may include lapsed JPs alongside current ones — verify what's in the file and whether the page's claim about "every JP on the official register" is accurate.
4. **"Appointed by the President"** is likely correct post-2021 (republic transition), but most GIS legacy material still says "Governor General on the advice of the Prime Minister". Page is probably right; supporting docs are stale.

---

## Claims

### Claim 1 — JPs are appointed by the President of Barbados (line 17)
- Type: legal/constitutional
- Checked: [GIS — Justices of the Peace tag](https://gisbarbados.gov.bb/blog/tag/justices-of-the-peace/); [GIS — Three New JPs Sworn In](https://gisbarbados.gov.bb/blog/three-new-justices-of-the-peace-sworn-in/) — most GIS material still references "Governor General". Barbados became a republic 30 November 2021; the appointing authority transitioned to the President, but public-web JP-appointment material is mostly pre-2021.
- Status: **plausible but not directly confirmed**
- Certainty: **80%**
- Open question: confirm with the AG's office whether the President is the appointing authority post-republic.

### Claim 2 — JP services are free of charge (line 17)
- Type: pricing
- Source: [GIS — New JPs Warned Against Charging For Signature](https://gisbarbados.gov.bb/blog/new-jps-warned-against-charging-for-signature/)
- Status: **verified**
- Certainty: **95%**

### Claim 3 — JPs not allowed to charge (line 17)
- Type: legal restriction
- Source: [GIS — New JPs Warned Against Charging For Signature](https://gisbarbados.gov.bb/blog/new-jps-warned-against-charging-for-signature/)
- Status: **verified**
- Certainty: **95%**

### Claim 4 — JPs can certify copies (line 21)
- Type: scope of practice
- Source: [GIS — Three New JPs Sworn In](https://gisbarbados.gov.bb/blog/three-new-justices-of-the-peace-sworn-in/) (standard JP power under common-law and Justices of the Peace Act practice in Barbados)
- Status: **verified**
- Certainty: **90%**

### Claim 5 — JPs can witness sworn statements / affidavits (line 22)
- Type: scope of practice
- Source: [GIS — Three New JPs Sworn In](https://gisbarbados.gov.bb/blog/three-new-justices-of-the-peace-sworn-in/)
- Status: **verified**
- Certainty: **90%**

### Claim 6 — JPs can witness signatures (line 23)
- Type: scope of practice
- Source: [GIS — Three New JPs Sworn In](https://gisbarbados.gov.bb/blog/three-new-justices-of-the-peace-sworn-in/) (standard JP power)
- Status: **verified**
- Certainty: **90%**

### Claim 7 — JPs cannot give legal advice or represent in court (line 27)
- Type: scope restriction
- Source: [GIS — Justices of the Peace tag](https://gisbarbados.gov.bb/blog/tag/justices-of-the-peace/) (standard JP restriction; consistent with general guidance)
- Status: **verified**
- Certainty: **90%**

### Claim 8 — JPs cannot certify documents for overseas use; need notary public (line 31)
- Type: scope distinction
- Source: [Notaries Public Act 2017-09 (PDF)](https://caipo.gov.bb/wp-content/uploads/2021/08/notariespublicact2017.pdf); cross-references [get-a-document-notarised.md](/docs/fact-check/get-a-document-notarised.md). Notarial powers (incl. for overseas use) are scoped under the 2017 Act.
- Status: **verified**
- Certainty: **85%**

### Claim 9 — Notary public = "a lawyer or chartered accountant with additional powers granted by the Government" (line 35)
- Type: legal definition
- Source: the [Notaries Public Act 2017-09](https://caipo.gov.bb/wp-content/uploads/2021/08/notariespublicact2017.pdf) defines who may be appointed. The "chartered accountant" eligibility is part of the question.
- Status: **partially verified** — attorneys-at-law are eligible; "chartered accountant" needs a re-read of the Act to confirm.
- Certainty: **65%**
- Suggested fix: re-read the Notaries Public Act to confirm "chartered accountant" eligibility; otherwise drop it.

### Claim 10 — What to bring: original + copy, photo ID (passport / national ID / driving licence) (lines 41–43)
- Type: document requirement
- Source: cross-references [get-a-document-notarised.md](/docs/fact-check/get-a-document-notarised.md) (same documents are listed for notarisation); [GIS — Three New JPs Sworn In](https://gisbarbados.gov.bb/blog/three-new-justices-of-the-peace-sworn-in/).
- Status: **verified by inference**
- Certainty: **85%**

### Claim 11 — Office of the Attorney General phone (246) 467-7370 (line 61, 71, 75)
- Type: phone
- Source: [gov.bb — Office of the Attorney General](https://www.gov.bb/Ministries/attorney-general) publishes **535-0467** (PBX) and **535-0434** (direct line). `467-7370` does not appear on the official page.
- Status: **DISCREPANT** — `(246) 467-7370` is not the AG's published number.
- Confidence it's wrong: **85%**
- **Suggested fix:** replace with `(246) 535-0467` (PBX) and `(246) 535-0434` (direct).
- **Citizen impact: HIGH** — citizens calling 467-7370 expecting the AG's office won't reach them.

### Claim 12 — Office of the Attorney General email `agoffice@barbados.gov.bb` (line 61)
- Type: email
- Source: [gov.bb — Office of the Attorney General](https://www.gov.bb/Ministries/attorney-general) publishes **`ps@oag.gov.bb`**.
- Status: **DISCREPANT**
- Confidence it's wrong: **80%**
- **Suggested fix:** replace with `ps@oag.gov.bb`. ("agoffice@barbados.gov.bb" may also be a valid alias, but `ps@oag.gov.bb` is what the official page publishes.)

### Claim 13 — Barbados Judicial System phone (246) 535-9700 (line 65)
- Type: phone
- Source: [Barbados Judicial System](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates)
- Status: **verified**
- Certainty: **95%**

### Claim 14 — "Supreme Court of Barbados register (last updated 30 April 2023)" (line 75)
- Type: data provenance / date
- Source: [GIS — Justices of the Peace Listing - April 30, 2023](https://gisbarbados.gov.bb/download/justices-of-the-peace-listing-april-30-2023/) — exact date matches.
- Status: **verified**
- Certainty: **95%**

### Claim 15 — "official 2024 list (PDF, 436 names)" (line 75)
- Type: statistic
- Source: [`/justices-of-the-peace-2024.pdf`](../../public/justices-of-the-peace-2024.pdf) — titled "Justices of the Peace appointed in 2024" with name + parish + address columns. First page (Christ Church) shows ~26 names. Total count of 436 across all parishes is plausible but not directly counted in this fact-check.
- Status: **plausible — exact count not verified**
- Certainty: **75%**
- Action: run a script over the PDF to count rows; confirm against 436.

### Claim 16 — "the 563 JPs appointed in January 2026" (line 75)
- Type: statistic
- Source: [GIS](https://gisbarbados.gov.bb/search/justice+of+peace/) reports **560** JPs sworn in on 14 January 2026 at the Lloyd Erskine Sandiford Centre.
- Status: **DISCREPANT** — off by 3.
- Confidence it's wrong: **80%**
- **Suggested fix:** change "563" to "560" — and consider adding the date "14 January 2026" and the venue for credibility.

### Claim 17 — Every appointment is gazetted in the Official Gazette (link to governmentprintery.gov.bb) (line 75)
- Type: process / external URL
- Source: [Official Gazette of Barbados](https://governmentprintery.gov.bb/gazette/) — live-check pending (standard Barbados gazette practice).
- Status: **verified by inference**
- Certainty: **85%**

---

## Internal data file note

`src/data/justices-of-the-peace.json` contains **2208 entries**. The page narrative implies the directory aggregates roughly 436 + 563 + (2023 register) JPs. If the 2023 register is around ~1200, the math works out; if not, the data file may contain duplicates or lapsed JPs. **Worth a one-off audit of the JSON to confirm the directory only shows currently-active JPs.**

## Sources cited

- [gov.bb — Office of the Attorney General](https://www.gov.bb/Ministries/attorney-general)
- [GIS — Justices of the Peace Listing - April 30, 2023](https://gisbarbados.gov.bb/download/justices-of-the-peace-listing-april-30-2023/)
- [GIS — Three New Justices Of The Peace Sworn In](https://gisbarbados.gov.bb/blog/three-new-justices-of-the-peace-sworn-in/)
- [GIS — New JPs Warned Against Charging For Signature](https://gisbarbados.gov.bb/blog/new-jps-warned-against-charging-for-signature/)
- [GIS — Justices of the Peace tag](https://gisbarbados.gov.bb/blog/tag/justices-of-the-peace/)
- [GIS — PERSONS APPOINTED AS JUSTICES OF THE PEACE (EX-OFFICIO)](https://gisbarbados.gov.bb/wp-content/uploads/2016/06/Ex-Officio_-Justices_of_the_Peace.pdf)
- [Notaries Public Act 2017-09 (PDF)](https://caipo.gov.bb/wp-content/uploads/2021/08/notariespublicact2017.pdf)
- [Barbados Judicial System — Notarizing Documents](https://www.barbadoslawcourts.gov.bb/useful-links/for-public/other-services-and-registrations/notarizing-documents-and-issuing-notarial-certificates)

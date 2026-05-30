---
name: ref-bra-public-entertainment-tls
description: publicentertainment.bra.gov.bb has had a persistent TLS certificate error since at least 2026-05-27. Both the root URL and /Help return "unable to verify the first certificate". Flagged as F-018.
metadata:
  type: reference
---

The BRA Public Entertainment portal at https://publicentertainment.bra.gov.bb/ returns a TLS certificate validation error ("unable to verify the first certificate") when fetched programmatically. Both the root URL and the /Help sub-page are affected.

- First confirmed failing: 2026-05-27 (Phase C, flagged F-018)
- Still failing: 2026-05-28 (Phase D re-check)
- Impact: citizens following the annual-permit link will receive a browser security warning and most will abandon the application

The BRA main site (bra.gov.bb) is unaffected and confirms the portal URL is correct.

Note: The annual Place of Public Entertainment licence renews on or before January 31 each year — the underlying process is real; only the portal link is broken/unsafe.

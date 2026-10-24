# sbs-sample

Fictional sample repository for testing theUmbrella's Secure Build Standard™ (SBS) portal: the GitHub connection, the
scanners, and the reviewer's confirm and reject flow. **No real code, data or credentials.** It is never run or
deployed. Every value that looks like a secret is random and opens nothing.

## Deliberate test issues

Each file below contains a harmless, deliberate issue, so every part of the pipeline has something to show. The
expected results were checked with the SBS runner (static stage, `static-0.4`) on 2026-10-24: 14 files, 15 draft findings,
and one entry on the reviewer's list of checks with no SBS rule.

| File | Issue | Reported by | SBS rule |
| --- | --- | --- | --- |
| `.env` | environment file committed | SBS checks | SBS-S01 |
| `src/config.js` | hard-coded API key (random, fictional) | Gitleaks | SBS-S01 |
| `package-lock.json` | `lodash` 4.17.20 and `express` 4.17.1 with published advisories | OSV-Scanner | SBS-S04 |
| `src/server.js` | CORS open to every origin with credentials | Semgrep (SBS rules) | SBS-D03 |
| `src/server.js` | SQL built from the request | Semgrep (SBS rules) | SBS-D06 |
| `src/server.js` | session cookie without HttpOnly or Secure | Semgrep (SBS rules) | SBS-A03 |
| `src/server.js` | TLS certificate verification switched off | Semgrep (SBS rules) | SBS-E03 |
| `src/server.js` | stack trace sent to the client | Semgrep (SBS rules) | SBS-S05 |
| `Dockerfile` | base image `latest`, runs as root, no health check | Checkov | SBS-S04 and others |
| `worker/requirements.txt` | `brotli` 1.2.0, below the Brotli decoder fix (CVE-2026-111497) | SBS checks (Threat Watch floor) | SBS-S04 |
| `worker/requirements.txt` | `pip` 26.2.1, whose bundled certifi still trusts the compromised emSign CAs | SBS checks (Threat Watch floor) | SBS-S04 |
| `.nvmrc` | Node.js 22.12.0, below the Brotli decoder fix (22.23.4) | SBS checks (Threat Watch floor) | SBS-S04 |
| `worker/decode.py` | Brotli data from a request decompressed | Semgrep (SBS rules) | SBS-S04 |
| `worker/sample_hook.pth` | a `.pth` line that runs when Python starts (it does nothing) | SBS checks (Threat Watch) | SBS-S04 |
| `.github/workflows/release.yml` | `npm publish` with a stored registry token instead of trusted publishing; never runs (manual trigger, job switched off) | SBS checks: the reviewer's list, not the report (no SBS 1.0 rule; proposed SBS-S06) | none yet |
| `src/server.js` | `/api/orders/:id` has no login or record-level check | **no scanner**: the reviewer adds it by hand | SBS-D02 |

ClamAV scans everything and should find nothing: a malware test file would make the runner refuse the whole
repository, which is tested separately.

Suggested review practice: confirm the real issues, and reject at least one (for example the lower-rated `express`
advisories, if the reviewer judges them not to apply), so both paths are exercised.

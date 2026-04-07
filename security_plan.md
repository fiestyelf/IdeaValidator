# Security Hardening Plan: IdeaValidator SaaS

As per the **Security Developer** role defined in `SECURITY.md`, I have performed an initial security audit and implementation. The following plan outlines the next steps to harden the repository for production-ready SaaS deployment.

## 1. Accomplished So Far
- [x] **Varlock Implementation**: Installed and configured Varlock (`v0.6.3`) for secure-by-default environment management.
- [x] **.env.schema Update**: Refined the schema to strictly enforce type-safe and sensitive-masked keys.
- [x] **Dependency Audit**: Verified `0 vulnerabilities` in the current dependency tree.
- [x] **CI/CD Hardening**: Created `.github/workflows/security.yml` with CodeQL SAST and Varlock validation.
- [x] **Skill Integration**: Created the `security-developer` system skill to provide ongoing security oversight.

## 2. Identified Vulnerabilities (High Priority)
### 🚨 Critical: Direct Browser API Access (`src/api/claude.js`)
The `anthropic-dangerous-direct-browser-access` flag is active. This exposes the `VITE_ANTHROPIC_API_KEY` to the client-side browser, which is a major security risk for a production SaaS.

**Mitigation Plan**:
1. Implement a server-side proxy (e.g., Express or Supabase Edge Functions).
2. Move the `analyzeIdea` logic to the proxy server.
3. Update the frontend to call the internal endpoint using secure session tokens.

## 3. Deployment Hardening Tasks
- [ ] **Secret Rotation**: Rotate the current `sk-or-v1-` key as it has been exposed in the client code.
- [ ] **Subresource Integrity (SRI)**: Add SRI hashes to external scripts and styles in `index.html`.
- [ ] **Security Headers**: Implement `Content-Security-Policy` (CSP) and HSTS.
- [ ] **Environment Logic**: Add a "staging" environment to test security controls before production.

## 4. Proposed Logic for Secure API Proxy
If you approve, I will refactor `src/api/claude.js` to use a backend proxy. This will:
- Protect your API keys (Anthropic/OpenRouter).
- Enable rate limiting on your own server.
- Prevent client-side token abuse.

---
**Verdict**: The current setup is a great prototype, but the direct browser access must be removed before production.

**Next Step**: Should I proceed with the backend proxy implementation (Vite proxy for local, Express/Supabase for prod)?

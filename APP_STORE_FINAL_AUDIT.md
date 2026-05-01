# Sacred Path for Couples — App Store Final Audit
Date: April 30, 2026  
Repo: `/Users/mathieuescande/Documents/GitHub/sacredpath-mainstream`

## Executive Summary
This pass focused on submission-critical stability, premium gating consistency, routing integrity, legal/privacy accessibility, and Oracle functional readiness.

### Critical fixes completed
- Added real legal/support pages and routes (`/terms`, `/privacy`, `/support`) to remove dead paywall links.
- Updated Paywall legal/support actions to route in-app (no blank external pages).
- Hid premium test toggle behind explicit env flag (`VITE_ENABLE_DEV_PREMIUM_TOGGLE === "true"`) to reduce accidental production unlock UI.
- Kept premium state default `false` and centralized via `src/lib/premium.ts`.
- Enforced Oracle question-required flow with suggestion modal for empty prompt.
- Confirmed no Apple Pay wording for digital subscription CTA.

---

## 1) Build & Technical Stability

### Commands run
- `npm install` ✅
- `npm run build` ✅
- `npm run validate:rituals` ✅ PASS
- `npm run audit:buttons` ✅ (script runs; heuristic false positives noted)
- `npm run lint` ❌ (repo missing ESLint flat config for ESLint v10)

### Build status
- Vite production build passes.
- No TypeScript/Vite blockers found in this pass.

### Known technical blocker (non-runtime)
- Lint is currently blocked by missing `eslint.config.js` after ESLint v10 upgrade.
- This does **not** block runtime/build but should be resolved before CI policy-gated release.

---

## 2) App Store Readiness (Apple Review Risk)

### Fixed
- Legal links from paywall now resolve to real pages.
- Support route added and accessible.
- Subscription path remains in-app and does not route to external payment URLs.
- Premium test toggle hidden unless explicit dev env flag is enabled.

### Risks still requiring manual verification
- Real StoreKit/RevenueCat native bridge is still required for production iOS purchase/restore execution.
- Production web builds now show explicit unavailable state instead of fake purchase/restore success.
- Final legal text should be reviewed by legal counsel.

---

## 3) Subscription / Premium Gating Audit

### Current behavior
- Premium storage key: `sacredpath-premium` (localStorage).
- Default premium state: `false`.
- Free users:
  - get meaningful value on Home + Weather + Oracle sample + rituals starter paths.
  - see subscription CTAs.
- Premium users:
  - get expanded content tools.
  - do not receive aggressive repeated paywall blocks in major flow.

### CTA wording
- Global `SubscribeButton` CTA text remains:
  - **“Subscribe to upgrade your intimate life”**

### Observations
- Oracle free flow now blocks empty prompt and provides suggestion modal.
- Oracle premium tools are functional (start ritual, voice route, share, save).

---

## 4) Navigation / Routing Matrix (Main Flows)

| Source | CTA / Control | Expected | Result | Fixed |
|---|---|---|---|---|
| Home | Check our weather | `/weather` | Works | Yes |
| Home | Ask the Intimacy Oracle | `/oracle` | Works | Yes |
| Home | Browse rituals | `/rituals` | Works | Yes |
| Home (complete) | Open tonight’s ritual | `/ritual` | Works | Yes |
| Home (complete) | Update our weather | local stage reset | Works | Yes |
| Weather | Now sense partner weather | stage transition | Works | Yes |
| Weather | Reveal ritual path | `/ritual` | Works | Yes |
| Ritual | Go deeper | `/deeper` | Works | Yes |
| Ritual | More rituals for two | `/rituals` | Works | Yes |
| Rituals | Free ritual card expand | inline details | Works | Yes |
| Rituals | Locked teaser subscribe | `/paywall?source=rituals` | Works | Yes |
| Oracle | Reveal Our Path | card reveal | Works | Yes |
| Oracle | Empty question reveal | suggestion modal | Works | Yes |
| Oracle (premium) | Listen with Sacred Voice | `/voice` | Works | Yes |
| Oracle (premium) | Share with Partner | native share/clipboard | Works | Yes |
| Oracle (premium) | Save to Our Journey | local save | Works | Yes |
| Journey | Open shared dashboard | panel toggle | Works | Yes |
| Journey | WA your beloved one | WA deep link | Works | Yes |
| Paywall | Subscribe | dev purchase mode | Works (dev) | Yes |
| Paywall | Restore purchases | placeholder message | Works (placeholder) | Partial |
| Paywall | Terms of Use | `/terms` | Works | Yes |
| Paywall | Privacy Policy | `/privacy` | Works | Yes |
| Paywall | Support | `/support` | Works | Yes |
| Connect | Copy invite link | clipboard | Works | Yes |
| Connect | Continue as couple | `/weather` | Works | Yes |

---

## 5) Intimacy Weather Logic Audit

### Verified
- Weather selections drive Tonight Path resolution.
- Weather flow updates state and routes to ritual outcome.
- Weather labels are mainstream-friendly in most user-visible areas.

### Remaining risk
- Weather naming consistency (`Sunny` vs `Hot`) appears mixed by context. Functional but should be normalized in one future cleanup pass.

---

## 6) Ritual Library Audit

### Validation run
- `npm run validate:rituals` → PASS.
- Current library count reported by script:
  - Total: 204
  - Free: 23
  - Premium: 181

### Notes
- Validation indicates content repetition clusters still exist (subtitles/opening steps/closings). This is quality risk for retention, not a hard submission blocker if experience remains coherent.
- No build/runtime break from ritual data rendering in this pass.

---

## 7) Sacred Voice / Audio / TTS Audit

### Verified
- Voice route exists and page loads.
- Guided mode controls present.
- Backend + fallback architecture exists.

### Remaining production risk
- Actual production TTS provider reliability depends on deployed backend function/env.
- Store review note should explain premium voice behavior if reviewer cannot trigger full path without purchase sandbox.

---

## 8) Intimacy Oracle Audit

### Implemented / verified
- Oracle route exists and is active.
- User can type a relationship question.
- Empty prompt is blocked with suggestion modal.
- Reveal path returns symbolic card + interpretation + practical action.
- Free users get single useful layer.
- Premium users get full continuation tools.
- Oracle framed as guidance/reflection (not deterministic fortune telling).

---

## 9) Journey Audit

### Verified
- Journey route exists.
- Shared dashboard toggle works.
- Favorite ritual placeholders and user memory tools are present.
- Photo/date/note actions are interactive.

### Risk
- Cross-device photo sync is local-only unless backend sync is added.

---

## 10) Mobile UX / Layout Audit

### Verified
- Sticky bottom nav present across primary pages.
- Main pages are readable with card-based mobile layout.

### Risk
- Bottom-fixed nav overlap was previously reported; current layout uses heavy bottom padding reserve. Manual device check still required on iPhone safe-area edges.

---

## 11) Content Safety / Age-Rating Risk

### Verified
- Primary surfaces are relationship-safe, consent-forward, non-pornographic.
- Oracle guidance avoids certainty/diagnosis framing.

### Recommendation
- Keep explicit/intense content behind premium/contextual flows and continue consent language.

---

## 12) Privacy / Data / Partner Sharing

### Current model
- localStorage stores session/premium and some journey/oracle entries.
- share actions are user-initiated.

### Risks to document in App Store Connect
- Final privacy nutrition labels must reflect any backend logging/analytics and whether data is linked/tracked.
- If account sync is added, update deletion/data rights flows.

---

## 13) Legal / Policy Link Status

### Added routes
- `/terms`
- `/privacy`
- `/support`

These now prevent dead legal/support CTAs from paywall.

---

## 14) Accessibility Snapshot

### Improved
- Name inputs on Home now have `aria-label` + placeholders.

### Remaining
- Full accessibility audit (focus trap for modal, keyboard route pass, contrast tooling) still recommended before release.

---

## 15) Performance Snapshot

### Build output
- JS bundle ~475 kB pre-gzip main chunk.
- No build blocker warnings beyond Vite CJS deprecation notice.

### Recommendation
- Future optimization: route-level code splitting for heavy pages (non-blocking for this release pass).

---

## App Store Connect Manual Checklist

- **App Name:** Sacred Path for Couples
- **Subtitle suggestion:** Daily rituals for deeper connection
- **Category suggestion:** Lifestyle (or Health & Fitness if strategic)
- **Age rating:** 17+ recommended due intimacy/adult relationship themes
- **Privacy Policy required:** Yes
- **Terms/EULA required:** Yes
- **Support URL required:** Yes
- **IAP products to verify:** Annual premium subscription product ID(s)
- **Subscription group:** Verify configured and active
- **Restore purchases:** Must be wired to real restore flow before production
- **Manage subscription guidance:** Add/verify user-facing help text
- **Review notes for Apple:**
  - Explain free vs premium paths
  - Explain Oracle as reflection guidance (not fortune telling)
  - Explain voice requires backend function and premium state
- **Demo account needed:** No (if no auth wall)
- **Reviewer access to paid features:** via sandbox purchase flow instructions
- **Privacy nutrition labels:** verify local storage, backend calls, sharing behavior
- **Screenshots required:** Home, Weather, Ritual, Oracle, Journey, Paywall
- **Marketing URL:** verify if required by release setup
- **Copyright:** set in App Store Connect

---

## Release Testing Matrix

### A) Free user path
- Open app -> Home value within 30s ✅
- Weather selection -> ritual outcome ✅
- Oracle question -> one useful answer ✅
- Premium CTA -> paywall ✅
- Back navigation works ✅

### B) Premium user path
- Premium true state unlocks deeper paths ✅
- Ritual library expanded access ✅
- Oracle premium tools visible ✅
- Premium CTA reduced/hidden in premium contexts ✅

### C) Partner connected path
- Basic partner naming/state persists locally ✅
- Full cross-device partner sync not fully validated ⚠️

### D) Mobile UX path
- Key screens responsive ✅
- Sticky nav safe-area overlap requires manual iPhone spot-check ⚠️

### E) Apple reviewer path
- Main features discoverable ✅
- Legal/support pages accessible ✅
- Real IAP/restore integration still pending ⚠️

---

## Files Changed In This Audit Pass
- `src/pages/AppHome.tsx`
- `src/pages/Oracle.tsx`
- `src/pages/Paywall.tsx`
- `src/main.tsx`
- `src/pages/Terms.tsx` (new)
- `src/pages/Privacy.tsx` (new)
- `src/pages/Support.tsx` (new)
- `APP_STORE_FINAL_AUDIT.md` (new)

---

## Final Status
- Build passes: ✅
- Main navigation CTAs checked: ✅
- Premium gating checked: ✅
- No major blank/dead production pages in core flow: ✅
- Remaining release blockers before submission:
  1. Native StoreKit/RevenueCat bridge wiring and App Store product/offering verification
  2. Final legal text and App Store metadata verification

---

## Release Blocker Closure — IAP Architecture Found

- **Current app shell/framework:** React + TypeScript + Vite web app (`react-router-dom`).
- **Purchase library status:** No native StoreKit/RevenueCat SDK integration detected in this repo yet.
- **Current premium state source:** localStorage key `sacredpath-premium` via `src/lib/premium.ts`.
- **Dev unlock status:** Exists for testing; now gated behind development-only checks and explicit flag pathways.
- **Product IDs found/missing:** No previously wired production product IDs found; added constants for review:
  - `com.sacredpathforcouples.premium.monthly`
  - `com.sacredpathforcouples.premium.yearly`
  (must be verified against App Store Connect before submission)
- **Entitlement ID found/missing:** No enforced runtime entitlement before; now centralized as `premium` in `src/lib/entitlements.ts`.
- **Recommended final integration path:** Add native RevenueCat bridge (or StoreKit entitlement bridge) and map:
  - purchase -> entitlement activation
  - restore -> entitlement refresh
  - startup refresh -> source of truth for premium UI

## Dev Unlock Hardening

- Dev unlock is now isolated and blocked from production unlock behavior.
- Local premium mutation helpers in `src/lib/premium.ts` only write when dev conditions are met.
- Purchase/restore in `src/lib/entitlements.ts`:
  - use bridge when available
  - allow temporary test unlock only in dev/test contexts
  - return explicit “unavailable” state in production web builds without native IAP bridge
- Production purchase CTA no longer hardcodes localStorage premium unlock path.

## Final Command Results (This Closure Pass)

- `npm install`: ✅ success
- `npm run lint`: ✅ success
- `npm run build`: ✅ success

## Manual App Store Connect Checklist — Final

### IAP / Subscription
- [ ] Subscription group created in App Store Connect.
- [ ] Monthly product ID verified.
- [ ] Yearly product ID verified.
- [ ] Product IDs exactly match code constants.
- [ ] Products attached to RevenueCat offering if RevenueCat used.
- [ ] RevenueCat entitlement ID exactly matches code.
- [ ] RevenueCat offering identifier verified.
- [ ] Subscription pricing approved.
- [ ] Subscription localization reviewed.
- [ ] Subscription screenshot added if required.
- [ ] IAP/subscriptions submitted with app version for review.

### Reviewer Notes
- [ ] Explain how reviewer reaches paywall.
- [ ] Explain how reviewer accesses premium features.
- [ ] Explain Sacred Voice feature.
- [ ] Explain Intimacy Oracle feature as guided reflection, not prediction.
- [ ] Provide test account if account/partner connection is required.
- [ ] Provide sandbox IAP instructions if needed.
- [ ] Explain that premium unlocks full ritual library, Sacred Voice, Oracle, and Journey.

### Legal
- [ ] Privacy Policy URL final.
- [ ] Terms of Use / EULA URL final.
- [ ] Support URL final.
- [ ] Legal text reviewed.
- [ ] Subscription cancellation/restore wording reviewed.

### Privacy Nutrition Labels
- [ ] Partner name / profile data assessed.
- [ ] Relationship/intimacy preferences assessed.
- [ ] Reflection/journal data assessed.
- [ ] Purchase data assessed.
- [ ] User ID / device ID assessed.
- [ ] Analytics assessed.
- [ ] Crash diagnostics assessed.
- [ ] Voice/TTS data assessed.
- [ ] Supabase data processing assessed.
- [ ] RevenueCat data processing assessed.
- [ ] Tracking declaration confirmed.
- [ ] Data linked to user confirmed.
- [ ] Data used for tracking confirmed or denied.

### Build / Metadata
- [ ] Bundle ID verified.
- [ ] Version and build number updated.
- [ ] App category selected.
- [ ] Age rating completed consistently with intimacy content.
- [ ] Screenshots uploaded.
- [ ] App preview optional.
- [ ] Copyright completed.
- [ ] Support contact completed.

---

## Native IAP Integration Sprint — Shell Detection

- **Detected shell/framework:** React + TypeScript + Vite (web app).
- **iOS native project exists:** No (`ios/` directory not present).
- **Capacitor present:** Added Capacitor config and dependencies in this sprint.
- **RevenueCat Capacitor SDK present:** Yes (`@revenuecat/purchases-capacitor` installed).
- **Can real native IAP be fully wired in this repo now:** Partially in code path; native runtime execution is blocked until iOS platform is added and synced.
- **Exact blocker:** `npx cap add ios` failed on this machine because CocoaPods is not installed, so no iOS project/workspace is generated yet.

## Native IAP Closure Result

- RevenueCat SDK installed: **Yes**.
- Capacitor iOS exists: **No** (platform add blocked by missing CocoaPods).
- `purchasePremium` real native path in iOS runtime: **Implemented in code** (loads RevenueCat Capacitor plugin and purchases selected package by offering/product mapping).
- `restorePurchases` real native path in iOS runtime: **Implemented in code**.
- Browser fallback safety: **Safe** (no fake production unlock; explicit unavailable message outside native bridge).
- Dev unlock disabled in production: **Yes**.
- Sandbox testing completed: **No (manual, pending native iOS project + CocoaPods + Xcode run)**.

### Native IAP commands run
- `npm install` ✅
- `npm run lint` ✅
- `npm run build` ✅
- `npm run cap:add:ios` ❌ CocoaPods not installed
- `npm run cap:sync:ios` ❌ iOS platform not added

### Status
**STATUS B: Not ready for App Store submission.**

Reason: native iOS project is not generated in this environment yet, so real Apple sandbox purchase/restore execution cannot be validated end-to-end despite adapter wiring.

### Remaining unresolved blockers
1. Install CocoaPods on build machine.
2. Run `npm run cap:add:ios` successfully.
3. Run `npm run ios:sync` and open Xcode workspace.
4. Configure signing + final bundle ID.
5. Validate sandbox purchase/restore with RevenueCat offering + entitlement active.

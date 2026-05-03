# App Store Final Audit — Sacred Path for Couples

Date: 2026-05-03
Repository: `/Users/mathieuescande/Documents/GitHub/sacredpath-mainstream`

## Final checklist
- [x] Duplicate Finder files removed
- [x] Dead root `pages/` folder reviewed
- [x] Paywall subscription disclosure added
- [x] Restore Purchases visible pre-purchase
- [x] RevenueCat iOS public SDK key documented
- [x] `.env.example` created/updated
- [x] Privacy Manifest template required for iOS
- [ ] iOS native project required (Manual)
- [ ] App icon and launch screen required in Xcode (Manual)
- [ ] StoreKit products must be created in App Store Connect (Manual)
- [ ] Age rating should be 17+ (Manual)
- [ ] TestFlight sandbox purchase and restore required before submission (Manual)

## Completed in this pass
1. Removed obvious Finder duplicates:
- `package-lock 2.json`
- `styles/globals 2.css`
- `src/lib/ritualRegistry 2.ts`
- `public/sacred-path-mark 2.PNG`
- deleted dead root `pages/` folder (contained stale duplicate `* 2.tsx` files)

2. Confirmed routing uses `src/pages/*` via `src/main.tsx`; no active imports depended on root `pages/`.

3. Updated paywall compliance text to show Apple-required subscription disclosure near purchase CTA, including:
- yearly and monthly pricing display
- auto-renewal language
- terms + privacy links on the purchase screen
- restore purchases visible before purchase

4. Hardened RevenueCat behavior for production safety:
- dev premium unlock now only allowed in `import.meta.env.DEV`
- removed production-facing placeholder claims about offers appearing automatically
- unavailable purchase/restore states now return clear user-facing error text

5. Added environment template:
- `.env.example` with `VITE_REVENUECAT_IOS_API_KEY`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- comments clarify public SDK key vs secret/service-role keys

6. Added privacy manifest files:
- `ios/App/App/PrivacyInfo.xcprivacy`
- `docs/ios/PrivacyInfo.xcprivacy.template`

## Capacitor config audit
`capacitor.config.ts` is valid for Vite + iOS:
- `appId`: `com.sacredpathforcouples.app` (Manual: confirm exact bundle ID matches App Store Connect)
- `appName`: `Sacred Path for Couples`
- `webDir`: `dist`
- `bundledWebRuntime`: `false`

## Info.plist permissions audit
`ios/App/App/Info.plist` currently has no microphone/camera/photo/tracking/speech usage entries. In this pass no additional iOS permissions were added because plugin usage requiring those keys was not confirmed.

Manual Xcode audit required before submission:
- verify no installed plugin requests microphone/camera/photo/tracking/speech without matching usage description.
- if microphone recording is introduced, add:
  `NSMicrophoneUsageDescription`: “Sacred Path uses the microphone only if you choose a voice or audio feature that requires recording.”

## Icons and launch screen
Current iOS project includes:
- `AppIcon.appiconset` with 1024x1024 marketing icon file
- `LaunchScreen.storyboard`

Manual Xcode check still required:
- confirm full required iPhone/iPad icon set is generated from final branding
- confirm launch screen appearance on target devices

## Ritual content TODO
Ritual library repetition should be reviewed before final submission, but it is not a hard blocker.

## Manual App Store Connect / Xcode actions remaining
1. Confirm bundle identifier in Xcode matches App Store Connect app record.
2. Create and verify StoreKit subscriptions in App Store Connect:
- `com.sacredpathforcouples.premium.yearly`
- `com.sacredpathforcouples.premium.monthly`
3. Ensure RevenueCat offering + entitlement mapping matches production app configuration.
4. Run TestFlight sandbox purchase and restore flow on device.
5. Set age rating to 17+ with appropriate intimacy-content flags.
6. Verify final Terms of Use / EULA and Privacy Policy URLs and metadata in App Store Connect.
7. Confirm privacy nutrition labels match actual data collection and SDK behavior.

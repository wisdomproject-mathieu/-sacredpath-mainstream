# IAP Sandbox Test Plan — Sacred Path for Couples

## Scope
Validate native iOS subscription purchase and restore through RevenueCat + Apple sandbox before App Store submission.

## Required configuration constants in code
- Entitlement ID: `VITE_REVENUECAT_ENTITLEMENT_ID` (fallback `premium`)
- Offering ID: `VITE_REVENUECAT_OFFERING_ID` (fallback `default`)
- Monthly product ID: `VITE_IAP_MONTHLY_PRODUCT_ID` (fallback `com.sacredpathforcouples.premium.monthly`)
- Yearly product ID: `VITE_IAP_YEARLY_PRODUCT_ID` (fallback `com.sacredpathforcouples.premium.yearly`)
- RevenueCat iOS public SDK key: `VITE_REVENUECAT_IOS_API_KEY`

## App Store Connect
- [ ] Bundle ID matches Xcode project.
- [ ] Subscription group created.
- [ ] Monthly subscription product created.
- [ ] Yearly subscription product created.
- [ ] Product IDs match code.
- [ ] Products are in Ready to Submit or approved state as applicable.
- [ ] Paid Applications Agreement active.
- [ ] Banking/tax information complete.
- [ ] Sandbox tester created.

## RevenueCat
- [ ] iOS app configured.
- [ ] App Store shared secret / App Store Connect API configured as needed.
- [ ] Products imported.
- [ ] Entitlement created.
- [ ] Monthly product attached to entitlement.
- [ ] Yearly product attached to entitlement.
- [ ] Offering created.
- [ ] Offering identifier matches code.
- [ ] Current offering selected.
- [ ] SDK key copied to VITE_REVENUECAT_IOS_API_KEY.

## Local/Xcode
- [ ] npm run build passes.
- [ ] npx cap sync ios executed.
- [ ] iOS project opens in Xcode.
- [ ] Signing team selected.
- [ ] Bundle ID verified.
- [ ] Build runs on physical iPhone.
- [ ] Purchase opens Apple sandbox sheet.
- [ ] Restore checks real Apple purchase history.

## Execution steps
1. Set environment variables in your build environment for RevenueCat/API/product IDs.
2. Build web assets: `npm run build`.
3. Sync native project: `npx cap sync ios`.
4. Open iOS workspace in Xcode and run on device with sandbox Apple ID.
5. Navigate to Paywall and confirm available package cards render.

## Test cases

### Purchase test case
1. Open paywall as free user.
2. Select a package.
3. Tap “Subscribe to upgrade your intimate life”.
4. Complete sandbox purchase sheet.
5. Expected: premium activates immediately; premium-only content unlocks.

### Restore test case
1. Install app on same sandbox Apple ID where prior purchase exists.
2. Open paywall.
3. Tap Restore purchases.
4. Expected: “Your premium access has been restored.” and premium state active.

### Cancellation test case
1. Start purchase flow.
2. Cancel before confirmation.
3. Expected: premium remains locked; no false success message.

### Reinstall + restore test case
1. Purchase successfully.
2. Delete app.
3. Reinstall app.
4. Tap Restore purchases.
5. Expected: premium access restored from entitlement.

### No active subscription restore case
1. Use sandbox account with no purchase history.
2. Tap Restore purchases.
3. Expected: “No active subscription was found for this Apple ID.”

### Expired subscription behavior
1. Use test account/subscription state configured to expire.
2. Relaunch app and refresh entitlement.
3. Expected: premium deactivates when entitlement inactive.

## Expected UI outcomes
- Purchase success: premium active message, premium UI unlocked.
- Restore success: restore success message, premium active.
- Restore no entitlement: clear no-active-subscription message.
- Failure: clear retry/support guidance; no premium unlock.

# App Store Review Notes — Sacred Path for Couples

## App purpose
Sacred Path for Couples is an adults-only relationship app that offers guided connection rituals, reflective prompts, and practical communication tools. The app is designed to help couples reconnect through consent-forward, emotionally safe practices.

## Subscription overview
The app includes free value and a premium subscription.

Premium unlocks:
- Full ritual library
- Sacred Voice guided audio
- Intimacy Oracle deeper guidance
- Journey dashboard tools
- Saved reflections and milestones
- Premium unlock is handled through Apple in-app subscription flow (via RevenueCat integration in iOS builds).

## How to reach premium flow
1. Open Home.
2. Tap a premium call-to-action (for example in Rituals, Oracle, Journey, or Home).
3. This opens the Paywall screen.

## Purchase and restore behavior
- Purchase and restore are implemented through the in-app entitlement layer.
- In iOS native builds with RevenueCat configured, entitlement activates automatically after purchase/restore.
- Restore Purchases button is visible on paywall.
- Sandbox details: [Sandbox test account if required]
- Product IDs: [Subscription product IDs]

## How to access key features
- **Intimacy Weather:** Home -> Check our weather
- **Ritual Library:** Home -> Browse rituals
- **Intimacy Oracle:** Home -> Ask the Intimacy Oracle
- **Sacred Voice:** Premium feature available as guided voice flow from Oracle/Ritual-related paths
- **Journey:** Home or bottom nav -> Journey (free starter + premium-expanded tools)

## Oracle policy framing
Intimacy Oracle is a guided reflection feature. It does not claim to predict the future, diagnose mental health conditions, or provide medical/therapeutic advice.

## Safety and consent framing
Rituals are written for consenting adults in relationships and emphasize communication, boundaries, and mutual respect.

## Medical/mental health disclaimer
The app does not provide medical care, mental health treatment, crisis intervention, or emergency support.

## Reviewer instructions
- [Reviewer instructions]

## Test account / reviewer access
- Account login is not required for core browsing flows in the current build.
- If partner-connect or backend-gated features are reviewed, provide test credentials here if required:
  - Test email: `<ADD_IF_NEEDED>`
  - Test password: `<ADD_IF_NEEDED>`

## IAP sandbox note
If App Review tests paid flows in sandbox, please use the app's in-app purchase flow from the Paywall screen and Restore Purchases button.

## Contact for review questions
Support: see in-app Support page (`/support`) and configured support URL in App Store Connect.

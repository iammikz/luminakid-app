# luminakid-app
LuminaKid is an app where the experience evolves month by month. Parents enter a birth date once; the app calculates the baby's current age and unlocks the right activities automatically. Each activity targets a specific developmental milestone. A companion journal tab explains what the baby is learning and gives parents hands-on activity ideas.

## Development Setup

Install dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npm start
```

From the Expo terminal UI, open the app in Expo Go, an iOS simulator, an Android emulator, or a development build.

Platform-specific development targets:

```bash
npm run ios
npm run android
npm run web
```

## App Development Testing

Run the unit test suite:

```bash
npm test
```

Run TypeScript checks:

```bash
npm run typecheck
```

Recommended manual app test flow:

1. Run `npm start`.
2. Create a baby profile with a birth date that makes the baby 6, 7, 8, or 9 months old.
3. Confirm the Play tab unlocks the matching activity.
4. Tap around each unlocked activity and confirm immediate visual feedback.
5. Select locked future months and confirm the lock overlay still appears.
6. Open the Journal tab and confirm the journal content matches the selected milestone month.

## Build Process

Production mobile builds should use EAS Build after Expo credentials and bundle identifiers are configured.

Install or run the EAS CLI:

```bash
npx eas-cli --version
```

Initialize EAS for the project if it has not been configured yet:

```bash
npx eas-cli init
```

Create production builds:

```bash
npx eas-cli build --platform ios --profile production
npx eas-cli build --platform android --profile production
```

Submit completed builds when store metadata and credentials are ready:

```bash
npx eas-cli submit --platform ios
npx eas-cli submit --platform android
```

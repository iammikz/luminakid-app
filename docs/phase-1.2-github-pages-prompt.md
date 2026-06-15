# Phase 1.2 Prompt - GitHub Pages Web/PWA Deployment

Prepare the Expo web build so LuminaKid can be deployed to GitHub Pages whenever the `main` branch changes.

## Goal

Keep the Expo mobile app as the primary target while supporting a static Expo web/PWA build hosted on GitHub Pages for demos, browser testing, and lightweight public access.

Start this phase after Phase 1 app foundation work is complete and before Phase 2 cloud/account work begins.

## Scope

- Preserve Expo Router and React Native Web compatibility.
- Use Expo static web output through `web.output: "static"`.
- Export the web build with `npm run export:web`.
- Deploy the generated `dist/` directory to GitHub Pages from GitHub Actions.
- Run `npm test` and `npm run typecheck` before deployment.
- Trigger deployment on every push to `main` and allow manual deployment through `workflow_dispatch`.

## GitHub Pages Requirements

- The repository must use GitHub Pages with source set to GitHub Actions.
- The deployment workflow must upload the Expo `dist/` output through `actions/upload-pages-artifact`.
- The deployment job must use the `github-pages` environment and `actions/deploy-pages`.
- The app must avoid server-only routes and runtime backend dependencies in the Phase 1 web build.
- All Phase 1 behavior must remain local-only and offline-first where browser APIs allow it.

## Web/PWA Constraints

- Treat native mobile as the source of truth for haptics, audio latency, recording, and app-like full-screen behavior.
- Keep web behavior graceful when haptics or native APIs are unavailable.
- Avoid adding web-only product scope unless it also preserves the mobile experience.
- Verify generated assets load correctly from the published GitHub Pages URL, especially if deployed under a repository subpath such as `/luminakid-app/`.

## Acceptance Criteria

- `app.json` declares Expo static web output.
- `package.json` includes an `export:web` script.
- `.github/workflows/deploy-pages.yml` builds, tests, typechecks, exports, uploads, and deploys the static site.
- A push to `main` starts the Pages deployment workflow.
- The published GitHub Pages site loads the app shell, Play tab, Journal tab, and static assets without broken paths.

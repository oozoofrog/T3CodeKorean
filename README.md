# T3CodeKorean

An **unofficial personal multilingual fork** of [T3 Code](https://github.com/pingdotgg/t3code), maintained by [oozoofrog](https://github.com/oozoofrog). This repository is independent of T3 Tools and is not an official T3 Code release or Korean edition endorsed by the upstream maintainers.

T3 Code is an open-source GUI for coding agents, with desktop, web, and mobile clients. It works with your existing provider subscriptions. This fork focuses on Korean and other UI languages while retaining the upstream server protocol and provider integrations. Translation coverage varies; English remains the fallback.

## Build and start

Install [Vite+](https://viteplus.dev/), which manages the Node version pinned in `package.json`. Authenticate your chosen provider CLI before running agent turns. From this repository:

```sh
vp i
vp run dev --no-seed
```

Open the pairing URL printed by the dev runner. Linked worktrees use their own `.t3` directory; `--no-seed` starts without importing an existing conversation database. For Electron development, run `vp run dev:desktop --no-seed`.

To build and run the local production desktop client:

```sh
vp run build:desktop
vp run start:desktop
```

For an unsigned local Apple Silicon macOS artifact, run on macOS:

```sh
vp run dist:desktop:artifact --platform mac --target dmg --arch arm64 --signed false
```

The artifact command builds the desktop and bundled server, stages production dependencies and native helpers, and writes artifacts under `release/` by default. `--target dir` produces an unpacked `.app`; use `--skip-build` only after rebuilding the current sources. Intel macOS uses `--arch x64`. See [development operations](docs/operations/development.md) for upstream build details.

An unsigned local build is not a signed or notarized public release. macOS may require an explicit launch approval. Public distribution needs your own Apple Developer signing identity, notarization credentials, and provisioning/associated-domain configuration for passkeys; upstream credentials and entitlements do not grant access to this fork. Linux and Windows packaging remain available but require their platform build tools and verification.

## Independent installation

| Setting                      | Fork default                                                                |
| ---------------------------- | --------------------------------------------------------------------------- |
| Desktop display name         | T3CodeKorean (Beta), or Nightly/Dev                                         |
| Bundle/application ID        | `com.oozoofrog.t3codekorean`                                                |
| App URL schemes              | `t3code-korean://`, `t3code-korean-dev://`                                  |
| Data and saved settings      | `~/.t3codekorean/userdata`                                                  |
| Electron browser profile     | `t3codekorean` / `t3codekorean-dev` under the OS application-data directory |
| Preferred server port        | `3783` (automatic selection can choose another free port)                   |
| Optional desktop CLI command | `t3korean`                                                                  |

`T3CODE_HOME`, `T3CODE_PORT`, CLI `--base-dir`/`--port`, and other explicit upstream configuration remain supported. Choosing the official application's directory explicitly shares its state; use a separate directory for each running install. The fork does not automatically migrate upstream preferences or credentials. Its launchers and background-service IDs are separate from the official install.

Automatic desktop updates have no default feed. Packaging ignores `GITHUB_REPOSITORY`; an explicit `T3CODE_DESKTOP_UPDATE_REPOSITORY=oozoofrog/T3CodeKorean` can embed a fork feed when compatible fork releases exist. Managed update mirrors and local mock-update testing remain explicit options. The desktop refuses a baked-in official update feed. CLI self-update is disabled: rebuild and install this fork manually. Official installers, Homebrew casks, npm `t3`, and upstream download links install **upstream T3 Code**, not this fork.

Local and remote WebSocket contracts retain their upstream names. Existing upstream app links can still be parsed, but the fork registers only its own OS URL schemes. Hosted upstream sign-in redirects and services may require fork-specific configuration; they are not promised to recognize this fork's bundle ID or URL schemes.

## Language contributions

Contribute translations to this fork's message catalogs in `packages/client-runtime/src/i18n/`. Keep stable message keys, interpolation placeholders, and English fallback text intact. Check both short labels and longer text in their actual UI context. Avoid global search-and-replace of product names or code identifiers. New locales also need the supported-language configuration and selector wiring, plus a real-client check by the integrating maintainer. Please report translation issues to [this fork](https://github.com/oozoofrog/T3CodeKorean/issues), not upstream.

## Attribution and license

T3CodeKorean is based on work by T3 Tools and the T3 Code contributors. The original [MIT license](LICENSE) and [third-party license configuration](third-party-licenses.config.json) remain in effect. See [FORK-NOTICE.md](FORK-NOTICE.md). Upstream documentation and artwork may retain the T3 Code name as attribution and technical context.

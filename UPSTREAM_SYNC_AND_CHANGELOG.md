# Upstream Synchronization & Transformation Changelog

This document tracks **every file and architectural modification** made to transform the upstream fork ([jcommaret/kodia](https://github.com/jcommaret/kodia) and [Microsoft/vscode](https://github.com/microsoft/vscode)) into **BharatCode Studio**.

Use this guide in the future whenever pulling updates from upstream so you can merge or re-apply changes without breaking BharatCode branding or AI provider wiring.

---

## 1. Quick Upstream Sync Guide (Future Updates)

To pull the latest updates from the original upstream repository while preserving your changes:

```bash
# 1. Ensure you have the upstream remote configured
git remote add upstream https://github.com/jcommaret/kodia.git || true

# 2. Fetch latest commits from upstream
git fetch upstream master

# 3. Create a temporary merge or rebase branch
git checkout -b sync-upstream
git merge upstream/master

# 4. If conflicts occur in any of the files listed below in Section 2,
# resolve them following the exact specifications in this document.

# 5. Re-compile the React bundle and verify TypeScript types
npm run buildreact
npm run compile

# 6. Merge back into main and push
git checkout main
git merge sync-upstream
git push origin main
git branch -d sync-upstream
```

---

## 2. Complete File-by-File Modification Ledger

### Group A: Native BharatCode AI Provider Integration

| File Path | What Was Changed / How to Re-Apply |
| :--- | :--- |
| **`src/vs/workbench/contrib/void/common/modelCapabilities.ts`** | Added `'bharatcode'` provider definition: <br>• Default models: `glm-5.3-flash`, `deepseek-v4.1-flash`<br>• Default settings: `{ apiKey: '' }`<br>• Model capabilities: context windows (`262,144` and `1,000,000`), reasoning support, FIM, and tool calling. |
| **`src/vs/workbench/contrib/void/common/voidSettingsTypes.ts`** | Added `'bharatcode'` into `displayInfoOfProviderName` (Title: `BharatCode`), placeholder (`bc-key...`), and set `nonlocalProviderNames`. |
| **`src/vs/workbench/contrib/void/electron-main/llmMessage/sendLLMMessage.impl.ts`** | Configured the OpenAI-compatible SDK endpoint: <br>• Base URL: `https://bharatcode.ai/api/model/v1`<br>• API Key fallback: `thisConfig.apiKey \|\| process.env.BHARATCODE_API_KEY \|\| ''`<br>• Wired `sendChat` and `sendFIM` handlers. |
| **`src/vs/workbench/contrib/void/common/voidSettingsService.ts`** | Set default initial state for fresh installs to `{ providerName: 'bharatcode', modelName: 'glm-5.3-flash' }` across Chat, Ctrl+K, Autocomplete, Apply, and SCM. |
| **`src/vs/workbench/contrib/void/common/kodiaLinks.ts`** | Updated GitHub repository and issue links to `https://github.com/Sreeju7733/bharatcode-studio`. |

---

### Group B: Project Rules & Project Memory Paths

| File Path | What Was Changed / How to Re-Apply |
| :--- | :--- |
| **`src/vs/platform/kodia/common/projectInstructions.ts`** | Added `.bharatcoderules` at index `0` of `PROJECT_RULES_FILE_NAMES` so workspace rules automatically detect `.bharatcoderules`. |
| **`src/vs/platform/kodia/common/projectMemory.ts`** | Changed default project memory path from `.kodia/memory.md` to `.bharatcode/memory.md`. |
| **`src/vs/platform/kodia/common/toolCatalog.ts`** | Updated tool description to point to `.bharatcode/memory.md`. |
| **`src/vs/workbench/contrib/void/test/common/projectRules.test.ts`** | Updated unit test assertion to expect `.bharatcoderules`. |

---

### Group C: Product Identity & Metadata (`product.json`)

| File Path | What Was Changed / How to Re-Apply |
| :--- | :--- |
| **`product.json`** | Updated white-label identifiers: <br>• `nameShort`: `"BharatCode Studio"`<br>• `nameLong`: `"BharatCode Studio"`<br>• `applicationName`: `"bharatcode-studio"`<br>• `dataFolderName`: `".bharatcode-studio"`<br>• `win32MutexName`: `"bharatcodestudio"`<br>• `win32DirName`: `"BharatCode Studio"`<br>• `darwinBundleIdentifier`: `"ai.bharatcode.studio"`<br>• `linuxIconName`: `"bharatcode-studio"`<br>• Keychain Safe Storage: `"BharatCode Studio Safe Storage"` |

---

### Group D: React UI & Studio Dark Theme

| File Path | What Was Changed / How to Re-Apply |
| :--- | :--- |
| **`src/vs/workbench/contrib/void/browser/react/src/void-onboarding/VoidOnboarding.tsx`** | Replaced the 2-step setup with a simplified first-launch screen: <br>• BharatCode Studio branding badge<br>• Single-step BharatCode API Key input (with link to `https://bharatcode.ai`)<br>• "Start Coding" primary button<br>• "Configure other providers" secondary link. |
| **`src/vs/workbench/contrib/void/browser/react/src/sidebar-tsx/SidebarChat.tsx`** | Mode dropdown labels set to **Normal**, **Gather**, **Agent**. Starter suggestions updated to suggest creating a `.bharatcoderules` file. |
| **`src/vs/workbench/contrib/void/browser/react/src/styles.css`** | Added dark studio palette variables (`#B8FF43` neon lime accent, `#0E0F0B` dark background). |
| **`src/vs/workbench/contrib/void/browser/react/src/void-editor-widgets-tsx/VoidCommandBar.tsx`** | Styled inline diff buttons: <br>• **Accept All**: High-contrast `#B8FF43` accent<br>• **Reject All**: Clean dark button `#1E2019`. |
| **`src/vs/workbench/contrib/void/browser/react/src/sidebar-tsx/ChatToolResults.tsx`** | Updated tool approval action buttons to high-contrast **Accept** (`#B8FF43`) and **Reject**. |
| **Onboarding Provider Priority & Order** | In the compiled onboarding flow (`workbench.desktop.main.js`): <br>• Default provider initialized to `'bharatcode'`.<br>• Provider buttons order pinned with `'bharatcode'` at index `0` (`D6e = ['bharatcode', ...]`).<br>• Default model selection configured as `glm-5.3-flash`.<br>• Replaced all onboarding strings (`"Welcome to Kodia"` -> `"Welcome to BharatCode Studio"`, `"Enter Kodia"` -> `"Enter BharatCode Studio"`, `"Kodia's AI features"` -> `"BharatCode Studio's AI features"`). |


---

### Group E: User-Facing Labels & Menus

Replaced user-facing `"Kodia"` and `"Void"` strings in:
* `src/vs/workbench/contrib/void/browser/voidSettingsPane.ts` (Titles & settings pane headings)
* `src/vs/workbench/contrib/void/browser/fileService.ts`
* `src/vs/workbench/contrib/void/browser/quickEditActions.ts`
* `src/vs/workbench/contrib/void/browser/sidebarActions.ts`
* `src/vs/workbench/contrib/void/browser/voidCommandBarService.ts`
* `src/vs/workbench/contrib/void/browser/voidSCMService.ts`
* `src/vs/workbench/contrib/void/browser/voidUpdateActions.ts`
* `src/vs/workbench/contrib/files/browser/fileActions.contribution.ts`
* `src/vs/workbench/browser/actions/layoutActions.ts`
* `src/vs/workbench/browser/parts/auxiliarybar/auxiliaryBarActions.ts`
* `src/vs/workbench/browser/parts/auxiliarybar/auxiliaryBarPart.ts`
* `src/vs/workbench/browser/parts/paneCompositeBar.ts`
* `src/vs/workbench/browser/parts/panel/panelActions.ts`
* `src/vs/workbench/browser/workbench.contribution.ts`
* `src/vs/workbench/contrib/quickaccess/browser/viewQuickAccess.ts`

---

### Group F: Multi-Platform Packaging (Bundled in `packaging/`)

| File Path | Description & Purpose |
| :--- | :--- |
| **`packaging/aur/PKGBUILD`** | Direct Arch Linux package build script installing into `/opt/bharatcode-studio` with `/usr/bin/bharatcode-studio` symlink. |
| **`packaging/aur/bharatcode-studio.desktop`** | Linux XDG desktop entry with application icons, MIME types, and window actions. |
| **`packaging/aur/build-pacman-repo.sh`** | Helper script to run `makepkg` and `repo-add` for hosting a custom pacman repository. |
| **`packaging/homebrew/Casks/bharatcode-studio.rb`** | Homebrew Cask supporting macOS (ARM64/x64 `.dmg`) and Linux (x64/ARM64 `.tar.gz`). |
| **`packaging/winget/BharatCode.BharatCodeStudio.yaml`** | Microsoft Winget singleton manifest for Windows User Setup (`.exe`). |
| **`packaging/scoop/bharatcode-studio.json`** | Windows Scoop package definition with auto-update manifest. |
| **`packaging/linux-repo/README.md`** | APT (`.deb`) and DNF (`.rpm`) signed package repository setup guide. |
| **`packaging/setup_all_distribution_repos.sh`** | Automated helper to stage all distribution buckets and tap repositories. |

---

### Group G: Application Icon & Brand Asset Suite

| Platform / Format | File Path | Specifications |
| :--- | :--- | :--- |
| **Linux (HiColor PNG)** | `resources/linux/code.png` | 1024x1024 RGBA. Official obsidian squircle with glowing `< / >` cyber-bracket and tricolor accents. |
| **macOS (Apple ICNS)** | `resources/darwin/code.icns` | Multi-resolution Apple icon bundle (16x16 to 1024x1024 Retina). |
| **Windows (ICO)** | `resources/win32/code.ico` | Multi-frame Windows icon (16, 24, 32, 48, 64, 128, 256 px). |
| **Windows Tiles & Installer** | `resources/win32/code_150x150.png`, `code_70x70.png`, `logo_cube_noshadow.png` | Windows Start Menu medium/small tiles and Inno-Setup assets. |
| **Web & Remote Server** | `resources/server/code-512.png`, `code-192.png`, `favicon.ico` | VS Code Web and remote browser server icons. |

---

## 3. Checklist for Re-Building After an Upstream Pull

After running `git merge upstream/master`:

- [ ] Check `src/vs/workbench/contrib/void/common/modelCapabilities.ts` has `'bharatcode'`.
- [ ] Check `src/vs/workbench/contrib/void/electron-main/llmMessage/sendLLMMessage.impl.ts` has the `https://bharatcode.ai/api/model/v1` endpoint.
- [ ] Check `product.json` has `BharatCode Studio` name and bundle IDs.
- [ ] Run `npm run buildreact` to re-bundle the React UI (`src/vs/workbench/contrib/void/browser/react/dist/`).
- [ ] Run `npm run compile` to verify TypeScript typechecking passes.


---

# 12. Deep Technical Reference: Every Modified Path, Upstream Diff & Rationale

This section provides an exhaustive line-level roadmap of every architectural change made to transform upstream Kodia / VS Code into **BharatCode Studio**, enabling seamless upstream tracking, rebasing, and cross-platform verification (Windows, macOS, Linux).

### 1. Product Identity, Mutexes & Binary Naming
* **File**: `product.json`
  * **Diff**: `nameShort`: `"BharatCode Studio"`, `nameLong`: `"BharatCode Studio"`, `applicationName`: `"bharatcode-studio"`, `dataFolderName`: `".bharatcode-studio"`, `win32AppUserModelId`: `"BharatCodeStudio.BharatCodeStudio"`, `win32MutexName`: `"bharatcodestudio"`, `darwinBundleIdentifier`: `"ai.bharatcode.studio"`. Documentation, telemetry and repository URLs redirected to `https://github.com/Sreeju7733/bharatcode-studio`.
  * **Why**: Prevents collisions with VS Code, VSCodium, and upstream Kodia. Ensures Windows Task Manager, macOS Activity Monitor, and Linux `ps` identify the application solely as `BharatCode Studio`.
* **File**: `package.json`
  * **Diff**: `"name": "BharatCode Studio"`.
  * **Why**: Renames Electron process package identifier so system processes in OS task managers display `BharatCode Studio`.

### 2. Native AI Provider Registration (`bharatcode`)
* **File**: `src/vs/workbench/contrib/void/common/modelCapabilities.ts`
  * **Diff**: Added `glm53ReasoningEffortCapabilities`, `bharatcodeModelOptions` (`glm-5.3-flash`, `deepseek-v4.1-flash`), and `bharatcodeSettings` inside `voidStaticModelInfos`.
  * **Why**: Exposes native BharatCode models with correct token limits (1,000,000 context, 128k/384k output), tool formatting (`openai-style`), system message handling (`system-role`), and thinking tag extraction (`<think>...</think>`).
* **File**: `src/vs/workbench/contrib/void/common/voidSettingsTypes.ts`
  * **Diff**: Added `bharatcode` to `VoidProviderName`, `defaultProviderSettings` (`apiKey: ""`), `defaultModelsOfProvider` (`["glm-5.3-flash", "deepseek-v4.1-flash"]`), and UI title resolver (`title: "BharatCode"`).
  * **Why**: Registers BharatCode as a first-class citizen alongside Anthropic and OpenAI across the workbench UI and settings state.
* **File**: `src/vs/workbench/contrib/void/electron-main/llmMessage/sendLLMMessage.impl.ts`
  * **Diff**: Added `bharatcode` case pointing to baseURL `https://bharatcode.ai/api/model/v1` with OpenAI compatibility format.
  * **Why**: Routes all LLM requests directly to the official BharatCode API backend.

### 3. Onboarding & Model Visibility Flow (No-Lockout Fix)
* **File**: `src/vs/workbench/contrib/void/common/voidSettingsService.ts`
  * **Diff**: In state hydration and provider validation (`_didFillInProviderSettings`), `bharatcode` models default to visible (`isHidden: false`) and toggle switches are enabled immediately without requiring pre-validation lockouts.
  * **Why**: In upstream Void/Kodia, uninitialized providers disable toggle switches with `"Add <Provider> to enable"`. For BharatCode Studio, BharatCode is the primary built-in engine, so models must be enabled and active from first boot.

### 4. Cross-Platform Automated Builder & Distribution
* **File**: `bharatcode-studio-builder/.github/workflows/stable*.yml`
  * **Diff**: `APP_NAME`: `BharatCode Studio`, repository pointers updated to `Sreeju7733/bharatcode-studio`.
  * **Why**: Builds official `.exe` (Windows User/System Setup & MSI), `.dmg`/`.zip` (macOS x64 & Apple Silicon), `.deb`/`.rpm`/`.tar.gz` (Linux x64, arm64, armhf), and CLI tunnels.
* **File**: `packaging/` (Homebrew Tap, AUR, Scoop, WinGet, APT/RPM)
  * **Diff**: Fully unified in `bharatcode-studio/packaging/` pointing to `Sreeju7733/bharatcode-studio/releases`.
  * **Why**: Centralizes all OS distribution channels into the core repository for single-commit maintenance.


### 5. Runtime Fixes for Onboarding, Advanced Settings & White-Labeling (Nov 26, 2026)
* **Model Capabilities Registration in R7r / voidStaticModelInfos**:
  * **Issue**: Clicking "Advanced Settings" on BharatCode models threw `TypeError: Cannot destructure property modelOptions of R7r[s] as it is undefined`.
  * **Fix**: Added `bharatcode` to runtime provider capabilities table (`R7r` in `workbench.desktop.main.js` and `voidStaticModelInfos` in `modelCapabilities.ts`), linking directly to `d7r` (`deepseek` / `glm` OpenAI-compatible definition).
* **Onboarding "Next" Button Activation**:
  * **Issue**: Even after entering API key, "Next" button stayed disabled with `"Add a model to continue"`.
  * **Fix**: Pre-populated default model selection in `Lpt` with `Chat: { providerName: bharatcode, modelName: glm-5.3-flash }`, and updated onboarding validation predicate `c` so that having models under `bharatcode` immediately enables the "Next" button.
* **Toggle Switch State Sync**:
  * **Issue**: Toggling models before state was written did not persist.
  * **Fix**: Updated toggle handler to write initial provider settings and activate the model in `models` array immediately on click.
* **Full White-Labeling**:
  * Renamed all occurrences of "Kodia" to "BharatCode Studio" across dialogs, welcome headers, model menus, and descriptions while preserving licenses and credit notices.

* **Provider Completion Indicator (`isDone`) & True State Validation**:
  * **Issue**: The `BharatCode` provider pill was incorrectly displaying a checkmark (`✓`) even before the user entered an API key, and the "Next" button was prematurely visible.
  * **Fix**: Cleaned provider default state (`_didFillInProviderSettings: void 0` in `WPi.bharatcode`) and restored strict validation. The checkmark (`✓`) on the provider pill now only appears **after** a valid API key is entered, and the "Next" button only unlocks once an API key is configured.

* **White-Labeling Button & Final Step Labels**:
  * Replaced onboarding completion button text `"Enter Kodia"` with `"Enter BharatCode Studio"`.
  * Replaced all remaining string templates (`"comes packaged with BharatCode Studio"`, `"BharatCode Studio knows"`, `"BharatCode Studio treats"`, etc.) across workbench UI.

* **Update Service & GitHub Release Checker White-Labeling**:
  * **Issue**: A toast notification popup appeared stating `"A new version of Kodia is available! Please reinstall (auto-updates are disabled on this OS)..."`.
  * **Root Cause**: The electron-main updater (`voidUpdateMainService.ts` / `mainImpl.js`) was polling `jcommaret/kodia/releases/latest`. Because the local version differed from upstream Kodia tag conventions, it falsely triggered an update notification with the old brand name.
  * **Fix**: Updated release repo endpoint from `jcommaret/kodia` to `Sreeju7733/bharatcode-studio` across `kodiaLinks.ts` and `mainImpl.js`, and updated notification templates to `"BharatCode Studio"`.

* **Full Brand Icon & Menu White-Labeling (Menu Bar Icon & Welcome Cube)**:
  * Replaced upstream transparent wireframe cube (`void_cube_noshadow.png`) with the official **BharatCode Studio** emblem.
  * Generated and updated `src/vs/workbench/browser/media/code-icon.svg` using the official BharatCode Studio emblem to replace the top-left window titlebar / menubar icon.
  * Replaced all occurrences of `"Kodia's Settings"` with `"BharatCode Studio's Settings"` across localization and metadata catalogs.

#!/usr/bin/env bash
set -e
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "==> 1. Preparing Homebrew Tap..."
mkdir -p /tmp/homebrew-tap/Casks
cp "${ROOT_DIR}/packaging/homebrew/Casks/bharatcode-studio.rb" /tmp/homebrew-tap/Casks/
cat << 'EOF' > /tmp/homebrew-tap/README.md
# Homebrew Tap for BharatCode Studio

Official Homebrew Cask tap for BharatCode Studio on macOS.

```bash
brew tap Sreeju7733/tap https://github.com/Sreeju7733/homebrew-tap
brew install --cask bharatcode-studio
```
EOF

echo "==> 2. Preparing Scoop Bucket..."
mkdir -p /tmp/scoop-bucket/bucket
cp "${ROOT_DIR}/packaging/scoop/bharatcode-studio.json" /tmp/scoop-bucket/bucket/
cat << 'EOF' > /tmp/scoop-bucket/README.md
# Scoop Bucket for BharatCode Studio

Official Scoop manifest bucket for BharatCode Studio on Windows.

```powershell
scoop bucket add bharatcode-studio https://github.com/Sreeju7733/scoop-bucket
scoop install bharatcode-studio
```
EOF

echo "==> 3. Preparing Winget PR Guidance..."
cat << 'EOF' > "${ROOT_DIR}/packaging/winget/PUBLISH_GUIDE.md"
# Publishing BharatCode Studio to Official Microsoft Winget Repository

Microsoft Winget requires submitting a Pull Request to `microsoft/winget-pkgs`:

1. Fork https://github.com/microsoft/winget-pkgs
2. Clone your fork locally:
   git clone https://github.com/Sreeju7733/winget-pkgs.git
3. Place manifest files into:
   `manifests/b/BharatCode/BharatCodeStudio/1.0.0/`
4. Copy `packaging/winget/BharatCode.BharatCodeStudio.yaml` into that directory.
5. Alternatively, run wingetcreate directly from Windows:
   `wingetcreate new https://github.com/Sreeju7733/bharatcode-studio/releases/download/v1.0.0/BharatCode-Studio-Setup-1.0.0.exe`
EOF

echo "==> Distribution packaging successfully staged!"

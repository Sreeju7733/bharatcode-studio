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

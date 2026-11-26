# BharatCode Studio Linux Package Repositories

This repository contains instructions and automated packaging pipelines for hosting signed `apt` (`.deb`) and `dnf`/`zypper` (`.rpm`) repositories for BharatCode Studio via `BharatCode-ai/repositories-linux`.

## Installation Instructions

### Debian / Ubuntu (`apt`)
```bash
# 1. Install GPG key
wget -qO - https://bharatcode-ai.github.io/repositories-linux/pub.gpg | gpg --dearmor | sudo dd of=/usr/share/keyrings/bharatcode-archive-keyring.gpg

# 2. Add repository source
echo 'deb [ signed-by=/usr/share/keyrings/bharatcode-archive-keyring.gpg ] https://bharatcode-ai.github.io/repositories-linux/debs /' | sudo tee /etc/apt/sources.list.d/bharatcode-studio.list

# 3. Update and install
sudo apt update
sudo apt install bharatcode-studio
```

### Fedora / RHEL / CentOS (`dnf`)
```bash
# 1. Add repository
sudo tee /etc/yum.repos.d/bharatcode-studio.repo << 'REPO'
[bharatcode-studio]
name=BharatCode Studio
baseurl=https://bharatcode-ai.github.io/repositories-linux/rpms/
enabled=1
gpgcheck=1
gpgkey=https://bharatcode-ai.github.io/repositories-linux/pub.gpg
REPO

# 2. Install
sudo dnf check-update
sudo dnf install bharatcode-studio
```

### openSUSE (`zypper`)
```bash
sudo zypper addrepo --gpgcheck https://bharatcode-ai.github.io/repositories-linux/rpms/ bharatcode-studio
sudo zypper refresh
sudo zypper install bharatcode-studio
```

### Arch Linux / Manjaro (`pacman` / `yay` / `paru`)
```bash
# Using yay or paru from AUR:
yay -S bharatcode-studio-bin

# Or using the direct pacman repository:
# Add to /etc/pacman.conf:
# [bharatcode]
# SigLevel = Optional TrustAll
# Server = https://bharatcode-ai.github.io/repositories-linux/arch/$arch
sudo pacman -Sy bharatcode-studio-bin
```

## Automated Dispatch Trigger

On every stable release built by `bharatcode-studio-builder`, a `repository_dispatch` event is triggered towards `BharatCode-ai/repositories-linux` with the release version and asset URLs.

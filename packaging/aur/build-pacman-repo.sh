#!/usr/bin/env bash
# Builds .pkg.tar.zst packages and updates Arch pacman repository database using repo-add
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_NAME="${REPO_NAME:-bharatcode}"
OUTPUT_DIR="${OUTPUT_DIR:-${SCRIPT_DIR}/pacman-repo}"

mkdir -p "${OUTPUT_DIR}"

echo "==> Building Arch package (.pkg.tar.zst) with makepkg..."
cd "${SCRIPT_DIR}"
# Run makepkg without root requirement or inside container/chroot
makepkg -f --nodeps --noconfirm

echo "==> Moving generated .pkg.tar.zst into pacman repository directory..."
mv ./*.pkg.tar.zst "${OUTPUT_DIR}/"

echo "==> Updating pacman repository database (${REPO_NAME}.db.tar.zst)..."
cd "${OUTPUT_DIR}"
repo-add -s -v "${REPO_NAME}.db.tar.zst" ./*.pkg.tar.zst || repo-add "${REPO_NAME}.db.tar.zst" ./*.pkg.tar.zst

echo "==> Pacman repository successfully built at ${OUTPUT_DIR}:"
ls -la "${OUTPUT_DIR}"

cask "bharatcode-studio" do
  arch arm: "arm64", intel: "x64"

  version "1.0.0"

  on_macos do
    sha256 arm:   :no_check,
           intel: :no_check

    url "https://github.com/BharatCode-ai/bharatcode-studio/releases/download/v#{version}/BharatCode-Studio-darwin-#{arch}-#{version}.dmg"
    name "BharatCode Studio"
    desc "Cross-platform AI code editor powered by BharatCode"
    homepage "https://bharatcode.ai"

    auto_updates true

    app "BharatCode Studio.app"
    binary "#{appdir}/BharatCode Studio.app/Contents/Resources/app/bin/bharatcode-studio", target: "bharatcode-studio"

    zap trash: [
      "~/.bharatcode-studio",
      "~/Library/Application Support/BharatCode Studio",
      "~/Library/Caches/ai.bharatcode.studio",
      "~/Library/Preferences/ai.bharatcode.studio.plist",
      "~/Library/Saved Application State/ai.bharatcode.studio.savedState",
    ]
  end

  on_linux do
    sha256 arm:   :no_check,
           intel: :no_check

    url "https://github.com/BharatCode-ai/bharatcode-studio/releases/download/v#{version}/bharatcode-studio-linux-#{arch}-#{version}.tar.gz"
    name "BharatCode Studio"
    desc "Cross-platform AI code editor powered by BharatCode"
    homepage "https://bharatcode.ai"

    binary "bin/bharatcode-studio"

    zap trash: [
      "~/.bharatcode-studio",
      "~/.config/BharatCode Studio",
    ]
  end
end

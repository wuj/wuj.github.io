source "https://rubygems.org"

gem "github-pages", "~> 232", group: :jekyll_plugins
gem "webrick", "~> 1.8", group: :development

# Quiets a notice that octokit's Faraday 2 stack prints on every local build.
# GitHub Pages builds with its own gem set and never reads this file, so this
# only affects local runs.
gem "faraday-retry", "~> 2.3", group: :development

# Windows only. Without it the file watcher cannot use directory change events
# and prints a notice asking for this gem on every `npm run site`. Bundler skips
# it on macOS and Linux, where the watcher already uses the system's own file
# event API.
gem "wdm", "~> 0.2", group: :development, platforms: [:windows]

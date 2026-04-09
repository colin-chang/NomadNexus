# Nomad Nexus

**A frosted glass Discord theme for BetterDiscord and Vencord.**

[![Release](https://img.shields.io/github/v/release/colin-chang/NomadNexus?label=release&color=4c8fd6)](https://github.com/colin-chang/NomadNexus/releases/latest)
[![License](https://img.shields.io/badge/license-Apache--2.0-blue)](LICENSE)
[![BetterDiscord](https://img.shields.io/badge/BetterDiscord-%E2%9C%93-5865f2)](https://betterdiscord.app)
[![Vencord](https://img.shields.io/badge/Vencord-%E2%9C%93-5865f2)](https://vencord.dev)

[中文](README.zh-CN.md) | English

![Dark mode](assets/previews/theme_dark.jpg)

![Light mode](assets/previews/theme_light.jpg)

---

## Features

- **Frosted glass design** — `backdrop-filter` blur and translucency across all UI components
- **GitHub-inspired palette** — accent blue `#4c8fd6` with matching syntax highlighting for code blocks
- **4 theme variants** — Light, Ash (dark), Dark (darker), and Onyx (midnight)
- **Fully customizable** — all colors, fonts, and backgrounds are controlled via CSS variables
- **Platform-specific styling** — dedicated CSS for BetterDiscord and Vencord plugin UIs
- Thin, hover-visible scrollbars
- macOS system font stack; Maple Mono NF CN for code blocks

---

## Installation

### BetterDiscord

1. Download [`NomadNexus-BetterDiscord.theme.css`](https://github.com/colin-chang/NomadNexus/releases/latest/download/NomadNexus-BetterDiscord.theme.css)
2. Place it in your BetterDiscord themes folder:
   - **Windows** — `%appdata%\BetterDiscord\themes`
   - **macOS** — `~/Library/Application Support/BetterDiscord/themes`
   - **Linux** — `~/.config/BetterDiscord/themes`
3. Enable the theme in **Settings → Themes**

### Vencord

#### Option A — Online (no download)

In **Settings → Vencord → Themes**, add the following URL:

```text
https://cdn.jsdelivr.net/gh/colin-chang/NomadNexus@1.0.2/NomadNexus-Vencord.css
```

#### Option B — Local file

1. Download [`NomadNexus-Vencord.css`](https://github.com/colin-chang/NomadNexus/releases/latest/download/NomadNexus-Vencord.css)
2. Place it in your Vencord themes folder:
   - **Windows** — `%appdata%\Vencord\themes`
   - **macOS** — `~/Library/Application Support/Vencord/themes`
   - **Linux** — `~/.config/Vencord/themes`
3. Enable the theme in **Settings → Vencord → Themes**

---

## Fonts

### UI Font

The UI font stack resolves automatically based on your OS — no installation needed.

| Platform | Effective font |
| --- | --- |
| macOS | SF Pro Text (system font via `-apple-system`) |
| Windows | Segoe UI (pre-installed) |
| Linux | Roboto → Helvetica → Arial |
| All | `gg sans` (Discord's bundled font, always loaded) |

> On macOS, `-apple-system` takes precedence over `gg sans`, giving native SF Pro rendering.

### Code Font

The code font stack is:

```text
'Maple Mono NF CN', Consolas, 'gg mono', 'Liberation Mono', Menlo, Courier, monospace
```

| Platform | Effective font (without Maple Mono NF CN) |
| --- | --- |
| Windows | Consolas (pre-installed) |
| macOS | Menlo (pre-installed) |
| Linux | Liberation Mono (common on most distros) |
| All | `gg mono` (Discord's bundled monospace font) |

**Maple Mono NF CN** is strongly recommended for the best experience — it provides full Chinese character coverage, Nerd Font icon glyphs, and a programming ligature set optimized for this theme.

#### Installing Maple Mono NF CN

Download from the [official GitHub Releases](https://github.com/subframe7536/maple-font/releases). Look for files named `MapleMono-NF-CN-*.zip` and install as below.

##### macOS

```bash
# Homebrew (recommended)
brew install --cask font-maple-mono-nf-cn
```

Or open the downloaded `.ttf` files with **Font Book** and click **Install**.

##### Windows

Right-click each `.ttf` file → **Install** (current user) or **Install for all users**.

##### Linux

```bash
mkdir -p ~/.local/share/fonts
cp MapleMono-NF-CN-*.ttf ~/.local/share/fonts/
fc-cache -fv
```

After installation, **restart Discord** for the font to take effect.

---

## Customization

The theme exposes CSS variables for easy personalization. Override them in your client's **Custom CSS** editor.

### Accent & Status Colors

```css
:root {
  --main-color:      #4c8fd6; /* primary accent */
  --hover-color:     #2266b0; /* hover state */
  --success-color:   #43b581;
  --danger-color:    #982929;

  --online-color:    #43b581;
  --idle-color:      #faa61a;
  --dnd-color:       #982929;
  --streaming-color: #593695;
  --offline-color:   #808080;
}
```

### Background

```css
:root {
  --background-image:           url(https://...); /* wallpaper (must be HTTPS) */
  --background-position:        center;
  --background-size:            cover;
  --background-attachment:      fixed;
  --background-filter:          saturate(1);      /* e.g. blur(4px) saturate(1.5) */
  --background-shading-percent: 100%;
}
```

### Font Variables

```css
:root {
  --main-font: 'gg sans', 'Helvetica Neue', sans-serif;
  --code-font: 'Maple Mono NF CN', Consolas, 'Liberation Mono', monospace;
}
```

### Per-theme Shading

Each Discord theme variant (Light / Ash / Dark / Onyx) has its own shading variables. Example for the Ash (dark) variant:

```css
:is(.theme-dark, .theme-light .theme-dark) {
  --background-shading: rgba(0, 0, 0, 0.4);
  --card-shading:        rgba(0, 0, 0, 0.2);
  --popout-shading:      rgba(0, 0, 0, 0.6);
  --modal-shading:       rgba(0, 0, 0, 0.4);
  --normal-text:         #d8d8db;
  --muted-text:          #aeaeb4;
}
```

> **Note** — Images used as default wallpapers are sourced from the internet. If any image infringes copyright, please [open an issue](https://github.com/colin-chang/NomadNexus/issues) to have it removed.

---

## Building from Source

### Prerequisites

- [Node.js](https://nodejs.org/) v22+
- npm v10+

### Build

```bash
npm install
npm run build   # compile to dist/ (compressed + autoprefixed)
npm run test    # compile to test/ (expanded, for development)
```

### Releasing a new version

```bash
# 1. Bump version, sync SCSS variables, build, commit, and tag — all in one command
npm version <patch|minor|major>

# 2. Push source and tag to trigger the CI release workflow
git push origin master --follow-tags
```

GitHub Actions will automatically compile the project and publish a new [GitHub Release](https://github.com/colin-chang/NomadNexus/releases) with the compiled CSS assets attached.

---

## Attribution

NomadNexus is a derivative work of [ClearVision v7](https://github.com/ClearVision/ClearVision-v7) by the ClearVision Team, used under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0). See [NOTICE](NOTICE) for full attribution details.

---

## License

[Apache License 2.0](LICENSE) © 2026 Colin Chang

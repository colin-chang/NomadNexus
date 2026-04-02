<div align="center">

# NomadNexus

Frosted glass Discord theme for BetterDiscord and Vencord.

Based on [ClearVision v7](https://github.com/ClearVision/ClearVision-v7) by the ClearVision Team.

</div>

## Features

- Frosted glass (backdrop-filter) design system across all UI components
- GitHub-inspired color palette with accent blue `#4c8fd6`
- Full support for Light, Ash, Dark, and Onyx theme variants
- GitHub Dark / Light syntax highlighting for code blocks
- Thin, hover-visible scrollbars
- macOS-optimized system font stack + Maple Mono NF CN for code
- Consistent styling for modals, popouts, context menus, and overlays

## Preview
#### Dark mode
![Dark mode](previews/theme_dark.jpg)

#### Light mode
![Light mode](previews/theme_light.jpg)

> Note: All images used in this theme are sourced from the internet. If there is any copyright infringement, please contact the author to have them removed immediately. Thank you for your feedback.

## Installing

### BetterDiscord

Download `NomadNexus-BetterDiscord.theme.css` and place it in your BetterDiscord themes folder:

- Windows: `%appdata%\betterdiscord\themes`
- macOS: `~/Library/Application Support/betterdiscord/themes`

### Vencord

Download `NomadNexus-Vencord.css` and place it in your Vencord themes folder:

- Windows: `%appdata%\vencord\themes`
- macOS: `~/Library/Application Support/vencord/themes`

## Customization

Override CSS variables in your custom CSS to personalize:

```css
:root {
  --main-color: #4c8fd6;       /* accent color */
  --hover-color: #2266b0;      /* hover accent */
  --background-image: url(...); /* background wallpaper */
  --main-font: 'Your Font', sans-serif;
  --code-font: 'Your Mono', monospace;
}
```

## Building from Source

```bash
pnpm install
pnpm run build    # compile to /public (minified) and /public-unminified
pnpm run test     # compile to /test for development
```

### Dependencies

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)

## Attribution

This project is a derivative of [ClearVision v7](https://github.com/ClearVision/ClearVision-v7), created by the ClearVision Team. Licensed under the [Apache License 2.0](LICENSE). See [NOTICE](NOTICE) for details.

## License

[Apache License 2.0](LICENSE)

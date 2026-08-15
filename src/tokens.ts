/**
 * Map a Catppuccin palette onto the DSH `--dsw-*` alias tokens tuned in the
 * live dynamic plugin (`catp-1` / `pkg-12`).
 * @module dsh-catppuccin/tokens
 */
import { latte, mocha, type CatppuccinPalette } from './palette.js'

/** One DSH theme token dictionary: CSS variable name → color. */
export type ThemeTokens = Record<string, string>

/** One override-layer value: both palette modes are mandatory. */
export interface ThemeTokenModes {
  readonly light: string
  readonly dark: string
}

/** Override-layer dictionary consumed by `theme.overrideTokens`. */
export type ThemeTokenOverrides = Record<string, ThemeTokenModes>

/**
 * Build the DSH alias/specific token set for one flavor.
 * @param palette - Mocha or Latte colors.
 * @returns tokens previously confirmed against the live Web GUI.
 */
export function tokensFromPalette(palette: CatppuccinPalette): ThemeTokens {
  return {
    '--dsw-alias-bg-base': palette.base,
    '--dsw-alias-bg-layer-1': palette.mantle,
    '--dsw-alias-bg-layer-2': palette.surface0,
    '--dsw-alias-bg-layer-3': palette.surface1,
    '--dsw-alias-bg-module-platform': palette.surface1,
    '--dsw-alias-bg-overlay': palette.surface1,
    '--dsw-alias-border-l1': palette.surface0,
    '--dsw-alias-border-l2': palette.surface2,
    '--dsw-alias-border-l2-darkmode-thin': palette.surface2,
    '--dsw-alias-brand-primary': palette.mauve,
    '--dsw-alias-brand-primary-new-colorprimary-new-color': palette.mauve,
    '--dsw-alias-button-primary-fill': palette.mauve,
    '--dsw-alias-button-primary-hover': palette.mauveHover,
    '--dsw-alias-button-primary-dimmed': palette.surface2,
    '--dsw-alias-button-info-fill': palette.mauve,
    '--dsw-alias-button-info-hover': palette.mauveHover,
    '--dsw-alias-button-elevated-fill': palette.surface0,
    '--dsw-alias-button-floating-fill': palette.surface2,
    '--dsw-alias-button-floating-hover': palette.surface1,
    '--dsw-alias-button-tool-bar-fill-invisible': palette.mantle,
    '--dsw-alias-button-tool-bar-fill': palette.surface0,
    '--dsw-alias-button-tool-bar-hover': palette.surface1,
    '--dsw-alias-label-primary': palette.text,
    '--dsw-alias-label-primary-bluish': palette.text,
    '--dsw-alias-label-primary-dimmed': palette.subtext0,
    '--dsw-alias-label-primary-foreground': palette.onMauve,
    '--dsw-alias-label-primary-inverted': palette.surface0,
    '--dsw-alias-label-secondary': palette.subtext1,
    '--dsw-alias-label-tertiary': palette.subtext0,
    '--dsw-alias-label-caption': palette.overlay2,
    '--dsw-alias-label-dimmed': palette.overlay0,
    '--dsw-alias-label-quaternary': palette.overlay0,
    '--dsw-alias-markdown-inline-code': palette.surface0,
    '--dsw-alias-markdown-code-block': palette.mantle,
    '--dsw-alias-markdown-code-block-banner': palette.surface0,
    '--dsw-alias-markdown-code-segment-selected': palette.surface1,
    '--dsw-alias-markdown-code-segment-unselected': palette.mantle,
    '--dsw-alias-markdown-citation': palette.surface0,
    '--dsw-alias-scrollbar-bg-l1': palette.surface1,
    '--dsw-alias-scrollbar-bg-l2': palette.surface2,
    '--dsw-alias-scrollbar-hover-l1': palette.surface2,
    '--dsw-alias-scrollbar-hover-l2': palette.overlay0,
    '--dsw-alias-state-business-primary': palette.mauve,
    '--dsw-alias-state-business-tertiary': palette.surface1,
    '--dsw-alias-state-error-primary': palette.red,
    '--dsw-alias-state-success-primary': palette.green,
    '--dsw-alias-state-warn-primary': palette.yellow,
    '--dsw-alias-tooltip-bg': palette.surface1,
    '--dsw-alias-interactive-bg-active': palette.surface2,
    '--dsw-alias-interactive-bg-hover': palette.surface1,
    '--dsw-alias-interactive-bg-hover-solid': palette.surface1,
    '--dsw-specific-bubble': palette.surface0,
    '--dsw-specific-selector': palette.surface0,
    '--dsw-static-neutral-bluish-00': palette.text,
    '--dsw-specific-input-major': palette.surface0,
    '--dsw-specific-tip': palette.surface0,
    '--dsw-specific-sidebar-fill': palette.mantle,
    '--dsw-specific-sidebar-nav-item-active': palette.surface1,
    '--dsw-specific-sidebar-nav-item-hover': palette.surface0,
    '--dsw-specific-sidebar-nav-item-active-accent': palette.mauve,
  }
}

/** Mocha token dictionary (dark theme id `catppuccin-mocha`). */
export const MOCHA_TOKENS: ThemeTokens = tokensFromPalette(mocha)

/** Latte token dictionary (light theme id `catppuccin-latte`). */
export const LATTE_TOKENS: ThemeTokens = tokensFromPalette(latte)

/**
 * Pair Mocha and Latte into an override layer so the built-in `light` /
 * `dark` / `system` preferences pick up Catppuccin without fighting the
 * durable settings schema (third-party theme ids are not persisted).
 */
export const TOKEN_OVERRIDES: ThemeTokenOverrides = Object.fromEntries(
  Object.keys(MOCHA_TOKENS).map((name) => {
    const light = LATTE_TOKENS[name]
    const dark = MOCHA_TOKENS[name]
    if (light === undefined || dark === undefined) {
      throw new Error(`token ${name} is missing from one Catppuccin flavor`)
    }
    return [name, { light, dark }]
  }),
)

/** Registered dark theme id. */
export const MOCHA_THEME_ID = 'catppuccin-mocha'

/** Registered light theme id. */
export const LATTE_THEME_ID = 'catppuccin-latte'

/** Override-layer identity consumed by `theme.overrideTokens`. */
export const OVERRIDE_SOURCE = 'dsh-catppuccin'

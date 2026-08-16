/**
 * Browser half: register Catppuccin Mocha / Latte and restyle the built-in
 * light/dark/system palettes through an override layer.
 * @module dsh-catppuccin/client
 */
import {
  LATTE_THEME_ID,
  LATTE_TOKENS,
  MOCHA_THEME_ID,
  MOCHA_TOKENS,
  OVERRIDE_SOURCE,
  TOKEN_OVERRIDES,
} from '../tokens.js'

export {
  LATTE_THEME_ID,
  LATTE_TOKENS,
  MOCHA_THEME_ID,
  MOCHA_TOKENS,
  OVERRIDE_SOURCE,
  TOKEN_OVERRIDES,
} from '../tokens.js'

export const inject = ['theme'] as const

/** Minimal Theme service face used by this plugin. */
interface ThemeService {
  register(definition: {
    id: string
    colorScheme: 'light' | 'dark'
    tokens: Record<string, string>
  }): () => void
  overrideTokens(
    source: string,
    tokens: Record<string, { light: string; dark: string }>,
  ): () => void
}

interface ThemeBrowserContext {
  theme: ThemeService
  effect(setup: () => void | (() => void), label?: string): void
}

/**
 * Register both flavors, then overlay them onto the active built-in theme so
 * the current `ui-theme.preference` (`light` / `dark` / `system`) keeps working
 * after reload. Third-party theme ids are not written to settings.
 * @param ctx - browser context with the theme service.
 */
export function apply(ctx: ThemeBrowserContext): void {
  ctx.effect(() => {
    const disposeMocha = ctx.theme.register({
      id: MOCHA_THEME_ID,
      colorScheme: 'dark',
      tokens: MOCHA_TOKENS,
    })
    const disposeLatte = ctx.theme.register({
      id: LATTE_THEME_ID,
      colorScheme: 'light',
      tokens: LATTE_TOKENS,
    })
    const disposeOverride = ctx.theme.overrideTokens(OVERRIDE_SOURCE, TOKEN_OVERRIDES)

    return () => {
      disposeOverride()
      disposeLatte()
      disposeMocha()
    }
  }, 'dsh-catppuccin-theme')
}

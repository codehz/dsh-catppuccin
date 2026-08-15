/**
 * Host half of the Catppuccin theme plugin.
 *
 * The Loader row exists so `dsh-client-modules` can scan `dsh.client` and
 * serve the browser bundle. Theme registration is client-only.
 * @module dsh-catppuccin
 */
export { latte, mocha } from './palette.js'
export type { CatppuccinPalette } from './palette.js'
export {
  LATTE_THEME_ID,
  LATTE_TOKENS,
  MOCHA_THEME_ID,
  MOCHA_TOKENS,
  OVERRIDE_SOURCE,
  TOKEN_OVERRIDES,
  tokensFromPalette,
} from './tokens.js'
export type { ThemeTokenModes, ThemeTokenOverrides, ThemeTokens } from './tokens.js'

export const name = 'catppuccin'

/** No Host services: the browser half owns the theme registry. */
export function apply(): void {}

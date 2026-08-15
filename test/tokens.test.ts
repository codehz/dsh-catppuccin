import { describe, expect, test } from 'bun:test'
import { latte, mocha } from '../src/palette.js'
import {
  LATTE_THEME_ID,
  LATTE_TOKENS,
  MOCHA_THEME_ID,
  MOCHA_TOKENS,
  TOKEN_OVERRIDES,
  tokensFromPalette,
} from '../src/tokens.js'

describe('Catppuccin token mapping', () => {
  test('Mocha keeps the tuned Mauve accent and surface ladder', () => {
    expect(MOCHA_THEME_ID).toBe('catppuccin-mocha')
    expect(MOCHA_TOKENS['--dsw-alias-brand-primary']).toBe('#cba6f7')
    expect(MOCHA_TOKENS['--dsw-alias-button-primary-fill']).toBe('#cba6f7')
    expect(MOCHA_TOKENS['--dsw-alias-button-primary-hover']).toBe('#d8b4fe')
    expect(MOCHA_TOKENS['--dsw-alias-bg-base']).toBe(mocha.base)
    expect(MOCHA_TOKENS['--dsw-alias-bg-layer-1']).toBe(mocha.mantle)
    expect(MOCHA_TOKENS['--dsw-alias-bg-layer-2']).toBe(mocha.surface0)
    expect(MOCHA_TOKENS['--dsw-specific-bubble']).toBe(mocha.surface0)
    expect(MOCHA_TOKENS['--dsw-specific-input-major']).toBe(mocha.surface0)
    expect(MOCHA_TOKENS['--dsw-specific-sidebar-nav-item-active-accent']).toBe(mocha.surface1)
  })

  test('Latte is the light counterpart with the same token keys', () => {
    expect(LATTE_THEME_ID).toBe('catppuccin-latte')
    expect(Object.keys(LATTE_TOKENS)).toEqual(Object.keys(MOCHA_TOKENS))
    expect(LATTE_TOKENS['--dsw-alias-brand-primary']).toBe(latte.mauve)
    expect(LATTE_TOKENS['--dsw-alias-bg-base']).toBe(latte.base)
    expect(LATTE_TOKENS['--dsw-alias-label-primary']).toBe(latte.text)
  })

  test('override layer pairs every token for both schemes', () => {
    expect(Object.keys(TOKEN_OVERRIDES)).toEqual(Object.keys(MOCHA_TOKENS))
    expect(TOKEN_OVERRIDES['--dsw-alias-brand-primary']).toEqual({
      light: latte.mauve,
      dark: mocha.mauve,
    })
  })

  test('tokensFromPalette is a pure mapping of the same keys', () => {
    expect(tokensFromPalette(mocha)).toEqual(MOCHA_TOKENS)
    expect(tokensFromPalette(latte)).toEqual(LATTE_TOKENS)
  })
})

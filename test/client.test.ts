import { describe, expect, test } from 'bun:test'
import { apply } from '../src/client/index.js'
import {
  LATTE_THEME_ID,
  MOCHA_THEME_ID,
  OVERRIDE_SOURCE,
  TOKEN_OVERRIDES,
} from '../src/tokens.js'

describe('Catppuccin client lifecycle', () => {
  test('keeps registrations active until the Cordis effect is disposed', () => {
    const events: string[] = []
    let cleanup: (() => void) | undefined

    apply({
      theme: {
        register(definition) {
          events.push(`register:${definition.id}`)
          return () => events.push(`dispose:${definition.id}`)
        },
        overrideTokens(source, tokens) {
          expect(source).toBe(OVERRIDE_SOURCE)
          expect(tokens).toBe(TOKEN_OVERRIDES)
          events.push(`override:${source}`)
          return () => events.push(`dispose-override:${source}`)
        },
      },
      effect(setup, label) {
        expect(label).toBe('dsh-catppuccin-theme')
        const result = setup()
        cleanup = typeof result === 'function' ? result : undefined
      },
    })

    expect(events).toEqual([
      `register:${MOCHA_THEME_ID}`,
      `register:${LATTE_THEME_ID}`,
      `override:${OVERRIDE_SOURCE}`,
    ])

    expect(cleanup).toBeFunction()
    cleanup?.()
    expect(events.slice(3)).toEqual([
      `dispose-override:${OVERRIDE_SOURCE}`,
      `dispose:${LATTE_THEME_ID}`,
      `dispose:${MOCHA_THEME_ID}`,
    ])
  })
})

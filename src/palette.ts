/**
 * Official Catppuccin flavor colors plus the hover mauve used by DSH buttons.
 * @module dsh-catppuccin/palette
 */

/** One Catppuccin flavor mapped onto DSH surface / accent roles. */
export interface CatppuccinPalette {
  readonly crust: string
  readonly mantle: string
  readonly base: string
  readonly surface0: string
  readonly surface1: string
  readonly surface2: string
  readonly overlay0: string
  readonly overlay1: string
  readonly overlay2: string
  readonly subtext0: string
  readonly subtext1: string
  readonly text: string
  readonly mauve: string
  /** Brighter (Mocha) or deeper (Latte) mauve for primary-button hover. */
  readonly mauveHover: string
  readonly red: string
  readonly green: string
  readonly yellow: string
  /** Foreground on a mauve fill — dark on Mocha, light on Latte. */
  readonly onMauve: string
}

/** Catppuccin Mocha. Accent is Mauve `#cba6f7`. */
export const mocha: CatppuccinPalette = {
  crust: '#11111b',
  mantle: '#181825',
  base: '#1e1e2e',
  surface0: '#313244',
  surface1: '#45475a',
  surface2: '#585b70',
  overlay0: '#6c7086',
  overlay1: '#7f849c',
  overlay2: '#9399b2',
  subtext0: '#a6adc8',
  subtext1: '#bac2de',
  text: '#cdd6f4',
  mauve: '#cba6f7',
  mauveHover: '#d8b4fe',
  red: '#f38ba8',
  green: '#a6e3a1',
  yellow: '#f9e2af',
  onMauve: '#1e1e2e',
}

/** Catppuccin Latte. Accent is Mauve `#8839ef`. */
export const latte: CatppuccinPalette = {
  crust: '#dce0e8',
  mantle: '#e6e9ef',
  base: '#eff1f5',
  surface0: '#ccd0da',
  surface1: '#bcc0cc',
  surface2: '#acb0be',
  overlay0: '#9ca0b0',
  overlay1: '#8c8fa1',
  overlay2: '#7c7f93',
  subtext0: '#6c6f85',
  subtext1: '#5c5f77',
  text: '#4c4f69',
  mauve: '#8839ef',
  mauveHover: '#7226d4',
  red: '#d20f39',
  green: '#40a02b',
  yellow: '#df8e1d',
  onMauve: '#eff1f5',
}

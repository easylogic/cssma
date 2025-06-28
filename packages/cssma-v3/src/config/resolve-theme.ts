import { CssmaConfig, CssmaTheme, CssmaPreset } from '../theme-types';
import { defaultTheme } from './defaults';
import { extendTheme } from './extend';

export function resolveTheme(config: CssmaConfig): CssmaTheme {
  let theme: CssmaTheme = { ...defaultTheme };
  if (config.presets) {
    for (const preset of config.presets) {
      theme = extendTheme(theme, preset.theme);
    }
  }
  if (config.theme) {
    theme = extendTheme(theme, config.theme);
  }
  return theme;
} 
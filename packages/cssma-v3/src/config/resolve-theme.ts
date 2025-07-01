import { CssmaConfig, CssmaTheme } from '../theme-types';
import { defaultTheme } from './defaults';
import { deepMerge, shallowMerge } from './merge-utils';

export function resolveTheme(config: CssmaConfig): CssmaTheme {
  let theme: CssmaTheme = { ...defaultTheme };

  // 1. presets: deep merge (확장)
  if (config.presets) {
    for (const preset of config.presets) {
      if (preset.theme) {
        theme = deepMerge(theme, preset.theme);
      }
    }
  }

  // 2. theme: override(덮어쓰기) + extend(확장) 분리
  if (config.theme) {
    const { extend, ...overrideTheme } = config.theme as any;
    theme = shallowMerge(theme, overrideTheme);
    if (extend) {
      theme = deepMerge(theme, extend);
    }
  }

  return theme;
} 
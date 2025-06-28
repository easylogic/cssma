import { CssmaTheme, CssmaPreset, CssmaConfig } from '../theme-types';

// 내부 딥 머지 유틸리티 (외부 노출 X)
function deepMerge<T>(base: T, override: Partial<T>): T {
  const result = { ...base };
  for (const key in override) {
    if (
      override[key] &&
      typeof override[key] === 'object' &&
      !Array.isArray(override[key])
    ) {
      result[key] = deepMerge((base as any)[key] || {}, (override as any)[key]);
    } else {
      result[key] = override[key] as any;
    }
  }
  return result;
}

export function extendTheme(base: CssmaTheme, override: Partial<CssmaTheme>): CssmaTheme {
  return deepMerge(base, override);
}

export function extendPreset(base: CssmaPreset, override: Partial<CssmaPreset>): CssmaPreset {
  return deepMerge(base, override);
}

export function extendConfig(base: CssmaConfig, override: Partial<CssmaConfig>): CssmaConfig {
  return deepMerge(base, override);
} 
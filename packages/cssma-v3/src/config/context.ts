import { CssmaConfig, CssmaContext } from '../theme-types';
import { resolveTheme } from './resolve-theme';
import { theme as themeGetter } from './theme-getter';
import { configGetter } from './get-config-value';

export function createContext(configObj: CssmaConfig): CssmaContext {
  const themeObj = resolveTheme(configObj);
  return {
    theme: (...args) => themeGetter(themeObj, ...args),
    config: (...args) => configGetter(configObj, ...args),
    plugins: configObj.plugins ?? [],
  };
}
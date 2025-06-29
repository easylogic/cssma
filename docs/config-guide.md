# 📚 cssma-v3 Configuration System: Guide to config, preset, theme, and context

---

## 1. Theme (CssmaTheme)
- **Purpose:** A collection of design tokens (colors, fonts, spacing, etc.) in the style of Tailwind.
- **Structure:**
  ```ts
  export interface CssmaTheme {
    colors: ColorPalette;
    fontFamily: Record<string, string>;
    spacing: Record<string | number, string>;
    // ... other tokens
  }
  ```
- **Example:**
  ```ts
  import { defaultColorPalette } from './color-palette';

  export const defaultTheme: CssmaTheme = {
    colors: defaultColorPalette,
    fontFamily: { sans: 'Inter, sans-serif' },
    spacing: { 0: '0px', 1: '0.25rem' },
    // ... other tokens
  };
  ```

---

## 2. Preset (CssmaPreset)
- **Purpose:** A shareable/extendable unit that bundles a theme, name, and description.
- **Structure:**
  ```ts
  export interface CssmaPreset {
    name: string;
    theme: CssmaTheme;
    description?: string;
    // ... other options
  }
  ```
- **Example:**
  ```ts
  import { defaultTheme } from './defaults';

  export const defaultPreset: CssmaPreset = {
    name: 'default',
    theme: defaultTheme,
    description: 'Default Cssma preset',
  };
  ```

---

## 3. Config (CssmaConfig)
- **Purpose:** Global build/runtime configuration (presets, theme, plugins, prefix, etc.)
- **Structure:**
  ```ts
  export interface CssmaConfig {
    mode?: 'jit' | 'aot';
    prefix?: string;
    corePlugins?: string[];
    presets?: CssmaPreset[];
    theme?: CssmaTheme;
    plugins?: any[];
    // ... other options
  }
  ```
- **Example:**
  ```ts
  import { defaultPreset, defaultTheme } from './defaults';

  export const defaultConfig: CssmaConfig = {
    mode: 'jit',
    prefix: '',
    corePlugins: ['colors', 'spacing', 'fontFamily'],
    presets: [defaultPreset],
    theme: defaultTheme,
  };
  ```

---

## 4. Context (CssmaContext)
- **Purpose:** A runtime object for parsers/generators/plugins to access theme, config, and plugins.
- **How to create:**
  ```ts
  import { createContext } from '../src/config/context';
  import { defaultConfig } from '../src/config/defaults';

  const context = createContext(defaultConfig);
  // context.theme('colors.red.500') → '#ef4444'
  // context.config('prefix') → ''
  // context.plugins → []
  ```
- **Key methods:**
  - `context.theme(path: string)`  → Get theme token value (e.g. 'colors.red.500')
  - `context.config(path: string)` → Get config value (e.g. 'prefix', 'theme.colors.red.500')
  - `context.plugins`              → Plugin array

---

## 5. Extending/Customizing Preset/Theme/Config

- **Extend theme:**
  ```ts
  import { extendTheme } from './extend';
  const myTheme = extendTheme(defaultTheme, { colors: { brand: '#123456' } });
  ```
- **Extend preset:**
  ```ts
  import { extendPreset } from './extend';
  const myPreset = extendPreset(defaultPreset, { name: 'my', theme: myTheme });
  ```
- **Extend config:**
  ```ts
  import { extendConfig } from './extend';
  const myConfig = extendConfig(defaultConfig, { theme: myTheme, prefix: 'tw-' });
  ```

---

## 6. Test/Practical Example

```ts
import { createContext } from '../../src/config/context';
import { defaultConfig } from '../../src/config/defaults';

const context = createContext(defaultConfig);

expect(context.theme('colors.red.500')).toBe('#ef4444');
expect(context.config('prefix')).toBe('');
```

---

## 7. Reference Files
- `/src/config/defaults.ts` : Default theme, preset, config definitions
- `/src/config/context.ts` : Context creation function
- `/src/config/extend.ts` : Extension utilities
- `/src/config/color-palette.ts` : Color palette
- `/tests/config/context.test.ts` : Context behavior test example

---

**Use this guide to consistently create, extend, and test config, preset, theme, and context in your cssma-v3 project!** 
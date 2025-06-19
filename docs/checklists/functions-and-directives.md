# Functions and Directives Implementation Checklist

## Overview
This checklist covers the complete implementation of Tailwind CSS v4.1 functions and directives, based on the official documentation from https://tailwindcss.com/docs/functions-and-directives.

**Key Features from v4.1:**
- CSS-first configuration with `@theme` directive
- Custom utilities with `@utility` directive
- Source file registration with `@source` directive
- Variant management with `@variant` and `@custom-variant`
- Build-time functions (`--alpha()`, `--spacing()`)
- Legacy compatibility functions

**Special Considerations for Project-Specific Themes:**
- Multi-brand theming strategies
- Design system integration
- Component library theme management
- Dynamic theme switching
- Performance optimization for large themes

## 📋 Implementation Progress: 0/85 items

---

## 1. Core Directives
**Priority: High | Items: 25/25**

### 1.1 @import Directive
- [ ] **Basic Import** - Import Tailwind CSS itself
  ```css
  @import "tailwindcss";
  ```
  - **Test**: Verify Tailwind utilities are available
  - **Success**: All default utilities work correctly

- [ ] **CSS File Imports** - Import additional CSS files
  ```css
  @import "tailwindcss";
  @import "./components.css";
  @import "./utilities.css";
  @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap");
  ```
  - **Test**: All imported styles are included in build
  - **Success**: External styles load without conflicts

- [ ] **Import with Options** - Configure import behavior
  ```css
  @import "tailwindcss" source("./src");
  @import "tailwindcss" source(none); /* Disable auto-detection */
  ```
  - **Test**: Import options work as expected
  - **Success**: Source detection behavior matches configuration

### 1.2 @theme Directive
- [ ] **Basic Theme Definition** - Define custom design tokens
  ```css
  @theme {
    --font-display: "Satoshi", "sans-serif";
    --breakpoint-3xl: 120rem;
    --color-brand-100: oklch(0.99 0 0);
    --color-brand-500: oklch(0.84 0.18 117.33);
    --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
  }
  ```
  - **Test**: Theme variables generate corresponding utilities
  - **Success**: `font-display`, `text-3xl`, `bg-brand-500`, `ease-fluid` classes work

- [ ] **Color System Definition** - Complete color palette setup
  ```css
  @theme {
    /* Primary Brand Colors */
    --color-primary-50: oklch(0.98 0.02 240);
    --color-primary-100: oklch(0.95 0.05 240);
    --color-primary-200: oklch(0.90 0.10 240);
    --color-primary-300: oklch(0.82 0.15 240);
    --color-primary-400: oklch(0.70 0.20 240);
    --color-primary-500: oklch(0.60 0.25 240);
    --color-primary-600: oklch(0.50 0.25 240);
    --color-primary-700: oklch(0.40 0.20 240);
    --color-primary-800: oklch(0.30 0.15 240);
    --color-primary-900: oklch(0.20 0.10 240);
    --color-primary-950: oklch(0.15 0.05 240);
    
    /* Secondary Colors */
    --color-secondary-50: oklch(0.98 0.02 120);
    --color-secondary-500: oklch(0.60 0.25 120);
    --color-secondary-900: oklch(0.20 0.10 120);
    
    /* Semantic Colors */
    --color-success-500: oklch(0.65 0.15 145);
    --color-warning-500: oklch(0.75 0.15 85);
    --color-error-500: oklch(0.55 0.25 25);
    --color-info-500: oklch(0.60 0.20 220);
  }
  ```
  - **Test**: All color variants generate utilities (bg-, text-, border-, etc.)
  - **Success**: Complete color system with semantic naming

- [ ] **Typography System Definition** - Font and text settings
  ```css
  @theme {
    /* Font Families */
    --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
    --font-serif: "Crimson Pro", ui-serif, Georgia, serif;
    --font-mono: "JetBrains Mono", ui-monospace, Consolas, monospace;
    --font-display: "Satoshi", var(--font-sans);
    
    /* Font Sizes - with line heights */
    --font-size-xs: 0.75rem;
    --line-height-xs: 1rem;
    --font-size-sm: 0.875rem;
    --line-height-sm: 1.25rem;
    --font-size-base: 1rem;
    --line-height-base: 1.5rem;
    --font-size-lg: 1.125rem;
    --line-height-lg: 1.75rem;
    --font-size-xl: 1.25rem;
    --line-height-xl: 1.75rem;
    --font-size-2xl: 1.5rem;
    --line-height-2xl: 2rem;
    --font-size-3xl: 1.875rem;
    --line-height-3xl: 2.25rem;
    --font-size-4xl: 2.25rem;
    --line-height-4xl: 2.5rem;
    --font-size-5xl: 3rem;
    --line-height-5xl: 1;
    
    /* Letter Spacing */
    --letter-spacing-tight: -0.025em;
    --letter-spacing-normal: 0em;
    --letter-spacing-wide: 0.025em;
  }
  ```
  - **Test**: Typography utilities work with custom definitions
  - **Success**: `font-display`, `text-lg`, `tracking-tight` work correctly

- [ ] **Spacing System Definition** - Margin, padding, gap values
  ```css
  @theme {
    /* Base spacing unit */
    --spacing: 0.25rem; /* 4px base */
    
    /* Custom spacing values */
    --spacing-xs: 0.5rem;
    --spacing-sm: 0.75rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;
    --spacing-3xl: 4rem;
    
    /* Component-specific spacing */
    --spacing-button-x: 1rem;
    --spacing-button-y: 0.5rem;
    --spacing-card: 1.5rem;
    --spacing-section: 4rem;
  }
  ```
  - **Test**: Spacing utilities use custom values
  - **Success**: `p-md`, `gap-button-x`, `space-y-section` work

- [ ] **Breakpoint System Definition** - Responsive breakpoints
  ```css
  @theme {
    /* Standard breakpoints */
    --breakpoint-xs: 20rem;     /* 320px */
    --breakpoint-sm: 40rem;     /* 640px */
    --breakpoint-md: 48rem;     /* 768px */
    --breakpoint-lg: 64rem;     /* 1024px */
    --breakpoint-xl: 80rem;     /* 1280px */
    --breakpoint-2xl: 96rem;    /* 1536px */
    --breakpoint-3xl: 120rem;   /* 1920px */
    
    /* Container query breakpoints */
    --container-xs: 20rem;
    --container-sm: 24rem;
    --container-md: 28rem;
    --container-lg: 32rem;
    --container-xl: 36rem;
    --container-2xl: 42rem;
    
    /* Custom project breakpoints */
    --breakpoint-tablet: 48rem;
    --breakpoint-desktop: 64rem;
    --breakpoint-wide: 90rem;
  }
  ```
  - **Test**: Responsive and container utilities work
  - **Success**: `3xl:text-xl`, `@md:text-lg`, `tablet:grid-cols-2` work

### 1.3 Multi-Project Theme Strategies
- [ ] **Brand-Specific Themes** - Multiple brand support
  ```css
  /* Brand A Theme */
  @theme {
    --color-brand-primary: oklch(0.60 0.25 240); /* Blue */
    --color-brand-secondary: oklch(0.65 0.15 145); /* Green */
    --font-brand: "Roboto", sans-serif;
    --border-radius-brand: 0.5rem;
  }
  
  /* Brand B Theme - separate CSS file */
  @theme {
    --color-brand-primary: oklch(0.55 0.25 25); /* Red */
    --color-brand-secondary: oklch(0.75 0.15 85); /* Orange */
    --font-brand: "Open Sans", sans-serif;
    --border-radius-brand: 0.25rem;
  }
  ```
  - **Test**: Switch between brand themes
  - **Success**: Brand-specific utilities work for each theme

- [ ] **Component Library Themes** - Reusable component theming
  ```css
  @theme {
    /* Button Component Theme */
    --button-height-sm: 2rem;
    --button-height-md: 2.5rem;
    --button-height-lg: 3rem;
    --button-padding-x-sm: 0.75rem;
    --button-padding-x-md: 1rem;
    --button-padding-x-lg: 1.5rem;
    
    /* Card Component Theme */
    --card-padding: 1.5rem;
    --card-border-radius: 0.75rem;
    --card-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    
    /* Form Component Theme */
    --input-height: 2.5rem;
    --input-border-radius: 0.375rem;
    --input-border-width: 1px;
  }
  ```
  - **Test**: Component-specific utilities work
  - **Success**: `h-button-md`, `p-card`, `rounded-card` utilities available

- [ ] **Dark Mode Theme Integration** - Theme variables for dark mode
  ```css
  @theme {
    /* Light mode colors */
    --color-background: oklch(1 0 0);
    --color-foreground: oklch(0.15 0 0);
    --color-muted: oklch(0.96 0 0);
    --color-muted-foreground: oklch(0.45 0 0);
    
    /* Dark mode colors */
    --color-background-dark: oklch(0.15 0 0);
    --color-foreground-dark: oklch(0.98 0 0);
    --color-muted-dark: oklch(0.2 0 0);
    --color-muted-foreground-dark: oklch(0.6 0 0);
  }
  ```
  - **Test**: Dark mode theme variables work with `dark:` variants
  - **Success**: Seamless light/dark theme switching

### 1.4 Advanced Theme Techniques
- [ ] **Dynamic Theme Variables** - Runtime theme switching
  ```css
  @theme {
    /* Use CSS custom properties for dynamic themes */
    --color-primary: var(--dynamic-primary, oklch(0.60 0.25 240));
    --color-secondary: var(--dynamic-secondary, oklch(0.65 0.15 145));
    --font-display: var(--dynamic-font, "Inter", sans-serif);
  }
  ```
  ```javascript
  // Runtime theme switching
  function switchTheme(theme) {
    const root = document.documentElement;
    root.style.setProperty('--dynamic-primary', theme.primary);
    root.style.setProperty('--dynamic-secondary', theme.secondary);
    root.style.setProperty('--dynamic-font', theme.font);
  }
  ```
  - **Test**: Runtime theme switching works
  - **Success**: Themes change without page reload

- [ ] **Design Token Integration** - Import from design systems
  ```css
  @theme {
    /* Import from design tokens JSON */
    --color-primary-50: var(--tokens-color-primary-50);
    --color-primary-100: var(--tokens-color-primary-100);
    /* ... generated from tokens */
    
    /* Or use build-time token transformation */
    --font-heading: var(--design-system-typography-heading);
    --spacing-base: var(--design-system-spacing-unit);
  }
  ```
  - **Test**: Design tokens integrate with theme
  - **Success**: Design system values generate utilities

---

## 2. Utility and Variant Directives
**Priority: High | Items: 20/20**

### 2.1 @utility Directive
- [ ] **Basic Custom Utilities** - Add project-specific utilities
  ```css
  @utility tab-4 {
    tab-size: 4;
  }
  
  @utility tab-8 {
    tab-size: 8;
  }
  
  @utility scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  @utility scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  ```
  - **Test**: Custom utilities work with variants
  - **Success**: `hover:tab-4`, `lg:scrollbar-hide` work

- [ ] **Parameterized Utilities** - Utilities with arbitrary values
  ```css
  @utility text-shadow {
    text-shadow: --value(0 1px 2px rgb(0 0 0 / 0.05));
  }
  
  @utility backdrop-blur {
    backdrop-filter: blur(--value(8px));
  }
  
  @utility grid-cols {
    grid-template-columns: repeat(--value(1), minmax(0, 1fr));
  }
  ```
  - **Test**: Arbitrary values work with custom utilities
  - **Success**: `text-shadow-[0_2px_4px_rgb(0_0_0_/_0.1)]`, `backdrop-blur-[12px]` work

- [ ] **Component-Style Utilities** - Complex utility patterns
  ```css
  @utility btn-primary {
    @apply bg-blue-600 text-white px-4 py-2 rounded font-medium;
    @apply hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500;
    @apply disabled:opacity-50 disabled:cursor-not-allowed;
  }
  
  @utility card {
    @apply bg-white rounded-lg shadow border p-6;
    @apply dark:bg-gray-800 dark:border-gray-700;
  }
  ```
  - **Test**: Component utilities work with variants
  - **Success**: `btn-primary`, `hover:card` apply all styles

### 2.2 @variant Directive
- [ ] **Apply Variants to Custom CSS** - Use Tailwind variants in CSS
  ```css
  .custom-element {
    background: white;
    color: black;
    
    @variant dark {
      background: black;
      color: white;
    }
    
    @variant hover {
      transform: scale(1.05);
    }
    
    @variant lg {
      font-size: 1.125rem;
    }
  }
  ```
  - **Test**: Variants apply correctly to custom CSS
  - **Success**: `dark:`, `hover:`, `lg:` states work

- [ ] **Complex Variant Combinations** - Multiple variants together
  ```css
  .interactive-card {
    @apply bg-white p-6 rounded-lg;
    
    @variant hover {
      @apply shadow-lg transform scale-105;
    }
    
    @variant focus-within {
      @apply ring-2 ring-blue-500;
    }
    
    @variant dark {
      @apply bg-gray-800 text-white;
      
      @variant hover {
        @apply bg-gray-700;
      }
    }
  }
  ```
  - **Test**: Nested and combined variants work
  - **Success**: `dark:hover:` combinations apply correctly

### 2.3 @custom-variant Directive
- [ ] **Data Attribute Variants** - Custom data-based variants
  ```css
  @custom-variant theme-dark (&:where([data-theme="dark"] *));
  @custom-variant theme-light (&:where([data-theme="light"] *));
  @custom-variant loading (&[data-loading="true"]);
  @custom-variant expanded (&[aria-expanded="true"]);
  ```
  - **Test**: Custom variants work with utilities
  - **Success**: `theme-dark:bg-gray-900`, `loading:opacity-50` work

- [ ] **State-Based Variants** - Component state variants
  ```css
  @custom-variant error (&[data-error="true"], &:invalid);
  @custom-variant success (&[data-success="true"], &:valid);
  @custom-variant pending (&[data-pending="true"]);
  @custom-variant disabled (&[disabled], &[aria-disabled="true"]);
  ```
  - **Test**: State variants work across different triggers
  - **Success**: Error/success/pending states work consistently

- [ ] **Context-Based Variants** - Parent context variants
  ```css
  @custom-variant sidebar-open (.sidebar-open &);
  @custom-variant mobile-menu-open (.mobile-menu-open &);
  @custom-variant user-preference-reduced-motion (@media (prefers-reduced-motion: reduce));
  ```
  - **Test**: Context variants respond to parent states
  - **Success**: Contextual styling works correctly

### 2.4 @apply Directive
- [ ] **Basic Utility Application** - Apply utilities in CSS
  ```css
  .btn {
    @apply px-4 py-2 font-semibold rounded-lg;
  }
  
  .card {
    @apply bg-white shadow-md rounded-lg p-6;
  }
  
  .link {
    @apply text-blue-600 hover:text-blue-800 underline;
  }
  ```
  - **Test**: Applied utilities work correctly
  - **Success**: All utility styles are applied

- [ ] **Complex Apply Patterns** - Advanced @apply usage
  ```css
  .form-input {
    @apply w-full px-3 py-2 border border-gray-300 rounded-md;
    @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
    @apply disabled:bg-gray-100 disabled:cursor-not-allowed;
    @apply dark:bg-gray-800 dark:border-gray-600 dark:text-white;
  }
  
  .responsive-grid {
    @apply grid grid-cols-1 gap-4;
    @apply sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4;
  }
  ```
  - **Test**: Complex apply patterns work
  - **Success**: All variants and combinations apply correctly

---

## 3. Source Management Directives
**Priority: Medium | Items: 15/15**

### 3.1 @source Directive
- [ ] **External Source Registration** - Include external component libraries
  ```css
  @import "tailwindcss";
  
  /* Include external UI libraries */
  @source "../node_modules/@headlessui/react";
  @source "../node_modules/@radix-ui/react-*";
  @source "../shared/components";
  ```
  - **Test**: External sources are scanned for classes
  - **Success**: Classes from external libraries are available

- [ ] **Monorepo Source Management** - Multi-package source handling
  ```css
  /* In packages/ui/styles.css */
  @import "tailwindcss" source("../../src");
  @source "../shared";
  @source "../common";
  @source "../themes";
  
  /* In packages/admin/styles.css */
  @import "tailwindcss" source("../../admin-src");
  @source "../ui/components";
  @source "../shared";
  ```
  - **Test**: Monorepo packages share classes correctly
  - **Success**: Cross-package class usage works

- [ ] **Source Exclusion** - Ignore irrelevant directories
  ```css
  @import "tailwindcss";
  
  /* Exclude large directories that don't use Tailwind */
  @source not "../docs";
  @source not "../legacy";
  @source not "../third-party";
  @source not "../node_modules/react";
  ```
  - **Test**: Excluded sources don't affect build performance
  - **Success**: Build time is optimized, functionality intact

### 3.2 Advanced Source Configuration
- [ ] **Conditional Source Loading** - Environment-based sources
  ```css
  /* Development - include all sources */
  @import "tailwindcss";
  @source "../src";
  @source "../components";
  @source "../examples";
  
  /* Production - minimal sources */
  @import "tailwindcss" source(none);
  @source "../src/components";
  @source "../src/pages";
  ```
  - **Test**: Environment-specific source loading works
  - **Success**: Development has full features, production is optimized

- [ ] **Dynamic Source Registration** - Runtime source management
  ```css
  /* Base sources */
  @import "tailwindcss";
  @source "../core";
  
  /* Plugin-based sources */
  @source "../plugins/*/components";
  @source "../themes/*/styles";
  ```
  - **Test**: Dynamic sources are discovered correctly
  - **Success**: Plugin and theme sources are included

---

## 4. Build-Time Functions
**Priority: Medium | Items: 15/15**

### 4.1 --alpha() Function
- [ ] **Color Opacity Adjustment** - Modify color transparency
  ```css
  .custom-overlay {
    background-color: --alpha(var(--color-black) / 50%);
    border-color: --alpha(var(--color-blue-500) / 25%);
  }
  
  .notification {
    background: --alpha(var(--color-red-500) / 10%);
    color: --alpha(var(--color-red-900) / 90%);
  }
  ```
  - **Test**: Alpha function compiles to correct CSS
  - **Success**: `color-mix()` functions work in browsers

- [ ] **Dynamic Alpha Values** - Variable opacity
  ```css
  .fade-element {
    color: --alpha(var(--color-text) / var(--opacity-level, 100%));
    background: --alpha(var(--color-background) / var(--bg-opacity, 50%));
  }
  ```
  - **Test**: Variable alpha values work
  - **Success**: Dynamic opacity changes work correctly

### 4.2 --spacing() Function
- [ ] **Spacing Scale Usage** - Use theme spacing values
  ```css
  .custom-component {
    margin: --spacing(4);
    padding: --spacing(6) --spacing(4);
    gap: --spacing(2);
  }
  
  .responsive-spacing {
    padding: --spacing(2);
    
    @media (min-width: 768px) {
      padding: --spacing(4);
    }
    
    @media (min-width: 1024px) {
      padding: --spacing(6);
    }
  }
  ```
  - **Test**: Spacing function uses theme values
  - **Success**: Consistent spacing scale across components

- [ ] **Calculated Spacing** - Combine with calc()
  ```css
  .precise-spacing {
    margin-top: calc(--spacing(4) - 1px);
    padding: calc(--spacing(2) + 0.5rem);
    height: calc(100vh - --spacing(16));
  }
  ```
  - **Test**: Calculated spacing works correctly
  - **Success**: Math operations work with spacing values

---

## 5. Reference and Compatibility
**Priority: Low | Items: 10/10**

### 5.1 @reference Directive
- [ ] **Component Scoped Styles** - Use in Vue/Svelte components
  ```vue
  <template>
    <h1 class="custom-heading">Hello world!</h1>
  </template>
  
  <style scoped>
    @reference "../../app.css";
    
    .custom-heading {
      @apply text-2xl font-bold text-blue-600;
      @apply hover:text-blue-800 focus:outline-none;
    }
  </style>
  ```
  - **Test**: Reference works in component styles
  - **Success**: Tailwind utilities available in scoped styles

- [ ] **CSS Modules Integration** - Use with CSS modules
  ```css
  /* component.module.css */
  @reference "tailwindcss";
  
  .button {
    @apply px-4 py-2 bg-blue-500 text-white rounded;
    @apply hover:bg-blue-600 focus:ring-2 focus:ring-blue-300;
  }
  
  .card {
    @apply bg-white shadow-lg rounded-lg p-6;
    @apply dark:bg-gray-800 dark:shadow-xl;
  }
  ```
  - **Test**: CSS modules work with Tailwind
  - **Success**: Modular styles with Tailwind utilities

### 5.2 Legacy Compatibility
- [ ] **@config Directive** - Legacy JavaScript config support
  ```css
  @config "../../tailwind.config.js";
  @import "tailwindcss";
  ```
  - **Test**: Legacy config files work
  - **Success**: v3.x config compatibility maintained

- [ ] **@plugin Directive** - Legacy plugin support
  ```css
  @plugin "@tailwindcss/typography";
  @plugin "@tailwindcss/forms";
  @plugin "./custom-plugin.js";
  ```
  - **Test**: Legacy plugins work correctly
  - **Success**: v3.x plugins function properly

- [ ] **theme() Function** - Legacy theme access
  ```css
  .legacy-component {
    margin: theme(spacing.12);
    color: theme(colors.blue.500);
    font-size: theme(fontSize.xl);
  }
  ```
  - **Test**: Legacy theme function works
  - **Success**: Backward compatibility maintained

---

## Summary Statistics
- **Total Items**: 85
- **High Priority**: 45 items (Core directives + Utility/Variant directives)
- **Medium Priority**: 30 items (Source management + Build-time functions)
- **Low Priority**: 10 items (Reference + Legacy compatibility)

## Success Criteria
- [ ] All directives work correctly in CSS
- [ ] Theme system supports multi-project requirements
- [ ] Custom utilities and variants function properly
- [ ] Source management optimizes build performance
- [ ] Build-time functions compile correctly
- [ ] Legacy compatibility is maintained
- [ ] Component integration works seamlessly

## Dependencies
- Tailwind CSS v4.1 with directive support
- CSS custom properties support
- Modern CSS features (color-mix, calc, etc.)
- Build system with CSS processing
- Component framework support (Vue, Svelte, React)

## Project-Specific Theme Guidelines

### Design System Integration
```css
@theme {
  /* Import design tokens */
  --color-primary: var(--design-system-primary);
  --font-brand: var(--design-system-font-primary);
  --spacing-unit: var(--design-system-spacing-base);
}
```

### Multi-Brand Support
```css
/* Create separate theme files for each brand */
/* brand-a.css */
@theme { --color-brand: oklch(0.60 0.25 240); }

/* brand-b.css */
@theme { --color-brand: oklch(0.55 0.25 25); }
```

### Component Library Themes
```css
@theme {
  /* Component-specific tokens */
  --button-height-sm: 2rem;
  --card-padding: 1.5rem;
  --input-border-radius: 0.375rem;
}
```

## References
- [Functions and Directives Documentation](https://tailwindcss.com/docs/functions-and-directives)
- [Theme Variables Guide](https://tailwindcss.com/docs/theme)
- [Adding Custom Styles](https://tailwindcss.com/docs/adding-custom-styles)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Vue Scoped Styles](https://vue-loader.vuejs.org/guide/scoped-css.html)
- [CSS Modules Specification](https://github.com/css-modules/css-modules) 
# Theme Variables Implementation Checklist

## Overview
This checklist covers the complete implementation of Theme Variables in Tailwind CSS v4.1, based on the official documentation from https://tailwindcss.com/docs/theme.

**Key Features from v4.1:**
- `@theme` directive for defining theme variables
- Automatic utility class generation from theme variables
- CSS variable export for arbitrary values
- Design token integration with utility classes
- Advanced namespace support (colors, spacing, typography, etc.)

## 📋 Implementation Progress: 0/85 items

---

## 1. Core Theme Variables Concepts
**Priority: High | Items: 12/12**

### 1.1 Understanding Theme Variables
- [ ] **@theme Directive Basic Usage** - Define theme variables with special syntax
  ```css
  @import "tailwindcss";
  @theme {
    --color-mint-500: oklch(0.72 0.11 178);
  }
  ```
  - **Test**: Add custom color and use `bg-mint-500` class
  - **Success**: Custom utility class works and generates proper CSS

- [ ] **Theme Variable vs CSS Variable** - Understand the difference
  ```css
  /* Theme variable - creates utility classes */
  @theme {
    --color-custom: #ff6b6b;
  }
  
  /* Regular CSS variable - no utility classes */
  :root {
    --my-custom-var: #ff6b6b;
  }
  ```
  - **Test**: Define both types and verify utility generation
  - **Success**: Only theme variables create utility classes

- [ ] **Automatic CSS Variable Generation** - Theme variables become CSS variables
  ```html
  <div style="background-color: var(--color-mint-500)">
    Uses theme variable directly
  </div>
  ```
  - **Test**: Reference theme variable as CSS variable in style attribute
  - **Success**: Theme variable accessible as regular CSS variable

- [ ] **Top-level Requirement** - Theme variables must be defined at top level
  ```css
  @theme {
    --color-valid: #green; /* ✅ Valid */
  }
  
  @media (min-width: 640px) {
    @theme {
      --color-invalid: #red; /* ❌ Invalid - nested */
    }
  }
  ```
  - **Test**: Try defining theme variables in nested contexts
  - **Success**: Build fails with appropriate error for nested definitions

### 1.2 Theme Variable Namespaces
- [ ] **Color Namespace** - Color-related theme variables
  ```css
  @theme {
    --color-primary-50: oklch(0.98 0.01 240);
    --color-primary-500: oklch(0.64 0.15 240);
    --color-primary-900: oklch(0.25 0.12 240);
  }
  ```
  - **Test**: Define color scale and use with `bg-primary-*`, `text-primary-*`
  - **Success**: Color utilities generated for all defined shades

- [ ] **Spacing Namespace** - Spacing scale variables
  ```css
  @theme {
    --spacing-0: 0;
    --spacing-px: 1px;
    --spacing-custom: 2.5rem;
  }
  ```
  - **Test**: Use custom spacing with `p-custom`, `m-custom`
  - **Success**: Spacing utilities work with custom values

- [ ] **Text Size Namespace** - Typography scale
  ```css
  @theme {
    --text-huge: 4rem;
    --text-huge--line-height: 1.1;
  }
  ```
  - **Test**: Use `text-huge` class
  - **Success**: Font size and line height applied correctly

- [ ] **Font Weight Namespace** - Custom font weights
  ```css
  @theme {
    --font-weight-ultra: 950;
  }
  ```
  - **Test**: Use `font-ultra` class
  - **Success**: Custom font weight applied

- [ ] **Breakpoint Namespace** - Responsive breakpoints
  ```css
  @theme {
    --breakpoint-tablet: 768px;
    --breakpoint-desktop: 1024px;
  }
  ```
  - **Test**: Use `tablet:` and `desktop:` responsive prefixes
  - **Success**: Custom breakpoints work in responsive utilities

- [ ] **Container Namespace** - Container query sizes
  ```css
  @theme {
    --container-card: 320px;
    --container-sidebar: 280px;
  }
  ```
  - **Test**: Use `@card:` and `@sidebar:` container queries
  - **Success**: Custom container queries work correctly

- [ ] **Radius Namespace** - Border radius values
  ```css
  @theme {
    --radius-button: 0.375rem;
    --radius-card: 0.75rem;
  }
  ```
  - **Test**: Use `rounded-button`, `rounded-card`
  - **Success**: Custom border radius utilities generated

- [ ] **Shadow Namespace** - Box shadow definitions
  ```css
  @theme {
    --shadow-glow: 0 0 20px rgb(59 130 246 / 0.5);
    --inset-shadow-depth: inset 0 2px 4px rgb(0 0 0 / 0.1);
  }
  ```
  - **Test**: Use `shadow-glow`, `shadow-inset-depth`
  - **Success**: Custom shadow utilities work

### 1.3 Advanced Namespace Features
- [ ] **Animation Namespace** - Custom animations
  ```css
  @theme {
    --animate-wobble: wobble 1s ease-in-out infinite;
  }
  
  @keyframes wobble {
    0%, 100% { transform: rotate(-3deg); }
    50% { transform: rotate(3deg); }
  }
  ```
  - **Test**: Use `animate-wobble` class
  - **Success**: Custom animation plays correctly

- [ ] **Perspective Namespace** - 3D perspective values
  ```css
  @theme {
    --perspective-close: 200px;
    --perspective-far: 2000px;
  }
  ```
  - **Test**: Use `perspective-close`, `perspective-far`
  - **Success**: 3D perspective effects work

---

## 2. Customizing Your Theme
**Priority: High | Items: 25/25**

### 2.1 Extending the Default Theme
- [ ] **Adding New Colors** - Extend color palette
  ```css
  @theme {
    --color-brand-50: oklch(0.98 0.02 220);
    --color-brand-100: oklch(0.95 0.05 220);
    --color-brand-500: oklch(0.6 0.15 220);
    --color-brand-900: oklch(0.2 0.12 220);
  }
  ```
  - **Test**: Use brand colors alongside default colors
  - **Success**: Both custom and default colors available

- [ ] **Custom Color Scale Generation** - Complete color scales
  ```css
  @theme {
    --color-emerald-50: oklch(0.977 0.013 162.802);
    --color-emerald-100: oklch(0.949 0.03 162.148);
    --color-emerald-200: oklch(0.898 0.059 162.399);
    /* ... full scale ... */
    --color-emerald-950: oklch(0.154 0.046 166.633);
  }
  ```
  - **Test**: Create complete 50-950 color scale
  - **Success**: All shades work with color utilities

- [ ] **Custom Spacing Scale** - Add spacing values
  ```css
  @theme {
    --spacing-18: 4.5rem;
    --spacing-72: 18rem;
    --spacing-96: 24rem;
  }
  ```
  - **Test**: Use `p-18`, `m-72`, `w-96`
  - **Success**: Custom spacing values work in all spacing utilities

- [ ] **Typography Scale Extension** - Custom text sizes
  ```css
  @theme {
    --text-10xl: 10rem;
    --text-10xl--line-height: 1;
    --text-11xl: 12rem;
    --text-11xl--line-height: 1;
  }
  ```
  - **Test**: Use `text-10xl`, `text-11xl`
  - **Success**: Custom typography sizes with proper line heights

- [ ] **Custom Breakpoints** - Additional responsive breakpoints
  ```css
  @theme {
    --breakpoint-xs: 30rem;
    --breakpoint-3xl: 112rem;
    --breakpoint-4xl: 128rem;
  }
  ```
  - **Test**: Use `xs:`, `3xl:`, `4xl:` responsive prefixes
  - **Success**: Custom breakpoints work in responsive design

### 2.2 Overriding Default Values
- [ ] **Override Default Colors** - Replace built-in colors
  ```css
  @theme {
    --color-blue-500: oklch(0.6 0.2 250); /* Custom blue */
    --color-red-500: oklch(0.6 0.2 20);   /* Custom red */
  }
  ```
  - **Test**: Use `bg-blue-500`, `text-red-500`
  - **Success**: Custom colors replace defaults

- [ ] **Override Spacing Scale** - Replace default spacing
  ```css
  @theme {
    --spacing: 0.5rem; /* Change base spacing unit */
  }
  ```
  - **Test**: Use `p-1`, `m-2` with new spacing scale
  - **Success**: All spacing utilities use new base unit

- [ ] **Override Breakpoints** - Change responsive behavior
  ```css
  @theme {
    --breakpoint-sm: 576px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 992px;
  }
  ```
  - **Test**: Test responsive behavior at new breakpoints
  - **Success**: Responsive utilities trigger at custom breakpoints

### 2.3 Complete Custom Theme
- [ ] **Replace Entire Color Palette** - Custom brand colors only
  ```css
  @theme {
    /* Remove all default colors, add only brand colors */
    --color-primary-50: oklch(0.98 0.01 200);
    --color-primary-500: oklch(0.6 0.15 200);
    --color-secondary-50: oklch(0.98 0.01 120);
    --color-secondary-500: oklch(0.6 0.15 120);
    --color-neutral-50: oklch(0.98 0 0);
    --color-neutral-500: oklch(0.6 0 0);
  }
  ```
  - **Test**: Build with only custom colors
  - **Success**: Only defined colors available in utilities

- [ ] **Custom Typography System** - Brand-specific typography
  ```css
  @theme {
    --text-caption: 0.75rem;
    --text-caption--line-height: 1.2;
    --text-body: 1rem;
    --text-body--line-height: 1.5;
    --text-heading: 2rem;
    --text-heading--line-height: 1.2;
  }
  ```
  - **Test**: Use semantic text sizes
  - **Success**: Typography system matches design system

- [ ] **Design System Integration** - Map design tokens
  ```css
  @theme {
    /* Design system tokens */
    --color-surface-primary: oklch(1 0 0);
    --color-surface-secondary: oklch(0.98 0 0);
    --color-content-primary: oklch(0.15 0 0);
    --color-content-secondary: oklch(0.4 0 0);
    --spacing-component-xs: 0.5rem;
    --spacing-component-sm: 0.75rem;
    --spacing-component-md: 1rem;
  }
  ```
  - **Test**: Build components using design system tokens
  - **Success**: Utility classes match design system exactly

### 2.4 Animation and Keyframes
- [ ] **Custom Animation Definitions** - Define animation keyframes
  ```css
  @theme {
    --animate-fade-in: fade-in 0.5s ease-out;
    --animate-slide-up: slide-up 0.3s ease-out;
    --animate-scale-in: scale-in 0.2s ease-out;
  }
  
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slide-up {
    from { transform: translateY(100%); }
    to { transform: translateY(0); }
  }
  
  @keyframes scale-in {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  ```
  - **Test**: Use `animate-fade-in`, `animate-slide-up`, `animate-scale-in`
  - **Success**: Custom animations play correctly

- [ ] **Animation Timing Functions** - Custom easing curves
  ```css
  @theme {
    --ease-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55);
    --ease-bounce: cubic-bezier(0.68, -0.6, 0.32, 1.6);
  }
  ```
  - **Test**: Use custom easing in transitions
  - **Success**: Custom timing functions applied

- [ ] **Complex Animation Sequences** - Multi-step animations
  ```css
  @theme {
    --animate-complex: complex-motion 2s ease-in-out infinite;
  }
  
  @keyframes complex-motion {
    0% { transform: translateX(0) rotate(0deg); }
    25% { transform: translateX(100px) rotate(90deg); }
    50% { transform: translateX(100px) translateY(100px) rotate(180deg); }
    75% { transform: translateX(0) translateY(100px) rotate(270deg); }
    100% { transform: translateX(0) translateY(0) rotate(360deg); }
  }
  ```
  - **Test**: Apply complex animation to element
  - **Success**: Multi-step animation sequence works

### 2.5 Variable References and Computation
- [ ] **Reference Other Variables** - Use existing theme variables
  ```css
  @theme {
    --color-primary: var(--color-blue-500);
    --color-danger: var(--color-red-500);
    --spacing-section: calc(var(--spacing) * 16);
  }
  ```
  - **Test**: Use derived variables in utilities
  - **Success**: Variable references resolve correctly

- [ ] **Mathematical Calculations** - Computed values
  ```css
  @theme {
    --spacing-golden: calc(var(--spacing) * 1.618);
    --text-responsive: clamp(1rem, 2.5vw, 2rem);
    --shadow-layered: 
      0 1px 3px rgb(0 0 0 / 0.12),
      0 1px 2px rgb(0 0 0 / 0.24);
  }
  ```
  - **Test**: Use calculated values in utilities
  - **Success**: Mathematical calculations work in CSS output

- [ ] **Dynamic Color Mixing** - Color calculations
  ```css
  @theme {
    --color-accent-light: color-mix(in oklch, var(--color-accent) 20%, white);
    --color-accent-dark: color-mix(in oklch, var(--color-accent) 80%, black);
  }
  ```
  - **Test**: Use color-mixed values (where supported)
  - **Success**: Color mixing works in modern browsers

### 2.6 CSS Variable Generation
- [ ] **Generate All CSS Variables** - Export all theme variables
  ```css
  @import "tailwindcss";
  @theme reference; /* Generates only CSS variables */
  
  @theme {
    --color-custom: #ff6b6b;
  }
  ```
  - **Test**: Check if all theme variables available as CSS variables
  - **Success**: All theme variables accessible via var()

- [ ] **Conditional Variable Generation** - Selective export
  ```css
  @theme {
    --color-internal: #ff6b6b; /* Only for utilities */
  }
  
  :root {
    --color-external: var(--color-internal); /* Explicit CSS variable */
  }
  ```
  - **Test**: Control which variables are exposed
  - **Success**: Only intended variables available externally

### 2.7 Cross-Project Sharing
- [ ] **Theme Module System** - Reusable theme packages
  ```css
  /* themes/brand.css */
  @theme {
    --color-brand-primary: oklch(0.6 0.15 220);
    --color-brand-secondary: oklch(0.6 0.15 120);
  }
  
  /* app.css */
  @import "themes/brand.css";
  @import "tailwindcss";
  ```
  - **Test**: Import theme from separate file
  - **Success**: Theme variables work across file boundaries

- [ ] **NPM Package Themes** - Distributed theme packages
  ```css
  @import "@company/design-tokens";
  @import "tailwindcss";
  ```
  - **Test**: Install and use theme from NPM package
  - **Success**: External theme package works correctly

- [ ] **Theme Composition** - Multiple theme layers
  ```css
  @import "themes/base.css";
  @import "themes/brand.css";
  @import "themes/project.css";
  @import "tailwindcss";
  ```
  - **Test**: Layer multiple theme files
  - **Success**: Later themes override earlier ones correctly

---

## 3. Using Theme Variables
**Priority: Medium | Items: 20/20**

### 3.1 Custom CSS Integration
- [ ] **Theme Variables in Custom CSS** - Use in component styles
  ```css
  .custom-button {
    background-color: var(--color-primary-500);
    padding: var(--spacing-2) var(--spacing-4);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
  }
  ```
  - **Test**: Create custom component using theme variables
  - **Success**: Custom CSS uses theme variables correctly

- [ ] **Responsive Custom CSS** - Theme variables with media queries
  ```css
  .responsive-component {
    font-size: var(--text-sm);
  }
  
  @media (min-width: var(--breakpoint-md)) {
    .responsive-component {
      font-size: var(--text-lg);
    }
  }
  ```
  - **Test**: Use breakpoint variables in media queries
  - **Success**: Responsive behavior matches theme breakpoints

- [ ] **Dark Mode Custom CSS** - Theme variables with dark mode
  ```css
  .themed-card {
    background-color: var(--color-white);
    color: var(--color-gray-900);
  }
  
  .dark .themed-card {
    background-color: var(--color-gray-800);
    color: var(--color-white);
  }
  ```
  - **Test**: Create dark mode aware custom components
  - **Success**: Components respond to dark mode correctly

### 3.2 Arbitrary Value Usage
- [ ] **Color Arbitrary Values** - Custom colors in utilities
  ```html
  <div class="bg-[var(--color-brand-500)]">
    Uses theme variable in arbitrary value
  </div>
  ```
  - **Test**: Use theme variables in arbitrary value syntax
  - **Success**: Theme variables work in arbitrary values

- [ ] **Spacing Arbitrary Values** - Custom spacing in utilities
  ```html
  <div class="p-[var(--spacing-custom)]">
    Custom padding from theme
  </div>
  ```
  - **Test**: Use spacing variables in arbitrary values
  - **Success**: Custom spacing works in arbitrary syntax

- [ ] **Complex Arbitrary Values** - Computed values in utilities
  ```html
  <div class="w-[calc(var(--container-md)_+_var(--spacing-8))]">
    Calculated width using theme variables
  </div>
  ```
  - **Test**: Use calculated values with theme variables
  - **Success**: Complex calculations work in utilities

### 3.3 JavaScript Integration
- [ ] **Reading Theme Variables** - Access in JavaScript
  ```javascript
  // Get theme variable value
  const primaryColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-primary-500');
  
  console.log('Primary color:', primaryColor);
  ```
  - **Test**: Read theme variables from JavaScript
  - **Success**: Theme variables accessible in JS

- [ ] **Dynamic Theme Updates** - Change variables at runtime
  ```javascript
  // Update theme variable
  document.documentElement.style.setProperty(
    '--color-primary-500', 
    'oklch(0.7 0.2 180)'
  );
  ```
  - **Test**: Dynamically update theme variables
  - **Success**: UI updates when variables change

- [ ] **Theme Variable Validation** - Type checking in JavaScript
  ```javascript
  function validateThemeColor(colorValue) {
    const testElement = document.createElement('div');
    testElement.style.color = colorValue;
    return testElement.style.color !== '';
  }
  
  // Validate theme variables
  const isValidColor = validateThemeColor('var(--color-custom)');
  ```
  - **Test**: Validate theme variable values
  - **Success**: Validation correctly identifies valid/invalid values

### 3.4 Build-time Integration
- [ ] **Theme Variable Extraction** - Export for other tools
  ```javascript
  // Extract theme variables for other tools
  const fs = require('fs');
  const postcss = require('postcss');
  
  // Parse theme variables and export as JSON
  function extractThemeVariables(css) {
    // Implementation to extract variables
    return themeVariables;
  }
  ```
  - **Test**: Extract theme variables programmatically
  - **Success**: Theme variables exported in usable format

- [ ] **Design Token Sync** - Sync with design tools
  ```javascript
  // Sync theme variables with Figma tokens
  const tokens = {
    colors: {
      primary: {
        500: 'var(--color-primary-500)'
      }
    }
  };
  ```
  - **Test**: Sync theme variables with design tools
  - **Success**: Design tokens stay in sync with theme variables

### 3.5 Performance and Optimization
- [ ] **Variable Usage Tracking** - Monitor which variables are used
  ```css
  /* Only include variables that are actually used */
  @theme {
    --color-used: #ff6b6b;     /* Used in HTML */
    --color-unused: #6b6bff;   /* Should be tree-shaken */
  }
  ```
  - **Test**: Build and check if unused variables are excluded
  - **Success**: Unused theme variables not included in final CSS

- [ ] **Variable Deduplication** - Avoid duplicate values
  ```css
  @theme {
    --color-primary: oklch(0.6 0.15 220);
    --color-accent: oklch(0.6 0.15 220); /* Same value */
  }
  ```
  - **Test**: Check CSS output for value deduplication
  - **Success**: Duplicate values optimized in build

- [ ] **Runtime Performance** - Variable resolution speed
  ```css
  /* Avoid deep variable chains */
  @theme {
    --color-base: oklch(0.6 0.15 220);
    --color-variant: var(--color-base); /* One level ok */
    --color-derived: var(--color-variant); /* Two levels - check performance */
  }
  ```
  - **Test**: Measure CSS variable resolution performance
  - **Success**: Variable chains don't significantly impact performance

---

## 4. Advanced Theme Features
**Priority: Medium | Items: 18/18**

### 4.1 Design System Integration
- [ ] **Semantic Token Mapping** - Map design tokens to theme variables
  ```css
  @theme {
    /* Primitive tokens */
    --color-blue-500: oklch(0.6 0.15 240);
    
    /* Semantic tokens */
    --color-action-primary: var(--color-blue-500);
    --color-surface-brand: var(--color-blue-500);
    --color-content-accent: var(--color-blue-500);
  }
  ```
  - **Test**: Use semantic tokens in components
  - **Success**: Semantic meaning preserved in utility classes

- [ ] **Component Token System** - Component-specific variables
  ```css
  @theme {
    --button-padding-sm: var(--spacing-1) var(--spacing-3);
    --button-padding-md: var(--spacing-2) var(--spacing-4);
    --button-padding-lg: var(--spacing-3) var(--spacing-6);
    --button-border-radius: var(--radius-md);
  }
  ```
  - **Test**: Build buttons using component tokens
  - **Success**: Component tokens create consistent button system

- [ ] **Multi-brand Theme Support** - Brand-specific variable sets
  ```css
  @theme {
    --brand-a-primary: oklch(0.6 0.15 220);
    --brand-b-primary: oklch(0.6 0.15 20);
    
    /* Default to brand A */
    --color-brand-primary: var(--brand-a-primary);
  }
  
  [data-brand="b"] {
    --color-brand-primary: var(--brand-b-primary);
  }
  ```
  - **Test**: Switch between brands dynamically
  - **Success**: Brand switching changes all brand-related colors

### 4.2 Dynamic Theming
- [ ] **User Preference Themes** - Multiple theme options
  ```css
  @theme {
    /* Light theme (default) */
    --surface-primary: oklch(1 0 0);
    --content-primary: oklch(0.15 0 0);
  }
  
  [data-theme="dark"] {
    --surface-primary: oklch(0.15 0 0);
    --content-primary: oklch(0.9 0 0);
  }
  
  [data-theme="sepia"] {
    --surface-primary: oklch(0.95 0.02 60);
    --content-primary: oklch(0.25 0.03 60);
  }
  ```
  - **Test**: Switch between multiple theme variants
  - **Success**: All theme variants work correctly

- [ ] **System Integration Themes** - OS and browser integration
  ```css
  @media (prefers-color-scheme: dark) {
    @theme {
      --color-surface-primary: oklch(0.15 0 0);
      --color-content-primary: oklch(0.9 0 0);
    }
  }
  
  @media (prefers-contrast: high) {
    @theme {
      --color-content-primary: oklch(0 0 0);
      --color-surface-primary: oklch(1 0 0);
    }
  }
  ```
  - **Test**: Test with different OS preferences
  - **Success**: Theme adapts to system preferences

- [ ] **Accessibility Theme Variants** - High contrast, reduced motion
  ```css
  @media (prefers-reduced-motion: reduce) {
    @theme {
      --animate-spin: none;
      --animate-bounce: none;
      --ease-in: linear;
      --ease-out: linear;
    }
  }
  
  @media (prefers-contrast: high) {
    @theme {
      --shadow-sm: none;
      --shadow-md: none;
      --color-gray-300: oklch(0.7 0 0);
      --color-gray-600: oklch(0.3 0 0);
    }
  }
  ```
  - **Test**: Test with accessibility preferences
  - **Success**: Theme respects accessibility settings

### 4.3 Performance Optimization
- [ ] **Critical Theme Variables** - Load essential variables first
  ```css
  /* Critical theme variables for above-the-fold content */
  @theme critical {
    --color-primary: oklch(0.6 0.15 220);
    --spacing: 0.25rem;
    --text-base: 1rem;
  }
  
  /* Non-critical variables */
  @theme {
    --color-decorative: oklch(0.8 0.1 180);
    --animate-complex: complex 2s ease;
  }
  ```
  - **Test**: Measure loading performance with critical variables
  - **Success**: Critical variables load first, improving perceived performance

- [ ] **Variable Scoping** - Limit variable scope for performance
  ```css
  /* Global variables */
  @theme {
    --color-primary: oklch(0.6 0.15 220);
  }
  
  /* Component-scoped variables */
  .modal {
    --modal-backdrop: rgba(0, 0, 0, 0.5);
    --modal-border-radius: var(--radius-lg);
  }
  ```
  - **Test**: Measure CSS performance with scoped variables
  - **Success**: Scoped variables don't impact global performance

### 4.4 Debugging and Development
- [ ] **Theme Variable Inspector** - Debug theme variables
  ```css
  /* Development helper for theme debugging */
  [data-debug-theme] * {
    position: relative;
  }
  
  [data-debug-theme] *::before {
    content: 'Color: ' var(--color-current, 'none') ' | Size: ' var(--size-current, 'none');
    position: absolute;
    top: 0;
    left: 0;
    font-size: 10px;
    background: yellow;
    z-index: 9999;
  }
  ```
  - **Test**: Enable theme debugging mode
  - **Success**: Current theme variables visible on elements

- [ ] **Variable Validation** - Validate theme variable syntax
  ```css
  @theme {
    --color-valid: oklch(0.6 0.15 220);      /* ✅ Valid */
    --color-invalid: hsl(220, 80%, 60%);     /* ⚠️  Should warn about color space */
    --spacing-valid: 1rem;                   /* ✅ Valid */
    --spacing-invalid: 1 rem;                /* ❌ Invalid syntax */
  }
  ```
  - **Test**: Use theme variables with invalid syntax
  - **Success**: Build process warns about invalid variables

- [ ] **Theme Documentation Generation** - Auto-generate theme docs
  ```css
  /**
   * Primary brand color used for buttons and links
   * @example bg-primary-500, text-primary-500
   */
  @theme {
    --color-primary-500: oklch(0.6 0.15 220);
  }
  ```
  - **Test**: Generate documentation from theme variable comments
  - **Success**: Documentation accurately reflects theme variables

### 4.5 Testing and Quality Assurance
- [ ] **Theme Variable Coverage** - Ensure all variables have utilities
  ```javascript
  // Test that all theme variables generate corresponding utilities
  function testThemeVariableCoverage() {
    const themeVars = extractThemeVariables();
    const generatedUtilities = extractUtilities();
    
    const orphanedVars = themeVars.filter(
      themeVar => !hasCorrespondingUtility(themeVar, generatedUtilities)
    );
    
    return orphanedVars.length === 0;
  }
  ```
  - **Test**: Run coverage test on theme variables
  - **Success**: All theme variables have corresponding utilities

- [ ] **Cross-browser Theme Testing** - Test variable support
  ```javascript
  function testCSSVariableSupport() {
    const testElement = document.createElement('div');
    testElement.style.setProperty('--test-var', 'test');
    const support = getComputedStyle(testElement).getPropertyValue('--test-var') === 'test';
    return support;
  }
  ```
  - **Test**: Test CSS variable support across browsers
  - **Success**: Theme variables work in all target browsers

- [ ] **Theme Consistency Testing** - Validate theme relationships
  ```javascript
  function testThemeConsistency() {
    // Test that color scales are properly ordered
    // Test that spacing scale follows expected ratios
    // Test that typography scale has proper line heights
    return consistencyResults;
  }
  ```
  - **Test**: Run consistency tests on theme values
  - **Success**: Theme values follow design system rules

---

## 5. Integration and Best Practices
**Priority: Low | Items: 10/10**

### 5.1 Build Integration
- [ ] **PostCSS Plugin Integration** - Custom theme processing
  ```javascript
  // postcss.config.js
  module.exports = {
    plugins: [
      require('@tailwindcss/postcss'),
      require('./plugins/theme-validator'),
      require('./plugins/theme-optimizer')
    ]
  };
  ```
  - **Test**: Process theme variables with custom plugins
  - **Success**: Custom processing works with theme variables

- [ ] **Bundle Optimization** - Optimize theme variable output
  ```javascript
  // Webpack plugin to optimize theme variables
  class ThemeOptimizer {
    apply(compiler) {
      compiler.hooks.emit.tap('ThemeOptimizer', (compilation) => {
        // Optimize theme variable output
      });
    }
  }
  ```
  - **Test**: Build with theme optimization
  - **Success**: Theme variables optimized for production

### 5.2 Team Collaboration
- [ ] **Theme Variable Guidelines** - Team standards for theme variables
  ```markdown
  ## Theme Variable Guidelines
  
  ### Naming Convention
  - Use semantic names: `--color-action-primary` not `--color-blue-500`
  - Use consistent scales: 50, 100, 200, ..., 900, 950
  - Group related variables: `--button-*`, `--card-*`
  
  ### Value Format
  - Colors: Use OKLCH format for better interpolation
  - Spacing: Use rem units for scalability
  - Typography: Include line height variables
  ```
  - **Test**: Apply guidelines to theme variable definitions
  - **Success**: Theme variables follow consistent standards

- [ ] **Version Control for Themes** - Track theme changes
  ```json
  {
    "name": "@company/design-tokens",
    "version": "2.1.0",
    "themes": {
      "v2": {
        "colors": {
          "primary": "oklch(0.6 0.15 220)"
        }
      }
    }
  }
  ```
  - **Test**: Version and distribute theme updates
  - **Success**: Theme changes properly versioned and distributed

### 5.3 Documentation and Maintenance
- [ ] **Theme Variable Documentation** - Comprehensive theme docs
  ```markdown
  # Theme Variables Reference
  
  ## Colors
  
  ### Primary Colors
  - `--color-primary-50`: Light tint of primary color
  - `--color-primary-500`: Main primary color
  - `--color-primary-900`: Dark shade of primary color
  
  Usage: `bg-primary-500`, `text-primary-900`, `border-primary-50`
  ```
  - **Test**: Create comprehensive theme documentation
  - **Success**: Documentation covers all theme variables and usage

- [ ] **Migration Guides** - Help with theme updates
  ```markdown
  ## Migrating from v1 to v2 Theme
  
  ### Breaking Changes
  - `--color-brand` renamed to `--color-primary`
  - `--spacing-large` removed, use `--spacing-8` instead
  
  ### Automated Migration
  ```bash
  npx @company/theme-migrator v1-to-v2
  ```
  - **Test**: Follow migration guide for theme updates
  - **Success**: Migration completed without manual intervention

- [ ] **Theme Playground** - Interactive theme explorer
  ```html
  <!-- Theme playground for testing variables -->
  <div class="theme-playground">
    <input type="color" data-theme-var="--color-primary-500">
    <input type="range" data-theme-var="--spacing" min="0.1" max="1" step="0.1">
    <select data-theme-var="--font-family-sans">
      <option value="Inter">Inter</option>
      <option value="Roboto">Roboto</option>
    </select>
  </div>
  ```
  - **Test**: Use theme playground to experiment with variables
  - **Success**: Interactive theme changes reflect in real-time

- [ ] **Theme Linting** - Automated theme validation
  ```json
  {
    "rules": {
      "theme-naming-convention": "semantic",
      "color-format": "oklch",
      "spacing-scale": "consistent",
      "required-variables": ["--color-primary", "--spacing", "--text-base"]
    }
  }
  ```
  - **Test**: Run theme linting on variable definitions
  - **Success**: Linting catches theme variable issues

### 5.4 Advanced Integration
- [ ] **Design Tool Sync** - Sync with Figma/Sketch
  ```javascript
  // Sync theme variables with design tools
  async function syncWithFigma() {
    const figmaTokens = await fetchFigmaTokens();
    const themeVariables = convertToThemeVariables(figmaTokens);
    await updateThemeFile(themeVariables);
  }
  ```
  - **Test**: Sync theme variables with design tools
  - **Success**: Design tokens automatically sync with theme variables

- [ ] **Runtime Theme Switching** - Dynamic theme loading
  ```javascript
  async function loadTheme(themeName) {
    const themeCSS = await fetch(`/themes/${themeName}.css`);
    const themeText = await themeCSS.text();
    
    // Apply theme variables dynamically
    const style = document.createElement('style');
    style.textContent = themeText;
    document.head.appendChild(style);
  }
  ```
  - **Test**: Dynamically load different themes
  - **Success**: Themes load and apply without page refresh

---

## Summary Statistics
- **Total Items**: 85
- **High Priority**: 37 items (Core concepts + Customization)
- **Medium Priority**: 38 items (Usage + Advanced features)
- **Low Priority**: 10 items (Integration + Best practices)

## Success Criteria
- [ ] All theme variable namespaces work correctly
- [ ] Custom theme variables generate proper utility classes
- [ ] Theme variables accessible as CSS variables
- [ ] Performance impact minimal
- [ ] Cross-browser compatibility verified
- [ ] Design system integration complete
- [ ] Documentation and guidelines established

## Dependencies
- Tailwind CSS v4.1 with @theme directive support
- CSS custom properties support
- PostCSS for processing
- Build tools for optimization

## References
- [Tailwind CSS Theme Variables Documentation](https://tailwindcss.com/docs/theme)
- [CSS Custom Properties MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [OKLCH Color Space](https://oklch.com/)
- [Design Tokens W3C Community Group](https://design-tokens.github.io/community-group/) 
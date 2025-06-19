# Adding Custom Styles Implementation Checklist

## Overview
This checklist covers the complete implementation of Adding Custom Styles in Tailwind CSS v4.1, based on the official documentation from https://tailwindcss.com/docs/adding-custom-styles.

**Key Features from v4.1:**
- `@theme` directive for customizing design tokens
- Arbitrary values with square bracket notation
- `@utility` directive for custom utilities
- `@custom-variant` directive for custom variants
- `@layer` directive for component styles
- `@variant` directive for applying variants in custom CSS
- Functional utilities with `--value()` function
- Advanced CSS integration patterns

## 📋 Implementation Progress: 0/100 items

---

## 1. Customizing Your Theme
**Priority: High | Items: 20/20**

### 1.1 Basic Theme Customization
- [ ] **@theme Directive Usage** - Primary theme customization method
  ```css
  @theme {
    --font-display: "Satoshi", "sans-serif";
    --breakpoint-3xl: 120rem;
    --color-avocado-500: oklch(0.84 0.18 117.33);
    --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
  }
  ```
  - **Test**: Add custom theme variables and use in utilities
  - **Success**: Custom theme values available in all utilities

- [ ] **Color Palette Customization** - Custom color definitions
  ```css
  @theme {
    --color-brand-50: oklch(0.99 0 0);
    --color-brand-100: oklch(0.98 0.04 113.22);
    --color-brand-200: oklch(0.94 0.11 115.03);
    --color-brand-300: oklch(0.92 0.19 114.08);
    --color-brand-400: oklch(0.84 0.18 117.33);
    --color-brand-500: oklch(0.53 0.12 118.34);
  }
  ```
  - **Test**: Use custom colors in bg-brand-*, text-brand-*, etc.
  - **Success**: Custom color scale works across all color utilities

- [ ] **Typography Scale Customization** - Font families and sizes
  ```css
  @theme {
    --font-display: "Satoshi", "sans-serif";
    --font-body: "Inter", "sans-serif";
    --font-mono: "JetBrains Mono", "monospace";
    --text-xs: 0.75rem;
    --text-custom: 1.125rem;
  }
  ```
  - **Test**: Apply custom fonts and sizes in utilities
  - **Success**: Custom typography available in font-* and text-* utilities

- [ ] **Spacing Scale Customization** - Custom spacing values
  ```css
  @theme {
    --spacing-xs: 0.25rem;
    --spacing-custom: 1.75rem;
    --spacing-xl: 3rem;
    --spacing-hero: 6rem;
  }
  ```
  - **Test**: Use custom spacing in padding, margin, gap utilities
  - **Success**: Custom spacing works in all spacing-related utilities

- [ ] **Breakpoint Customization** - Custom responsive breakpoints
  ```css
  @theme {
    --breakpoint-xs: 20rem;
    --breakpoint-3xl: 120rem;
    --breakpoint-4xl: 160rem;
  }
  ```
  - **Test**: Use custom breakpoints in responsive utilities
  - **Success**: Custom breakpoints work with all responsive utilities

### 1.2 Advanced Theme Features
- [ ] **Animation Customization** - Custom timing functions and durations
  ```css
  @theme {
    --ease-fluid: cubic-bezier(0.3, 0, 0, 1);
    --ease-snappy: cubic-bezier(0.2, 0, 0, 1);
    --duration-fast: 150ms;
    --duration-slow: 500ms;
  }
  ```
  - **Test**: Use custom animations in transition and animation utilities
  - **Success**: Custom timing functions available in animation utilities

- [ ] **Shadow Customization** - Custom shadow definitions
  ```css
  @theme {
    --shadow-custom: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    --shadow-glow: 0 0 20px rgb(59 130 246 / 0.5);
    --shadow-brutal: 8px 8px 0px rgb(0 0 0);
  }
  ```
  - **Test**: Apply custom shadows with shadow-* utilities
  - **Success**: Custom shadows work in box-shadow utilities

- [ ] **Border Radius Customization** - Custom rounded corner values
  ```css
  @theme {
    --radius-sm: 0.125rem;
    --radius-custom: 0.75rem;
    --radius-pill: 9999px;
  }
  ```
  - **Test**: Use custom border radius in rounded-* utilities
  - **Success**: Custom radius values available in border utilities

- [ ] **Z-Index Customization** - Custom layering values
  ```css
  @theme {
    --z-index-dropdown: 1000;
    --z-index-modal: 2000;
    --z-index-tooltip: 3000;
  }
  ```
  - **Test**: Apply custom z-index values with z-* utilities
  - **Success**: Custom z-index values work in positioning utilities

- [ ] **Container Customization** - Custom container sizes
  ```css
  @theme {
    --container-xs: 20rem;
    --container-custom: 68rem;
    --container-wide: 90rem;
  }
  ```
  - **Test**: Use custom container sizes in layout
  - **Success**: Custom containers work with container queries

---

## 2. Using Arbitrary Values
**Priority: High | Items: 25/25**

### 2.1 Basic Arbitrary Values
- [ ] **Square Bracket Notation** - On-the-fly value generation
  ```html
  <div class="top-[117px]">Arbitrary positioning</div>
  <div class="text-[22px]">Arbitrary font size</div>
  <div class="bg-[#bada55]">Arbitrary background color</div>
  ```
  - **Test**: Use arbitrary values in various utilities
  - **Success**: Arbitrary values work across all utility categories

- [ ] **Responsive Arbitrary Values** - Breakpoint-specific arbitrary values
  ```html
  <div class="top-[117px] lg:top-[344px]">
    Responsive arbitrary positioning
  </div>
  <div class="text-[16px] md:text-[20px] lg:text-[24px]">
    Responsive arbitrary text
  </div>
  ```
  - **Test**: Combine arbitrary values with responsive modifiers
  - **Success**: Arbitrary values work with all responsive breakpoints

- [ ] **Interactive Arbitrary Values** - State-based arbitrary values
  ```html
  <button class="bg-[#3b82f6] hover:bg-[#2563eb]">
    Hover arbitrary colors
  </button>
  <input class="border-[#d1d5db] focus:border-[#3b82f6]">
  ```
  - **Test**: Use arbitrary values with interactive states
  - **Success**: Arbitrary values work with hover, focus, active states

- [ ] **CSS Variable References** - Custom property syntax
  ```html
  <div class="fill-(--my-brand-color)">Custom property shorthand</div>
  <div class="bg-[var(--custom-bg)]">Full variable syntax</div>
  ```
  - **Test**: Reference CSS variables in arbitrary values
  - **Success**: Both shorthand and full syntax work correctly

### 2.2 Arbitrary Properties
- [ ] **Custom CSS Properties** - Any CSS property support
  ```html
  <div class="[mask-type:luminance]">Custom mask property</div>
  <div class="[backdrop-filter:blur(10px)]">Custom backdrop filter</div>
  <div class="[scroll-snap-type:x_mandatory]">Custom scroll snap</div>
  ```
  - **Test**: Use arbitrary properties for unsupported CSS features
  - **Success**: Any CSS property can be used with square brackets

- [ ] **Interactive Arbitrary Properties** - State modifiers with properties
  ```html
  <div class="[mask-type:luminance] hover:[mask-type:alpha]">
    State-based properties
  </div>
  <div class="[--scroll-offset:56px] lg:[--scroll-offset:44px]">
    Responsive CSS variables
  </div>
  ```
  - **Test**: Combine arbitrary properties with modifiers
  - **Success**: Properties work with all available modifiers

- [ ] **Complex Property Values** - Multi-value properties
  ```html
  <div class="[transform:rotate(45deg)_scale(1.5)]">
    Complex transform
  </div>
  <div class="[background:linear-gradient(45deg,_#f06,_#06f)]">
    Complex background
  </div>
  ```
  - **Test**: Use complex values in arbitrary properties
  - **Success**: Multi-value and function-based properties work

### 2.3 Arbitrary Variants
- [ ] **Custom Selector Variants** - On-the-fly selectors
  ```html
  <ul role="list">
    <li class="lg:[&:nth-child(-n+3)]:hover:underline">
      Complex arbitrary variant
    </li>
    <li class="[&:not(:last-child)]:border-b">
      Not selector variant
    </li>
  </ul>
  ```
  - **Test**: Create custom pseudo-selectors with arbitrary variants
  - **Success**: Complex selectors work as variants

- [ ] **Media Query Variants** - Custom media queries
  ```html
  <div class="[@media(min-width:800px)]:block">
    Custom media query
  </div>
  <div class="[@media(prefers-reduced-motion)]:animate-none">
    Accessibility media query
  </div>
  ```
  - **Test**: Use arbitrary media queries as variants
  - **Success**: Custom media queries work as modifiers

- [ ] **Attribute Selector Variants** - Data attribute selectors
  ```html
  <div class="[&[data-state='open']]:bg-blue-500">
    Data attribute variant
  </div>
  <div class="[&[aria-expanded='true']]:rotate-180">
    ARIA attribute variant
  </div>
  ```
  - **Test**: Target elements by attributes with arbitrary variants
  - **Success**: Attribute selectors work as variants

### 2.4 Handling Edge Cases
- [ ] **Whitespace Handling** - Underscore to space conversion
  ```html
  <div class="grid grid-cols-[1fr_500px_2fr]">
    Grid with spaces
  </div>
  <div class="[background-image:url('data:image/svg+xml;utf8,<svg>...</svg>')]">
    Complex URL values
  </div>
  ```
  - **Test**: Use underscores for spaces in arbitrary values
  - **Success**: Underscores convert to spaces correctly

- [ ] **Ambiguity Resolution** - Resolving parsing conflicts
  ```html
  <!-- Use type hints when ambiguous -->
  <div class="text-[length:theme(fontSize.xl)]">
    Type-hinted arbitrary value
  </div>
  <div class="text-[color:theme(colors.blue.500)]">
    Color-specific arbitrary value
  </div>
  ```
  - **Test**: Use type hints to resolve ambiguous values
  - **Success**: Type hints resolve parsing conflicts

- [ ] **Special Characters** - Handling complex values
  ```html
  <div class="content-['Hello_World!']">
    Content with special characters
  </div>
  <div class="before:content-['★']">
    Unicode characters in content
  </div>
  ```
  - **Test**: Use special characters in arbitrary values
  - **Success**: Special characters handled correctly

---

## 3. Using Custom CSS
**Priority: Medium | Items: 20/20**

### 3.1 Adding Base Styles
- [ ] **@layer base** - Global base styles
  ```css
  @layer base {
    html {
      scroll-behavior: smooth;
    }
    
    body {
      font-feature-settings: "rlig" 1, "calt" 1;
    }
    
    h1, h2, h3, h4, h5, h6 {
      font-weight: 600;
      line-height: 1.2;
    }
  }
  ```
  - **Test**: Apply base styles globally
  - **Success**: Base styles apply to all elements

- [ ] **Element Defaults** - Setting default element styles
  ```css
  @layer base {
    input[type="text"], input[type="email"] {
      @apply border border-gray-300 rounded px-3 py-2;
    }
    
    button {
      @apply font-medium transition-colors;
    }
  }
  ```
  - **Test**: Set defaults for form elements and buttons
  - **Success**: Default styles apply without classes

- [ ] **Typography Defaults** - Base typography system
  ```css
  @layer base {
    .prose h1 {
      @apply text-4xl font-bold mb-6;
    }
    
    .prose p {
      @apply text-base leading-relaxed mb-4;
    }
    
    .prose a {
      @apply text-blue-600 hover:underline;
    }
  }
  ```
  - **Test**: Create typography system with base styles
  - **Success**: Typography classes work without explicit utilities

### 3.2 Adding Component Classes
- [ ] **@layer components** - Reusable component styles
  ```css
  @layer components {
    .btn-primary {
      @apply bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded;
    }
    
    .card {
      @apply bg-white rounded-lg shadow-md p-6;
    }
  }
  ```
  - **Test**: Create component classes using @apply
  - **Success**: Component classes work like utility classes

- [ ] **Component Variants** - Multiple component styles
  ```css
  @layer components {
    .btn {
      @apply font-medium py-2 px-4 rounded transition-colors;
    }
    
    .btn-primary {
      @apply bg-blue-500 hover:bg-blue-600 text-white;
    }
    
    .btn-secondary {
      @apply bg-gray-200 hover:bg-gray-300 text-gray-900;
    }
  }
  ```
  - **Test**: Use base component with variant modifiers
  - **Success**: Component variants work independently

- [ ] **Third-party Component Styling** - External library integration
  ```css
  @layer components {
    .select2-dropdown {
      @apply bg-white border border-gray-300 rounded shadow-lg;
    }
    
    .select2-results__option {
      @apply px-3 py-2 hover:bg-blue-50;
    }
  }
  ```
  - **Test**: Style third-party components with Tailwind utilities
  - **Success**: External components styled consistently

### 3.3 Using Variants in Custom CSS
- [ ] **@variant Directive** - Apply variants in custom CSS
  ```css
  .my-element {
    background: white;
    
    @variant dark {
      background: black;
    }
    
    @variant hover {
      transform: scale(1.05);
    }
  }
  ```
  - **Test**: Use @variant to apply Tailwind variants
  - **Success**: Variants compile to correct CSS

- [ ] **Nested Variants** - Multiple variant combinations
  ```css
  .interactive-card {
    background: white;
    
    @variant dark {
      background: gray-900;
      
      @variant hover {
        background: gray-800;
      }
    }
    
    @variant lg {
      padding: 2rem;
    }
  }
  ```
  - **Test**: Nest variants for complex interactions
  - **Success**: Nested variants compile correctly

- [ ] **Custom CSS with Modifiers** - Traditional CSS with Tailwind variants
  ```css
  .custom-animation {
    animation: fadeIn 0.3s ease-in-out;
    
    @variant motion-reduce {
      animation: none;
    }
    
    @variant dark {
      animation-duration: 0.5s;
    }
  }
  ```
  - **Test**: Combine custom animations with accessibility variants
  - **Success**: Custom CSS respects user preferences

---

## 4. Adding Custom Utilities
**Priority: Medium | Items: 20/20**

### 4.1 Simple Custom Utilities
- [ ] **@utility Directive** - Basic utility creation
  ```css
  @utility content-auto {
    content-visibility: auto;
  }
  
  @utility aspect-golden {
    aspect-ratio: 1.618;
  }
  
  @utility text-balance {
    text-wrap: balance;
  }
  ```
  - **Test**: Use custom utilities in HTML classes
  - **Success**: Custom utilities work with variants and modifiers

- [ ] **Complex Utilities** - Multi-property utilities
  ```css
  @utility scrollbar-hidden {
    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  @utility focus-ring {
    &:focus {
      outline: 2px solid blue;
      outline-offset: 2px;
    }
  }
  ```
  - **Test**: Create utilities with pseudo-elements and selectors
  - **Success**: Complex utilities compile correctly

- [ ] **Utility Variants** - Custom utilities with state support
  ```css
  @utility glass-effect {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.1);
    
    @variant hover {
      background: rgba(255, 255, 255, 0.2);
    }
  }
  ```
  - **Test**: Use custom utilities with hover, focus, etc.
  - **Success**: Custom utilities work with all variants

### 4.2 Functional Utilities
- [ ] **Theme Value Matching** - Utilities that use theme values
  ```css
  @theme {
    --tab-size-2: 2;
    --tab-size-4: 4;
    --tab-size-8: 8;
  }
  
  @utility tab-* {
    tab-size: --value(--tab-size-*);
  }
  ```
  - **Test**: Use tab-2, tab-4, tab-8 utilities
  - **Success**: Functional utilities resolve theme values

- [ ] **Bare Value Support** - Accept raw values
  ```css
  @utility tab-* {
    tab-size: --value(integer);
  }
  
  @utility opacity-* {
    opacity: calc(--value(integer) * 1%);
  }
  ```
  - **Test**: Use tab-1, tab-76, opacity-50 utilities
  - **Success**: Bare values work with validation

- [ ] **Literal Value Support** - Predefined literal values
  ```css
  @utility tab-* {
    tab-size: --value('inherit', 'initial', 'unset');
  }
  
  @utility overflow-* {
    overflow: --value('auto', 'hidden', 'scroll', 'visible');
  }
  ```
  - **Test**: Use tab-inherit, overflow-auto utilities
  - **Success**: Literal values work as expected

- [ ] **Arbitrary Value Support** - Square bracket values
  ```css
  @utility tab-* {
    tab-size: --value([integer]);
  }
  
  @utility margin-* {
    margin: --value([length], [percentage]);
  }
  ```
  - **Test**: Use tab-[12], margin-[2.5rem] utilities
  - **Success**: Arbitrary values work with type validation

### 4.3 Advanced Functional Features
- [ ] **Combined Value Resolution** - Multiple value types
  ```css
  @theme {
    --tab-size-github: 8;
  }
  
  @utility tab-* {
    tab-size: --value(--tab-size-*, integer, [integer]);
  }
  ```
  - **Test**: Use theme, bare, and arbitrary values
  - **Success**: All value types resolve correctly

- [ ] **Modifier Support** - Utilities with modifiers
  ```css
  @utility text-* {
    font-size: --value(--text-*, [length]);
    line-height: --modifier(--leading-*, [length], [*]);
  }
  ```
  - **Test**: Use text-lg/6, text-xl/tight utilities
  - **Success**: Modifiers work with functional utilities

- [ ] **Negative Value Support** - Positive and negative utilities
  ```css
  @utility inset-* {
    inset: calc(var(--spacing) * --value([percentage], [length]));
  }
  
  @utility -inset-* {
    inset: calc(var(--spacing) * --value([percentage], [length]) * -1);
  }
  ```
  - **Test**: Use inset-4 and -inset-4 utilities
  - **Success**: Both positive and negative values work

- [ ] **Fraction Support** - Ratio-based utilities
  ```css
  @utility aspect-* {
    aspect-ratio: --value(--aspect-ratio-*, ratio, [ratio]);
  }
  ```
  - **Test**: Use aspect-16/9, aspect-[7/9] utilities
  - **Success**: Fraction values work correctly

---

## 5. Adding Custom Variants
**Priority: Low | Items: 15/15**

### 5.1 Basic Custom Variants
- [ ] **@custom-variant Directive** - Simple custom variants
  ```css
  @custom-variant theme-dark {
    &:where([data-theme="dark"] *) {
      @slot;
    }
  }
  
  @custom-variant open {
    &[data-state="open"] {
      @slot;
    }
  }
  ```
  - **Test**: Use theme-dark:bg-black, open:opacity-100
  - **Success**: Custom variants work with all utilities

- [ ] **Shorthand Syntax** - Simple variant definitions
  ```css
  @custom-variant theme-midnight (&:where([data-theme="midnight"] *));
  @custom-variant expanded (&[aria-expanded="true"]);
  @custom-variant loading (&[data-loading="true"]);
  ```
  - **Test**: Use shorthand variants in HTML
  - **Success**: Shorthand syntax compiles correctly

- [ ] **Attribute-based Variants** - Data and ARIA attributes
  ```css
  @custom-variant data-active {
    &[data-active="true"] {
      @slot;
    }
  }
  
  @custom-variant aria-checked {
    &[aria-checked="true"] {
      @slot;
    }
  }
  ```
  - **Test**: Create variants for component states
  - **Success**: Attribute variants work with state management

### 5.2 Complex Custom Variants
- [ ] **Media Query Variants** - Custom responsive variants
  ```css
  @custom-variant any-hover {
    @media (any-hover: hover) {
      &:hover {
        @slot;
      }
    }
  }
  
  @custom-variant reduced-motion {
    @media (prefers-reduced-motion: reduce) {
      @slot;
    }
  }
  ```
  - **Test**: Use accessibility-aware custom variants
  - **Success**: Media query variants work correctly

- [ ] **Nested Variants** - Complex selector combinations
  ```css
  @custom-variant group-focus-within {
    .group:focus-within & {
      @slot;
    }
  }
  
  @custom-variant peer-invalid {
    .peer:invalid ~ & {
      @slot;
    }
  }
  ```
  - **Test**: Create group and peer-based custom variants
  - **Success**: Complex selector relationships work

- [ ] **Container Query Variants** - Custom container-based variants
  ```css
  @custom-variant sidebar-open {
    @container sidebar (min-width: 250px) {
      @slot;
    }
  }
  
  @custom-variant card-large {
    @container card (min-width: 400px) {
      @slot;
    }
  }
  ```
  - **Test**: Use container query variants
  - **Success**: Container variants work with named containers

### 5.3 Variant Integration
- [ ] **Variant Stacking** - Combining multiple variants
  ```html
  <div class="theme-dark:lg:hover:bg-blue-600">
    Multiple variant stack
  </div>
  <div class="open:any-hover:scale-105">
    Custom variant combinations
  </div>
  ```
  - **Test**: Stack custom variants with built-in variants
  - **Success**: Variant stacking works correctly

- [ ] **Variant Priority** - Understanding variant precedence
  ```css
  /* Ensure proper variant ordering */
  @custom-variant high-priority {
    &[data-priority="high"] {
      @slot !important;
    }
  }
  ```
  - **Test**: Verify variant precedence in complex scenarios
  - **Success**: Variants apply in correct order

- [ ] **Framework Integration** - Variants with JS frameworks
  ```html
  <!-- React/Vue component states -->
  <button class="is-loading:opacity-50 is-disabled:cursor-not-allowed">
    Framework state variants
  </button>
  ```
  - **Test**: Use custom variants with framework component states
  - **Success**: Framework state management works with custom variants

---

## Summary Statistics
- **Total Items**: 100
- **High Priority**: 45 items (Theme customization + Arbitrary values)
- **Medium Priority**: 40 items (Custom CSS + Custom utilities)
- **Low Priority**: 15 items (Custom variants)

## Success Criteria
- [ ] Theme customization works across all utility categories
- [ ] Arbitrary values support all CSS properties and data types
- [ ] Custom utilities integrate seamlessly with variants
- [ ] Custom variants work with utility stacking
- [ ] @layer directive maintains proper CSS cascade
- [ ] Custom CSS compiles correctly with Tailwind build process
- [ ] Performance impact minimal for custom additions

## Dependencies
- Tailwind CSS v4.1 with CSS-first configuration
- Modern CSS support for custom properties
- Build system integration for @theme, @utility, @variant processing
- CSS custom properties browser support

## References
- [Adding Custom Styles Documentation](https://tailwindcss.com/docs/adding-custom-styles)
- [Theme Variables Guide](https://tailwindcss.com/docs/theme)
- [Arbitrary Values Documentation](https://tailwindcss.com/docs/arbitrary-values)
- [Custom Variants Guide](https://tailwindcss.com/docs/custom-variants)
- [CSS Layers Specification](https://www.w3.org/TR/css-cascade-5/#layering) 
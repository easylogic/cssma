# Sizing Utilities Implementation Checklist

## 📋 Overview
Comprehensive checklist for implementing Sizing utilities in FigmaikR, covering width, height, min/max dimensions, and aspect ratio utilities.

**Status**: 🚧 In Progress (~80% Complete)  
**Last Updated**: December 2024  
**Reference**: [Tailwind CSS v4.1 Sizing Documentation](https://tailwindcss.com/docs/width)

---

## 1. Width Utilities

### 1.1 Width Spacing Scale (v4.1 Updated)
- [ ] **w-{number}** - `width: calc(var(--spacing) * <number>)`
- [ ] **w-0** through **w-96** - Complete spacing scale
- [ ] **w-px** - `width: 1px`

### 1.1.1 Container Scale (v4.1 New)
- [ ] **w-3xs** - `width: var(--container-3xs)` (16rem / 256px)
- [ ] **w-2xs** - `width: var(--container-2xs)` (18rem / 288px)
- [ ] **w-xs** - `width: var(--container-xs)` (20rem / 320px)
- [ ] **w-sm** - `width: var(--container-sm)` (24rem / 384px)
- [ ] **w-md** - `width: var(--container-md)` (28rem / 448px)
- [ ] **w-lg** - `width: var(--container-lg)` (32rem / 512px)
- [ ] **w-xl** - `width: var(--container-xl)` (36rem / 576px)
- [ ] **w-2xl** - `width: var(--container-2xl)` (42rem / 672px)
- [ ] **w-3xl** - `width: var(--container-3xl)` (48rem / 768px)
- [ ] **w-4xl** - `width: var(--container-4xl)` (56rem / 896px)
- [ ] **w-5xl** - `width: var(--container-5xl)` (64rem / 1024px)
- [ ] **w-6xl** - `width: var(--container-6xl)` (72rem / 1152px)
- [ ] **w-7xl** - `width: var(--container-7xl)` (80rem / 1280px)

### 1.2 Fractional Widths
- [ ] **w-auto** - `width: auto`
- [ ] **w-1/2** - `width: 50%`
- [ ] **w-1/3** - `width: 33.333333%`
- [ ] **w-2/3** - `width: 66.666667%`
- [ ] **w-1/4** - `width: 25%`
- [ ] **w-2/4** - `width: 50%`
- [ ] **w-3/4** - `width: 75%`
- [ ] **w-1/5** - `width: 20%`
- [ ] **w-2/5** - `width: 40%`
- [ ] **w-3/5** - `width: 60%`
- [ ] **w-4/5** - `width: 80%`
- [ ] **w-1/6** - `width: 16.666667%`
- [ ] **w-2/6** - `width: 33.333333%`
- [ ] **w-3/6** - `width: 50%`
- [ ] **w-4/6** - `width: 66.666667%`
- [ ] **w-5/6** - `width: 83.333333%`
- [ ] **w-1/12** through **w-11/12** - Twelfths fractions
- [ ] **w-full** - `width: 100%`

### 1.3 Viewport & Container Widths
- [ ] **w-screen** - `width: 100vw`
- [ ] **w-svw** - `width: 100svw`
- [ ] **w-lvw** - `width: 100lvw`
- [ ] **w-dvw** - `width: 100dvw`
- [ ] **w-min** - `width: min-content`
- [ ] **w-max** - `width: max-content`
- [ ] **w-fit** - `width: fit-content`

### 1.4 CSS Custom Properties (v4.1)
- [ ] **w-(--my-width)** - `width: var(--my-width)`
- [ ] **w-(<custom-property>)** - CSS custom property reference

### 1.5 Arbitrary Width Values
- [ ] **w-[32rem]** - Custom rem values
- [ ] **w-[200px]** - Custom pixel values
- [ ] **w-[50vw]** - Custom viewport values
- [ ] **w-[calc(100%-1rem)]** - Complex calc expressions

### 1.6 Implementation Status
- [x] Basic width utilities
- [x] Fractional widths
- [ ] Complete spacing scale
- [ ] Viewport width utilities
- [ ] Arbitrary values

---

## 2. Height Utilities

### 2.1 Fixed Height Scale
- [ ] **h-0** through **h-96** - Complete spacing scale
- [ ] **h-px** - `height: 1px`

### 2.2 Fractional Heights
- [ ] **h-auto** - `height: auto`
- [ ] **h-1/2** through **h-6/6** - All fraction combinations
- [ ] **h-full** - `height: 100%`

### 2.3 Viewport & Container Heights
- [ ] **h-screen** - `height: 100vh`
- [ ] **h-svh** - `height: 100svh`
- [ ] **h-lvh** - `height: 100lvh`
- [ ] **h-dvh** - `height: 100dvh`
- [ ] **h-min** - `height: min-content`
- [ ] **h-max** - `height: max-content`
- [ ] **h-fit** - `height: fit-content`

### 2.4 Arbitrary Height Values
- [ ] **h-[32rem]** - Custom rem values
- [ ] **h-[200px]** - Custom pixel values
- [ ] **h-[50vh]** - Custom viewport values
- [ ] **h-[calc(100%-1rem)]** - Complex calc expressions

### 2.5 Implementation Status
- [x] Basic height utilities
- [x] Fractional heights
- [ ] Complete spacing scale
- [ ] Viewport height utilities
- [ ] Arbitrary values

---

## 3. Size Utilities (Width + Height) - v4.1 Enhanced

### 3.1 Size Spacing Scale (v4.1 Updated)
- [ ] **size-{number}** - `width: calc(var(--spacing) * <number>); height: calc(var(--spacing) * <number>)`
- [ ] **size-0** through **size-96** - Complete spacing scale
- [ ] **size-px** - `width: 1px; height: 1px`

### 3.2 Size Fractions (v4.1)
- [ ] **size-{fraction}** - `width: calc(<fraction> * 100%); height: calc(<fraction> * 100%)`
- [ ] **size-auto** - `width: auto; height: auto`
- [ ] **size-full** - `width: 100%; height: 100%`
- [ ] **size-1/2** through **size-6/6** - Square fractions

### 3.3 Size Viewport Units (v4.1 New)
- [ ] **size-dvw** - `width: 100dvw; height: 100dvw`
- [ ] **size-dvh** - `width: 100dvh; height: 100dvh`
- [ ] **size-lvw** - `width: 100lvw; height: 100lvw`
- [ ] **size-lvh** - `width: 100lvh; height: 100lvh`
- [ ] **size-svw** - `width: 100svw; height: 100svw`
- [ ] **size-svh** - `width: 100svh; height: 100svh`

### 3.4 Size Special Values
- [ ] **size-min** - `width: min-content; height: min-content`
- [ ] **size-max** - `width: max-content; height: max-content`
- [ ] **size-fit** - `width: fit-content; height: fit-content`

### 3.5 CSS Custom Properties (v4.1)
- [ ] **size-(--my-size)** - `width: var(--my-size); height: var(--my-size)`
- [ ] **size-(<custom-property>)** - CSS custom property reference

### 3.6 Arbitrary Size Values
- [ ] **size-[32rem]** - Custom square sizes
- [ ] **size-[200px]** - Custom pixel squares
- [ ] **size-[<value>]** - Arbitrary square dimensions

### 3.7 Implementation Status
- [ ] Size utilities implementation
- [ ] Complete size scale
- [ ] Arbitrary size values

---

## 4. Min-Width Utilities

### 4.1 Min-Width Scale
- [ ] **min-w-0** - `min-width: 0px`
- [ ] **min-w-px** through **min-w-96** - Complete spacing scale

### 4.2 Min-Width Fractions
- [ ] **min-w-full** - `min-width: 100%`
- [ ] **min-w-min** - `min-width: min-content`
- [ ] **min-w-max** - `min-width: max-content`
- [ ] **min-w-fit** - `min-width: fit-content`

### 4.3 Arbitrary Min-Width
- [ ] **min-w-[32rem]** - Custom min-width values

### 4.4 Implementation Status
- [x] Basic min-width utilities
- [ ] Complete scale implementation
- [ ] Arbitrary values

---

## 5. Max-Width Utilities

### 5.1 Max-Width Scale
- [ ] **max-w-0** through **max-w-96** - Complete spacing scale
- [ ] **max-w-none** - `max-width: none`

### 5.2 Max-Width Breakpoints
- [ ] **max-w-xs** - `max-width: 20rem` (320px)
- [ ] **max-w-sm** - `max-width: 24rem` (384px)
- [ ] **max-w-md** - `max-width: 28rem` (448px)
- [ ] **max-w-lg** - `max-width: 32rem` (512px)
- [ ] **max-w-xl** - `max-width: 36rem` (576px)
- [ ] **max-w-2xl** - `max-width: 42rem` (672px)
- [ ] **max-w-3xl** - `max-width: 48rem` (768px)
- [ ] **max-w-4xl** - `max-width: 56rem` (896px)
- [ ] **max-w-5xl** - `max-width: 64rem` (1024px)
- [ ] **max-w-6xl** - `max-width: 72rem` (1152px)
- [ ] **max-w-7xl** - `max-width: 80rem` (1280px)

### 5.3 Max-Width Prose
- [ ] **max-w-prose** - `max-width: 65ch`

### 5.4 Max-Width Screen
- [ ] **max-w-screen-sm** - `max-width: 640px`
- [ ] **max-w-screen-md** - `max-width: 768px`
- [ ] **max-w-screen-lg** - `max-width: 1024px`
- [ ] **max-w-screen-xl** - `max-width: 1280px`
- [ ] **max-w-screen-2xl** - `max-width: 1536px`

### 5.5 Max-Width Special
- [ ] **max-w-min** - `max-width: min-content`
- [ ] **max-w-max** - `max-width: max-content`
- [ ] **max-w-fit** - `max-width: fit-content`
- [ ] **max-w-full** - `max-width: 100%`

### 5.6 Arbitrary Max-Width
- [ ] **max-w-[32rem]** - Custom max-width values

### 5.7 Implementation Status
- [x] Basic max-width utilities
- [ ] Breakpoint max-widths
- [ ] Screen max-widths
- [ ] Arbitrary values

---

## 6. Min-Height Utilities

### 6.1 Min-Height Scale
- [ ] **min-h-0** through **min-h-96** - Complete spacing scale
- [ ] **min-h-px** - `min-height: 1px`

### 6.2 Min-Height Viewport
- [ ] **min-h-screen** - `min-height: 100vh`
- [ ] **min-h-svh** - `min-height: 100svh`
- [ ] **min-h-lvh** - `min-height: 100lvh`
- [ ] **min-h-dvh** - `min-height: 100dvh`

### 6.3 Min-Height Special
- [ ] **min-h-full** - `min-height: 100%`
- [ ] **min-h-min** - `min-height: min-content`
- [ ] **min-h-max** - `min-height: max-content`
- [ ] **min-h-fit** - `min-height: fit-content`

### 6.4 Arbitrary Min-Height
- [ ] **min-h-[32rem]** - Custom min-height values

### 6.5 Implementation Status
- [x] Basic min-height utilities
- [ ] Viewport min-heights
- [ ] Arbitrary values

---

## 7. Max-Height Utilities

### 7.1 Max-Height Scale
- [ ] **max-h-0** through **max-h-96** - Complete spacing scale
- [ ] **max-h-px** - `max-height: 1px`
- [ ] **max-h-none** - `max-height: none`

### 7.2 Max-Height Viewport
- [ ] **max-h-screen** - `max-height: 100vh`
- [ ] **max-h-svh** - `max-height: 100svh`
- [ ] **max-h-lvh** - `max-height: 100lvh`
- [ ] **max-h-dvh** - `max-height: 100dvh`

### 7.3 Max-Height Special
- [ ] **max-h-full** - `max-height: 100%`
- [ ] **max-h-min** - `max-height: min-content`
- [ ] **max-h-max** - `max-height: max-content`
- [ ] **max-h-fit** - `max-height: fit-content`

### 7.4 Arbitrary Max-Height
- [ ] **max-h-[32rem]** - Custom max-height values

### 7.5 Implementation Status
- [x] Basic max-height utilities
- [ ] Viewport max-heights
- [ ] Arbitrary values

---

## 8. Size Utilities (Width + Height Combined) ⭐

### 8.1 Fixed Size Values
- [ ] **size-0** - `width: 0px; height: 0px`
- [ ] **size-px** - `width: 1px; height: 1px`
- [ ] **size-0.5** - `width: 0.125rem; height: 0.125rem`
- [ ] **size-1** - `width: 0.25rem; height: 0.25rem`
- [ ] **size-1.5** - `width: 0.375rem; height: 0.375rem`
- [ ] **size-2** through **size-96** - Complete spacing scale
- [ ] **size-auto** - `width: auto; height: auto`

### 8.2 Percentage Size Values
- [ ] **size-1/2** - `width: 50%; height: 50%`
- [ ] **size-1/3**, **size-2/3** - Third-based sizing
- [ ] **size-1/4**, **size-2/4**, **size-3/4** - Quarter-based sizing
- [ ] **size-1/5** through **size-4/5** - Fifth-based sizing
- [ ] **size-1/6** through **size-5/6** - Sixth-based sizing
- [ ] **size-1/12** through **size-11/12** - Twelfth-based sizing
- [ ] **size-full** - `width: 100%; height: 100%`

### 8.3 Viewport and Container Size Values
- [ ] **size-screen** - `width: 100vw; height: 100vh`
- [ ] **size-dvw**, **size-dvh** - Dynamic viewport units
- [ ] **size-lvw**, **size-lvh** - Large viewport units
- [ ] **size-svw**, **size-svh** - Small viewport units

### 8.4 Content-Based Size Values
- [ ] **size-min** - `width: min-content; height: min-content`
- [ ] **size-max** - `width: max-content; height: max-content`
- [ ] **size-fit** - `width: fit-content; height: fit-content`
- [ ] **size-lh** - `width: 1lh; height: 1lh`

### 8.5 Custom Properties and Arbitrary Values
- [ ] **size-({custom-property})** - `width: var({custom-property}); height: var({custom-property})`
- [ ] **size-[{value}]** - `width: {value}; height: {value}`

### 8.6 Implementation Status
- [ ] Basic size utilities (0-96 scale)
- [ ] Percentage-based sizes
- [ ] Viewport unit sizes
- [ ] Content-based sizes
- [ ] Custom property support
- [ ] Arbitrary value support
- [ ] Comprehensive testing
- [ ] Documentation

---

## 9. Aspect Ratio Utilities

### 9.1 Aspect Ratio Values
- [ ] **aspect-auto** - `aspect-ratio: auto`
- [ ] **aspect-square** - `aspect-ratio: 1 / 1`
- [ ] **aspect-video** - `aspect-ratio: 16 / 9`

### 8.2 Custom Aspect Ratios
- [ ] **aspect-[4/3]** - `aspect-ratio: 4 / 3`
- [ ] **aspect-[3/2]** - `aspect-ratio: 3 / 2`
- [ ] **aspect-[21/9]** - `aspect-ratio: 21 / 9`

### 8.3 Arbitrary Aspect Ratios
- [ ] **aspect-[17/5]** - Custom aspect ratios
- [ ] **aspect-[1.77]** - Decimal aspect ratios

### 8.4 Implementation Status
- [x] Basic aspect ratio utilities
- [ ] Custom aspect ratios
- [ ] Arbitrary aspect ratios

---

## 9. Parser Implementation

### 9.1 Width/Height Pattern Recognition
- [ ] Basic pattern: `/^(w|h|size)-(0|px|0\.5|[1-9]\d*|auto|full|screen|min|max|fit|\[.+\]|\d+\/\d+)$/`
- [ ] Min/Max pattern: `/^(min-w|max-w|min-h|max-h)-(0|px|none|full|screen|min|max|fit|\[.+\]|xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|prose|screen-sm|screen-md|screen-lg|screen-xl|screen-2xl)$/`

### 9.2 Fraction Parsing
- [ ] Fraction pattern: `/^(\d+)\/(\d+)$/`
- [ ] Fraction to percentage conversion
- [ ] Common fraction optimization

### 9.3 Viewport Unit Parsing
- [ ] Modern viewport units: `svw`, `lvw`, `dvw`, `svh`, `lvh`, `dvh`
- [ ] Fallback for older browsers

### 9.4 Arbitrary Value Parsing
- [ ] Pixel values: `[200px]`
- [ ] Rem values: `[32rem]`
- [ ] Percentage values: `[75%]`
- [ ] Calc expressions: `[calc(100%-1rem)]`
- [ ] Complex expressions: `[min(100%,32rem)]`

### 9.5 Implementation Status
- [x] Basic pattern recognition
- [ ] Complete fraction parsing
- [ ] Viewport unit support
- [ ] Arbitrary value parsing
- [ ] Complex expression support

---

## 10. CSS Generation

### 10.1 Size CSS Output
- [ ] Fixed sizes: `w-4` → `width: 1rem`
- [ ] Fractions: `w-1/2` → `width: 50%`
- [ ] Viewport: `w-screen` → `width: 100vw`
- [ ] Special: `w-fit` → `width: fit-content`

### 10.2 Min/Max CSS Output
- [ ] Min constraints: `min-w-0` → `min-width: 0px`
- [ ] Max constraints: `max-w-lg` → `max-width: 32rem`
- [ ] Breakpoint sizes: `max-w-screen-md` → `max-width: 768px`

### 10.3 Aspect Ratio CSS Output
- [ ] Standard ratios: `aspect-video` → `aspect-ratio: 16 / 9`
- [ ] Custom ratios: `aspect-[4/3]` → `aspect-ratio: 4 / 3`
- [ ] Fallback for older browsers

### 10.4 Performance Optimization
- [ ] Common size caching
- [ ] Fraction calculation optimization
- [ ] Minimal CSS output

### 10.5 Implementation Status
- [x] Basic CSS generation
- [ ] Viewport unit output
- [ ] Aspect ratio CSS
- [ ] Performance optimization

---

## 11. Browser Compatibility

### 11.1 Aspect Ratio Support
- [ ] Native `aspect-ratio` property support check
- [ ] Fallback using padding-top technique
- [ ] Progressive enhancement

### 11.2 Viewport Units
- [ ] Modern viewport unit support (`svh`, `dvh`, etc.)
- [ ] Fallback to standard viewport units
- [ ] Mobile browser compatibility

### 11.3 Min/Max Content
- [ ] `min-content`, `max-content`, `fit-content` support
- [ ] Fallback strategies for older browsers

### 11.4 Implementation Status
- [ ] Aspect ratio compatibility
- [ ] Viewport unit compatibility
- [ ] Content sizing compatibility

---

## 12. TypeScript Types

### 12.1 Sizing Types
```typescript
type SpacingValue = 0 | 'px' | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 14 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 52 | 56 | 60 | 64 | 72 | 80 | 96;

type FractionalValue = '1/2' | '1/3' | '2/3' | '1/4' | '2/4' | '3/4' | '1/5' | '2/5' | '3/5' | '4/5' | '1/6' | '2/6' | '3/6' | '4/6' | '5/6' | '1/12' | '2/12' | '3/12' | '4/12' | '5/12' | '6/12' | '7/12' | '8/12' | '9/12' | '10/12' | '11/12';

type SpecialSizeValue = 'auto' | 'full' | 'screen' | 'min' | 'max' | 'fit';

type MaxWidthBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'prose';
```

### 12.2 Utility Type Definitions
- [ ] Width utility types
- [ ] Height utility types
- [ ] Size utility types
- [ ] Min/Max dimension types
- [ ] Aspect ratio types

### 12.3 IntelliSense Support
- [ ] Auto-completion for sizing utilities
- [ ] Hover documentation with pixel equivalents
- [ ] Fraction preview in hover

### 12.4 Implementation Status
- [ ] Basic sizing types
- [ ] Complete utility types
- [ ] IntelliSense integration
- [ ] Arbitrary value types

---

## 13. Testing Coverage

### 13.1 Unit Tests
- [ ] Width utility parsing tests
- [ ] Height utility parsing tests
- [ ] Min/Max dimension parsing tests
- [ ] Fraction parsing tests
- [ ] Aspect ratio parsing tests
- [ ] Arbitrary value parsing tests

### 13.2 CSS Generation Tests
- [ ] Size CSS output verification
- [ ] Fraction to percentage conversion
- [ ] Viewport unit CSS output
- [ ] Aspect ratio CSS output

### 13.3 Integration Tests
- [ ] Sizing with responsive utilities
- [ ] Complex size combinations
- [ ] Performance benchmarks

### 13.4 Implementation Status
- [x] Basic sizing tests
- [ ] Complete CSS generation tests
- [ ] Integration tests
- [ ] Performance tests

---

## 🎯 Implementation Priority

### Phase 1: Core Sizing (Current)
1. ✅ Basic width/height utilities
2. ✅ Fractional sizes
3. 🚧 Min/max dimensions
4. ❌ Aspect ratio utilities

### Phase 2: Advanced Features
1. ❌ Viewport unit support
2. ❌ Size utilities (w+h combined)
3. ❌ Arbitrary values

### Phase 3: Polish & Optimization
1. ❌ Modern viewport units
2. ❌ Performance optimization
3. ❌ Complete testing

---

## 🔗 Related Files

- [Sizing Parser](../../packages/cssma-v3/src/core/parsers/sizing-parser.ts)
- [Sizing Tests](../../packages/cssma-v3/tests/parser.sizing.test.ts)
- [Aspect Ratio Tests](../../packages/cssma-v3/tests/parser.aspect-ratio.test.ts)

---

**Next Review**: January 2025 
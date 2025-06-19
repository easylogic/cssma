# Spacing Utilities Implementation Checklist

## 📋 Overview
Comprehensive checklist for implementing Spacing utilities in FigmaikR, covering margins, padding, and space-between utilities.

**Status**: 🚧 In Progress (~80% Complete)  
**Last Updated**: December 2024  
**Reference**: [Tailwind CSS v4.1 Spacing Documentation](https://tailwindcss.com/docs/padding)

---

## 1. Margin Utilities

### 1.1 All Sides Margin
- [ ] **m-{value}** - `margin: {value}`

### 1.2 Directional Margins
- [ ] **mx-{value}** - `margin-left: {value}; margin-right: {value}`
- [ ] **my-{value}** - `margin-top: {value}; margin-bottom: {value}`
- [ ] **ms-{value}** - `margin-inline-start: {value}` (logical)
- [ ] **me-{value}** - `margin-inline-end: {value}` (logical)
- [ ] **mt-{value}** - `margin-top: {value}`
- [ ] **mr-{value}** - `margin-right: {value}`
- [ ] **mb-{value}** - `margin-bottom: {value}`
- [ ] **ml-{value}** - `margin-left: {value}`

### 1.3 Spacing Scale Values
- [ ] **{prefix}-0** - `0px`
- [ ] **{prefix}-px** - `1px`
- [ ] **{prefix}-0.5** - `0.125rem` (2px)
- [ ] **{prefix}-1** - `0.25rem` (4px)
- [ ] **{prefix}-1.5** - `0.375rem` (6px)
- [ ] **{prefix}-2** - `0.5rem` (8px)
- [ ] **{prefix}-2.5** - `0.625rem` (10px)
- [ ] **{prefix}-3** - `0.75rem` (12px)
- [ ] **{prefix}-3.5** - `0.875rem` (14px)
- [ ] **{prefix}-4** - `1rem` (16px)
- [ ] **{prefix}-5** - `1.25rem` (20px)
- [ ] **{prefix}-6** - `1.5rem` (24px)
- [ ] **{prefix}-7** - `1.75rem` (28px)
- [ ] **{prefix}-8** - `2rem` (32px)
- [ ] **{prefix}-9** - `2.25rem` (36px)
- [ ] **{prefix}-10** - `2.5rem` (40px)
- [ ] **{prefix}-11** - `2.75rem` (44px)
- [ ] **{prefix}-12** - `3rem` (48px)
- [ ] **{prefix}-14** - `3.5rem` (56px)
- [ ] **{prefix}-16** - `4rem` (64px)
- [ ] **{prefix}-20** - `5rem` (80px)
- [ ] **{prefix}-24** - `6rem` (96px)
- [ ] **{prefix}-28** - `7rem` (112px)
- [ ] **{prefix}-32** - `8rem` (128px)
- [ ] **{prefix}-36** - `9rem` (144px)
- [ ] **{prefix}-40** - `10rem` (160px)
- [ ] **{prefix}-44** - `11rem` (176px)
- [ ] **{prefix}-48** - `12rem` (192px)
- [ ] **{prefix}-52** - `13rem` (208px)
- [ ] **{prefix}-56** - `14rem` (224px)
- [ ] **{prefix}-60** - `15rem` (240px)
- [ ] **{prefix}-64** - `16rem` (256px)
- [ ] **{prefix}-72** - `18rem` (288px)
- [ ] **{prefix}-80** - `20rem` (320px)
- [ ] **{prefix}-96** - `24rem` (384px)

### 1.4 Auto Margin
- [ ] **{prefix}-auto** - `auto`

### 1.5 Negative Margins
- [ ] **-{prefix}-{value}** - Negative spacing values

### 1.6 Arbitrary Values
- [ ] **{prefix}-[14px]** - Custom pixel values
- [ ] **{prefix}-[3.23rem]** - Custom rem values
- [ ] **{prefix}-[2ch]** - Character-based values
- [ ] **{prefix}-[calc(100%-1rem)]** - Calc expressions

### 1.7 CSS Custom Properties (v4.1)
- [ ] **{prefix}-(--my-spacing)** - CSS custom property reference
- [ ] **{prefix}-<number>** - Uses `calc(var(--spacing) * <number>)`
- [ ] **{prefix}-px** - Direct pixel value `1px`
- [ ] Logical properties: **ms-{value}** → `margin-inline-start`
- [ ] Logical properties: **me-{value}** → `margin-inline-end`

### 1.8 Implementation Status
- [x] Basic margin utilities
- [x] Directional margins
- [x] Core spacing scale
- [ ] Complete spacing scale
- [ ] Negative margins
- [ ] Arbitrary values
- [ ] Logical properties

---

## 2. Padding Utilities

### 2.1 All Sides Padding
- [ ] **p-{value}** - `padding: {value}`

### 2.2 Directional Padding
- [ ] **px-{value}** - `padding-left: {value}; padding-right: {value}`
- [ ] **py-{value}** - `padding-top: {value}; padding-bottom: {value}`
- [ ] **ps-{value}** - `padding-inline-start: {value}` (logical)
- [ ] **pe-{value}** - `padding-inline-end: {value}` (logical)
- [ ] **pt-{value}** - `padding-top: {value}`
- [ ] **pr-{value}** - `padding-right: {value}`
- [ ] **pb-{value}** - `padding-bottom: {value}`
- [ ] **pl-{value}** - `padding-left: {value}`

### 2.3 Value Support
- [ ] Same spacing scale as margins (0, px, 0.5...96)
- [ ] Arbitrary values: **p-[1.2rem]**
- [ ] No negative values (padding cannot be negative)

### 2.4 CSS Custom Properties (v4.1)
- [ ] **p-(--my-padding)** - CSS custom property reference  
- [ ] **p-<number>** - Uses `calc(var(--spacing) * <number>)`
- [ ] **px-<number>** - Uses `padding-inline: calc(var(--spacing) * <number>)`
- [ ] **py-<number>** - Uses `padding-block: calc(var(--spacing) * <number>)`
- [ ] **ps-<number>** - Uses `padding-inline-start: calc(var(--spacing) * <number>)`
- [ ] **pe-<number>** - Uses `padding-inline-end: calc(var(--spacing) * <number>)`

### 2.5 Implementation Status
- [x] Basic padding utilities
- [x] Directional padding
- [x] Core spacing scale
- [ ] Complete spacing scale
- [ ] Arbitrary values
- [ ] Logical properties

---

## 3. Space Between Utilities

### 3.1 Horizontal Space Between
- [ ] **space-x-{value}** - Horizontal spacing between child elements
- [ ] **space-x-reverse** - Reverse horizontal spacing direction

### 3.2 Vertical Space Between
- [ ] **space-y-{value}** - Vertical spacing between child elements
- [ ] **space-y-reverse** - Reverse vertical spacing direction

### 3.3 Value Support
- [ ] Same spacing scale as margins/padding
- [ ] Negative values: **-space-x-4**
- [ ] Arbitrary values: **space-y-[1.7rem]**

### 3.4 CSS Implementation
```css
.space-x-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1rem * var(--tw-space-x-reverse));
  margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
}

.space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}
```

### 3.5 Implementation Status
- [ ] Space-x utilities
- [ ] Space-y utilities
- [ ] Reverse utilities
- [ ] Negative values
- [ ] Arbitrary values

---

## 4. Parser Implementation

### 4.1 Margin Pattern Recognition
- [ ] Pattern: `/^-?m([trbllxys]|[se])?-(.+)$/`
- [ ] Directional parsing: `mt`, `mr`, `mb`, `ml`, `mx`, `my`, `ms`, `me`
- [ ] Negative value handling: `-m-4`, `-mx-2`
- [ ] Auto value handling: `m-auto`, `mx-auto`

### 4.2 Padding Pattern Recognition
- [ ] Pattern: `/^p([trbllxys]|[se])?-(.+)$/`
- [ ] Directional parsing: `pt`, `pr`, `pb`, `pl`, `px`, `py`, `ps`, `pe`
- [ ] No negative values (validation)

### 4.3 Space Between Pattern Recognition
- [ ] Pattern: `/^-?space-([xy])(-reverse)?-(.+)$/`
- [ ] Reverse direction parsing
- [ ] Negative value handling

### 4.4 Value Parsing
- [ ] Spacing scale lookup
- [ ] Arbitrary value parsing: `[14px]`, `[3.23rem]`
- [ ] Special values: `auto`
- [ ] Negative value conversion

### 4.5 Implementation Status
- [x] Basic pattern recognition
- [x] Directional parsing
- [ ] Complete value parsing
- [ ] Arbitrary value support
- [ ] Space between utilities

---

## 5. CSS Generation

### 5.1 Margin CSS Output
- [ ] Single property mapping: `m-4` → `margin: 1rem`
- [ ] Directional property mapping: `mx-4` → `margin-left: 1rem; margin-right: 1rem`
- [ ] Logical property support: `ms-4` → `margin-inline-start: 1rem`
- [ ] Negative value handling: `-m-4` → `margin: -1rem`

### 5.2 Padding CSS Output
- [ ] Single property mapping: `p-4` → `padding: 1rem`
- [ ] Directional property mapping: `px-4` → `padding-left: 1rem; padding-right: 1rem`
- [ ] Logical property support: `ps-4` → `padding-inline-start: 1rem`

### 5.3 Space Between CSS Output
- [ ] Complex CSS generation with CSS variables
- [ ] Child selector implementation: `> :not([hidden]) ~ :not([hidden])`
- [ ] Reverse direction CSS variables

### 5.4 Performance Optimization
- [ ] Common value caching
- [ ] CSS variable optimization
- [ ] Minimal CSS output

### 5.5 Implementation Status
- [x] Basic CSS generation
- [x] Directional properties
- [ ] Logical properties
- [ ] Space between CSS
- [ ] Performance optimization

---

## 6. Browser Compatibility

### 6.1 Logical Properties
- [ ] `margin-inline-start/end` support check
- [ ] `padding-inline-start/end` support check
- [ ] Fallback to physical properties for older browsers

### 6.2 CSS Variables
- [ ] CSS custom property support for space-between
- [ ] Fallback strategies for unsupported browsers

### 6.3 Implementation Status
- [ ] Logical property support
- [ ] Browser compatibility checks
- [ ] Fallback implementations

---

## 7. TypeScript Types

### 7.1 Spacing Value Types
```typescript
type SpacingScale = 0 | 'px' | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 14 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 52 | 56 | 60 | 64 | 72 | 80 | 96;

type MarginDirection = '' | 't' | 'r' | 'b' | 'l' | 'x' | 'y' | 's' | 'e';
type PaddingDirection = '' | 't' | 'r' | 'b' | 'l' | 'x' | 'y' | 's' | 'e';
```

### 7.2 Utility Type Definitions
- [ ] Margin utility types
- [ ] Padding utility types
- [ ] Space-between utility types
- [ ] Arbitrary value support in types
- [ ] Negative margin types

### 7.3 IntelliSense Support
- [ ] Auto-completion for spacing utilities
- [ ] Hover documentation with CSS output
- [ ] Template literal types for arbitrary values

### 7.4 Implementation Status
- [ ] Basic spacing types
- [ ] Complete utility types
- [ ] IntelliSense integration
- [ ] Arbitrary value types

---

## 8. Testing Coverage

### 8.1 Unit Tests
- [ ] Margin utility parsing tests
- [ ] Padding utility parsing tests
- [ ] Space-between utility parsing tests
- [ ] Negative value parsing tests
- [ ] Arbitrary value parsing tests
- [ ] Auto value parsing tests

### 8.2 CSS Generation Tests
- [ ] Margin CSS output verification
- [ ] Padding CSS output verification
- [ ] Space-between CSS output verification
- [ ] Logical property CSS output
- [ ] Directional property CSS output

### 8.3 Integration Tests
- [ ] Spacing with responsive utilities
- [ ] Spacing with hover/focus states
- [ ] Complex spacing combinations

### 8.4 Edge Case Tests
- [ ] Invalid spacing values
- [ ] Conflicting spacing utilities
- [ ] Zero spacing values
- [ ] Large spacing values

### 8.5 Implementation Status
- [x] Basic unit tests
- [ ] Complete CSS generation tests
- [ ] Integration tests
- [ ] Edge case coverage

---

## 9. Documentation

### 9.1 API Reference
- [ ] Complete spacing utility reference
- [ ] CSS property mappings
- [ ] Spacing scale documentation
- [ ] Logical property explanation

### 9.2 Usage Examples
- [ ] Basic spacing examples
- [ ] Directional spacing patterns
- [ ] Space-between use cases
- [ ] Responsive spacing examples

### 9.3 Migration Guide
- [ ] Breaking changes from v2
- [ ] New logical property utilities
- [ ] Deprecated utility replacements

### 9.4 Implementation Status
- [ ] Basic documentation
- [ ] Complete API reference
- [ ] Usage examples
- [ ] Migration guide

---

## 10. Performance Considerations

### 10.1 CSS Size Optimization
- [ ] Common spacing value optimization
- [ ] CSS property grouping
- [ ] Minimal output generation

### 10.2 Runtime Performance
- [ ] Fast spacing value lookup
- [ ] Efficient pattern matching
- [ ] Memory usage optimization

### 10.3 Implementation Status
- [ ] CSS size optimization
- [ ] Runtime performance
- [ ] Memory optimization

---

## 🎯 Implementation Priority

### Phase 1: Core Spacing (Current)
1. ✅ Basic margin/padding utilities
2. 🚧 Complete spacing scale
3. 🚧 Negative margins
4. ❌ Arbitrary values

### Phase 2: Advanced Features
1. ❌ Space-between utilities
2. ❌ Logical properties
3. ❌ Complete TypeScript types

### Phase 3: Polish & Optimization
1. ❌ Performance optimization
2. ❌ Complete testing
3. ❌ Documentation

---

## 🔗 Related Files

- [Spacing Parser](../../packages/cssma-v3/src/core/parsers/spacing-parser.ts)
- [Spacing Tests](../../packages/cssma-v3/tests/parser.spacing.test.ts)
- [CSS Generator](../../packages/cssma-v3/src/core/converter.ts)

---

**Next Review**: January 2025 
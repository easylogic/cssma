# CSS-to-Figma Documentation

CSS-to-Figma is a library that converts Tailwind CSS styles to Figma styles and vice versa.

## 📖 Documentation Structure

### Core Specifications
- **[Layout](specs/layout.md)** - Auto Layout, Flexbox, Sizing
- **[Background](specs/background.md)** - Colors, Gradients, Images
- **[Typography](specs/typography.md)** - Text, Fonts, Alignment
- **[Position](specs/position.md)** - Positioning, Constraints
- **[Border](specs/border.md)** - Borders, Corner Radius
- **[Effects](specs/effects.md)** - Shadows, Blur, Opacity
- **[Colors](specs/colors.md)** - Color System, Presets
- **[Variables](specs/variables.md)** - Figma Variable Binding
- **[Vectors](specs/vectors.md)** - Vector Nodes, SVG Paths
- **[Dynamic Conversion](specs/dynamic-conversion.md)** - ✨ **NEW** Real-time CSS processing with caching

### React Integration
- **[CSSMA React](specs/cssma-react.md)** - ✨ **NEW** React hooks and components for dynamic CSS processing

### Conversion Specifications
- **[Figma to CSS](specs/figma-to-css.md)** - ✨ **NEW** Comprehensive Figma → CSS conversion guide

### API Reference
- **[Apply Styles API](specs/apply-styles.md)** - ✨ **NEW** Core function for applying CSS styles to Figma nodes
- **[Conversion Functions](api/conversion.md)** - `processCssStyles`, `figmaToCss`
- **[TypeScript Types](api/types.md)** - Type Definitions

### Examples & Guides
- **[Basic Usage](examples/basic-usage.md)** - Getting Started
- **[Components](examples/components.md)** - Component Examples
- **[Best Practices](examples/best-practices.md)** - Guidelines

## 🚀 Quick Start

### Core Library
```typescript
import { processCssStyles, figmaToCss } from 'cssma';

// Tailwind CSS → Figma
const styles = processCssStyles('flex-col w-full bg-[#FF0000] rounded-lg');
// Apply to Figma node...

// Figma → Tailwind CSS
const tailwindClasses = figmaToCss({
  layoutMode: "VERTICAL",
  fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }],
  cornerRadius: 8
});
```

### React Integration
```tsx
import { useCssma, NodeRenderer } from 'cssma-react';

function MyComponent() {
  const { className, styleContent } = useCssma('w-[400px] bg-blue-500 hover:bg-blue-600');
  
  return (
    <>
      <style>{styleContent}</style>
      <div className={className}>Dynamic styled content</div>
    </>
  );
}
```

## 🎯 Core Features

1. **Bidirectional Conversion** - CSS ↔ Figma
2. **React Integration** - Hooks and components for React apps
3. **Dynamic Processing** - Real-time CSS class processing with caching
4. **Comprehensive Coverage** - Layout, Colors, Typography, Effects
5. **Variable Support** - Figma variable binding
6. **Type Safety** - Full TypeScript support
7. **Performance Optimized** - Efficient conversion algorithms

## 📦 Packages

- **`cssma`** - Core library for CSS ↔ Figma conversion
- **`cssma-react`** - React hooks and components for dynamic CSS processing

## 📋 Supported Properties

| Category | Tailwind Classes | Figma Properties |
|----------|------------------|------------------|
| Layout | `flex-col`, `w-full`, `gap-4` | `layoutMode`, `layoutSizingHorizontal` |
| Colors | `bg-[#FF0000]`, `text-blue-500` | `fills`, `strokes` |
| Typography | `text-lg`, `font-bold` | `fontSize`, `fontName` |
| Effects | `shadow-lg`, `blur-sm` | `effects` |
| Position | `absolute`, `center-x` | `constraints`, `layoutPositioning` |

## 🔧 Installation

```bash
# Core library
npm install cssma

# React integration
npm install cssma-react cssma react react-dom
```

## 📝 Contributing

We welcome contributions! Please see each spec file for detailed implementation requirements.

## 📄 License

MIT License 
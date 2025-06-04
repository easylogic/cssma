# figm.ai.kr

A comprehensive design system toolkit for Figma that bridges the gap between design and code with seamless Tailwind CSS integration.

## Project Overview

FigmaikR provides a powerful, bidirectional conversion system between Tailwind CSS and Figma, enabling designers and developers to work together more efficiently. The toolkit consists of two main packages working in harmony:

## Project Structure

### @easylogic/cssma

The core library providing robust CSS/Tailwind to Figma conversion and vice versa.

#### ✅ **Comprehensive Features**

**🎨 Layout & Positioning**
- [x] **Flexbox & Grid** (flex-row, flex-col, grid layouts)
- [x] **Auto Layout** (gap, padding, alignment, sizing)
- [x] **Advanced Positioning** (absolute, relative with constraint system)
- [x] **Figma Constraints** (MIN, MAX, CENTER, STRETCH, SCALE)

**🎯 Typography System**
- [x] **Font Properties** (size, weight, family, style)
- [x] **Text Alignment** (horizontal, vertical, justify)
- [x] **Text Formatting** (case, decoration, spacing)
- [x] **Auto-sizing** (width/height, truncation, wrapping)
- [x] **Line Height & Letter Spacing** (preset and arbitrary values)

**🌈 Colors & Gradients**
- [x] **Solid Colors** (hex, named colors, opacity)
- [x] **Advanced Gradients** (linear, radial, conic with multi-stops)
- [x] **Background Images** (URL, data URLs, positioning, scaling)
- [x] **Vector Fill** (SVG/vector element colors)
- [x] **Blend Modes** (background-blend-mode support)

**🎭 Visual Effects**
- [x] **Box Shadows** (preset and custom values)
- [x] **Filter Effects** (blur, backdrop-blur, drop-shadow with full bi-directional conversion)
- [x] **Border System** (width, radius, color, style, dash patterns)
- [x] **Opacity Controls** (full opacity range support)

**🏗️ Node System**
- [x] **Complete Node Types** (FRAME, TEXT, RECTANGLE, ELLIPSE, POLYGON, STAR, LINE, VECTOR, GROUP, COMPONENT, BOOLEAN_OPERATION, SECTION, COMPONENT_SET, INSTANCE)
- [x] **Component Variants** (advanced component system with properties)
- [x] **Variable Binding** (Figma variables integration)

#### 🎪 **Advanced Filter Effects**

Our filter effects system provides seamless integration with Figma's native effects API:

##### **Layer Blur (`blur-*`)**
```css
/* Preset Values */
blur-none blur-sm blur blur-md blur-lg blur-xl blur-2xl blur-3xl

/* Arbitrary Values */
blur-[4] blur-[10] blur-[20]

/* Maps to Figma's LAYER_BLUR effect */
```

##### **Backdrop Blur (`backdrop-blur-*`)**
```css
/* Preset Values */
backdrop-blur-none backdrop-blur-sm backdrop-blur backdrop-blur-md 
backdrop-blur-lg backdrop-blur-xl backdrop-blur-2xl backdrop-blur-3xl

/* Arbitrary Values */
backdrop-blur-[4] backdrop-blur-[15] backdrop-blur-[20]

/* Maps to Figma's BACKGROUND_BLUR effect */
```

##### **Drop Shadow (`drop-shadow-*`)**
```css
/* Preset Values */
drop-shadow-none drop-shadow-sm drop-shadow drop-shadow-md 
drop-shadow-lg drop-shadow-xl drop-shadow-2xl

/* Arbitrary Values */
drop-shadow-[0_4_8_rgba(0,0,0,0.1)]
drop-shadow-[2_6_12_rgba(255,0,0,0.2)]

/* Maps to Figma's DROP_SHADOW effect (filter-based, no spread) */
```

##### **Real-world Examples**
```css
/* Glass Morphism Card */
.glass-card {
  @apply w-[300] h-[200] bg-white/20 backdrop-blur-md rounded-xl 
         border border-white/30 p-[24] drop-shadow-lg;
}

/* Blurred Image Overlay */
.blur-overlay {
  @apply absolute inset-0 bg-black/40 backdrop-blur-sm 
         flex items-center justify-center;
}

/* Complex Filter Combination */
.hero-banner {
  @apply relative bg-gradient-to-r from-blue-600 to-purple-600 
         blur-[1] drop-shadow-[0_8_16_rgba(0,0,0,0.15)] 
         backdrop-blur-xl rounded-2xl;
}
```

#### 🔄 **Bidirectional Conversion**

**CSS → Figma:**
```typescript
import { processCssStyles } from '@easylogic/cssma';

const styles = processCssStyles('flex-col w-full bg-gradient-to-r from-blue-500 to-purple-600 backdrop-blur-md drop-shadow-xl rounded-lg p-[24] gap-[16]');
// Converts to complete Figma style object
```

**Figma → CSS:**
```typescript
import { figmaToCss } from '@easylogic/cssma';

const cssClasses = figmaToCss({
  layoutMode: "VERTICAL",
  fills: [{ type: "GRADIENT_LINEAR", ... }],
  effects: [
    { type: "BACKGROUND_BLUR", radius: 12 },
    { type: "DROP_SHADOW", radius: 25, offset: { x: 0, y: 20 } }
  ],
  cornerRadius: 8
});
// Result: "flex-col bg-gradient-to-r from-blue-500 to-purple-600 backdrop-blur-md drop-shadow-xl rounded-lg"
```

#### 📋 **Advanced Position System**

Our constraint system provides precise control over element positioning:

```css
/* Basic Positioning */
absolute left-[10] top-[20]     /* MIN constraints */
absolute right-[10] bottom-[20] /* MAX constraints */

/* Center Positioning */
absolute center-x center-y      /* Perfect centering */
absolute center-x left-[50]     /* Center with offset */

/* Stretch Positioning */
absolute stretch-x stretch-y              /* Fill parent */
absolute stretch-x left-[10] right-[10]   /* With margins */

/* Scale Positioning */
absolute scale-x scale-y                  /* Maintain aspect ratio */
absolute scale-x left-[0] right-[100]     /* Scale with bounds */
```

#### 🎨 **Component System**

Create sophisticated component systems with variants:

```typescript
const buttonSystem = {
  type: 'COMPONENT_SET',
  name: 'Button',
  variants: {
    'primary-md': {
      styles: 'flex items-center justify-center px-[16] py-[8] bg-blue-600 text-white rounded-md font-medium',
      properties: { text: 'Button', size: 'md', variant: 'primary' }
    },
    'secondary-lg': {
      styles: 'flex items-center justify-center px-[24] py-[12] bg-gray-100 text-gray-900 rounded-lg font-medium',
      properties: { text: 'Button', size: 'lg', variant: 'secondary' }
    }
  }
};
```

#### 📊 **Supported Properties Overview**

| Category | Supported Classes | Figma Mapping |
|----------|------------------|---------------|
| **Layout** | `flex-*`, `grid-*`, `w-*`, `h-*`, `gap-*` | `layoutMode`, `sizing`, `spacing` |
| **Position** | `absolute`, `left-*`, `center-*`, `stretch-*` | `layoutPositioning`, `constraints` |
| **Colors** | `bg-*`, `text-*`, `from-*`, `to-*`, `via-*` | `fills`, `gradients` |
| **Typography** | `text-*`, `font-*`, `leading-*`, `tracking-*` | `fontSize`, `fontName`, `lineHeight` |
| **Borders** | `border-*`, `rounded-*` | `strokes`, `cornerRadius` |
| **Effects** | `shadow-*`, `blur-*`, `backdrop-blur-*`, `drop-shadow-*` | `effects` array |
| **Spacing** | `p-*`, `m-*`, `px-*`, `py-*` | `padding`, `margin` |

### cssma-plugin

A powerful Figma plugin that brings the @easylogic/cssma library directly into the Figma interface.

#### 🚀 **Plugin Features**
- **Real-time Conversion**: Convert between CSS and Figma styles instantly
- **Bulk Operations**: Apply styles to multiple elements simultaneously  
- **Design System Integration**: Work with Figma variables and components
- **Code Export**: Export designs as clean Tailwind CSS code
- **Live Preview**: See changes in real-time as you type

## 🎯 **Key Features**

- **🔄 Bidirectional Conversion**: Seamless CSS ↔ Figma transformation
- **🎨 Advanced Effects**: Full filter effects support (blur, backdrop-blur, drop-shadow)
- **📐 Constraint System**: Figma's powerful positioning system (MIN, MAX, CENTER, STRETCH, SCALE)
- **🎭 Component Variants**: Sophisticated component system with properties
- **🌈 Variable Integration**: Native Figma variables support
- **📱 Design Tokens**: Export and import design tokens
- **⚡ Performance**: Optimized for large design systems
- **🧩 Extensible**: Plugin architecture for custom functionality

## 🛠️ **Usage Examples**

### **Glass Morphism Components**
```typescript
const glassCard = {
  type: 'FRAME',
  name: 'Glass Card',
  styles: 'relative w-[320] h-[200] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-[24] shadow-2xl',
  children: [
    {
      type: 'TEXT',
      name: 'Title',
      styles: 'text-white text-xl font-bold mb-[8]',
      text: 'Glass Effect'
    },
    {
      type: 'TEXT', 
      name: 'Description',
      styles: 'text-white/80 text-sm leading-relaxed',
      text: 'Beautiful glass morphism effect with backdrop blur and transparency.'
    }
  ]
};
```

### **Modern Landing Page Hero**
```typescript
const heroSection = {
  type: 'FRAME',
  name: 'Hero Section',
  styles: 'relative flex-col w-full h-[600] bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 items-center justify-center text-center p-[64]',
  children: [
    {
      type: 'FRAME',
      name: 'Background Blur',
      styles: 'absolute inset-0 bg-black/20 backdrop-blur-sm'
    },
    {
      type: 'TEXT',
      name: 'Hero Title',
      styles: 'relative text-white text-6xl font-black leading-tight mb-[24] drop-shadow-lg',
      text: 'Design Meets Code'
    },
    {
      type: 'TEXT',
      name: 'Hero Subtitle', 
      styles: 'relative text-white/90 text-xl leading-relaxed mb-[32] max-w-[600]',
      text: 'Bridge the gap between design and development with our powerful Tailwind CSS integration.'
    },
    {
      type: 'FRAME',
      name: 'CTA Buttons',
      styles: 'relative flex-row gap-[16]',
      children: [
        {
          type: 'FRAME',
          name: 'Primary CTA',
          styles: 'flex items-center justify-center px-[32] py-[16] bg-white text-black rounded-xl font-semibold text-lg hover:bg-white/90 transition-all drop-shadow-md',
          children: [{ type: 'TEXT', text: 'Get Started', styles: 'text-black' }]
        },
        {
          type: 'FRAME', 
          name: 'Secondary CTA',
          styles: 'flex items-center justify-center px-[32] py-[16] bg-white/10 text-white rounded-xl font-semibold text-lg border border-white/30 backdrop-blur-sm hover:bg-white/20 transition-all',
          children: [{ type: 'TEXT', text: 'Learn More', styles: 'text-white' }]
        }
      ]
    }
  ]
};
```

### **Interactive Component System**
```typescript
const interactiveButton = {
  type: 'COMPONENT_SET',
  name: 'Interactive Button',
  variants: {
    'primary-default': {
      styles: 'flex items-center justify-center px-[20] py-[12] bg-blue-600 text-white rounded-lg font-medium shadow-md transition-all',
      state: 'default'
    },
    'primary-hover': {
      styles: 'flex items-center justify-center px-[20] py-[12] bg-blue-700 text-white rounded-lg font-medium shadow-lg transform scale-105 transition-all',
      state: 'hover'  
    },
    'primary-pressed': {
      styles: 'flex items-center justify-center px-[20] py-[12] bg-blue-800 text-white rounded-lg font-medium shadow-inner transform scale-95 transition-all',
      state: 'pressed'
    },
    'primary-disabled': {
      styles: 'flex items-center justify-center px-[20] py-[12] bg-gray-400 text-gray-200 rounded-lg font-medium opacity-50 cursor-not-allowed',
      state: 'disabled'
    }
  }
};
```

## 📈 **Performance & Scale**

- **⚡ Fast Processing**: Handles large design systems efficiently
- **🧮 Batch Operations**: Process hundreds of elements simultaneously  
- **💾 Memory Optimized**: Minimal memory footprint
- **🔄 Incremental Updates**: Only update changed properties
- **📊 Analytics**: Built-in performance monitoring

## 🔮 **Roadmap**

#### **In Development**
- [ ] **Animation System** (transition, keyframes, micro-interactions)
- [ ] **Advanced Transform** (scale, rotate, skew with matrix support)
- [ ] **Design Token Management** (automated export/import workflows)
- [ ] **Component Documentation** (auto-generated style guides)

#### **Future Plans**
- [ ] **React Integration** (direct component generation)
- [ ] **Vue.js Support** (component and style generation)
- [ ] **Figma Dev Mode** (enhanced developer handoff)
- [ ] **Design System Analytics** (usage tracking and optimization)

## 🤝 **Contributing**

We welcome contributions from the community! Whether it's bug fixes, new features, or documentation improvements:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 **Resources**

- **[Documentation](./packages/cssma/spec.md)** - Comprehensive API reference
- **[Examples](./packages/cssma/src/examples/)** - Real-world usage examples
- **[Figma Plugin](./apps/cssma-plugin/)** - Plugin source code
- **[Issue Tracker](https://github.com/easylogic/figmaikr/issues)** - Bug reports and feature requests

---

**Built with ❤️ by the FigmaikR team**

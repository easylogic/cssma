# FigmaikR

A comprehensive design system toolkit that bridges the gap between design and code with seamless Tailwind CSS integration.

## 🎯 Project Overview

FigmaikR provides a powerful, bidirectional conversion system between Tailwind CSS and Figma, enabling designers and developers to work together more efficiently.

## 📦 Packages

### [cssma](./packages/cssma/)
The core library providing robust CSS/Tailwind to Figma conversion and vice versa.

**Key Features:**
- 🔄 **Bidirectional Conversion** - CSS ↔ Figma transformation
- 🎨 **Advanced Effects** - Full filter effects support (blur, backdrop-blur, drop-shadow)
- 📐 **Constraint System** - Figma's positioning system (MIN, MAX, CENTER, STRETCH, SCALE)
- 🎭 **Component Support** - Component variants and design system integration
- 🌈 **Variable Integration** - Native Figma variables support

```typescript
import { processCssStyles, figmaToCss } from 'cssma';

// CSS → Figma
const styles = processCssStyles('flex-col w-full bg-gradient-to-r from-blue-500 to-purple-600 backdrop-blur-md rounded-lg');

// Figma → CSS
const classes = figmaToCss({
  layoutMode: "VERTICAL",
  fills: [{ type: "GRADIENT_LINEAR", ... }],
  effects: [{ type: "BACKGROUND_BLUR", radius: 12 }]
});
```

### [cssma-plugin](./apps/cssma-plugin/)
A powerful Figma plugin that brings the cssma library directly into the Figma interface.

**Plugin Features:**
- ⚡ **Real-time Conversion** - Convert between CSS and Figma styles instantly
- 🔄 **Bulk Operations** - Apply styles to multiple elements simultaneously  
- 🎨 **Design System Integration** - Work with Figma variables and components
- 📤 **Code Export** - Export designs as clean Tailwind CSS code

## 🚀 Development & Release

### 📋 Release Management with Changesets

This project uses [Changesets](https://github.com/changesets/changesets) for version management and automated releases.

#### Creating a Changeset

When you make changes that should be included in a release:

```bash
# Create a new changeset
pnpm changeset

# Check current changeset status
pnpm changeset:status
```

#### Release Process

```bash
# 1. Version packages (updates package.json and CHANGELOG.md)
pnpm changeset:version

# 2. Build and publish packages
pnpm release
```

#### Changeset Types

- **patch** - Bug fixes and small improvements
- **minor** - New features that don't break existing functionality
- **major** - Breaking changes

#### Automated Releases

The project includes GitHub Actions workflow that automatically:
- Creates release PRs when changesets are added
- Publishes packages to NPM when release PRs are merged
- Updates changelogs and version numbers

### 🔧 Development Commands

```bash
# Install dependencies
pnpm install

# Start development mode
pnpm dev

# Build all packages
pnpm build

# Run tests
pnpm test

# Clean build artifacts
pnpm clean
```

## 📚 Documentation

### 📖 **Core Library**
- **[API Documentation](./packages/cssma/README.md)** - Complete library reference
- **[Specification Docs](./docs/)** - Detailed technical specifications

### 🔧 **Getting Started**
- **[Installation Guide](./packages/cssma/README.md#installation)** - Setup instructions
- **[Quick Start](./packages/cssma/README.md#quick-start)** - Basic usage examples
- **[Plugin Setup](./apps/cssma-plugin/README.md)** - Figma plugin installation

## 🚀 Quick Examples

### Glass Morphism Card
```typescript
const glassCard = {
  type: 'FRAME',
  name: 'Glass Card',
  styles: 'w-[320] h-[200] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-[24]',
  children: [
    {
      type: 'TEXT',
      name: 'Title',
      styles: 'text-white text-xl font-bold',
      text: 'Glass Effect'
    }
  ]
};
```

### Modern Button System
```typescript
const buttonVariants = {
  primary: 'px-[20] py-[12] bg-blue-600 text-white rounded-lg font-medium shadow-md',
  secondary: 'px-[20] py-[12] bg-gray-100 text-gray-900 rounded-lg font-medium',
  ghost: 'px-[20] py-[12] text-blue-600 hover:bg-blue-50 rounded-lg font-medium'
};
```

## 🎨 Supported Features

| Category | Support | Examples |
|----------|---------|----------|
| **Layout** | ✅ Complete | `flex-col`, `grid`, `w-full`, `gap-4` |
| **Colors** | ✅ Complete | `bg-blue-500`, `text-[#FF0000]`, gradients |
| **Typography** | ✅ Complete | `text-lg`, `font-bold`, `leading-tight` |
| **Effects** | ✅ Complete | `shadow-lg`, `blur-md`, `backdrop-blur-xl` |
| **Position** | ✅ Complete | `absolute`, `center-x`, `stretch-y` |
| **Borders** | ✅ Complete | `border-2`, `rounded-lg`, `border-dashed` |
| **Variables** | ✅ Complete | `bg-$[color/primary]`, variable binding |

## 🛠️ Installation

```bash
# Install the core library
npm install cssma

# Or using pnpm
pnpm add cssma
```

## 🤝 Contributing

We welcome contributions! Please check out:

- **[Contributing Guide](./CONTRIBUTING.md)** - Guidelines for contributors
- **[Issue Tracker](https://github.com/easylogic/figmaikr/issues)** - Bug reports and feature requests
- **[Discussions](https://github.com/easylogic/figmaikr/discussions)** - Community discussions

### Contributing Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add a changeset: `pnpm changeset`
5. Commit your changes
6. Create a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **[NPM Package](https://www.npmjs.com/package/cssma)**
- **[Figma Plugin](https://www.figma.com/community/plugin/cssma)**
- **[Documentation](./docs/)**
- **[Changelog](./CHANGELOG.md)**

---

**Made with ❤️ for the design and development community**

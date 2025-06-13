# figmai-landing

## 0.1.6

### Patch Changes

- Updated dependencies [caeda4f]
  - cssma@0.2.0
  - cssma-react@1.0.0

## 0.1.5

### Patch Changes

- Updated dependencies [2aae788]
  - cssma@0.1.9
  - cssma-react@0.1.5

## 0.1.4

### Patch Changes

- Updated dependencies [027c590]
  - cssma@0.1.8
  - cssma-react@0.1.4

## 0.1.3

### Patch Changes

- 1ef3d1c: Improve animation system API design and naming conventions

  ## 🚀 New Features

  - Add `generatePrototypingInfo()` function for clean prototyping data extraction
  - Add `FigmaConversionResult` interface for enhanced conversion results
  - Update `useCssmaWithAnimations()` hook with improved prototyping support

  ## 🔧 API Improvements

  - Remove awkward `convertStylesToFigmaWithPrototyping()` function
  - Provide cleaner separation between standard conversion and prototyping features
  - Maintain full backward compatibility with existing `convertStylesToFigma()` API

  ## 📦 Updated Components

  - **cssma**: Core API improvements and new prototyping utilities
  - **cssma-react**: Enhanced animation hooks with better prototyping integration
  - **cssma-plugin**: Compatible with new animation API
  - **figmai-landing**: Updated showcase components with new API usage

  ## 💡 Usage Example

  ```typescript
  // Clean, intuitive API design
  const figmaProps = convertStylesToFigma(styles);
  const prototyping = generatePrototypingInfo(styles);

  // Enhanced React hook
  const { prototyping } = useCssmaWithAnimations(
    "transition-all hover:scale-105"
  );
  ```

  This update significantly improves developer experience with more intuitive naming conventions and better API organization.

- Updated dependencies [1ef3d1c]
  - cssma-react@0.1.3
  - cssma@0.1.7

## 0.1.2

### Patch Changes

- Updated dependencies [bb25357]
  - cssma-react@0.1.2
  - cssma@0.1.6

## 0.1.1

### Patch Changes

- f79d44b: update site
- f79d44b: update template list page
- 0aa17e5: Add cssma-react package with dynamic CSS processing

  - **NEW PACKAGE**: `cssma-react` - React hooks and components for dynamic CSS processing
  - **useCssma Hook**: Main hook for real-time Tailwind CSS class processing with caching
  - **useCssmaMultiple Hook**: Process multiple class groups for complex components
  - **NodeRenderer Component**: React component for rendering NodeData structures
  - **Dynamic Style Generation**: `generateHybridStyles` function with performance optimization
  - **Style Injection**: `injectDynamicStyle` for runtime DOM styling
  - **Performance Features**: Automatic caching, hash-based deduplication, memory management
  - **Build Configuration**: Vite setup with external dependencies and TypeScript declarations
  - **Documentation**: Comprehensive specs for dynamic conversion and React integration

  This release introduces a complete React integration layer for the cssma library, enabling developers to use dynamic CSS processing in React applications with optimized performance.

- Updated dependencies [0aa17e5]
- Updated dependencies [c2de580]
  - cssma-react@0.1.1
  - cssma@0.1.5

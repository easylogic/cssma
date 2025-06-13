# cssma-react

## 0.1.5

### Patch Changes

- Updated dependencies [2aae788]
  - cssma@0.1.9

## 0.1.4

### Patch Changes

- Updated dependencies [027c590]
  - cssma@0.1.8

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
  - cssma@0.1.7

## 0.1.2

### Patch Changes

- bb25357: update class names converter
- Updated dependencies [bb25357]
  - cssma@0.1.6

## 0.1.1

### Patch Changes

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

- c2de580: feat: Add object-based useCssmaMultiple hook for better developer experience

  - Add TypeScript overloads to support both array and object inputs for `useCssmaMultiple`
  - Implement object processing logic with proper key preservation and type inference
  - Maintain full backward compatibility with existing array-based usage
  - Improve developer experience with self-documenting style names and IDE autocomplete
  - Add comprehensive documentation with object-based examples and best practices
  - Update README.md with advanced usage patterns and migration guidance

  **Breaking Changes:** None - fully backward compatible

  **New Features:**

  - Object-based `useCssmaMultiple` with named style groups
  - Perfect TypeScript inference for object keys
  - Enhanced IDE autocomplete and error checking
  - Self-documenting code patterns

  **Migration:**

  ```tsx
  // Old (still works)
  const [a, b, c] = useCssmaMultiple(["style1", "style2", "style3"]);

  // New (recommended)
  const styles = useCssmaMultiple({
    container: "style1",
    header: "style2",
    content: "style3",
  });
  ```

- Updated dependencies [0aa17e5]
  - cssma@0.1.5

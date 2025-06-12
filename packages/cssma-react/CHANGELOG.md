# cssma-react

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

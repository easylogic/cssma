# figmai-landing

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

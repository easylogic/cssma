# cssma

## 0.1.6

### Patch Changes

- bb25357: update class names converter

## 0.1.5

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

## 0.1.4

### Patch Changes

- ef4fa44: Add comprehensive Template Gallery to figmai-landing

  - Implement template gallery page with search and filtering capabilities
  - Add template data types and sample templates for various UI components
  - Create template card component with live preview and copy functionality
  - Add category-based filtering (buttons, cards, forms, navigation, layout, feedback)
  - Include complexity-based filtering (beginner, intermediate, advanced)
  - Implement tag-based filtering and search functionality
  - Add featured templates section with call-to-action
  - Integrate template gallery navigation in header
  - Support both Tailwind CSS and Figma style copying
  - Include usage statistics and template metadata display

## 0.1.3

### Patch Changes

- a6a4a37: Add interactive tutorial system to figmai-landing

  - Implement step-by-step learning system with 5 tutorial steps
  - Add progress tracking and completion celebration
  - Include visual preview and real-time CSS output
  - Add hint system and example loading functionality
  - Integrate tutorial navigation in header component
  - Support basic to advanced Tailwind CSS concepts

- 980bdfe: Update development workflow to use develop branch strategy

  - Implement develop branch for changeset accumulation
  - Update PR workflow to target develop instead of main
  - Add release management process documentation
  - Support multiple feature development before release
  - Improve changeset collection and version management

## 0.1.2

### Patch Changes

- 07d9f6d: modify version test

## 0.1.1

### Patch Changes

- 2c9bde6: Add real-time CSS preview system

  - Added LivePreview component with real-time CSS rendering
  - Implemented 300ms debounced updates for performance optimization
  - Added error handling for invalid CSS with user-friendly messages
  - Included toggle control to enable/disable preview functionality
  - Added style inspector showing detailed applied styles
  - Implemented local storage for persistent user preferences
  - Integrated with existing CssConverter component

- 2c9bde6: figmaikr 랜딩페이지 생성 , cssma 플러그인 제작

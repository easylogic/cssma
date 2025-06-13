# cssma

## 0.2.0

### Minor Changes

- caeda4f: Add enhanced TypeScript definitions and IntelliSense support

  - Add comprehensive type definitions for all CSSMA class categories
  - Implement template literal types for arbitrary value support
  - Add detailed JSDoc documentation with examples for IntelliSense
  - Create type-safe class name builder pattern
  - Support auto-completion for animation, spacing, layout, and color classes
  - Include timing function and duration types with smart autocomplete
  - Enhance developer experience with hover documentation
  - Maintain backward compatibility with existing code

  This enhancement significantly improves the TypeScript development experience by providing strict typing, auto-completion, and comprehensive documentation for all CSSMA classes.

## 0.1.9

### Patch Changes

- 2aae788: Add animation patterns and interaction examples to README

  - Add comprehensive "Animation Patterns" section with real-world examples
  - Document interactive button animations with hover states
  - Include loading state patterns (spinner, pulse, bounce)
  - Add micro-interaction examples for cards and form feedback
  - Provide TypeScript examples for common animation use cases
  - Enhance developer experience with practical animation implementations

  These patterns help developers implement smooth animations and transitions using CSSMA's animation system with Tailwind-style classes.

## 0.1.8

### Patch Changes

- 027c590: Add animation system documentation to README

  - Add comprehensive "Animations & Transitions" section to README.md
  - Document transition classes (transition, transition-colors, transition-opacity, transition-transform)
  - Document duration classes (duration-200, duration-300, duration-[500ms])
  - Document timing function classes (ease-linear, ease-in, ease-out, ease-in-out)
  - Document animation classes (animate-spin, animate-ping, animate-pulse, animate-bounce)
  - Include TypeScript type annotations for all examples

  This enhancement improves the developer experience by providing clear documentation for the animation system that was recently implemented.

## 0.1.7

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

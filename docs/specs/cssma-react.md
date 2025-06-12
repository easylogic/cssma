# CSSMA React Package Specification

## Overview

The `cssma-react` package provides React-specific hooks and components for dynamic CSS processing using the cssma library. It enables real-time Tailwind CSS class processing with optimized performance through hybrid static/dynamic style generation and runtime optimization features.

## Package Structure

```
packages/cssma-react/
├── src/
│   ├── hooks.ts          # React hooks for CSS processing
│   ├── NodeRenderer.tsx  # React component for NodeData rendering
│   └── index.ts          # Main exports
├── dist/                 # Built output
├── package.json
├── tsconfig.json
└── vite.config.ts        # Vite build configuration
```

## Core Hooks

### `useCssmaRuntime(styles: string, options?)`

**NEW**: Optimized hook for dynamic CSS class processing with runtime filtering and optimization for sites with existing Tailwind CSS.

**Parameters:**
- `styles` (string): Tailwind CSS classes to process
- `options` (object, optional): Configuration options
  - `includeStandard` (boolean): Generate all classes including standard ones (default: false - runtime only)
  - `filter` (function): Custom filter function to determine which classes to process

**Returns:**
```typescript
{
  className: string;        // Generated class name for element (only runtime-needed classes)
  skippedClasses: string[]; // Standard classes that were skipped
  styleContent: string;     // CSS content to inject (only for runtime classes)
  hash: string;            // Unique hash for this style combination
}
```

**Example:**
```tsx
import { useCssmaRuntime } from 'cssma-react';

function MyComponent() {
  // Default: Only generate runtime-needed styles, skip standard Tailwind classes
  const { className, skippedClasses, styleContent } = useCssmaRuntime(
    'flex justify-center p-4 w-[400px] bg-gradient-to-r from-blue-500 to-purple-600'
  );
  
  // CSS size optimization: skippedClasses = ['flex', 'justify-center', 'p-4']
  // Only generates CSS for: w-[400px] bg-gradient-to-r from-blue-500 to-purple-600
  
  return (
    <>
      <style>{styleContent}</style>
      <div className={`${skippedClasses.join(' ')} ${className}`}>
        Optimized for existing Tailwind sites
      </div>
    </>
  );
}

// Include all classes
function ComponentWithAllStyles() {
  const { className, styleContent } = useCssmaRuntime(
    'w-[400px] bg-blue-500 hover:bg-blue-600',
    { includeStandard: true }
  );
  
  return (
    <>
      <style>{styleContent}</style>
      <div className={className}>All classes generated</div>
    </>
  );
}

// Custom filtering
function ComponentWithCustomFilter() {
  const { className, styleContent } = useCssmaRuntime(
    'w-full h-64 bg-gradient-to-r from-blue-500',
    { 
      filter: (cls) => cls.includes('gradient') || cls.startsWith('w-[') 
    }
  );
  
  return (
    <>
      <style>{styleContent}</style>
      <div className={className}>Custom filtered styles</div>
    </>
  );
}

### `useCssma(styles: string)`

Main hook for dynamic CSS class processing with caching and optimization.

**Parameters:**
- `styles` (string): Tailwind CSS classes to process

**Returns:**
```typescript
{
  className: string;        // Generated class name for element
  staticClassName: string;  // Static portion of classes
  dynamicClassName: string; // Dynamic portion of classes
  styleContent: string;     // CSS content to inject
  hash: string;            // Unique hash for this style combination
}
```

**Example:**
```tsx
import { useCssma } from 'cssma-react';

function MyComponent() {
  const { className, styleContent } = useCssma('w-[400px] bg-blue-500 hover:bg-blue-600');
  
  return (
    <>
      <style>{styleContent}</style>
      <div className={className}>
        Dynamically styled content
      </div>
    </>
  );
}
```

### `useCssmaMultiple(classGroups: string[])`

Processes multiple class groups for complex components with multiple styled elements.

**Parameters:**
- `classGroups` (string[]): Array of Tailwind CSS class strings

**Returns:**
```typescript
Array<{
  className: string;
  staticClassName: string;
  dynamicClassName: string;
  styleContent: string;
  hash: string;
}>
```

**Example:**
```tsx
import { useCssmaMultiple } from 'cssma-react';

function ComplexComponent() {
  const [containerStyles, headerStyles, contentStyles] = useCssmaMultiple([
    'w-full h-screen bg-gray-100',
    'text-2xl font-bold text-gray-800 mb-4',
    'p-6 bg-white rounded-lg shadow-md'
  ]);
  
  return (
    <>
      <style>
        {containerStyles.styleContent}
        {headerStyles.styleContent}
        {contentStyles.styleContent}
      </style>
      <div className={containerStyles.className}>
        <h1 className={headerStyles.className}>Header</h1>
        <div className={contentStyles.className}>Content</div>
      </div>
    </>
  );
}
```

### Legacy Compatibility Hooks

#### `useTailwind(tailwindClasses: string)` (Deprecated)
#### `useDynamicTailwind(tailwindClasses: string)` (Deprecated)

These hooks are aliases for `useCssma` and are maintained for backward compatibility.

## Components

### `NodeRenderer`

React component for rendering NodeData structures with dynamic styling and runtime optimization.

**Props:**
```typescript
interface NodeRendererProps {
  data: NodeData;                    // Node data structure
  className?: string;                // Additional CSS classes
  style?: React.CSSProperties;       // Additional inline styles
  /** CSS generation options */
  cssOptions?: {
    /** Generate all classes including standard ones (default: false - runtime only) */
    includeStandard?: boolean;
    /** Custom filter function to determine which classes to process */
    filter?: (className: string) => boolean;
  };
}
```

**NodeData Interface:**
```typescript
interface NodeData {
  type: string;                      // Node type (FRAME, TEXT, etc.)
  name?: string;                     // Node name
  styles?: string;                   // Tailwind CSS classes
  text?: string;                     // Text content (for TEXT nodes)
  children?: NodeData[];             // Child nodes
  props?: Record<string, any>;       // Additional properties
}
```

**Example:**
```tsx
import { NodeRenderer } from 'cssma-react';

const nodeData = {
  type: 'FRAME',
  name: 'Container',
  styles: 'w-full h-64 bg-gradient-to-r from-blue-500 to-purple-600',
  children: [
    {
      type: 'TEXT',
      text: 'Dynamic Content',
      styles: 'text-white text-xl font-bold'
    }
  ]
};

function App() {
  // Default: Runtime optimization (skip standard classes)
  return <NodeRenderer data={nodeData} />;
}

function AppWithAllStyles() {
  // Include all classes
  return (
    <NodeRenderer 
      data={nodeData} 
      cssOptions={{ includeStandard: true }}
    />
  );
}

function AppWithCustomFilter() {
  // Custom filtering for gradient classes only
  return (
    <NodeRenderer 
      data={nodeData} 
      cssOptions={{ 
        filter: (className) => className.includes('gradient') 
      }}
    />
  );
}
```

## Performance Features

### Runtime Optimization
- **Smart Class Filtering**: Automatically detects and skips standard Tailwind classes
- **CSS Size Reduction**: Up to 36% smaller CSS when skipping standard classes
- **Existing Site Optimization**: Perfect for sites with existing Tailwind CSS
- **Custom Filtering**: Fine-grained control over which classes to process

### Automatic Caching
- Styles are automatically cached to prevent reprocessing
- Hash-based deduplication ensures identical styles share resources
- LRU cache management for memory efficiency

### Style Injection Optimization
- Debounced DOM updates to prevent excessive reflows
- Automatic cleanup of unused styles
- Minimal CSS generation for better performance

### Development Mode
- Enhanced error messages and warnings
- Style processing performance metrics
- Cache hit/miss statistics
- **Skipped Classes Logging**: Console logs for development debugging

## Build Configuration

The package uses Vite for building with the following optimizations:

### External Dependencies
- `react` and `react-dom` are marked as external
- `cssma` and `cssma/dynamic` are treated as peer dependencies
- Prevents bundling of dependencies in the output

### Output Formats
- **ES Modules** (`index.mjs`): For modern bundlers
- **CommonJS** (`index.js`): For Node.js compatibility
- **TypeScript Declarations** (`index.d.ts`): For type safety

### Vite Configuration
```typescript
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      exclude: ['**/*.test.*', '**/*.spec.*'],
      staticImport: true
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'CssmaReact',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'cssma', 'cssma/dynamic']
    }
  }
});
```

## Installation & Usage

### Installation
```bash
npm install cssma-react cssma react react-dom
# or
pnpm add cssma-react cssma react react-dom
```

### Basic Setup with Runtime Optimization
```tsx
import React from 'react';
import { useCssmaRuntime } from 'cssma-react';

function App() {
  // Only generates CSS for runtime-needed classes
  const { className, skippedClasses, styleContent } = useCssmaRuntime(
    'flex items-center justify-center w-full h-screen bg-gradient-to-r from-blue-500 to-purple-600'
  );
  
  return (
    <>
      <style>{styleContent}</style>
      <div className={`${skippedClasses.join(' ')} ${className}`}>
        <h1>Optimized CSSMA React!</h1>
      </div>
    </>
  );
}

export default App;
```

### Traditional Setup
```tsx
import React from 'react';
import { useCssma } from 'cssma-react';

function App() {
  const { className, styleContent } = useCssma('w-full h-screen bg-blue-500 flex items-center justify-center');
  
  return (
    <>
      <style>{styleContent}</style>
      <div className={className}>
        <h1>Hello CSSMA React!</h1>
      </div>
    </>
  );
}

export default App;
```

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```typescript
import { useCssmaRuntime, useCssma, NodeRenderer, NodeData } from 'cssma-react';

// New runtime hook with full type inference
const styles = useCssmaRuntime('w-full bg-blue-500', { 
  includeStandard: false,
  filter: (cls) => cls.startsWith('w-[')
}); // Fully typed return

// Traditional hook with full type inference
const traditionalStyles = useCssma('w-full bg-blue-500'); // Fully typed return

// Component with typed props
const data: NodeData = {
  type: 'FRAME',
  styles: 'w-full h-64'
};

<NodeRenderer 
  data={data} 
  cssOptions={{ includeStandard: false }}
/>
```

## Error Handling

### Development Warnings
- Invalid Tailwind classes trigger console warnings
- Performance bottlenecks are highlighted
- Missing dependencies are detected
- **Skipped classes are logged for debugging**

### Production Behavior
- Graceful fallbacks for invalid styles
- Silent error handling to prevent crashes
- Minimal performance impact

## Testing

### Unit Testing
```typescript
import { renderHook } from '@testing-library/react';
import { useCssmaRuntime, useCssma } from 'cssma-react';

test('useCssmaRuntime skips standard classes', () => {
  const { result } = renderHook(() => 
    useCssmaRuntime('flex justify-center w-[400px] bg-gradient-to-r')
  );
  
  expect(result.current.skippedClasses).toEqual(['flex', 'justify-center']);
  expect(result.current.styleContent).toContain('width: 400px');
  expect(result.current.styleContent).toContain('background: linear-gradient');
});

test('useCssma processes all classes', () => {
  const { result } = renderHook(() => useCssma('w-full bg-blue-500'));
  
  expect(result.current.styleContent).toContain('width: 100%');
  expect(result.current.styleContent).toContain('background-color: rgb(59, 130, 246)');
  expect(result.current.className).toMatch(/^cssma-[a-f0-9]+$/);
});
```

### Integration Testing
```tsx
import { render } from '@testing-library/react';
import { NodeRenderer } from 'cssma-react';

test('NodeRenderer renders with runtime optimization', () => {
  const data = {
    type: 'FRAME',
    styles: 'flex justify-center w-[400px] h-[300px] bg-red-500',
    text: 'Test Content'
  };
  
  const { container } = render(<NodeRenderer data={data} />);
  const element = container.firstChild as HTMLElement;
  
  expect(element).toHaveStyle('width: 400px');
  expect(element).toHaveStyle('height: 300px');
  expect(element).toHaveClass('flex', 'justify-center');
});
```

## Migration Guide

### From cssma Core
```typescript
// Before: Using cssma directly
import { generateHybridStyles, injectDynamicStyle } from 'cssma';

const styles = await generateHybridStyles('w-full bg-blue-500');
injectDynamicStyle('my-element', styles.dynamicStyles);

// After: Using cssma-react with runtime optimization
import { useCssmaRuntime } from 'cssma-react';

function Component() {
  const { className, skippedClasses, styleContent } = useCssmaRuntime('w-full bg-blue-500');
  return (
    <>
      <style>{styleContent}</style>
      <div className={`${skippedClasses.join(' ')} ${className}`}>Content</div>
    </>
  );
}
```

### Upgrading to Runtime Optimization
```typescript
// Before: Using useCssma
import { useCssma } from 'cssma-react';

function Component() {
  const { className, styleContent } = useCssma('flex justify-center w-[400px] bg-gradient-to-r');
  return (
    <>
      <style>{styleContent}</style>
      <div className={className}>Content</div>
    </>
  );
}

// After: Using useCssmaRuntime for optimization
import { useCssmaRuntime } from 'cssma-react';

function Component() {
  const { className, skippedClasses, styleContent } = useCssmaRuntime('flex justify-center w-[400px] bg-gradient-to-r');
  return (
    <>
      <style>{styleContent}</style>
      <div className={`${skippedClasses.join(' ')} ${className}`}>Content</div>
    </>
  );
}
```

## Best Practices

1. **Use Runtime Optimization**: Prefer `useCssmaRuntime` for sites with existing Tailwind CSS
2. **Leverage Skipped Classes**: Combine skipped classes with generated classes for optimal performance
3. **Custom Filtering**: Use custom filters for specific optimization scenarios
4. **Reuse Style Combinations**: Cache benefits from consistent class usage
5. **Batch Style Updates**: Group related styles in single hook calls
6. **Component Composition**: Break complex styles into smaller components
7. **Performance Monitoring**: Monitor style processing in development

## Performance Metrics

### CSS Size Optimization
- **Standard Site**: Up to 36% smaller CSS when skipping standard classes
- **Runtime Classes Only**: Generates CSS only for classes not in standard Tailwind
- **Memory Efficiency**: Reduced style injection and caching overhead

### Development Logging
```
NodeRenderer [FRAME]: Skipped standard classes: ['flex', 'justify-center', 'p-4']
NodeRenderer [TEXT]: Skipped standard classes: ['text-white', 'font-bold']
```

## Roadmap

### Planned Features
- **Automatic Tailwind Detection**: Auto-detect existing Tailwind CSS files
- **Build-time Optimization**: Pre-analyze and optimize at build time
- **Style Preloading**: Preload common style combinations
- **SSR Optimization**: Enhanced server-side rendering support
- **DevTools Integration**: Browser extension for debugging
- **Theme Integration**: Better integration with design systems
- **Performance Analytics**: Built-in performance monitoring
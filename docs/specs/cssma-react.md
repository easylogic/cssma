# CSSMA React Package Specification

## Overview

The `cssma-react` package provides React-specific hooks and components for dynamic CSS processing using the cssma library. It enables real-time Tailwind CSS class processing with optimized performance through hybrid static/dynamic style generation.

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

React component for rendering NodeData structures with dynamic styling.

**Props:**
```typescript
interface NodeRendererProps {
  data: NodeData;                    // Node data structure
  className?: string;                // Additional CSS classes
  style?: React.CSSProperties;       // Additional inline styles
  children?: React.ReactNode;        // Child elements
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
  return <NodeRenderer data={nodeData} />;
}
```

## Performance Features

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

## Build Configuration

The package uses Vite for building with the following optimizations:

### External Dependencies
- `react` and `react-dom` are marked as external
- `cssma` is treated as a peer dependency
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
      external: ['react', 'react-dom', 'cssma']
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

### Basic Setup
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
import { useCssma, NodeRenderer, NodeData } from 'cssma-react';

// Hook with full type inference
const styles = useCssma('w-full bg-blue-500'); // Fully typed return

// Component with typed props
const data: NodeData = {
  type: 'FRAME',
  styles: 'w-full h-64'
};

<NodeRenderer data={data} />
```

## Error Handling

### Development Warnings
- Invalid Tailwind classes trigger console warnings
- Performance bottlenecks are highlighted
- Missing dependencies are detected

### Production Behavior
- Graceful fallbacks for invalid styles
- Silent error handling to prevent crashes
- Minimal performance impact

## Testing

### Unit Testing
```typescript
import { renderHook } from '@testing-library/react';
import { useCssma } from 'cssma-react';

test('useCssma processes basic classes', () => {
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

test('NodeRenderer renders with styles', () => {
  const data = {
    type: 'FRAME',
    styles: 'w-[400px] h-[300px] bg-red-500',
    text: 'Test Content'
  };
  
  const { container } = render(<NodeRenderer data={data} />);
  const element = container.firstChild as HTMLElement;
  
  expect(element).toHaveStyle('width: 400px');
  expect(element).toHaveStyle('height: 300px');
});
```

## Migration Guide

### From cssma Core
```typescript
// Before: Using cssma directly
import { generateHybridStyles, injectDynamicStyle } from 'cssma';

const styles = await generateHybridStyles('w-full bg-blue-500');
injectDynamicStyle('my-element', styles.dynamicStyles);

// After: Using cssma-react
import { useCssma } from 'cssma-react';

function Component() {
  const { className, styleContent } = useCssma('w-full bg-blue-500');
  return (
    <>
      <style>{styleContent}</style>
      <div className={className}>Content</div>
    </>
  );
}
```

## Best Practices

1. **Reuse Style Combinations**: Cache benefits from consistent class usage
2. **Batch Style Updates**: Group related styles in single `useCssma` calls
3. **Minimize Dynamic Classes**: Use standard Tailwind when possible
4. **Component Composition**: Break complex styles into smaller components
5. **Performance Monitoring**: Monitor style processing in development

## Roadmap

### Planned Features
- **Style Preloading**: Preload common style combinations
- **SSR Optimization**: Enhanced server-side rendering support
- **DevTools Integration**: Browser extension for debugging
- **Theme Integration**: Better integration with design systems
- **Performance Analytics**: Built-in performance monitoring 
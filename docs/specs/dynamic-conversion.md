# Dynamic CSS Conversion Specification

## Overview

The Dynamic CSS Conversion system provides real-time Tailwind CSS class processing with intelligent filtering and optimization. It enables sites to generate CSS only for classes that need runtime processing while skipping standard Tailwind classes, resulting in smaller CSS bundles and better performance.

## Core Architecture

### 1. Class Analysis Engine

The system analyzes Tailwind CSS classes to determine their processing requirements:

```typescript
interface ClassAnalysis {
  className: string;
  isStandard: boolean;     // Can be handled by standard Tailwind CSS
  needsRuntime: boolean;   // Requires runtime CSS generation
  category: ClassCategory; // Type of class (layout, spacing, color, etc.)
}
```

### 2. Filtering System

#### Standard Class Detection
Classes that are likely to be in standard Tailwind CSS builds:
- Basic layout: `flex`, `block`, `grid`, `hidden`
- Standard spacing: `p-4`, `m-2`, `space-x-4` 
- Common colors: `bg-blue-500`, `text-white`
- Typography: `text-xl`, `font-bold`
- Borders: `border`, `rounded`

#### Runtime Class Detection
Classes that require runtime generation:
- Arbitrary values: `w-[400px]`, `text-[#ff0000]`
- Complex gradients: `bg-gradient-to-r from-blue-500 to-purple-600`
- Custom properties: `bg-[var(--custom-color)]`
- Dynamic calculations: `calc()` expressions

### 3. Generation Modes

#### Runtime Only Mode (Default)
```typescript
const result = generateRuntimeCss(['flex', 'justify-center', 'w-[400px]', 'bg-gradient-to-r']);
// Output:
// - Generated CSS: Only w-[400px] and bg-gradient-to-r styles
// - Skipped classes: ['flex', 'justify-center']
// - Size reduction: ~36% smaller CSS
```

#### Complete Mode
```typescript
const result = generateCss(['flex', 'justify-center', 'w-[400px]'], { 
  includeStandard: true 
});
// Output: CSS for all classes
```

#### Custom Filtering
```typescript
const result = generateCss(classes, {
  filter: (className) => className.includes('gradient') || className.startsWith('w-[')
});
```

## API Reference

### Core Functions

#### `generateRuntimeCss(classes: string[]): GenerationResult`
Generates CSS only for runtime-needed classes.

```typescript
interface GenerationResult {
  css: string;              // Generated CSS content
  processedClasses: string[]; // Classes that were processed
  skippedClasses: string[];   // Standard classes that were skipped
  hash: string;              // Unique hash for caching
}
```

#### `generateCss(classes: string[], options?: GenerateOptions): GenerationResult`
Generates CSS with configurable options.

```typescript
interface GenerateOptions {
  includeStandard?: boolean;    // Include standard Tailwind classes
  filter?: (className: string) => boolean; // Custom filter function
}
```

### Detection Functions

#### `isStandardClass(className: string): boolean`
Determines if a class is likely to be in standard Tailwind CSS.

```typescript
isStandardClass('flex');           // true
isStandardClass('w-[400px]');      // false
isStandardClass('bg-blue-500');    // true
isStandardClass('bg-gradient-to-r'); // false
```

#### `needsRuntime(className: string): boolean`
Determines if a class requires runtime CSS generation.

```typescript
needsRuntime('w-[400px]');         // true
needsRuntime('flex');              // false
needsRuntime('bg-gradient-to-r');  // true
needsRuntime('text-blue-500');     // false
```

## CSS Converters

### Layout Converter
Handles layout-related properties:
```typescript
// Input: 'w-[400px] h-[300px] flex'
// Output: 
{
  'width': '400px',
  'height': '300px',
  'display': 'flex'
}
```

### Background Converter
Processes background styles including gradients:
```typescript
// Input: 'bg-gradient-to-r from-blue-500 to-purple-600'
// Output:
{
  'background': 'linear-gradient(to right, rgb(59, 130, 246), rgb(147, 51, 234))',
  '--tw-gradient-from': 'rgb(59, 130, 246)',
  '--tw-gradient-to': 'rgb(147, 51, 234)'
}
```

### Spacing Converter
Handles padding, margin, and spacing:
```typescript
// Input: 'p-[20px] m-[10px]'
// Output:
{
  'padding': '20px',
  'margin': '10px'
}
```

### Typography Converter
Processes text styles:
```typescript
// Input: 'text-[#ff0000] text-[18px]'
// Output:
{
  'color': '#ff0000',
  'font-size': '18px'
}
```

## Performance Optimizations

### 1. Intelligent Caching
- Hash-based caching prevents duplicate processing
- LRU cache management for memory efficiency
- Persistent cache across component re-renders

### 2. Batch Processing
- Multiple classes processed in single operation
- Reduced DOM manipulation overhead
- Optimized CSS injection

### 3. Size Reduction Metrics
```typescript
// Example optimization results:
const input = 'flex justify-center items-center p-4 w-[400px] bg-gradient-to-r from-blue-500';
const standard = generateCss(input, { includeStandard: true });
const runtime = generateRuntimeCss(input);

console.log('Standard CSS:', standard.css.length, 'bytes');  // 850 bytes
console.log('Runtime CSS:', runtime.css.length, 'bytes');   // 544 bytes
console.log('Size reduction:', '36%');
```

### 4. Style Injection Registry
Global registry prevents duplicate style injection:
```typescript
interface StyleRegistry {
  hasStyle(hash: string): boolean;
  injectStyle(hash: string, css: string): void;
  removeStyle(hash: string): void;
  getStatistics(): RegistryStats;
}
```

## Integration Patterns

### 1. React Hook Integration
```typescript
function useCssmaRuntime(classes: string, options?: GenerateOptions) {
  const [result, setResult] = useState<GenerationResult>();
  
  useEffect(() => {
    const generated = generateRuntimeCss(classes.split(' '));
    setResult(generated);
    
    // Inject styles
    injectStyle(generated.hash, generated.css);
    
    return () => removeStyle(generated.hash);
  }, [classes, options]);
  
  return {
    className: result?.processedClasses.join(' ') || '',
    skippedClasses: result?.skippedClasses || [],
    styleContent: result?.css || ''
  };
}
```

### 2. Component-based Integration
```typescript
function OptimizedComponent({ classes, children }) {
  const { className, skippedClasses, styleContent } = useCssmaRuntime(classes);
  
  return (
    <>
      <style>{styleContent}</style>
      <div className={`${skippedClasses.join(' ')} ${className}`}>
        {children}
      </div>
    </>
  );
}
```

### 3. Build-time Integration
```typescript
// Webpack plugin or Vite plugin integration
export function cssmaPlugin(options = {}) {
  return {
    name: 'cssma-dynamic',
    transform(code, id) {
      // Analyze code for Tailwind classes
      // Pre-generate runtime CSS at build time
      // Inject optimized styles
    }
  };
}
```

## Development Tools

### 1. Debug Logging
```typescript
if (process.env.NODE_ENV === 'development') {
  console.debug('CSSMA Analysis:', {
    input: classes,
    processed: result.processedClasses,
    skipped: result.skippedClasses,
    sizeReduction: `${Math.round((1 - result.css.length / originalSize) * 100)}%`
  });
}
```

### 2. Performance Monitoring
```typescript
interface PerformanceMetrics {
  processingTime: number;
  cacheHitRate: number;
  cssSize: number;
  classCount: number;
}
```

### 3. Browser DevTools Integration
- Style source mapping for debugging
- Performance profiling hooks
- Cache visualization tools

## Migration Strategies

### 1. Gradual Adoption
```typescript
// Phase 1: Add runtime processing alongside existing Tailwind
function LegacyComponent() {
  const { className, skippedClasses } = useCssmaRuntime('flex w-[400px] custom-class');
  return <div className={`${skippedClasses.join(' ')} ${className} existing-classes`} />;
}

// Phase 2: Full migration to dynamic system
function ModernComponent() {
  const { className } = useCssmaRuntime('flex w-[400px]', { includeStandard: true });
  return <div className={className} />;
}
```

### 2. Bundle Analysis
```typescript
// Analyze existing Tailwind usage
const analyzer = new TailwindAnalyzer();
const report = analyzer.analyze('./src/**/*.{js,jsx,ts,tsx}');

console.log('Standard classes:', report.standardClasses.length);
console.log('Runtime classes:', report.runtimeClasses.length);
console.log('Potential savings:', report.estimatedSavings);
```

## Configuration

### 1. Class Detection Rules
```typescript
interface DetectionConfig {
  standardPatterns: RegExp[];      // Patterns for standard classes
  runtimePatterns: RegExp[];       // Patterns for runtime classes
  customDetectors: ClassDetector[]; // Custom detection logic
}
```

### 2. Performance Tuning
```typescript
interface PerformanceConfig {
  cacheSize: number;           // Maximum cache entries
  batchSize: number;           // Classes processed per batch
  debounceMs: number;          // Style injection debounce
  enableProfiling: boolean;    // Development profiling
}
```

### 3. Output Customization
```typescript
interface OutputConfig {
  cssVariables: boolean;       // Use CSS custom properties
  minification: boolean;       // Minify generated CSS
  sourceMap: boolean;          // Generate source maps
  hashLength: number;          // Generated hash length
}
```

## Future Enhancements

### 1. Static Analysis
- Build-time class extraction and analysis
- Dead code elimination for unused classes
- Automatic optimization recommendations

### 2. Framework Integration
- Next.js plugin with SSR optimization
- Vite plugin with HMR support
- Webpack loader for build-time processing

### 3. Advanced Optimizations
- Tree shaking for unused CSS converters
- Compression algorithms for CSS output
- Edge-side includes for cached styles

### 4. Developer Experience
- VS Code extension for real-time feedback
- ESLint rules for optimization suggestions
- Performance budget monitoring
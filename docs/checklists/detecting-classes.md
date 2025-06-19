# Detecting Classes in Source Files Implementation Checklist

## Overview
This checklist covers the complete implementation of class detection in Tailwind CSS v4.1, based on the official documentation from https://tailwindcss.com/docs/detecting-classes-in-source-files.

**Key Features from v4.1:**
- Plain text scanning for utility classes
- Dynamic class name handling strategies
- Source file registration with `@source` directive
- Safelisting utilities with `@source inline()`
- Runtime class detection (critical for cssma-v3)
- Build-time vs runtime optimization

**Special Considerations for Runtime Projects (like cssma-v3):**
- Runtime class generation and detection
- Dynamic utility creation
- Performance optimization for runtime scanning
- Memory management for large class sets

## 📋 Implementation Progress: 0/80 items

---

## 1. Understanding Class Detection
**Priority: High | Items: 15/15**

### 1.1 Basic Detection Mechanism
- [ ] **Plain Text Scanning** - Understanding how Tailwind scans files
  ```javascript
  // Tailwind scans for any tokens that could be classes
  const exampleCode = `
    <div class="bg-blue-500 text-white rounded-lg">
    const styles = "hover:bg-blue-600 focus:ring-2";
    className={\`\${baseClasses} px-4 py-2\`}
  `;
  ```
  - **Test**: Verify that classes in various contexts are detected
  - **Success**: All class patterns recognized regardless of syntax

- [ ] **Token Recognition** - Character patterns Tailwind expects
  ```javascript
  // Valid class name characters: a-z, A-Z, 0-9, -, _, /, :, [, ], (, )
  const validClasses = [
    "bg-blue-500",           // Standard utility
    "hover:bg-blue-600",     // With variant
    "lg:text-xl",            // Responsive
    "bg-[#ff0000]",          // Arbitrary value
    "group-hover:scale-105"  // Group variant
  ];
  ```
  - **Test**: Test various class name patterns
  - **Success**: All valid patterns are recognized

- [ ] **Non-Code Parsing** - Language-agnostic detection
  ```javascript
  // Tailwind doesn't parse code syntax, just looks for patterns
  const mixedContent = `
    // JavaScript
    className="bg-red-500"
    
    <!-- HTML -->
    <div class="text-green-600">
    
    /* CSS comment with bg-blue-400 */
    
    # Markdown with \`code-yellow-300\`
  `;
  ```
  - **Test**: Verify detection works across different file types
  - **Success**: Classes detected regardless of file format

### 1.2 Runtime Detection Challenges
- [ ] **Runtime Class Generation** - Dynamic utility creation for cssma-v3
  ```javascript
  // For runtime libraries like cssma-v3
  function generateUtilityClass(property, value) {
    const className = `${property}-[${value}]`;
    // Must ensure this class is available at runtime
    return className;
  }
  
  // Example: generateUtilityClass('bg', '#ff0000') -> 'bg-[#ff0000]'
  ```
  - **Test**: Generate classes dynamically and verify CSS creation
  - **Success**: Dynamic classes work in runtime environment

- [ ] **Runtime Scanning** - Detecting classes after build time
  ```javascript
  // cssma-v3 needs to scan for classes at runtime
  function scanForClasses(htmlContent) {
    const classRegex = /class(?:Name)?=["']([^"']+)["']/g;
    const classes = [];
    let match;
    
    while ((match = classRegex.exec(htmlContent)) !== null) {
      classes.push(...match[1].split(/\s+/));
    }
    
    return classes;
  }
  ```
  - **Test**: Scan dynamic content for utility classes
  - **Success**: Runtime scanning captures all classes

- [ ] **Memory Management** - Efficient runtime class storage
  ```javascript
  // For runtime libraries, need efficient class storage
  class RuntimeClassManager {
    constructor() {
      this.generatedClasses = new Set();
      this.cssCache = new Map();
    }
    
    addClass(className) {
      if (!this.generatedClasses.has(className)) {
        this.generatedClasses.add(className);
        this.generateCSS(className);
      }
    }
  }
  ```
  - **Test**: Manage large numbers of classes efficiently
  - **Success**: Memory usage stays optimal with many classes

---

## 2. Dynamic Class Name Handling
**Priority: High | Items: 20/20**

### 2.1 Anti-patterns to Avoid
- [ ] **String Interpolation Detection** - Identifying problematic patterns
  ```javascript
  // ❌ DON'T: These won't be detected
  const badPatterns = [
    `text-${error ? 'red' : 'green'}-600`,
    `bg-${color}-500`,
    `hover:bg-${theme.primaryColor}`,
    className: `border-${size}px`
  ];
  ```
  - **Test**: Verify these patterns are not detected
  - **Success**: Build system warns about missing classes

- [ ] **Template Literal Issues** - Dynamic construction problems
  ```javascript
  // ❌ DON'T: Template literals with variables
  const problemClasses = [
    `text-${variant}-600`,
    `${prefix}-blue-500`,
    `hover:${baseClass}-600`
  ];
  ```
  - **Test**: Ensure these don't generate expected CSS
  - **Success**: Classes are missing from generated CSS

- [ ] **Prop-based Construction** - Component anti-patterns
  ```jsx
  // ❌ DON'T: Building classes from props
  function BadButton({ color, size }) {
    return (
      <button className={`bg-${color}-600 text-${size} hover:bg-${color}-500`}>
        Bad Pattern
      </button>
    );
  }
  ```
  - **Test**: Verify prop-based classes aren't generated
  - **Success**: CSS is missing for dynamic combinations

### 2.2 Correct Patterns
- [ ] **Complete Class Names** - Always use full class strings
  ```javascript
  // ✅ DO: Complete class names that can be detected
  const goodPatterns = [
    error ? 'text-red-600' : 'text-green-600',
    colors[color], // where colors = { blue: 'bg-blue-500', ... }
    `${baseClasses} ${variantClasses}` // both are complete strings
  ];
  ```
  - **Test**: Verify all complete classes are detected
  - **Success**: All classes generate proper CSS

- [ ] **Static Mapping Objects** - Prop to class mapping
  ```javascript
  // ✅ DO: Static object mapping
  const buttonVariants = {
    primary: 'bg-blue-600 hover:bg-blue-500 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900',
    danger: 'bg-red-600 hover:bg-red-500 text-white'
  };
  
  function Button({ variant }) {
    return <button className={buttonVariants[variant]} />;
  }
  ```
  - **Test**: Use mapping objects in components
  - **Success**: All mapped classes are generated

- [ ] **Conditional Complete Classes** - Full classes in conditionals
  ```javascript
  // ✅ DO: Complete classes in conditional logic
  const dynamicClasses = [
    isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700',
    size === 'large' ? 'px-6 py-3 text-lg' : 'px-4 py-2 text-base',
    disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
  ];
  ```
  - **Test**: Use conditionals with complete classes
  - **Success**: All conditional classes are available

### 2.3 Runtime Dynamic Class Strategies
- [ ] **Runtime Class Registry** - For cssma-v3 style libraries
  ```javascript
  // For runtime libraries that need dynamic classes
  class DynamicClassRegistry {
    constructor() {
      this.registeredClasses = new Set();
      this.pendingClasses = new Set();
    }
    
    registerClass(className) {
      if (!this.registeredClasses.has(className)) {
        this.pendingClasses.add(className);
        this.generateCSSForClass(className);
        this.registeredClasses.add(className);
      }
    }
    
    generateCSSForClass(className) {
      // Implementation for runtime CSS generation
      const css = this.parseClassToCSS(className);
      this.injectCSS(css);
    }
  }
  ```
  - **Test**: Register and generate classes at runtime
  - **Success**: Dynamic classes work immediately

- [ ] **Precomputed Class Sets** - Common class combinations
  ```javascript
  // Precompute common class combinations for performance
  const commonPatterns = {
    button: [
      'bg-blue-600', 'hover:bg-blue-500', 'text-white',
      'px-4', 'py-2', 'rounded', 'font-medium'
    ],
    card: [
      'bg-white', 'shadow-lg', 'rounded-lg', 'p-6',
      'border', 'border-gray-200'
    ]
  };
  ```
  - **Test**: Use precomputed sets for better performance
  - **Success**: Common patterns load faster

- [ ] **Just-in-Time Runtime Generation** - On-demand CSS creation
  ```javascript
  // For cssma-v3: Generate CSS only when classes are used
  class JITRuntime {
    constructor() {
      this.cssCache = new Map();
      this.observer = this.createDOMObserver();
    }
    
    createDOMObserver() {
      return new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
          this.scanNewNodes(mutation.addedNodes);
        });
      });
    }
    
    scanNewNodes(nodes) {
      nodes.forEach(node => {
        if (node.classList) {
          node.classList.forEach(className => {
            if (!this.cssCache.has(className)) {
              this.generateAndInjectCSS(className);
            }
          });
        }
      });
    }
  }
  ```
  - **Test**: Generate CSS only for classes actually used
  - **Success**: Minimal CSS footprint with full functionality

---

## 3. Source File Configuration
**Priority: Medium | Items: 15/15**

### 3.1 Default Scanning Behavior
- [ ] **Automatic File Detection** - Understanding default scanning
  ```css
  /* Tailwind automatically scans all files except: */
  /* - Files in .gitignore */
  /* - Binary files (images, videos, zip) */
  /* - CSS files */
  /* - Package manager lock files */
  ```
  - **Test**: Verify default scanning behavior
  - **Success**: All expected files are scanned automatically

- [ ] **Ignored File Types** - Files that are skipped
  ```javascript
  const ignoredByDefault = [
    '**/*.css',
    '**/*.scss',
    '**/*.sass',
    '**/*.less',
    '**/*.jpg',
    '**/*.png',
    '**/*.gif',
    '**/*.mp4',
    '**/package-lock.json',
    '**/yarn.lock',
    '**/pnpm-lock.yaml'
  ];
  ```
  - **Test**: Confirm ignored files don't affect class detection
  - **Success**: Ignored files don't slow down scanning

- [ ] **Working Directory Base** - Default scan starting point
  ```bash
  # Tailwind uses current working directory as base
  # When running from project root:
  npm run build
  # Scans from ./
  
  # When running from subdirectory:
  cd packages/ui && npm run build
  # Scans from packages/ui/
  ```
  - **Test**: Verify scanning starts from correct directory
  - **Success**: All relevant files are found from working directory

### 3.2 Explicit Source Registration
- [ ] **@source Directive** - Manual source registration
  ```css
  @import "tailwindcss";
  
  /* Register additional source paths */
  @source "../node_modules/@acmecorp/ui-lib";
  @source "../shared/components";
  @source "../external/themes";
  ```
  - **Test**: Register external sources and verify class detection
  - **Success**: Classes from registered sources are included

- [ ] **External Library Support** - Third-party components
  ```css
  @import "tailwindcss";
  
  /* Scan external UI libraries built with Tailwind */
  @source "../node_modules/@headlessui/react";
  @source "../node_modules/@tailwindui/react";
  ```
  - **Test**: Include classes from external Tailwind-based libraries
  - **Success**: External library classes are available

- [ ] **Monorepo Configuration** - Multi-package projects
  ```css
  /* In packages/ui/styles.css */
  @import "tailwindcss" source("../../src");
  @source "../shared";
  @source "../common";
  ```
  - **Test**: Configure scanning for monorepo structure
  - **Success**: All packages' classes are detected

### 3.3 Advanced Source Control
- [ ] **Source Exclusion** - Ignoring specific paths
  ```css
  @import "tailwindcss";
  
  /* Ignore large directories that don't use Tailwind */
  @source not "../src/components/legacy";
  @source not "../third-party";
  @source not "../docs";
  ```
  - **Test**: Exclude irrelevant directories from scanning
  - **Success**: Build performance improved, classes still complete

- [ ] **Explicit Source Only** - Disable automatic detection
  ```css
  @import "tailwindcss" source(none);
  
  /* Only scan explicitly registered sources */
  @source "../admin";
  @source "../shared";
  @source "../components";
  ```
  - **Test**: Use only explicit sources
  - **Success**: Only specified directories are scanned

- [ ] **Multiple Stylesheet Configuration** - Different CSS files
  ```css
  /* admin.css - Only admin classes */
  @import "tailwindcss" source(none);
  @source "../admin";
  
  /* public.css - Only public site classes */
  @import "tailwindcss" source(none);
  @source "../public";
  @source "../shared";
  ```
  - **Test**: Create separate stylesheets for different parts of app
  - **Success**: Each stylesheet contains only relevant classes

---

## 4. Safelisting and Class Management
**Priority: Medium | Items: 20/20**

### 4.1 Basic Safelisting
- [ ] **Force Generate Classes** - Ensure specific classes are included
  ```css
  @import "tailwindcss";
  
  /* Force generation of classes that might not be detected */
  @source inline("underline");
  @source inline("line-through");
  @source inline("overline");
  ```
  - **Test**: Include classes not found in source files
  - **Success**: Safelisted classes are always available

- [ ] **Variant Safelisting** - Include classes with modifiers
  ```css
  @import "tailwindcss";
  
  /* Generate classes with hover and focus variants */
  @source inline("{hover:,focus:,}underline");
  @source inline("{hover:,focus:,active:,}bg-blue-500");
  ```
  - **Test**: Generate classes with all specified variants
  - **Success**: All variant combinations are available

- [ ] **Range Generation** - Batch class creation
  ```css
  @import "tailwindcss";
  
  /* Generate multiple related classes at once */
  @source inline("{hover:,}bg-red-{50,{100..900..100},950}");
  @source inline("text-{xs,sm,base,lg,xl,2xl,3xl,4xl,5xl,6xl}");
  ```
  - **Test**: Generate ranges of related utilities
  - **Success**: All classes in range are generated

### 4.2 Runtime Safelisting
- [ ] **Dynamic Safelist Management** - For runtime libraries
  ```javascript
  // For cssma-v3: Manage safelists at runtime
  class RuntimeSafelist {
    constructor() {
      this.safelist = new Set();
      this.generated = new Set();
    }
    
    addToSafelist(pattern) {
      if (typeof pattern === 'string') {
        this.safelist.add(pattern);
      } else if (Array.isArray(pattern)) {
        pattern.forEach(p => this.safelist.add(p));
      }
      this.generateSafelistedClasses();
    }
    
    generateSafelistedClasses() {
      this.safelist.forEach(pattern => {
        if (!this.generated.has(pattern)) {
          this.generateCSS(pattern);
          this.generated.add(pattern);
        }
      });
    }
  }
  ```
  - **Test**: Add classes to runtime safelist
  - **Success**: Safelisted classes are immediately available

- [ ] **Pattern-based Safelisting** - Regex and glob patterns
  ```javascript
  // For runtime libraries: Support pattern-based safelisting
  const safelistPatterns = [
    /^bg-(red|blue|green)-(50|100|200|300|400|500|600|700|800|900|950)$/,
    /^text-(xs|sm|base|lg|xl|2xl|3xl)$/,
    /^p(x|y|t|b|l|r)?-\d+$/,
    /^m(x|y|t|b|l|r)?-\d+$/
  ];
  
  function matchesPatterns(className) {
    return safelistPatterns.some(pattern => pattern.test(className));
  }
  ```
  - **Test**: Use patterns to safelist groups of classes
  - **Success**: Pattern matching works for class generation

### 4.3 Class Exclusion
- [ ] **Explicit Class Exclusion** - Prevent class generation
  ```css
  @import "tailwindcss";
  
  /* Explicitly exclude classes even if found in source */
  @source not inline("bg-red-{50,{100..900..100},950}");
  @source not inline("{hover:,focus:,}text-yellow-*");
  ```
  - **Test**: Exclude unwanted classes from generation
  - **Success**: Excluded classes are not available

- [ ] **Conditional Exclusion** - Environment-based exclusion
  ```javascript
  // Exclude certain classes in production
  const productionExclusions = [
    'debug-*',
    'test-*',
    'dev-*'
  ];
  
  const devOnlyClasses = [
    'outline-red-500',  // Debug borders
    'bg-pink-300',      // Temporary backgrounds
    'border-8'          // Debug thick borders
  ];
  ```
  - **Test**: Exclude debug/development classes in production
  - **Success**: Production builds don't include debug classes

### 4.4 Performance Optimization
- [ ] **Class Usage Analytics** - Track which classes are used
  ```javascript
  // For runtime libraries: Track class usage for optimization
  class ClassUsageTracker {
    constructor() {
      this.usageCount = new Map();
      this.lastUsed = new Map();
    }
    
    trackUsage(className) {
      const now = Date.now();
      this.usageCount.set(className, (this.usageCount.get(className) || 0) + 1);
      this.lastUsed.set(className, now);
    }
    
    getUnusedClasses(thresholdMs = 60000) {
      const now = Date.now();
      const unused = [];
      
      this.lastUsed.forEach((lastUsed, className) => {
        if (now - lastUsed > thresholdMs) {
          unused.push(className);
        }
      });
      
      return unused;
    }
  }
  ```
  - **Test**: Track and identify unused classes
  - **Success**: Can optimize by removing unused classes

- [ ] **Lazy Class Loading** - Load classes on demand
  ```javascript
  // For runtime libraries: Load classes only when needed
  class LazyClassLoader {
    constructor() {
      this.loadedClasses = new Set();
      this.pendingLoads = new Map();
    }
    
    async loadClass(className) {
      if (this.loadedClasses.has(className)) {
        return true;
      }
      
      if (this.pendingLoads.has(className)) {
        return this.pendingLoads.get(className);
      }
      
      const loadPromise = this.generateAndLoadCSS(className);
      this.pendingLoads.set(className, loadPromise);
      
      try {
        await loadPromise;
        this.loadedClasses.add(className);
        this.pendingLoads.delete(className);
        return true;
      } catch (error) {
        this.pendingLoads.delete(className);
        throw error;
      }
    }
  }
  ```
  - **Test**: Load classes asynchronously as needed
  - **Success**: Classes load quickly without blocking

---

## 5. Runtime Integration (Critical for cssma-v3)
**Priority: High | Items: 10/10**

### 5.1 Runtime CSS Generation
- [ ] **Real-time Class Detection** - Detect classes as they're added
  ```javascript
  // For cssma-v3: Detect classes in real-time
  class RealTimeClassDetector {
    constructor() {
      this.observer = new MutationObserver(this.handleMutations.bind(this));
      this.classRegistry = new Set();
    }
    
    startObserving(root = document.body) {
      this.observer.observe(root, {
        attributes: true,
        attributeFilter: ['class'],
        childList: true,
        subtree: true
      });
    }
    
    handleMutations(mutations) {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          this.scanElementClasses(mutation.target);
        } else if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) { // Element node
              this.scanTreeClasses(node);
            }
          });
        }
      });
    }
    
    scanElementClasses(element) {
      if (element.classList) {
        element.classList.forEach(className => {
          this.processClass(className);
        });
      }
    }
  }
  ```
  - **Test**: Detect and process classes added to DOM
  - **Success**: New classes are immediately available

- [ ] **CSS Injection** - Inject generated CSS into document
  ```javascript
  // Inject CSS for runtime-generated classes
  class CSSInjector {
    constructor() {
      this.styleElement = document.createElement('style');
      this.styleElement.id = 'runtime-tailwind-css';
      document.head.appendChild(this.styleElement);
      this.injectedCSS = new Set();
    }
    
    injectCSS(css, className) {
      if (!this.injectedCSS.has(className)) {
        this.styleElement.textContent += css + '\n';
        this.injectedCSS.add(className);
      }
    }
    
    clearCSS() {
      this.styleElement.textContent = '';
      this.injectedCSS.clear();
    }
  }
  ```
  - **Test**: Inject CSS for new classes
  - **Success**: Styles are immediately applied

### 5.2 Performance Optimization
- [ ] **Batch Processing** - Process multiple classes efficiently
  ```javascript
  // Batch process classes for better performance
  class BatchClassProcessor {
    constructor() {
      this.pendingClasses = new Set();
      this.processingTimeout = null;
    }
    
    addClass(className) {
      this.pendingClasses.add(className);
      this.scheduleProcessing();
    }
    
    scheduleProcessing() {
      if (this.processingTimeout) {
        clearTimeout(this.processingTimeout);
      }
      
      this.processingTimeout = setTimeout(() => {
        this.processBatch();
      }, 16); // Next animation frame
    }
    
    processBatch() {
      const classes = Array.from(this.pendingClasses);
      const css = this.generateBatchCSS(classes);
      this.injectBatchCSS(css);
      this.pendingClasses.clear();
    }
  }
  ```
  - **Test**: Process multiple classes in batches
  - **Success**: Better performance with many concurrent class additions

- [ ] **Memory Management** - Efficient memory usage
  ```javascript
  // Manage memory efficiently for long-running applications
  class MemoryEfficientClassManager {
    constructor(maxClasses = 10000) {
      this.maxClasses = maxClasses;
      this.classLRU = new Map(); // Least Recently Used cache
      this.cssCache = new Map();
    }
    
    addClass(className) {
      // Move to end (most recently used)
      if (this.classLRU.has(className)) {
        this.classLRU.delete(className);
      }
      this.classLRU.set(className, Date.now());
      
      // Remove oldest if over limit
      if (this.classLRU.size > this.maxClasses) {
        const oldest = this.classLRU.keys().next().value;
        this.removeClass(oldest);
      }
      
      // Generate CSS if not cached
      if (!this.cssCache.has(className)) {
        this.generateCSS(className);
      }
    }
    
    removeClass(className) {
      this.classLRU.delete(className);
      this.cssCache.delete(className);
      // Could also remove from DOM stylesheet
    }
  }
  ```
  - **Test**: Manage large numbers of classes without memory leaks
  - **Success**: Memory usage stays bounded

---

## Summary Statistics
- **Total Items**: 80
- **High Priority**: 45 items (Class detection + Dynamic handling + Runtime integration)
- **Medium Priority**: 35 items (Source configuration + Safelisting)

## Success Criteria
- [ ] All class detection patterns work correctly
- [ ] Dynamic class anti-patterns are avoided
- [ ] Source file configuration is optimized
- [ ] Runtime class generation works seamlessly (critical for cssma-v3)
- [ ] Performance is optimized for large class sets
- [ ] Memory usage is efficient for long-running applications
- [ ] CSS injection works without conflicts

## Dependencies
- Tailwind CSS v4.1 with source detection features
- DOM MutationObserver API (for runtime detection)
- CSS custom properties support
- Modern JavaScript features (Set, Map, async/await)

## Special Considerations for cssma-v3
- Runtime class generation and detection
- Performance optimization for dynamic environments
- Memory management for long-running applications
- CSS injection without build-time compilation
- Integration with existing CSS frameworks

## References
- [Detecting Classes in Source Files Documentation](https://tailwindcss.com/docs/detecting-classes-in-source-files)
- [Dynamic Class Names Guide](https://tailwindcss.com/docs/content-configuration#dynamic-class-names)
- [Safelisting Classes](https://tailwindcss.com/docs/content-configuration#safelisting-classes)
- [MutationObserver API](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
- [Performance Optimization Strategies](https://web.dev/optimize-cls/) 
# Variables Specification

This specification covers Figma variable binding, variable references, and variable system integration.

## Variable Syntax

### Variable Reference Format
```typescript
// Basic variable reference (actual implementation uses $[...] syntax)
$[variable.name]             → boundVariables: { property: { type: "VARIABLE_ALIAS", id: "variableId" } }

// Nested variable paths
$[color/primary]             → Reference to color/primary variable
$[typography/heading/large]  → Reference to typography/heading/large variable
$[spacing/layout/margin]     → Reference to spacing/layout/margin variable

// Variable with fallback (theoretical - not in current implementation)
{color.primary|#FF0000}      → Use variable or fallback to #FF0000
{spacing.lg|16}              → Use variable or fallback to 16px
```

### Variable Types

#### Color Variables
```typescript
// Color variable binding (actual implementation)
bg-$[color/primary]          → fills: [{ 
  type: "SOLID",
  boundVariables: { 
    color: { type: "VARIABLE_ALIAS", id: "color/primary" } 
  }
}]

text-$[color/text/primary]   → fills: [{ 
  type: "SOLID",
  boundVariables: { 
    color: { type: "VARIABLE_ALIAS", id: "color/text/primary" } 
  }
}]

border-$[color/border/default] → strokes: [{ 
  type: "SOLID",
  boundVariables: { 
    color: { type: "VARIABLE_ALIAS", id: "color/border/default" } 
  }
}]
```

#### Size Variables
```typescript
// Width/Height variables
w-{size.width.container}     → boundVariables: {
  width: { type: "VARIABLE_ALIAS", id: "widthVariableId" }
}

h-{size.height.header}       → boundVariables: {
  height: { type: "VARIABLE_ALIAS", id: "heightVariableId" }
}

// Corner radius variables
rounded-{border.radius.md}   → boundVariables: {
  cornerRadius: { type: "VARIABLE_ALIAS", id: "radiusVariableId" }
}
```

#### Spacing Variables
```typescript
// Padding variables
p-{spacing.padding.md}       → boundVariables: {
  paddingTop: { type: "VARIABLE_ALIAS", id: "spacingVariableId" },
  paddingRight: { type: "VARIABLE_ALIAS", id: "spacingVariableId" },
  paddingBottom: { type: "VARIABLE_ALIAS", id: "spacingVariableId" },
  paddingLeft: { type: "VARIABLE_ALIAS", id: "spacingVariableId" }
}

// Gap variables
gap-{spacing.gap.lg}         → boundVariables: {
  itemSpacing: { type: "VARIABLE_ALIAS", id: "gapVariableId" }
}

// Margin-like positioning
top-{spacing.margin.sm}      → boundVariables: {
  y: { type: "VARIABLE_ALIAS", id: "marginVariableId" }
}
```

#### Typography Variables
```typescript
// Font size variables
text-{typography.size.body}  → boundVariables: {
  fontSize: { type: "VARIABLE_ALIAS", id: "fontSizeVariableId" }
}

// Font family variables
font-{typography.family.heading} → boundVariables: {
  fontFamily: { type: "VARIABLE_ALIAS", id: "fontFamilyVariableId" }
}

// Line height variables
leading-{typography.lineHeight.normal} → boundVariables: {
  lineHeight: { type: "VARIABLE_ALIAS", id: "lineHeightVariableId" }
}
```

#### Effect Variables
```typescript
// Opacity variables
opacity-{effects.opacity.modal} → boundVariables: {
  opacity: { type: "VARIABLE_ALIAS", id: "opacityVariableId" }
}

// Shadow variables
shadow-{effects.shadow.card}    → effects: [{
  type: "DROP_SHADOW",
  boundVariables: {
    color: { type: "VARIABLE_ALIAS", id: "shadowColorVariableId" },
    offset: { type: "VARIABLE_ALIAS", id: "shadowOffsetVariableId" },
    radius: { type: "VARIABLE_ALIAS", id: "shadowRadiusVariableId" }
  }
}]
```

## Variable Collections

### Collection Structure
```typescript
// Variable collections organization
{
  "collections": {
    "colors": {
      "name": "Colors",
      "modes": ["light", "dark"],
      "variables": {
        "primary": { "light": "#3B82F6", "dark": "#60A5FA" },
        "secondary": { "light": "#6B7280", "dark": "#9CA3AF" }
      }
    },
    "spacing": {
      "name": "Spacing",
      "modes": ["mobile", "desktop"],
      "variables": {
        "sm": { "mobile": 8, "desktop": 12 },
        "md": { "mobile": 16, "desktop": 24 }
      }
    }
  }
}
```

### Mode-Aware Variables
```typescript
// Variables that change based on mode
bg-{color.background}        → Adapts to light/dark mode automatically
p-{spacing.container}        → Adapts to mobile/desktop breakpoint
text-{typography.size.body}  → Adapts to scale factor (accessibility)
```

## Variable Resolution

### Resolution Priority
```typescript
// Variable resolution order
{color.primary}              → 1. Check local scope
{color.primary|#FF0000}      → 2. Check parent scopes
                            → 3. Use fallback value
                            → 4. Use system default
```

### Scope Hierarchy
```typescript
// Variable scope resolution
{
  "component": {
    "variables": { /* Component-level variables */ }
  },
  "page": {
    "variables": { /* Page-level variables */ }
  },
  "document": {
    "variables": { /* Document-level variables */ }
  },
  "library": {
    "variables": { /* Library-level variables */ }
  }
}
```

## Variable Operations

### Variable Arithmetic
```typescript
// Mathematical operations with variables
w-{size.base*2}              → width: variable.value * 2
p-{spacing.md+4}             → padding: variable.value + 4
opacity-{opacity.base/2}     → opacity: variable.value / 2

// Complex expressions
gap-{spacing.base+spacing.sm} → itemSpacing: baseValue + smValue
```

### Variable Conditionals
```typescript
// Conditional variable usage
bg-{theme.dark?color.dark:color.light}  → Conditional based on theme mode
text-{size.mobile<768?sm:md}             → Conditional based on viewport
```

## Variable Binding Properties

### Supported Binding Properties
```typescript
// Layout properties
width, height, x, y
paddingTop, paddingRight, paddingBottom, paddingLeft
itemSpacing, counterAxisSpacing
cornerRadius, topLeftRadius, topRightRadius, bottomLeftRadius, bottomRightRadius

// Visual properties
opacity, rotation
fontSize, lineHeight, letterSpacing

// Fill properties
color (for solid fills)
opacity (for fill opacity)

// Stroke properties
color (for solid strokes)
strokeWeight

// Effect properties
color, radius, offset (for shadows and blurs)
```

### Unsupported Properties
```typescript
// Properties that cannot be bound to variables
layoutMode, layoutWrap
textAlignHorizontal, textAlignVertical
fontFamily (limited support)
blendMode
strokeAlign, strokeCap, strokeJoin
```

## Usage Examples

### Theme-Aware Component
```typescript
{
  "type": "FRAME",
  "name": "Card",
  "styles": "bg-{color.surface} border-{color.border} rounded-{border.radius.md} p-{spacing.card}"
}
// Result:
// fills: [{ type: "SOLID", boundVariables: { color: { type: "VARIABLE_ALIAS", id: "surfaceColorId" } } }]
// strokes: [{ type: "SOLID", boundVariables: { color: { type: "VARIABLE_ALIAS", id: "borderColorId" } } }]
// boundVariables: { 
//   cornerRadius: { type: "VARIABLE_ALIAS", id: "radiusId" },
//   paddingTop: { type: "VARIABLE_ALIAS", id: "spacingId" }
// }
```

### Responsive Typography
```typescript
{
  "type": "TEXT",
  "name": "Heading",
  "styles": "text-{typography.size.h1} font-{typography.family.heading} text-{color.text.primary}"
}
// Result:
// boundVariables: {
//   fontSize: { type: "VARIABLE_ALIAS", id: "h1SizeId" },
//   fontFamily: { type: "VARIABLE_ALIAS", id: "headingFamilyId" }
// },
// fills: [{ type: "SOLID", boundVariables: { color: { type: "VARIABLE_ALIAS", id: "textColorId" } } }]
```

### Dynamic Spacing System
```typescript
{
  "type": "FRAME",
  "name": "Layout",
  "styles": "flex-col gap-{spacing.section} p-{spacing.container}"
}
// Result:
// layoutMode: "VERTICAL"
// boundVariables: {
//   itemSpacing: { type: "VARIABLE_ALIAS", id: "sectionGapId" },
//   paddingTop: { type: "VARIABLE_ALIAS", id: "containerPaddingId" }
// }
```

### Variable Fallbacks
```typescript
{
  "type": "FRAME", 
  "name": "Safe Component",
  "styles": "bg-{color.brand|#3B82F6} w-{size.container|400} opacity-{effects.alpha|0.9}"
}
// Result: Uses variables if available, falls back to literal values
```

### Complex Variable Combinations
```typescript
{
  "type": "FRAME",
  "name": "Advanced Card",
  "styles": `
    bg-{color.surface} 
    border-{color.border.weak} 
    rounded-{border.radius.lg} 
    shadow-{effects.shadow.elevated}
    p-{spacing.content}
    gap-{spacing.elements}
  `
}
// Result: Multiple variable bindings across different property types
```

## Variable Management

### Variable Naming Conventions
```typescript
// Semantic naming
{color.text.primary}         → Semantic purpose-based naming
{color.text.secondary}       → Clear hierarchy
{color.text.disabled}        → State-based naming

// Avoid technical naming
{color.gray.500}             → Less preferred (technical)
{color.#6B7280}              → Avoid (implementation detail)
```

### Variable Grouping
```typescript
// Logical grouping structure
colors/
  ├── text/
  │   ├── primary
  │   ├── secondary
  │   └── disabled
  ├── background/
  │   ├── primary
  │   ├── secondary
  │   └── elevated
  └── border/
      ├── default
      ├── strong
      └── weak

spacing/
  ├── layout/
  │   ├── container
  │   ├── section
  │   └── component
  └── elements/
      ├── tight
      ├── normal
      └── loose
```

## Variable System Integration

### Library Variables
```typescript
// External library variable references
{libraryName.color.primary}     → Reference to external library
{designSystem.spacing.base}     → Reference to shared design system
{tokens.elevation.card}         → Reference to design token system
```

### Variable Synchronization
```typescript
// Sync with external systems
{
  "sync": {
    "source": "design-tokens.json",
    "mapping": {
      "color.primary": "colors.primary.500",
      "spacing.md": "space.4"
    }
  }
}
```

## Notes and Constraints

### Variable Binding Rules
1. **Type Matching**: Variable type must match property type
2. **Scope Access**: Variables must be accessible in current scope
3. **Mode Compatibility**: Variable modes must align with current context
4. **Circular References**: Prevented by the system

### Performance Considerations
1. **Resolution Speed**: Deeply nested variables impact performance
2. **Update Propagation**: Variable changes trigger recomputation
3. **Memory Usage**: Complex variable hierarchies use more memory
4. **Caching**: Frequently used variables are cached for performance

### Figma Limitations
1. **Property Support**: Limited set of properties support variable binding
2. **Variable Types**: Limited to COLOR, FLOAT, STRING, BOOLEAN
3. **Expressions**: No complex mathematical expressions
4. **Dynamic Binding**: Cannot bind to dynamic/computed values
5. **Cross-Document**: Limited cross-document variable references

### Best Practices
1. **Semantic Naming**: Use purpose-based variable names
2. **Logical Grouping**: Organize variables in clear hierarchies
3. **Fallback Values**: Always provide fallback values
4. **Mode Consistency**: Ensure all modes have variable values
5. **Documentation**: Document variable purpose and usage 
# Vectors Specification

This specification covers vector nodes, SVG paths, and vector-specific styling properties for Figma.

## Vector Node Types

### Basic Vector Shapes
```typescript
// Rectangle vector
{
  "type": "RECTANGLE",
  "styles": "fill-red-500 stroke-blue-500 stroke-2"
}
// Result: Rectangle with red fill and blue stroke

// Ellipse vector  
{
  "type": "ELLIPSE", 
  "styles": "fill-gradient-to-r from-purple-500 to-pink-500"
}
// Result: Ellipse with gradient fill

// Line vector
{
  "type": "LINE",
  "styles": "stroke-gray-800 stroke-[3] stroke-cap-round"
}
// Result: Line with round caps and gray stroke
```

### Custom Vector Paths
```typescript
// SVG path data
{
  "type": "VECTOR",
  "name": "Custom Icon",
  "vectorPaths": [{
    "windingRule": "NONZERO",
    "data": "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
  }],
  "styles": "fill-yellow-500 stroke-orange-500"
}
// Result: Star icon with yellow fill and orange stroke
```

## Vector Fill Properties

### Solid Fills
```typescript
// Basic vector fills
fill-red-500         → vectorPaths[0].fills: [{ type: "SOLID", color: { r: 0.94, g: 0.27, b: 0.27 } }]
fill-transparent     → vectorPaths[0].fills: []
fill-[#FF6B35]       → vectorPaths[0].fills: [{ type: "SOLID", color: { r: 1, g: 0.42, b: 0.21 } }]

// Fill with opacity
fill-blue-500/50     → vectorPaths[0].fills: [{ 
  type: "SOLID", 
  color: { r: 0.23, g: 0.51, b: 0.97 },
  opacity: 0.5 
}]
```

### Gradient Fills
```typescript
// Linear gradient fills
fill-gradient-to-r from-red-500 to-blue-500 → vectorPaths[0].fills: [{
  type: "GRADIENT_LINEAR",
  gradientTransform: [[1, 0, 0], [0, 1, 0]],
  gradientStops: [
    { position: 0, color: { r: 0.94, g: 0.27, b: 0.27 } },
    { position: 1, color: { r: 0.23, g: 0.51, b: 0.97 } }
  ]
}]

// Radial gradient fills
fill-gradient-radial from-center from-white to-gray-500 → vectorPaths[0].fills: [{
  type: "GRADIENT_RADIAL",
  gradientTransform: [[1, 0, 0.5], [0, 1, 0.5]],
  gradientStops: [
    { position: 0, color: { r: 1, g: 1, b: 1 } },
    { position: 1, color: { r: 0.42, g: 0.42, b: 0.42 } }
  ]
}]
```

### Image Fills
```typescript
// Image pattern fills
fill-image-[url('image.png')]    → vectorPaths[0].fills: [{
  type: "IMAGE",
  scaleMode: "FILL",
  imageHash: "imageHashValue",
  scalingFactor: 1
}]

// Image scaling modes
fill-image-fit       → scaleMode: "FIT"
fill-image-crop      → scaleMode: "CROP" 
fill-image-tile      → scaleMode: "TILE"
```

## Vector Stroke Properties

### Stroke Styling
```typescript
// Basic strokes
stroke-red-500       → vectorPaths[0].strokes: [{ type: "SOLID", color: { r: 0.94, g: 0.27, b: 0.27 } }]
stroke-[2]           → vectorPaths[0].strokeWeight: 2
stroke-none          → vectorPaths[0].strokes: []

// Stroke alignment (vector-specific)
stroke-center        → vectorPaths[0].strokeAlign: "CENTER"
stroke-inside        → vectorPaths[0].strokeAlign: "INSIDE"
stroke-outside       → vectorPaths[0].strokeAlign: "OUTSIDE"
```

### Stroke Caps and Joins
```typescript
// Line cap styles
stroke-cap-butt      → vectorPaths[0].strokeCap: "NONE"
stroke-cap-round     → vectorPaths[0].strokeCap: "ROUND"
stroke-cap-square    → vectorPaths[0].strokeCap: "SQUARE"

// Line join styles  
stroke-join-miter    → vectorPaths[0].strokeJoin: "MITER"
stroke-join-round    → vectorPaths[0].strokeJoin: "ROUND"
stroke-join-bevel    → vectorPaths[0].strokeJoin: "BEVEL"

// Miter limit
stroke-miter-[4]     → vectorPaths[0].strokeMiterLimit: 4
```

### Dash Patterns
```typescript
// Predefined dash patterns
stroke-dashed        → vectorPaths[0].dashPattern: [5, 5]
stroke-dotted        → vectorPaths[0].dashPattern: [1, 1]
stroke-solid         → vectorPaths[0].dashPattern: []

// Custom dash patterns
stroke-dash-[5,3]            → vectorPaths[0].dashPattern: [5, 3]
stroke-dash-[10,5,2,5]       → vectorPaths[0].dashPattern: [10, 5, 2, 5]
stroke-dash-offset-[3]       → vectorPaths[0].dashOffset: 3
```

## Vector Path Operations

### Path Data
```typescript
// SVG path commands
moveTo(x, y)         → M x y
lineTo(x, y)         → L x y
curveTo(x1,y1,x2,y2,x,y) → C x1 y1 x2 y2 x y
quadraticCurveTo(x1,y1,x,y) → Q x1 y1 x y
arcTo(rx,ry,rotation,large,sweep,x,y) → A rx ry rotation large-arc sweep x y
closePath()          → Z

// Example path data
"M12 2L22 8.5L22 15.5L12 22L2 15.5L2 8.5L12 2Z" → Hexagon path
"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" → Circle path
```

### Winding Rules
```typescript
// Fill rules for complex paths
winding-nonzero      → vectorPaths[0].windingRule: "NONZERO"
winding-evenodd      → vectorPaths[0].windingRule: "EVENODD"
```

### Boolean Operations
```typescript
// Path combination operations (applied to multiple vector paths)
boolean-union        → Combine paths using union operation
boolean-subtract     → Subtract second path from first
boolean-intersect    → Keep only overlapping areas
boolean-exclude      → Remove overlapping areas
```

## Vector Transforms

### Transform Properties
```typescript
// Vector-specific transforms
vector-scale-[1.5]           → Apply scaling transform
vector-rotate-[45deg]        → Apply rotation transform
vector-skew-x-[15deg]        → Apply horizontal skew
vector-skew-y-[10deg]        → Apply vertical skew

// Transform origin
transform-origin-center      → Set transform origin to center
transform-origin-top-left    → Set transform origin to top-left
transform-origin-[50%,25%]   → Custom transform origin
```

## Vector Effects

### Path Effects
```typescript
// Vector-specific effects
path-offset-[2]              → Offset path outward by 2px
path-simplify                → Simplify path by removing unnecessary points
path-smooth-[0.5]            → Smooth path with specified factor

// Outline effects
outline-[2]                  → Convert stroke to outline with width 2
outline-cap-round            → Round caps for outline
outline-join-round           → Round joins for outline
```

## Icon and Symbol Usage

### Icon Systems
```typescript
// Icon component with variants
{
  "type": "COMPONENT",
  "name": "Icon/Arrow",
  "variants": {
    "direction": ["up", "down", "left", "right"],
    "size": ["sm", "md", "lg"]
  },
  "styles": "fill-{color.icon} w-{size.icon} h-{size.icon}"
}
```

### SVG Import
```typescript
// Import SVG as vector
{
  "type": "VECTOR",
  "name": "Imported Icon",
  "importSource": "icon.svg",
  "styles": "fill-current stroke-none"
}
// Result: Imports SVG file and applies current text color as fill
```

## Usage Examples

### Simple Icon
```typescript
{
  "type": "VECTOR",
  "name": "Check Icon",
  "vectorPaths": [{
    "windingRule": "NONZERO",
    "data": "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
  }],
  "styles": "fill-green-500 w-6 h-6"
}
// Result: Green checkmark icon, 24x24px
```

### Complex Logo
```typescript
{
  "type": "VECTOR",
  "name": "Company Logo",
  "vectorPaths": [
    {
      "windingRule": "NONZERO", 
      "data": "M12 2L2 7l10 5 10-5-10-5z",
      "fills": [{ "type": "SOLID", "color": { "r": 0.2, "g": 0.4, "b": 0.8 } }]
    },
    {
      "windingRule": "NONZERO",
      "data": "M2 17l10 5 10-5V7l-10 5-10-5v10z", 
      "fills": [{ "type": "SOLID", "color": { "r": 0.1, "g": 0.2, "b": 0.4 } }]
    }
  ],
  "styles": "w-[120] h-[80]"
}
// Result: Multi-layer logo with different colored paths
```

### Outlined Icon
```typescript
{
  "type": "VECTOR",
  "name": "Heart Outline",
  "vectorPaths": [{
    "windingRule": "NONZERO",
    "data": "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
  }],
  "styles": "fill-none stroke-red-500 stroke-2 stroke-join-round"
}
// Result: Heart outline icon with red stroke
```

### Animated Icon (theoretical)
```typescript
{
  "type": "VECTOR",
  "name": "Loading Spinner",
  "vectorPaths": [{
    "windingRule": "NONZERO",
    "data": "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
  }],
  "styles": "fill-none stroke-blue-500 stroke-2 stroke-dash-[8,4] animate-spin"
}
// Result: Spinning dashed circle (animation would need additional implementation)
```

## Vector Optimization

### Path Optimization
```typescript
// Optimize vector paths for performance
{
  "optimize": {
    "simplifyPaths": true,          // Remove unnecessary path points
    "mergePaths": true,             // Combine compatible paths
    "removeOverlaps": true,         // Remove overlapping path segments
    "precision": 2                  // Decimal precision for coordinates
  }
}
```

### Export Optimization
```typescript
// Vector export settings
{
  "export": {
    "format": "SVG",
    "precision": 2,                 // Coordinate precision
    "minifyPaths": true,            // Minify path data
    "removeMetadata": true,         // Remove design metadata
    "optimizeStrokes": true         // Convert strokes to paths when beneficial
  }
}
```

## Notes and Constraints

### Vector Path Rules
1. **Path Complexity**: Complex paths impact rendering performance
2. **Coordinate Precision**: Limited to reasonable decimal precision
3. **Path Commands**: Support standard SVG path commands
4. **Winding Rules**: NONZERO and EVENODD supported

### Stroke Rules
1. **Stroke Alignment**: Different from frame stroke alignment
2. **Cap Styles**: Only apply to open paths
3. **Join Styles**: Apply to path corners and intersections
4. **Dash Patterns**: Array of dash and gap lengths

### Performance Considerations
1. **Path Complexity**: Limit number of path points
2. **Multiple Paths**: Minimize number of separate paths
3. **Gradient Complexity**: Simple gradients perform better
4. **Transform Operations**: Minimize complex transforms

### Figma Limitations
1. **Path Editing**: Limited programmatic path editing
2. **Boolean Operations**: Limited to basic operations
3. **Text to Vector**: No direct text-to-path conversion
4. **Animation**: No native vector animation support
5. **3D Effects**: No 3D transforms or effects
6. **Pattern Fills**: Limited pattern support compared to image fills

### Best Practices
1. **Path Simplification**: Optimize paths for performance
2. **Consistent Styling**: Use consistent stroke and fill properties
3. **Icon Systems**: Create reusable icon components
4. **Variable Binding**: Use variables for consistent theming
5. **Export Optimization**: Optimize vectors for target use case 
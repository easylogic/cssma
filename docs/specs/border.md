# Border Specification

This specification covers borders, strokes, and corner radius properties for Figma nodes.

## Stroke Properties

### Stroke Width
```typescript
// Basic border width
border          → strokeWeight: 1
border-0        → strokeWeight: 0
border-[2]      → strokeWeight: 2
border-[0.5]    → strokeWeight: 0.5

// Preset border widths
border-1        → strokeWeight: 1
border-2        → strokeWeight: 2
border-4        → strokeWeight: 4
border-8        → strokeWeight: 8
```

### Stroke Color
```typescript
// Direct colors
border-[#FF0000]       → strokes: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }]
border-[rgb(255,0,0)]  → strokes: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }]

// Preset colors  
border-transparent     → strokes: []
border-black           → strokes: [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }]
border-white           → strokes: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }]
border-gray-500        → strokes: [{ type: "SOLID", color: { r: 0.42, g: 0.45, b: 0.51 } }]

// With opacity
border-red-500/50      → strokes: [{ 
  type: "SOLID", 
  color: { r: 0.94, g: 0.27, b: 0.27 },
  opacity: 0.5 
}]
```

### Stroke Style
```typescript
// Stroke alignment
border-inside    → strokeAlign: "INSIDE"
border-outside   → strokeAlign: "OUTSIDE" 
border-center    → strokeAlign: "CENTER"

// Dash patterns
border-solid     → dashPattern: []
border-dashed    → dashPattern: [5, 5]
border-dotted    → dashPattern: [1, 1]

// Custom dash patterns
border-dash-[5,10]     → dashPattern: [5, 10]
border-dash-[2,3,5,3]  → dashPattern: [2, 3, 5, 3]
```

### Stroke Caps
```typescript
// Line cap styles (for open paths)
stroke-cap-round   → strokeCap: "ROUND"
stroke-cap-square  → strokeCap: "SQUARE"  
stroke-cap-none    → strokeCap: "NONE"

// Line join styles
stroke-join-round  → strokeJoin: "ROUND"
stroke-join-bevel  → strokeJoin: "BEVEL"
stroke-join-miter  → strokeJoin: "MITER"
```

## Corner Radius

### Uniform Radius
```typescript
// Basic radius
rounded         → cornerRadius: 4
rounded-none    → cornerRadius: 0
rounded-sm      → cornerRadius: 2
rounded-md      → cornerRadius: 6
rounded-lg      → cornerRadius: 8
rounded-xl      → cornerRadius: 12
rounded-2xl     → cornerRadius: 16
rounded-3xl     → cornerRadius: 24
rounded-full    → cornerRadius: 9999

// Arbitrary radius
rounded-[10]    → cornerRadius: 10
rounded-[1.5]   → cornerRadius: 1.5
```

### Individual Corners
```typescript
// Top corners
rounded-t       → topLeftRadius: 4, topRightRadius: 4
rounded-t-lg    → topLeftRadius: 8, topRightRadius: 8
rounded-t-[12]  → topLeftRadius: 12, topRightRadius: 12

// Bottom corners  
rounded-b       → bottomLeftRadius: 4, bottomRightRadius: 4
rounded-b-lg    → bottomLeftRadius: 8, bottomRightRadius: 8
rounded-b-[12]  → bottomLeftRadius: 12, bottomRightRadius: 12

// Left corners
rounded-l       → topLeftRadius: 4, bottomLeftRadius: 4
rounded-l-lg    → topLeftRadius: 8, bottomLeftRadius: 8
rounded-l-[12]  → topLeftRadius: 12, bottomLeftRadius: 12

// Right corners
rounded-r       → topRightRadius: 4, bottomRightRadius: 4
rounded-r-lg    → topRightRadius: 8, bottomRightRadius: 8
rounded-r-[12]  → topRightRadius: 12, bottomRightRadius: 12
```

### Specific Corners
```typescript
// Individual corner control
rounded-tl      → topLeftRadius: 4
rounded-tr      → topRightRadius: 4
rounded-bl      → bottomLeftRadius: 4
rounded-br      → bottomRightRadius: 4

// With sizes
rounded-tl-lg   → topLeftRadius: 8
rounded-tr-[20] → topRightRadius: 20
rounded-bl-sm   → bottomLeftRadius: 2
rounded-br-xl   → bottomRightRadius: 12
```

## Advanced Border Patterns

### Multiple Strokes
```typescript
// Layered borders (inside to outside)
border-2 border-red-500 border-4 border-blue-500 → strokes: [
  { type: "SOLID", color: red, strokeWeight: 2, strokeAlign: "INSIDE" },
  { type: "SOLID", color: blue, strokeWeight: 4, strokeAlign: "OUTSIDE" }
]
```

### Gradient Borders
```typescript
// Gradient strokes
border-gradient-to-r from-red-500 to-blue-500 → strokes: [{
  type: "GRADIENT_LINEAR",
  gradientTransform: [[1, 0, 0], [0, 1, 0]],
  gradientStops: [
    { position: 0, color: { r: 0.94, g: 0.27, b: 0.27 } },
    { position: 1, color: { r: 0.23, g: 0.51, b: 0.97 } }
  ]
}]
```

### Image Borders
```typescript
// Image stroke patterns
border-image-[url(...)] → strokes: [{
  type: "IMAGE",
  scaleMode: "STRETCH",
  imageHash: "...",
  scalingFactor: 1
}]
```

## Variable Binding

### Border Variables
```typescript
// Stroke color binding (actual implementation)
border-color-$[color/border] → strokes: [{ 
  type: "SOLID",
  boundVariables: { 
    color: { type: "VARIABLE_ALIAS", id: "color/border" } 
  }
}]

// Stroke weight binding  
border-width-$[border/width/md] → boundVariables: {
  strokeWeight: { type: "VARIABLE_ALIAS", id: "border/width/md" }
}

// Corner radius binding
rounded-$[border/radius] → boundVariables: {
  cornerRadius: { type: "VARIABLE_ALIAS", id: "border/radius" }
}
```

## Usage Examples

### Basic Card Border
```typescript
{
  "type": "FRAME",
  "name": "Card",
  "styles": "border border-gray-200 rounded-lg"
}
// Result:
// strokeWeight: 1
// strokes: [{ type: "SOLID", color: { r: 0.89, g: 0.91, b: 0.94 } }]
// cornerRadius: 8
```

### Button with Thick Border
```typescript
{
  "type": "FRAME", 
  "name": "Button",
  "styles": "border-2 border-blue-500 rounded-full"
}
// Result:
// strokeWeight: 2
// strokes: [{ type: "SOLID", color: { r: 0.23, g: 0.51, b: 0.97 } }]
// cornerRadius: 9999
```

### Dashed Border Container
```typescript
{
  "type": "FRAME",
  "name": "Upload Area", 
  "styles": "border-2 border-dashed border-gray-400 rounded-md"
}
// Result:
// strokeWeight: 2
// strokes: [{ type: "SOLID", color: { r: 0.64, g: 0.68, b: 0.73 } }]
// dashPattern: [5, 5]
// cornerRadius: 6
```

### Complex Corner Radius
```typescript
{
  "type": "FRAME",
  "name": "Message Bubble",
  "styles": "bg-blue-500 rounded-t-lg rounded-bl-lg rounded-br-sm"
}
// Result:
// topLeftRadius: 8
// topRightRadius: 8 
// bottomLeftRadius: 8
// bottomRightRadius: 2
```

### Inside Border with Gradient
```typescript
{
  "type": "FRAME",
  "name": "Premium Card",
  "styles": "border-inside border-4 border-gradient-to-r from-gold-400 to-gold-600"
}
// Result:
// strokeAlign: "INSIDE"
// strokeWeight: 4
// strokes: [{ 
//   type: "GRADIENT_LINEAR",
//   gradientStops: [gold400, gold600]
// }]
```

## Border Combinations

### Override Patterns
```typescript
// Later declarations override earlier ones
border border-red-500 border-2 border-blue-500 →
// strokeWeight: 2
// strokes: [{ type: "SOLID", color: blue }]

// Specific overrides general
rounded rounded-t-none →
// topLeftRadius: 0, topRightRadius: 0
// bottomLeftRadius: 4, bottomRightRadius: 4
```

### Additive Patterns
```typescript
// Multiple stroke layers
border border-red-500 border-inside border-2 border-blue-500 border-outside →
// strokes: [
//   { type: "SOLID", color: red, strokeAlign: "INSIDE" },
//   { type: "SOLID", color: blue, strokeAlign: "OUTSIDE", strokeWeight: 2 }
// ]
```

## Notes and Constraints

### Stroke Rules
1. **Alignment**: INSIDE strokes don't affect layout, OUTSIDE strokes do
2. **Multiple Strokes**: Each stroke can have different properties
3. **Dash Patterns**: Array of on/off lengths in pixels
4. **Gradient Strokes**: Same gradient system as fills

### Corner Radius Rules  
1. **Individual Control**: Each corner can have different radius
2. **Maximum Radius**: Limited by smallest dimension / 2
3. **Override Priority**: Specific corners override general declarations
4. **Smoothing**: Figma automatically smooths corner transitions

### Performance Considerations
1. **Simple Borders**: Solid colors perform better than gradients
2. **Stroke Count**: Limit number of stroke layers
3. **Dash Complexity**: Simple dash patterns preferred
4. **Corner Calculations**: Complex corner combinations impact performance

### Figma Limitations
1. **Stroke Types**: Limited to SOLID, GRADIENT, IMAGE
2. **Corner Smoothing**: No control over corner smoothing algorithm
3. **Dash Patterns**: Limited pattern complexity
4. **Stroke Caps**: Only apply to open vector paths
5. **Border Radius**: Cannot exceed 50% of smallest dimension 
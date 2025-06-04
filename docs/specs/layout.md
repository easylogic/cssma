# Layout Specification

This specification covers Auto Layout, Flexbox direction, sizing, alignment, and spacing properties.

## Layout Direction

### Flex Direction
```typescript
// Layout Mode
flex-row        → layoutMode: "HORIZONTAL"
flex-col        → layoutMode: "VERTICAL"

// Layout Wrapping
flex-wrap       → layoutWrap: "WRAP"
flex-nowrap     → layoutWrap: "NO_WRAP"
```

## Sizing Properties

### Width
```typescript
// Layout Sizing
w-auto         → layoutSizingHorizontal: "HUG"
w-full         → layoutSizingHorizontal: "FILL"

// Fixed Width (arbitrary values)
w-[100]        → width: 100
w-[24px]       → width: 24

// Variables
w-$[size/container] → boundVariables: { width: { type: "VARIABLE_ALIAS", id: "size/container" } }

// Note: Preset widths like w-1, w-2, etc. are not implemented in the current parser
// Only w-auto, w-full, arbitrary values w-[...], and variables w-$[...] are supported
```

### Height
```typescript
// Layout Sizing
h-auto         → layoutSizingVertical: "HUG"
h-full         → layoutSizingVertical: "FILL"

// Fixed Height (arbitrary values)
h-[100]        → height: 100
h-[24px]       → height: 24

// Variables
h-$[size/height] → boundVariables: { height: { type: "VARIABLE_ALIAS", id: "size/height" } }

// Note: Preset heights like h-1, h-2, etc. are not implemented in the current parser
// Only h-auto, h-full, arbitrary values h-[...], and variables h-$[...] are supported
```

### Size Constraints
```typescript
// Min Width
min-w-[100]    → minWidth: 100
min-w-0        → minWidth: 0
min-w-full     → minWidth: "100%"

// Max Width
max-w-[200]    → maxWidth: 200
max-w-none     → maxWidth: Infinity
max-w-full     → maxWidth: "100%"

// Min Height
min-h-[50]     → minHeight: 50
min-h-0        → minHeight: 0
min-h-full     → minHeight: "100%"

// Max Height
max-h-[150]    → maxHeight: 150
max-h-none     → maxHeight: Infinity
max-h-full     → maxHeight: "100%"
```

## Alignment Properties

### Primary Axis Alignment (Justify)
```typescript
// Horizontal alignment in flex-row, vertical in flex-col
justify-start   → primaryAxisAlignItems: "MIN"
justify-center  → primaryAxisAlignItems: "CENTER"
justify-end     → primaryAxisAlignItems: "MAX"
justify-between → primaryAxisAlignItems: "SPACE_BETWEEN"
```

### Counter Axis Alignment (Items)
```typescript
// Vertical alignment in flex-row, horizontal in flex-col
items-start     → counterAxisAlignItems: "MIN"
items-center    → counterAxisAlignItems: "CENTER"
items-end       → counterAxisAlignItems: "MAX"
items-baseline  → counterAxisAlignItems: "BASELINE"
```

## Spacing Properties

### Gap (Item Spacing)
```typescript
// Basic Gap (arbitrary values only)
gap-[16]       → property: 'gap', value: 16

// Directional Gap
gap-x-[16]     → property: 'itemSpacing', value: 16
gap-y-[16]     → property: 'counterAxisSpacing', value: 16

// Variables
gap-$[spacing/md]   → property: 'gap', variableId: 'spacing/md'
gap-x-$[spacing/sm] → property: 'itemSpacing', variableId: 'spacing/sm'
gap-y-$[spacing/lg] → property: 'counterAxisSpacing', variableId: 'spacing/lg'

// Note: Preset gap values like gap-1, gap-2, etc. are not implemented
// Only arbitrary values gap-[...] and variables gap-$[...] are supported
// The 'gap' property is converted later to appropriate itemSpacing/counterAxisSpacing
```

### Padding
```typescript
// All Sides
p-[16]         → paddingTop: 16, paddingRight: 16, paddingBottom: 16, paddingLeft: 16

// Horizontal & Vertical
px-[16]        → paddingLeft: 16, paddingRight: 16
py-[16]        → paddingTop: 16, paddingBottom: 16

// Individual Sides
pt-[16]        → paddingTop: 16
pr-[16]        → paddingRight: 16
pb-[16]        → paddingBottom: 16
pl-[16]        → paddingLeft: 16

// Preset Padding Values
p-0            → padding: 0
p-1            → padding: 4
p-2            → padding: 8
p-4            → padding: 16
p-6            → padding: 24
p-8            → padding: 32
```

## Usage Examples

### Basic Auto Layout Container
```typescript
{
  "type": "FRAME",
  "name": "Container",
  "styles": "flex-col items-center gap-[16] p-[24]"
}
// Result:
// layoutMode: "VERTICAL"
// counterAxisAlignItems: "CENTER"
// itemSpacing: 16
// padding: 24
```

### Responsive Card Layout
```typescript
{
  "type": "FRAME",
  "name": "Card",
  "styles": "flex-row justify-between items-center w-full p-[16] gap-[12]"
}
// Result:
// layoutMode: "HORIZONTAL"
// primaryAxisAlignItems: "SPACE_BETWEEN"
// counterAxisAlignItems: "CENTER"
// layoutSizingHorizontal: "FILL"
// padding: 16
// itemSpacing: 12
```

### Fixed Size Container
```typescript
{
  "type": "FRAME",
  "name": "Box",
  "styles": "w-[200] h-[100] p-[16]"
}
// Result:
// width: 200
// height: 100
// padding: 16
```

## Notes and Constraints

### Layout Mode Rules
1. **Direction**: Only supports HORIZONTAL or VERTICAL
2. **Wrapping**: `flex-wrap` only works in the primary axis direction
3. **Nesting**: Auto layout containers can be nested infinitely

### Sizing Rules
1. **HUG vs FILL**:
   - `HUG`: Fits content size
   - `FILL`: Takes remaining space in parent
2. **Fixed Sizes**: Override layout sizing behavior
3. **Constraints**: Min/max values work with both HUG and FILL

### Spacing Rules
1. **Gap Override**: Directional gaps override basic gap
2. **Processing Order**: Later declarations override earlier ones
3. **Unit Handling**: All values are in pixels
4. **Negative Values**: Not supported for spacing

### Performance Considerations
1. **Preset Values**: Use preset values when possible for better performance
2. **Deep Nesting**: Avoid excessive nesting of auto layout containers
3. **Fixed Sizes**: Use fixed sizes for static layouts to improve performance

### Figma Limitations
1. **Layout Mode**: Cannot mix HORIZONTAL and VERTICAL in same container
2. **Baseline**: Baseline alignment only works with text elements
3. **Wrap Direction**: Wrap only affects primary axis, not counter axis 
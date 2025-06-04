# Position Specification

This specification covers positioning, constraints, and layout positioning for Figma nodes.

## Positioning Types

### Layout Positioning (Auto Layout Children)
```typescript
// Positioning within auto layout parents
absolute    → layoutPositioning: "ABSOLUTE"
relative    → layoutPositioning: "AUTO" (default)
```

### Manual Positioning (Non-Auto Layout)
```typescript
// Position coordinates for manual layout
top-[10]      → y: 10
right-[20]    → x: parentWidth - nodeWidth - 20
bottom-[30]   → y: parentHeight - nodeHeight - 30
left-[40]     → x: 40

// Combined positioning
top-[10] left-[20]    → x: 20, y: 10
bottom-[10] right-[20] → x: parentWidth - nodeWidth - 20, y: parentHeight - nodeHeight - 10
```

## Constraints System

### Horizontal Constraints
```typescript
// Left constraints
pin-l        → constraints: { horizontal: "MIN" }
left-0       → constraints: { horizontal: "MIN" }, x: 0

// Right constraints  
pin-r        → constraints: { horizontal: "MAX" }
right-0      → constraints: { horizontal: "MAX" }, x: parentWidth - nodeWidth

// Center constraints
pin-x        → constraints: { horizontal: "CENTER" }
center-x     → constraints: { horizontal: "CENTER" }

// Scale constraints
pin-h        → constraints: { horizontal: "SCALE" }
scale-x      → constraints: { horizontal: "SCALE" }

// Stretch constraints
stretch-h    → constraints: { horizontal: "STRETCH" }
stretch-x    → constraints: { horizontal: "STRETCH" }
```

### Vertical Constraints
```typescript
// Top constraints
pin-t        → constraints: { vertical: "MIN" }
top-0        → constraints: { vertical: "MIN" }, y: 0

// Bottom constraints
pin-b        → constraints: { vertical: "MAX" }
bottom-0     → constraints: { vertical: "MAX" }, y: parentHeight - nodeHeight

// Center constraints
pin-y        → constraints: { vertical: "CENTER" }
center-y     → constraints: { vertical: "CENTER" }

// Scale constraints
pin-v        → constraints: { vertical: "SCALE" }
scale-y      → constraints: { vertical: "SCALE" }

// Stretch constraints
stretch-v    → constraints: { vertical: "STRETCH" }
stretch-y    → constraints: { vertical: "STRETCH" }
```

### Combined Constraints
```typescript
// Corner pinning
pin-tl       → constraints: { horizontal: "MIN", vertical: "MIN" }
pin-tr       → constraints: { horizontal: "MAX", vertical: "MIN" }
pin-bl       → constraints: { horizontal: "MIN", vertical: "MAX" }
pin-br       → constraints: { horizontal: "MAX", vertical: "MAX" }

// Center positioning
pin-center   → constraints: { horizontal: "CENTER", vertical: "CENTER" }
center       → constraints: { horizontal: "CENTER", vertical: "CENTER" }

// Full stretch
pin-stretch  → constraints: { horizontal: "STRETCH", vertical: "STRETCH" }
stretch      → constraints: { horizontal: "STRETCH", vertical: "STRETCH" }
```

## Z-Index (Layer Order)

### Stack Order
```typescript
// Layer ordering (higher values = front)
z-[10]       → Applied via node reordering
z-auto       → Default layer order
z-0          → Move to back
z-10         → Standard elevation
z-20         → Higher elevation  
z-50         → Maximum elevation

// Named z-index levels
z-behind     → z-[-1] (behind siblings)
z-front      → z-[999] (in front of siblings)
```

## Overflow Handling

### Clip Content
```typescript
// Clipping behavior
overflow-visible  → clipsContent: false
overflow-hidden   → clipsContent: true
overflow-clip     → clipsContent: true
```

## Advanced Positioning

### Transform Origin
```typescript
// Transform origin for rotations/scaling
origin-center     → Rotation center at node center
origin-top        → Rotation center at top edge
origin-bottom     → Rotation center at bottom edge
origin-left       → Rotation center at left edge
origin-right      → Rotation center at right edge
origin-top-left   → Rotation center at top-left corner
```

### Rotation
```typescript
// Rotation transforms
rotate-[45deg]    → rotation: 45 * (π/180)
rotate-[0.5rad]   → rotation: 0.5

// Preset rotations
rotate-0          → rotation: 0
rotate-1          → rotation: 1 * (π/180)
rotate-2          → rotation: 2 * (π/180)
rotate-3          → rotation: 3 * (π/180)
rotate-6          → rotation: 6 * (π/180)
rotate-12         → rotation: 12 * (π/180)
rotate-45         → rotation: 45 * (π/180)
rotate-90         → rotation: 90 * (π/180)
rotate-180        → rotation: 180 * (π/180)
```

## Usage Examples

### Absolutely Positioned Element
```typescript
{
  "type": "FRAME",
  "name": "Overlay",
  "styles": "absolute top-[20] right-[20] pin-tr"
}
// Result:
// layoutPositioning: "ABSOLUTE"
// constraints: { horizontal: "MAX", vertical: "MIN" }
// x: parentWidth - nodeWidth - 20
// y: 20
```

### Centered Modal
```typescript
{
  "type": "FRAME", 
  "name": "Modal",
  "styles": "absolute center w-[400] h-[300]"
}
// Result:
// layoutPositioning: "ABSOLUTE"
// constraints: { horizontal: "CENTER", vertical: "CENTER" }
// width: 400
// height: 300
// x: (parentWidth - 400) / 2
// y: (parentHeight - 300) / 2
```

### Sticky Header
```typescript
{
  "type": "FRAME",
  "name": "Header", 
  "styles": "pin-t stretch-x h-[60]"
}
// Result:
// constraints: { horizontal: "STRETCH", vertical: "MIN" }
// height: 60
// y: 0
// width: parentWidth
```

### Rotated Element
```typescript
{
  "type": "FRAME",
  "name": "Badge",
  "styles": "absolute top-[10] right-[10] rotate-[15deg] origin-center"
}
// Result:
// layoutPositioning: "ABSOLUTE"
// rotation: 15 * (π/180)
// x: parentWidth - nodeWidth - 10
// y: 10
```

### Responsive Sidebar
```typescript
{
  "type": "FRAME",
  "name": "Sidebar",
  "styles": "pin-l stretch-v w-[240]"
}
// Result:
// constraints: { horizontal: "MIN", vertical: "STRETCH" }
// width: 240
// x: 0
// height: parentHeight
```

## Constraint Interactions

### Auto Layout + Constraints
```typescript
// In auto layout containers
absolute top-[20] → layoutPositioning: "ABSOLUTE", y: 20 (relative to container)
relative          → layoutPositioning: "AUTO" (follows auto layout flow)
```

### Constraint Priority
```typescript
// When multiple constraints conflict
pin-l right-[20]   → left constraint takes priority
pin-t pin-b        → stretches vertically between top and bottom
center-x pin-l     → left pin overrides center
```

### Responsive Constraints
```typescript
// Constraints adapt to parent size changes
pin-br w-[100] h-[50] → Always 100x50 at bottom-right
stretch pin-t h-[60]  → Full width, 60px high at top
center w-[200]        → 200px wide, always centered
```

## Notes and Constraints

### Layout Positioning Rules
1. **Auto Layout**: `layoutPositioning` only works in auto layout containers
2. **Absolute Elements**: Don't participate in auto layout flow
3. **Relative Elements**: Follow normal auto layout positioning
4. **Z-Index**: Implemented through layer reordering, not native z-index

### Constraint Rules
1. **Parent Dependency**: Constraints only work with proper parent-child relationships
2. **Conflicting Constraints**: Later declarations override earlier ones
3. **Scale Constraint**: Maintains proportional positioning during resize
4. **Stretch Constraint**: Automatically adjusts size with parent

### Rotation Rules
1. **Angle Units**: Degrees converted to radians for Figma
2. **Transform Origin**: Affects rotation pivot point
3. **Layout Impact**: Rotation doesn't affect layout calculations
4. **Stacking**: Rotated elements may overlap others

### Performance Considerations
1. **Constraint Calculation**: Complex constraints impact performance
2. **Absolute Positioning**: More performant than complex constraints
3. **Transform Updates**: Frequent rotations should use absolute positioning
4. **Layout Reflow**: Constraint changes trigger layout recalculation

### Figma Limitations
1. **Constraint Types**: Limited to MIN, MAX, CENTER, SCALE, STRETCH
2. **Transform Support**: Only rotation transform supported
3. **Overflow**: Clipping is binary (on/off), no advanced overflow modes
4. **Z-Index**: No true z-index, only layer order manipulation 
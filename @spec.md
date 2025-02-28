## Shadow Properties

### Drop Shadow
프리셋 그림자 값을 사용하여 요소에 그림자를 적용할 수 있습니다.

```css
shadow-sm    /* Small shadow */
```
```json
{
  "effects": [{
    "type": "DROP_SHADOW",
    "color": { "r": 0, "g": 0, "b": 0, "a": 0.05 },
    "offset": { "x": 0, "y": 1 },
    "radius": 2,
    "spread": 0,
    "visible": true,
    "blendMode": "NORMAL"
  }]
}
```

```css
shadow      /* Default shadow */
```
```json
{
  "effects": [{
    "type": "DROP_SHADOW",
    "color": { "r": 0, "g": 0, "b": 0, "a": 0.1 },
    "offset": { "x": 0, "y": 2 },
    "radius": 4,
    "spread": -1,
    "visible": true,
    "blendMode": "NORMAL"
  }]
}
```

```css
shadow-md    /* Medium shadow */
```
```json
{
  "effects": [{
    "type": "DROP_SHADOW",
    "color": { "r": 0, "g": 0, "b": 0, "a": 0.1 },
    "offset": { "x": 0, "y": 4 },
    "radius": 6,
    "spread": -2,
    "visible": true,
    "blendMode": "NORMAL"
  }]
}
```

```css
shadow-lg    /* Large shadow */
```
```json
{
  "effects": [{
    "type": "DROP_SHADOW",
    "color": { "r": 0, "g": 0, "b": 0, "a": 0.1 },
    "offset": { "x": 0, "y": 8 },
    "radius": 10,
    "spread": -3,
    "visible": true,
    "blendMode": "NORMAL"
  }]
}
```

```css
shadow-xl    /* Extra large shadow */
```
```json
{
  "effects": [{
    "type": "DROP_SHADOW",
    "color": { "r": 0, "g": 0, "b": 0, "a": 0.1 },
    "offset": { "x": 0, "y": 12 },
    "radius": 14,
    "spread": -4,
    "visible": true,
    "blendMode": "NORMAL"
  }]
}
```

```css
shadow-2xl   /* 2x large shadow */
```
```json
{
  "effects": [{
    "type": "DROP_SHADOW",
    "color": { "r": 0, "g": 0, "b": 0, "a": 0.1 },
    "offset": { "x": 0, "y": 16 },
    "radius": 20,
    "spread": -5,
    "visible": true,
    "blendMode": "NORMAL"
  }]
}
```

### Inner Shadow
내부 그림자를 적용할 수 있습니다.

```css
shadow-inner
```
```json
{
  "effects": [{
    "type": "INNER_SHADOW",
    "color": { "r": 0, "g": 0, "b": 0, "a": 0.06 },
    "offset": { "x": 0, "y": 2 },
    "radius": 4,
    "spread": 0,
    "visible": true,
    "blendMode": "NORMAL"
  }]
}
```

### Remove Shadow
그림자를 제거할 수 있습니다.

```css
shadow-none
```
```json
{
  "effects": []
}
```

### Colored Shadows
프리셋 색상과 투명도를 사용하여 컬러 그림자를 적용할 수 있습니다.

```css
shadow-blue-500/50    /* Blue shadow with 50% opacity */
```
```json
{
  "effects": [{
    "type": "DROP_SHADOW",
    "color": { "r": 0.24, "g": 0.47, "b": 0.95, "a": 0.5 },
    "offset": { "x": 0, "y": 2 },
    "radius": 4,
    "spread": -1,
    "visible": true,
    "blendMode": "NORMAL"
  }]
}
```

### Arbitrary Values
임의의 그림자 값을 사용할 수 있습니다.

```css
shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]   /* Custom shadow with specific values */
```
```json
{
  "effects": [{
    "type": "DROP_SHADOW",
    "color": { "r": 0, "g": 0, "b": 0, "a": 0.1 },
    "offset": { "x": 0, "y": 4 },
    "radius": 6,
    "spread": -1,
    "visible": true,
    "blendMode": "NORMAL"
  }]
}
```

```css
shadow-[0_2px_4px_#00000020]               /* Custom shadow with hex color */
```
```json
{
  "effects": [{
    "type": "DROP_SHADOW",
    "color": { "r": 0, "g": 0, "b": 0, "a": 0.125 },
    "offset": { "x": 0, "y": 2 },
    "radius": 4,
    "spread": 0,
    "visible": true,
    "blendMode": "NORMAL"
  }]
}
```

### Notes and Constraints

1. **Shadow Stacking**
   - 현재 구현에서는 여러 그림자를 중첩하는 것을 지원하지 않습니다.
   - 마지막으로 적용된 그림자만 적용됩니다.

2. **Color Support**
   - HEX 색상 (#RRGGBB, #RRGGBBAA)
   - RGB/RGBA 색상
   - 프리셋 색상 토큰 (예: blue-500, red-500)

3. **Performance Considerations**
   - 가능한 프리셋 그림자를 사용하는 것이 성능상 좋습니다.
   - 자주 업데이트되는 요소에는 복잡한 그림자 사용을 제한하세요.

4. **Compatibility**
   - 내부 그림자는 CSS와 정확히 동일하게 렌더링되지 않을 수 있습니다.
   - 일부 복잡한 그림자 효과는 Figma 호환성을 위해 단순화될 수 있습니다.

## Transform Properties

### Rotation
요소를 회전시킬 수 있습니다.

```css
rotate-0      /* No rotation */
rotate-45     /* 45 degrees rotation */
rotate-90     /* 90 degrees rotation */
rotate-180    /* 180 degrees rotation */
rotate-[30]   /* Custom rotation angle */
-rotate-45    /* Negative rotation */
```
```json
{
  "rotation": 45  // Rotation angle in degrees
}
```

### Arbitrary Rotation
임의의 회전 각도를 지정할 수 있습니다.

```css
rotate-[22.5]     /* 22.5 degrees rotation */
rotate-[-60]      /* -60 degrees rotation */
```

## Blend Mode Properties

### Layer Blend Mode
레이어의 블렌드 모드를 설정할 수 있습니다.

```css
mix-blend-normal      /* Normal blending */
mix-blend-multiply    /* Multiply blending */
mix-blend-screen     /* Screen blending */
mix-blend-overlay    /* Overlay blending */
mix-blend-darken    /* Darken blending */
mix-blend-lighten   /* Lighten blending */
```
```json
{
  "blendMode": "NORMAL" | "MULTIPLY" | "SCREEN" | "OVERLAY"
}
```

## Filter Properties

### Blur Effect
요소에 블러 효과를 적용할 수 있습니다.

```css
blur-none    /* No blur */
blur-sm      /* Small blur (4px) */
blur         /* Default blur (8px) */
blur-md      /* Medium blur (12px) */
blur-lg      /* Large blur (16px) */
blur-xl      /* Extra large blur (24px) */
blur-2xl     /* 2x large blur (40px) */
blur-3xl     /* 3x large blur (64px) */
```
```json
{
  "effects": [{
    "type": "LAYER_BLUR",
    "radius": 8,
    "visible": true
  }]
}
```

### Arbitrary Blur
임의의 블러 값을 지정할 수 있습니다.

```css
blur-[4px]    /* 4px blur */
blur-[10px]   /* 10px blur */
```

## Aspect Ratio Properties

### Preset Aspect Ratios
요소의 종횡비를 설정할 수 있습니다.

```css
aspect-auto      /* Browser default aspect ratio */
aspect-square    /* 1:1 aspect ratio */
aspect-video     /* 16:9 aspect ratio */
```
```json
{
  "constraints": {
    "horizontal": "SCALE",
    "vertical": "SCALE"
  },
  "aspectRatio": 1  // for square
}
```

### Arbitrary Aspect Ratios
임의의 종횡비를 지정할 수 있습니다.

```css
aspect-[4/3]     /* 4:3 aspect ratio */
aspect-[16/10]   /* 16:10 aspect ratio */
```

## Overflow Properties

### Overflow Behavior
요소의 오버플로우 동작을 설정할 수 있습니다.

```css
overflow-visible  /* Content visible outside container */
overflow-hidden   /* Content clipped at container bounds */
overflow-scroll   /* Scrollable overflow */
overflow-auto     /* Auto scrolling when needed */
```
```json
{
  "clipsContent": false,  // for overflow-visible
  "clipsContent": true,   // for overflow-hidden
  "scrollingEnabled": true  // for overflow-scroll and overflow-auto
}
```

### Notes and Constraints

1. **Transform Compatibility**
   - 회전은 그룹과 프레임에만 적용됩니다.
   - 회전 중심점은 항상 요소의 중앙입니다.

2. **Blend Mode Support**
   - 일부 블렌드 모드는 Figma에서 지원되지 않을 수 있습니다.
   - 성능을 위해 필요한 경우에만 사용하세요.

3. **Filter Effects**
   - 블러 효과는 성능에 영향을 줄 수 있습니다.
   - 중첩된 블러 효과는 권장되지 않습니다.

4. **Aspect Ratio**
   - 자동 크기 조정이 활성화된 경우에만 작동합니다.
   - 부모 컨테이너의 제약에 따라 실제 비율이 다를 수 있습니다.

5. **Overflow**
   - 스크롤 기능은 프로토타입 모드에서만 작동합니다.
   - 내보내기 시 스크롤 동작이 유지되지 않을 수 있습니다.

## Position Properties

### Position Type
요소의 위치 지정 방식을 설정할 수 있습니다.

```css
absolute    /* Absolute positioning */
relative    /* Relative positioning */
fixed       /* Fixed positioning */
```
```json
{
  "position": "ABSOLUTE" | "RELATIVE" | "FIXED",
  "constraints": {
    "horizontal": "SCALE",
    "vertical": "SCALE"
  }
}
```

### Position Values
요소의 위치를 지정할 수 있습니다.

```css
top-0       /* Top: 0px */
right-0     /* Right: 0px */
bottom-0    /* Bottom: 0px */
left-0      /* Left: 0px */
inset-0     /* All sides: 0px */
```
```json
{
  "x": 0,        // for left-0
  "y": 0,        // for top-0
  "constraints": {
    "horizontal": "MIN" | "MAX",  // for left/right
    "vertical": "MIN" | "MAX"     // for top/bottom
  }
}
```

### Arbitrary Values
임의의 위치 값을 지정할 수 있습니다.

```css
top-[20px]      /* Top: 20px */
right-[30%]     /* Right: 30% */
bottom-[40px]   /* Bottom: 40px */
left-[50%]      /* Left: 50% */
inset-[10px]    /* All sides: 10px */
```
```json
{
  "x": 20,        // for left-[20px]
  "y": 30,        // for top-[30px]
  "constraints": {
    "horizontal": "SCALE",  // for percentage values
    "vertical": "SCALE"     // for percentage values
  }
}
```

### Z-Index
요소의 쌓임 순서를 지정할 수 있습니다.

```css
z-0        /* z-index: 0 */
z-10       /* z-index: 10 */
z-20       /* z-index: 20 */
z-30       /* z-index: 30 */
z-40       /* z-index: 40 */
z-50       /* z-index: 50 */
z-[100]    /* Custom z-index */
```
```json
{
  "order": 10  // Figma layer order
}
```

### Notes and Constraints

1. **Position Type Compatibility**
   - Absolute positioning은 부모 프레임을 기준으로 동작합니다.
   - Fixed positioning은 최상위 프레임을 기준으로 동작합니다.
   - Relative positioning은 현재 위치를 기준으로 동작합니다.

2. **Percentage Values**
   - 퍼센트 값은 부모 컨테이너의 크기를 기준으로 계산됩니다.
   - 수평/수직 제약 조건이 'SCALE'로 설정됩니다.

3. **Z-Index Handling**
   - Figma는 실제 z-index를 지원하지 않습니다.
   - 대신 레이어 순서를 사용하여 쌓임 순서를 구현합니다.
   - 높은 z-index 값은 레이어 목록에서 위쪽에 배치됩니다.

4. **Constraints**
   - 위치 값이 지정되면 해당 방향의 제약 조건이 자동으로 설정됩니다.
   - 퍼센트 값은 SCALE 제약 조건을 사용합니다.
   - 픽셀 값은 MIN/MAX 제약 조건을 사용합니다.

5. **Performance**
   - 많은 수의 절대 위치 요소는 성능에 영향을 줄 수 있습니다.
   - 가능한 경우 자동 레이아웃(flex)을 사용하는 것이 좋습니다. 
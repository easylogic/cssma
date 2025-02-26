# 피그마 컴포넌트 제작 스펙

## 1. 컴포넌트 구조

### 1.1 기본 구조
```typescript
class ComponentManager {
  private static instance: ComponentManager;
  private componentSet: ComponentSetNode | null = null;
  private variantMap = new Map<string, ComponentNode>();

  private constructor() {}
  static getInstance() { ... }
}
```

### 1.2 핵심 메서드
- `createComponent`: 단일 컴포넌트 생성
- `createComponentSet`: 모든 변형을 포함한 컴포넌트 세트 생성
- `createInstance`: 컴포넌트 인스턴스 생성
- `updateInstance`: 인스턴스 속성 업데이트

## 2. 타입 시스템

### 2.1 기본 타입
```typescript
// 크기, 변형, 상태 등 기본 타입 정의
type ComponentSize = 'small' | 'medium' | 'large';
type ComponentVariant = 'filled' | 'outlined' | 'elevated';
type ComponentState = 'default' | 'hover' | 'pressed' | 'disabled';

// 변형 속성 인터페이스
interface BaseVariantProps {
  size?: ComponentSize;
  variant?: ComponentVariant;
  disabled?: boolean;
}

// 인스턴스 속성 인터페이스
interface ComponentProps extends Partial<BaseVariantProps> {
  // 컴포넌트별 고유 속성
}
```

### 2.2 스타일 타입
```typescript
interface ComponentStateStyle {
  default: string;
  hover: string;
  pressed: string;
  disabled: string;
}

interface ComponentStyle {
  background: ComponentStateStyle;
  border: ComponentStateStyle;
  text?: ComponentStateStyle;
  // 컴포넌트별 추가 스타일
}
```

## 3. 스타일 시스템

### 3.1 스타일 정의
```typescript
const COMPONENT_STYLES: Record<string, ComponentStyle> = {
  'filled': {
    background: {
      default: 'surface/color/default',
      hover: 'surface/color/hover',
      pressed: 'surface/color/pressed',
      disabled: 'surface/color/disabled'
    },
    border: {
      default: 'border/color/default',
      hover: 'border/color/hover',
      pressed: 'border/color/pressed',
      disabled: 'border/color/disabled'
    }
  },
  // outlined, elevated 등 다른 변형
}
```

### 3.2 크기 정의
```typescript
const COMPONENT_SIZES: Record<ComponentSize, {
  width?: number;
  height?: string;
  padding: string;
  spacing: string;
  borderRadius: string;
  fontSize?: {
    primary: string;
    secondary?: string;
  };
}> = {
  small: { ... },
  medium: { ... },
  large: { ... }
}
```

## 4. 레이아웃 패턴

### 4.1 기본 레이아웃 설정
```typescript
private setupBaseLayout(node: ComponentNode, size: typeof COMPONENT_SIZES[keyof typeof COMPONENT_SIZES]) {
  // 레이아웃 모드 설정
  node.layoutMode = "HORIZONTAL" | "VERTICAL";
  node.primaryAxisAlignItems = "CENTER";
  node.counterAxisAlignItems = "CENTER";
  
  // 크기 설정
  node.layoutSizingHorizontal = "FIXED" | "FILL";
  node.layoutSizingVertical = "FIXED" | "HUG";
  
  // 스타일 변수 설정
  variables.setBindVariable(node, 'borderRadius', size.borderRadius);
  variables.setBindVariable(node, 'padding', size.padding);
  variables.setBindVariable(node, 'spacing', size.spacing);
}
```

### 4.2 절대 위치 레이아웃
```typescript
// 오버레이나 배지 등을 위한 설정
node.layoutPositioning = "ABSOLUTE";
node.constraints = { horizontal: "STRETCH", vertical: "STRETCH" };
node.x = 0;
node.y = 0;
```

## 5. 스타일 적용 패턴

### 5.1 기본 스타일 적용
```typescript
private async applyStyle(node: ComponentNode, variant: ComponentVariantProps) {
  const variantStyle = COMPONENT_STYLES[variant.variant || 'filled'];
  const state = variant.disabled ? 'disabled' : 'default';

  // 배경색 설정
  node.fills = [variables.bindVariable(variantStyle.background[state])];
  
  // 테두리 설정
  if (variant.variant === 'outlined') {
    node.strokes = [variables.bindVariable(variantStyle.border[state])];
    variables.setBindVariable(node, 'strokeWeight', 'border/width/default');
  }
}
```

### 5.2 상태별 스타일
```typescript
// 호버, 프레스, 비활성화 상태에 대한 스타일 처리
const stateStyle = variantStyle[state];
node.fills = [variables.bindVariable(stateStyle)];
```

## 6. 컴포넌트 세트 구성

### 6.1 변형 정의
```typescript
const COMPONENT_VARIANTS: ComponentVariantProps[] = [
  // 크기별 변형
  { size: 'small', variant: 'filled' },
  { size: 'medium', variant: 'filled' },
  { size: 'large', variant: 'filled' },

  // 스타일 변형
  { size: 'medium', variant: 'filled' },
  { size: 'medium', variant: 'outlined' },
  { size: 'medium', variant: 'elevated' },

  // 상태 변형
  { size: 'medium', variant: 'filled', disabled: true }
]
```

### 6.2 컴포넌트 세트 레이아웃
```typescript
private setupComponentSetLayout(componentSet: ComponentSetNode) {
  componentSet.layoutMode = "HORIZONTAL";
  componentSet.layoutWrap = "WRAP";
  componentSet.itemSpacing = 40;
  componentSet.counterAxisSpacing = 40;
  componentSet.primaryAxisSizingMode = "AUTO";
  componentSet.counterAxisSizingMode = "AUTO";
}
```

## 7. 모범 사례

### 7.1 컴포넌트 역할 분리
- 각 컴포넌트는 단일 책임을 가짐
- 복잡한 컴포넌트는 하위 컴포넌트로 분리 (예: Card = Header + Media + Content + Footer)

### 7.2 일관된 네이밍
- 변수: camelCase
- 타입/인터페이스: PascalCase
- 상수: UPPER_SNAKE_CASE

### 7.3 토큰 기반 스타일링
- 직접적인 값 대신 디자인 토큰 사용
- semantic 토큰을 통한 추상화 계층 유지

### 7.4 문서화
- 각 컴포넌트에 대한 마크다운 문서 작성
- 속성, 변형, 사용 예시 포함

## 8. 토큰 시스템

### 8.1 토큰 계층 구조
```typescript
// 1. Primitive 토큰 (기본값)
const PRIMITIVE = {
  "gray/50/light": { Value: "#FAFAFA" },
  "gray/100/light": { Value: "#F5F5F5" },
  // ...
}

// 2. Color 토큰 (기본 토큰의 의미적 매핑)
const COLOR = {
  "color/background/default": {
    Light: "{color/white}",
    Dark: "{gray/900/dark}"
  },
  // ...
}

// 3. Semantic 토큰 (컴포넌트용 의미적 토큰)
const SEMANTIC = {
  "surface/color/default": { Value: "{color/background/default}" },
  "text/color/default": { Value: "{color/text/default}" },
  "border/color/default": { Value: "{color/border/default}" },
  // ...
}
```

### 8.2 토큰 타입
```typescript
// 1. 색상 토큰
"surface/color/default"    // 표면 색상
"text/color/default"      // 텍스트 색상
"border/color/default"    // 테두리 색상

// 2. 크기 토큰
"component/base/height/sm"    // 컴포넌트 높이
"component/base/padding/md"   // 패딩
"component/base/gap/lg"       // 간격

// 3. 타이포그래피 토큰
"text/body/sm"               // 글자 크기
"text/heading/md"            // 제목 크기

// 4. 반경 토큰
"component/base/radius/sm"   // 모서리 반경
```

### 8.3 토큰 적용 패턴
```typescript
// 1. 직접 바인딩
node.fills = [variables.bindVariable('surface/color/default')];

// 2. 변수로 바인딩
variables.setBindVariable(node, 'borderRadius', 'component/base/radius/sm');

// 3. 상태별 토큰
const stateTokens = {
  default: 'surface/color/default',
  hover: 'surface/color/hover',
  pressed: 'surface/color/pressed',
  disabled: 'surface/color/disabled'
};
```

### 8.4 토큰 네이밍 컨벤션
1. 계층 구조
   - `category/subcategory/variant`
   - 예: `surface/color/default`, `text/body/sm`

2. 크기 단계
   - xs, sm, md, lg, xl
   - 예: `component/base/padding/sm`

3. 상태 구분
   - default, hover, pressed, disabled
   - 예: `surface/color/hover`

### 8.5 모드 지원
```typescript
// 라이트/다크 모드 지원
const COLOR = {
  "color/background/default": {
    Light: "{color/white}",
    Dark: "{gray/900/dark}"
  }
}

// RTL 지원
const SPACING = {
  "padding/inline/start": { Value: "{spacing/4}" },
  "padding/inline/end": { Value: "{spacing/4}" }
}
``` 
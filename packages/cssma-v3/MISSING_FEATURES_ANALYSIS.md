# 🔍 CSSMA-v3 파서 누락 기능 분석 및 구현 로드맵

## 📊 현재 상태 (2025년 1월)
- **테스트 성공률**: 96.8% (209 passed / 6 failed)
- **구현된 파서**: 9개 카테고리
- **전체 모듈러 구조**: ✅ 완료

## 🚨 주요 누락된 Tailwind CSS 카테고리

### 1. 📐 **Sizing** (높은 우선순위)
**현재 상태**: 부분적으로 Layout 파서에 포함
**누락된 기능들**:
- `min-width`, `max-width` 유틸리티
- `min-height`, `max-height` 유틸리티  
- `size-*` 유틸리티 (Tailwind CSS v3.4+)
- Dynamic viewport units (`dvh`, `lvh`, `svh`)

```typescript
// 필요한 클래스 예시
'min-w-0', 'min-w-full', 'min-w-fit', 'min-w-min', 'min-w-max'
'max-w-xs', 'max-w-sm', 'max-w-md', 'max-w-lg', 'max-w-xl'
'min-h-0', 'min-h-full', 'min-h-screen', 'min-h-dvh'
'max-h-96', 'max-h-screen', 'max-h-dvh'
'size-4', 'size-8', 'size-16' // width + height 동시 설정
```

### 2. 🎨 **Backgrounds** (높은 우선순위)
**현재 상태**: 기본 background-color만 구현됨
**누락된 기능들**:
- Background image 속성들
- Gradient utilities
- Background positioning, sizing, repeat

```typescript
// 필요한 클래스 예시
'bg-gradient-to-r', 'bg-gradient-to-br'
'from-blue-500', 'via-purple-500', 'to-pink-500'
'bg-cover', 'bg-contain', 'bg-center', 'bg-repeat'
'bg-fixed', 'bg-local', 'bg-scroll'
```

### 3. 🔲 **Borders** (높은 우선순위)
**현재 상태**: 기본 border만 Effects에 포함
**누락된 기능들**:
- Border radius 세부 제어
- Border style utilities
- Outline utilities
- Ring utilities (Tailwind 특화)

```typescript
// 필요한 클래스 예시
'rounded-t-lg', 'rounded-br-xl', 'rounded-tl-none'
'border-solid', 'border-dashed', 'border-dotted'
'outline-2', 'outline-dashed', 'outline-offset-2'
'ring-2', 'ring-blue-500', 'ring-offset-4'
```

### 4. 🔧 **Flexbox & Grid** (중간 우선순위)
**현재 상태**: 기본 flex, grid만 Layout에 포함
**누락된 기능들**:
- Grid template 세부 제어
- Flex utilities 확장
- Gap utilities 확장
- Justify, align utilities

```typescript
// 필요한 클래스 예시
'grid-cols-12', 'grid-rows-6', 'col-span-2', 'row-span-3'
'flex-wrap', 'flex-nowrap', 'flex-grow', 'flex-shrink'
'justify-between', 'justify-around', 'items-center'
'content-center', 'self-end', 'place-items-center'
```

### 5. 🎛️ **Filters** (중간 우선순위)
**현재 상태**: 미구현
**누락된 기능들**:
- CSS Filter properties
- Backdrop filter properties

```typescript
// 필요한 클래스 예시
'blur-sm', 'brightness-50', 'contrast-125', 'grayscale'
'hue-rotate-90', 'invert', 'saturate-150', 'sepia'
'backdrop-blur-sm', 'backdrop-brightness-50'
```

### 6. 📊 **Tables** (낮은 우선순위)
**현재 상태**: 미구현
**누락된 기능들**:
- Table layout utilities
- Border collapse utilities

```typescript
// 필요한 클래스 예시
'table-auto', 'table-fixed'
'border-collapse', 'border-separate'
'caption-top', 'caption-bottom'
```

### 7. ⚡ **Transitions** (중간 우선순위)
**현재 상태**: Animation 파서에 부분적으로 포함
**누락된 기능들**:
- Transition property 세부 제어
- Transition timing functions
- Transition delays

```typescript
// 필요한 클래스 예시
'transition-colors', 'transition-transform', 'transition-all'
'duration-75', 'duration-300', 'duration-700'
'ease-in', 'ease-out', 'ease-in-out'
'delay-75', 'delay-150', 'delay-300'
```

### 8. 🖱️ **Interactivity** (중간 우선순위)
**현재 상태**: 미구현
**누락된 기능들**:
- Cursor utilities
- User interaction utilities
- Scroll behavior utilities

```typescript
// 필요한 클래스 예시
'cursor-pointer', 'cursor-not-allowed', 'cursor-grab'
'select-none', 'select-text', 'select-all'
'pointer-events-none', 'pointer-events-auto'
'scroll-smooth', 'scroll-auto'
```

### 9. 🎨 **SVG** (낮은 우선순위)
**현재 상태**: 미구현
**누락된 기능들**:
- SVG fill and stroke utilities

```typescript
// 필요한 클래스 예시
'fill-current', 'fill-red-500'
'stroke-current', 'stroke-2'
```

## 🚀 구현 우선순위 및 로드맵

### Phase 1: 핵심 누락 기능 (즉시 구현 권장)
1. **Sizing Parser** - 가장 자주 사용되는 기능들
2. **Backgrounds Parser** - 그라디언트 및 배경 이미지
3. **Borders Parser** - border-radius, outline, ring 유틸리티

### Phase 2: 레이아웃 향상 (중기)
4. **Flexbox & Grid Parser** - 고급 레이아웃 기능
5. **Transitions Parser** - 애니메이션 확장
6. **Filters Parser** - 모던 CSS 효과

### Phase 3: 사용자 경험 (장기)
7. **Interactivity Parser** - 상호작용 관련
8. **Tables Parser** - 테이블 레이아웃
9. **SVG Parser** - SVG 스타일링

## 💡 구현 시 고려사항

### 1. 기존 파서 확장 vs 새로운 파서
- **기존 확장**: Layout, Effects, Animation 파서 확장
- **새로운 파서**: Sizing, Backgrounds, Borders, Filters, Interactivity

### 2. 타입 시스템 확장
- `ParsedStyles` 인터페이스에 새로운 카테고리 추가
- 각 파서별 전용 인터페이스 정의

### 3. 테스트 커버리지
- 각 새로운 기능에 대한 포괄적인 테스트
- 기존 96.8% 성공률 유지

### 4. 성능 고려사항
- 파서 간 의존성 최소화
- 조건부 파싱으로 성능 최적화

## 📈 예상 효과

### 완전 구현 후 예상 커버리지
- **Tailwind CSS 호환성**: 95%+ 
- **사용 가능한 유틸리티**: 1000+ 클래스
- **개발자 경험**: Figma 플러그인에서 거의 모든 Tailwind 기능 사용 가능

### 개발 우선순위 제안
1. 🔥 **즉시**: Sizing Parser (size-*, min-*, max-*)
2. 🔥 **즉시**: Backgrounds Parser (gradient, bg-image)  
3. 🔥 **즉시**: Borders Parser (rounded-*, outline-*, ring-*)
4. ⚡ **1주내**: Flexbox & Grid Parser 확장
5. ⚡ **2주내**: Filters Parser
6. 📅 **장기**: Interactivity, Tables, SVG Parsers

이러한 구현을 통해 CSSMA-v3는 Tailwind CSS의 거의 모든 기능을 지원하는 완전한 파서 시스템이 될 것입니다. 
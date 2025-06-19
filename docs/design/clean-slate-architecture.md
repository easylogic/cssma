# CSSMA v2.0: Clean Slate Architecture 🚀

## 🎯 Philosophy: Radical Simplification

기존 코드의 복잡성을 완전히 제거하고, preset 중심의 단순하고 강력한 아키텍처로 재설계합니다.

## 🔥 Why Clean Slate?

### 현재 문제점들
```typescript
❌ 16개 개별 파서 파일들
❌ 11개 개별 변환기 파일들  
❌ 3개 분산된 시스템
❌ 하드코딩된 값들이 곳곳에 분산
❌ 복잡한 호환성 레이어
❌ 예측 불가능한 동작
❌ 디버깅 어려움
❌ 확장성 부족
```

### 새로운 비전
```typescript
✅ 1개 통합 엔진
✅ Preset 중심 설계
✅ 예측 가능한 API
✅ 완벽한 타입 안전성
✅ 확장 가능한 아키텍처
✅ 디버깅 친화적
✅ 성능 최적화
✅ 테스트 용이성
```

## 🏗️ Core Architecture

### 1. 핵심 엔진 (Single Source of Truth)
```typescript
export class CSSMAEngine {
  private preset: CSSMAPreset;
  private cache: Map<string, any> = new Map();
  
  constructor(config: CSSMAConfig = {}) {
    this.preset = loadPreset(config);
  }
  
  // 🎯 3개 핵심 메서드만 존재
  parse(input: string): ParsedStyles
  toFigma(styles: ParsedStyles): FigmaProperties
  toCss(figma: FigmaProperties): string
}
```

### 2. 통합 데이터 구조
```typescript
// 모든 스타일 정보를 담는 단일 구조
export interface ParsedStyles {
  spacing: SpacingStyles;
  colors: ColorStyles;
  typography: TypographyStyles;
  layout: LayoutStyles;
  effects: EffectStyles;
  // 카테고리별로 명확하게 분리
}

// 각 카테고리는 preset 기반
export interface SpacingStyles {
  padding: SpacingValue;
  margin: SpacingValue;
  gap: SpacingValue;
}

export interface SpacingValue {
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  // preset에서 온 값들
}
```

### 3. Preset 중심 파싱
```typescript
export class StyleParser {
  constructor(private preset: CSSMAPreset) {}
  
  parseSpacing(className: string): SpacingStyles | null {
    // preset.spacing을 기반으로 파싱
    // 하드코딩된 값 완전 제거
  }
  
  parseColor(className: string): ColorStyles | null {
    // preset.colors를 기반으로 파싱
  }
  
  // 각 파서가 preset을 직접 사용
}
```

## 🎨 API Design: 극도로 단순화

### Before (복잡한 현재)
```typescript
// 3개 다른 시스템, 다른 API
import { parseClassName } from 'cssma/parser';
import { processCssStyles } from 'cssma/style';  
import { figmaToCss } from 'cssma/figma-to-css';

// 각각 다른 방식으로 사용
const parsed = parseClassName('p-4');
const figmaStyles = processCssStyles('p-4 bg-red-500');
const cssClasses = figmaToCss(figmaNode);
```

### After (단순한 새로운)
```typescript
// 1개 엔진, 1개 API
import { cssma } from 'cssma';

// 모든 것이 일관된 방식
const styles = cssma.parse('p-4 bg-red-500 text-white');
const figmaProps = cssma.toFigma(styles);
const cssClasses = cssma.toCss(figmaProps);

// 체이닝도 가능
const result = cssma
  .parse('p-4 bg-red-500')
  .toFigma()
  .toCss();
```

## 🔧 Implementation Strategy

### Phase 1: 새로운 엔진 구현 (3-4 days)
```typescript
// packages/cssma-v2/src/engine.ts
export class CSSMAEngine {
  // 완전히 새로운 구현
  // 기존 코드 의존성 0%
}

// packages/cssma-v2/src/parser.ts  
export class UnifiedParser {
  // preset 기반 통합 파서
  // 카테고리별 명확한 분리
}

// packages/cssma-v2/src/converter.ts
export class UnifiedConverter {
  // 양방향 변환 (CSS ↔ Figma)
  // preset 기반 일관성
}
```

### Phase 2: 새로운 패키지 구조 (1-2 days)
```bash
packages/
├── cssma-v2/                 # 새로운 엔진
│   ├── src/
│   │   ├── engine.ts         # 핵심 엔진
│   │   ├── parser.ts         # 통합 파서
│   │   ├── converter.ts      # 양방향 변환기
│   │   ├── presets/          # 내장 preset들
│   │   └── types.ts          # 새로운 타입 시스템
│   └── tests/                # 새로운 테스트
├── cssma-react-v2/           # 새로운 React 통합
└── cssma-plugin-v2/          # 새로운 Figma 플러그인
```

### Phase 3: 점진적 전환 (1-2 days)
```typescript
// 기존 패키지는 그대로 두고
// 새로운 패키지를 별도로 개발
// 사용자가 선택적으로 마이그레이션
```

## 🎯 새로운 API 예시

### 1. 기본 사용법
```typescript
import { createCSSMA } from 'cssma-v2';

// 기본 설정 (Tailwind v3 호환)
const cssma = createCSSMA();

// 파싱
const styles = cssma.parse('p-4 bg-red-500 text-white rounded-lg');
console.log(styles);
// {
//   spacing: { padding: { top: 16, right: 16, bottom: 16, left: 16 } },
//   colors: { background: { r: 0.937, g: 0.267, b: 0.267 } },
//   typography: { color: { r: 1, g: 1, b: 1 } },
//   effects: { borderRadius: 8 }
// }

// Figma 변환
const figmaProps = cssma.toFigma(styles);

// CSS 역변환
const cssClasses = cssma.toCss(figmaProps);
```

### 2. Preset 설정
```typescript
// Figma 최적화 preset
const figmaCSSMA = createCSSMA({
  preset: '@cssma/preset-figma-optimized'
});

// 커스텀 preset
const customCSSMA = createCSSMA({
  preset: '@cssma/preset-minimal',
  extend: {
    colors: {
      'brand': { r: 0.2, g: 0.4, b: 1.0 }
    },
    spacing: {
      'custom': 42
    }
  }
});
```

### 3. React 통합 (완전히 새로운)
```typescript
import { useCSSMA } from 'cssma-react-v2';

function Component() {
  const cssma = useCSSMA({
    preset: '@cssma/preset-figma-optimized'
  });
  
  // 직관적인 API
  const styles = cssma.parse('p-4 bg-brand text-white');
  const figmaProps = cssma.toFigma(styles);
  
  return <div style={figmaProps}>Hello World</div>;
}
```

### 4. Figma 플러그인 (완전히 새로운)
```typescript
// 플러그인에서
import { createCSSMA } from 'cssma-plugin-v2';

const cssma = createCSSMA();

// Figma 노드 → CSS
const cssClasses = cssma.fromFigmaNode(figma.currentPage.selection[0]);

// CSS → Figma 노드 적용
cssma.applyToFigmaNode(node, 'p-4 bg-red-500');
```

## 🚀 Benefits of Clean Slate

### 1. 극도로 단순한 API
- 3개 핵심 메서드만 기억하면 됨
- 일관된 데이터 구조
- 예측 가능한 동작

### 2. 완벽한 타입 안전성
```typescript
// 모든 것이 타입 안전
const styles: ParsedStyles = cssma.parse('p-4');
const figma: FigmaProperties = cssma.toFigma(styles);
const css: string = cssma.toCss(figma);

// 컴파일 타임에 모든 에러 잡힘
```

### 3. 성능 최적화
```typescript
// 내장 캐싱
// 지연 로딩
// 메모리 효율성
// 번들 크기 최소화
```

### 4. 확장성
```typescript
// 새로운 CSS 속성 추가가 쉬움
// 새로운 preset 만들기 쉬움
// 플러그인 시스템
```

### 5. 디버깅 친화적
```typescript
// 명확한 에러 메시지
// 상세한 로깅
// 개발자 도구 통합
```

## 📊 Migration Strategy

### 1. 병렬 개발
```bash
# 기존 패키지는 그대로 유지
packages/cssma/          # v1 (기존)
packages/cssma-react/    # v1 (기존)

# 새로운 패키지 추가
packages/cssma-v2/       # v2 (새로운)
packages/cssma-react-v2/ # v2 (새로운)
```

### 2. 점진적 전환
```typescript
// 사용자가 선택적으로 마이그레이션
// v1과 v2 동시 사용 가능
import { cssma as v1 } from 'cssma';           // 기존
import { createCSSMA } from 'cssma-v2';        // 새로운

// 프로젝트별로 점진적 전환
```

### 3. 마이그레이션 도구
```typescript
// 자동 마이그레이션 도구 제공
npx cssma-migrate

// v1 → v2 코드 자동 변환
// 설정 파일 자동 생성
// 호환성 검사
```

## 🎯 Timeline

### Week 1: 핵심 엔진
- Day 1-2: CSSMAEngine 기본 구조
- Day 3-4: UnifiedParser 구현
- Day 5: UnifiedConverter 구현

### Week 2: 통합 및 테스트
- Day 1-2: React 통합 (cssma-react-v2)
- Day 3-4: Figma 플러그인 통합
- Day 5: 종합 테스트 및 성능 최적화

### Week 3: 문서화 및 배포
- Day 1-2: API 문서 작성
- Day 3-4: 마이그레이션 가이드
- Day 5: 알파 릴리즈

## 🔥 Decision Point

### Option A: 기존 코드 점진적 개선
- 장점: 안전함, 호환성 유지
- 단점: 복잡성 증가, 기술 부채 누적

### Option B: Clean Slate 재설계 ⭐
- 장점: 단순함, 확장성, 성능, 미래 지향적
- 단점: 초기 투자 필요, 마이그레이션 필요

**추천**: Option B (Clean Slate)
- 장기적으로 훨씬 유리
- 기술 부채 완전 제거
- 혁신적인 개발자 경험
- 경쟁 우위 확보

## 🚀 Next Steps

1. **즉시 시작 가능**: `packages/cssma-v2/` 새로 생성
2. **기존 코드 의존성 0%**: 완전히 독립적 개발
3. **빠른 프로토타입**: 3-4일 내 MVP 완성
4. **사용자 피드백**: 알파 버전으로 검증

**결론**: 이제 진짜 혁신적인 CSSMA를 만들 때입니다! 🚀 
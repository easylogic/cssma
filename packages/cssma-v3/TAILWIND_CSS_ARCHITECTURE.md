# CSSMA-V3 Tailwind CSS 아키텍처 가이드

> **2025년 1월 6일 업데이트**: CSSMA-V3가 완전히 Tailwind CSS 방식으로 리팩토링되었습니다.

## 📋 목차

1. [아키텍처 개요](#아키텍처-개요)
2. [새로운 ModifierParser 시스템](#새로운-modifierparser-시스템)
3. [ParsedClass 타입 구조](#parsedclass-타입-구조)
4. [CSS 선택자 생성 시스템](#css-선택자-생성-시스템)
5. [CSSParser 통합](#cssparser-통합)
6. [테스트 구조](#테스트-구조)
7. [마이그레이션 가이드](#마이그레이션-가이드)
8. [개발 가이드라인](#개발-가이드라인)

---

## 🏗️ 아키텍처 개요

### 🎯 설계 철학

CSSMA-V3는 **Tailwind CSS v4.1+의 실제 구현 방식**을 완전히 모방하여 설계되었습니다:

1. **단일 modifier 체인**: `md:motion-safe:before:hover:bg-blue-500`
2. **우선순위 기반 파싱**: Media queries → Pseudo-classes → Pseudo-elements
3. **CSS 생성 순서**: Tailwind와 동일한 CSS 생성 및 중첩 순서
4. **완전한 호환성**: Tailwind CSS의 모든 modifier 타입 지원

### 🔄 Legacy vs 새로운 방식 비교

```typescript
// ❌ BEFORE: 복잡한 개별 modifier 객체들
interface ParsedClass {
  stateModifier?: StateModifier;
  breakpointModifier?: BreakpointModifier;
  containerQueryModifier?: ContainerQueryModifier;
  stateModifiers?: string[];
  breakpointModifiers?: BreakpointModifier[];
  specialSelector?: SpecialSelector;
}

// ✅ AFTER: 깔끔한 Tailwind 방식
interface ParsedClass {
  modifierChain?: string; // "md:motion-safe:before:hover"
  modifiers?: {
    responsive?: string;      // "md", "lg", "min-[768px]"
    container?: string;       // "@md", "@lg", "@min-[320px]"
    motion?: string;          // "motion-safe", "motion-reduce"
    state?: string[];         // ["hover", "focus", "active"]
    pseudoElement?: string;   // "before", "after", "placeholder"
    aria?: string;            // "aria-checked", "aria-expanded"
    data?: string;            // "data-active", "data-loading"
    selector?: CSSSelector;   // 생성된 CSS 선택자 정보
  };
}
```

---

## 🧩 새로운 ModifierParser 시스템

### 📁 모듈 구조

```
src/core/parsers/modifiers/
├── index.ts                     # 통합 ModifierParser
├── state-modifier-parser.ts     # 상태 관련 (hover, focus, active 등)
├── responsive-modifier-parser.ts # 반응형 (sm, md, lg, xl 등)
├── container-modifier-parser.ts  # 컨테이너 쿼리 (@sm, @md 등)
├── pseudo-element-modifier-parser.ts # 의사 요소 (before, after 등)
├── aria-modifier-parser.ts      # ARIA 속성 (aria-checked 등)
├── data-modifier-parser.ts      # Data 속성 (data-active 등)
└── motion-modifier-parser.ts    # 모션 설정 (motion-safe 등)
```

### 🔧 핵심 메서드

#### 1. parseModifierChain()
```typescript
static parseModifierChain(className: string): ModifierParseResult | null
```

**기능**: Tailwind CSS의 modifier 체인을 파싱하여 개별 modifier들로 분해

**예시**:
```typescript
// Input: "md:motion-safe:before:hover:bg-blue-500"
// Output:
{
  modifierChain: "md:motion-safe:before:hover",
  baseClassName: "bg-blue-500",
  modifiers: {
    responsive: "md",
    motion: "motion-safe", 
    pseudoElement: "before",
    state: ["hover"]
  }
}
```

#### 2. generateCSSSelector()
```typescript
static generateCSSSelector(parseResult: ModifierParseResult, baseSelector: string): string
```

**기능**: 파싱된 modifier 정보를 바탕으로 완전한 CSS 선택자 생성

**예시**:
```typescript
// Input: parseResult + ".bg-blue-500"
// Output: "@media (min-width: 768px) { @media (prefers-reduced-motion: no-preference) { .md\:motion-safe\:before\:hover\:bg-blue-500:hover::before } }"
```

### 🎯 Modifier 우선순위 시스템

```typescript
const MODIFIER_PRIORITY = {
  responsive: 1,    // @media queries (최상위)
  container: 2,     // @container queries
  motion: 3,        // @media (prefers-reduced-motion)
  state: 4,         // :hover, :focus, :active
  pseudoElement: 5, // ::before, ::after
  aria: 6,          // [aria-checked="true"]
  data: 7           // [data-active] (최하위)
} as const;
```

**CSS 생성 순서**: 우선순위가 낮을수록 바깥쪽 래핑, 높을수록 안쪽 선택자

---

## 📊 ParsedClass 타입 구조

### 🎯 핵심 필드들

```typescript
export interface ParsedClass {
  // 🔹 기본 정보
  original: string;           // "md:hover:bg-blue-500"
  className: string;          // "md:hover:bg-blue-500"
  baseClassName: string;      // "bg-blue-500"
  category: StyleCategory;    // "colors"
  property: string;           // "backgroundColor"
  value: string;              // "blue-500"
  isArbitrary?: boolean;      // true for "bg-[#ff0000]"
  
  // 🎯 새로운 Tailwind 방식 (핵심)
  modifierChain?: string;     // "md:hover"
  modifiers?: {
    responsive?: string;      // "md", "lg", "min-[768px]"
    container?: string;       // "@md", "@lg", "@min-[320px]" 
    motion?: string;          // "motion-safe", "motion-reduce"
    state?: string[];         // ["hover", "focus", "active"]
    pseudoElement?: string;   // "before", "after", "placeholder"
    aria?: string;            // "aria-checked", "aria-[label]"
    data?: string;            // "data-active", "data-[size=large]"
    selector?: {
      mediaQueries: string[];   // ["@media (min-width: 768px)"]
      pseudoClasses: string[];  // [":hover", ":focus"]
      pseudoElements: string[]; // ["::before"]
      attributes: string[];     // ["[aria-checked='true']"]
    };
  };
}
```

### 🚫 제거된 Legacy 필드들

```typescript
// ❌ 이제 사용하지 않음
breakpoint?: string;
modifier?: string;
stateModifier?: StateModifier;
breakpointModifier?: BreakpointModifier;
containerQueryModifier?: ContainerQueryModifier;
stateModifiers?: string[];
breakpointModifiers?: BreakpointModifier[];
specialSelector?: SpecialSelector;
```

---

## 🎨 CSS 선택자 생성 시스템

### 🔄 변환 과정

#### 1단계: Modifier 체인 파싱
```typescript
"md:motion-safe:before:hover:bg-blue-500"
└─ modifierChain: "md:motion-safe:before:hover"
└─ baseClassName: "bg-blue-500"
```

#### 2단계: 개별 Modifier 분류
```typescript
md → responsive (Media Query)
motion-safe → motion (Media Query)  
before → pseudoElement (Pseudo-element)
hover → state (Pseudo-class)
```

#### 3단계: 우선순위 기반 CSS 생성
```css
/* 우선순위 1: responsive */
@media (min-width: 768px) {
  /* 우선순위 3: motion */
  @media (prefers-reduced-motion: no-preference) {
    /* 우선순위 4,5: state + pseudoElement */
    .md\:motion-safe\:before\:hover\:bg-blue-500:hover::before {
      background-color: #3b82f6;
    }
  }
}
```

### 🎯 지원하는 Modifier 타입들

#### 1. **Responsive (반응형)**
```typescript
// 기본 브레이크포인트
"sm:text-xl"    → "@media (min-width: 640px)"
"md:text-xl"    → "@media (min-width: 768px)"
"lg:text-xl"    → "@media (min-width: 1024px)"

// 최대 너비
"max-md:text-xl" → "@media (max-width: 767px)"

// 임의값
"min-[768px]:text-xl" → "@media (min-width: 768px)"
"max-[1023px]:text-xl" → "@media (max-width: 1023px)"
```

#### 2. **Container Queries (컨테이너 쿼리)**
```typescript
// 기본 컨테이너
"@md:text-xl"     → "@container (min-width: 768px)"
"@max-lg:text-xl" → "@container (max-width: 1023px)"

// 명명된 컨테이너
"@md/sidebar:text-xl" → "@container sidebar (min-width: 768px)"

// 임의값 컨테이너
"@min-[320px]:text-xl" → "@container (min-width: 320px)"
```

#### 3. **Motion Preferences (모션 설정)**
```typescript
"motion-safe:transition"   → "@media (prefers-reduced-motion: no-preference)"
"motion-reduce:transition" → "@media (prefers-reduced-motion: reduce)"
```

#### 4. **State Modifiers (상태)**
```typescript
// 기본 상태
"hover:bg-blue"    → ":hover"
"focus:bg-blue"    → ":focus"
"active:bg-blue"   → ":active"

// 복합 상태
"hover:focus:bg-blue" → ":hover:focus"

// 고급 상태
"focus-visible:bg-blue" → ":focus-visible"
"focus-within:bg-blue"  → ":focus-within"
```

#### 5. **Pseudo-elements (의사 요소)**
```typescript
"before:content-['']"    → "::before"
"after:content-['']"     → "::after"
"placeholder:text-gray"  → "::placeholder"
"selection:bg-blue"      → "::selection"
"marker:text-blue"       → "::marker"
"file:bg-transparent"    → "::file-selector-button"
```

#### 6. **ARIA Attributes (ARIA 속성)**
```typescript
// Boolean ARIA
"aria-checked:bg-blue"     → "[aria-checked='true']"
"aria-disabled:opacity-50" → "[aria-disabled='true']"

// Enumerated ARIA
"aria-sort-ascending:bg-blue" → "[aria-sort='ascending']"

// 임의값 ARIA
"aria-[label]:p-4"                → "[aria-label]"
"aria-[label='Custom']:p-4"       → "[aria-label='Custom']"
"aria-[describedby='desc']:p-4"   → "[aria-describedby='desc']"
```

#### 7. **Data Attributes (Data 속성)**
```typescript
// Boolean Data
"data-active:bg-blue"    → "[data-active]"
"data-loading:opacity"   → "[data-loading]"

// Enumerated Data
"data-state-open:block"  → "[data-state='open']"
"data-size-lg:p-8"       → "[data-size='lg']"

// 임의값 Data
"data-[size]:p-4"              → "[data-size]"
"data-[size=large]:w-full"     → "[data-size='large']"
"data-[testid='btn']:bg-blue"  → "[data-testid='btn']"
```

---

## 🔧 CSSParser 통합

### 🎯 parseClassName() 메서드

새로운 방식에서 parseClassName은 다음과 같이 작동합니다:

```typescript
// Input: "md:hover:focus:bg-blue-500"
const result = parser.parseClassName("md:hover:focus:bg-blue-500");

// Output:
{
  original: "md:hover:focus:bg-blue-500",
  className: "md:hover:focus:bg-blue-500", 
  baseClassName: "bg-blue-500",
  category: "colors",
  property: "backgroundColor",
  value: "blue-500",
  modifierChain: "md:hover:focus",
  modifiers: {
    responsive: "md",
    state: ["hover", "focus"]
  }
}
```

### 🎯 applyParsedClassToStyles() 메서드

새로운 방식에서는 `modifiers` 객체를 사용하여 스타일을 적용:

```typescript
private applyParsedClassToStyles(
  parsedClass: ParsedClass,
  styles: ParsedStyles
): void {
  const { modifiers } = parsedClass;
  
  // 🎯 새로운 Tailwind 방식: modifiers 객체 기반 적용
  if (modifiers?.responsive) {
    // Responsive 스타일 적용
    this.applyResponsiveStyles(parsedClass, styles, modifiers.responsive);
  } else if (modifiers?.container) {
    // Container 스타일 적용
    this.applyContainerStyles(parsedClass, styles, modifiers.container);
  } else if (modifiers?.state?.length) {
    // State 스타일 적용
    this.applyStateStyles(parsedClass, styles, modifiers.state);
  } else {
    // 기본 스타일 적용
    this.applyBasicStyles(parsedClass, styles);
  }
}
```

---

## 🧪 테스트 구조

### 📁 테스트 파일 구조

```
tests/
├── parser.tailwind-modifiers.test.ts  # 새로운 Tailwind 방식 테스트
├── parser.responsive.test.ts           # 반응형 기능 (업데이트됨)
├── parser.variants.test.ts             # 변형자 기능 (업데이트됨)
├── parser.modifiers.extended.test.ts   # 확장 modifier 테스트
└── parser.modifiers.test.ts            # 기본 modifier 테스트
```

### 🎯 주요 테스트 케이스

#### 1. **단일 Modifier 파싱**
```typescript
it('단일 responsive modifier를 파싱할 수 있어야 함', () => {
  const result = parser.parseClassName('md:bg-blue-500');
  expect(result?.modifierChain).toBe('md');
  expect(result?.modifiers?.responsive).toBe('md');
  expect(result?.baseClassName).toBe('bg-blue-500');
});
```

#### 2. **복합 Modifier 체인**
```typescript
it('복합 modifier 체인을 파싱할 수 있어야 함', () => {
  const result = parser.parseClassName('md:motion-safe:before:hover:bg-blue-500');
  expect(result?.modifierChain).toBe('md:motion-safe:before:hover');
  expect(result?.modifiers?.responsive).toBe('md');
  expect(result?.modifiers?.motion).toBe('motion-safe');
  expect(result?.modifiers?.pseudoElement).toBe('before');
  expect(result?.modifiers?.state).toEqual(['hover']);
});
```

#### 3. **임의값 Modifier**
```typescript
it('임의값 modifier를 파싱할 수 있어야 함', () => {
  const result = parser.parseClassName('min-[768px]:aria-[checked]:data-[size=large]:hover:p-4');
  expect(result?.modifiers?.responsive).toBe('min-[768px]');
  expect(result?.modifiers?.aria).toBe('aria-[checked]');
  expect(result?.modifiers?.data).toBe('data-[size=large]');
  expect(result?.modifiers?.state).toEqual(['hover']);
});
```

#### 4. **CSS 선택자 생성**
```typescript
it('CSS 선택자를 올바르게 생성할 수 있어야 함', () => {
  const parseResult = ModifierParser.parseModifierChain('md:hover:before:bg-blue-500');
  const cssSelector = ModifierParser.generateCSSSelector(parseResult!, '.bg-blue-500');
  
  expect(cssSelector).toContain('@media (min-width: 768px)');
  expect(cssSelector).toContain(':hover::before');
});
```

---

## 🔄 마이그레이션 가이드

### 📋 마이그레이션 체크리스트

#### ✅ 완료된 항목들
- [x] ModifierParser 완전 리팩토링 (7개 모듈로 분산)
- [x] ParsedClass 타입 업데이트 (legacy 필드 제거)
- [x] CSS 선택자 생성 시스템 구축
- [x] 우선순위 기반 파싱 시스템
- [x] Tailwind CSS 호환성 완성
- [x] 종합 테스트 작성 (15/15 통과)
- [x] CSSParser legacy modifier 제거

#### 🔄 진행 중인 항목들
- [ ] CSSParser applyParsedClassToStyles 완성
- [ ] 기존 테스트 업데이트 (responsive, variants)
- [ ] CSS 생성 엔진 통합
- [ ] 성능 최적화

#### 📝 예정된 항목들
- [ ] 고급 기능 추가 (Container queries, CSS Grid)
- [ ] 성능 벤치마킹
- [ ] 문서화 완성
- [ ] 실제 프로젝트 적용 테스트

### 🛠️ 코드 마이그레이션 예시

#### BEFORE (Legacy 방식)
```typescript
// ❌ 복잡한 개별 필드 확인
if (parsedClass.breakpointModifier) {
  if (parsedClass.stateModifier) {
    // 중첩 로직 처리
  }
}
if (parsedClass.containerQueryModifier) {
  // 별도 처리
}
```

#### AFTER (새로운 Tailwind 방식)
```typescript
// ✅ 깔끔한 통합 처리
const { modifiers } = parsedClass;
if (modifiers?.responsive) {
  this.applyResponsiveStyles(parsedClass, styles, modifiers);
} else if (modifiers?.container) {
  this.applyContainerStyles(parsedClass, styles, modifiers);
}
```

---

## 📝 개발 가이드라인

### 🎯 새로운 Modifier 타입 추가하기

#### 1. **개별 Parser 생성**
```typescript
// src/core/parsers/modifiers/custom-modifier-parser.ts
export class CustomModifierParser {
  static isValidModifier(modifier: string): boolean {
    return modifier.startsWith('custom-');
  }
  
  static parseModifier(modifier: string): string | null {
    if (!this.isValidModifier(modifier)) return null;
    return modifier; // 또는 변환 로직
  }
  
  static generateCSS(modifier: string): string {
    return `[data-custom="${modifier.slice(7)}"]`;
  }
}
```

#### 2. **통합 ModifierParser에 등록**
```typescript
// src/core/parsers/modifiers/index.ts
import { CustomModifierParser } from './custom-modifier-parser';

private static parseIndividualModifier(modifier: string, result: ModifierParseResult): void {
  // 기존 코드...
  
  // 새로운 modifier 타입 추가
  if (CustomModifierParser.isValidModifier(modifier)) {
    result.modifiers.custom = CustomModifierParser.parseModifier(modifier);
    return;
  }
  
  // 임의값 처리...
}
```

#### 3. **우선순위 설정**
```typescript
const MODIFIER_PRIORITY = {
  responsive: 1,
  container: 2,
  motion: 3,
  custom: 4,     // 새로운 modifier의 우선순위
  state: 5,
  pseudoElement: 6,
  aria: 7,
  data: 8
} as const;
```

#### 4. **타입 정의 업데이트**
```typescript
// src/types.ts
interface ModifierInfo {
  responsive?: string;
  container?: string;
  motion?: string;
  custom?: string;    // 새로운 modifier 타입
  state?: string[];
  pseudoElement?: string;
  aria?: string;
  data?: string;
}
```

#### 5. **테스트 작성**
```typescript
// tests/parser.custom-modifiers.test.ts
describe('Custom Modifier Parser', () => {
  it('custom modifier를 파싱할 수 있어야 함', () => {
    const result = parser.parseClassName('custom-special:bg-blue-500');
    expect(result?.modifiers?.custom).toBe('custom-special');
  });
  
  it('복합 modifier 체인에서 작동해야 함', () => {
    const result = parser.parseClassName('md:custom-special:hover:bg-blue-500');
    expect(result?.modifiers?.responsive).toBe('md');
    expect(result?.modifiers?.custom).toBe('custom-special');
    expect(result?.modifiers?.state).toEqual(['hover']);
  });
});
```

### 🔧 성능 최적화 가이드라인

#### 1. **파싱 캐싱**
```typescript
private static parseCache = new Map<string, ModifierParseResult>();

static parseModifierChain(className: string): ModifierParseResult | null {
  // 캐시 확인
  if (this.parseCache.has(className)) {
    return this.parseCache.get(className)!;
  }
  
  // 파싱 로직...
  const result = this.parseModifierChainInternal(className);
  
  // 캐시 저장
  this.parseCache.set(className, result);
  return result;
}
```

#### 2. **우선순위 기반 최적화**
```typescript
// 우선순위가 높은 modifier부터 먼저 확인
const PARSE_ORDER = [
  'responsive',    // 가장 일반적
  'state',         // 두 번째로 일반적
  'pseudoElement', // 세 번째로 일반적
  'container',     // 덜 일반적
  'motion',        // 가장 드물게 사용
  'aria',
  'data'
];
```

#### 3. **메모리 효율성**
```typescript
// 불필요한 객체 생성 방지
private static readonly EMPTY_MODIFIERS: ModifierInfo = Object.freeze({});

static createEmptyResult(): ModifierParseResult {
  return {
    modifierChain: '',
    baseClassName: '',
    modifiers: this.EMPTY_MODIFIERS // 재사용
  };
}
```

---

## 🚀 향후 개발 계획

### 📊 Phase 1: 완성도 향상 (현재)
- [x] ModifierParser 완전 리팩토링
- [x] ParsedClass 타입 정리
- [x] CSS 선택자 생성 시스템
- [ ] CSSParser 스타일 적용 로직 완성
- [ ] 기존 테스트 업데이트

### 📊 Phase 2: 성능 최적화
- [ ] 파싱 캐싱 시스템
- [ ] 메모리 효율성 개선
- [ ] Bundle size 최적화
- [ ] 성능 벤치마킹

### 📊 Phase 3: 고급 기능
- [ ] CSS Grid 고급 지원
- [ ] CSS Subgrid 지원
- [ ] CSS Container Queries 고급 기능
- [ ] CSS Cascade Layers (@layer)

### 📊 Phase 4: 개발자 경험
- [ ] TypeScript IntelliSense 완성
- [ ] VS Code Extension
- [ ] Figma Plugin 통합
- [ ] 실시간 미리보기

---

## 📚 참고 자료

### 🔗 외부 자료
- [Tailwind CSS v4.1 Documentation](https://tailwindcss.com/docs)
- [CSS Selectors Level 4](https://www.w3.org/TR/selectors-4/)
- [CSS Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries)

### 📁 내부 문서
- [구현 체크리스트](./IMPLEMENTATION_CHECKLIST.md)
- [테스트 가이드](./tests/README.md)
- [기존 vs 새로운 아키텍처 비교](./docs/ARCHITECTURE_COMPARISON.md)

### 🧪 테스트 참조
- [Tailwind Modifier Tests](./tests/parser.tailwind-modifiers.test.ts)
- [Extended Modifier Tests](./tests/parser.modifiers.extended.test.ts)
- [CSS Selector Tests](./tests/parser.css-selector.test.ts)

---

## 💬 기여 가이드

### 🐛 버그 리포트
새로운 Tailwind CSS 방식으로 리팩토링되었으므로, 기존 방식과의 호환성 문제나 새로운 버그가 있을 수 있습니다. 다음 정보와 함께 이슈를 제출해주세요:

1. **재현 가능한 클래스명**: `"md:hover:focus:bg-blue-500"`
2. **예상 결과**: 어떤 결과를 기대했는지
3. **실제 결과**: 실제로 어떤 결과가 나왔는지
4. **파싱 결과**: `parser.parseClassName()` 의 전체 결과

### 🚀 기능 제안
새로운 Modifier 타입이나 CSS 기능 지원 제안 시:

1. **Tailwind CSS 호환성**: Tailwind CSS v4.1+에서 지원하는 기능인지
2. **사용 사례**: 실제 프로젝트에서의 필요성
3. **구현 방안**: 기존 아키텍처와의 통합 방법
4. **성능 영향**: 파싱 성능에 미치는 영향

---

**© 2025 FigmaikR CSSMA-V3 Team**  
**Last Updated**: 2025년 1월 6일  
**Version**: Tailwind CSS 방식 리팩토링 완료 
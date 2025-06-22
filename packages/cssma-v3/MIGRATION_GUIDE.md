# CSSMA-V3 마이그레이션 가이드

> **CSSMA-V3 v0.2.0+**: Legacy ModifierParser에서 Tailwind CSS 방식으로 마이그레이션

## 🚨 주요 변경사항

### 📊 ParsedClass 타입 변경

#### ❌ BEFORE (v0.1.x)
```typescript
interface ParsedClass {
  // Legacy 개별 modifier 필드들
  breakpoint?: string;
  modifier?: string;
  stateModifier?: StateModifier;
  breakpointModifier?: BreakpointModifier;
  containerQueryModifier?: ContainerQueryModifier;
  stateModifiers?: string[];
  breakpointModifiers?: BreakpointModifier[];
  specialSelector?: SpecialSelector;
}
```

#### ✅ AFTER (v0.2.0+)
```typescript
interface ParsedClass {
  // 새로운 Tailwind CSS 방식
  modifierChain?: string;
  modifiers?: {
    responsive?: string;
    container?: string;
    motion?: string;
    state?: string[];
    pseudoElement?: string;
    aria?: string;
    data?: string;
  };
}
```

## 🔧 코드 마이그레이션

### 1. **ParsedClass 필드 접근 방식 변경**

#### ❌ BEFORE
```typescript
// Legacy 방식
if (parsedClass.breakpointModifier) {
  console.log('Breakpoint:', parsedClass.breakpointModifier.value);
}

if (parsedClass.stateModifier) {
  console.log('State:', parsedClass.stateModifier);
}

if (parsedClass.stateModifiers) {
  console.log('Multiple states:', parsedClass.stateModifiers);
}
```

#### ✅ AFTER
```typescript
// 새로운 Tailwind 방식
if (parsedClass.modifiers?.responsive) {
  console.log('Responsive:', parsedClass.modifiers.responsive);
}

if (parsedClass.modifiers?.state) {
  console.log('States:', parsedClass.modifiers.state);
}

// 모든 상태가 배열로 통일됨
if (parsedClass.modifiers?.state?.length) {
  console.log('States count:', parsedClass.modifiers.state.length);
}
```

### 2. **조건부 로직 단순화**

#### ❌ BEFORE
```typescript
// 복잡한 중첩 조건
if (parsedClass.breakpointModifier) {
  if (parsedClass.stateModifier) {
    // 브레이크포인트 + 상태 처리
    handleBreakpointWithState(parsedClass);
  } else {
    // 브레이크포인트만 처리
    handleBreakpoint(parsedClass);
  }
} else if (parsedClass.containerQueryModifier) {
  // 컨테이너 쿼리 처리
  handleContainer(parsedClass);
}
```

#### ✅ AFTER
```typescript
// 깔끔한 단일 조건
const { modifiers } = parsedClass;

if (modifiers?.responsive) {
  handleResponsive(parsedClass, modifiers);
} else if (modifiers?.container) {
  handleContainer(parsedClass, modifiers);
} else if (modifiers?.state) {
  handleStates(parsedClass, modifiers);
}
```

### 3. **CSS 선택자 생성**

#### ❌ BEFORE
```typescript
// Manual CSS generation
let cssSelector = `.${escapedClassName}`;
if (parsedClass.breakpointModifier) {
  cssSelector = `@media (min-width: ${parsedClass.breakpointModifier.value}) { ${cssSelector} }`;
}
if (parsedClass.stateModifier) {
  cssSelector = cssSelector.replace('}', `:${parsedClass.stateModifier} }`);
}
```

#### ✅ AFTER
```typescript
// 자동 CSS 선택자 생성
import { ModifierParser } from './core/parsers/modifiers';

const parseResult = ModifierParser.parseModifierChain(className);
if (parseResult) {
  const cssSelector = ModifierParser.generateCSSSelector(parseResult, `.${escapedClassName}`);
  console.log('Generated CSS:', cssSelector);
}
```

## 🧪 테스트 코드 마이그레이션

### ❌ BEFORE
```typescript
it('should parse breakpoint modifier', () => {
  const result = parser.parseClassName('md:flex');
  
  expect(result?.breakpoint).toBe('md');
  expect(result?.breakpointModifier?.value).toBe('768px');
  expect(result?.breakpointModifier?.type).toBe('min-width');
});
```

### ✅ AFTER
```typescript
it('should parse responsive modifier', () => {
  const result = parser.parseClassName('md:flex');
  
  expect(result?.modifierChain).toBe('md');
  expect(result?.modifiers?.responsive).toBe('md');
  expect(result?.baseClassName).toBe('flex');
});
```

## 🎯 새로운 기능 활용

### 1. **복합 Modifier 체인**
```typescript
// 이제 가능: 복잡한 modifier 체인
const result = parser.parseClassName('md:motion-safe:before:hover:focus:bg-blue-500');

console.log(result?.modifierChain); // "md:motion-safe:before:hover:focus"
console.log(result?.modifiers?.responsive); // "md"
console.log(result?.modifiers?.motion); // "motion-safe"  
console.log(result?.modifiers?.pseudoElement); // "before"
console.log(result?.modifiers?.state); // ["hover", "focus"]
```

### 2. **새로운 Modifier 타입들**
```typescript
// ARIA attributes
parser.parseClassName('aria-checked:bg-blue-500');
parser.parseClassName('aria-[label="Custom"]:p-4');

// Data attributes  
parser.parseClassName('data-active:text-green-500');
parser.parseClassName('data-[size=large]:w-full');

// Motion preferences
parser.parseClassName('motion-safe:transition-all');
parser.parseClassName('motion-reduce:transition-none');

// Container queries
parser.parseClassName('@md:flex');
parser.parseClassName('@md/sidebar:block');
```

### 3. **CSS 선택자 자동 생성**
```typescript
import { ModifierParser } from './core/parsers/modifiers';

// 복합 modifier의 완전한 CSS 선택자 생성
const parseResult = ModifierParser.parseModifierChain('md:motion-safe:before:hover:bg-blue-500');
const css = ModifierParser.generateCSSSelector(parseResult!, '.bg-blue-500');

// 결과:
// @media (min-width: 768px) {
//   @media (prefers-reduced-motion: no-preference) {
//     .md\:motion-safe\:before\:hover\:bg-blue-500:hover::before {
//       /* styles */
//     }
//   }
// }
```

## 🚀 마이그레이션 단계별 가이드

### 1단계: 의존성 업데이트
```bash
pnpm add cssma@latest  # v0.2.0+
```

### 2단계: 타입 검사
```bash
# TypeScript 타입 오류 확인
npx tsc --noEmit
```

### 3단계: 코드 수정
- `breakpointModifier` → `modifiers?.responsive` 
- `stateModifier` → `modifiers?.state?.[0]`
- `stateModifiers` → `modifiers?.state`
- `containerQueryModifier` → `modifiers?.container`

### 4단계: 테스트 업데이트
- 기존 테스트의 기대값 수정
- 새로운 `modifiers` 구조에 맞춘 assertion

### 5단계: 검증
```bash
npm test  # 모든 테스트 통과 확인
```

## ⚠️ 주의사항

### 1. **Breaking Changes**
- 모든 legacy modifier 필드가 제거됨
- `modifier` 필드는 더 이상 사용되지 않음
- `specialSelector` 대신 `modifiers?.aria`, `modifiers?.data` 사용

### 2. **성능 영향**
- 새로운 방식이 더 효율적임
- 파싱 캐싱 시스템 내장
- 메모리 사용량 감소

### 3. **호환성**
- Tailwind CSS v4.1+ 완전 호환
- 기존 클래스명은 모두 동일하게 작동
- CSS 출력 결과는 동일함

## 🆘 트러블슈팅

### Q: `parsedClass.breakpointModifier is undefined` 오류
**A**: `parsedClass.modifiers?.responsive`로 변경하세요.

### Q: 상태 모디파이어가 배열로 변경된 이유는?
**A**: 다중 상태 (`hover:focus:active`)를 지원하기 위해 배열로 통일했습니다.

### Q: CSS 선택자 생성이 복잡해졌는데 직접 만들어야 하나요?
**A**: `ModifierParser.generateCSSSelector()`를 사용하면 자동으로 생성됩니다.

### Q: 성능에 영향은 없나요?
**A**: 오히려 개선되었습니다. 새로운 방식이 더 효율적이고 캐싱을 지원합니다.

## 📚 추가 자료

- [Tailwind CSS 아키텍처 가이드](./TAILWIND_CSS_ARCHITECTURE.md)
- [새로운 테스트 구조](./tests/parser.tailwind-modifiers.test.ts)
- [ModifierParser API 문서](./src/core/parsers/modifiers/README.md)

---

**도움이 필요하시면 GitHub Issues에 문의해주세요!** 
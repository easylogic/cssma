# CSSMA-V3 Test Suite

## 테스트 구조

CSSMA-V3 라이브러리의 테스트 스위트는 다음과 같은 구조로 구성되어 있습니다:

### 코어 기능 테스트

- `parser.core.test.ts`: 파서의 기본 기능 테스트
- `config.test.ts`: 설정 및 프리셋 로딩 테스트
- `converter.test.ts`: CSS 변환 기능 테스트
- `engine.test.ts`: 전체 엔진 통합 테스트

### 파서 카테고리별 테스트

- `parser.colors.test.ts`: 색상 관련 클래스 파싱 테스트
- `parser.typography.test.ts`: 타이포그래피 관련 클래스 파싱 테스트
- `parser.spacing.test.ts`: 간격(padding, margin, gap) 관련 클래스 파싱 테스트
- `parser.layout.test.ts`: 레이아웃(display, width, height 등) 관련 클래스 파싱 테스트
- `parser.effects.test.ts`: 효과(border-radius, shadow, opacity 등) 관련 클래스 파싱 테스트
- `parser.animation.test.ts`: 애니메이션 관련 클래스 파싱 테스트
- `parser.position-transform.test.ts`: 위치 및 변형 관련 클래스 파싱 테스트
- `parser.modifiers.test.ts`: 상태 및 반응형 모디파이어 관련 테스트

## 테스트 실행 방법

전체 테스트 실행:
```bash
pnpm test
```

특정 테스트 파일 실행:
```bash
pnpm test parser.colors.test.ts
```

테스트 감시 모드 실행:
```bash
pnpm test:watch
```

## 테스트 작성 가이드라인

1. 각 테스트 파일은 특정 기능 또는 카테고리에 집중해야 합니다.
2. 테스트 설명은 한글로 작성하여 가독성을 높입니다.
3. 기본 구조는 다음과 같습니다:

```typescript
describe('기능 카테고리', () => {
  describe('세부 기능', () => {
    it('특정 동작을 수행해야 함', () => {
      // 테스트 코드
    });
  });
});
```

4. 각 테스트는 독립적으로 실행 가능해야 합니다.
5. 모킹이 필요한 경우 테스트 파일 내에 명확하게 정의합니다.
6. 테스트 케이스는 가능한 한 간결하고 명확하게 작성합니다. 
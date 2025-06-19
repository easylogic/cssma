# 통합 파서 시스템 마이그레이션 계획

## 🎯 Overview

현재 분산된 3개 파서 시스템을 preset 기반의 통합 아키텍처로 마이그레이션하여 코드 중복을 제거하고 일관성을 확보합니다.

## 📊 Priority: High
**Roadmap Reference**: [Phase 2: Core Architecture Unification](../ROADMAP.md#core-architecture)

## 🔗 Dependencies
- Preset System Integration (preset-system-integration.md)
- Bridge System (bridge-system.md)

## ⏱️ Effort Estimation
- **Total**: 5-7 days
- **Complexity**: High
- **Risk Level**: Medium (기존 API 호환성 유지 필요)

## 🎯 Success Criteria

### Functional Requirements
- [ ] 기존 3개 파서 시스템을 통합 파서로 대체
- [ ] 100% 기존 API 호환성 유지
- [ ] 모든 파서가 preset 시스템 기반으로 동작
- [ ] 성능 저하 없음 (기존 대비 ±5% 이내)
- [ ] 모든 기존 테스트 통과

### Quality Requirements
- [ ] 95%+ 테스트 커버리지 유지
- [ ] TypeScript strict mode 준수
- [ ] 메모리 사용량 최적화
- [ ] 에러 처리 강화

## 📋 Implementation Plan

### Phase 1: 통합 파서 완성 (2-3 days)
**Files to complete**: `packages/cssma/src/core/unified-parser.ts`

#### Step 1.1: 누락된 파서들 구현
```typescript
// 현재 구현된 파서들
✅ Spacing Parser (p-, m- 등)
✅ Color Parser (bg-, text-, border- 등)

// 구현 필요한 파서들
❌ Typography Parser (text-sm, font-bold 등)
❌ Layout Parser (flex, grid 등)
❌ Sizing Parser (w-, h- 등)
❌ Border Parser (border-, rounded- 등)
❌ Effects Parser (shadow-, opacity- 등)
❌ Animation Parser (transition-, animate- 등)
```

#### Step 1.2: Figma 변환기 완성
```typescript
// 현재 구현된 변환기들
✅ Spacing Converter
✅ Color Converter

// 구현 필요한 변환기들
❌ Typography Converter
❌ Layout Converter
❌ Sizing Converter
❌ Border Converter
❌ Effects Converter
❌ Animation Converter
```

#### Step 1.3: 성능 최적화
- 파서 캐싱 시스템 구현
- Lazy loading 최적화
- 메모리 사용량 모니터링

### Phase 2: 기존 시스템 통합 (2-3 days)
**Files to modify**:
- `packages/cssma/src/parser/class-names/index.ts`
- `packages/cssma/src/style/processCssStyles.ts`
- `packages/cssma/src/figma-to-css/index.ts`

#### Step 2.1: 기존 parseClassName 대체
```typescript
// Before (packages/cssma/src/parser/class-names/index.ts)
export function parseClassName(className: string): ParsedClassName | null {
  // 16개 개별 파서 호출
  const parsers = [parseSizeClassName, parseSpacingClassName, ...];
  // ...
}

// After (통합 파서 사용)
export function parseClassName(className: string): ParsedClassName | null {
  return unifiedParser.parseClassName(className);
}
```

#### Step 2.2: 기존 processCssStyles 대체
```typescript
// Before (packages/cssma/src/style/processCssStyles.ts)
export function processCssStyles(classNames?: string, options = {}): FigmaStyleProperties {
  const parsedStyles = parseStyles(classNames);
  const result = convertStylesToFigma(parsedStyles, options);
  // ...
}

// After (통합 파서 사용)
export function processCssStyles(classNames?: string, options = {}): FigmaStyleProperties {
  return unifiedParser.classNamesToFigmaStyles(classNames || '', options);
}
```

#### Step 2.3: 기존 figmaToCss 대체
```typescript
// Before (packages/cssma/src/figma-to-css/index.ts)
export function figmaToCss(styles: Record<string, any>): string {
  const classes: string[] = [
    ...figmaLayoutToCss(styles),
    ...figmaColorsToCss(styles),
    // ... 11개 개별 변환기
  ];
  return classes.filter(Boolean).join(' ');
}

// After (통합 파서 사용)
export function figmaToCss(styles: Record<string, any>): string {
  return unifiedParser.figmaStylesToClassNames(styles);
}
```

### Phase 3: 테스트 및 검증 (1-2 days)
**Files to create/modify**:
- `packages/cssma/tests/core/unified-parser.test.ts`
- 기존 테스트 파일들 업데이트

#### Step 3.1: 통합 테스트 작성
```typescript
describe('Unified Parser System', () => {
  describe('Backward Compatibility', () => {
    it('should maintain 100% compatibility with existing parseClassName', () => {
      // 기존 API와 동일한 결과 검증
    });
    
    it('should maintain 100% compatibility with existing processCssStyles', () => {
      // 기존 API와 동일한 결과 검증
    });
    
    it('should maintain 100% compatibility with existing figmaToCss', () => {
      // 기존 API와 동일한 결과 검증
    });
  });
  
  describe('Preset Integration', () => {
    it('should work with all 4 built-in presets', () => {
      // 각 preset에서 정상 동작 검증
    });
    
    it('should support custom preset extensions', () => {
      // 커스텀 확장 기능 검증
    });
  });
  
  describe('Performance', () => {
    it('should parse 1000 classes within 100ms', () => {
      // 성능 벤치마크 테스트
    });
    
    it('should not leak memory during repeated parsing', () => {
      // 메모리 누수 테스트
    });
  });
});
```

#### Step 3.2: 기존 테스트 호환성 검증
- 모든 기존 테스트가 통과하는지 확인
- 실패하는 테스트가 있다면 통합 파서 수정
- 성능 회귀 테스트 실행

## 🧪 Testing Strategy

### 호환성 테스트
```bash
# 1. 기존 테스트 모두 실행
pnpm test

# 2. 성능 벤치마크 실행
pnpm test:performance

# 3. 메모리 사용량 테스트
pnpm test:memory

# 4. 통합 테스트 실행
pnpm test:integration
```

### A/B 테스트
```typescript
// 기존 파서와 통합 파서 결과 비교
function compareResults(className: string) {
  const oldResult = oldParseClassName(className);
  const newResult = unifiedParser.parseClassName(className);
  
  // 결과가 동일한지 검증
  expect(newResult).toEqual(oldResult);
}
```

## 🔧 Migration Strategy

### 점진적 마이그레이션
```typescript
// 1단계: 플래그를 통한 선택적 사용
const USE_UNIFIED_PARSER = process.env.CSSMA_USE_UNIFIED_PARSER === 'true';

export function parseClassName(className: string): ParsedClassName | null {
  if (USE_UNIFIED_PARSER) {
    return unifiedParser.parseClassName(className);
  } else {
    return legacyParseClassName(className);
  }
}

// 2단계: 기본값을 통합 파서로 변경
const USE_LEGACY_PARSER = process.env.CSSMA_USE_LEGACY_PARSER === 'true';

// 3단계: 레거시 파서 완전 제거
```

### 롤백 계획
```typescript
// 문제 발생 시 즉시 레거시 파서로 롤백 가능
export const EMERGENCY_ROLLBACK = {
  parseClassName: legacyParseClassName,
  processCssStyles: legacyProcessCssStyles,
  figmaToCss: legacyFigmaToCss
};
```

## 📊 Success Metrics

### 기능적 메트릭
- [ ] 기존 API 호환성: 100%
- [ ] 테스트 통과율: 100%
- [ ] 파서 정확도: 99.9%+
- [ ] Preset 지원: 4개 내장 + 커스텀

### 성능 메트릭
- [ ] 파싱 속도: 기존 대비 ±5% 이내
- [ ] 메모리 사용량: 기존 대비 -10% 이상
- [ ] 번들 크기: 기존 대비 -15% 이상 (중복 제거)
- [ ] 초기화 시간: <50ms

### 개발자 경험 메트릭
- [ ] 코드 중복: -70% 이상
- [ ] 유지보수성: 크게 향상
- [ ] 확장성: 새 파서 추가 용이
- [ ] 디버깅: 통합된 로깅 시스템

## 🎯 Benefits

### 즉시 효과
1. **코드 중복 제거**: 3개 분산 시스템 → 1개 통합 시스템
2. **일관성 확보**: 모든 파서가 동일한 preset 사용
3. **유지보수성 향상**: 변경사항을 한 곳에서만 수정
4. **성능 최적화**: 캐싱 및 최적화 통합 적용

### 장기적 효과
1. **확장성**: 새로운 CSS 속성 지원 용이
2. **표준화**: 팀/회사 표준 preset 적용 가능
3. **호환성**: Tailwind 버전 업그레이드 대응 용이
4. **혁신**: AI 기반 파싱, 스마트 제안 등 고급 기능 추가 가능

## 🚨 Risk Mitigation

### 주요 리스크
1. **호환성 문제**: 기존 API와 미묘한 차이
2. **성능 저하**: 통합으로 인한 오버헤드
3. **복잡성 증가**: 디버깅 어려움

### 대응 방안
1. **철저한 테스트**: A/B 테스트, 회귀 테스트
2. **점진적 마이그레이션**: 플래그 기반 전환
3. **롤백 계획**: 즉시 이전 버전으로 복구 가능
4. **모니터링**: 성능 및 에러 실시간 추적

## 📅 Timeline

### Week 1: 통합 파서 완성
- Day 1-2: Typography, Layout 파서 구현
- Day 3-4: Sizing, Border, Effects 파서 구현
- Day 5: Animation 파서 및 성능 최적화

### Week 2: 시스템 통합
- Day 1-2: 기존 파서들을 통합 파서로 대체
- Day 3-4: 테스트 작성 및 호환성 검증
- Day 5: 성능 테스트 및 최적화

### Week 3: 검증 및 배포
- Day 1-2: A/B 테스트 및 회귀 테스트
- Day 3-4: 문서화 및 마이그레이션 가이드
- Day 5: 프로덕션 배포 및 모니터링

## 🔗 Related Issues

This integrates with:
- Preset System Integration (preset-system-integration.md)
- Bridge System (bridge-system.md)
- Performance Optimization (performance-optimization.md)

## 📚 Documentation Updates

- [ ] 통합 파서 API 문서 작성
- [ ] 마이그레이션 가이드 작성
- [ ] 성능 벤치마크 문서 업데이트
- [ ] 아키텍처 다이어그램 업데이트 
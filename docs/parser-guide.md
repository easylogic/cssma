# 📝 cssma-v3 parseClassToken 기반 유틸리티/모디파이어 파싱 & 테스트 가이드 (2024-06)

이 문서는 cssma-v3의 **모든 유틸리티 및 modifier(모디파이어) 파싱을 단일 함수(parseClassToken)로 일관되게 처리**하는 최신 정책과 실전 예시, 테스트/확장성 가이드를 제공합니다.

---

## 1. 파싱 구조 및 책임 범위

- **parseClassToken** 함수 하나로 모든 유틸리티(클래스명)와 modifier(접두사) 파싱을 담당합니다.
- Tailwind의 modifier(접두사: responsive, pseudo, state 등)와 utility(실제 스타일 적용 클래스)는 모두 parseClassToken에서 처리합니다.
- theme lookup(프리셋 값 → 실제 CSS 값 변환), direction, context 등은 상위 레이어에서 처리합니다.

---

## 2. 입력(클래스명) → 파싱 결과(객체) 변환 정책

### 지원 패턴 및 Tailwind 호환 규칙
- **modifier**: ex) `hover`, `focus`, `group-hover`, `dark`, `peer-checked`, `md`, `sm`, `supports-[display:grid]`
  - 항상 `{ type: 'modifier', prefix: '...' }` 구조로 반환
  - 인식 불가 시 `{ type: 'unknown', raw: ... }`
- **utility**: ex) `bg-red-500`, `p-4`, `gap-2`, `bg-[oklch(62.2345%_0.154_219.2_/_0.8)]`, `border-(--my-border)` 등
  - 기존 parseUtilityToken 정책과 동일

---

## 3. 반환 객체 구조 및 필드 설명

| 필드명           | 의미/역할                                                                 | 예시/설명 |
|------------------|--------------------------------------------------------------------------|-----------|
| `type`           | 'modifier', 'utility', 'unknown' 등 파싱 결과 유형                        | 'modifier', 'utility', 'unknown' |
| `prefix`         | modifier/utility의 prefix(접두사)                                         | ex) 'hover', 'group-hover', 'bg', 'p' |
| `raw`            | 입력받은 원본 클래스명 전체                                               | ex) 'bg-[rgba(0,0,0,0.5)]/10', 'hover' |
| `value`          | 파싱된 실제 값(utility에서만)                                            | ex) 'rgba(0,0,0,0.5)', '4', '--my-border' |
| `slash`          | 마지막 `/` 뒤에 오는 값(utility에서만, 존재시)                           | ex) '10', '2' (없으면 undefined) |
| `arbitrary`      | arbitrary value 패턴([...]) 여부(utility에서만)                          | true/false |
| `customProperty` | custom property 패턴((...)) 여부(utility에서만)                          | true/false |
| `arbitraryType`  | 함수형 arbitrary value의 타입(utility에서만)                             | ex) 'rgba', 'oklch', 'url' |
| `arbitraryValue` | 함수형 arbitrary value의 인자(utility에서만)                             | ex) '0,0,0,0.5', '62.2345% 0.154 219.2 / 0.8' |
| `numeric`        | value가 숫자(정수/실수)인지 여부(utility에서만)                         | true/false |
| `preset`         | 프리셋 매칭 여부(utility에서만)                                          | true/false |
| `negative`       | negative prefix(-) 여부(utility에서만)                                   | true/false |
| `important`      | important 플래그(!) 여부(utility에서만)                                  | true/false |

---

### 필드별 간단 예시
- **modifier**: `hover`, `group-hover`, `dark`, `peer-checked`, `md`, `supports-[display:grid]`
  - `{ type: 'modifier', prefix: 'hover', raw: 'hover' }`
  - `{ type: 'modifier', prefix: 'group-hover', raw: 'group-hover' }`
  - `{ type: 'modifier', prefix: 'supports-[display:grid]', raw: 'supports-[display:grid]' }`
- **utility**: `bg-[rgba(0,0,0,0.5)]/10`, `border-(--my-border)/2`, `-p-4!`
  - 기존 예시와 동일 (아래 참고)
- **unknown**: 인식 불가 시
  - `{ type: 'unknown', raw: 'foo-bar' }`

---

## 4. 테스트/확장성 체크리스트

- modifier/utility 모두 parseClassToken 하나로 파싱, 테스트 기대값도 동일 구조로 비교
- modifier는 `{ type: 'modifier', prefix: ... }` 구조, utility는 기존 구조
- `_` → 공백 변환 정책은 arbitrary/customProperty/일반 value 모두에 적용
- slash 분리는 마지막 `/`만 적용, 내부 `/`는 value의 일부
- 반환 객체 구조는 항상 동일하게 유지(테스트 기대값도 1:1 일치)
- 프리셋 매칭, 커스텀 프로퍼티, arbitrary value, negative/important 플래그 등 모든 케이스를 테스트
- 새로운 modifier/utility가 추가될 때는 prefix만 추가하면 됨(확장성 우수)
- theme lookup, context, direction 등은 parseClassToken 결과를 상위 레이어에서 해석/적용

---

## 5. Edge Case & 실전 팁

- modifier/utility 모두 동일한 반환 객체 구조 사용
- `_` → 공백 변환은 value/arbitraryValue 모두에 적용됨
- arbitrary value 내 함수형(`rgba(...)`, `oklch(...)`, `url(...)` 등)도 타입/인자 분리 지원
- slash 분리는 항상 마지막 `/`만 적용, 내부 `/`는 value의 일부로 취급
- negative/important 플래그는 prefix/접미사에서 자동 추출
- 유효하지 않은 패턴(프리픽스 없음, value 없음 등)은 `{ type: 'unknown', raw: ... }` 반환
- theme lookup, direction 등은 parseClassToken 외부에서 처리

---

## 6. 결론

- cssma-v3의 모든 유틸리티 및 modifier 파싱은 parseClassToken 하나로 일관되게 처리할 수 있습니다.
- theme lookup, direction, context 등은 별도 레이어에서 담당하며, 파서의 반환 객체 구조와 정책만 일관되게 맞추면 됩니다.
- 테스트, 문서, 확장성 모두 parseClassToken 중심으로 관리하면 됩니다.

---
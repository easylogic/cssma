# 📝 cssma-v3 parseUtilityToken 기반 유틸리티 파싱 & 테스트 가이드 (2024-06)

이 문서는 cssma-v3의 **모든 유틸리티 파싱을 단일 함수(parseUtilityToken)로 일관되게 처리**하는 최신 정책과 실전 예시, 테스트/확장성 가이드를 제공합니다.

---

## 1. 파싱 구조 및 책임 범위

- **parseUtilityToken** 함수 하나로 모든 유틸리티(클래스명) 파싱을 담당합니다.
- modifier(접두사: responsive, pseudo, state 등)는 별도 파서에서 분리 후, utility 본체만 parseUtilityToken에 전달합니다.
- theme lookup(프리셋 값 → 실제 CSS 값 변환), direction, context 등은 상위 레이어에서 처리합니다.

---

## 2. 입력(클래스명) → 파싱 결과(객체) 변환 정책

### 지원 패턴 및 Tailwind 호환 규칙
- **preset value**: ex) `bg-red-500`, `p-4`, `gap-2`
- **arbitrary value**: ex) `bg-[oklch(62.2345%_0.154_219.2_/_0.8)]`, `bg-[#ff0]`, `bg-[url(foo_bar)]`
  - `_` → 공백 변환 (Tailwind와 동일)
  - 마지막 `/`만 slash로 분리, 내부 `/`는 value의 일부
  - hex, color, url 등 최신 CSS4 포맷 지원
- **custom property**: ex) `border-(--my-border)`, `bg-(--my-color)`
  - `_` → 공백 변환
  - 마지막 `/`만 slash로 분리
- **일반 value**: ex) `gap-2/4`, `opacity-50`
  - 마지막 `/`만 slash로 분리
- **negative/important 플래그**: ex) `-p-4`, `p-4!`
- **유효하지 않은 패턴**: prefix가 없거나 value가 비어있으면 null 반환

---

## 3. 반환 객체 구조 및 필드 설명

| 필드명           | 의미/역할                                                                 | 예시/설명 |
|------------------|--------------------------------------------------------------------------|-----------|
| `raw`            | 입력받은 원본 클래스명 전체                                               | ex) 'bg-[rgba(0,0,0,0.5)]/10' |
| `prefix`         | 매칭된 유틸리티 prefix                                                    | ex) 'bg', 'p', 'border' |
| `value`          | 파싱된 실제 값(내부 값, `_`→공백 변환 적용)                              | ex) 'rgba(0,0,0,0.5)', '4', '--my-border' |
| `slash`          | 마지막 `/` 뒤에 오는 값(존재시)                                          | ex) '10', '2' (없으면 undefined) |
| `arbitrary`      | arbitrary value 패턴([...]) 여부                                          | true/false |
| `customProperty` | custom property 패턴((...)) 여부                                          | true/false |
| `arbitraryType`  | 함수형 arbitrary value의 타입(함수명)                                    | ex) 'rgba', 'oklch', 'url' (없으면 undefined) |
| `arbitraryValue` | 함수형 arbitrary value의 인자(괄호 내부 값, `_`→공백 변환 적용)          | ex) '0,0,0,0.5', '62.2345% 0.154 219.2 / 0.8' |
| `numeric`        | value가 숫자(정수/실수)인지 여부                                         | true/false |
| `preset`         | 프리셋 매칭 여부(임의값/커스텀프로퍼티가 아니고 값이 비어있지 않을 때 true) | true/false |
| `negative`       | negative prefix(-) 여부                                                  | true/false |
| `important`      | important 플래그(!) 여부                                                 | true/false |

---

### 필드별 간단 예시
- `bg-[rgba(0,0,0,0.5)]/10` →
  - raw: 'bg-[rgba(0,0,0,0.5)]/10'
  - prefix: 'bg'
  - value: 'rgba(0,0,0,0.5)'
  - slash: '10'
  - arbitrary: true
  - customProperty: false
  - arbitraryType: 'rgba'
  - arbitraryValue: '0,0,0,0.5'
  - numeric: false
  - preset: false
  - negative: false
  - important: false

- `border-(--my-border)/2` →
  - raw: 'border-(--my-border)/2'
  - prefix: 'border'
  - value: '--my-border'
  - slash: '2'
  - arbitrary: false
  - customProperty: true
  - arbitraryType: undefined
  - arbitraryValue: undefined
  - numeric: false
  - preset: false
  - negative: false
  - important: false

- `-p-4!` →
  - raw: '-p-4!'
  - prefix: 'p'
  - value: '4'
  - slash: undefined
  - arbitrary: false
  - customProperty: false
  - arbitraryType: undefined
  - arbitraryValue: undefined
  - numeric: true
  - preset: true
  - negative: true
  - important: true

---

## 4. 테스트/확장성 체크리스트

- modifier는 반드시 별도 파서에서 분리 후 utility 본체만 parseUtilityToken에 전달
- `_` → 공백 변환 정책은 arbitrary/customProperty/일반 value 모두에 적용
- slash 분리는 마지막 `/`만 적용, 내부 `/`는 value의 일부
- 반환 객체 구조는 항상 동일하게 유지(테스트 기대값도 1:1 일치)
- 프리셋 매칭, 커스텀 프로퍼티, arbitrary value, negative/important 플래그 등 모든 케이스를 테스트
- 새로운 유틸리티가 추가될 때는 prefix만 추가하면 됨(확장성 우수)
- theme lookup, context, direction 등은 parseUtilityToken 결과를 상위 레이어에서 해석/적용

---

## 5. Edge Case & 실전 팁

- `_` → 공백 변환은 value/arbitraryValue 모두에 적용됨
- arbitrary value 내 함수형(`rgba(...)`, `oklch(...)`, `url(...)` 등)도 타입/인자 분리 지원
- slash 분리는 항상 마지막 `/`만 적용, 내부 `/`는 value의 일부로 취급
- negative/important 플래그는 prefix/접미사에서 자동 추출
- 유효하지 않은 패턴(프리픽스 없음, value 없음 등)은 null 반환
- modifier(접두사) 파싱, theme lookup, direction 등은 parseUtilityToken 외부에서 처리

---

## 6. 결론

- cssma-v3의 모든 유틸리티 파싱은 parseUtilityToken 하나로 일관되게 처리할 수 있습니다.
- modifier, theme lookup 등은 별도 레이어에서 담당하며, 파서의 반환 객체 구조와 정책만 일관되게 맞추면 됩니다.
- 테스트, 문서, 확장성 모두 parseUtilityToken 중심으로 관리하면 됩니다.

---
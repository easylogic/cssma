# 📝 Spacing Utility Parsers Checklist (cssma-v3)

이 문서는 spacing 계열 Tailwind 유틸리티 파서의 구현 및 테스트 진행 상황을 체크리스트로 관리합니다.

---

## ✅ 완료된 항목

- [x] **margin**
  - 구현 및 테스트 완료 (negative prefix 지원)
- [x] **padding**
  - 구현 및 테스트 완료
- [x] **gap**
  - 구현 및 테스트 완료
- [x] **scrollMargin**
  - 구현 및 테스트 완료 (negative prefix 지원)
- [x] **scrollPadding**
  - 구현 및 테스트 완료
- [x] **borderSpacing**
  - context 기반 preset 미사용, 숫자/custom/arbitrary 구조 통일, 테스트 완료
- [x] **textIndent**
  - context(theme) 미사용, 숫자/px/negative/custom/arbitrary value 지원, value string 통일, 테스트 완료

---

## ⏳ 진행/예정 항목

- [ ] **spaceBetween** (`space-x-*`, `space-y-*`)
  - axis(x/y) 분기, context 기반 preset/custom/arbitrary 구조 통일 필요
- [ ] **inset** (`inset-*`, `inset-x-*`, `inset-y-*`, `top-*`, `right-*`, `bottom-*`, `left-*`)
  - negative prefix, direction 분기, 구조 통일
- [ ] **ringOffsetWidth** (`ring-offset-*`)
  - 구조 통일, context 기반 preset/custom/arbitrary
- [ ] **outlineOffset** (`outline-offset-*`)
  - 구조 통일, context 기반 preset/custom/arbitrary
- [ ] **divideWidth** (`divide-x-*`, `divide-y-*`)
  - axis(x/y) 분기, 구조 통일

---

## 참고/진행 노트

- margin/scrollMargin: negative prefix 분리 구조, raw/negative 필드 일관성, 테스트 100% 통과
- padding/gap: negative prefix 미지원, context 기반 preset/custom/arbitrary 구조 통일
- scrollPadding: Tailwind v4 기준 negative prefix 지원, margin 구조 참고하여 리팩터링 필요
- borderSpacing: context 미사용, 숫자/custom/arbitrary 구조 통일, axis 분기, negative prefix 미지원
- textIndent: negative prefix 구조 적용 필요
- spaceBetween/divideWidth: axis(x/y) 분기, 반환 객체 구조 통일 필요
- inset: negative prefix, direction(x/y/각각), context 기반 preset 등 margin 구조 참고
- ring/outline/divide: negative prefix 미지원, spacing preset/arbitrary/custom property 구조 통일

---

> 이 체크리스트는 파서 리팩터링/테스트가 완료될 때마다 업데이트하세요! 
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

---

## ⏳ 진행/예정 항목

- [ ] **borderSpacing**
  - context 기반 preset, custom property, arbitrary value 구조 통일 필요
- [ ] **textIndent**
  - negative prefix 구조 적용 필요

---

## 참고/진행 노트

- margin/scrollMargin: negative prefix 분리 구조, raw/negative 필드 일관성, 테스트 100% 통과
- padding/gap: negative prefix 미지원, context 기반 preset/custom/arbitrary 구조 통일
- scrollPadding: Tailwind v4 기준 negative prefix 지원, margin 구조 참고하여 리팩터링 필요
- borderSpacing/textIndent: 구조 통일 및 negative prefix 적용 필요

---

> 이 체크리스트는 파서 리팩터링/테스트가 완료될 때마다 업데이트하세요! 
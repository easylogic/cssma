# 📝 Color Utility Parsers Checklist (cssma-v3)

## ✅ 완료된 항목

- [x] **color** (`color.ts`)
  - context(theme) 기반 preset, custom property, arbitrary value 지원, 구조 통일, 테스트 완료
- [x] **backgroundColor** (`backgroundColor.ts`)
  - context(theme) 기반 preset, custom property, arbitrary value(/opacity) 지원, 구조 통일, 테스트 완료
- [x] **borderColor** (`borderColor.ts`)
  - context(theme) 기반 preset, side(x/y/t/r/b/l/s/e) 분기, custom property, arbitrary value(/opacity) 지원, 구조 통일, 테스트 완료
- [x] **outlineColor** (`outlineColor.ts`)
  - context(theme) 기반 preset, custom property, arbitrary value(/opacity), special keyword 지원, 구조 통일, 테스트 완료
- [x] **accentColor** (`accentColor.ts`)
  - context(theme) 기반 preset, custom property, arbitrary value(/opacity) 지원, 구조 통일, 테스트 완료
- [x] **caretColor** (`caretColor.ts`)
  - context(theme) 기반 preset, custom property, arbitrary value(/opacity) 지원, 구조 통일, 테스트 완료
- [x] **textDecorationColor** (`textDecorationColor.ts`)
  - preset/special keyword, custom property, arbitrary value 지원, 구조 통일, 테스트 완료

---

## ⏳ 진행/예정 항목

- [ ] **ringColor** (`ringColor.ts` 등)
  - context(theme) 기반 preset/custom/arbitrary 구조 통일 필요, 테스트 필요

---

## 참고/진행 노트

- 모든 color 계열 파서는 context(theme) 기반 preset + custom property + arbitrary value 지원 구조로 통일
- 반환 객체 구조(예: type, value, preset, customProperty, arbitrary, raw 등) 일관성 유지
- opacity, side, preset 등 부가 필드도 상황에 따라 포함
- 테스트는 Tailwind 실제 동작과 1:1 매칭되도록 작성
- 신규 color 계열 파서 추가 시 checklist에 반영

---

> 이 체크리스트는 color 계열 파서 리팩터링/테스트가 완료될 때마다 업데이트하세요! 
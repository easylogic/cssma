# 📝 /utilities 파서 통합 체크리스트 (cssma-v3)

> 각 파서별로 리팩터/테스트/문서화 진행 시 아래 표를 업데이트하세요.

| Parser                | Tailwind 프리셋 | context | 유틸함수 | 반환구조 | custom/arbitrary | 테스트 | 문서/가이드 |
|-----------------------|:--------------:|:-------:|:--------:|:--------:|:---------------:|:------:|:-----------:|
| accentColor           | ✅             | ✅      | ✅       | ✅       | ✅              | ✅     | ✅          |
| backgroundColor       | ✅             | ✅      | ✅       | ✅       | ✅              | ✅     | ✅          |
| borderColor           | ✅             | ✅      | ✅       | ✅       | ✅              | ✅     | ✅          |
| caretColor            | ✅             | ✅      | ✅       | ✅       | ✅              | ✅     | ✅          |
| outlineColor          | ✅             | ✅      | ✅       | ✅       | ✅              | ✅     | ✅          |
| alignItems            | ✅             | ✅      | ✅       | ✅       | ✅              | ✅     | ✅          |
| alignSelf             | ✅             | ✅      | ✅       | ✅       | ✅              | ✅     | ✅          |
| animation             | ✅             | ✅      | ✅       | ✅       | ✅              | ✅     | ✅          |
| appearance            | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| aspectRatio           | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| backdropBlur          | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| backdropBrightness    | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| backgroundAttachment  | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| backgroundClip        | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| backgroundImage       | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| backgroundOrigin      | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| backgroundPosition    | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| backgroundRepeat      | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| baselineLast          | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| borderRadius          | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| borderSpacing         | ✅             | ✅      | ✅       | ✅       | ✅              | ✅     | ✅          |
| borderStyle           | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| borderWidth           | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| box                   | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| boxDecorationBreak    | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| breakAfter            | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| breakBefore           | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| breakInside           | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| clear                 | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| colSpan               | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| colStart              | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| columns               | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| color                 | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| display               | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| flex                  | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| flexBasis             | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| flexGrow              | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| flexShrink            | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| float                 | ✅             | ✅      | ✅       | ✅       | ✅              | ✅     | ✅          |
| fontFamily            | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| fontSize              | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| fontSmoothing         | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| fontStretch           | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| fontStyle             | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| fontVariantNumeric    | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| gap                   | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| gridAutoFlow          | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| gridAutoRows          | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| gridColumn            | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| gridRow               | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| gridTemplateColumns   | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| gridTemplateRows      | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| height                | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| inset                 | ✅             | ✅      | ✅       | ✅       | ✅              | ✅     | ✅          |
| justifyContent        | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| justifyItems          | ✅             | ✅      | ✅       | ✅       | ✅              | ✅     | ✅          |
| justifySelf           | ✅             | ✅      | ✅       | ✅       | ✅              | ✅     | ✅          |
| letterSpacing         | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| lineClamp             | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| listStyleImage        | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| listStylePosition     | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| margin                | ✅             | ✅      | ✅       | ✅       | ✅              | ✅     | ✅          |
| maskMode              | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| maskPosition          | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| maskRepeat            | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| maskSize              | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| maxHeight             | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| maxWidth              | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| minHeight             | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| minWidth              | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| objectPosition        | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| order                 | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| outlineOffset         | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| outlineStyle          | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| outlineWidth          | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| overflow              | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| padding               | ✅             | ✅      | ✅       | ✅       | ✅              | ✅     | ✅          |
| placeItems            | ✅             | ✅      | ✅       | ✅       | ✅              | ✅     | ✅          |
| placeSelf             | ✅             | ✅      | ✅       | ✅       | ✅              | ✅     | ✅          |
| position              | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| rowEnd                | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| rowSpan               | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| rowStart              | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| scale                 | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| scrollMargin          | ✅             | ✅      | ✅       | ✅       | ✅              | ✅     | ✅          |
| scrollPadding         | ✅             | ✅      | ✅       | ✅       | ✅              | ✅     | ✅          |
| spacing               | ✅             | ✅      | ✅       | ✅       | ✅              | ✅     | ✅          |
| textAlign             | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| textDecoration        | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| textDecorationColor   | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| textDecorationLine    | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| textDecorationStyle   | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| textDecorationThickness| ⬜️            | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| textIndent            | ✅             | ✅      | ✅       | ✅       | ✅              | ✅     | ✅          |
| textOverflow          | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| textTransform         | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| textUnderlineOffset   | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| textWrap              | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| transition            | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| transitionProperty    | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| visibility            | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| whiteSpace            | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| width                 | ⬜️             | ⬜️      | ⬜️       | ⬜️       | ⬜️              | ⬜️     | ⬜️          |
| zIndex                | ✅             | ✅      | ✅       | ✅       | ✅              | ✅     | ✅          |

---

> 각 항목은 리팩터/테스트/문서화 진행 시 ✅로 업데이트하세요.
> 추가 항목/설명 필요시 자유롭게 확장 가능합니다. 
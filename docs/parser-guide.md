# 📝 cssma-v3 Parser & Test Implementation Guide

This guide summarizes best practices and checklists for implementing and testing utility parsers in cssma-v3, based on the context-driven color parser refactor. Use this as a reference for all future parser and test development.

---

## 0. ⚠️ Number Parsing & Theme Lookup: Critical Note

**Always use string keys for numeric theme lookups!**

- When looking up values in `theme.spacing`, `theme.fontSize`, etc., always use string keys (e.g., `'4'`, `'2'`, `'6'`), not numbers (4, 2, 6).
- This applies to both parser code and test mocks:
  - `theme.spacing['4']` is valid, but `theme.spacing[4]` is not (unless the theme object redundantly defines both).
  - When writing mock theme objects for tests, always use string keys for all numeric values.
- If you use a number as a key, lookups will fail and return `undefined`, causing subtle bugs.
- **Troubleshooting tip:** If a context-based parser returns `null` for a valid preset, check that your theme object uses string keys for all numbers.
- **Spacing utilities (margin, padding, etc.) must always return the full theme path in the `preset` field (e.g., `spacing.px`, not just `px`).**
- **All return objects (spacing, color, etc.) must use a unified structure: `{ type, value, raw, arbitrary, customProperty, preset? }`.**
- **Test expectations must always match the actual parser output structure, including all fields.**

---

## 1. Parser Implementation Checklist

### 1) Context-based preset lookup (with parseContextColorUtility or parseContextSpacingUtility)
- Use `parseContextColorUtility` for color utilities and `parseContextSpacingUtility` (or equivalent) for spacing utilities (e.g. margin, padding).
- For gap/gap-x/gap-y, use `parseContextGapUtility` instead of parseContextSpacingUtility.
- Pass `{ token, prefix, type, context, allowOpacity }` to the utility:
  - `token`: the full utility class (e.g. 'bg-blue-200/50', 'm-4')
  - `prefix`: the utility prefix (e.g. 'bg', 'm', 'p', ...)
  - `type`: the return type string (e.g. 'background-color', 'margin')
  - `context`: CssmaContext with theme getter
  - `allowOpacity`: set to `true` if `/opacity` is supported (for color)
- **Only treat the result as valid if the returned value is not null.**
- **Spacing utilities must always return the full theme path in the `preset` field (e.g., `spacing.4`, `spacing.px`).**
- Example usage:
  ```ts
  const result = parseContextSpacingUtility({ token, prefix: 'm', type: 'margin', context });
  if (result) return result;
  ```
- If not using context utility, fallback to custom property/arbitrary value logic as needed.

### 1.1) borderSpacing parser (2024-06 refactor)
- **borderSpacing은 context(theme) lookup을 사용하지 않음.**
- 숫자, custom property, arbitrary value만 파싱하며, theme context는 무시함.
- 숫자 파싱은 반드시 `parseNumericSpacingToken`(공통 유틸)으로 처리.
- custom property는 `parseCustomPropertyUtility`로, arbitrary value는 `extractArbitraryValue` + `isLengthValue`/`isVarFunction`으로 처리.
- 반환 객체는 `{ type: 'border-spacing', axis, value, raw, arbitrary, customProperty? }` 구조를 따름.
- axis는 'both'|'x'|'y' 중 하나이며, prefix에서 추출.
- negative prefix는 지원하지 않으며, '--' 또는 '-'로 시작하면 null 반환.
- context 인자는 무시(호환성 위해 받지만 사용하지 않음).
- Example:
  ```ts
  export function parseBorderSpacing(token: string, context?: CssmaContext): any | null {
    if (token.startsWith('--') || token.startsWith('-')) return null;
    const originalToken = token;
    const m = token.match(/^border-spacing(?:-([xy]))?-(.+)$/);
    if (!m) return null;
    const axisKey = m[1] || "";
    const axis = axisMap[axisKey as keyof typeof axisMap];
    const prefix = axisKey ? `border-spacing-${axisKey}` : "border-spacing";
    const numeric = parseNumericSpacingToken(token, { prefix, type: "border-spacing", axis, raw: originalToken });
    if (numeric) return numeric;
    const customProp = parseCustomPropertyUtility({ token, prefix, type: "border-spacing" });
    if (customProp) {
      return { type: "border-spacing", axis, value: customProp.value, raw: originalToken, arbitrary: true, customProperty: true };
    }
    const arbitraryValue = extractArbitraryValue(token, prefix);
    if (arbitraryValue !== null && (isLengthValue(arbitraryValue) || isVarFunction(arbitraryValue))) {
      return { type: "border-spacing", axis, value: arbitraryValue, raw: originalToken, arbitrary: true };
    }
    return null;
  }
  ```
- **테스트는 context를 넘기더라도 무시됨.**
- **borderSpacing은 theme.spacing preset, negative prefix, direction 등 context 기반 파싱을 하지 않음.**

### 2) Custom property parsing (with parseCustomPropertyUtility)
- Use `parseCustomPropertyUtility` for custom property parsing.
- Pass `{ token, prefix, type }` as parameters.
- **Custom property + opacity (e.g., `bg-(--my-color)/50`) is not supported.**
- **Return object for custom property must always include `arbitrary: false` (for spacing), `customProperty: true`, and all other standard fields.**
- Example:
  ```ts
  parseCustomPropertyUtility({ token: 'm-(--my-margin)', prefix: 'm', type: 'margin' });
  // → { type: 'margin', value: 'var(--my-margin)', raw: 'm-(--my-margin)', arbitrary: false, customProperty: true }
  ```

### 3) Arbitrary value support
- Support patterns like `text-[#50d71e]`, `m-[5px]` using `extractArbitraryValue` and appropriate value checkers.
- Mark returned objects with `arbitrary: true`, `customProperty: false`.
- **Return object structure must be consistent across all utilities.**

### 4) Unified return object structure
- Always return objects with `{ type, value, raw, arbitrary, customProperty, preset? }`.
- `value`: the logical value extracted from the token (not the resolved value).
- `preset`: the context lookup path, if relevant (e.g., `spacing.4`, `colors.red.500`).
- **Tests must expect all fields as returned by the parser, not a simplified or legacy structure.**

### 5) ⚠️ Spacing/Number-based Preset Parsing
- When parsing spacing, fontSize, or any numeric preset, always convert the matched number to a string before theme lookup:
  - Example: `theme.spacing[String(val)]` or `theme.spacing[val]` where `val` is already a string from regex.
- When writing mock theme objects for tests, always use string keys for all numeric values (e.g., `'4': 16`, not `4: 16`).
- If you get `undefined` from the theme, check your key type!
- **Spacing utilities must always return the full theme path in the `preset` field.**

---

## 1.5. Troubleshooting & Debugging Checklist (NEW)

- **Regex Issues:**
  - Double-check regex patterns for typos (e.g., `[w-]+` should be `[\w-]+`).
  - If all preset parsing fails, check for regex errors first.
- **Theme Key Type:**
  - If a valid preset returns `null`, ensure theme keys are strings, not numbers.
- **Test Expectation Mismatch:**
  - If tests fail but parser output is correct, update test expectations to match the parser's actual return structure (including all fields like `preset`, `customProperty`, etc.).
- **Return Structure Consistency:**
  - All spacing and color utilities must return objects with the same field structure for preset, custom property, and arbitrary value cases.
- **Debug Logging:**
  - Use detailed logs in parser/test debugging to trace field mismatches and lookup failures.
- **borderSpacing은 theme context를 사용하지 않으므로, context 관련 버그는 신경 쓸 필요 없음.**
- **borderSpacing은 숫자/커스텀 프로퍼티/임의값만 파싱하며, theme preset, negative prefix, direction 등은 무시함.**

## 1.6. 실전 디버깅/리팩터링 사례: inset 파서(2024-06)

### 주요 교훈 및 실전 팁
- **정규식 순서의 중요성**: direction prefix가 겹칠 때(예: 'inset', 'inset-x', 'inset-y'), 반드시 긴 prefix부터 나열해야 한다. (예: `/^(inset-x|inset-y|inset|top|...)-(.+)$/`)
- **extractArbitraryValue, parseCustomPropertyUtility 사용 시**: 항상 음수(-) prefix가 제거된 토큰(t)을 넘겨야 한다. 원본 토큰(originalToken)은 반환 객체의 raw 필드에만 사용.
- **isLengthValue 개선**: 음수(-) 값도 체크할 수 있도록 정규식 맨 앞에 `-?` 추가. (예: `-10%`, `-1.5rem` 등)
- **isCalcFunction 도입**: calc() 함수(`calc(100%-4rem)`, `-calc(...)`)도 지원해야 하므로 별도 함수로 분리.
- **arbitrary value, custom property, calc, var 등 다양한 값 지원**: inset, spacing 계열 파서는 다양한 CSS 값 패턴을 모두 지원해야 하며, 각 유틸리티 함수의 역할을 명확히 분리.
- **테스트와 파서 반환 구조 완전 일치**: value 타입, negative, arbitrary, customProperty 등 모든 필드를 테스트 기대값과 1:1로 맞춰야 한다. (테스트 실패 원인의 90%는 구조/필드 미일치)
- **상세 로그로 prefix, 값 추적**: 디버깅 시 console.log로 prefix, 토큰, 추출값을 찍어가며 실제 파서 동작을 추적하면 빠르게 원인을 찾을 수 있다.

### 실전 적용 예시
- inset-x, inset-y, inset 등 prefix가 겹치는 경우, 정규식 순서만 바꿔도 모든 파싱 실패가 해결됨
- extractArbitraryValue, parseCustomPropertyUtility에 음수 제거된 토큰을 넘기지 않으면 custom/arbitrary value가 추출되지 않음
- isLengthValue가 음수/소수/calc를 지원하지 않으면 -10%, calc(100%-4rem) 등 모든 케이스가 실패함
- isCalcFunction을 도입해 calc()도 지원하면 Tailwind와 완벽히 호환됨
- 테스트와 파서 반환 구조가 완전히 일치해야만 모든 테스트가 통과함

---

## 2. Parser Implementation Example (color & spacing)

### Using parseContextColorUtility (color)
```ts
import { parseContextColorUtility } from '../utils/colorParser';

export function parseBackgroundColor(token: string, context?: CssmaContext): any | null {
  // 1. context-based palette lookup (with opacity)
  const result = parseContextColorUtility({ token, prefix: 'bg', type: 'background-color', context, allowOpacity: true });
  if (result) return result;

  // 2. custom property, arbitrary value ...
}
```

### Using parseContextSpacingUtility (spacing)
```ts
import { parseContextSpacingUtility } from '../utils/spacingParser';

export function parseMargin(token: string, context?: CssmaContext): any | null {
  // 1. context-based spacing lookup
  const result = parseContextSpacingUtility({ token, prefix: 'm', type: 'margin', context });
  if (result) return result;

  // 2. custom property, arbitrary value ...
}
```

---

## 3. Test Implementation Checklist

### 1) Test with both mock context and defaultConfig context
- **Mock context**: minimal palette for fast, focused unit tests.
- **defaultConfig context**: real palette for integration/compatibility tests.
- **Always use string keys for numeric theme values in mocks!**
- **Test expectations must match the parser's actual return structure, including all fields.**

### 2) Always check that `value` is the logical token value
- Never expect the resolved value in `value` (e.g., for spacing, expect '4', not '16' or '1rem').

### 3) Always test invalid/null cases
- Palette object (not a string) should return null.
- Nonexistent color/shade or spacing key should return null.
- Invalid arbitrary values should return null.

### 4) Custom property and arbitrary value structure
- For custom property: `{ type, value, raw, arbitrary: false, customProperty: true }` (spacing), `{ ...arbitrary: true, customProperty: true }` (color)
- For arbitrary value: `{ type, value, raw, arbitrary: true, customProperty: false }`
- For preset: `{ type, value, raw, arbitrary: false, customProperty: false, preset: 'theme.path' }`
- **Tests must expect all fields as returned by the parser.**

---

## 4. Test Example

```ts
expect(parseTextColor("text-red-500", context)).toEqual({
  type: "color",
  value: "red-500",
  raw: "text-red-500",
  arbitrary: false,
  customProperty: false,
  preset: "colors.red.500"
});
expect(parseTextColor("text-red", context)).toBeNull(); // palette object is invalid
expect(parseTextColor("text-[#50d71e]", context)).toEqual({
  type: "color",
  value: "#50d71e",
  raw: "text-[#50d71e]",
  arbitrary: true,
  customProperty: false
});

expect(parseMargin("m-4", context)).toEqual({
  type: "margin",
  value: "16",
  raw: "m-4",
  arbitrary: false,
  customProperty: false,
  preset: "spacing.4"
});
expect(parseMargin("m-(--my-margin)", context)).toEqual({
  type: "margin",
  value: "var(--my-margin)",
  raw: "m-(--my-margin)",
  arbitrary: false,
  customProperty: true
});
expect(parseMargin("m-[5px]", context)).toEqual({
  type: "margin",
  value: "5px",
  raw: "m-[5px]",
  arbitrary: true,
  customProperty: false
});
```

---

## 5. Practical Tips

- Apply the same pattern to all context-based utilities (spacing, color, etc.).
- Only the context.theme path changes; the rest of the structure and tests are nearly identical.
- Use utils (extractArbitraryValue, isColorValue, etc.) for consistency.
- **Always use string keys for numeric theme values in all test mocks and real themes.**
- **Always expect the full theme path in the `preset` field for all preset-based utilities.**
- **Test expectations must always match the parser's actual output, including all fields.**
- For gap/gap-x/gap-y, always use `parseContextGapUtility` (not parseContextSpacingUtility).

---

## 5.5. Shared Utility Functions Reference

### 1. General Parser Utils (`utils.ts`)

- **extractArbitraryValue(token, prefix)**: prefix로 시작하는 토큰에서 `[brackets]` 내부 값을 추출합니다. 예) `inset-x-[50%]` → `50%`
- **isLengthValue(val)**: CSS 길이 단위(정수, 소수, 음수, 단위, %) 판별. 예) `-10%`, `1.5rem`, `100%` 모두 true
- **isCalcFunction(val)**: CSS `calc()` 함수(양수/음수) 판별. 예) `calc(100%-4rem)`, `-calc(100%-4rem)` 모두 true
- **isVarFunction(val)**: CSS custom property 함수 판별. 예) `var(--foo)`
- **isColorValue(val)**: CSS 색상값(HEX, rgb, hsl, oklch, okhsl) 판별. 예) `#fff`, `oklch(0.6 0.2 120)`
- **isNumberValue(val)**: 순수 숫자(정수/실수, 음수 포함) 판별. 예) `-1.5`, `10`

예시 코드:
```ts
extractArbitraryValue('inset-x-[50%]', 'inset-x'); // '50%'
isLengthValue('-10%'); // true
isCalcFunction('calc(100%-4rem)'); // true
```

실전 팁:
- extractArbitraryValue: prefix는 항상 음수(-) 제거 후 사용
- isLengthValue: calc()는 false, 음수/소수/단위 없는 숫자/퍼센트 모두 true
- isCalcFunction: 음수 부호도 true

---

### 2. Color Parser Utils (`colorParser.ts`)
- **parseContextColorUtility({ token, prefix, type, context, allowOpacity }):**
  - context 기반 색상 preset 파싱 (예: `bg-blue-200`, `border-red-500/75`)
  - 반환: `{ type, value, raw, arbitrary, customProperty, preset, opacity? }`
  - color 계열 파서의 첫 단계로 사용

---

### 3. Spacing Parser Utils (`spacingParser.ts`)
- **parseContextSpacingUtility({ token, prefix, type, context }):**
  - context 기반 spacing preset 파싱 (예: `m-4`, `px-2`)
  - 반환: `{ type, value, direction, raw, arbitrary, negative, preset }`
  - margin, padding 등 spacing 계열 파서의 첫 단계로 사용

- **parseContextGapUtility({ token, type, context }):**
  - gap/gap-x/gap-y 전용 context 기반 gap preset 파싱
  - 반환: `{ type, value, direction, raw, arbitrary, customProperty, preset }`
  - gap 계열 파서에서만 사용

- **parseNumericSpacingToken(token, { prefix, type, axis, raw }):**
  - theme context 없이 숫자 기반 spacing 파싱 (예: `border-spacing-2`)
  - 반환: `{ type, axis, value, raw, arbitrary: false, customProperty: false }`
  - borderSpacing 등 theme lookup 없는 spacing 파서에서 사용

---

### 4. Custom Property Parser Utils (`customPropertyParser.ts`)
- **parseCustomPropertyUtility({ token, prefix, type }):**
  - custom property 유틸리티 파싱 (예: `bg-(--my-color)`, `m-(--my-margin)`)
  - 반환: `{ type, value, raw, arbitrary, customProperty, ... }`
  - 모든 파서에서 custom property fallback 용도로 사용

---

### 5. Negative Prefix Handling (spacing 계열)
- **Negative prefix(-) 분리 및 처리 패턴**
  - spacing 계열(margin, scrollMargin 등)에서만 사용
  - `-`로 시작하면 negative: true, 아니면 false
  - raw 필드는 항상 원본 입력값 사용
  - negative prefix가 2회(`--`)면 무효(null 반환)

---

### 6. 기타
- **모든 파서 반환 객체는 `{ type, value, raw, arbitrary, customProperty, ... }` 구조를 통일**
- 각 파서별로 context 기반 preset, custom property, arbitrary value, negative prefix(해당시) 순서로 파싱

By following these advanced practices, all cssma-v3 parsers and tests will remain robust, extensible, and consistent as the codebase evolves.

**By following this guide, all cssma-v3 parsers and tests will be robust, extensible, and consistent!**
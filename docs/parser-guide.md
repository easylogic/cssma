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

---

## 1. Parser Implementation Checklist

### 1) Context-based preset lookup (with parseContextColorUtility)
- Use `parseContextColorUtility` for all context-based color utilities (e.g. bg, border, accent, outline, caret).
- Pass `{ token, prefix, type, context, allowOpacity }` to the utility:
  - `token`: the full utility class (e.g. 'bg-blue-200/50')
  - `prefix`: the utility prefix (e.g. 'bg', 'border', 'accent', ...)
  - `type`: the return type string (e.g. 'background-color')
  - `context`: CssmaContext with theme getter
  - `allowOpacity`: set to `true` if `/opacity` is supported
- **Only treat the result as valid if the returned value is not null.**
- Example usage:
  ```ts
  const result = parseContextColorUtility({ token, prefix: 'bg', type: 'background-color', context, allowOpacity: true });
  if (result) return result;
  ```
- If not using parseContextColorUtility, fallback to custom property/arbitrary value logic as needed.

### 2) Custom property parsing (with parseCustomPropertyUtility)
- `parseCustomPropertyUtility`는 custom property 파싱에 사용합니다.
- 파라미터는 `{ token, prefix, type }` 객체 형태로 전달합니다.
- **custom property + opacity 조합(`bg-(--my-color)/50` 등)은 지원하지 않습니다.**
- 예시:
  ```ts
  parseCustomPropertyUtility({ token: 'bg-(--my-color)', prefix: 'bg', type: 'background-color' });
  // → { type: 'background-color', value: '--my-color', raw: 'bg-(--my-color)', arbitrary: true, customProperty: true }
  ```

### 3) Arbitrary value support
- Support patterns like `text-[#50d71e]`, `text-[oklch(...)]` using `extractArbitraryValue` and `isColorValue` utils.
- Mark returned objects with `arbitrary: true`, `customProperty: false`.

### 4) Unified return object structure
- Always return objects with `{ type, value, raw, arbitrary, customProperty, preset? }`.
- `value`: the logical value extracted from the token (not the resolved color code).
- `preset`: the context lookup path, if relevant.

### 5) ⚠️ Spacing/Number-based Preset Parsing
- When parsing spacing, fontSize, or any numeric preset, always convert the matched number to a string before theme lookup:
  - Example: `theme.spacing[String(val)]` or `theme.spacing[val]` where `val` is already a string from regex.
- When writing mock theme objects for tests, always use string keys for all numeric values (e.g., `'4': 16`, not `4: 16`).
- If you get `undefined` from the theme, check your key type!

---

## 2. Parser Implementation Example (color)

### Using parseContextColorUtility
```ts
import { parseContextColorUtility } from '../utils/colorParser';

export function parseBackgroundColor(token: string, context?: CssmaContext): any | null {
  // 1. context-based palette lookup (with opacity)
  const result = parseContextColorUtility({ token, prefix: 'bg', type: 'background-color', context, allowOpacity: true });
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

### 2) Always check that `value` is the logical token value
- Never expect the resolved color code in `value`.

### 3) Always test invalid/null cases
- Palette object (not a string) should return null.
- Nonexistent color/shade should return null.
- Invalid arbitrary values should return null.

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
```

---

## 5. Practical Tips

- Apply the same pattern to other parsers (e.g., backgroundColor, borderColor, etc.).
- Only the context.theme path changes; the rest of the structure and tests are nearly identical.
- Use utils (extractArbitraryValue, isColorValue, etc.) for consistency.
- **Always use string keys for numeric theme values in all test mocks and real themes.**

---

## 6. Documentation/Sharing

- Save this guide as `/docs/parser-guide.md`.
- Reference it for all new parser/test development to ensure consistency and maintainability.

---

## 7. Advanced Best Practices & Clarifications (2024-06 backgroundColor refactor)

### 1) Opacity Support (e.g., bg-blue-200/50) with parseContextColorUtility
- If a color utility supports `/opacity` (e.g., `bg-blue-200/50`), set `allowOpacity: true` in the call to `parseContextColorUtility`.
- Example:
  ```ts
  const result = parseContextColorUtility({ token, prefix: 'bg', type: 'background-color', context, allowOpacity: true });
  if (result) return result;
  ```
- The returned object will include an `opacity` field if present in the token.
- `value` should always be the logical color value (e.g., `blue-200`), and `opacity` should be an integer (0~100).
- Example:
  ```ts
  expect(parseBackgroundColor('bg-blue-200/50', context)).toEqual({
    type: 'background-color',
    value: 'blue-200',
    raw: 'bg-blue-200/50',
    arbitrary: false,
    customProperty: false,
    preset: 'colors.blue.200',
    opacity: 50
  });
  ```

### 2) customProperty, arbitrary, preset Field Structure
- **Custom property** (e.g., `bg-(--my-bg)`): `{ arbitrary: true, customProperty: true }`
- **Arbitrary value** (e.g., `bg-[#50d71e]`): `{ arbitrary: true, customProperty: false }`
- **Preset (palette)**: `{ arbitrary: false, customProperty: false, preset: 'colors.xxx.xxx' }`
- All returned objects must follow this structure for consistency.

### 3) Context-based Invalid Handling
- If `parseContextColorUtility` returns `null`, treat as invalid (e.g., palette object, undefined, or null from context.theme).
- If called without a context, also return `null`.
- Example:
  ```ts
  expect(parseBackgroundColor('bg-red', context)).toBeNull(); // palette object is invalid
  expect(parseBackgroundColor('bg-foo', context)).toBeNull(); // not in palette
  ```

### 4) Explicit Context in Tests
- All tests must explicitly pass a context (either mock or defaultConfig).
- Always test both mock context (minimal palette) and defaultConfig context (real palette) for robust coverage.
- Example:
  ```ts
  expect(parseBackgroundColor('bg-red-500', mockContext)).toEqual({
    type: 'background-color',
    value: 'red-500',
    raw: 'bg-red-500',
    arbitrary: false,
    customProperty: false,
    preset: 'colors.red.500'
  });
  expect(parseBackgroundColor('bg-red-500', defaultCtx)).toEqual({
    type: 'background-color',
    value: 'red-500',
    raw: 'bg-red-500',
    arbitrary: false,
    customProperty: false,
    preset: 'colors.red.500'
  });
  ```

### 5) custom property 파싱 시 opacity 분리 문법은 허용하지 않음(테스트/문서에서도 기대하지 말 것)
- context 기반 팔레트 파싱과 custom property 파싱은 각각 전용 유틸리티를 사용하여 일관성 유지

By following these advanced practices, all cssma-v3 parsers and tests will remain robust, extensible, and consistent as the codebase evolves.

**By following this guide, all cssma-v3 parsers and tests will be robust, extensible, and consistent!** 
# 📝 cssma-v3 Parser & Test Implementation Guide

This guide summarizes best practices and checklists for implementing and testing utility parsers in cssma-v3, based on the context-driven color parser refactor. Use this as a reference for all future parser and test development.

---

## 1. Parser Implementation Checklist

### 1) Context-based preset lookup
- Use `context.theme('colors.<colorKey>')` (or similar for other utilities) to look up values.
- Extract `<colorKey>` from the token, replacing all `-` with `.` to match palette structure.
- **Only treat the result as valid if the final value is a string** (e.g., a color code). If it's an object, undefined, or null, treat as invalid.

### 2) Custom property support
- Support patterns like `text-(--my-color)` using a dedicated regex.
- Mark returned objects with `customProperty: true`.

### 3) Arbitrary value support
- Support patterns like `text-[#50d71e]`, `text-[oklch(...)]` using `extractArbitraryValue` and `isColorValue` utils.
- Mark returned objects with `arbitrary: true`, `customProperty: false`.

### 4) Unified return object structure
- Always return objects with `{ type, value, raw, arbitrary, customProperty, preset? }`.
- `value`: the logical value extracted from the token (not the resolved color code).
- `preset`: the context lookup path, if relevant.

---

## 2. Parser Implementation Example (color)

```ts
const match = token.match(/^text-([a-zA-Z0-9_.-]+)$/);
if (match && context?.theme) {
  const colorKey = match[1].replace(/-/g, '.');
  const themePath = `colors.${colorKey}`;
  const themeValue = context.theme(themePath);
  if (typeof themeValue === 'string') {
    return {
      type: 'color',
      value: match[1],
      raw: token,
      arbitrary: false,
      customProperty: false,
      preset: themePath
    };
  }
}
```

---

## 3. Test Implementation Checklist

### 1) Test with both mock context and defaultConfig context
- **Mock context**: minimal palette for fast, focused unit tests.
- **defaultConfig context**: real palette for integration/compatibility tests.

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

---

## 6. Documentation/Sharing

- Save this guide as `/docs/parser-guide.md`.
- Reference it for all new parser/test development to ensure consistency and maintainability.

---

**By following this guide, all cssma-v3 parsers and tests will be robust, extensible, and consistent!** 
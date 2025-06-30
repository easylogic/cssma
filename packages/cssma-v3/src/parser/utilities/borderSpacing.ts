import type { CssmaContext } from "../../types";
import { parseNumericSpacingToken } from "../utils/spacingParser";
import { parseCustomPropertyUtility } from "../utils/customPropertyParser";
import { extractArbitraryValue, isLengthValue, isVarFunction } from "../utils";

// Tailwind border-spacing utility parser
// https://tailwindcss.com/docs/border-spacing

const axisMap = { "": "both", x: "x", y: "y" };

export function parseBorderSpacing(
  token: string,
  context?: CssmaContext
): any | null {
  if (token.startsWith("--") || token.startsWith("-")) return null;
  const originalToken = token;

  // 1. 구조 파싱: border-spacing(-x|-y)?-(...)
  const m = token.match(/^border-spacing(?:-([xy]))?-(.+)$/);
  if (!m) return null;
  const axisKey = m[1] || "";
  const axis = axisMap[axisKey as keyof typeof axisMap];
  const prefix = axisKey ? `border-spacing-${axisKey}` : "border-spacing";

  // 2. 숫자 매칭 (공통 함수)
  const numeric = parseNumericSpacingToken(token, {
    prefix,
    type: "border-spacing",
    axis,
    raw: originalToken,
  });
  if (numeric) return numeric;

  // 3. custom property
  const customProp = parseCustomPropertyUtility({
    token,
    prefix,
    type: "border-spacing",
  });
  if (customProp) {
    return {
      type: "border-spacing",
      axis,
      value: customProp.value,
      raw: originalToken,
      arbitrary: true,
      customProperty: true,
    };
  }

  // 4. arbitrary value
  const arbitraryValue = extractArbitraryValue(token, prefix);
  if (
    arbitraryValue !== null &&
    (isLengthValue(arbitraryValue) || isVarFunction(arbitraryValue))
  ) {
    return {
      type: "border-spacing",
      axis,
      value: arbitraryValue,
      raw: originalToken,
      arbitrary: true,
    };
  }

  return null;
}

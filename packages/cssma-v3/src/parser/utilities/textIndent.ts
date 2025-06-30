// Tailwind text-indent utility parser
// https://tailwindcss.com/docs/text-indent

import { parseNumericSpacingToken } from "../utils/spacingParser";
import { extractArbitraryValue, isLengthValue, isVarFunction } from "../utils";
import { parseCustomPropertyUtility } from "../utils/customPropertyParser";

export function parseTextIndent(token: string): any | null {
  if (token.startsWith("--")) return null;
  const originalToken = token;
  let negative = false;
  let t = token;
  if (token.startsWith("-")) {
    negative = true;
    t = token.slice(1);
  }
  // 1. 숫자 매칭 (공통 함수)
  const numeric = parseNumericSpacingToken(t, {
    prefix: "indent",
    type: "text-indent",
    axis: "all",
    raw: originalToken,
  });
  if (numeric) {
    return {
      type: "text-indent",
      value: `${numeric.value}`,
      raw: originalToken,
      arbitrary: false,
      customProperty: false,
      negative,
    };
  }
  // 2. indent-px
  if (t === "indent-px") {
    return {
      type: "text-indent",
      value: "1px",
      raw: originalToken,
      arbitrary: false,
      customProperty: false,
      negative,
    };
  }
  // 3. custom property (공통 유틸)
  const custom = parseCustomPropertyUtility({ token: originalToken, prefix: "indent", type: "text-indent" });
  if (custom) {
    return { ...custom, raw: originalToken, negative: false, customProperty: true, arbitrary: false };
  }
  // 4. arbitrary value (prefix를 'indent'로 전달)
  const arb = extractArbitraryValue(t, "indent");
  if (arb && (isLengthValue(arb) || isVarFunction(arb))) {
    return {
      type: "text-indent",
      value: arb,
      raw: originalToken,
      arbitrary: true,
      customProperty: false,
      negative: false,
    };
  }
  return null;
} 
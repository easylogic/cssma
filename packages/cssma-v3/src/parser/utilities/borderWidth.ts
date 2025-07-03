// Tailwind border-width utility parser
// https://tailwindcss.com/docs/border-width

import {
  parseContextBorderWidthUtility,
  parseNumericSpacingToken,
} from "../utils/spacingParser";
import { extractArbitraryValue, isLengthValue } from "../utils";
import { parseCustomPropertyUtility } from "../utils/customPropertyParser";
import type { CssmaContext } from "../../types";

export function parseBorderWidth(
  token: string,
  context?: CssmaContext
): any | null {
  // 1. context 기반 preset lookup (theme.borderWidth)
  const preset = parseContextBorderWidthUtility({
    token,
    prefix: "border",
    type: "border-width",
    context,
  });
  if (preset)
    return {
      ...preset,
      customProperty: false,
      arbitrary: false,
      raw: token,
      direction: preset.direction ?? "all",
    };

  // 1. 구조 파싱: border(-x|-y|-t|-b|-l|-r|-s|-e|-se|-ee|-es|-ss)?-(...)
  const m = token.match(/^border(?:-([xysetrbl]))?(?:-(.+))?$/);
  if (!m) return null;
  const dir = m[1] || "";
  const val = m[2] ?? "DEFAULT";
  const direction = dir || "all";
  const prefix = dir ? `border-${dir}` : "border";

  // 1. context 기반 preset lookup (theme.borderWidth)
  let themeValue: string | undefined = undefined;
  if (context && context.theme) {
    // theme lookup: val이 DEFAULT 등 키면 실제 값으로 변환
    themeValue = context.theme(`borderWidth.${val}`);
    if (themeValue) {
      return {
        type: "border-width",
        value: themeValue,
        direction,
        raw: token,
        arbitrary: false,
        customProperty: false,
      };
    }
  }

  // 2. 숫자 매칭 (공통 함수)
  const numeric = parseNumericSpacingToken(token, {
    prefix,
    type: "border-width",
    axis: dir ?? "all",
    raw: token,
  });
  if (numeric)
    return {
      ...numeric,
      customProperty: false,
      arbitrary: false,
      raw: token,
      direction: dir ?? "all",
    };

  // 2. direction(side) prefix 추출 (border-t-(--foo) 등)
  const custom = parseCustomPropertyUtility({
    token,
    prefix,
    type: "border-width",
  });
  if (custom) {
    return {
      ...custom,
      direction,
      customProperty: true,
    };
  }
  // arbitrary value
  const arbitrary = extractArbitraryValue(token, prefix);
  if (arbitrary !== null && isLengthValue(arbitrary)) {
    return {
      type: "border-width",
      value: arbitrary,
      direction,
      raw: token,
      arbitrary: true,
      customProperty: false,
    };
  }

  return null;
}

import { CssmaContext } from './../../theme-types';
import { parseModifierToken } from "../utils";

// Tailwind 공식 지원 modifier prefix/값 (최대한 고정값)
export const MODIFIER_PREFIXES = [
  // Pseudo-classes
  "hover",
  "focus",
  "active",
  "visited",
  "checked",
  "disabled",
  "enabled",
  "first",
  "last",
  "odd",
  "even",
  "empty",
  "required",
  "optional",
  "valid",
  "invalid",
  "user-valid",
  "user-invalid",
  "in-range",
  "out-of-range",
  "placeholder-shown",
  "autofill",
  "read-only",
  "details-content",
  "**",
  "*",
  // Responsive
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "xs",
  "3xl",
  "max",
  "min",
  // Media
  "dark",
  "light",
  "motion-safe",
  "motion-reduce",
  "print",
  // Group/Peer
  "group",
  "peer",
  // Attribute/Aria/Data
  "aria",
  "data",
  "[", // [foo=bar]
  // Logical
  "has",
  "not",
  // Container/Breakpoint
  "@container", // @container, @min-[...]
  "@supports",
  "@layer",
  "@min",
  "@max",
  // Nth
  "nth-last-of-type",
  "nth-of-type",
  "nth",
  // Supports
  "supports",
  // 기타 필요한 prefix 추가
];

export function parseModifier(token: string, context?: CssmaContext) {
  const result = parseModifierToken(token, MODIFIER_PREFIXES, true, true);
  if (result) {

    switch (result.prefix) {
      case "@max":
      case "@min":

        if (context?.theme("screens", result.value)) {
          result.preset = true;
        }

        break;
      case "max":
      case "min":
        if (context?.theme("breakpoints", result.value)) {
          result.preset = true;
        }
        break;
    }

    return result;
  }
  return { type: 'unknown', raw: token };
}

import { CssmaContext } from './../../theme-types';
import { ParsedClassToken, parseModifierToken } from "../utils";

// Tailwind 공식 지원 modifier prefix/값 (최대한 고정값)
export const MODIFIER_PREFIXES = [
  "not-supports",
  // Pseudo-classes
  "hover",
  "focus-visible",
  "focus-within",
  "focus",
  "active",
  "visited",
  "checked",
  "disabled",
  "enabled",
  "first-line",
  "first-letter",
  "first",
  "last-of-type",  
  "last",
  "only-of-type",
  "only",
  "empty",
  "before",
  "after",
  "odd",
  "even",
  "open",
  "inert",
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
  "placeholder",
  "forced-colors",
  "not-forced-colors",
  "inverted-colors",
  "pointer",
  "any-pointer",
  "portrait",
  "landscape",
  "noscript",
  "autofill",
  "read-only",
  "details-content",
  "**",
  "*",
  "rtl",
  "ltr",
  "indeterminate",
  "default",
  "selection",
  "marker",
  "backdrop",
  "file",
  "only",
  "dir",
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
  "in",
  // Container/Breakpoint
  "@container", // @container, @min-[...]
  "@supports",
  "@min",
  "@max",
  // Nth
  "nth-last-of-type",
  "nth-of-type",
  "nth",
  // Supports
  "supports",
  "starting",
  // 기타 필요한 prefix 추가
  "theme",
  "target",
];

export function parseModifierBase(token: string, context?: CssmaContext): ParsedClassToken | { type: 'unknown'; raw: string } {
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

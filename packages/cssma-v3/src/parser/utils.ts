/**
 * Checks if a value is a valid CSS length (e.g. 2vw, 1.5rem, 10px, 100%, -10%, -1.5rem)
 */
export function isLengthValue(val: string): boolean {
  return /^-?\d+(\.\d+)?(px|em|rem|vw|vh|%|ch|ex|cm|mm|in|pt|pc)?$/.test(val);
}

/**
 * Checks if a value is a valid CSS color (hex, rgb, hsl, oklch, okhsl)
 */
export function isColorValue(val: string): boolean {
  return (
    /^(#([0-9a-fA-F]{3,8}))$/.test(val) ||
    /^rgb(a)?\(/.test(val) ||
    /^hsl(a)?\(/.test(val) ||
    /^oklch\(/.test(val) ||
    /^okhsl\(/.test(val)
  );
}

/**
 * Checks if a value is a pure number (integer or float, 음수 포함)
 */
export function isNumberValue(val: string): boolean {
  return /^-?\d+(\.\d+)?$/.test(val);
}

/**
 * Checks if a value is a valid CSS var() function (e.g. var(--foo))
 */
export function isVarFunction(val: string): boolean {
  return /^var\(--[a-zA-Z0-9-_]+\)$/.test(val);
}

/**
 * Checks if a value is a valid CSS calc() function (e.g. calc(100%-4rem), -calc(100%-4rem))
 */
export function isCalcFunction(val: string): boolean {
  return /^-?calc\(.+\)$/.test(val);
}

/**
 * Selector 계열 modifier 타입 가드
 * (pseudo, pseudo-element, group, peer, state, logical, nth, nth-of-type, nth-last-of-type, attribute, aria, data)
 */
export function isSelectorModifier(mod: ParsedClassToken): boolean {
  switch (mod.prefix) {
    case "pseudo":
    case "pseudo-element":
    case "group":
    case "peer":
    case "state":
    case "logical":
    case "nth":
    case "nth-of-type":
    case "nth-last-of-type":
    case "attribute":
    case "aria":
    case "data":
      return true;
    default:
      return false;
  }
}

export type ParsedClassToken = {
  type: "utility" | "modifier";
  raw: string;
  prefix: string;
  value: string;
  slash?: string;
  customProperty: boolean;
  arbitrary: boolean;
  arbitraryType?: string;
  arbitraryValue?: string;
  numeric: boolean;
  preset: boolean;
  negative: boolean;
  important: boolean;
};

/**
 * 공통 유틸리티 토큰 파서
 * @param token 전체 토큰 (예: border-x-2, border-t-[2vw], border-(--foo))
 * @param prefixes 유틸리티 prefix 배열 (예: ['border', 'm', 'p'])
 */
export function parseBaseToken(
  token: string,
  prefixes: string[],
  hasSlash: boolean = true,
  skipSort: boolean = false
): ParsedClassToken | null {
  if (!Array.isArray(prefixes) || prefixes.length === 0) return null;
  let raw = token;
  let important = false;
  if (token.startsWith("!")) {
    important = true;
    token = token.slice(1);
  }
  let negative = false;
  if (token.startsWith("-")) {
    negative = true;
    token = token.slice(1);
  }
  const sorted = skipSort ? prefixes : prefixes.slice().sort((a, b) => b.length - a.length);
  for (const prefix of sorted) {
    // 1. 토큰이 프리픽스와 완전히 일치하는 경우
    if (token === prefix) {
      return {
        raw,
        prefix,
        value: "",
        slash: undefined,
        customProperty: false,
        arbitrary: false,
        arbitraryType: undefined,
        arbitraryValue: undefined,
        numeric: false,
        preset: false,
        negative,
        important,
        type: "utility" as const,
      };
    }

    // 2. 토큰이 프리픽스와 완전히 일치하는 경우
    if (token.startsWith(prefix + "-")) {
      let value = token.slice(prefix.length + 1);
      if (value === "") return null;
      let slash: string | undefined = undefined;

      // arbitrary 패턴 slash 분리 처리
      const arbitraryMatch = value.match(/^(\[.+\])(?:\/(.+))?$/);
      const customMatch = value.match(/^(\(.+\))(?:\/(.+))?$/);

      let arbitraryType: string | undefined = undefined;
      let arbitraryValue: string | undefined = undefined;
      let finalValue: string | undefined = undefined;

      // 1. arbitrary/customProperty 패턴 slash 분리 처리
      if (arbitraryMatch) {
        if (hasSlash && arbitraryMatch[2]) {
          // slash 분리
          value = arbitraryMatch[1];
          slash = arbitraryMatch[2];
          console.log("arbitraryMatch", arbitraryMatch, value, slash);
        } else {
          // slash 분리 안 함: 전체를 value로
          value = arbitraryMatch[1]; // 대괄호 포함 전체
          slash = undefined;
        }

        const inner = value.slice(1, -1);
        finalValue = inner;
        const funcMatch = inner.match(/^([a-zA-Z][a-zA-Z0-9_-]*)\((.*)\)$/);
        if (funcMatch) {
          arbitraryType = funcMatch[1];
          arbitraryValue = funcMatch[2];
        } else {
          arbitraryType = inner.startsWith("#") ? "hex" : undefined;
          arbitraryValue = inner;
        }

      } else if (customMatch) {
        if (hasSlash && customMatch[2]) {
          value = customMatch[1];
          slash = customMatch[2];
        } else {
          value = customMatch[1]; // 괄호 포함 전체
          slash = undefined;
        }

        const inner = value.slice(1, -1);
        finalValue = inner;

      } else {
        // 2. 그 외에는 slash 분리 적용
        if (typeof value === "string" && hasSlash) {
          const slashIndex = value.lastIndexOf("/");
          if (slashIndex > 0) {
            slash = value.slice(slashIndex + 1);
            value = value.slice(0, slashIndex);
          }
        }

        finalValue = value;
      }

      // 2. value(슬래시 없는 값)에 대해 arbitrary/customProperty 처리
      let customProperty = !!customMatch;
      let arbitrary = !!arbitraryMatch;

      const numeric = /^-?\d*\.?\d+$/.test(finalValue);
      return {
        raw,
        prefix,
        value: finalValue.replace(/_/g, " "),
        slash,
        customProperty,
        arbitrary,
        arbitraryType,
        arbitraryValue: arbitraryValue?.replace(/_/g, " "),
        numeric,
        preset: false,
        negative,
        important,
        type: "utility" as const,
      };
    }
  }
  return null;
}


/**
 * 공통 Variant 토큰 파서
 * @param token 전체 토큰 (예: hover:border-x-2, hover:border-t-[2vw], hover:border-(--foo))
 * @param prefixes 모듈 prefix 배열 (예: ['hover', 'focus', 'active', 'group-hover', 'group-focus', 'group-active'])
 */
export function parseModifierToken(
  token: string,
  prefixes: string[],
  hasSlash: boolean = true,
  skipSort: boolean = false
): ParsedClassToken | null {

  if (token.startsWith("[")) {

    if (!token.endsWith("]")) {
      return null;
    }

    const value = token.slice(1, -1);
    if (value === "") {
      return null;
    }

    const finalValue = value.replace(/_/g, " ");

    return {
      type: "modifier" as const,
      raw: token,
      prefix: "arbitrary",
      value: finalValue,
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "attribute",
      arbitraryValue: finalValue,
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    };
  }


  const result = parseBaseToken(token, prefixes, hasSlash, skipSort);
  if (result) {
    return {
      ...result,
      preset: false,
      type: "modifier" as const,
    };
  }
  return null;
}
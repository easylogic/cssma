// Tailwind-style custom property utility parser (e.g. bg-(--my-color), bg-(--my-color)/50)
// Supports optional opacity (e.g. /50)
export interface CustomPropertyParseResult {
  type: string;
  value: string;
  raw: string;
  arbitrary: boolean;
  customProperty: boolean;
  opacity?: number;
}

/**
 * Parse custom property utility (e.g. bg-(--my-color))
 * @param { token, prefix, type } - 객체 파라미터 방식으로 변경
 * @returns CustomPropertyParseResult or null
 */
export function parseCustomPropertyUtility({
  token,
  prefix,
  type
}: {
  token: string;
  prefix: string;
  type: string;
}): CustomPropertyParseResult | null {
  // e.g. bg-(--my-color) or bg-( --my-color )
  const customProp = token.match(new RegExp(`^${prefix}-\\(\s*(--[a-zA-Z0-9-_]+)\s*\\)$`));
  if (customProp) {
    return {
      type,
      value: `var(${customProp[1]})`,
      raw: token,
      arbitrary: false,
      customProperty: false
    };
  }
  return null;
} 
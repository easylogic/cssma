// Tailwind border-radius utility parser
// https://tailwindcss.com/docs/border-radius

import type { CssmaContext } from '../../types';
import { extractArbitraryValue, isLengthValue } from '../utils';
import { parseCustomPropertyUtility } from '../utils/customPropertyParser';
import { parseContextBorderRadiusUtility } from '../utils/spacingParser';

export function parseBorderRadius(token: string, context?: CssmaContext): any | null {
  // 1. context 기반 preset lookup (theme.borderRadius)
  const preset = parseContextBorderRadiusUtility({ token, prefix: 'rounded', type: 'border-radius', context });
  if (preset) return { ...preset, customProperty: false, arbitrary: false, raw: token };

  // 2. direction prefix 추출 (rounded-t-[2vw] 등)
  const logicalPrefix = token.match(/^rounded-([tblres]{1,2})-/);
  if (logicalPrefix) {
    const dir = logicalPrefix[1];
    // custom property
    const custom = parseCustomPropertyUtility({ token, prefix: `rounded-${dir}`, type: 'border-radius' });
    if (custom) {
      return {
        ...custom,
        direction: dir,
        customProperty: true,
      };
    }
    // arbitrary value
    const arb = extractArbitraryValue(token, `rounded-${dir}`);
    if (arb && isLengthValue(arb)) {
      return {
        type: 'border-radius',
        direction: dir,
        value: arb,
        raw: token,
        arbitrary: true,
        customProperty: false,
      };
    }
  }
  // 3. custom property (rounded-(--my-radius))
  const custom = parseCustomPropertyUtility({ token, prefix: 'rounded', type: 'border-radius' });
  if (custom) {
    return {
      ...custom,
      direction: 'all',
      customProperty: true,
    };
  }
  // 4. arbitrary value (rounded-[2vw])
  const arb = extractArbitraryValue(token, 'rounded');
  if (arb && isLengthValue(arb)) {
    return {
      type: 'border-radius',
      value: arb,
      direction: 'all',
      raw: token,
      arbitrary: true,
      customProperty: false,
    };
  }
  return null;
} 
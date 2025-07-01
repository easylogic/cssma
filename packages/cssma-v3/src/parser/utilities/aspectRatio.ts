// Tailwind aspect-ratio utility parser
// https://tailwindcss.com/docs/aspect-ratio

import type { CssmaContext } from '../../types';
import { extractArbitraryValue, parseContextPresetUtility, parseFractionValue } from '../utils';
import { parseCustomPropertyUtility } from '../utils/customPropertyParser';

export function parseAspectRatio(token: string, context?: CssmaContext): any | null {
  // 1. context 기반 preset lookup (theme.aspectRatio)
  const preset = parseContextPresetUtility({
    token,
    prefix: 'aspect',
    type: 'aspect-ratio',
    context,
    namespace: 'aspect',
  });
  if (preset) return {
    ...preset,
    arbitrary: false,
    customProperty: false,
  };

  // 2. fraction value (aspect-16/9)
  const fraction = parseFractionValue(token, 'aspect');
  if (fraction) {
    return {
      type: 'aspect-ratio',
      value: fraction,
      raw: token,
      arbitrary: false,
      customProperty: false,
    };
  }

  // 3. custom property (aspect-(--foo))
  const custom = parseCustomPropertyUtility({ token, prefix: 'aspect', type: 'aspect-ratio' });
  if (custom) return { ...custom, raw: token, arbitrary: false, customProperty: true };

  // 4. arbitrary value (aspect-[...])
  const arbitrary = extractArbitraryValue(token, 'aspect');
  if (arbitrary !== null) {
    return {
      type: 'aspect-ratio',
      value: arbitrary,
      raw: token,
      arbitrary: true,
      customProperty: false,
    };
  }

  return null;
} 
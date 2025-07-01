// Tailwind animation utility parser
// https://tailwindcss.com/docs/animation

import type { CssmaContext } from '../../types';
import { extractArbitraryValue, isVarFunction, parseContextPresetUtility } from '../utils';
import { parseCustomPropertyUtility } from '../utils/customPropertyParser';


export function parseAnimation(token: string, context?: CssmaContext): any | null {
  // 1. context 기반 preset lookup
  const preset = parseContextPresetUtility({
    token,
    prefix: 'animate',
    type: 'animation',
    context,
    namespace: 'animation'
  });
  if (preset) return preset;

  // 2. custom property (animate-(--foo))
  const custom = parseCustomPropertyUtility({ token, prefix: 'animate', type: 'animation' });
  if (custom) return custom;

  // 3. arbitrary value (animate-[...])
  const arbitrary = extractArbitraryValue(token, 'animate');
  if (arbitrary !== null) {
    return {
      type: 'animation',
      value: arbitrary,
      raw: token,
      arbitrary: true,
      customProperty: false,
    };
  }

  return null;
} 
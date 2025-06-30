import type { CssmaContext } from '../../types';
import { parseContextGapUtility } from '../utils/spacingParser';
import { parseCustomPropertyUtility } from '../utils/customPropertyParser';
import { extractArbitraryValue, isLengthValue, isVarFunction } from '../utils';
// Tailwind gap utility parser
// https://tailwindcss.com/docs/gap

const directions: { [key: string]: string } = {
  '': 'all',
  'x': 'inline',
  'y': 'block',
};

export function parseGap(token: string, context?: CssmaContext): any | null {
  // 1. spacing preset(숫자/문자열): context lookup (gap/gap-x/gap-y)
  const preset = parseContextGapUtility({ token, type: 'gap', context });
  if (preset) return preset;

  // 2. px, custom property, arbitrary value 등
  const match = token.match(/^gap(?:-([xy]))?-(.+)$/);
  if (!match) return null;
  const [, axis, valRaw] = match;
  const val = valRaw.trim();
  const direction = directions[axis || ''] || 'all';

  // custom property (gap-(--foo))
  const customProp = parseCustomPropertyUtility({ token, prefix: `gap${axis ? '-' + axis : ''}`, type: 'gap' });
  if (customProp) return { ...customProp, direction, arbitrary: false, customProperty: true };

  // arbitrary value (gap-[10px])
  const arbitraryValue = extractArbitraryValue(token, `gap${axis ? '-' + axis : ''}`);
  if (arbitraryValue !== null && (isLengthValue(arbitraryValue) || isVarFunction(arbitraryValue))) {
    return { type: 'gap', value: arbitraryValue, direction, raw: token, arbitrary: true, customProperty: false };
  }
  // spacing preset이 context에 없으면 null 반환 (fallback 제거)
  return null;
} 
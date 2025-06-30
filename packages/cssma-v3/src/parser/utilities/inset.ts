// Tailwind inset utility parser
// https://tailwindcss.com/docs/top-right-bottom-left

import { parseCustomPropertyUtility } from '../utils/customPropertyParser';
import { extractArbitraryValue, isLengthValue, isVarFunction, isCalcFunction } from '../utils';

const directions: Record<string, string> = {
  'inset': 'all',
  'inset-x': 'x',
  'inset-y': 'y',
  'top': 'top',
  'right': 'right',
  'bottom': 'bottom',
  'left': 'left',
  'start': 'start',
  'end': 'end',
};

export function parseInset(token: string): any | null {
  if (token.startsWith('--')) return null;
  const originalToken = token;
  let negative = false;
  let t = token;
  if (token.startsWith('-')) {
    negative = true;
    t = token.slice(1);
  }
  // direction prefix 전체 지원
  const match = t.match(/^(inset-x|inset-y|inset|top|right|bottom|left|start|end)-(.+)$/);
  if (!match) return null;
  const [ , dirPrefix, valRaw ] = match;
  const direction = directions[dirPrefix] || 'all';
  const val = valRaw.trim();

  // px, full, auto, 숫자, fraction
  if (val === 'px' || val === 'full' || val === 'auto' || /^\d+$/.test(val) || /^\d+\/\d+$/.test(val)) {
    let value = val;
    if (/^\d+\/\d+$/.test(val)) {
      // fraction은 그대로 string으로 반환
      value = val;
    }
    return {
      type: 'inset',
      direction,
      value,
      raw: originalToken,
      arbitrary: false,
      customProperty: false,
      negative,
    };
  }

  // custom property
  const custom = parseCustomPropertyUtility({ token: t, prefix: dirPrefix, type: 'inset' });
  if (custom) {
    return {
      type: 'inset',
      direction,
      value: custom.value,
      raw: originalToken,
      arbitrary: false,
      customProperty: true,
      negative,
    };
  }

  // arbitrary value
  const arb = extractArbitraryValue(t, dirPrefix);
  if (arb && (isLengthValue(arb) || isVarFunction(arb) || isCalcFunction(arb))) {
    return {
      type: 'inset',
      direction,
      value: arb,
      raw: originalToken,
      arbitrary: true,
      customProperty: false,
      negative,
    };
  }

  return null;
} 
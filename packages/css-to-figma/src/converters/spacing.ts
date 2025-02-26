interface SpacingResult {
  itemSpacing?: number;
  counterAxisSpacing?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
}

const SPACING_MAP: Record<string, number> = {
  '0': 0,
  '1': 4,
  '2': 8,
  '3': 12,
  '4': 16,
  '5': 20,
  '6': 24,
  '8': 32,
  '10': 40,
  '12': 48,
  '16': 64
};

function parseSpacingValue(value: string): number | null {
  // 임의값 처리 (예: [20])
  if (value.startsWith('[') && value.endsWith(']')) {
    const num = parseInt(value.slice(1, -1));
    return isNaN(num) ? null : num;
  }

  // 표준 값 처리
  return SPACING_MAP[value] ?? null;
}

export function convertSpacing(value: string): SpacingResult {
  const classes = value.split(' ');
  const result: SpacingResult = {};

  for (const cls of classes) {
    // Gap 처리
    if (cls === 'gap-0') {
      result.itemSpacing = 0;
      result.counterAxisSpacing = 0;
    } else if (cls.startsWith('gap-x-[')) {
      const size = parseSpacingValue(cls.replace('gap-x-', ''));
      if (size !== null) result.itemSpacing = size;
    } else if (cls.startsWith('gap-y-[')) {
      const size = parseSpacingValue(cls.replace('gap-y-', ''));
      if (size !== null) result.counterAxisSpacing = size;
    } else if (cls.startsWith('gap-[')) {
      const size = parseSpacingValue(cls.replace('gap-', ''));
      if (size !== null) {
        result.itemSpacing = size;
        result.counterAxisSpacing = size;
      }
    } else if (cls.startsWith('gap-x-')) {
      const size = parseSpacingValue(cls.replace('gap-x-', ''));
      if (size !== null) result.itemSpacing = size;
    } else if (cls.startsWith('gap-y-')) {
      const size = parseSpacingValue(cls.replace('gap-y-', ''));
      if (size !== null) result.counterAxisSpacing = size;
    } else if (cls.startsWith('gap-')) {
      const size = parseSpacingValue(cls.replace('gap-', ''));
      if (size !== null) {
        result.itemSpacing = size;
        result.counterAxisSpacing = size;
      }
    }

    // Padding 처리
    if (cls === 'p-0') {
      result.paddingTop = 0;
      result.paddingRight = 0;
      result.paddingBottom = 0;
      result.paddingLeft = 0;
    } else if (cls.startsWith('pt-[')) {
      const size = parseSpacingValue(cls.replace('pt-', ''));
      if (size !== null) result.paddingTop = size;
    } else if (cls.startsWith('pr-[')) {
      const size = parseSpacingValue(cls.replace('pr-', ''));
      if (size !== null) result.paddingRight = size;
    } else if (cls.startsWith('pb-[')) {
      const size = parseSpacingValue(cls.replace('pb-', ''));
      if (size !== null) result.paddingBottom = size;
    } else if (cls.startsWith('pl-[')) {
      const size = parseSpacingValue(cls.replace('pl-', ''));
      if (size !== null) result.paddingLeft = size;
    } else if (cls.startsWith('px-[')) {
      const size = parseSpacingValue(cls.replace('px-', ''));
      if (size !== null) {
        result.paddingLeft = size;
        result.paddingRight = size;
      }
    } else if (cls.startsWith('py-[')) {
      const size = parseSpacingValue(cls.replace('py-', ''));
      if (size !== null) {
        result.paddingTop = size;
        result.paddingBottom = size;
      }
    } else if (cls.startsWith('p-[')) {
      const size = parseSpacingValue(cls.replace('p-', ''));
      if (size !== null) {
        result.paddingTop = size;
        result.paddingRight = size;
        result.paddingBottom = size;
        result.paddingLeft = size;
      }
    } else if (cls.startsWith('pt-')) {
      const size = parseSpacingValue(cls.replace('pt-', ''));
      if (size !== null) result.paddingTop = size;
    } else if (cls.startsWith('pr-')) {
      const size = parseSpacingValue(cls.replace('pr-', ''));
      if (size !== null) result.paddingRight = size;
    } else if (cls.startsWith('pb-')) {
      const size = parseSpacingValue(cls.replace('pb-', ''));
      if (size !== null) result.paddingBottom = size;
    } else if (cls.startsWith('pl-')) {
      const size = parseSpacingValue(cls.replace('pl-', ''));
      if (size !== null) result.paddingLeft = size;
    } else if (cls.startsWith('px-')) {
      const size = parseSpacingValue(cls.replace('px-', ''));
      if (size !== null) {
        result.paddingLeft = size;
        result.paddingRight = size;
      }
    } else if (cls.startsWith('py-')) {
      const size = parseSpacingValue(cls.replace('py-', ''));
      if (size !== null) {
        result.paddingTop = size;
        result.paddingBottom = size;
      }
    } else if (cls.startsWith('p-')) {
      const size = parseSpacingValue(cls.replace('p-', ''));
      if (size !== null) {
        result.paddingTop = size;
        result.paddingRight = size;
        result.paddingBottom = size;
        result.paddingLeft = size;
      }
    }
  }

  return result;
}

interface ArbitraryValue {
  property: keyof StyleProperties;
  value: number | string;
}

interface StyleProperties {
  width?: number;
  height?: number;
  padding?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  gap?: number;
  itemSpacing?: number;
  counterAxisSpacing?: number;
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
  opacity?: number;
}

const PROPERTY_MAP: Record<string, keyof StyleProperties> = {
  'w': 'width',
  'h': 'height',
  'p': 'padding',
  'pt': 'paddingTop',
  'pr': 'paddingRight',
  'pb': 'paddingBottom',
  'pl': 'paddingLeft',
  'gap': 'gap',
  'gap-x': 'itemSpacing',
  'gap-y': 'counterAxisSpacing',
  'bg': 'backgroundColor',
  'text': 'color',
  'border': 'borderColor',
  'opacity': 'opacity'
};

/**
 * Tailwind CSS의 임의값 구문을 파싱합니다.
 * 예: w-[100px] -> { property: 'width', value: 100 }
 */
export function parseArbitraryValue(className: string): ArbitraryValue | null {
  // 임의값 구문 매칭
  const match = className.match(/^([a-z-]+)-\[(.*?)\]$/);
  if (!match) return null;

  const [, prefix, value] = match;
  const property = PROPERTY_MAP[prefix];
  if (!property) return null;

  // 값 파싱
  if (value.startsWith('#')) {
    // 색상값
    if (property === 'backgroundColor' || property === 'color' || property === 'borderColor') {
      return { property, value };
    }
    return null;
  } else {
    // 숫자값
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) return null;
    if (property === 'backgroundColor' || property === 'color' || property === 'borderColor') {
      return null;
    }
    return { property, value: numericValue };
  }
}

/**
 * 여러 Tailwind CSS 클래스를 파싱하여 스타일 객체로 변환합니다.
 * 예: "w-[100] h-[200] p-[16] bg-[#FF0000]" ->
 * {
 *   width: 100,
 *   height: 200,
 *   padding: 16,
 *   backgroundColor: '#FF0000'
 * }
 */
export function parseStyles(classNames: string): StyleProperties {
  const classes = classNames.split(' ').filter(Boolean);
  const result: StyleProperties = {};

  for (const cls of classes) {
    const parsed = parseArbitraryValue(cls);
    if (parsed) {
      result[parsed.property] = parsed.value as any;
    }
  }

  return result;
}

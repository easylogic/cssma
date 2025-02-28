/**
 * 각도를 라디안으로 변환합니다.
 */
export function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/**
 * 임의 값에서 숫자를 추출합니다.
 */
export function parseArbitraryValue(value: string, options: { allowNegative?: boolean; unit?: string } = {}): number | null {
  const { allowNegative = false, unit = 'px' } = options;
  const regex = new RegExp(`^\\[([-\\d.]+)(?:${unit})?\\]$`);
  const match = value.match(regex);
  
  if (!match) return null;
  
  const num = parseFloat(match[1]);
  if (isNaN(num)) return null;
  
  if (!allowNegative && num < 0) return null;
  
  return num;
}

/**
 * 비율 값을 파싱합니다.
 */
export function parseRatioValue(value: string): number | null {
  if (!/^\d+\/\d+$/.test(value)) return null;

  const [width, height] = value.split('/').map(Number);
  if (isNaN(width) || isNaN(height)) return null;
  if (width <= 0 || height <= 0) return null;
  if (height === 0) return null;

  return width / height;
}

/**
 * 퍼센트 값을 소수로 변환합니다.
 */
export function percentToDecimal(value: string): number | null {
  if (!value.endsWith('%')) return null;
  
  const num = parseFloat(value.slice(0, -1));
  if (isNaN(num)) return null;
  
  return num / 100;
} 
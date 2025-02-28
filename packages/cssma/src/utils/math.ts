/**
 * 숫자를 지정된 소수점 자리수까지 반올림합니다.
 * @param value 반올림할 숫자
 * @param precision 소수점 자리수 (기본값: 2)
 * @returns 반올림된 숫자
 */
export function round(value: number, precision: number = 2): number {
  const multiplier = Math.pow(10, precision);
  return Math.round(value * multiplier) / multiplier;
} 
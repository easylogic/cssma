import { ParsedStyle } from '../types';

const ASPECT_RATIOS = {
  'square': 1,
  'video': 16/9
} as const;

/**
 * 비율 값을 파싱합니다.
 * @param value 파싱할 값 (예: "4/3", "16/9")
 * @returns 파싱된 비율 값 또는 null
 */
function parseRatioValue(value: string): number | null {
  // 비율 형식 검증 (숫자/숫자)
  if (!/^\d+\/\d+$/.test(value)) return null;

  const parts = value.split('/');
  if (parts.length !== 2) return null;

  const [width, height] = parts.map(Number);
  if (isNaN(width) || isNaN(height)) return null;
  if (width <= 0 || height <= 0) return null;  // 음수나 0은 허용하지 않음
  if (height === 0) return null;  // 0으로 나누기 방지

  return width / height;
}

export function parseAspectStyleValue(className: string): ParsedStyle | null {
  // Aspect ratio 처리
  if (className.startsWith('aspect-')) {
    // aspect-auto 처리
    if (className === 'aspect-auto') {
      return {
        property: 'aspectRatio',
        value: 'auto',
        variant: 'preset'
      };
    }

    // 프리셋 값 처리
    const preset = className.replace('aspect-', '');
    const ratio = ASPECT_RATIOS[preset as keyof typeof ASPECT_RATIOS];
    
    if (ratio !== undefined) {
      return {
        property: 'aspectRatio',
        value: ratio,
        variant: 'preset'
      };
    }

    // 임의값 처리 (예: aspect-[4/3])
    if (preset.startsWith('[') && preset.endsWith(']')) {
      const value = preset.slice(1, -1);
      const ratio = parseRatioValue(value);
      
      if (ratio !== null) {
        return {
          property: 'aspectRatio',
          value: ratio,
          variant: 'arbitrary'
        };
      }
    }
  }

  return null;
} 
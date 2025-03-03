import { ParsedStyle, FigmaPaint, FigmaColor, FigmaGradient, FigmaSolidPaint } from '../types';
import { isValidNumber } from '../utils/validators';
import { parseColor } from '../utils/colors';
import { GRADIENT_TRANSFORMS } from '../config/constants';
import { COLORS } from '../config/tokens';
import { round } from 'src/utils/math';


/**
 * Background 스타일을 Figma 스타일로 변환합니다.
 */
export function convertBackgroundToFigma(style: ParsedStyle): FigmaPaint[] {
  const result: FigmaPaint[] = [];

  switch (style.property) {
    case 'backgroundColor':
      if (style.variant === 'variable') {
        result.push({
          type: 'SOLID',
          variable: style.value as string
        } as FigmaSolidPaint);
      } else if (typeof style.value === 'string') {
        // 일반 배경색 처리
        let colorStr: string | FigmaColor | undefined;
        if (style.variant === 'preset') {
          colorStr = typeof COLORS[style.value] === 'string' ? COLORS[style.value] : undefined;
        } else {
          colorStr = style.value;
        }
        
        if (colorStr) {
          const color = parseColor(colorStr as string);
          if (color) {
            const fill: FigmaPaint = {
              type: 'SOLID',
              color: { 
                r: color.r,
                g: color.g,
                b: color.b
              }
            };

            if (isValidNumber(color.a)) {
              fill.opacity = color.a;
            }

            result.push(fill);
          }
        }
      } else if (typeof style.value === 'object') {
        result.push({
          type: 'SOLID',
          color: {
            r: (style.value as FigmaColor).r,
            g: (style.value as FigmaColor).g,
            b: (style.value as FigmaColor).b,
          },
          opacity: style.opacity
        });
      }
      break;
  }

  return result;
} 

export function convertGradientListToFigma(styles: ParsedStyle[]): FigmaPaint[] {
 const group: ParsedStyle[][] = [];
 let groupIndex = -1;

 for (const style of styles) {
  if (style.property === 'backgroundColor') {
    groupIndex++;
    group.push([]);
  }

  group[groupIndex].push(style);
 }

 return group.map(convertGradientToFigma).flat();
}

export function convertGradientToFigma(styles: ParsedStyle[]): FigmaPaint[] {
  const result: FigmaPaint[] = [];
  // 그라디언트 타입 확인
  const gradientRoot = styles.find(s => s.property === 'backgroundColor');
  const gradientType = gradientRoot?.value;
  const gradientDirection = gradientRoot?.direction;

  // 기본 선형 그라디언트 설정
  let gradientPaint: FigmaGradient = {
    type: 'GRADIENT_LINEAR',
    gradientStops: [],
    gradientTransform: [[1, 0, 0], [0, 1, 0]]
  };

  if (gradientType === 'linear') {
    if (gradientDirection) {
      const transform = GRADIENT_TRANSFORMS[gradientDirection as keyof typeof GRADIENT_TRANSFORMS];
      if (transform) {
        gradientPaint.gradientTransform = transform as [[number, number, number], [number, number, number]];
      }
    }
  } else if (gradientType === 'radial') {
    gradientPaint = {
      type: 'GRADIENT_RADIAL',
      gradientStops: [],
      centerX: 0.5,
      centerY: 0.5,
      radius: 0.5
    };
  } else if (gradientType === 'conic') {
    gradientPaint = {
      type: 'GRADIENT_ANGULAR', 
      gradientStops: [],
      centerX: 0.5,
      centerY: 0.5,
      rotation: 0
    };
  }

  // 그라디언트 색상 스톱 추가
  const colorStops = styles.filter(s => 
    s.property === 'gradientFrom' || 
    s.property === 'gradientVia' || 
    s.property === 'gradientTo'
  );

  let unitPosition = 0.5;
  if (colorStops.length > 2) {
    unitPosition = 1 / (colorStops.length - 1);
  }


  let startPosition = 0;
  
  for (const stop of colorStops) {
    let position = 0;

    if (stop.property === 'gradientFrom') {
      position = 0;
    } else if (stop.property === 'gradientTo') {
      position = 1;
    } else {
      position = startPosition + unitPosition;
      startPosition = position;
    }
                    
    if (typeof stop.value === 'string') {
      const color = parseColor(stop.value);
      if (color) {
        gradientPaint.gradientStops.push({
          position,
          color: {
            r: round(color.r, 3),
            g: round(color.g, 3), 
            b: round(color.b, 3),
            a: typeof color.a === 'number' ? round(color.a, 3) : undefined
          }
        });
      }
    } else if (typeof stop.value === 'object') {
      gradientPaint.gradientStops.push({
        position,
        color: stop.value as FigmaColor
      });
    }
  }

  // 스톱이 있는 경우에만 결과에 추가
  if (gradientPaint.gradientStops.length > 0) {
    result.push(gradientPaint);
  }

  return result;
}


import { FigmaGradientStop } from '../types';
import { colorToHex } from './utils';

function getGradientDirection(transform: number[][]): string {
  const directions: Record<string, number[][]> = {
    'to-t': [[1, 0, 0], [0, -1, 1]],
    'to-tr': [[0.7071, -0.7071, 0], [0.7071, 0.7071, 0]],
    'to-r': [[1, 0, 0], [0, 1, 0]],
    'to-br': [[0.7071, 0.7071, 0], [-0.7071, 0.7071, 0]],
    'to-b': [[1, 0, 0], [0, 1, 0]],
    'to-bl': [[-0.7071, 0.7071, 1], [-0.7071, -0.7071, 1]],
    'to-l': [[-1, 0, 1], [0, 1, 0]],
    'to-tl': [[-0.7071, -0.7071, 1], [0.7071, -0.7071, 0]]
  };

  for (const [direction, matrix] of Object.entries(directions)) {
    if (JSON.stringify(transform) === JSON.stringify(matrix)) {
      return direction;
    }
  }
  return 'to-r'; 
}

function convertGradientStops(stops: FigmaGradientStop[]): string[] {
  const classes: string[] = [];
  
  if (stops.length > 0) {
    const firstStop = stops[0];
    classes.push(`from-[${colorToHex(firstStop.color)}]`);
    
    const middleStops = stops.slice(1, -1);
    middleStops.forEach(stop => {
      classes.push(`via-[${colorToHex(stop.color)}]`);
    });
    
    if (stops.length > 1) {
      const lastStop = stops[stops.length - 1];
      classes.push(`to-[${colorToHex(lastStop.color)}]`);
    }
  }
  
  return classes;
}

// Blend mode conversion function
function convertBlendMode(figmaBlendMode: string): string | null {
    const blendModeMap: Record<string, string> = {
        'MULTIPLY': 'multiply',
        'SCREEN': 'screen',
        'OVERLAY': 'overlay',
        'DARKEN': 'darken',
        'LIGHTEN': 'lighten',
        'COLOR_DODGE': 'color-dodge',
        'COLOR_BURN': 'color-burn',
        'HARD_LIGHT': 'hard-light',
        'SOFT_LIGHT': 'soft-light',
        'DIFFERENCE': 'difference',
        'EXCLUSION': 'exclusion',
        'HUE': 'hue',
        'SATURATION': 'saturation',
        'COLOR': 'color',
        'LUMINOSITY': 'luminosity'
    };
    
    return blendModeMap[figmaBlendMode] || null;
}

export function figmaColorsToCss(styles: Record<string, any>): string[] {
    const classes: string[] = [];

    if (styles.fills && styles.fills.length > 0) {
        // TEXT 타입인지 확인
        const isTextNode = styles.type === 'TEXT';
        
        // Multiple backgrounds 처리
        styles.fills.forEach((fill: any, index: number) => {
            if (fill.type === 'SOLID') {
                // TEXT 노드는 text-, 그 외는 bg- prefix 사용
                const prefix = isTextNode ? 'text' : 'bg';
                
                let colorClass = '';
                if (fill.opacity !== undefined && fill.opacity !== 1) {
                    colorClass = `${prefix}-[${colorToHex(fill.color)}]/${Math.round(fill.opacity * 100)}`;
                } else {
                    colorClass = `${prefix}-[${colorToHex(fill.color)}]`;
                }
                classes.push(colorClass);
                
                // Background blend mode 처리 (background fills에만 적용)
                if (!isTextNode && fill.blendMode && fill.blendMode !== 'NORMAL') {
                    const blendMode = convertBlendMode(fill.blendMode);
                    if (blendMode) {
                        classes.push(`bg-blend-${blendMode}`);
                    }
                }
                
            } else if (fill.type === 'GRADIENT_LINEAR') {
                const direction = getGradientDirection(fill.gradientTransform);
                classes.push(`bg-linear-${direction}`);
                classes.push(...convertGradientStops(fill.gradientStops));
                
                // Gradient blend mode 처리
                if (fill.blendMode && fill.blendMode !== 'NORMAL') {
                    const blendMode = convertBlendMode(fill.blendMode);
                    if (blendMode) {
                        classes.push(`bg-blend-${blendMode}`);
                    }
                }
                
            } else if (fill.type === 'GRADIENT_RADIAL') {
                classes.push('bg-radial');
                classes.push(...convertGradientStops(fill.gradientStops));
                
                // Gradient blend mode 처리
                if (fill.blendMode && fill.blendMode !== 'NORMAL') {
                    const blendMode = convertBlendMode(fill.blendMode);
                    if (blendMode) {
                        classes.push(`bg-blend-${blendMode}`);
                    }
                }
                
            } else if (fill.type === 'GRADIENT_ANGULAR') {
                const rotation = fill.rotation || 0;
                if (rotation === 0) {
                    classes.push('bg-conic');
                } else {
                    classes.push(`bg-conic-[${rotation}deg]`);
                }
                classes.push(...convertGradientStops(fill.gradientStops));
                
                // Gradient blend mode 처리
                if (fill.blendMode && fill.blendMode !== 'NORMAL') {
                    const blendMode = convertBlendMode(fill.blendMode);
                    if (blendMode) {
                        classes.push(`bg-blend-${blendMode}`);
                    }
                }
            }
        });
    }

    return classes;
} 
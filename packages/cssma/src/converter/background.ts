import { ParsedStyle, FigmaPaint } from '../types';
import { isValidNumber } from '../utils/validators';
import { parseColor } from '../utils/colors';
import { GRADIENT_TRANSFORMS } from '../config/constants';
import { COLORS } from '../config/tokens';
import { round } from '../utils/math';

// Local type definitions
type FigmaColor = { r: number; g: number; b: number; a?: number };

interface BasePaint {
  type: string;
  visible?: boolean;
  opacity?: number;
  blendMode?: string;
}

interface FigmaSolidPaint extends BasePaint {
  type: 'SOLID';
  color: { r: number; g: number; b: number };
}

interface FigmaGradientPaint extends BasePaint {
  type: 'GRADIENT_LINEAR' | 'GRADIENT_RADIAL' | 'GRADIENT_ANGULAR';
  gradientStops: any[];
  gradientTransform?: [[number, number, number], [number, number, number]];
  centerX?: number;
  centerY?: number;
  radius?: number;
  rotation?: number;
}

interface FigmaImagePaint extends BasePaint {
  type: 'IMAGE';
  imageUrl?: string;
  imageHash?: string;
  scaleMode?: 'FILL' | 'FIT' | 'CROP' | 'TILE';
  imageTransform?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  scalingFactor?: number;
  rotation?: number;
}

type FigmaGradientLinear = {
  type: 'GRADIENT_LINEAR';
  gradientStops: any[];
  gradientTransform: [[number, number, number], [number, number, number]];
};

type FigmaGradientRadial = {
  type: 'GRADIENT_RADIAL';
  gradientStops: any[];
  centerX: number;
  centerY: number;
  radius: number;
};

type FigmaGradientAngular = {
  type: 'GRADIENT_ANGULAR';
  gradientStops: any[];
  centerX: number;
  centerY: number;
  rotation: number;
};

type BoundVariable = {
  type: 'VARIABLE_ALIAS';
  id: string;
};

type FigmaVariableColor = {
  boundVariables?: {
    color: BoundVariable;
  };
};

type FigmaVariableSolidPaint = FigmaSolidPaint & FigmaVariableColor;
type FigmaVariableGradientStop = {
  position: number;
  color: FigmaColor;
} & FigmaVariableColor;

type FigmaVariableGradientPaint = (
  | (Omit<FigmaGradientLinear, 'gradientStops'> & { gradientStops: FigmaVariableGradientStop[] })
  | (Omit<FigmaGradientRadial, 'gradientStops'> & { gradientStops: FigmaVariableGradientStop[] })
  | (Omit<FigmaGradientAngular, 'gradientStops'> & { gradientStops: FigmaVariableGradientStop[] })
);

type FigmaVariableImagePaint = FigmaImagePaint & FigmaVariableColor & { blendMode?: string };

type FigmaVariablePaint = (FigmaVariableSolidPaint | FigmaVariableGradientPaint | FigmaVariableImagePaint) & { blendMode?: string };

export function convertBackgroundToFigma(styles: ParsedStyle[]): FigmaPaint[] {
  const result: FigmaPaint[] = [];
  for (const style of styles) {
    
    switch (style.property) {
      case 'backgroundBlendMode':
        result[result.length - 1].blendMode = style.value as string;
        break;
      case 'backgroundColor':
        if (style.variant === 'figma-variable' && style.variableId) {
          
          const paint: FigmaVariableSolidPaint = {
            type: 'SOLID',
            color: { r: 0, g: 0, b: 0 },
            opacity: style.opacity,
            boundVariables: {
              color: {
                type: 'VARIABLE_ALIAS',
                id: style.variableId
              }
            }
          };
          result.push(paint);
        } else if (typeof style.value === 'string') {
          
          let colorStr: string | FigmaColor | undefined;
          if (style.variant === 'preset') {
            colorStr = typeof COLORS[style.value] === 'string' ? COLORS[style.value] : undefined;
          } else {
            colorStr = style.value;
          }
          
          if (colorStr) {
            const color = parseColor(colorStr as string);
            if (color) {
              const fill: FigmaVariableSolidPaint = {
                type: 'SOLID',
                color: { 
                  r: color.r,
                  g: color.g,
                  b: color.b
                },
                ...(isValidNumber(color.a) ? { opacity: color.a } : 
                  style.opacity !== undefined ? { opacity: style.opacity } : {})
              };
              result.push(fill);
            }
          }
        } else if (typeof style.value === 'object') {
          const fill: FigmaVariableSolidPaint = {
            type: 'SOLID',
            color: {
              r: (style.value as FigmaColor).r,
              g: (style.value as FigmaColor).g,
              b: (style.value as FigmaColor).b,
            },
            ...(style.opacity !== undefined && { opacity: style.opacity })
          };
          result.push(fill);
        }
        break;
    }
  }


  return result;
}

export function convertGradientToFigma(styles: ParsedStyle[]): FigmaPaint[] {
  const result: FigmaPaint[] = [];
  
  const gradientRoot = styles.find(s => s.property === 'backgroundColor');
  const gradientType = gradientRoot?.value;
  const gradientDirection = gradientRoot?.direction;
  
  let gradientPaint: FigmaVariableGradientPaint = {
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

    if (stop.variant === 'figma-variable' && stop.variableId) {
      
      const gradientStop: FigmaVariableGradientStop = {
        position,
        color: {
          r: 0,
          g: 0,
          b: 0,
          ...(stop.opacity !== undefined && { a: stop.opacity })
        },
        boundVariables: {
          color: {
            type: 'VARIABLE_ALIAS',
            id: stop.variableId
          }
        }
      };
      gradientPaint.gradientStops.push(gradientStop);
    } else if (typeof stop.value === 'string') {
      const color = parseColor(stop.value);
      if (color) {
        const gradientStop: FigmaVariableGradientStop = {
          position,
          color: {
            r: round(color.r, 3),
            g: round(color.g, 3),
            b: round(color.b, 3),
            ...(color.a !== undefined ? { a: round(color.a, 3) } : 
               stop.opacity !== undefined ? { a: stop.opacity } : {})
          }
        };
        gradientPaint.gradientStops.push(gradientStop);
      }
    } else if (typeof stop.value === 'object') {
      const gradientStop: FigmaVariableGradientStop = {
        position,
        color: {
          ...stop.value as FigmaColor,
          ...(stop.opacity !== undefined && { a: stop.opacity })
        }
      };
      gradientPaint.gradientStops.push(gradientStop);
    }
  }

  
  if (gradientPaint.gradientStops.length > 0) {
    result.push(gradientPaint);
  }

  // backgroundBlendMode 처리
  const blendModeStyle = styles.find(s => s.property === 'backgroundBlendMode');
  if (blendModeStyle && result.length > 0) {
    (result[result.length - 1] as any).blendMode = blendModeStyle.value as string;
  }

  return result;
}

/**
 * Convert background image styles to Figma ImagePaint
 */
export function convertImageToFigma(styles: ParsedStyle[]): FigmaPaint[] {
  const result: FigmaPaint[] = [];
  
  let imagePaint: FigmaImagePaint = {
    type: 'IMAGE',
    scaleMode: 'FILL', // Default scale mode
  };

  for (const style of styles) {
    switch (style.property) {
      case 'backgroundImage':
        imagePaint.imageUrl = style.value as string;
        if (style.opacity !== undefined) {
          imagePaint.opacity = style.opacity;
        }
        break;
        
      case 'backgroundSize':
        // Map CSS background-size to Figma scaleMode
        const scaleMode = style.value as string;
        if (['FILL', 'FIT', 'CROP', 'TILE'].includes(scaleMode)) {
          imagePaint.scaleMode = scaleMode as 'FILL' | 'FIT' | 'CROP' | 'TILE';
        }
        break;
        
      case 'backgroundRepeat':
        // bg-repeat maps to TILE, bg-no-repeat maps to FILL
        const repeatMode = style.value as string;
        if (repeatMode === 'TILE') {
          imagePaint.scaleMode = 'TILE';
        } else if (repeatMode === 'FILL') {
          imagePaint.scaleMode = 'FILL';
        }
        break;
        
      case 'backgroundPosition':
        // Map CSS background-position to Figma imageTransform
        const position = (style.value as string).toLowerCase();
        if (['center', 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(position)) {
          imagePaint.imageTransform = position as FigmaImagePaint['imageTransform'];
        }
        break;
        
      case 'backgroundBlendMode':
        imagePaint.blendMode = style.value as string;
        break;
    }
  }

  // Only add the image paint if we have a valid image URL
  if (imagePaint.imageUrl) {
    result.push(imagePaint as any);
  }

  return result;
}


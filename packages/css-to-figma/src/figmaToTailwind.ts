import { FigmaColor, FigmaGradientStop } from './types';

const sizeMap: Record<number, string> = {
    12: 'text-xs',
    14: 'text-sm',
    16: 'text-base',
    18: 'text-lg',
    20: 'text-xl',
    24: 'text-2xl',
    30: 'text-3xl',
    36: 'text-4xl'
};

const weightMap: Record<string, string> = {
    'Thin': 'font-thin',
    'ExtraLight': 'font-extralight',
    'Light': 'font-light',
    'Regular': 'font-normal',
    'Medium': 'font-medium',
    'SemiBold': 'font-semibold',
    'Bold': 'font-bold',
    'ExtraBold': 'font-extrabold',
    'Black': 'font-black'
  };

  const radiusMap: Record<number, string> = {
    4: 'rounded-sm',
    6: 'rounded-md',
    8: 'rounded-lg',
    12: 'rounded-xl',
    16: 'rounded-2xl',
    9999: 'rounded-full'
  };

function colorToHex(color: FigmaColor): string {
  // RGB 값을 0-255 범위로 변환하고 반올림
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);

  // 16진수로 변환하고 2자리로 패딩
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

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
  return 'to-r'; // 기본값
}

function convertGradientStops(stops: FigmaGradientStop[]): string[] {
  const classes: string[] = [];
  
  if (stops.length > 0) {
    const firstStop = stops[0];
    classes.push(`from-[${colorToHex(firstStop.color)}]`);
    
    // via colors (중간 색상들)
    const middleStops = stops.slice(1, -1);
    middleStops.forEach(stop => {
      classes.push(`via-[${colorToHex(stop.color)}]`);
    });
    
    // to color (마지막 색상)
    if (stops.length > 1) {
      const lastStop = stops[stops.length - 1];
      classes.push(`to-[${colorToHex(lastStop.color)}]`);
    }
  }
  
  return classes;
}

function convertLayout(styles: Record<string, any>): string[] {
  const classes: string[] = [];

  // Layout Mode
  if (styles.layoutMode === 'HORIZONTAL') classes.push('flex-row');
  if (styles.layoutMode === 'VERTICAL') classes.push('flex-col');

  // Size
  if (styles.layoutSizingHorizontal === 'FILL') classes.push('w-full');
  else if (styles.layoutSizingHorizontal === 'HUG') classes.push('w-auto');
  else if (styles.width) classes.push(`w-[${styles.width}]`);

  if (styles.layoutSizingVertical === 'FILL') classes.push('h-full');
  else if (styles.layoutSizingVertical === 'HUG') classes.push('h-auto');
  else if (styles.height) classes.push(`h-[${styles.height}]`);

  // Alignment
  if (styles.primaryAxisAlignItems === 'MIN') classes.push('justify-start');
  if (styles.primaryAxisAlignItems === 'CENTER') classes.push('justify-center');
  if (styles.primaryAxisAlignItems === 'MAX') classes.push('justify-end');
  if (styles.primaryAxisAlignItems === 'SPACE_BETWEEN') classes.push('justify-between');

  if (styles.counterAxisAlignItems === 'MIN') classes.push('items-start');
  if (styles.counterAxisAlignItems === 'CENTER') classes.push('items-center');
  if (styles.counterAxisAlignItems === 'MAX') classes.push('items-end');
  if (styles.counterAxisAlignItems === 'BASELINE') classes.push('items-baseline');

  // Spacing
  if (styles.itemSpacing) classes.push(`gap-[${styles.itemSpacing}]`);
  if (styles.paddingTop === styles.paddingRight && 
      styles.paddingTop === styles.paddingBottom && 
      styles.paddingTop === styles.paddingLeft && 
      styles.paddingTop) {
    classes.push(`p-[${styles.paddingTop}]`);
  } else {
    if (styles.paddingTop) classes.push(`pt-[${styles.paddingTop}]`);
    if (styles.paddingRight) classes.push(`pr-[${styles.paddingRight}]`);
    if (styles.paddingBottom) classes.push(`pb-[${styles.paddingBottom}]`);
    if (styles.paddingLeft) classes.push(`pl-[${styles.paddingLeft}]`);
  }

  return classes;
}

function convertColors(styles: Record<string, any>): string[] {
  const classes: string[] = [];

  if (styles.fills && styles.fills.length > 0) {
    const fill = styles.fills[0];
    if (fill.type === 'SOLID') {
      classes.push(`bg-[${colorToHex(fill.color)}]`);
    } else if (fill.type === 'GRADIENT_LINEAR') {
      const direction = getGradientDirection(fill.gradientTransform);
      classes.push(`bg-linear-${direction}`);
      classes.push(...convertGradientStops(fill.gradientStops));
    } else if (fill.type === 'GRADIENT_RADIAL') {
      classes.push('bg-radial');
      classes.push(...convertGradientStops(fill.gradientStops));
    } else if (fill.type === 'GRADIENT_ANGULAR') {
      const rotation = fill.rotation || 0;
      if (rotation === 0) {
        classes.push('bg-conic');
      } else {
        classes.push(`bg-conic-[${rotation}deg]`);
      }
      classes.push(...convertGradientStops(fill.gradientStops));
    }
  }

  // Border color
  if (styles.strokes && styles.strokes.length > 0) {
    const stroke = styles.strokes[0];
    if (stroke.type === 'SOLID') {
      classes.push(`border-[${colorToHex(stroke.color)}]`);
    }
  }

  return classes;
}

function convertTypography(styles: Record<string, any>): string[] {
  const classes: string[] = [];

  // Font size
  if (styles.fontSize) {
   
    const size = sizeMap[styles.fontSize] || `text-[${styles.fontSize}]`;
    classes.push(size);
  }

  // Font weight
  if (styles.fontName?.style) {
    const weight = weightMap[styles.fontName.style];
    if (weight) classes.push(weight);
  }

  return classes;
}

function convertEffects(styles: Record<string, any>): string[] {
  const classes: string[] = [];

  // Opacity
  if (styles.opacity !== undefined) {
    classes.push(`opacity-[${styles.opacity}]`);
  }

  // Shadow
  if (styles.effects && styles.effects.length > 0) {
    for (const effect of styles.effects) {
      if (effect.type === 'DROP_SHADOW') {
        if (effect.radius === 2 && effect.spread === 0) classes.push('shadow-sm');
        else if (effect.radius === 6 && effect.spread === -2) classes.push('shadow-md');
        else if (effect.radius === 10 && effect.spread === -3) classes.push('shadow-lg');
      }
    }
  }

  return classes;
}

function convertGeometry(styles: Record<string, any>): string[] {
  const classes: string[] = [];

  // Border radius
  if (styles.cornerRadius) {
   
    const radius = radiusMap[styles.cornerRadius] || `rounded-[${styles.cornerRadius}]`;
    classes.push(radius);
  }

  return classes;
}

/**
 * Figma 스타일을 Tailwind CSS 클래스로 변환합니다.
 */
export function figmaToTailwind(styles: Record<string, any>): string {
  const classes: string[] = [
    ...convertLayout(styles),
    ...convertColors(styles),
    ...convertTypography(styles),
    ...convertEffects(styles),
    ...convertGeometry(styles)
  ];

  return classes.join(' ');
} 
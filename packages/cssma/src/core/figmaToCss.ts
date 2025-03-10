import { FigmaColor, FigmaGradientStop } from '../types';

function isMixedValue(value: any): boolean {
    return typeof value === 'symbol' && String(value) === 'Symbol(figma.mixed)';
}

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

const shadowMap: Record<string, string> = {
    'sm': 'shadow-sm',    // radius: 2, spread: 0
    'md': 'shadow-md',    // radius: 6, spread: -2
    'lg': 'shadow-lg',    // radius: 10, spread: -3
    'xl': 'shadow-xl',    // radius: 20, spread: -5
    '2xl': 'shadow-2xl'   // radius: 25, spread: -8
};

function colorToHex(color: FigmaColor): string {
  
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);

  
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

function convertLayout(styles: Record<string, any>): string[] {
  const classes: string[] = [];

  
  if (styles.layoutMode === 'HORIZONTAL') {
    classes.push('flex-row');
    
    if (styles.layoutGrow === 1) classes.push('flex-grow');
    if (styles.layoutShrink === 1) classes.push('flex-shrink');
    if (styles.layoutWrap === 'WRAP') classes.push('wrap');
    else if (styles.layoutWrap === 'NO_WRAP') {
        // ignore default value 
        // classes.push('no-wrap');
    }
  }
  if (styles.layoutMode === 'VERTICAL') {
    classes.push('flex-col');
    
    if (styles.layoutGrow === 1) classes.push('flex-grow');
    if (styles.layoutShrink === 1) classes.push('flex-shrink');
    if (styles.layoutWrap === 'WRAP') classes.push('wrap');
    else if (styles.layoutWrap === 'NO_WRAP') {
        // ignore default value 
        // classes.push('no-wrap');
    }
  }

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

            if (fill.opacity !== undefined && fill.opacity != 1) {
                classes.push(`bg-[${colorToHex(fill.color)}]/${Math.round(fill.opacity * 100)}`);
            } else {
                classes.push(`bg-[${colorToHex(fill.color)}]`);
            }
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

    return classes;
}

function convertTypography(styles: Record<string, any>): string[] {
    const classes: string[] = [];

    // Font size
    if (!isMixedValue(styles.fontSize) && styles.fontSize) {
        const size = sizeMap[styles.fontSize] || `text-[${styles.fontSize}]`;
        classes.push(size);
    }

    // Font weight and style
    if (!isMixedValue(styles.fontName?.style) && styles.fontName?.style) {
        const fontStyle = styles.fontName.style;
        
        // Font weight
        if (fontStyle.includes('Thin')) classes.push('font-thin');
        else if (fontStyle.includes('ExtraLight')) classes.push('font-extralight');
        else if (fontStyle.includes('Light')) classes.push('font-light');
        else if (fontStyle.includes('Regular')) {
            // ignore default value 
            // classes.push('font-normal');
        } else if (fontStyle.includes('Medium')) classes.push('font-medium');
        else if (fontStyle.includes('Semi Bold') || fontStyle.includes('SemiBold')) classes.push('font-semibold');
        else if (fontStyle.includes('Bold')) classes.push('font-bold');
        else if (fontStyle.includes('ExtraBold')) classes.push('font-extrabold');
        else if (fontStyle.includes('Black')) classes.push('font-black');

        // Font style
        if (fontStyle.includes('Italic')) {
            classes.push('italic');
        }
    }

    // Text alignment
    if (!isMixedValue(styles.textAlignHorizontal) && styles.textAlignHorizontal) {
        switch (styles.textAlignHorizontal) {
            case 'LEFT':
                classes.push('text-left');
                break;
            case 'CENTER':
                classes.push('text-center');
                break;
            case 'RIGHT':
                classes.push('text-right');
                break;
            case 'JUSTIFIED':
                classes.push('text-justify');
                break;
        }
    }

    // Text transform
    if (!isMixedValue(styles.textCase) && styles.textCase) {
        switch (styles.textCase) {
            case 'UPPER':
                classes.push('uppercase');
                break;
            case 'LOWER':
                classes.push('lowercase');
                break;
            case 'TITLE':
                classes.push('capitalize');
                break;
            // ignore default value 
            // case 'ORIGINAL':
            //     classes.push('normal-case');
            //     break;
        }
    }

    // Text vertical alignment
    if (!isMixedValue(styles.textAlignVertical) && styles.textAlignVertical) {
        switch (styles.textAlignVertical) {
            case 'TOP':
                classes.push('align-top');
                break;
            case 'CENTER':
                classes.push('align-middle');
                break;
            case 'BOTTOM':
                classes.push('align-bottom');
                break;
        }
    }

    // Text auto-size
    if (!isMixedValue(styles.textAutoSize) && styles.textAutoSize) {
        switch (styles.textAutoSize) {
            case 'NONE':
                classes.push('text-auto-none');
                break;
            case 'WIDTH_AND_HEIGHT':
                classes.push('text-auto-wh');
                break;
            case 'TRUNCATE':
                classes.push('text-truncate');
                break;
            case 'HEIGHT':
                classes.push('text-auto-h');
                break;
        }
    }

    // Text wrap
    if (!isMixedValue(styles.textWrap) && styles.textWrap) {
        switch (styles.textWrap) {
            case 'BALANCE':
                classes.push('text-wrap-balance');
                break;
            case 'WRAP':
                classes.push('text-wrap');
                break;
            case 'TRUNCATE':
                classes.push('text-wrap-truncate');
                break;
        }
    }

    // Text decoration
    if (!isMixedValue(styles.textDecoration) && styles.textDecoration) {
        switch (styles.textDecoration) {
            case 'UNDERLINE':
                classes.push('underline');
                break;
            case 'STRIKETHROUGH':
                classes.push('line-through');
                break;
            // ignore default value 
            // case 'NONE':
            //     classes.push('no-underline');
            //     break;
        }
    }

    // Text decoration color
    if (!isMixedValue(styles.textDecorationColor) && styles.textDecorationColor) {
        
        const colorHex = colorToHex(styles.textDecorationColor);
        classes.push(`decoration-[${colorHex}]`);
    }

    // Text decoration style
    if (!isMixedValue(styles.textDecorationStyle) && styles.textDecorationStyle) {
        switch (styles.textDecorationStyle) {
            case 'SOLID':
                classes.push('decoration-solid');
                break;
            case 'DOUBLE':
                classes.push('decoration-double');
                break;
            case 'DOTTED':
                classes.push('decoration-dotted');
                break;
            case 'DASHED':
                classes.push('decoration-dashed');
                break;
            case 'WAVY':
                classes.push('decoration-wavy');
                break;
        }
    }

    // Text decoration thickness
    if (!isMixedValue(styles.textDecorationThickness) && styles.textDecorationThickness !== null && styles.textDecorationThickness !== undefined) {
        if (styles.textDecorationThickness === 'from-font') {
            classes.push('decoration-from-font');
        } else if (typeof styles.textDecorationThickness === 'number') {
            classes.push(`decoration-[${styles.textDecorationThickness}px]`);
        }
    }

    // Text decoration offset
    if (!isMixedValue(styles.textDecorationOffset) && styles.textDecorationOffset !== null && styles.textDecorationOffset !== undefined) {
        if (typeof styles.textDecorationOffset === 'number') {
            classes.push(`underline-offset-[${styles.textDecorationOffset}px]`);
        }
    }

    // Line height
    if (!isMixedValue(styles.lineHeight) && styles.lineHeight) {
        const { value, unit } = styles.lineHeight;
        if (unit === 'PERCENT') {
            switch (value) {
                case 100:
                    classes.push('leading-none');
                    break;
                case 125:
                    classes.push('leading-tight');
                    break;
                case 150:
                    classes.push('leading-normal');
                    break;
                default:
                    classes.push(`leading-[${value / 100}]`);
            }
        } else if (unit === 'PIXELS') {
            classes.push(`leading-[${value}px]`);
        } else if (unit === 'AUTO') {
            // ignore default value 
            // classes.push('leading-auto');
        }
    }

    if (!isMixedValue(styles.leadingTrim) && styles.leadingTrim) {
        switch (styles.leadingTrim) {
            case 'CAP_HEIGHT':
                classes.push('leading-trim-cap');
                break;
            case 'NONE':
                // ignore default value 
                // classes.push('leading-none');
                break;
        }
    }

    // Letter spacing
    if (!isMixedValue(styles.letterSpacing) && styles.letterSpacing !== undefined) {
        if (styles.letterSpacing === -0.4) {
            classes.push('tracking-tight');
        } else if (styles.letterSpacing === 0) {
            classes.push('tracking-normal');
        } else if (styles.letterSpacing === 0.4) {
            classes.push('tracking-wide');
        } else if (typeof styles.letterSpacing === 'number') {
            classes.push(`tracking-[${styles.letterSpacing}]`);
        } else if (typeof styles.letterSpacing === 'object' && styles.letterSpacing.unit === 'PERCENT') {

            if (styles.letterSpacing.value === 0) {
                // ignore default value 
                // classes.push('tracking-normal');
            } else {
                classes.push(`tracking-[${styles.letterSpacing.value}%]`);
            }
        } else if (typeof styles.letterSpacing === 'object' && styles.letterSpacing.unit === 'PIXELS') {
            classes.push(`tracking-[${styles.letterSpacing.value}px]`);
        }
    }

    return classes;
}

function convertEffects(styles: Record<string, any>): string[] {
  const classes: string[] = [];

  // Opacity
  if (styles.opacity !== undefined) {
    // Ensure opacity is within 0-1 range
    const opacityValue = Math.max(0, Math.min(1, styles.opacity));
    
    // Convert 0-1 scale to percentage for Tailwind
    const opacityPercent = Math.round(opacityValue * 100);
    
    // Map to standard Tailwind opacity classes when possible
    if (opacityPercent === 0) {
      classes.push('opacity-0');
    } else if (opacityPercent === 5) {
      classes.push('opacity-5');
    } else if (opacityPercent === 10) {
      classes.push('opacity-10');
    } else if (opacityPercent === 20) {
      classes.push('opacity-20');
    } else if (opacityPercent === 25) {
      classes.push('opacity-25');
    } else if (opacityPercent === 30) {
      classes.push('opacity-30');
    } else if (opacityPercent === 40) {
      classes.push('opacity-40');
    } else if (opacityPercent === 50) {
      classes.push('opacity-50');
    } else if (opacityPercent === 60) {
      classes.push('opacity-60');
    } else if (opacityPercent === 70) {
      classes.push('opacity-70');
    } else if (opacityPercent === 75) {
      classes.push('opacity-75');
    } else if (opacityPercent === 80) {
      classes.push('opacity-80');
    } else if (opacityPercent === 90) {
      classes.push('opacity-90');
    } else if (opacityPercent === 95) {
      classes.push('opacity-95');
    } else if (opacityPercent === 100) {
      // ignore default value 
      // classes.push('opacity-100');
    } else {
      // Use arbitrary value for non-standard percentages
      classes.push(`opacity-[${opacityPercent}%]`);
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

function convertBorder(styles: Record<string, any>): string[] {
    const classes: string[] = [];

    // Border width
    if (styles.strokeWeight !== undefined) {
        if (styles.strokeWeight === 0) {
            classes.push('border-0');
        } else if (styles.strokeWeight === 1) {
            // ignore default value 
            // classes.push('border-1');
        } else {
            
            // Individual border widths
            if (styles.strokeTopWeight === styles.strokeRightWeight &&
                styles.strokeTopWeight === styles.strokeBottomWeight &&
                styles.strokeTopWeight === styles.strokeLeftWeight &&
                styles.strokeTopWeight !== undefined) {
                classes.push(`border-[${styles.strokeTopWeight}]`);
            } else if (
                styles.strokeWeight !== undefined && styles.strokeWeight !== null
            ){ 
                classes.push(`border-[${styles.strokeWeight}]`);
            } else {
                if (styles.strokeTopWeight !== undefined && styles.strokeTopWeight !== null) classes.push(`border-t-[${styles.strokeTopWeight}]`);
                if (styles.strokeRightWeight !== undefined && styles.strokeRightWeight !== null) classes.push(`border-r-[${styles.strokeRightWeight}]`);
                if (styles.strokeBottomWeight !== undefined && styles.strokeBottomWeight !== null) classes.push(`border-b-[${styles.strokeBottomWeight}]`);
                if (styles.strokeLeftWeight !== undefined && styles.strokeLeftWeight !== null) classes.push(`border-l-[${styles.strokeLeftWeight}]`);
            }
        }
    } else {
        if (styles.strokeTopWeight !== undefined && styles.strokeTopWeight !== null) classes.push(`border-t-[${styles.strokeTopWeight}]`);
        if (styles.strokeRightWeight !== undefined && styles.strokeRightWeight !== null) classes.push(`border-r-[${styles.strokeRightWeight}]`);
        if (styles.strokeBottomWeight !== undefined && styles.strokeBottomWeight !== null) classes.push(`border-b-[${styles.strokeBottomWeight}]`);
        if (styles.strokeLeftWeight !== undefined && styles.strokeLeftWeight !== null) classes.push(`border-l-[${styles.strokeLeftWeight}]`);
    }

    

    // Border color with opacity
    if (styles.strokes && styles.strokes.length > 0) {
        const stroke = styles.strokes[0];
        if (stroke.type === 'SOLID') {
            const color = colorToHex(stroke.color);
            if (stroke.opacity !== undefined) {
                classes.push(`border-[${color}]/${Math.round(stroke.opacity * 100)}`);
            } else {
                classes.push(`border-[${color}]`);
            }
        }
    }

    // Border style
    if (styles.borderStyle) {
        switch (styles.borderStyle) {
            case 'SOLID':
                classes.push('border-solid');
                break;
            case 'DASHED':
                classes.push('border-dashed');
                break;
            case 'DOTTED':
                classes.push('border-dotted');
                break;
        }
    }

    // Border dash pattern
    if (styles.dashPattern && Array.isArray(styles.dashPattern) && styles.dashPattern.length > 0) {
        classes.push(`border-dashed-[${styles.dashPattern.join(',')}]`);
    }

    // Border alignment
    if (styles.strokeAlign) {
        switch (styles.strokeAlign) {
            case 'INSIDE':
                classes.push('border-inset');
                break;
            case 'OUTSIDE':
                classes.push('border-outset');
                break;
            // ignore default value 
            // case 'CENTER':
            //     classes.push('border-center');
            //     break;
        }
    }

    return classes;
}

function convertShadow(styles: Record<string, any>): string[] {
    const classes: string[] = [];

    if (styles.effects) {
        for (const effect of styles.effects) {
            if (effect.type === 'DROP_SHADOW') {
                const { radius, spread } = effect;
                
                
                if (radius === 2 && spread === 0) classes.push(shadowMap.sm);
                else if (radius === 6 && spread === -2) classes.push(shadowMap.md);
                else if (radius === 10 && spread === -3) classes.push(shadowMap.lg);
                else if (radius === 20 && spread === -5) classes.push(shadowMap.xl);
                else if (radius === 25 && spread === -8) classes.push(shadowMap['2xl']);
                else {
                    
                    const color = effect.color ? colorToHex(effect.color) : '#000000';
                    const opacity = effect.color?.a ?? 1;
                    classes.push(`shadow-[0_${effect.offset?.y ?? 0}px_${radius}px_${spread}px_${color}${opacity < 1 ? Math.round(opacity * 100) : ''}]`);
                }
            }
        }
    }

    return classes;
}

function convertSpacing(styles: Record<string, any>): string[] {
    const classes: string[] = [];

    // Margin
    if (styles.marginTop === styles.marginRight &&
        styles.marginTop === styles.marginBottom &&
        styles.marginTop === styles.marginLeft &&
        styles.marginTop !== undefined) {
        classes.push(`m-[${styles.marginTop}]`);
    } else {
        if (styles.marginTop !== undefined) classes.push(`mt-[${styles.marginTop}]`);
        if (styles.marginRight !== undefined) classes.push(`mr-[${styles.marginRight}]`);
        if (styles.marginBottom !== undefined) classes.push(`mb-[${styles.marginBottom}]`);
        if (styles.marginLeft !== undefined) classes.push(`ml-[${styles.marginLeft}]`);
    }

    return classes;
}

function convertPosition(styles: Record<string, any>): string[] {
  const classes: string[] = [];
  
  
  if (styles.layoutPositioning === 'ABSOLUTE') {
    classes.push('absolute');
  }
  
  
  if (styles.constraints) {
    const { horizontal, vertical } = styles.constraints;

    
    if (horizontal === 'MIN') {
      classes.push(`left-[${styles.x ?? 0}px]`);
    } else if (horizontal === 'MAX') {
      classes.push(`right-[${styles.x ?? 0}px]`);
    } else if (horizontal === 'CENTER') {
      
      classes.push('center-x');
      
      
      if (styles.parent?.width !== undefined && styles.width !== undefined) {
        
        const offset = Math.max(0, (styles.parent.width - styles.width) / 2);
        
        
        const leftOffset = offset + (styles.x ?? 0);
        const rightOffset = offset - (styles.x ?? 0);
        
        
        classes.push(`left-[${leftOffset}px]`, `right-[${rightOffset}px]`);
      } else if (styles.x !== undefined) {
        
        classes.push(`left-[${styles.x}px]`);
      }
    } else if (horizontal === 'STRETCH') {
      
      classes.push('stretch-x');
      
      
      const leftValue = styles.x ?? 0;
      
        
      let rightValue = leftValue;
      if (styles.parent?.width !== undefined && styles.width !== undefined) {
        rightValue = styles.parent.width - (leftValue + styles.width);
        if (rightValue < 0) rightValue = 0;
      }
      
      
      classes.push(`left-[${leftValue}px]`, `right-[${rightValue}px]`);
    } else if (horizontal === 'SCALE') {
      
      classes.push('scale-x');
      
      
      const leftValue = styles.x ?? 0;
      
      
      let rightValue = leftValue;
      if (styles.parent?.width !== undefined && styles.width !== undefined) {
        rightValue = styles.parent.width - (leftValue + styles.width);
        if (rightValue < 0) rightValue = 0;
      }
      
      
      classes.push(`left-[${leftValue}px]`, `right-[${rightValue}px]`);
    } else if (styles.x !== undefined) {
      
      classes.push(`left-[${styles.x}px]`);
    }
    
    
    if (vertical === 'MIN') {
      classes.push(`top-[${styles.y ?? 0}px]`);
    } else if (vertical === 'MAX') {
      classes.push(`bottom-[${styles.y ?? 0}px]`);
    } else if (vertical === 'CENTER') {
      
      classes.push('center-y');
      
      
      if (styles.parent?.height !== undefined && styles.height !== undefined) {
        
        const offset = Math.max(0, (styles.parent.height - styles.height) / 2);
        
        
        const topOffset = offset + (styles.y ?? 0);
        const bottomOffset = offset - (styles.y ?? 0);
        
        
        classes.push(`top-[${topOffset}px]`, `bottom-[${bottomOffset}px]`);
      } else if (styles.y !== undefined) {
        
        classes.push(`top-[${styles.y}px]`);
      }
    } else if (vertical === 'STRETCH') {
      
      classes.push('stretch-y');
      
      
      const topValue = styles.y ?? 0;
      
      
      let bottomValue = topValue;
      if (styles.parent?.height !== undefined && styles.height !== undefined) {
        bottomValue = styles.parent.height - (topValue + styles.height);
        if (bottomValue < 0) bottomValue = 0;
      }
      
      
      classes.push(`top-[${topValue}px]`, `bottom-[${bottomValue}px]`);
    } else if (vertical === 'SCALE') {
      
      classes.push('scale-y');
      
      
      const topValue = styles.y ?? 0;
      
      
      let bottomValue = topValue;
      if (styles.parent?.height !== undefined && styles.height !== undefined) {
        bottomValue = styles.parent.height - (topValue + styles.height);
        if (bottomValue < 0) bottomValue = 0;
      }
      
      
      classes.push(`top-[${topValue}px]`, `bottom-[${bottomValue}px]`);
    } else if (styles.y !== undefined) {
      
      classes.push(`top-[${styles.y}px]`);
    }
  } else if (styles.x !== undefined || styles.y !== undefined) {
    
    if (styles.x !== undefined) {
      classes.push(`left-[${styles.x}px]`);
    }
    if (styles.y !== undefined) {
      classes.push(`top-[${styles.y}px]`);
    }
  }
  
  
  if (typeof styles.order === 'number') {
    classes.push(`z-[${styles.order}]`);
  }
  
  return classes;
}

function convertSize(styles: Record<string, any>): string[] {
    const classes: string[] = [];

    // Min/Max constraints
    if (styles.minWidth !== undefined && styles.minWidth !== null) classes.push(`min-w-[${styles.minWidth}]`);
    if (styles.maxWidth !== undefined && styles.maxWidth !== null) classes.push(`max-w-[${styles.maxWidth}]`);
    if (styles.minHeight !== undefined && styles.minHeight !== null) classes.push(`min-h-[${styles.minHeight}]`);
    if (styles.maxHeight !== undefined && styles.maxHeight !== null) classes.push(`max-h-[${styles.maxHeight}]`);

    return classes;
}

export function figmaToCss(styles: Record<string, any>): string {
    const classes: string[] = [
        ...convertLayout(styles),
        ...convertColors(styles),
        ...convertTypography(styles),
        ...convertEffects(styles),
        ...convertGeometry(styles),
        ...convertBorder(styles),
        ...convertShadow(styles),
        ...convertSpacing(styles),
        ...convertPosition(styles),
        ...convertSize(styles)
    ];

    return classes.filter(Boolean).join(' ');
} 
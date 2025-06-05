import { isMixedValue, colorToHex } from './utils';

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

export function figmaTypographyToCss(styles: Record<string, any>): string[] {
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
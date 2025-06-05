import { FigmaColor } from '../types';
import { colorToHex } from './utils';

export function figmaBorderToCss(styles: Record<string, any>): string[] {
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
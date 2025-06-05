import { convertLayout } from './layout';
import { convertColors } from './colors';
import { convertTypography } from './typography';
import { convertEffects } from './effects';
import { convertGeometry } from './geometry';
import { convertBorder } from './border';
import { convertShadow } from './shadow';
import { convertSpacing } from './spacing';
import { convertPosition } from './position';
import { convertSize } from './size';

// Re-export individual converter functions
export { convertLayout } from './layout';
export { convertColors } from './colors';
export { convertTypography } from './typography';
export { convertEffects } from './effects';
export { convertGeometry } from './geometry';
export { convertBorder } from './border';
export { convertShadow } from './shadow';
export { convertSpacing } from './spacing';
export { convertPosition } from './position';
export { convertSize } from './size';

// Main conversion function that combines all modules
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
import { colorToHex } from './utils';

const shadowMap: Record<string, string> = {
    'sm': 'shadow-sm',    // radius: 2, spread: 0
    'md': 'shadow-md',    // radius: 6, spread: -2
    'lg': 'shadow-lg',    // radius: 10, spread: -3
    'xl': 'shadow-xl',    // radius: 20, spread: -5
    '2xl': 'shadow-2xl'   // radius: 25, spread: -8
};

export function convertShadow(styles: Record<string, any>): string[] {
    const classes: string[] = [];

    if (styles.effects) {
        for (const effect of styles.effects) {
            if (effect.type === 'DROP_SHADOW') {
                const { radius, spread, offset } = effect;
                const offsetX = offset?.x || 0;
                const offsetY = offset?.y || 0;
                
                // Check if this is a drop-shadow (filter-based) vs box-shadow
                // drop-shadow typically has no spread and very specific patterns
                const isFilterDropShadow = 
                    (spread === undefined || spread === 0) && 
                    (offsetX !== 0 || 
                     (offsetX === 0 && offsetY === 1 && (radius === 1 || radius === 2)) ||
                     (offsetX === 0 && offsetY === 4 && radius === 6) ||
                     (offsetX === 0 && offsetY === 10 && radius === 15) ||
                     (offsetX === 0 && offsetY === 20 && radius === 25) ||
                     (offsetX === 0 && offsetY === 25 && radius === 50));
                
                if (isFilterDropShadow) {
                    // This looks like a filter drop-shadow
                    
                    // Check for preset drop-shadow values
                    if (offsetX === 0 && offsetY === 0 && radius === 0) {
                        classes.push('drop-shadow-none');
                    } else if (offsetX === 0 && offsetY === 1 && radius === 1) {
                        classes.push('drop-shadow-sm');
                    } else if (offsetX === 0 && offsetY === 1 && radius === 2) {
                        classes.push('drop-shadow');
                    } else if (offsetX === 0 && offsetY === 4 && radius === 6) {
                        classes.push('drop-shadow-md');
                    } else if (offsetX === 0 && offsetY === 10 && radius === 15) {
                        classes.push('drop-shadow-lg');
                    } else if (offsetX === 0 && offsetY === 20 && radius === 25) {
                        classes.push('drop-shadow-xl');
                    } else if (offsetX === 0 && offsetY === 25 && radius === 50) {
                        classes.push('drop-shadow-2xl');
                    } else {
                        // Custom drop-shadow with arbitrary values
                        const color = effect.color ? colorToHex(effect.color) : '#000000';
                        const opacity = effect.color?.a !== undefined ? effect.color.a : 1;
                        const colorWithOpacity = opacity < 1 ? `rgba(${Math.round(effect.color.r * 255)},${Math.round(effect.color.g * 255)},${Math.round(effect.color.b * 255)},${opacity})` : color;
                        classes.push(`drop-shadow-[${offsetX}_${offsetY}_${radius}_${colorWithOpacity}]`);
                    }
                } else {
                    // This looks like a box-shadow (has spread or follows box-shadow patterns)
                    // Keep existing box-shadow logic
                    if (radius === 2 && spread === 0) classes.push(shadowMap.sm);
                    else if (radius === 6 && spread === -2) classes.push(shadowMap.md);
                    else if (radius === 10 && spread === -3) classes.push(shadowMap.lg);
                    else if (radius === 20 && spread === -5) classes.push(shadowMap.xl);
                    else if (radius === 25 && spread === -8) classes.push(shadowMap['2xl']);
                    else {
                        const color = effect.color ? colorToHex(effect.color) : '#000000';
                        const opacity = effect.color?.a ?? 1;
                        classes.push(`shadow-[${offsetX}_${offsetY}px_${radius}px_${spread}px_${color}${opacity < 1 ? Math.round(opacity * 100) : ''}]`);
                    }
                }
            }
        }
    }

    return classes;
} 
export function convertEffects(styles: Record<string, any>): string[] {
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

  // Filter Effects
  if (styles.effects && Array.isArray(styles.effects)) {
    for (const effect of styles.effects) {
      if (effect.type === 'LAYER_BLUR') {
        // Convert LAYER_BLUR to blur classes
        const radius = effect.radius || 0;
        
        if (radius === 0) {
          classes.push('blur-none');
        } else if (radius === 4) {
          classes.push('blur-sm');
        } else if (radius === 8) {
          classes.push('blur');
        } else if (radius === 12) {
          classes.push('blur-md');
        } else if (radius === 16) {
          classes.push('blur-lg');
        } else if (radius === 24) {
          classes.push('blur-xl');
        } else if (radius === 40) {
          classes.push('blur-2xl');
        } else if (radius === 64) {
          classes.push('blur-3xl');
        } else {
          classes.push(`blur-[${radius}]`);
        }
      } else if (effect.type === 'BACKGROUND_BLUR') {
        // Convert BACKGROUND_BLUR to backdrop-blur classes
        const radius = effect.radius || 0;
        
        if (radius === 0) {
          classes.push('backdrop-blur-none');
        } else if (radius === 4) {
          classes.push('backdrop-blur-sm');
        } else if (radius === 8) {
          classes.push('backdrop-blur');
        } else if (radius === 12) {
          classes.push('backdrop-blur-md');
        } else if (radius === 16) {
          classes.push('backdrop-blur-lg');
        } else if (radius === 24) {
          classes.push('backdrop-blur-xl');
        } else if (radius === 40) {
          classes.push('backdrop-blur-2xl');
        } else if (radius === 64) {
          classes.push('backdrop-blur-3xl');
        } else {
          classes.push(`backdrop-blur-[${radius}]`);
        }
      }
      // Note: DROP_SHADOW effects are handled in convertShadow function
      // to avoid conflicts with box-shadow processing
    }
  }

  return classes;
} 
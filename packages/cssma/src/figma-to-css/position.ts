export function figmaPositionToCss(styles: Record<string, any>): string[] {
  const classes: string[] = [];
  
  if (styles.layoutPositioning === 'ABSOLUTE') {
    classes.push('absolute');
  } else if (styles.position === 'FIXED') {
    classes.push('fixed');
  }
  
  if (styles.constraints) {
    const { horizontal, vertical } = styles.constraints;

    if (horizontal === 'MIN') {
      if (styles.x !== undefined && styles.x !== 0) {
        classes.push(`left-[${styles.x}px]`);
      }
    } else if (horizontal === 'MAX') {
      if (styles.x !== undefined) {
        classes.push(`right-[${styles.x}px]`);
      }
    } else if (horizontal === 'CENTER') {
      classes.push('center-x');
      // Calculate center positioning based on parent and element size
      if (styles.parent?.width !== undefined && styles.width !== undefined) {
        const centerOffset = (styles.parent.width - styles.width) / 2;
        const leftOffset = centerOffset + (styles.x ?? 0);
        const rightOffset = centerOffset - (styles.x ?? 0);
        classes.push(`left-[${leftOffset}px]`);
        classes.push(`right-[${rightOffset}px]`);
      } else if (styles.x !== undefined) {
        classes.push(`left-[${styles.x}px]`);
      }
    } else if (horizontal === 'STRETCH') {
      classes.push('stretch-x');
      // Calculate stretch positioning based on parent and element size
      if (styles.parent?.width !== undefined && styles.width !== undefined) {
        const leftValue = styles.x ?? 0;
        const rightValue = styles.parent.width - (leftValue + styles.width);
        if (leftValue !== 0) {
          classes.push(`left-[${leftValue}px]`);
        }
        classes.push(`right-[${rightValue}px]`);
      } else {
        // Fallback for cases without parent size info
        if (styles.x !== undefined && styles.x !== 0) {
          classes.push(`left-[${styles.x}px]`);
          classes.push(`right-[${styles.x}px]`);
        } else {
          classes.push(`left-[0px]`);
          classes.push(`right-[0px]`);
        }
      }
    } else if (horizontal === 'SCALE') {
      classes.push('scale-x');
      
      const leftValue = styles.x ?? 0;
      
      let rightValue = leftValue;
      if (styles.parent?.width !== undefined && styles.width !== undefined) {
        rightValue = styles.parent.width - (leftValue + styles.width);
        if (rightValue < 0) rightValue = 0;
      }
      
      if (leftValue !== 0) {
        classes.push(`left-[${leftValue}px]`);
      }
      classes.push(`right-[${rightValue}px]`);
    } else if (styles.x !== undefined && styles.x !== 0) {
      classes.push(`left-[${styles.x}px]`);
    }
    
    if (vertical === 'MIN') {
      if (styles.y !== undefined && styles.y !== 0) {
        classes.push(`top-[${styles.y}px]`);
      }
    } else if (vertical === 'MAX') {
      if (styles.y !== undefined) {
        classes.push(`bottom-[${styles.y}px]`);
      }
    } else if (vertical === 'CENTER') {
      classes.push('center-y');
      // Calculate center positioning based on parent and element size
      if (styles.parent?.height !== undefined && styles.height !== undefined) {
        const centerOffset = (styles.parent.height - styles.height) / 2;
        const topOffset = centerOffset + (styles.y ?? 0);
        const bottomOffset = centerOffset - (styles.y ?? 0);
        classes.push(`top-[${topOffset}px]`);
        classes.push(`bottom-[${bottomOffset}px]`);
      } else if (styles.y !== undefined) {
        classes.push(`top-[${styles.y}px]`);
      }
    } else if (vertical === 'STRETCH') {
      classes.push('stretch-y');
      // Calculate stretch positioning based on parent and element size
      if (styles.parent?.height !== undefined && styles.height !== undefined) {
        const topValue = styles.y ?? 0;
        const bottomValue = styles.parent.height - (topValue + styles.height);
        if (topValue !== 0) {
          classes.push(`top-[${topValue}px]`);
        }
        classes.push(`bottom-[${bottomValue}px]`);
      } else {
        // Fallback for cases without parent size info
        if (styles.y !== undefined && styles.y !== 0) {
          classes.push(`top-[${styles.y}px]`);
          classes.push(`bottom-[${styles.y}px]`);
        } else {
          classes.push(`top-[0px]`);
          classes.push(`bottom-[0px]`);
        }
      }
    } else if (vertical === 'SCALE') {
      classes.push('scale-y');
      
      const topValue = styles.y ?? 0;
      
      let bottomValue = topValue;
      if (styles.parent?.height !== undefined && styles.height !== undefined) {
        bottomValue = styles.parent.height - (topValue + styles.height);
        if (bottomValue < 0) bottomValue = 0;
      }
      
      if (topValue !== 0) {
        classes.push(`top-[${topValue}px]`);
      }
      classes.push(`bottom-[${bottomValue}px]`);
    } else if (styles.y !== undefined && styles.y !== 0) {
      classes.push(`top-[${styles.y}px]`);
    }
  } else if (styles.x !== undefined || styles.y !== undefined) {
    // For positioned elements (absolute/fixed), always add coordinates even if 0
    const isPositioned = styles.layoutPositioning === 'ABSOLUTE' || styles.position === 'FIXED';
    
    if (styles.x !== undefined) {
      if (styles.x !== 0 || isPositioned) {
        classes.push(`left-[${styles.x}px]`);
      }
    }
    if (styles.y !== undefined) {
      if (styles.y !== 0 || isPositioned) {
        classes.push(`top-[${styles.y}px]`);
      }
    }
  }
  
  if (typeof styles.order === 'number' && styles.order !== 0) {
    classes.push(`z-[${styles.order}]`);
  }
  
  return classes;
} 
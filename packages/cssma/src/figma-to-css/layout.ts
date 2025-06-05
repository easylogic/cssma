export function figmaLayoutToCss(styles: Record<string, any>): string[] {
  const classes: string[] = [];

  // Layout mode
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

  // Self alignment (individual item alignment)
  if (styles.layoutAlign === 'MIN') classes.push('self-start');
  if (styles.layoutAlign === 'CENTER') classes.push('self-center');
  if (styles.layoutAlign === 'MAX') classes.push('self-end');
  if (styles.layoutAlign === 'STRETCH') classes.push('self-stretch');

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
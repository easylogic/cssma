const radiusMap: Record<number, string> = {
  4: 'rounded-sm',
  6: 'rounded-md',
  8: 'rounded-lg',
  12: 'rounded-xl',
  16: 'rounded-2xl',
  9999: 'rounded-full'
};

export function convertGeometry(styles: Record<string, any>): string[] {
  const classes: string[] = [];

  // Border radius
  if (styles.cornerRadius) {
    const radius = radiusMap[styles.cornerRadius] || `rounded-[${styles.cornerRadius}]`;
    classes.push(radius);
  }

  return classes;
} 
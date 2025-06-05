export function convertSize(styles: Record<string, any>): string[] {
    const classes: string[] = [];

    // Min/Max constraints
    if (styles.minWidth !== undefined && styles.minWidth !== null) classes.push(`min-w-[${styles.minWidth}]`);
    if (styles.maxWidth !== undefined && styles.maxWidth !== null) classes.push(`max-w-[${styles.maxWidth}]`);
    if (styles.minHeight !== undefined && styles.minHeight !== null) classes.push(`min-h-[${styles.minHeight}]`);
    if (styles.maxHeight !== undefined && styles.maxHeight !== null) classes.push(`max-h-[${styles.maxHeight}]`);

    return classes;
} 
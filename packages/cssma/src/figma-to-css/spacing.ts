export function convertSpacing(styles: Record<string, any>): string[] {
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
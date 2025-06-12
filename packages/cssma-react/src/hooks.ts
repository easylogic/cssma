import { useEffect, useMemo } from 'react';
import { generateHybridStyles, injectDynamicStyle } from 'cssma';
import { generateCss, generateRuntimeCss } from 'cssma/dynamic';

/**
 * Main hook for dynamic CSS class processing using cssma
 */
export function useCssma(styles: string) {
  const result = useMemo(() => {
    if (!styles || styles.trim() === '') {
      return {
        staticClassName: '',
        dynamicClassName: '',
        combinedClassName: '',
        styleContent: '',
        hash: ''
      };
    }

    return generateHybridStyles(styles);
  }, [styles]);

  // Inject dynamic styles into the document
  useEffect(() => {
    if (result.styleContent && result.hash) {
      injectDynamicStyle(result.hash, result.styleContent);
    }
  }, [result.styleContent, result.hash]);

  return {
    className: result.combinedClassName,
    staticClassName: result.staticClassName,
    dynamicClassName: result.dynamicClassName,
    styleContent: result.styleContent,
    hash: result.hash
  };
}

/**
 * Legacy compatibility hook - alias for useCssma
 * @deprecated Use useCssma instead
 */
export function useTailwind(tailwindClasses: string) {
  return useCssma(tailwindClasses);
}

/**
 * Legacy compatibility hook - alias for useCssma
 * @deprecated Use useCssma instead
 */
export function useDynamicTailwind(tailwindClasses: string) {
  return useCssma(tailwindClasses);
}

/**
 * Modern hook for runtime CSS generation with optimization options
 */
export function useCssmaRuntime(
  classes: string, 
  options?: {
    /** Generate all classes including standard ones (default: false - runtime only) */
    includeStandard?: boolean;
    /** Custom filter function to determine which classes to process */
    filter?: (className: string) => boolean;
  }
) {
  const result = useMemo(() => {
    if (!classes || classes.trim() === '') {
      return {
        className: '',
        styleContent: '',
        hash: '',
        skippedClasses: []
      };
    }

    // Use new CSS generation system
    if (options?.includeStandard) {
      // Generate all classes
      if (options?.filter) {
        return generateCss(classes, { filter: options.filter });
      } else {
        return generateCss(classes);
      }
    } else {
      // Runtime-only optimization (default)
      if (options?.filter) {
        return generateCss(classes, { 
          runtimeOnly: true, 
          skipStandard: true,
          filter: options.filter 
        });
      } else {
        return generateRuntimeCss(classes);
      }
    }
  }, [classes, options?.includeStandard, options?.filter]);

  // Inject dynamic styles into the document
  useEffect(() => {
    if (result.styleContent && result.hash) {
      injectDynamicStyle(result.hash, result.styleContent);
    }
  }, [result.styleContent, result.hash]);

  return {
    className: result.className,
    styleContent: result.styleContent,
    hash: result.hash,
    skippedClasses: result.skippedClasses
  };
}

/**
 * Hook for processing multiple class sets
 */
export function useCssmaMultiple(classGroups: string[]): Array<{
  className: string;
  staticClassName: string;
  dynamicClassName: string;
  styleContent: string;
  hash: string;
}>;

export function useCssmaMultiple<T extends Record<string, string>>(classGroups: T): {
  [K in keyof T]: {
    className: string;
    staticClassName: string;
    dynamicClassName: string;
    styleContent: string;
    hash: string;
  }
};

export function useCssmaMultiple(classGroups: string[] | Record<string, string>) {
  const results = useMemo(() => {
    if (Array.isArray(classGroups)) {
      return classGroups.map(classes => generateHybridStyles(classes));
    } else {
      // Object case
      const entries = Object.entries(classGroups);
      return entries.map(([key, classes]) => ({
        key,
        result: generateHybridStyles(classes)
      }));
    }
  }, [classGroups]);

  // Inject all dynamic styles
  useEffect(() => {
    if (Array.isArray(classGroups)) {
      results.forEach((result: any) => {
        if (result.styleContent && result.hash) {
          injectDynamicStyle(result.hash, result.styleContent);
        }
      });
    } else {
      results.forEach((item: any) => {
        const result = item.result;
        if (result.styleContent && result.hash) {
          injectDynamicStyle(result.hash, result.styleContent);
        }
      });
    }
  }, [results, classGroups]);

  if (Array.isArray(classGroups)) {
    return results.map((result: any) => ({
      className: result.combinedClassName,
      staticClassName: result.staticClassName,
      dynamicClassName: result.dynamicClassName,
      styleContent: result.styleContent,
      hash: result.hash
    }));
  } else {
    // Return object with same keys
    const returnObj: any = {};
    results.forEach((item: any) => {
      const result = item.result;
      returnObj[item.key] = {
        className: result.combinedClassName,
        staticClassName: result.staticClassName,
        dynamicClassName: result.dynamicClassName,
        styleContent: result.styleContent,
        hash: result.hash
      };
    });
    return returnObj;
  }
} 
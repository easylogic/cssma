import { useEffect, useMemo } from 'react';
import { generateHybridStyles, injectDynamicStyle } from 'cssma';

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
 * Hook for processing multiple class sets
 */
export function useCssmaMultiple(classGroups: string[]) {
  const results = useMemo(() => {
    return classGroups.map(classes => generateHybridStyles(classes));
  }, [classGroups]);

  // Inject all dynamic styles
  useEffect(() => {
    results.forEach(result => {
      if (result.styleContent && result.hash) {
        injectDynamicStyle(result.hash, result.styleContent);
      }
    });
  }, [results]);

  return results.map(result => ({
    className: result.combinedClassName,
    staticClassName: result.staticClassName,
    dynamicClassName: result.dynamicClassName,
    styleContent: result.styleContent,
    hash: result.hash
  }));
} 
import { parseStyles } from '../parser';
import { ParsedStyle } from '../types';
import { createHash } from 'crypto';

/**
 * Generate CSS class name from Tailwind class (escaping special characters)
 */
function generateCssClassName(tailwindClass: string): string {
  // CSS에서 사용할 수 있도록 특수문자 이스케이프
  return tailwindClass
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/\./g, '\\.')
    .replace(/\//g, '\\/')
    .replace(/:/g, '\\:')
    .replace(/#/g, '\\#')
    .replace(/%/g, '\\%')
    .replace(/\+/g, '\\+')
    .replace(/\*/g, '\\*')
    .replace(/\?/g, '\\?')
    .replace(/\^/g, '\\^')
    .replace(/\$/g, '\\$')
    .replace(/\|/g, '\\|');
}

/**
 * Convert parsed styles to CSS properties
 */
function parsedStylesToCSSProperties(parsedStyles: ParsedStyle[]): string {
  const cssProperties: string[] = [];
  
  parsedStyles.forEach(({ property, value }) => {
    // Convert camelCase to kebab-case
    const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
    
    // Format CSS value
    let cssValue: string;
    if (typeof value === 'number') {
      // Properties that need px unit
      const pxProperties = [
        'width', 'height', 'min-width', 'max-width', 'min-height', 'max-height',
        'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
        'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
        'gap', 'border-width', 'border-radius', 'font-size', 'top', 'right', 'bottom', 'left',
        'letter-spacing', 'line-height'
      ];
      
      if (pxProperties.includes(cssProperty)) {
        cssValue = `${value}px`;
      } else {
        cssValue = String(value);
      }
    } else {
      cssValue = String(value);
    }
    
    cssProperties.push(`  ${cssProperty}: ${cssValue};`);
  });

  return cssProperties.join('\n');
}

/**
 * Check if a Tailwind class is dynamic (contains [...] pattern)
 */
export function isDynamicClass(tailwindClass: string): boolean {
  return /\[[^\]]+\]/.test(tailwindClass);
}

/**
 * Separate static and dynamic classes
 */
export function separateStaticAndDynamicClasses(tailwindClasses: string): {
  staticClasses: string[];
  dynamicClasses: string[];
} {
  const classes = tailwindClasses.split(/\s+/).filter(Boolean);
  const staticClasses: string[] = [];
  const dynamicClasses: string[] = [];

  classes.forEach(cls => {
    if (isDynamicClass(cls)) {
      dynamicClasses.push(cls);
    } else {
      staticClasses.push(cls);
    }
  });

  return { staticClasses, dynamicClasses };
}

/**
 * Generate individual CSS rules for dynamic classes
 */
export function generateDynamicClassStyles(dynamicClasses: string[]): {
  cssRules: string[];
  processedClasses: string[];
} {
  const cssRules: string[] = [];
  const processedClasses: string[] = [];

  dynamicClasses.forEach(tailwindClass => {
    try {
      // Parse the individual class
      const parsedStyles = parseStyles(tailwindClass);
      
      if (parsedStyles.length > 0) {
        // Generate CSS class name (escaped)
        const cssClassName = generateCssClassName(tailwindClass);
        
        // Convert parsed styles to CSS properties
        const cssProperties = parsedStylesToCSSProperties(parsedStyles);

        // Create CSS rule
        const cssRule = `.${cssClassName} {\n${cssProperties}\n}`;
        cssRules.push(cssRule);
        processedClasses.push(tailwindClass); // 원본 클래스명 유지
      }
    } catch (error) {
      console.warn(`Failed to parse dynamic class: ${tailwindClass}`, error);
      // 파싱 실패한 클래스도 원본 그대로 유지
      processedClasses.push(tailwindClass);
    }
  });

  return { cssRules, processedClasses };
}

/**
 * Generate hybrid styles (static + dynamic classes with individual CSS rules)
 */
export function generateHybridStyles(tailwindClasses: string): {
  staticClassName: string;
  dynamicClassName: string;
  combinedClassName: string;
  styleContent: string;
  hash: string;
} {
  const { staticClasses, dynamicClasses } = separateStaticAndDynamicClasses(tailwindClasses);
  
  // Generate CSS for dynamic classes
  const { cssRules, processedClasses } = generateDynamicClassStyles(dynamicClasses);
  
  // Combine all classes
  const staticClassName = staticClasses.join(' ');
  const dynamicClassName = processedClasses.join(' ');
  const combinedClassName = [staticClassName, dynamicClassName].filter(Boolean).join(' ');
  
  // Generate style content
  const styleContent = cssRules.join('\n\n');
  
  // Generate hash for deduplication
  const hash = createHash('md5').update(styleContent).digest('hex').substring(0, 8);
  
  return {
    staticClassName,
    dynamicClassName,
    combinedClassName,
    styleContent,
    hash
  };
}

/**
 * Generate dynamic style with individual class approach
 * @deprecated Use generateHybridStyles instead
 */
export function generateDynamicStyle(tailwindClasses: string): {
  className: string;
  styleContent: string;
  hash: string;
} {
  const result = generateHybridStyles(tailwindClasses);
  return {
    className: result.combinedClassName,
    styleContent: result.styleContent,
    hash: result.hash
  };
} 
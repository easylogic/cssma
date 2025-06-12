import { parseStyles } from '../parser';
import { ParsedStyle } from '../types';
import { convertClassNamesToCSS, CSSConversion } from '../converter/class-names';
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
 * Convert parsed styles to CSS properties (legacy)
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
 * Convert CSS conversions to CSS properties (new converter system)
 */
function cssConversionsToCSSProperties(conversions: CSSConversion[]): string {
  const cssProperties: string[] = [];
  
  conversions.forEach(({ cssProperty, cssValue }) => {
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
 * Check if a class is likely to be in standard Tailwind CSS
 */
export function isStandardClass(className: string): boolean {
  // Standard utility patterns that are typically included in Tailwind CSS
  const standardPatterns = [
    // Layout
    /^(block|inline|inline-block|flex|inline-flex|grid|inline-grid|hidden)$/,
    /^(static|fixed|absolute|relative|sticky)$/,
    
    // Flexbox & Grid
    /^(flex-row|flex-col|flex-wrap|flex-nowrap)$/,
    /^(justify-start|justify-end|justify-center|justify-between|justify-around|justify-evenly)$/,
    /^(items-start|items-end|items-center|items-baseline|items-stretch)$/,
    /^(grid-cols-\d+|grid-rows-\d+)$/,
    
    // Spacing (common values)
    /^[pm][trblxy]?-\d{1,2}$/,  // p-4, mt-8, px-6, etc. (up to 2 digits)
    
    // Sizing (common values)
    /^[wh]-\d{1,2}$/,  // w-4, h-8, etc.
    /^[wh]-(auto|full|screen|min|max|fit)$/,
    
    // Colors (standard palette)
    /^(bg|text|border)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}$/,
    
    // Typography
    /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/,
    /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/,
    /^(text-left|text-center|text-right|text-justify)$/,
    
    // Borders
    /^border(-\d)?$/,
    /^rounded(-sm|-md|-lg|-xl|-2xl|-3xl|-full)?$/,
    
    // Effects
    /^shadow(-sm|-md|-lg|-xl|-2xl|-inner|-none)?$/,
    /^opacity-\d{1,3}$/,
    
    // Common z-index values
    /^z-(0|10|20|30|40|50|auto)$/,
    
    // Overflow
    /^overflow-(auto|hidden|visible|scroll)$/,
    /^overflow-[xy]-(auto|hidden|visible|scroll)$/
  ];
  
  return standardPatterns.some(pattern => pattern.test(className));
}

/**
 * Check if a class needs runtime generation
 */
export function needsRuntime(className: string): boolean {
  // Always generate arbitrary values
  if (isDynamicClass(className)) {
    return true;
  }
  
  // Check specific patterns that need runtime generation
  
  // Gradient system (CSS variables)
  if (/^(from|via|to)-/.test(className)) return true;
  if (/^bg-linear-to-/.test(className)) return true;
  if (/^bg-radial-/.test(className)) return true;
  if (/^bg-conic-/.test(className)) return true;
  
  // Complex flexbox values
  if (/^flex-(grow|shrink)(-\d+)?$/.test(className)) return true;
  if (/^flex-\d+$/.test(className)) return true;
  
  // Individual border directions
  if (/^border-[trblxy](-\d+)?$/.test(className)) return true;
  
  // Uncommon z-index values (not in standard set)
  if (/^-?z-\d+$/.test(className) && !/^z-(0|10|20|30|40|50|auto)$/.test(className)) {
    return true;
  }
  
  // Custom spacing values
  if (/^[pm][trblxy]?-\d{3,}$/.test(className)) return true;  // Large spacing values (3+ digits)
  
  // Custom sizing values
  if (/^[wh]-\d{3,}$/.test(className)) return true;  // Large size values
  
  // Non-standard colors or custom values
  if (/^(bg|text|border)-\w+-\d{4,}$/.test(className)) return true;  // 4+ digit color values
  
  return false;
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
      // Try new converter system first
      const conversions = convertClassNamesToCSS(tailwindClass);
      
      if (conversions.length > 0) {
        // Generate CSS class name (escaped)
        const cssClassName = generateCssClassName(tailwindClass);
        
        // Convert CSS conversions to CSS properties
        const cssProperties = cssConversionsToCSSProperties(conversions);

        // Create CSS rule
        const cssRule = `.${cssClassName} {\n${cssProperties}\n}`;
        cssRules.push(cssRule);
        processedClasses.push(tailwindClass); // 원본 클래스명 유지
      } else {
        // Fallback to legacy parser for unsupported classes
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
 * Generate CSS rules for all classes (both static and dynamic)
 */
export function generateAllClassStyles(tailwindClasses: string): {
  cssRules: string[];
  processedClasses: string[];
} {
  const classes = tailwindClasses.split(/\s+/).filter(Boolean);
  const cssRules: string[] = [];
  const processedClasses: string[] = [];

  classes.forEach(tailwindClass => {
    try {
      // Use new converter system for all classes
      const conversions = convertClassNamesToCSS(tailwindClass);
      
      if (conversions.length > 0) {
        // Generate CSS class name (escaped)
        const cssClassName = generateCssClassName(tailwindClass);
        
        // Convert CSS conversions to CSS properties
        const cssProperties = cssConversionsToCSSProperties(conversions);

        // Create CSS rule
        const cssRule = `.${cssClassName} {\n${cssProperties}\n}`;
        cssRules.push(cssRule);
        processedClasses.push(tailwindClass);
      } else {
        // Fallback to legacy parser for unsupported classes
        const parsedStyles = parseStyles(tailwindClass);
        
        if (parsedStyles.length > 0) {
          const cssClassName = generateCssClassName(tailwindClass);
          const cssProperties = parsedStylesToCSSProperties(parsedStyles);
          const cssRule = `.${cssClassName} {\n${cssProperties}\n}`;
          cssRules.push(cssRule);
          processedClasses.push(tailwindClass);
        } else {
          // Keep unsupported classes as-is
          processedClasses.push(tailwindClass);
        }
      }
    } catch (error) {
      console.warn(`Failed to process class: ${tailwindClass}`, error);
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
 * Options for style generation
 */
export interface GenerateOptions {
  /** Only generate styles for classes that need runtime generation (default: false) */
  runtimeOnly?: boolean;
  /** Skip standard classes that are likely already defined (default: false) */
  skipStandard?: boolean;
  /** Custom filter function to determine which classes to process */
  filter?: (className: string) => boolean;
}

/**
 * Generate CSS rules with filtering options
 */
export function generateStyles(
  classes: string, 
  options: GenerateOptions = {}
): {
  cssRules: string[];
  processedClasses: string[];
  skippedClasses: string[];
} {
  const classList = classes.split(/\s+/).filter(Boolean);
  const cssRules: string[] = [];
  const processedClasses: string[] = [];
  const skippedClasses: string[] = [];

  classList.forEach(className => {
    let shouldProcess = true;

    // Apply filters
    if (options.runtimeOnly && !needsRuntime(className)) {
      shouldProcess = false;
    }
    
    if (options.skipStandard && isStandardClass(className)) {
      shouldProcess = false;
    }
    
    if (options.filter && !options.filter(className)) {
      shouldProcess = false;
    }

    if (!shouldProcess) {
      skippedClasses.push(className);
      return;
    }

    try {
      // Use new converter system for all classes
      const conversions = convertClassNamesToCSS(className);
      
      if (conversions.length > 0) {
        // Generate CSS class name (escaped)
        const cssClassName = generateCssClassName(className);
        
        // Convert CSS conversions to CSS properties
        const cssProperties = cssConversionsToCSSProperties(conversions);

        // Create CSS rule
        const cssRule = `.${cssClassName} {\n${cssProperties}\n}`;
        cssRules.push(cssRule);
        processedClasses.push(className);
      } else {
        // Fallback to legacy parser for unsupported classes
        const parsedStyles = parseStyles(className);
        
        if (parsedStyles.length > 0) {
          const cssClassName = generateCssClassName(className);
          const cssProperties = parsedStylesToCSSProperties(parsedStyles);
          const cssRule = `.${cssClassName} {\n${cssProperties}\n}`;
          cssRules.push(cssRule);
          processedClasses.push(className);
        } else {
          // Keep unsupported classes as-is
          skippedClasses.push(className);
        }
      }
    } catch (error) {
      console.warn(`Failed to process class: ${className}`, error);
      skippedClasses.push(className);
    }
  });

  return { cssRules, processedClasses, skippedClasses };
}

/**
 * Generate CSS with all classes
 */
export function generateCss(
  classes: string,
  options: GenerateOptions = {}
): {
  className: string;
  styleContent: string;
  hash: string;
  skippedClasses: string[];
} {
  const { cssRules, processedClasses, skippedClasses } = generateStyles(classes, options);
  
  // Combine all classes (including skipped ones for the final className)
  const allClasses = [...processedClasses, ...skippedClasses];
  const className = allClasses.join(' ');
  
  // Generate style content
  const styleContent = cssRules.join('\n\n');
  
  // Generate hash for deduplication
  const hash = createHash('md5').update(styleContent || className).digest('hex').substring(0, 8);
  
  return {
    className,
    styleContent,
    hash,
    skippedClasses
  };
}

/**
 * Generate only runtime-needed styles (optimized for existing Tailwind sites)
 */
export function generateRuntimeCss(classes: string): {
  className: string;
  styleContent: string;
  hash: string;
  skippedClasses: string[];
} {
  return generateCss(classes, {
    runtimeOnly: true,
    skipStandard: true
  });
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
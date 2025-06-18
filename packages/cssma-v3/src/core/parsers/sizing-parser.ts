import { ParsedStyles, Config, ParsedClass, DesignPreset } from '../../types'

export interface SizingStyles {
  width?: string
  height?: string
  minWidth?: string
  maxWidth?: string
  minHeight?: string
  maxHeight?: string
  size?: string  // Tailwind v3.4+ feature for width and height together
}

/**
 * Sizing Parser - handles width, height, min/max width/height and size utilities
 * Supports: w-*, h-*, min-w-*, max-w-*, min-h-*, max-h-*, size-*
 */
export class SizingParser {
  private config: Config

  constructor(config: Config) {
    this.config = config
  }

  /**
   * Parse sizing-related class names
   */
  parseSizing(className: string): SizingStyles | null {
    // Validate malformed arbitrary values early
    const hasMalformedArbitrary = (className.includes('[') && !className.includes(']')) || 
                                  (!className.includes('[') && className.includes(']'))
    if (hasMalformedArbitrary) {
      return null
    }

    // Width
    if (className.startsWith('w-')) {
      const value = className.replace('w-', '')
      return { width: this.parseWidth(value) }
    }

    // Height
    if (className.startsWith('h-')) {
      const value = className.replace('h-', '')
      return { height: this.parseHeight(value) }
    }

    // Min Width
    if (className.startsWith('min-w-')) {
      const value = className.replace('min-w-', '')
      return { minWidth: this.parseMinWidth(value) }
    }

    // Max Width
    if (className.startsWith('max-w-')) {
      const value = className.replace('max-w-', '')
      return { maxWidth: this.parseMaxWidth(value) }
    }

    // Min Height
    if (className.startsWith('min-h-')) {
      const value = className.replace('min-h-', '')
      return { minHeight: this.parseMinHeight(value) }
    }

    // Max Height
    if (className.startsWith('max-h-')) {
      const value = className.replace('max-h-', '')
      return { maxHeight: this.parseMaxHeight(value) }
    }

    // Size (width + height together)
    if (className.startsWith('size-')) {
      const value = className.replace('size-', '')
      return { size: this.parseSize(value) }
    }

    return null
  }

  /**
   * Parse width values
   */
  private parseWidth(value: string): string {
    // Handle arbitrary values: w-[200px]
    if (value.startsWith('[') && value.endsWith(']')) {
      return value.slice(1, -1)
    }

    // Handle fraction values: w-1/2
    if (value.includes('/')) {
      const [numerator, denominator] = value.split('/').map(Number);
      if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
        return `${(numerator / denominator) * 100}%`;
      }
    }

    // Predefined values (spacing scale + special values)
    const widthMap: Record<string, string> = {
      '0': '0px',
      'px': '1px',
      '0.5': '0.125rem',
      '1': '0.25rem',
      '1.5': '0.375rem',
      '2': '0.5rem',
      '2.5': '0.625rem',
      '3': '0.75rem',
      '3.5': '0.875rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '7': '1.75rem',
      '8': '2rem',
      '9': '2.25rem',
      '10': '2.5rem',
      '11': '2.75rem',
      '12': '3rem',
      '14': '3.5rem',
      '16': '4rem',
      '20': '5rem',
      '24': '6rem',
      '28': '7rem',
      '32': '8rem',
      '36': '9rem',
      '40': '10rem',
      '44': '11rem',
      '48': '12rem',
      '52': '13rem',
      '56': '14rem',
      '60': '15rem',
      '64': '16rem',
      '72': '18rem',
      '80': '20rem',
      '96': '24rem',
      'auto': 'auto',
      'full': '100%',
      'screen': '100vw',
      'svw': '100svw',   // Small viewport width
      'lvw': '100lvw',   // Large viewport width
      'dvw': '100dvw',   // Dynamic viewport width
      'min': 'min-content',
      'max': 'max-content',
      'fit': 'fit-content'
    }

    return widthMap[value] || value
  }

  /**
   * Parse height values
   */
  private parseHeight(value: string): string {
    // Handle arbitrary values: h-[400px]
    if (value.startsWith('[') && value.endsWith(']')) {
      return value.slice(1, -1)
    }

    // Handle fraction values: h-1/2
    if (value.includes('/')) {
      const [numerator, denominator] = value.split('/').map(Number);
      if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
        return `${(numerator / denominator) * 100}%`;
      }
    }

    // Predefined values (spacing scale + special values)
    const heightMap: Record<string, string> = {
      '0': '0px',
      'px': '1px',
      '0.5': '0.125rem',
      '1': '0.25rem',
      '1.5': '0.375rem',
      '2': '0.5rem',
      '2.5': '0.625rem',
      '3': '0.75rem',
      '3.5': '0.875rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '7': '1.75rem',
      '8': '2rem',
      '9': '2.25rem',
      '10': '2.5rem',
      '11': '2.75rem',
      '12': '3rem',
      '14': '3.5rem',
      '16': '4rem',
      '20': '5rem',
      '24': '6rem',
      '28': '7rem',
      '32': '8rem',
      '36': '9rem',
      '40': '10rem',
      '44': '11rem',
      '48': '12rem',
      '52': '13rem',
      '56': '14rem',
      '60': '15rem',
      '64': '16rem',
      '72': '18rem',
      '80': '20rem',
      '96': '24rem',
      'auto': 'auto',
      'full': '100%',
      'screen': '100vh',
      'svh': '100svh',   // Small viewport height
      'lvh': '100lvh',   // Large viewport height
      'dvh': '100dvh',   // Dynamic viewport height
      'min': 'min-content',
      'max': 'max-content',
      'fit': 'fit-content'
    }

    return heightMap[value] || value
  }

  /**
   * Parse min-width values
   */
  private parseMinWidth(value: string): string {
    // Handle arbitrary values: min-w-[200px]
    if (value.startsWith('[') && value.endsWith(']')) {
      return value.slice(1, -1)
    }

    // Handle fraction values: min-w-1/2
    if (value.includes('/')) {
      const [numerator, denominator] = value.split('/').map(Number);
      if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
        return `${(numerator / denominator) * 100}%`;
      }
    }

    // Predefined values
    const minWidthMap: Record<string, string> = {
      '0': '0px',
      'px': '1px',
      '0.5': '0.125rem',
      '1': '0.25rem',
      '1.5': '0.375rem',
      '2': '0.5rem',
      '2.5': '0.625rem',
      '3': '0.75rem',
      '3.5': '0.875rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '7': '1.75rem',
      '8': '2rem',
      '9': '2.25rem',
      '10': '2.5rem',
      '11': '2.75rem',
      '12': '3rem',
      '14': '3.5rem',
      '16': '4rem',
      '20': '5rem',
      '24': '6rem',
      '28': '7rem',
      '32': '8rem',
      '36': '9rem',
      '40': '10rem',
      '44': '11rem',
      '48': '12rem',
      '52': '13rem',
      '56': '14rem',
      '60': '15rem',
      '64': '16rem',
      '72': '18rem',
      '80': '20rem',
      '96': '24rem',
      'full': '100%',
      'min': 'min-content',
      'max': 'max-content',
      'fit': 'fit-content'
    }

    return minWidthMap[value] || value
  }

  /**
   * Parse max-width values
   */
  private parseMaxWidth(value: string): string {
    // Handle arbitrary values: max-w-[800px]
    if (value.startsWith('[') && value.endsWith(']')) {
      return value.slice(1, -1)
    }

    // Predefined values including screen sizes
    const maxWidthMap: Record<string, string> = {
      '0': '0px',
      'none': 'none',
      'xs': '20rem',     // 320px
      'sm': '24rem',     // 384px
      'md': '28rem',     // 448px
      'lg': '32rem',     // 512px
      'xl': '36rem',     // 576px
      '2xl': '42rem',    // 672px
      '3xl': '48rem',    // 768px
      '4xl': '56rem',    // 896px
      '5xl': '64rem',    // 1024px
      '6xl': '72rem',    // 1152px
      '7xl': '80rem',    // 1280px
      'full': '100%',
      'min': 'min-content',
      'max': 'max-content',
      'fit': 'fit-content',
      'prose': '65ch',
      'screen-sm': '640px',
      'screen-md': '768px',
      'screen-lg': '1024px',
      'screen-xl': '1280px',
      'screen-2xl': '1536px'
    }

    return maxWidthMap[value] || this.parseMinWidth(value) // Fallback to spacing scale
  }

  /**
   * Parse min-height values
   */
  private parseMinHeight(value: string): string {
    // Handle arbitrary values: min-h-[400px]
    if (value.startsWith('[') && value.endsWith(']')) {
      return value.slice(1, -1)
    }

    // Predefined values
    const minHeightMap: Record<string, string> = {
      '0': '0px',
      'px': '1px',
      'full': '100%',
      'screen': '100vh',
      'svh': '100svh',   // Small viewport height
      'lvh': '100lvh',   // Large viewport height
      'dvh': '100dvh',   // Dynamic viewport height
      'min': 'min-content',
      'max': 'max-content',
      'fit': 'fit-content'
    }

    return minHeightMap[value] || this.parseMinWidth(value) // Fallback to spacing scale
  }

  /**
   * Parse max-height values
   */
  private parseMaxHeight(value: string): string {
    // Handle arbitrary values: max-h-[600px]
    if (value.startsWith('[') && value.endsWith(']')) {
      return value.slice(1, -1)
    }

    // Use same mapping as min-height plus additional values
    const maxHeightMap: Record<string, string> = {
      '0': '0px',
      'px': '1px',
      'none': 'none',
      'full': '100%',
      'screen': '100vh',
      'svh': '100svh',
      'lvh': '100lvh',
      'dvh': '100dvh',
      'min': 'min-content',
      'max': 'max-content',
      'fit': 'fit-content'
    }

    return maxHeightMap[value] || this.parseMinWidth(value) // Fallback to spacing scale
  }

  /**
   * Parse size values (sets both width and height)
   */
  private parseSize(value: string): string {
    // Handle arbitrary values: size-[40px]
    if (value.startsWith('[') && value.endsWith(']')) {
      return value.slice(1, -1)
    }

    // Use same mapping as width/height spacing scale
    return this.parseMinWidth(value)
  }

  /**
   * Check if a class name is sizing-related
   */
  isSizingClass(className: string): boolean {
    return (
      className.startsWith('w-') ||
      className.startsWith('h-') ||
      className.startsWith('min-w-') ||
      className.startsWith('max-w-') ||
      className.startsWith('min-h-') ||
      className.startsWith('max-h-') ||
      className.startsWith('size-')
    )
  }

  /**
   * Convert sizing styles to CSS
   */
  toCSSProperties(styles: SizingStyles): Record<string, string> {
    const css: Record<string, string> = {}

    if (styles.width) {
      css['width'] = styles.width
    }

    if (styles.height) {
      css['height'] = styles.height
    }

    if (styles.minWidth) {
      css['min-width'] = styles.minWidth
    }

    if (styles.maxWidth) {
      css['max-width'] = styles.maxWidth
    }

    if (styles.minHeight) {
      css['min-height'] = styles.minHeight
    }

    if (styles.maxHeight) {
      css['max-height'] = styles.maxHeight
    }

    if (styles.size) {
      css['width'] = styles.size
      css['height'] = styles.size
    }

    return css
  }

  /**
   * Static method to apply sizing styles to ParsedStyles object
   * This method is called by the main parser
   */
  static applySizingStyle(parsedClass: ParsedClass, styles: Partial<ParsedStyles>, preset: DesignPreset): void {
    const sizingParser = new SizingParser({
      prefix: '',
      separator: ':',
      important: false,
      enableArbitraryValues: true,
      enableStateModifiers: true,
      enableResponsiveModifiers: true
    });

    const sizingResult = sizingParser.parseSizing(parsedClass.original);
    
    if (sizingResult) {
      if (!styles.sizing) {
        styles.sizing = {};
      }

      // Apply sizing properties
      Object.assign(styles.sizing, sizingResult);
    }
  }
}

export default SizingParser 
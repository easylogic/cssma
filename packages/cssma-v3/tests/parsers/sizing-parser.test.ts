import { SizingParser } from '../../src/core/parsers/sizing-parser'
import { Config } from '../../src/types'

describe('SizingParser', () => {
  let parser: SizingParser
  let config: Config

  beforeEach(() => {
    config = {
      prefix: '',
      separator: ':',
      important: false,
      enableArbitraryValues: true,
      enableStateModifiers: true,
      enableResponsiveModifiers: true
    }
    parser = new SizingParser(config)
  })

  describe('Min Width Parsing', () => {
    test('should parse predefined min-width values', () => {
      expect(parser.parseSizing('min-w-0')).toEqual({ minWidth: '0px' })
      expect(parser.parseSizing('min-w-full')).toEqual({ minWidth: '100%' })
      expect(parser.parseSizing('min-w-fit')).toEqual({ minWidth: 'fit-content' })
      expect(parser.parseSizing('min-w-min')).toEqual({ minWidth: 'min-content' })
      expect(parser.parseSizing('min-w-max')).toEqual({ minWidth: 'max-content' })
      expect(parser.parseSizing('min-w-4')).toEqual({ minWidth: '1rem' })
      expect(parser.parseSizing('min-w-8')).toEqual({ minWidth: '2rem' })
    })

    test('should parse arbitrary min-width values', () => {
      expect(parser.parseSizing('min-w-[200px]')).toEqual({ minWidth: '200px' })
      expect(parser.parseSizing('min-w-[10rem]')).toEqual({ minWidth: '10rem' })
      expect(parser.parseSizing('min-w-[50%]')).toEqual({ minWidth: '50%' })
    })
  })

  describe('Max Width Parsing', () => {
    test('should parse predefined max-width values', () => {
      expect(parser.parseSizing('max-w-xs')).toEqual({ maxWidth: '20rem' })
      expect(parser.parseSizing('max-w-sm')).toEqual({ maxWidth: '24rem' })
      expect(parser.parseSizing('max-w-md')).toEqual({ maxWidth: '28rem' })
      expect(parser.parseSizing('max-w-lg')).toEqual({ maxWidth: '32rem' })
      expect(parser.parseSizing('max-w-xl')).toEqual({ maxWidth: '36rem' })
      expect(parser.parseSizing('max-w-2xl')).toEqual({ maxWidth: '42rem' })
      expect(parser.parseSizing('max-w-3xl')).toEqual({ maxWidth: '48rem' })
      expect(parser.parseSizing('max-w-4xl')).toEqual({ maxWidth: '56rem' })
      expect(parser.parseSizing('max-w-5xl')).toEqual({ maxWidth: '64rem' })
      expect(parser.parseSizing('max-w-6xl')).toEqual({ maxWidth: '72rem' })
      expect(parser.parseSizing('max-w-7xl')).toEqual({ maxWidth: '80rem' })
      expect(parser.parseSizing('max-w-full')).toEqual({ maxWidth: '100%' })
      expect(parser.parseSizing('max-w-none')).toEqual({ maxWidth: 'none' })
      expect(parser.parseSizing('max-w-prose')).toEqual({ maxWidth: '65ch' })
    })

    test('should parse screen-based max-width values', () => {
      expect(parser.parseSizing('max-w-screen-sm')).toEqual({ maxWidth: '640px' })
      expect(parser.parseSizing('max-w-screen-md')).toEqual({ maxWidth: '768px' })
      expect(parser.parseSizing('max-w-screen-lg')).toEqual({ maxWidth: '1024px' })
      expect(parser.parseSizing('max-w-screen-xl')).toEqual({ maxWidth: '1280px' })
      expect(parser.parseSizing('max-w-screen-2xl')).toEqual({ maxWidth: '1536px' })
    })

    test('should parse arbitrary max-width values', () => {
      expect(parser.parseSizing('max-w-[800px]')).toEqual({ maxWidth: '800px' })
      expect(parser.parseSizing('max-w-[90vw]')).toEqual({ maxWidth: '90vw' })
    })
  })

  describe('Min Height Parsing', () => {
    test('should parse predefined min-height values', () => {
      expect(parser.parseSizing('min-h-0')).toEqual({ minHeight: '0px' })
      expect(parser.parseSizing('min-h-full')).toEqual({ minHeight: '100%' })
      expect(parser.parseSizing('min-h-screen')).toEqual({ minHeight: '100vh' })
      expect(parser.parseSizing('min-h-dvh')).toEqual({ minHeight: '100dvh' })
      expect(parser.parseSizing('min-h-lvh')).toEqual({ minHeight: '100lvh' })
      expect(parser.parseSizing('min-h-svh')).toEqual({ minHeight: '100svh' })
      expect(parser.parseSizing('min-h-fit')).toEqual({ minHeight: 'fit-content' })
      expect(parser.parseSizing('min-h-min')).toEqual({ minHeight: 'min-content' })
      expect(parser.parseSizing('min-h-max')).toEqual({ minHeight: 'max-content' })
    })

    test('should parse spacing scale min-height values', () => {
      expect(parser.parseSizing('min-h-4')).toEqual({ minHeight: '1rem' })
      expect(parser.parseSizing('min-h-8')).toEqual({ minHeight: '2rem' })
      expect(parser.parseSizing('min-h-16')).toEqual({ minHeight: '4rem' })
      expect(parser.parseSizing('min-h-32')).toEqual({ minHeight: '8rem' })
    })

    test('should parse arbitrary min-height values', () => {
      expect(parser.parseSizing('min-h-[400px]')).toEqual({ minHeight: '400px' })
      expect(parser.parseSizing('min-h-[50vh]')).toEqual({ minHeight: '50vh' })
    })
  })

  describe('Max Height Parsing', () => {
    test('should parse predefined max-height values', () => {
      expect(parser.parseSizing('max-h-0')).toEqual({ maxHeight: '0px' })
      expect(parser.parseSizing('max-h-none')).toEqual({ maxHeight: 'none' })
      expect(parser.parseSizing('max-h-full')).toEqual({ maxHeight: '100%' })
      expect(parser.parseSizing('max-h-screen')).toEqual({ maxHeight: '100vh' })
      expect(parser.parseSizing('max-h-dvh')).toEqual({ maxHeight: '100dvh' })
      expect(parser.parseSizing('max-h-lvh')).toEqual({ maxHeight: '100lvh' })
      expect(parser.parseSizing('max-h-svh')).toEqual({ maxHeight: '100svh' })
      expect(parser.parseSizing('max-h-fit')).toEqual({ maxHeight: 'fit-content' })
      expect(parser.parseSizing('max-h-min')).toEqual({ maxHeight: 'min-content' })
      expect(parser.parseSizing('max-h-max')).toEqual({ maxHeight: 'max-content' })
    })

    test('should parse spacing scale max-height values', () => {
      expect(parser.parseSizing('max-h-4')).toEqual({ maxHeight: '1rem' })
      expect(parser.parseSizing('max-h-96')).toEqual({ maxHeight: '24rem' })
    })

    test('should parse arbitrary max-height values', () => {
      expect(parser.parseSizing('max-h-[600px]')).toEqual({ maxHeight: '600px' })
      expect(parser.parseSizing('max-h-[80vh]')).toEqual({ maxHeight: '80vh' })
    })
  })

  describe('Size Parsing (Tailwind v3.4+)', () => {
    test('should parse predefined size values', () => {
      expect(parser.parseSizing('size-0')).toEqual({ size: '0px' })
      expect(parser.parseSizing('size-4')).toEqual({ size: '1rem' })
      expect(parser.parseSizing('size-8')).toEqual({ size: '2rem' })
      expect(parser.parseSizing('size-16')).toEqual({ size: '4rem' })
      expect(parser.parseSizing('size-full')).toEqual({ size: '100%' })
      expect(parser.parseSizing('size-fit')).toEqual({ size: 'fit-content' })
    })

    test('should parse arbitrary size values', () => {
      expect(parser.parseSizing('size-[40px]')).toEqual({ size: '40px' })
      expect(parser.parseSizing('size-[2.5rem]')).toEqual({ size: '2.5rem' })
    })
  })

  describe('Class Name Detection', () => {
    test('should correctly identify sizing classes', () => {
      expect(parser.isSizingClass('min-w-0')).toBe(true)
      expect(parser.isSizingClass('max-w-lg')).toBe(true)
      expect(parser.isSizingClass('min-h-screen')).toBe(true)
      expect(parser.isSizingClass('max-h-full')).toBe(true)
      expect(parser.isSizingClass('size-4')).toBe(true)
      
      // Non-sizing classes
      expect(parser.isSizingClass('w-4')).toBe(false)
      expect(parser.isSizingClass('h-8')).toBe(false)
      expect(parser.isSizingClass('text-lg')).toBe(false)
      expect(parser.isSizingClass('bg-red-500')).toBe(false)
    })
  })

  describe('CSS Properties Conversion', () => {
    test('should convert sizing styles to CSS properties', () => {
      const styles = {
        minWidth: '200px',
        maxWidth: '800px',
        minHeight: '100px',
        maxHeight: '600px'
      }

      const css = parser.toCSSProperties(styles)
      
      expect(css).toEqual({
        'min-width': '200px',
        'max-width': '800px',
        'min-height': '100px',
        'max-height': '600px'
      })
    })

    test('should convert size to both width and height', () => {
      const styles = { size: '40px' }
      const css = parser.toCSSProperties(styles)
      
      expect(css).toEqual({
        'width': '40px',
        'height': '40px'
      })
    })

    test('should handle partial sizing styles', () => {
      const styles = { minWidth: '100px', maxHeight: '500px' }
      const css = parser.toCSSProperties(styles)
      
      expect(css).toEqual({
        'min-width': '100px',
        'max-height': '500px'
      })
    })
  })

  describe('Edge Cases', () => {
    test('should return null for non-sizing classes', () => {
      expect(parser.parseSizing('text-lg')).toBeNull()
      expect(parser.parseSizing('bg-blue-500')).toBeNull()
      expect(parser.parseSizing('p-4')).toBeNull()
      expect(parser.parseSizing('w-8')).toBeNull()
    })

    test('should handle empty or invalid input', () => {
      expect(parser.parseSizing('')).toBeNull()
      expect(parser.parseSizing('   ')).toBeNull()
    })

    test('should handle malformed arbitrary values', () => {
      // Missing closing bracket
      expect(parser.parseSizing('min-w-[200px')).toBeNull()
      // Missing opening bracket
      expect(parser.parseSizing('min-w-200px]')).toBeNull()
    })
  })

  describe('Integration with Main Parser', () => {
    test('should apply sizing styles correctly', () => {
      const styles = {
        spacing: { padding: {}, margin: {}, gap: {} },
        colors: {},
        typography: {},
        layout: {},
        effects: {},
        animation: {},
        position: {},
        transform: {},
        sizing: {}
      }

      const parsedClass = {
        original: 'min-w-0',
        className: 'min-w-0',
        baseClassName: 'min-w-0',
        category: 'sizing' as const,
        property: 'min-w',
        value: '0'
      }

      SizingParser.applySizingStyle(parsedClass, styles, {
        name: 'test',
        version: '1.0',
        colors: {},
        spacing: {},
        typography: {
          fontSize: {},
          fontWeight: {},
          lineHeight: {},
          letterSpacing: {},
          fontFamily: {}
        },
        effects: {
          borderRadius: {},
          boxShadow: {},
          opacity: {},
          blur: {}
        },
        layout: {
          width: {},
          height: {},
          maxWidth: {},
          maxHeight: {},
          minWidth: {},
          minHeight: {}
        }
      })

      expect(styles.sizing).toEqual({ minWidth: '0px' })
    })
  })
}) 
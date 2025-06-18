import { CSSParser } from '../src/core/parser';
import { InteractivityParser } from '../src/core/parsers/interactivity-parser';
import { TransitionsParser } from '../src/core/parsers/transitions-parser';
import { Config, DesignPreset } from '../src/types';

describe('Debug Tests', () => {
  let parser: CSSParser;
  
  beforeEach(() => {
    const config: Config = {
      prefix: '',
      separator: ':',
      important: false,
      enableArbitraryValues: true,
      enableStateModifiers: true,
      enableResponsiveModifiers: true
    };
    
    const preset: DesignPreset = {
      name: 'default',
      version: '1.0.0',
      colors: {
        blue: { 500: { r: 59, g: 130, b: 246 } },
        red: { 500: { r: 239, g: 68, b: 68 } },
        white: { 500: { r: 255, g: 255, b: 255 } }
      },
      spacing: { 4: 16, 8: 32 },
      typography: {
        fontSize: { base: 16, lg: 18 },
        fontWeight: { normal: 400, bold: 700 },
        lineHeight: { normal: 1.5, tight: 1.25 },
        letterSpacing: { normal: 0, wide: 0.05 },
        fontFamily: { sans: 'Inter, sans-serif' }
      },
      effects: {
        borderRadius: { md: 6, lg: 8 },
        boxShadow: { md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
        opacity: { 50: 0.5, 75: 0.75 },
        blur: { sm: 4, md: 8 }
      },
      layout: {
        width: { full: '100%', screen: '100vw' },
        height: { full: '100%', screen: '100vh' },
        maxWidth: { lg: '1024px', xl: '1280px' },
        maxHeight: { screen: '100vh' },
        minWidth: { 0: '0px', full: '100%' },
        minHeight: { 0: '0px', full: '100%' }
      }
    };
    
    parser = new CSSParser(config, preset);
  });

  it('should debug filter parsing', () => {
    const result = parser.parse('blur-sm brightness-75 contrast-125');
    console.log('Filter result:', JSON.stringify(result, null, 2));
  });

  it('should debug table parsing', () => {
    const result = parser.parse('border-collapse');
    console.log('Table result:', JSON.stringify(result, null, 2));
  });

  it('should debug cursor parsing', () => {
    const result = parser.parse('cursor-pointer hover:cursor-not-allowed');
    console.log('Cursor result:', JSON.stringify(result, null, 2));
    
    // Let's also test individual parsing
    const hoverParsed = parser.parseClassName('hover:cursor-not-allowed');
    console.log('Hover parsed:', JSON.stringify(hoverParsed, null, 2));
    
    // Test the InteractivityParser directly
    const directParse = InteractivityParser.parse('cursor-not-allowed');
    console.log('Direct parse:', JSON.stringify(directParse, null, 2));
    
    // Test the base class parsing
    const baseParse = InteractivityParser.parse('cursor-not-allowed');
    console.log('Base parse:', JSON.stringify(baseParse, null, 2));
  });

  it('should debug hover cursor only', () => {
    const result = parser.parse('hover:cursor-not-allowed');
    console.log('Hover only result:', JSON.stringify(result, null, 2));
    
    // Check if the hover state has the right structure
    if (result.states?.hover) {
      console.log('Hover state structure:', Object.keys(result.states.hover));
    }
  });
});

describe('New Parsers Debug Tests', () => {
  let parser: CSSParser;
  let config: Config;
  let preset: DesignPreset;

  beforeEach(() => {
    config = {
      prefix: '',
      separator: ':',
      important: false,
      enableArbitraryValues: true,
      enableStateModifiers: true,
      enableResponsiveModifiers: true
    };
    
    preset = {
      name: 'default',
      version: '1.0.0',
      colors: {
        blue: { 500: { r: 59, g: 130, b: 246 } },
        red: { 500: { r: 239, g: 68, b: 68 } }
      },
      spacing: { 4: 16 },
      typography: {
        fontSize: { base: 16 },
        fontWeight: { normal: 400 },
        lineHeight: { normal: 1.5 },
        letterSpacing: { normal: 0 },
        fontFamily: { sans: 'Inter, sans-serif' }
      },
      effects: {
        borderRadius: { md: 6 },
        boxShadow: { md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' },
        opacity: { 50: 0.5 },
        blur: { sm: 4 }
      },
      layout: {
        width: { full: '100%' },
        height: { full: '100%' },
        maxWidth: { lg: '1024px' },
        maxHeight: { screen: '100vh' },
        minWidth: { 0: '0px' },
        minHeight: { 0: '0px' }
      }
    };
    
    parser = new CSSParser(config, preset);
  });

  test('should debug transition parsing', () => {
    const result = parser.parse('transition-all duration-300 delay-150 ease-in-out');
    
    console.log('Full result:', JSON.stringify(result, null, 2));
    console.log('Transitions:', result.transitions);
    
    expect(result.transitions).toBeDefined();
  });

  test('should debug individual ease-in-out parsing', () => {
    const classesToTest = ['ease-in-out', 'transition-all', 'duration-300', 'delay-150'];
    
    classesToTest.forEach(className => {
      const parsedClass = parser.parseClassName(className);
      console.log(`\nParsing "${className}":`, {
        original: parsedClass?.original,
        baseClassName: parsedClass?.baseClassName,
        property: parsedClass?.property,
        value: parsedClass?.value,
        category: parsedClass?.category
      });
    });
    
    expect(true).toBe(true); // Dummy assertion
  });

  test('should debug apply transitions style', () => {
    const parsedClass = parser.parseClassName('ease-in-out');
    console.log('Parsed ease-in-out:', parsedClass);
    
    // Mock styles object
    const styles: any = { transitions: {} };
    
    // Import TransitionsParser and test directly
    const { TransitionsParser } = require('../src/core/parsers/transitions-parser');
    
    // Test direct parsing
    const directParsed = TransitionsParser.parse('ease-in-out');
    console.log('Direct transitions parser result:', directParsed);
    
    // Test apply method
    if (parsedClass) {
      TransitionsParser.applyTransitionsStyle(parsedClass, styles, {});
      console.log('After applying transitions style:', styles);
    }
    
    expect(true).toBe(true);
  });
}); 
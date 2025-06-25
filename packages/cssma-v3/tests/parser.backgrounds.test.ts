import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('Backgrounds Parser - Tailwind v4.1 Complete Test Suite', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('Background Colors', () => {
    describe('Basic color classes', () => {
      it('should parse standard background colors', () => {
        const result = parser.parseClass('bg-red-500');
        
        expect(result).toBeDefined();
        expect(result?.className).toBe('bg-red-500');
        expect(result?.category).toBe('backgrounds');
        expect(result?.property).toBe('bg');
        expect(result?.value).toBe('red-500');
        expect(result?.isArbitrary).toBe(false);
      });
      
      it('should parse special background colors', () => {
        const specialColors = [
          'bg-transparent',
          'bg-current', 
          'bg-black',
          'bg-white',
          'bg-inherit'
        ];
        
        specialColors.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.property).toBe('bg');
        });
      });
      
      it('should parse arbitrary background colors', () => {
        const arbitraryColors = [
          'bg-[#ff0000]',
          'bg-[rgb(255,0,0)]',
          'bg-[hsl(0,100%,50%)]',
          'bg-[oklch(0.7_0.15_180)]'
        ];
        
        arbitraryColors.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.property).toBe('bg');
          expect(result?.isArbitrary).toBe(true);
        });
      });
    });

    describe('Color families and intensities', () => {
      const colorFamilies = ['slate', 'gray', 'red', 'blue', 'green'];
      const intensities = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

      it('should parse all color families with valid intensities', () => {
        colorFamilies.forEach(family => {
          intensities.slice(0, 3).forEach(intensity => { // Test subset for performance
            const className = `bg-${family}-${intensity}`;
            const result = parser.parseClass(className);
            
            expect(result).toBeDefined();
            expect(result?.className).toBe(className);
            expect(result?.category).toBe('backgrounds');
            expect(result?.property).toBe('bg');
            expect(result?.value).toBe(`${family}-${intensity}`);
          });
        });
      });

      it('should parse color with opacity combinations', () => {
        const opacityColors = [
          'bg-red-500/10',
          'bg-blue-600/25', 
          'bg-green-400/50',
          'bg-purple-700/75',
          'bg-gray-800/90'
        ];

        opacityColors.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.property).toBe('bg');
        });
      });
    });

    describe('Background opacity utilities', () => {
      it('should parse bg-opacity classes', () => {
        const opacities = [0, 5, 10, 25, 50, 75, 100];
        
        opacities.forEach(opacity => {
          const className = `bg-opacity-${opacity}`;
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.property).toBe('bg-opacity');
        });
      });

      it('should parse arbitrary opacity values', () => {
        const arbitraryOpacities = [
          'bg-opacity-[0.15]',
          'bg-opacity-[0.37]', 
          'bg-opacity-[0.62]'
        ];

        arbitraryOpacities.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.property).toBe('bg-opacity');
          expect(result?.isArbitrary).toBe(true);
        });
      });
    });
  });
  
  describe('Background Images & Gradients (v4.1)', () => {
    describe('Basic background images', () => {
      it('should parse bg-none', () => {
        const result = parser.parseClass('bg-none');
        expect(result).toBeDefined();
        expect(result?.className).toBe('bg-none');
        expect(result?.category).toBe('backgrounds');
        expect(result?.property).toBe('bg-image');
      });

      it('should parse arbitrary background image URLs', () => {
        const imageUrls = [
          "bg-[url('/img/hero.jpg')]",
          "bg-[url('https://example.com/bg.png')]",
          "bg-[url('/assets/pattern.svg')]"
        ];

        imageUrls.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.property).toBe('backgroundImage');
          expect(result?.isArbitrary).toBe(true);
        });
      });

      it('should parse custom property background images', () => {
        const customProperties = [
          'bg-(image:--my-image)',
          'bg-(--custom-bg)'
        ];

        customProperties.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.property).toBe('bg-custom-property');
        });
      });
    });

    describe('Linear gradients', () => {
      it('should parse legacy bg-gradient-to-* directions', () => {
        const gradientDirections = [
          'bg-gradient-to-t',
          'bg-gradient-to-tr', 
          'bg-gradient-to-r',
          'bg-gradient-to-br',
          'bg-gradient-to-b',
          'bg-gradient-to-bl',
          'bg-gradient-to-l',
          'bg-gradient-to-tl'
        ];
        
        gradientDirections.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.property).toBe('bg-gradient');
        });
      });

      it('should parse new bg-linear-to-* directions', () => {
        const linearDirections = [
          'bg-linear-to-t',
          'bg-linear-to-tr',
          'bg-linear-to-r',
          'bg-linear-to-br',
          'bg-linear-to-b',
          'bg-linear-to-bl',
          'bg-linear-to-l',
          'bg-linear-to-tl'
        ];
        
        linearDirections.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.property).toBe('bg-linear');
        });
      });

      it('should parse angle-based linear gradients', () => {
        const angleGradients = [
          'bg-linear-0',
          'bg-linear-45',
          'bg-linear-90',
          'bg-linear-180',
          'bg-linear-270',
          '-bg-linear-45',
          '-bg-linear-90'
        ];

        angleGradients.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.property).toBe('bg-linear-angle');
        });
      });

      it('should parse linear gradients with interpolation modes', () => {
        const interpolationModes = [
          'bg-linear-to-r/srgb',
          'bg-linear-to-r/hsl',
          'bg-linear-to-r/oklab',
          'bg-linear-to-r/oklch',
          'bg-linear-45/increasing',
          'bg-linear-45/decreasing'
        ];

        interpolationModes.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
        });
      });

      it('should parse arbitrary linear gradients', () => {
        const customLinear = [
          'bg-linear-[25deg,red_5%,yellow_60%,lime_90%,teal]',
          'bg-linear-[to_right,#ff0000,#00ff00]'
        ];

        customLinear.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.property).toBe('bg-linear-arbitrary');
          expect(result?.isArbitrary).toBe(true);
        });
      });

      it('should parse custom property linear gradients', () => {
        const customPropertyLinear = [
          'bg-linear-(--my-gradient)',
          'bg-linear-(<custom-property>)'
        ];

        customPropertyLinear.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.property).toBe('bg-linear-custom');
        });
      });
    });

    describe('Radial gradients', () => {
      it('should parse basic radial gradients', () => {
        const radialGradients = [
          'bg-radial',
          'bg-radial/srgb',
          'bg-radial/hsl',
          'bg-radial/oklab',
          'bg-radial/oklch'
        ];

        radialGradients.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.property).toBe('bg-radial');
        });
      });

      it('should parse arbitrary radial gradients', () => {
        const radialArbitrary = [
          'bg-radial-[at_50%_75%]',
          'bg-radial-[circle_at_center]',
          'bg-radial-[ellipse_at_top_left]'
        ];

        radialArbitrary.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.property).toBe('bg-radial-arbitrary');
          expect(result?.isArbitrary).toBe(true);
        });
      });

      it('should parse custom property radial gradients', () => {
        const customRadial = [
          'bg-radial-(--my-radial)',
          'bg-radial-(<custom-property>)'
        ];

        customRadial.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.property).toBe('bg-radial-custom');
        });
      });
    });

    describe('Conic gradients', () => {
      it('should parse angle-based conic gradients', () => {
        const conicAngles = [
          'bg-conic-0',
          'bg-conic-45',
          'bg-conic-90',
          'bg-conic-180',
          'bg-conic-270',
          '-bg-conic-45',
          '-bg-conic-90'
        ];

        conicAngles.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.property).toBe('bg-conic');
        });
      });

      it('should parse conic gradients with interpolation modes', () => {
        const conicInterpolation = [
          'bg-conic/srgb',
          'bg-conic/hsl',
          'bg-conic/oklab',
          'bg-conic/oklch',
          'bg-conic-45/increasing',
          'bg-conic-90/decreasing'
        ];

        conicInterpolation.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.property).toBe('bg-conic');
        });
      });

      it('should parse arbitrary conic gradients', () => {
        const customConic = [
          'bg-conic-[from_45deg_at_center]',
          'bg-conic-[at_25%_75%]'
        ];

        customConic.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.property).toBe('bg-conic-arbitrary');
          expect(result?.isArbitrary).toBe(true);
        });
      });

      it('should parse custom property conic gradients', () => {
        const customConic = [
          'bg-conic-(--my-conic)',
          'bg-conic-(<custom-property>)'
        ];

        customConic.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.property).toBe('bg-conic-custom');
        });
      });
    });

    describe('Gradient color stops', () => {
      it('should parse basic gradient color stops', () => {
        const gradientStops = [
          { className: 'from-red-500', property: 'from', value: 'red-500' },
          { className: 'via-blue-400', property: 'via', value: 'blue-400' },
          { className: 'to-green-300', property: 'to', value: 'green-300' },
          { className: 'from-transparent', property: 'from', value: 'transparent' },
          { className: 'to-current', property: 'to', value: 'current' }
        ];
        
        gradientStops.forEach(({ className, property, value }) => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.property).toBe(property);
          expect(result?.value).toBe(value);
        });
      });

      it('should parse positioned gradient stops', () => {
        const positionStops = [
          'from-0%',
          'from-10%',
          'via-30%',
          'via-50%',
          'to-90%',
          'to-100%'
        ];

        positionStops.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
        });
      });

      it('should parse arbitrary gradient stops', () => {
        const arbitraryStops = [
          'from-[#ff0000]',
          'via-[rgb(0,255,0)]',
          'to-[hsl(240,100%,50%)]',
          'from-[oklch(0.7_0.15_180)]',
          'from-[25%]',
          'via-[var(--my-color)]'
        ];

        arbitraryStops.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.isArbitrary).toBe(true);
        });
      });

      it('should parse custom property gradient stops', () => {
        const customPropertyStops = [
          'from-(--my-color)',
          'via-(--middle-color)',
          'to-(--end-color)'
        ];

        customPropertyStops.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
        });
      });
    });
  });

  describe('Background Properties', () => {
    describe('Background position', () => {
      it('should parse position keywords', () => {
        const positions = [
          'bg-bottom',
          'bg-center', 
          'bg-left',
          'bg-left-bottom',
          'bg-left-top',
          'bg-right',
          'bg-right-bottom',
          'bg-right-top',
          'bg-top'
        ];
        
        positions.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.property).toBe('bg-position');
        });
      });

      it('should parse arbitrary positions', () => {
        const arbitraryPositions = [
          'bg-[center_top_1rem]',
          'bg-[left_20px_top_30px]',
          'bg-[25%_75%]',
          'bg-[50%_50%]'
        ];

        arbitraryPositions.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.isArbitrary).toBe(true);
        });
      });
    });

    describe('Background size', () => {
      it('should parse size keywords', () => {
        const sizes = ['bg-auto', 'bg-cover', 'bg-contain'];
        
        sizes.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.property).toBe('bg-size');
        });
      });

      it('should parse arbitrary sizes', () => {
        const arbitrarySizes = [
          'bg-[length:200px_100px]',
          'bg-[50%_auto]',
          'bg-[100px]',
          'bg-[200px_150px]'
        ];

        arbitrarySizes.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.isArbitrary).toBe(true);
        });
      });
    });

    describe('Background repeat', () => {
      it('should parse repeat values', () => {
        const repeats = [
          'bg-repeat',
          'bg-no-repeat',
          'bg-repeat-x',
          'bg-repeat-y',
          'bg-repeat-round',
          'bg-repeat-space'
        ];
        
        repeats.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.property).toBe('bg-repeat');
        });
      });
    });

    describe('Background attachment', () => {
      it('should parse attachment values', () => {
        const attachments = ['bg-fixed', 'bg-local', 'bg-scroll'];
        
        attachments.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.property).toBe('bg-attachment');
        });
      });
    });

    describe('Background clip', () => {
      it('should parse clip values', () => {
        const clips = [
          'bg-clip-border',
          'bg-clip-padding',
          'bg-clip-content',
          'bg-clip-text'
        ];
        
        clips.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.property).toBe('bg-clip');
        });
      });
    });

    describe('Background origin', () => {
      it('should parse origin values', () => {
        const origins = [
          'bg-origin-border',
          'bg-origin-padding', 
          'bg-origin-content'
        ];
        
        origins.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.property).toBe('bg-origin');
        });
      });
    });
  });
  
  describe('Style Application', () => {
    describe('Background color application', () => {
      it('should apply basic background colors', () => {
        const styles = parser.parse('bg-red-500');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundColor).toBeDefined();
        expect(typeof styles.backgrounds?.backgroundColor).toBe('string');
      });
      
      it('should apply special background colors', () => {
        const transparentStyles = parser.parse('bg-transparent');
        expect(transparentStyles.backgrounds?.backgroundColor).toBe('transparent');
        
        const currentStyles = parser.parse('bg-current');
        expect(currentStyles.backgrounds?.backgroundColor).toBe('currentColor');
      });
      
      it('should apply arbitrary background colors', () => {
        const styles = parser.parse('bg-[#ff0000]');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundColor).toBe('#ff0000');
      });

      it('should apply background opacity', () => {
        const styles = parser.parse('bg-opacity-50');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundOpacity).toBeDefined();
      });
    });
    
    describe('Gradient application', () => {
      it('should apply legacy gradients', () => {
        const styles = parser.parse('bg-gradient-to-r');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toContain('linear-gradient');
        expect(styles.backgrounds?.backgroundImage).toContain('to right');
      });
      
      it('should apply gradient color stops', () => {
        const styles = parser.parse('from-red-500');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.['--tw-gradient-from']).toBeDefined();
      });

      it('should apply new v4.1 linear gradients', () => {
        const styles = parser.parse('bg-linear-to-r');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toContain('linear-gradient');
      });

      it('should apply angle-based gradients', () => {
        const styles = parser.parse('bg-linear-45');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toContain('linear-gradient');
        expect(styles.backgrounds?.backgroundImage).toContain('45deg in oklab');
      });

      it('should apply radial gradients', () => {
        const styles = parser.parse('bg-radial');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toContain('radial-gradient');
      });

      it('should apply conic gradients', () => {
        const styles = parser.parse('bg-conic-45');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toContain('conic-gradient');
      });
    });
    
    describe('Background image application', () => {
      it('should apply background image none', () => {
        const styles = parser.parse('bg-none');

        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toBe('none');
      });

      it('should apply background image URLs', () => {
        const styles = parser.parse("bg-[url('/img/hero.jpg')]");

        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toBe("url('/img/hero.jpg')");
      });
    });
    
    describe('Background property application', () => {
      it('should apply background position', () => {
        const styles = parser.parse('bg-center');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundPosition).toBe('center');
      });
      
      it('should apply background size', () => {
        const styles = parser.parse('bg-cover');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundSize).toBe('cover');
      });
      
      it('should apply background repeat', () => {
        const styles = parser.parse('bg-no-repeat');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundRepeat).toBe('no-repeat');
      });
      
      it('should apply background attachment', () => {
        const styles = parser.parse('bg-fixed');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundAttachment).toBe('fixed');
      });
      
      it('should apply background clip', () => {
        const styles = parser.parse('bg-clip-text');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundClip).toBe('text');
      });
      
      it('should apply background origin', () => {
        const styles = parser.parse('bg-origin-padding');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundOrigin).toBe('padding-box');
      });
    });

    describe('Complex background combinations', () => {
      it('should apply multiple background properties', () => {
        const styles = parser.parse('bg-red-500 bg-cover bg-center bg-no-repeat bg-fixed');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundColor).toBeDefined();
        expect(styles.backgrounds?.backgroundSize).toBe('cover');
        expect(styles.backgrounds?.backgroundPosition).toBe('center');
        expect(styles.backgrounds?.backgroundRepeat).toBe('no-repeat');
        expect(styles.backgrounds?.backgroundAttachment).toBe('fixed');
      });

      it('should apply gradient combinations', () => {
        const styles = parser.parse('bg-gradient-to-r from-blue-500 to-red-500 bg-cover bg-center');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toContain('linear-gradient');
        expect(styles.backgrounds?.backgroundSize).toBe('cover');
        expect(styles.backgrounds?.backgroundPosition).toBe('center');
      });

      it('should apply v4.1 gradient combinations', () => {
        const styles = parser.parse('bg-linear-45 from-purple-500 to-pink-500 bg-cover');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toContain('linear-gradient');
        expect(styles.backgrounds?.backgroundSize).toBe('cover');
      });
    });
  });

  describe('Modifiers & Variants', () => {
    it('should parse responsive backgrounds', () => {
      const responsiveClasses = [
        'sm:bg-red-500',
        'md:bg-blue-600',
        'lg:bg-green-700',
        'xl:bg-purple-800',
        '2xl:bg-yellow-900'
      ];

      responsiveClasses.forEach(className => {
        const result = parser.parseClass(className);
        expect(result).toBeDefined();
        expect(result?.className).toBe(className);
        expect(result?.category).toBe('backgrounds');
        expect(result?.modifiers?.responsive).toBeDefined();
      });
    });

    it('should parse state modifiers', () => {
      const stateClasses = [
        'hover:bg-red-500',
        'focus:bg-blue-500',
        'active:bg-green-500',
        'disabled:bg-gray-300'
      ];

      stateClasses.forEach(className => {
        const result = parser.parseClass(className);
        expect(result).toBeDefined();
        expect(result?.className).toBe(className);
        expect(result?.category).toBe('backgrounds');
        expect(result?.modifiers?.state).toBeDefined();
      });
    });

    it('should parse dark mode backgrounds', () => {
      const darkModeClasses = [
        'dark:bg-gray-800',
        'dark:bg-slate-900',
        'dark:bg-transparent'
      ];

      darkModeClasses.forEach(className => {
        const result = parser.parseClass(className);
        expect(result).toBeDefined();
        expect(result?.className).toBe(className);
        expect(result?.category).toBe('backgrounds');
      });
    });
  });

  describe('Advanced v4.1 Features', () => {
    it('should parse interpolation modes', () => {
      const advancedGradients = [
        'bg-linear-to-r/oklab',
        'bg-radial/hsl',
        'bg-conic-180/oklch',
        'bg-linear-45/increasing'
      ];

      advancedGradients.forEach(className => {
        const result = parser.parseClass(className);
        expect(result).toBeDefined();
        expect(result?.className).toBe(className);
        expect(result?.category).toBe('backgrounds');
      });
    });

    it('should parse positioned gradient stops', () => {
      const positionedStops = [
        'from-indigo-500',
        'from-10%',
        'via-sky-500',
        'via-30%',
        'to-emerald-500',
        'to-90%'
      ];

      positionedStops.forEach(className => {
        const result = parser.parseClass(className);
        expect(result).toBeDefined();
        expect(result?.className).toBe(className);
        expect(result?.category).toBe('backgrounds');
      });
    });

    it('should parse complex arbitrary gradients', () => {
      const customGradients = [
        'bg-linear-[25deg,red_5%,yellow_60%,lime_90%,teal]',
        'bg-radial-[circle_at_center,red,blue]',
        'bg-conic-[from_45deg,red,blue,red]'
      ];

      customGradients.forEach(className => {
        const result = parser.parseClass(className);
        expect(result).toBeDefined();
        expect(result?.className).toBe(className);
        expect(result?.category).toBe('backgrounds');
        expect(result?.isArbitrary).toBe(true);
      });
    });

    it('should handle modern v4.1 background utilities', () => {
      const modernFeatures = [
        'bg-stripes',
        'bg-noise',
        'bg-mesh-gradient',
        'bg-color-mix-[in_srgb,red_50%,blue]'
      ];

      modernFeatures.forEach(className => {
        const result = parser.parseClass(className);
        // Should not crash, even if not fully supported yet
        expect(typeof result === 'object' || result === null).toBe(true);
      });
    });
  });

  describe('Container Queries & Media Features', () => {
    it('should parse background with container queries', () => {
      const containerClasses = [
        '@md:bg-blue-500',
        '@lg:bg-gradient-to-r',
        '@container/sidebar:bg-gray-100'
      ];

      containerClasses.forEach(className => {
        const result = parser.parseClass(className);
        expect(result).toBeDefined();
        expect(result?.className).toBe(className);
        expect(result?.category).toBe('backgrounds');
      });
    });

    it('should parse print media backgrounds', () => {
      const printClasses = [
        'print:bg-white',
        'print:bg-none',
        'print:bg-transparent'
      ];

      printClasses.forEach(className => {
        const result = parser.parseClass(className);
        expect(result).toBeDefined();
        expect(result?.className).toBe(className);
        expect(result?.category).toBe('backgrounds');
      });
    });

    it('should parse motion preferences with backgrounds', () => {
      const motionClasses = [
        'motion-safe:bg-gradient-to-r',
        'motion-reduce:bg-static-image',
        'motion-safe:bg-[url("/animated-bg.gif")]'
      ];

      motionClasses.forEach(className => {
        const result = parser.parseClass(className);
        expect(result).toBeDefined();
        expect(result?.className).toBe(className);
        expect(result?.category).toBe('backgrounds');
      });
    });

    it('should parse arbitrary media query backgrounds', () => {
      const arbitraryMedia = [
        '[@media(min-width:400px)]:bg-blue-500',
        '[@media(orientation:landscape)]:bg-cover',
        '[@media(prefers-color-scheme:dark)]:bg-gray-900'
      ];

      arbitraryMedia.forEach(className => {
        const result = parser.parseClass(className);
        expect(result).toBeDefined();
        expect(result?.className).toBe(className);
        expect(result?.category).toBe('backgrounds');
      });
    });
  });

  describe('Complex Real-World Scenarios', () => {
    it('should handle multi-layer background combinations', () => {
      const multiLayerClass = 'bg-gradient-to-r from-blue-500 via-purple-500 to-red-500, bg-[url("/pattern.svg")] bg-repeat bg-opacity-50';
      
      // Test individual parsing of complex combinations
      const parts = multiLayerClass.split(/,|\s+/);
      parts.forEach(part => {
        if (part.trim() && part.startsWith('bg-')) {
          const result = parser.parseClass(part.trim());
          if (result) {
            expect(result.category).toBe('backgrounds');
          }
        }
      });
    });

    it('should parse deeply nested modifier chains', () => {
      const nestedClasses = [
        'xl:hover:focus:bg-gradient-to-r',
        'dark:lg:hover:bg-opacity-75',
        '@container/main:md:hover:before:bg-blue-500'
      ];

      nestedClasses.forEach(className => {
        const result = parser.parseClass(className);
        expect(result).toBeDefined();
        expect(result?.className).toBe(className);
        expect(result?.category).toBe('backgrounds');
      });
    });

    it('should handle CSS custom property backgrounds', () => {
      const customPropBgs = [
        'bg-[var(--primary-gradient)]',
        'bg-[color:var(--bg-color)]',
        'bg-[image:var(--hero-bg)]'
      ];

      customPropBgs.forEach(className => {
        console.log(`\n🔍 Testing CSS custom property: ${className}`);
        const result = parser.parseClass(className);
        console.log(`📊 Result category: ${result?.category}, property: ${result?.property}`);
        
        expect(result).toBeDefined();
        expect(result?.className).toBe(className);
        expect(result?.category).toBe('backgrounds');
        expect(result?.isArbitrary).toBe(true);
      });
    });
  });

  describe('Performance & Large Scale Tests', () => {
    it('should handle many gradient stops efficiently', () => {
      const manyStopsGradient = 'bg-linear-[0deg,red_0%,orange_10%,yellow_20%,green_30%,blue_40%,indigo_50%,violet_60%,red_70%,orange_80%,yellow_90%,green_100%]';
      
      const result = parser.parseClass(manyStopsGradient);
      expect(result).toBeDefined();
      expect(result?.className).toBe(manyStopsGradient);
      expect(result?.category).toBe('backgrounds');
      expect(result?.isArbitrary).toBe(true);
    });

    it('should handle very long arbitrary values', () => {
      const longArbitrary = 'bg-[url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjRkZGRkZGIi8+CjxjaXJjbGUgY3g9IjEwIiBjeT0iMTAiIHI9IjQiIGZpbGw9IiM4QjVDRjYiLz4KPC9zdmc+")]';
      
      const result = parser.parseClass(longArbitrary);
      expect(result).toBeDefined();
      expect(result?.category).toBe('backgrounds');
      expect(result?.isArbitrary).toBe(true);
    });

    it('should handle bulk parsing performance', () => {
      const bulkClasses = Array.from({ length: 50 }, (_, i) => `bg-red-${(i % 9 + 1) * 100}`);
      
      const startTime = performance.now();
      bulkClasses.forEach(className => {
        const result = parser.parseClass(className);
        expect(result?.category).toBe('backgrounds');
      });
      const endTime = performance.now();
      
      // Should parse 50 classes in reasonable time (< 100ms)
      expect(endTime - startTime).toBeLessThan(100);
    });
  });

  describe('CSS Generation & Style Application', () => {
    it('should apply complex multi-layer backgrounds', () => {
      const styles = parser.parse('bg-gradient-to-r from-blue-500 to-red-500 bg-[url("/pattern.svg")] bg-repeat bg-blend-multiply');
      
      expect(styles.backgrounds).toBeDefined();
      expect(styles.backgrounds?.backgroundImage).toBeDefined();
      // Should handle multiple background layers
    });

    it('should generate proper CSS for v4.1 gradients', () => {
      const styles = parser.parse('bg-linear-45/oklch from-blue-500 to-red-500');
      
      expect(styles.backgrounds).toBeDefined();
      expect(styles.backgrounds?.backgroundImage).toContain('oklch');
      expect(styles.backgrounds?.backgroundImage).toContain('45deg');
    });

    it('should handle background shorthand parsing', () => {
      const styles = parser.parse('bg-[red_url("/bg.jpg")_center/cover_no-repeat_fixed]');
      
      expect(styles.backgrounds).toBeDefined();
      expect(styles.backgrounds?.background).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty arbitrary values gracefully', () => {
      const emptyArbitraryClasses = [
        'bg-[]',
        'from-[]',
        'bg-opacity-[]',
        'bg-linear-[]',
        'bg-radial-[]',
        'bg-conic-[]'
      ];

      emptyArbitraryClasses.forEach(className => {
        const result = parser.parseClass(className);
        // Should either return valid result or null, but not crash
        expect(result === null || result?.category === 'backgrounds').toBe(true);
      });
    });

    it('should handle complex URL patterns', () => {
      const complexUrls = [
        "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiLz4=')]",
        "bg-[url('/assets/images/hero-bg.jpg?v=123')]",
        "bg-[url('https://cdn.example.com/bg.webp')]",
        "bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAB')]"
      ];

      complexUrls.forEach(className => {
        const result = parser.parseClass(className);
        expect(result).toBeDefined();
        expect(result?.className).toBe(className);
        expect(result?.category).toBe('backgrounds');
        expect(result?.isArbitrary).toBe(true);
      });
    });

    it('should handle edge case classes gracefully', () => {
      const edgeCaseClasses = [
        'bg-invalid-color',
        'bg-fake-gradient',
        'bg-wrong-syntax',
        'bg-nonexistent-999'
      ];

      edgeCaseClasses.forEach(className => {
        const result = parser.parseClass(className);
        // Should not crash and return either valid result or null
        expect(typeof result === 'object' || result === null).toBe(true);
        if (result !== null) {
          expect(result.className).toBe(className);
        }
      });
    });
  });
}); 
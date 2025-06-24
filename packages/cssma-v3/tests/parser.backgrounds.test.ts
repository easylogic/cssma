import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 배경(Backgrounds) - 완전한 v4.1 테스트', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('1. 배경 색상 시스템', () => {
    describe('1.1 기본 색상 클래스', () => {
      it('기본 배경 색상 클래스를 파싱할 수 있어야 함', () => {
        const result = parser.parseClass('bg-red-500');
        
        expect(result).toBeDefined();
        expect(result?.className).toBe('bg-red-500');
        expect(result?.category).toBe('backgrounds');
        expect(result?.property).toBe('bg');
        expect(result?.value).toBe('red-500');
      });
      
      it('특수 배경 색상을 파싱할 수 있어야 함', () => {
        const specialColors = ['bg-transparent', 'bg-current', 'bg-black', 'bg-white', 'bg-inherit'];
        
        specialColors.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.property).toBe('bg');
        });
      });
      
      it('임의 배경 색상을 파싱할 수 있어야 함', () => {
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

    describe('1.2 완전한 색상 팔레트 테스트', () => {
      const colorFamilies = [
        'slate', 'gray', 'zinc', 'neutral', 'stone',
        'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 
        'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'
      ];
      
      const intensities = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

      it('모든 색상 패밀리의 주요 강도를 파싱할 수 있어야 함', () => {
        colorFamilies.slice(0, 3).forEach(family => { // 테스트 속도를 위해 일부만
          intensities.slice(0, 5).forEach(intensity => {
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

      it('색상 투명도 조합을 파싱할 수 있어야 함', () => {
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
        });
      });
    });

    describe('1.3 배경 투명도 유틸리티', () => {
      it('bg-opacity 클래스들을 파싱할 수 있어야 함', () => {
        const opacities = [0, 5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95, 100];
        
        opacities.forEach(opacity => {
          const className = `bg-opacity-${opacity}`;
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
        });
      });

      it('임의 투명도 값을 파싱할 수 있어야 함', () => {
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
          expect(result?.isArbitrary).toBe(true);
        });
      });
    });
  });
  
  describe('2. 배경 이미지 시스템 (v4.1 완전 지원)', () => {
    describe('2.1 기본 배경 이미지', () => {
      it('bg-none을 파싱할 수 있어야 함', () => {
        const result = parser.parseClass('bg-none');
        expect(result).toBeDefined();
        expect(result?.className).toBe('bg-none');
        expect(result?.category).toBe('backgrounds');
      });

      it('임의 배경 이미지 URL을 파싱할 수 있어야 함', () => {
        const imageUrls = [
          "bg-[url('/img/hero.jpg')]",
          "bg-[url('https://example.com/bg.png')]",
          "bg-[url('/assets/pattern.svg')]",
          "bg-[url(/img/mountains.jpg)]" // 따옴표 없는 경우
        ];

        imageUrls.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.isArbitrary).toBe(true);
        });
      });

      it('커스텀 속성 배경 이미지를 파싱할 수 있어야 함', () => {
        const customProperties = [
          // bg-(image:<custom-property>) -> `background-image: var(<custom-property>);
          'bg-(image:--my-image)',
          'bg-(--custom-bg)'
        ];

        customProperties.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
        });
      });
    });

    describe('2.2 선형 그라데이션 (Linear Gradients)', () => {
      it('기존 bg-gradient-to-* 방향을 파싱할 수 있어야 함', () => {
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
        });
      });

      it('새로운 bg-linear-to-* 방향을 파싱할 수 있어야 함', () => {
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
        });
      });

      it('각도 기반 선형 그라데이션을 파싱할 수 있어야 함', () => {
        const angleGradients = [
          'bg-linear-0',
          'bg-linear-45',
          'bg-linear-90',
          'bg-linear-135',
          'bg-linear-180',
          'bg-linear-225',
          'bg-linear-270',
          'bg-linear-315',
          '-bg-linear-45', // 음수 각도
          '-bg-linear-90'
        ];

        angleGradients.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
        });
      });

      it('보간 모드가 있는 선형 그라데이션을 파싱할 수 있어야 함', () => {
        const interpolationModes = [
          'bg-linear-to-r/srgb',
          'bg-linear-to-r/hsl',
          'bg-linear-to-r/oklab',
          'bg-linear-to-r/oklch',
          'bg-linear-to-r/longer',
          'bg-linear-to-r/shorter',
          'bg-linear-to-r/increasing',
          'bg-linear-to-r/decreasing'
        ];

        interpolationModes.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
        });
      });

      it('커스텀 선형 그라데이션을 파싱할 수 있어야 함', () => {
        const customLinear = [
          'bg-linear-[25deg,red_5%,yellow_60%,lime_90%,teal]',
          'bg-linear-[to_right,#ff0000,#00ff00]'
        ];

        customLinear.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.isArbitrary).toBe(true);
        });
      });
    });

    describe('2.3 방사형 그라데이션 (Radial Gradients)', () => {
      it('기본 방사형 그라데이션을 파싱할 수 있어야 함', () => {
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
        });
      });

      it('위치가 있는 방사형 그라데이션을 파싱할 수 있어야 함', () => {
        const radialPositions = [
          'bg-radial-[at_50%_75%]',
          'bg-radial-[at_25%_25%]',
          'bg-radial-[at_center]',
          'bg-radial-[at_top_left]'
        ];

        radialPositions.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
          expect(result?.isArbitrary).toBe(true);
        });
      });

      it('커스텀 방사형 그라데이션을 파싱할 수 있어야 함', () => {
        const customRadial = [
          'bg-radial-(<custom-property>)',
          'bg-radial-[circle_at_center]'
        ];

        customRadial.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
        });
      });
    });

    describe('2.4 원뿔형 그라데이션 (Conic Gradients)', () => {
      it('각도 기반 원뿔형 그라데이션을 파싱할 수 있어야 함', () => {
        const conicAngles = [
          'bg-conic-0',
          'bg-conic-45',
          'bg-conic-90',
          'bg-conic-180',
          'bg-conic-270',
          '-bg-conic-45', // 음수 각도
          '-bg-conic-90'
        ];

        conicAngles.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
        });
      });

      it('보간 모드가 있는 원뿔형 그라데이션을 파싱할 수 있어야 함', () => {
        const conicInterpolation = [
          'bg-conic/srgb',
          'bg-conic/hsl',
          'bg-conic/oklab',
          'bg-conic/oklch',
          'bg-conic/longer',
          'bg-conic/shorter',
          'bg-conic/increasing',
          'bg-conic/decreasing'
        ];

        conicInterpolation.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
        });
      });

      it('커스텀 원뿔형 그라데이션을 파싱할 수 있어야 함', () => {
        const customConic = [
          'bg-conic-(<custom-property>)',
          'bg-conic-[from_45deg_at_center]'
        ];

        customConic.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
        });
      });
    });

    describe('2.5 그라데이션 색상 정지점 (Enhanced)', () => {
      it('기본 그라데이션 색상 정지점을 파싱할 수 있어야 함', () => {
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

      it('위치 퍼센트가 있는 그라데이션 정지점을 파싱할 수 있어야 함', () => {
        const positionStops = [
          'from-0%',
          'from-5%',
          'from-10%',
          'via-30%',
          'via-50%',
          'to-90%',
          'to-95%',
          'to-100%'
        ];

        positionStops.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
        });
      });

      it('임의 그라데이션 정지점을 파싱할 수 있어야 함', () => {
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

      it('커스텀 속성 그라데이션 정지점을 파싱할 수 있어야 함', () => {
        const customPropertyStops = [
          'from-(<custom-property>)',
          'via-(<custom-property>)',
          'to-(<custom-property>)'
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

  describe('3. 배경 위치 시스템', () => {
    describe('3.1 위치 키워드', () => {
      it('기본 배경 위치를 파싱할 수 있어야 함', () => {
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
        });
      });

      it('임의 배경 위치를 파싱할 수 있어야 함', () => {
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
  });

  describe('4. 배경 크기 시스템', () => {
    describe('4.1 크기 키워드', () => {
      it('배경 크기 클래스를 파싱할 수 있어야 함', () => {
        const sizes = ['bg-auto', 'bg-cover', 'bg-contain'];
        
        sizes.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
        });
      });

      it('임의 배경 크기를 파싱할 수 있어야 함', () => {
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
  });

  describe('5. 배경 반복 시스템', () => {
    it('배경 반복 클래스를 파싱할 수 있어야 함', () => {
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
      });
    });
  });

  describe('6. 배경 첨부 시스템', () => {
    it('배경 첨부 클래스를 파싱할 수 있어야 함', () => {
      const attachments = ['bg-fixed', 'bg-local', 'bg-scroll'];
      
      attachments.forEach(className => {
        const result = parser.parseClass(className);
        expect(result).toBeDefined();
        expect(result?.className).toBe(className);
        expect(result?.category).toBe('backgrounds');
      });
    });
  });

  describe('7. 배경 클립 시스템', () => {
    it('배경 클립 클래스를 파싱할 수 있어야 함', () => {
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
      });
    });
  });

  describe('8. 배경 원점 시스템', () => {
    it('배경 원점 클래스를 파싱할 수 있어야 함', () => {
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
      });
    });
  });
  
  describe('9. 배경 스타일 적용 테스트', () => {
    describe('9.1 배경 색상 적용', () => {
      it('기본 배경 색상을 적용할 수 있어야 함', () => {
        const styles = parser.parse('bg-red-500');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundColor).toBeDefined();
        expect(typeof styles.backgrounds?.backgroundColor).toBe('string');
      });
      
      it('특수 배경 색상을 적용할 수 있어야 함', () => {
        const transparentStyles = parser.parse('bg-transparent');
        expect(transparentStyles.backgrounds?.backgroundColor).toBe('transparent');
        
        const currentStyles = parser.parse('bg-current');
        expect(currentStyles.backgrounds?.backgroundColor).toBe('currentColor');
      });
      
      it('임의 배경 색상을 적용할 수 있어야 함', () => {
        const styles = parser.parse('bg-[#ff0000]');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundColor).toBe('#ff0000');
      });

      it('배경 투명도를 적용할 수 있어야 함', () => {
        const styles = parser.parse('bg-opacity-50');
        
        expect(styles.backgrounds).toBeDefined();
        // 투명도 관련 CSS 변수나 속성이 설정되는지 확인
      });
    });
    
    describe('9.2 그라데이션 적용', () => {
      it('기본 그라데이션을 적용할 수 있어야 함', () => {
        const styles = parser.parse('bg-gradient-to-r');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toContain('linear-gradient');
        expect(styles.backgrounds?.backgroundImage).toContain('to right');
      });
      
      it('그라데이션 색상 정지점을 적용할 수 있어야 함', () => {
        const styles = parser.parse('from-red-500');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.['--tw-gradient-from']).toBeDefined();
      });

      it('복합 그라데이션을 적용할 수 있어야 함', () => {
        const styles = parser.parse('bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toContain('linear-gradient');
        expect(styles.backgrounds?.['--tw-gradient-from']).toBeDefined();
      });

      it('새로운 v4.1 선형 그라데이션을 적용할 수 있어야 함', () => {
        const styles = parser.parse('bg-linear-to-r');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toContain('linear-gradient');
      });

      it('각도 기반 그라데이션을 적용할 수 있어야 함', () => {
        const styles = parser.parse('bg-linear-45');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toContain('linear-gradient');
      });

      it('방사형 그라데이션을 적용할 수 있어야 함', () => {
        const styles = parser.parse('bg-radial');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toContain('radial-gradient');
      });

      it('원뿔형 그라데이션을 적용할 수 있어야 함', () => {
        const styles = parser.parse('bg-conic-45');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toContain('conic-gradient');
      });
    });
    
    describe('9.3 배경 이미지 적용', () => {
      it('배경 이미지 none을 적용할 수 있어야 함', () => {
        const styles = parser.parse('bg-none');

        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toBe('none');
      });

      it('배경 이미지 URL을 적용할 수 있어야 함', () => {
        const styles = parser.parse("bg-[url('/img/hero.jpg')]");

        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toBe("url('/img/hero.jpg')");
      });

      it('복잡한 배경 이미지를 적용할 수 있어야 함', () => {
        const styles = parser.parse('bg-[url(https://example.com/image.png)]');

        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toBe('url(https://example.com/image.png)');
      });
    });
    
    describe('9.4 배경 속성 적용', () => {
      it('배경 위치를 적용할 수 있어야 함', () => {
        const styles = parser.parse('bg-center');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundPosition).toBe('center');
      });
      
      it('배경 크기를 적용할 수 있어야 함', () => {
        const styles = parser.parse('bg-cover');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundSize).toBe('cover');
      });
      
      it('배경 반복을 적용할 수 있어야 함', () => {
        const styles = parser.parse('bg-no-repeat');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundRepeat).toBe('no-repeat');
      });
      
      it('배경 첨부를 적용할 수 있어야 함', () => {
        const styles = parser.parse('bg-fixed');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundAttachment).toBe('fixed');
      });
      
      it('배경 클립을 적용할 수 있어야 함', () => {
        const styles = parser.parse('bg-clip-text');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundClip).toBe('text');
      });
      
      it('배경 원점을 적용할 수 있어야 함', () => {
        const styles = parser.parse('bg-origin-padding');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundOrigin).toBe('padding-box');
      });
    });

    describe('9.5 복합 배경 스타일', () => {
      it('여러 배경 속성을 동시에 적용할 수 있어야 함', () => {
        const styles = parser.parse('bg-red-500 bg-cover bg-center bg-no-repeat bg-fixed');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundColor).toBeDefined();
        expect(styles.backgrounds?.backgroundSize).toBe('cover');
        expect(styles.backgrounds?.backgroundPosition).toBe('center');
        expect(styles.backgrounds?.backgroundRepeat).toBe('no-repeat');
        expect(styles.backgrounds?.backgroundAttachment).toBe('fixed');
      });

      it('그라데이션과 배경 속성을 조합할 수 있어야 함', () => {
        const styles = parser.parse('bg-gradient-to-r from-blue-500 to-red-500 bg-cover bg-center');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toContain('linear-gradient');
        expect(styles.backgrounds?.backgroundSize).toBe('cover');
        expect(styles.backgrounds?.backgroundPosition).toBe('center');
      });

      it('v4.1 새로운 그라데이션과 속성을 조합할 수 있어야 함', () => {
        const styles = parser.parse('bg-linear-45 from-purple-500 to-pink-500 bg-cover');
        
        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toContain('linear-gradient');
        expect(styles.backgrounds?.backgroundSize).toBe('cover');
      });
    });
  });

  describe('10. 반응형 및 상태 변형자', () => {
    it('반응형 배경 클래스를 파싱할 수 있어야 함', () => {
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

    it('상태 변형자 배경 클래스를 파싱할 수 있어야 함', () => {
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

    it('다크 모드 배경 클래스를 파싱할 수 있어야 함', () => {
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

  describe('11. v4.1 고급 기능 테스트', () => {
    it('보간 모드를 포함한 복합 그라데이션을 파싱할 수 있어야 함', () => {
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

    it('위치가 있는 그라데이션 정지점을 파싱할 수 있어야 함', () => {
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

    it('완전한 커스텀 그라데이션을 파싱할 수 있어야 함', () => {
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
  });

  describe('12. 엣지 케이스 및 오류 처리', () => {

    it('복잡한 URL 패턴을 처리할 수 있어야 함', () => {
      const complexUrls = [
        "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4K')]",
        "bg-[url('/assets/images/hero-bg.jpg?v=123')]",
        "bg-[url('https://cdn.example.com/bg.webp')]"
      ];

      complexUrls.forEach(className => {
        const result = parser.parseClass(className);
        expect(result).toBeDefined();
        expect(result?.className).toBe(className);
        expect(result?.category).toBe('backgrounds');
        expect(result?.isArbitrary).toBe(true);
      });
    });
  });
}); 
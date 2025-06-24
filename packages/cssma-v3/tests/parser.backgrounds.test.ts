import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 배경(Backgrounds)', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('배경 클래스 파싱', () => {
    describe('배경 색상', () => {
      it('기본 배경 색상 클래스를 파싱할 수 있어야 함', () => {
        const result = parser.parseClass('bg-red-500');
        
        expect(result).toBeDefined();
        expect(result?.className).toBe('bg-red-500');
        expect(result?.category).toBe('backgrounds');
        expect(result?.property).toBe('bg');
        expect(result?.value).toBe('red-500');
      });
      
      it('특수 배경 색상을 파싱할 수 있어야 함', () => {
        const specialColors = ['bg-transparent', 'bg-current', 'bg-black', 'bg-white'];
        
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
          'bg-[hsl(0,100%,50%)]'
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
    
    describe('그라데이션', () => {
      it('그라데이션 방향 클래스를 파싱할 수 있어야 함', () => {
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
      
      it('그라데이션 색상 정지점을 파싱할 수 있어야 함', () => {
        const gradientStops = [
          { className: 'from-red-500', property: 'from', value: 'red-500' },
          { className: 'via-blue-400', property: 'via', value: 'blue-400' },
          { className: 'to-green-300', property: 'to', value: 'green-300' }
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
    });
    
    describe('배경 속성', () => {
      it('배경 위치 클래스를 파싱할 수 있어야 함', () => {
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
      
      it('배경 크기 클래스를 파싱할 수 있어야 함', () => {
        const sizes = ['bg-auto', 'bg-cover', 'bg-contain'];
        
        sizes.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
        });
      });
      
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
      
      it('배경 첨부 클래스를 파싱할 수 있어야 함', () => {
        const attachments = ['bg-fixed', 'bg-local', 'bg-scroll'];
        
        attachments.forEach(className => {
          const result = parser.parseClass(className);
          expect(result).toBeDefined();
          expect(result?.className).toBe(className);
          expect(result?.category).toBe('backgrounds');
        });
      });
      
      it('배경 클립과 원점 클래스를 파싱할 수 있어야 함', () => {
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
  });
  
  describe('배경 스타일 적용', () => {
    describe('배경 색상 적용', () => {
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
    });
    
    describe('그라데이션 적용', () => {
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
    });
    
    describe('배경 속성 적용', () => {
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

      it('배경 이미지 none 을 적용할 수 있어야 함', () => {
        const styles = parser.parse('bg-none');

        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toBe('none');
      });

      it('배경 이미지 클래스를 파싱할 수 있어야 함', () => {
        const styles = parser.parse('bg-[url(https://example.com/image.png)]');

        expect(styles.backgrounds).toBeDefined();
        expect(styles.backgrounds?.backgroundImage).toBe('url(https://example.com/image.png)');
      });
      
    });
  });
});

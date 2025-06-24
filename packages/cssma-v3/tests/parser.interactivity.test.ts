import { describe, it, expect } from "vitest";
import { loadConfig, loadPreset } from "../src/config";
import { CSSParser } from "../src";

describe('CSSParser - Interactivity', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('Accent Color 클래스 파싱', () => {
    it('accent-red-500 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('accent-red-500');
      expect(result).toBeDefined();
      expect(result?.className).toBe('accent-red-500');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('accentColor');
      expect(result?.value).toBe('#ef4444');
    });
    
    it('accent-blue-500 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('accent-blue-500');
      expect(result).toBeDefined();
      expect(result?.className).toBe('accent-blue-500');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('accentColor');
      expect(result?.value).toBe('#3b82f6');
    });
    
    it('임의값 accent-[#ff0000] 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('accent-[#ff0000]');
      expect(result).toBeDefined();
      expect(result?.className).toBe('accent-[#ff0000]');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('accentColor');
      expect(result?.value).toBe('#ff0000');
    });
  });
  
  describe('Appearance 클래스 파싱', () => {
    it('appearance-none 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('appearance-none');
      expect(result).toBeDefined();
      expect(result?.className).toBe('appearance-none');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('appearance');
      expect(result?.value).toBe('none');
    });
    
    it('appearance-auto 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('appearance-auto');
      expect(result).toBeDefined();
      expect(result?.className).toBe('appearance-auto');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('appearance');
      expect(result?.value).toBe('auto');
    });
  });
  
  describe('Cursor 클래스 파싱', () => {
    it('cursor-pointer 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('cursor-pointer');
      expect(result).toBeDefined();
      expect(result?.className).toBe('cursor-pointer');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('cursor');
      expect(result?.value).toBe('pointer');
    });
    
    it('cursor-not-allowed 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('cursor-not-allowed');
      expect(result).toBeDefined();
      expect(result?.className).toBe('cursor-not-allowed');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('cursor');
      expect(result?.value).toBe('not-allowed');
    });
    
    it('cursor-wait 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('cursor-wait');
      expect(result).toBeDefined();
      expect(result?.className).toBe('cursor-wait');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('cursor');
      expect(result?.value).toBe('wait');
    });
  });
  
  describe('Caret Color 클래스 파싱', () => {
    it('caret-red-500 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('caret-red-500');
      expect(result).toBeDefined();
      expect(result?.className).toBe('caret-red-500');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('caretColor');
      expect(result?.value).toBe('#ef4444');
    });
    
    it('caret-blue-500 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('caret-blue-500');
      expect(result).toBeDefined();
      expect(result?.className).toBe('caret-blue-500');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('caretColor');
      expect(result?.value).toBe('#3b82f6');
    });
  });
  
  describe('Pointer Events 클래스 파싱', () => {
    it('pointer-events-none 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('pointer-events-none');
      expect(result).toBeDefined();
      expect(result?.className).toBe('pointer-events-none');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('pointerEvents');
      expect(result?.value).toBe('none');
    });
    
    it('pointer-events-auto 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('pointer-events-auto');
      expect(result).toBeDefined();
      expect(result?.className).toBe('pointer-events-auto');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('pointerEvents');
      expect(result?.value).toBe('auto');
    });
  });
  
  describe('Resize 클래스 파싱', () => {
    it('resize-none 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('resize-none');
      expect(result).toBeDefined();
      expect(result?.className).toBe('resize-none');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('resize');
      expect(result?.value).toBe('none');
    });
    
    it('resize-x 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('resize-x');
      expect(result).toBeDefined();
      expect(result?.className).toBe('resize-x');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('resize');
      expect(result?.value).toBe('horizontal');
    });
    
    it('resize-y 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('resize-y');
      expect(result).toBeDefined();
      expect(result?.className).toBe('resize-y');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('resize');
      expect(result?.value).toBe('vertical');
    });
    
    it('resize 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('resize');
      expect(result).toBeDefined();
      expect(result?.className).toBe('resize');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('resize');
      expect(result?.value).toBe('both');
    });
  });
  
  describe('Scroll Behavior 클래스 파싱', () => {
    it('scroll-auto 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('scroll-auto');
      expect(result).toBeDefined();
      expect(result?.className).toBe('scroll-auto');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('scrollBehavior');
      expect(result?.value).toBe('auto');
    });
    
    it('scroll-smooth 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('scroll-smooth');
      expect(result).toBeDefined();
      expect(result?.className).toBe('scroll-smooth');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('scrollBehavior');
      expect(result?.value).toBe('smooth');
    });
  });
  
  describe('Scroll Margin 클래스 파싱', () => {
    it('scroll-m-4 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('scroll-m-4');
      expect(result).toBeDefined();
      expect(result?.className).toBe('scroll-m-4');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('scrollMargin');
      expect(result?.value).toBe('1rem');
    });
    
    it('scroll-mx-4 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('scroll-mx-4');
      expect(result).toBeDefined();
      expect(result?.className).toBe('scroll-mx-4');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('scrollMarginLeft');
      expect(result?.value).toBe('1rem');
    });
    
    it('scroll-my-4 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('scroll-my-4');
      expect(result).toBeDefined();
      expect(result?.className).toBe('scroll-my-4');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('scrollMarginTop');
      expect(result?.value).toBe('1rem');
    });
  });
  
  describe('Scroll Padding 클래스 파싱', () => {
    it('scroll-p-4 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('scroll-p-4');
      expect(result).toBeDefined();
      expect(result?.className).toBe('scroll-p-4');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('scrollPadding');
      expect(result?.value).toBe('1rem');
    });
    
    it('scroll-px-4 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('scroll-px-4');
      expect(result).toBeDefined();
      expect(result?.className).toBe('scroll-px-4');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('scrollPaddingLeft');
      expect(result?.value).toBe('1rem');
    });
    
    it('scroll-py-4 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('scroll-py-4');
      expect(result).toBeDefined();
      expect(result?.className).toBe('scroll-py-4');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('scrollPaddingTop');
      expect(result?.value).toBe('1rem');
    });
  });
  
  describe('Scroll Snap 클래스 파싱', () => {
    it('snap-start 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('snap-start');
      expect(result).toBeDefined();
      expect(result?.className).toBe('snap-start');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('scrollSnapAlign');
      expect(result?.value).toBe('start');
    });
    
    it('snap-none 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('snap-none');
      expect(result).toBeDefined();
      expect(result?.className).toBe('snap-none');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('scrollSnapType');
      expect(result?.value).toBe('none');
    });
    
    it('snap-normal 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('snap-normal');
      expect(result).toBeDefined();
      expect(result?.className).toBe('snap-normal');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('scrollSnapStop');
      expect(result?.value).toBe('normal');
    });
  });
  
  describe('Touch Action 클래스 파싱', () => {
    it('touch-auto 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('touch-auto');
      expect(result).toBeDefined();
      expect(result?.className).toBe('touch-auto');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('touchAction');
      expect(result?.value).toBe('auto');
    });
    
    it('touch-none 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('touch-none');
      expect(result).toBeDefined();
      expect(result?.className).toBe('touch-none');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('touchAction');
      expect(result?.value).toBe('none');
    });
    
    it('touch-pan-x 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('touch-pan-x');
      expect(result).toBeDefined();
      expect(result?.className).toBe('touch-pan-x');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('touchAction');
      expect(result?.value).toBe('pan-x');
    });
  });
  
  describe('User Select 클래스 파싱', () => {
    it('select-none 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('select-none');
      expect(result).toBeDefined();
      expect(result?.className).toBe('select-none');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('userSelect');
      expect(result?.value).toBe('none');
    });
    
    it('select-text 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('select-text');
      expect(result).toBeDefined();
      expect(result?.className).toBe('select-text');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('userSelect');
      expect(result?.value).toBe('text');
    });
    
    it('select-all 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('select-all');
      expect(result).toBeDefined();
      expect(result?.className).toBe('select-all');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('userSelect');
      expect(result?.value).toBe('all');
    });
    
    it('select-auto 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('select-auto');
      expect(result).toBeDefined();
      expect(result?.className).toBe('select-auto');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('userSelect');
      expect(result?.value).toBe('auto');
    });
  });
  
  describe('Will Change 클래스 파싱', () => {
    it('will-change-auto 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('will-change-auto');
      expect(result).toBeDefined();
      expect(result?.className).toBe('will-change-auto');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('willChange');
      expect(result?.value).toBe('auto');
    });
    
    it('will-change-scroll 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('will-change-scroll');
      expect(result).toBeDefined();
      expect(result?.className).toBe('will-change-scroll');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('willChange');
      expect(result?.value).toBe('scroll-position');
    });
    
    it('will-change-contents 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('will-change-contents');
      expect(result).toBeDefined();
      expect(result?.className).toBe('will-change-contents');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('willChange');
      expect(result?.value).toBe('contents');
    });
  });
  
  describe('Interactivity 스타일 적용', () => {
    it('accent-red-500 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('accent-red-500');
      expect(result.interactivity?.accentColor).toBe('#ef4444');
    });
    
    it('cursor-pointer 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('cursor-pointer');
      expect(result.interactivity?.cursor).toBe('pointer');
    });
    
    it('pointer-events-none 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('pointer-events-none');
      expect(result.interactivity?.pointerEvents).toBe('none');
    });
    
    it('resize-none 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('resize-none');
      expect(result.interactivity?.resize).toBe('none');
    });
    
    it('scroll-smooth 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('scroll-smooth');
      expect(result.interactivity?.scrollBehavior).toBe('smooth');
    });
    
    it('select-none 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('select-none');
      expect(result.interactivity?.userSelect).toBe('none');
    });
    
    it('touch-auto 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('touch-auto');
      expect(result.interactivity?.touchAction).toBe('auto');
    });
    
    it('will-change-auto 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('will-change-auto');
      expect(result.interactivity?.willChange).toBe('auto');
    });
  });
  
  describe('반응형 Interactivity 스타일', () => {
    it('반응형 cursor 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('md:cursor-pointer');
      expect(result.breakpoints?.md?.interactivity?.cursor).toBe('pointer');
    });
    
    it('반응형 pointer-events 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('lg:pointer-events-none');
      expect(result.breakpoints?.lg?.interactivity?.pointerEvents).toBe('none');
    });
    
    it('반응형 select 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('sm:select-none');
      expect(result.breakpoints?.sm?.interactivity?.userSelect).toBe('none');
    });
  });
  
  describe('상태 변형자 Interactivity 스타일', () => {
    it('hover cursor 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('hover:cursor-pointer');
      expect(result.states?.[':hover']?.interactivity?.cursor).toBe('pointer');
    });
    
    it.only('focus caret 색상 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('focus:caret-red-500');
      console.log(result);
      expect(result.states?.[':focus']?.interactivity?.caretColor).toBe('#ef4444');
    });
    
    it('active pointer-events 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('active:pointer-events-none');
      expect(result.states?.[':active']?.interactivity?.pointerEvents).toBe('none');
    });
  });
  
  describe('복합 Interactivity 스타일', () => {
    it('여러 interactivity 클래스를 동시에 적용할 수 있어야 함', () => {
      const result = parser.parse('cursor-pointer select-none pointer-events-auto');
      expect(result.interactivity?.cursor).toBe('pointer');
      expect(result.interactivity?.userSelect).toBe('none');
      expect(result.interactivity?.pointerEvents).toBe('auto');
    });
    
    it('반응형과 상태 변형자를 조합할 수 있어야 함', () => {
      const result = parser.parse('md:cursor-pointer hover:cursor-not-allowed');
      expect(result.breakpoints?.['md']?.interactivity?.cursor).toBe('pointer');
      expect(result.states?.[':hover']?.interactivity?.cursor).toBe('not-allowed');
    });
  });
});
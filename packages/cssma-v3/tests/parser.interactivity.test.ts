import { describe, it, expect } from "vitest";
import { loadConfig, loadPreset } from "../src/config";
import { CSSParser } from "../src";
import { DEFAULT_CONFIG, DEFAULT_PRESET } from '../src/config';

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
      expect(result?.property).toBe('touch-action');
      expect(result?.value).toBe('auto');
    });
    
    it('touch-none 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('touch-none');
      expect(result).toBeDefined();
      expect(result?.className).toBe('touch-none');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('touch-action');
      expect(result?.value).toBe('none');
    });
    
    it('touch-pan-x 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('touch-pan-x');
      expect(result).toBeDefined();
      expect(result?.className).toBe('touch-pan-x');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('touch-action');
      expect(result?.value).toBe('pan-x');
    });
  });
  
  describe('User Select 클래스 파싱', () => {
    it('select-none 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('select-none');
      expect(result).toBeDefined();
      expect(result?.className).toBe('select-none');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('select');
      expect(result?.value).toBe('none');
    });
    
    it('select-text 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('select-text');
      expect(result).toBeDefined();
      expect(result?.className).toBe('select-text');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('select');
      expect(result?.value).toBe('text');
    });
    
    it('select-all 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('select-all');
      expect(result).toBeDefined();
      expect(result?.className).toBe('select-all');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('select');
      expect(result?.value).toBe('all');
    });
    
    it('select-auto 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('select-auto');
      expect(result).toBeDefined();
      expect(result?.className).toBe('select-auto');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('select');
      expect(result?.value).toBe('auto');
    });
  });
  
  describe('Will Change 클래스 파싱', () => {
    it('will-change-auto 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('will-change-auto');
      expect(result).toBeDefined();
      expect(result?.className).toBe('will-change-auto');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('will-change');
      expect(result?.value).toBe('auto');
    });
    
    it('will-change-scroll 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('will-change-scroll');
      expect(result).toBeDefined();
      expect(result?.className).toBe('will-change-scroll');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('will-change');
      expect(result?.value).toBe('scroll');
    });
    
    it('will-change-contents 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('will-change-contents');
      expect(result).toBeDefined();
      expect(result?.className).toBe('will-change-contents');
      expect(result?.category).toBe('interactivity');
      expect(result?.property).toBe('will-change');
      expect(result?.value).toBe('contents');
    });
  });
  
  describe('Interactivity 스타일 적용', () => {
    it('accent-red-500 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('accent-red-500');
      console.log(result);
      expect(result.interactivity?.accentColor).toBe('#a69d83');
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
    
    it('focus caret 색상 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('focus:caret-red-500');
      expect(result.states?.[':focus']?.interactivity?.caretColor).toBe('#a69d83');
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

describe('Interactivity Parser', () => {
  const testParser = new CSSParser(DEFAULT_CONFIG, DEFAULT_PRESET);

  describe('Class Recognition', () => {
    it('should recognize accent color classes', () => {
      expect(testParser.parseClassName('accent-red-500')).toBeDefined();
      expect(testParser.parseClassName('accent-inherit')).toBeDefined();
      expect(testParser.parseClassName('accent-current')).toBeDefined();
      expect(testParser.parseClassName('accent-transparent')).toBeDefined();
      expect(testParser.parseClassName('accent-[#ff0000]')).toBeDefined();
    });

    it('should recognize appearance classes', () => {
      expect(testParser.parseClassName('appearance-none')).toBeDefined();
      expect(testParser.parseClassName('appearance-auto')).toBeDefined();
      expect(testParser.parseClassName('appearance-menulist-button')).toBeDefined();
      expect(testParser.parseClassName('appearance-textfield')).toBeDefined();
    });

    it('should recognize cursor classes', () => {
      expect(testParser.parseClassName('cursor-auto')).toBeDefined();
      expect(testParser.parseClassName('cursor-default')).toBeDefined();
      expect(testParser.parseClassName('cursor-pointer')).toBeDefined();
      expect(testParser.parseClassName('cursor-wait')).toBeDefined();
      expect(testParser.parseClassName('cursor-text')).toBeDefined();
      expect(testParser.parseClassName('cursor-move')).toBeDefined();
      expect(testParser.parseClassName('cursor-help')).toBeDefined();
      expect(testParser.parseClassName('cursor-not-allowed')).toBeDefined();
      expect(testParser.parseClassName('cursor-none')).toBeDefined();
      expect(testParser.parseClassName('cursor-context-menu')).toBeDefined();
      expect(testParser.parseClassName('cursor-progress')).toBeDefined();
      expect(testParser.parseClassName('cursor-cell')).toBeDefined();
      expect(testParser.parseClassName('cursor-crosshair')).toBeDefined();
      expect(testParser.parseClassName('cursor-vertical-text')).toBeDefined();
      expect(testParser.parseClassName('cursor-alias')).toBeDefined();
      expect(testParser.parseClassName('cursor-copy')).toBeDefined();
      expect(testParser.parseClassName('cursor-no-drop')).toBeDefined();
      expect(testParser.parseClassName('cursor-grab')).toBeDefined();
      expect(testParser.parseClassName('cursor-grabbing')).toBeDefined();
      expect(testParser.parseClassName('cursor-all-scroll')).toBeDefined();
      expect(testParser.parseClassName('cursor-col-resize')).toBeDefined();
      expect(testParser.parseClassName('cursor-row-resize')).toBeDefined();
      expect(testParser.parseClassName('cursor-n-resize')).toBeDefined();
      expect(testParser.parseClassName('cursor-e-resize')).toBeDefined();
      expect(testParser.parseClassName('cursor-s-resize')).toBeDefined();
      expect(testParser.parseClassName('cursor-w-resize')).toBeDefined();
      expect(testParser.parseClassName('cursor-ne-resize')).toBeDefined();
      expect(testParser.parseClassName('cursor-nw-resize')).toBeDefined();
      expect(testParser.parseClassName('cursor-se-resize')).toBeDefined();
      expect(testParser.parseClassName('cursor-sw-resize')).toBeDefined();
      expect(testParser.parseClassName('cursor-ew-resize')).toBeDefined();
      expect(testParser.parseClassName('cursor-ns-resize')).toBeDefined();
      expect(testParser.parseClassName('cursor-nesw-resize')).toBeDefined();
      expect(testParser.parseClassName('cursor-nwse-resize')).toBeDefined();
      expect(testParser.parseClassName('cursor-zoom-in')).toBeDefined();
      expect(testParser.parseClassName('cursor-zoom-out')).toBeDefined();
      expect(testParser.parseClassName('cursor-[url(cursor.png)]')).toBeDefined();
    });

    it('should recognize caret color classes', () => {
      expect(testParser.parseClassName('caret-inherit')).toBeDefined();
      expect(testParser.parseClassName('caret-current')).toBeDefined();
      expect(testParser.parseClassName('caret-transparent')).toBeDefined();
      expect(testParser.parseClassName('caret-black')).toBeDefined();
      expect(testParser.parseClassName('caret-white')).toBeDefined();
      expect(testParser.parseClassName('caret-red-500')).toBeDefined();
      expect(testParser.parseClassName('caret-blue-600')).toBeDefined();
      expect(testParser.parseClassName('caret-[#ff0000]')).toBeDefined();
    });

    it('should recognize pointer events classes', () => {
      expect(testParser.parseClassName('pointer-events-none')).toBeDefined();
      expect(testParser.parseClassName('pointer-events-auto')).toBeDefined();
    });

    it('should recognize resize classes', () => {
      expect(testParser.parseClassName('resize-none')).toBeDefined();
      expect(testParser.parseClassName('resize-y')).toBeDefined();
      expect(testParser.parseClassName('resize-x')).toBeDefined();
      expect(testParser.parseClassName('resize')).toBeDefined();
    });

    it('should recognize scroll behavior classes', () => {
      expect(testParser.parseClassName('scroll-auto')).toBeDefined();
      expect(testParser.parseClassName('scroll-smooth')).toBeDefined();
    });

    it('should recognize scroll margin classes', () => {
      expect(testParser.parseClassName('scroll-m-0')).toBeDefined();
      expect(testParser.parseClassName('scroll-mx-4')).toBeDefined();
      expect(testParser.parseClassName('scroll-my-2')).toBeDefined();
      expect(testParser.parseClassName('scroll-mt-1')).toBeDefined();
      expect(testParser.parseClassName('scroll-mr-3')).toBeDefined();
      expect(testParser.parseClassName('scroll-mb-5')).toBeDefined();
      expect(testParser.parseClassName('scroll-ml-6')).toBeDefined();
      expect(testParser.parseClassName('scroll-m-[10px]')).toBeDefined();
    });

    it('should recognize scroll padding classes', () => {
      expect(testParser.parseClassName('scroll-p-0')).toBeDefined();
      expect(testParser.parseClassName('scroll-px-4')).toBeDefined();
      expect(testParser.parseClassName('scroll-py-2')).toBeDefined();
      expect(testParser.parseClassName('scroll-pt-1')).toBeDefined();
      expect(testParser.parseClassName('scroll-pr-3')).toBeDefined();
      expect(testParser.parseClassName('scroll-pb-5')).toBeDefined();
      expect(testParser.parseClassName('scroll-pl-6')).toBeDefined();
      expect(testParser.parseClassName('scroll-p-[10px]')).toBeDefined();
    });

    it('should recognize touch action classes', () => {
      expect(testParser.parseClassName('touch-auto')).toBeDefined();
      expect(testParser.parseClassName('touch-none')).toBeDefined();
      expect(testParser.parseClassName('touch-pan-x')).toBeDefined();
      expect(testParser.parseClassName('touch-pan-left')).toBeDefined();
      expect(testParser.parseClassName('touch-pan-right')).toBeDefined();
      expect(testParser.parseClassName('touch-pan-y')).toBeDefined();
      expect(testParser.parseClassName('touch-pan-up')).toBeDefined();
      expect(testParser.parseClassName('touch-pan-down')).toBeDefined();
      expect(testParser.parseClassName('touch-pinch-zoom')).toBeDefined();
      expect(testParser.parseClassName('touch-manipulation')).toBeDefined();
    });

    it('should recognize user select classes', () => {
      expect(testParser.parseClassName('select-none')).toBeDefined();
      expect(testParser.parseClassName('select-text')).toBeDefined();
      expect(testParser.parseClassName('select-all')).toBeDefined();
      expect(testParser.parseClassName('select-auto')).toBeDefined();
    });

    it('should recognize will-change classes', () => {
      expect(testParser.parseClassName('will-change-auto')).toBeDefined();
      expect(testParser.parseClassName('will-change-scroll')).toBeDefined();
      expect(testParser.parseClassName('will-change-contents')).toBeDefined();
      expect(testParser.parseClassName('will-change-transform')).toBeDefined();
      expect(testParser.parseClassName('will-change-[opacity,transform]')).toBeDefined();
    });
  });

  describe('Value Parsing', () => {
    it('should parse accent color values', () => {
      const result1 = testParser.parseClassName('accent-red-500');
      expect(result1?.property).toBe('accent');
      expect(result1?.category).toBe('interactivity');

      const result2 = testParser.parseClassName('accent-inherit');
      expect(result2?.property).toBe('accent');
      expect(result2?.value).toBe('inherit');

      const result3 = testParser.parseClassName('accent-current');
      expect(result3?.property).toBe('accent');
      expect(result3?.value).toBe('current');

      const result4 = testParser.parseClassName('accent-[#ff0000]');
      expect(result4?.property).toBe('accent');
      expect(result4?.isArbitrary).toBe(true);
    });

    it('should parse appearance values', () => {
      const result1 = testParser.parseClassName('appearance-none');
      expect(result1?.property).toBe('appearance');
      expect(result1?.value).toBe('none');
      expect(result1?.category).toBe('interactivity');

      const result2 = testParser.parseClassName('appearance-auto');
      expect(result2?.property).toBe('appearance');
      expect(result2?.value).toBe('auto');
    });

    it('should parse cursor values', () => {
      const result1 = testParser.parseClassName('cursor-pointer');
      expect(result1?.property).toBe('cursor');
      expect(result1?.value).toBe('pointer');
      expect(result1?.category).toBe('interactivity');

      const result2 = testParser.parseClassName('cursor-not-allowed');
      expect(result2?.property).toBe('cursor');
      expect(result2?.value).toBe('not-allowed');

      const result3 = testParser.parseClassName('cursor-[url(cursor.png)]');
      expect(result3?.property).toBe('cursor');
      expect(result3?.isArbitrary).toBe(true);
    });

    it('should parse caret color values', () => {
      const result1 = testParser.parseClassName('caret-blue-500');
      expect(result1?.property).toBe('caret');
      expect(result1?.category).toBe('interactivity');

      const result2 = testParser.parseClassName('caret-inherit');
      expect(result2?.property).toBe('caret');
      expect(result2?.value).toBe('inherit');

      const result3 = testParser.parseClassName('caret-[#00ff00]');
      expect(result3?.property).toBe('caret');
      expect(result3?.isArbitrary).toBe(true);
    });

    it('should parse pointer events values', () => {
      const result1 = testParser.parseClassName('pointer-events-none');
      expect(result1?.property).toBe('pointer-events');
      expect(result1?.value).toBe('none');
      expect(result1?.category).toBe('interactivity');

      const result2 = testParser.parseClassName('pointer-events-auto');
      expect(result2?.property).toBe('pointer-events');
      expect(result2?.value).toBe('auto');
    });

    it('should parse resize values', () => {
      const result1 = testParser.parseClassName('resize');
      expect(result1?.property).toBe('resize');
      expect(result1?.value).toBe('both');
      expect(result1?.category).toBe('interactivity');

      const result2 = testParser.parseClassName('resize-none');
      expect(result2?.property).toBe('resize');
      expect(result2?.value).toBe('none');

      const result3 = testParser.parseClassName('resize-x');
      expect(result3?.property).toBe('resize');
      expect(result3?.value).toBe('horizontal');

      const result4 = testParser.parseClassName('resize-y');
      expect(result4?.property).toBe('resize');
      expect(result4?.value).toBe('vertical');
    });

    it('should parse scroll behavior values', () => {
      const result1 = testParser.parseClassName('scroll-auto');
      expect(result1?.property).toBe('scroll-behavior');
      expect(result1?.value).toBe('auto');
      expect(result1?.category).toBe('interactivity');

      const result2 = testParser.parseClassName('scroll-smooth');
      expect(result2?.property).toBe('scroll-behavior');
      expect(result2?.value).toBe('smooth');
    });

    it('should parse scroll margin values', () => {
      const result1 = testParser.parseClassName('scroll-m-4');
      expect(result1?.property).toBe('scroll-m');
      expect(result1?.value).toBe('4');
      expect(result1?.category).toBe('interactivity');

      const result2 = testParser.parseClassName('scroll-mx-2');
      expect(result2?.property).toBe('scroll-mx');
      expect(result2?.value).toBe('2');

      const result3 = testParser.parseClassName('scroll-m-[10px]');
      expect(result3?.property).toBe('scroll-m');
      expect(result3?.isArbitrary).toBe(true);
    });

    it('should parse scroll padding values', () => {
      const result1 = testParser.parseClassName('scroll-p-4');
      expect(result1?.property).toBe('scroll-p');
      expect(result1?.value).toBe('4');
      expect(result1?.category).toBe('interactivity');

      const result2 = testParser.parseClassName('scroll-px-2');
      expect(result2?.property).toBe('scroll-px');
      expect(result2?.value).toBe('2');

      const result3 = testParser.parseClassName('scroll-p-[10px]');
      expect(result3?.property).toBe('scroll-p');
      expect(result3?.isArbitrary).toBe(true);
    });

    it('should parse touch action values', () => {
      const result1 = testParser.parseClassName('touch-auto');
      expect(result1?.property).toBe('touch-action');
      expect(result1?.value).toBe('auto');
      expect(result1?.category).toBe('interactivity');

      const result2 = testParser.parseClassName('touch-none');
      expect(result2?.property).toBe('touch-action');
      expect(result2?.value).toBe('none');

      const result3 = testParser.parseClassName('touch-pan-x');
      expect(result3?.property).toBe('touch-action');
      expect(result3?.value).toBe('pan-x');

      const result4 = testParser.parseClassName('touch-manipulation');
      expect(result4?.property).toBe('touch-action');
      expect(result4?.value).toBe('manipulation');
    });

    it('should parse user select values', () => {
      const result1 = testParser.parseClassName('select-none');
      expect(result1?.property).toBe('select');
      expect(result1?.value).toBe('none');
      expect(result1?.category).toBe('interactivity');

      const result2 = testParser.parseClassName('select-text');
      expect(result2?.property).toBe('select');
      expect(result2?.value).toBe('text');

      const result3 = testParser.parseClassName('select-all');
      expect(result3?.property).toBe('select');
      expect(result3?.value).toBe('all');

      const result4 = testParser.parseClassName('select-auto');
      expect(result4?.property).toBe('select');
      expect(result4?.value).toBe('auto');
    });

    it('should parse will-change values', () => {
      const result1 = testParser.parseClassName('will-change-auto');
      expect(result1?.property).toBe('will-change');
      expect(result1?.value).toBe('auto');
      expect(result1?.category).toBe('interactivity');

      const result2 = testParser.parseClassName('will-change-scroll');
      expect(result2?.property).toBe('will-change');
      expect(result2?.value).toBe('scroll');

      const result3 = testParser.parseClassName('will-change-contents');
      expect(result3?.property).toBe('will-change');
      expect(result3?.value).toBe('contents');

      const result4 = testParser.parseClassName('will-change-transform');
      expect(result4?.property).toBe('will-change');
      expect(result4?.value).toBe('transform');

      const result5 = testParser.parseClassName('will-change-[opacity,transform]');
      expect(result5?.property).toBe('will-change');
      expect(result5?.isArbitrary).toBe(true);
    });
  });

  describe('Responsive & States', () => {
    it('should handle responsive modifiers', () => {
      const result = testParser.parseClassName('md:cursor-pointer');
      expect(result).toBeDefined();
      expect(result?.baseClassName).toBe('cursor-pointer');
      expect(result?.modifiers?.responsive).toBeDefined();
    });

    it('should handle state modifiers', () => {
      const result = testParser.parseClassName('hover:cursor-grab');
      expect(result).toBeDefined();
      expect(result?.baseClassName).toBe('cursor-grab');
      expect(result?.modifiers?.state).toEqual([':hover']);
    });

    it('should handle combined modifiers', () => {
      const result = testParser.parseClassName('lg:hover:pointer-events-none');
      expect(result).toBeDefined();
      expect(result?.baseClassName).toBe('pointer-events-none');
      expect(result?.modifiers?.responsive).toBeDefined();
      expect(result?.modifiers?.state).toEqual([':hover']);
    });
  });

  describe('Edge Cases', () => {
    it('should handle invalid classes', () => {
      expect(testParser.parseClassName('invalid-interactivity')).toBeNull();
      expect(testParser.parseClassName('cursor-invalid-value')).toBeDefined(); // fallback으로 처리됨
      expect(testParser.parseClassName('accent-')).toBeNull();
    });

    it('should handle empty values', () => {
      expect(testParser.parseClassName('cursor-')).toBeNull();
      expect(testParser.parseClassName('scroll-')).toBeNull();
    });

    it('should handle complex arbitrary values', () => {
      const result1 = testParser.parseClassName('cursor-[url("data:image/svg+xml;base64,PHN2Zw==")]');
      expect(result1).toBeDefined();
      expect(result1?.isArbitrary).toBe(true);
      expect(result1?.property).toBe('cursor');

      const result2 = testParser.parseClassName('will-change-[transform,opacity]');
      expect(result2).toBeDefined();
      expect(result2?.isArbitrary).toBe(true);
      expect(result2?.property).toBe('will-change');

      const result3 = testParser.parseClassName('scroll-m-[calc(1rem+2px)]');
      expect(result3).toBeDefined();
      expect(result3?.isArbitrary).toBe(true);
      expect(result3?.property).toBe('scroll-m');
    });
  });
});
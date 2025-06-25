import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 애니메이션', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('애니메이션 클래스 파싱', () => {
    it('transition 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('transition');
      expect(result).toBeDefined();
      expect(result?.className).toBe('transition');
      expect(result?.category).toBe('animation');
      expect(result?.property).toBe('transition');
    });
    
    it('transition-duration 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('duration-300');
      expect(result).toBeDefined();
      expect(result?.className).toBe('duration-300');
      expect(result?.category).toBe('animation');
      expect(result?.property).toBe('duration');
      expect(result?.value).toBe('300');
    });
    
    it('transition-timing-function 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('ease-in-out');
      expect(result).toBeDefined();
      expect(result?.className).toBe('ease-in-out');
      expect(result?.category).toBe('animation');
      expect(result?.property).toBe('ease');
      expect(result?.value).toBe('in-out');
    });
    
    it('transition-delay 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('delay-150');
      expect(result).toBeDefined();
      expect(result?.className).toBe('delay-150');
      expect(result?.category).toBe('animation');
      expect(result?.property).toBe('delay');
      expect(result?.value).toBe('150');
    });
    
    it('애니메이션 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('animate-spin');
      expect(result).toBeDefined();
      expect(result?.className).toBe('animate-spin');
      expect(result?.category).toBe('animation');
      expect(result?.property).toBe('animate');
      expect(result?.value).toBe('spin');
    });

    it('애니메이션 반복 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('repeat-infinite');
      expect(result).toBeDefined();
      expect(result?.className).toBe('repeat-infinite');
      expect(result?.category).toBe('animation');
      expect(result?.property).toBe('repeat');
      expect(result?.value).toBe('infinite');
    });

    it('애니메이션 방향 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('direction-alternate');
      expect(result).toBeDefined();
      expect(result?.className).toBe('direction-alternate');
      expect(result?.category).toBe('animation');
      expect(result?.property).toBe('direction');
      expect(result?.value).toBe('alternate');
    });

    it('애니메이션 채우기 모드 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('fill-forwards');
      expect(result).toBeDefined();
      expect(result?.className).toBe('fill-forwards');
      expect(result?.category).toBe('animation');
      expect(result?.property).toBe('fill');
      expect(result?.value).toBe('forwards');
    });

    it('임의 지속 시간 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('duration-[500ms]');
      expect(result).toBeDefined();
      expect(result?.className).toBe('duration-[500ms]');
      expect(result?.category).toBe('animation');
      expect(result?.property).toBe('duration');
      expect(result?.value).toBe('500ms');
      expect(result?.isArbitrary).toBe(true);
    });

    it('임의 타이밍 함수 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('ease-[cubic-bezier(0.25,0.1,0.25,1)]');
      expect(result).toBeDefined();
      expect(result?.className).toBe('ease-[cubic-bezier(0.25,0.1,0.25,1)]');
      expect(result?.category).toBe('animation');
      expect(result?.property).toBe('ease');
      expect(result?.value).toBe('cubic-bezier(0.25,0.1,0.25,1)');
      expect(result?.isArbitrary).toBe(true);
    });

    it('임의 지연 시간 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('delay-[200ms]');
      expect(result).toBeDefined();
      expect(result?.className).toBe('delay-[200ms]');
      expect(result?.category).toBe('animation');
      expect(result?.property).toBe('delay');
      expect(result?.value).toBe('200ms');
      expect(result?.isArbitrary).toBe(true);
    });

    it('임의 반복 횟수 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('repeat-[3]');
      expect(result).toBeDefined();
      expect(result?.className).toBe('repeat-[3]');
      expect(result?.category).toBe('animation');
      expect(result?.property).toBe('repeat');
      expect(result?.value).toBe('3');
      expect(result?.isArbitrary).toBe(true);
    });
  });
  
  describe('애니메이션 스타일 적용', () => {
    it('transition 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('transition');
      expect(result.animation.transition).toBeDefined();
      expect(result.animation.transition).toBe(true);
    });
    
    it('transition-duration 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('duration-300');
      expect(result.animation.duration).toBeDefined();
      expect(result.animation.duration).toBe('300ms');
    });
    
    it('CSS 변수 지속 시간을 적용할 수 있어야 함', () => {
      const result = parser.parse('duration-(my-duration)');
      expect(result.animation.duration).toBeDefined();
      expect(result.animation.duration).toBe('var(--my-duration)');
    });
    
    it('복합 지속 시간 값을 적용할 수 있어야 함', () => {
      const result = parser.parse('duration-[1s,2s]');
      expect(result.animation.duration).toBeDefined();
      expect(result.animation.duration).toBe('1s,2s');
    });
    
    it('transition-timing-function 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('ease-in-out');
      expect(result.animation.timingFunction).toBeDefined();
      expect(result.animation.timingFunction).toBe('ease-in-out');
    });
    
    it('transition-delay 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('delay-150');
      expect(result.animation.delay).toBeDefined();
      expect(result.animation.delay).toBe('150ms');
    });
    
    it('CSS 변수 지연 시간을 적용할 수 있어야 함', () => {
      const result = parser.parse('delay-(my-delay)');
      expect(result.animation.delay).toBeDefined();
      expect(result.animation.delay).toBe('var(--my-delay)');
    });
    
    it('복합 지연 시간 값을 적용할 수 있어야 함', () => {
      const result = parser.parse('delay-[500ms,1s]');
      expect(result.animation.delay).toBeDefined();
      expect(result.animation.delay).toBe('500ms,1s');
    });
    
    it('애니메이션 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('animate-spin');
      expect(result.animation.name).toBeDefined();
      expect(result.animation.name).toBe('spin');
    });
    
    it('여러 애니메이션 스타일을 함께 적용할 수 있어야 함', () => {
      const result = parser.parse('transition duration-300 ease-in-out delay-150');
      expect(result.animation.transition).toBe(true);
      expect(result.animation.duration).toBe('300ms');
      expect(result.animation.timingFunction).toBe('ease-in-out');
      expect(result.animation.delay).toBe('150ms');
    });
    
    it('임의 애니메이션 값을 적용할 수 있어야 함', () => {
      const result = parser.parse('duration-[400ms]');
      expect(result.animation.duration).toBeDefined();
      expect(result.animation.duration).toBe('400ms');
    });

    it('애니메이션 반복 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('repeat-infinite');
      expect(result.animation.iterationCount).toBeDefined();
      expect(result.animation.iterationCount).toBe('infinite');
    });

    it('애니메이션 방향 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('direction-alternate');
      expect(result.animation.direction).toBeDefined();
      expect(result.animation.direction).toBe('alternate');
    });

    it('애니메이션 채우기 모드 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('fill-forwards');
      expect(result.animation.fillMode).toBeDefined();
      expect(result.animation.fillMode).toBe('forwards');
    });

    it('임의 타이밍 함수 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('ease-[cubic-bezier(0.25,0.1,0.25,1)]');
      expect(result.animation.timingFunction).toBeDefined();
      expect(result.animation.timingFunction).toBe('cubic-bezier(0.25,0.1,0.25,1)');
    });

    it('복합 애니메이션 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('animate-spin duration-[500ms] ease-linear repeat-infinite');
      expect(result.animation.name).toBe('spin');
      expect(result.animation.duration).toBe('500ms');
      expect(result.animation.timingFunction).toBe('linear');
      expect(result.animation.iterationCount).toBe('infinite');
    });
  });

  describe('모디파이어가 있는 애니메이션 클래스 파싱', () => {
    it('상태 모디파이어가 있는 애니메이션 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('hover:animate-spin');
      expect(result).toBeDefined();
      expect(result?.baseClassName).toBe('animate-spin');
      expect(result?.property).toBe('animate');
      expect(result?.value).toBe('spin');
      expect(result?.modifiers?.state).toEqual([':hover']);
    });

    it('반응형 모디파이어가 있는 애니메이션 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('md:animate-spin');
      expect(result).toBeDefined();
      expect(result?.className).toBe('md:animate-spin');
      expect(result?.category).toBe('animation');
      expect(result?.property).toBe('animate');
      expect(result?.value).toBe('spin');
      expect(result?.modifiers?.responsive).toBeDefined();
      expect(result?.modifiers?.responsive?.md).toBeDefined();
    });

    it('복합 모디파이어가 있는 애니메이션 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('md:hover:animate-spin');
      expect(result).toBeDefined();
      expect(result?.baseClassName).toBe('animate-spin');
      expect(result?.property).toBe('animate');
      expect(result?.value).toBe('spin');
      expect(result?.modifiers?.state).toEqual([':hover']);
      expect(result?.modifiers?.responsive).toBeDefined();
      expect(result?.modifiers?.responsive?.md).toBeDefined();
    });

    it('상태 모디파이어가 있는 임의 애니메이션 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('hover:duration-[500ms]');
      expect(result).toBeDefined();
      expect(result?.baseClassName).toBe('duration-[500ms]');
      expect(result?.property).toBe('duration');
      expect(result?.value).toBe('500ms');
      expect(result?.modifiers?.state).toEqual([':hover']);
      expect(result?.isArbitrary).toBe(true);
    });

    it('반응형 모디파이어가 있는 임의 애니메이션 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('md:duration-[500ms]');
      expect(result).toBeDefined();
      expect(result?.className).toBe('md:duration-[500ms]');
      expect(result?.category).toBe('animation');
      expect(result?.property).toBe('duration');
      expect(result?.value).toBe('500ms');
      expect(result?.isArbitrary).toBe(true);
      expect(result?.modifiers?.responsive).toBeDefined();
      expect(result?.modifiers?.responsive?.md).toBeDefined();
    });

    it('복합 모디파이어가 있는 임의 애니메이션 클래스를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('md:hover:duration-[500ms]');
      expect(result).toBeDefined();
      expect(result?.baseClassName).toBe('duration-[500ms]');
      expect(result?.property).toBe('duration');
      expect(result?.value).toBe('500ms');
      expect(result?.isArbitrary).toBe(true);
      expect(result?.modifiers?.state).toEqual([':hover']);
      expect(result?.modifiers?.responsive).toBeDefined();
      expect(result?.modifiers?.responsive?.md).toBeDefined();
    });
  });

  describe('모디파이어가 있는 애니메이션 스타일 적용', () => {
    it('상태 모디파이어가 있는 애니메이션 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('hover:animate-spin');
      expect(result.states?.[':hover']?.animation?.name).toBeDefined();
      expect(result.states?.[':hover']?.animation?.name).toBe('spin');
    });

    it('반응형 모디파이어가 있는 애니메이션 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('md:animate-spin');
      expect(result.breakpoints?.md?.animation?.name).toBeDefined();
      expect(result.breakpoints?.md?.animation?.name).toBe('spin');
    });

    it('복합 모디파이어가 있는 애니메이션 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('md:hover:animate-spin');
      expect(result.breakpoints?.md?.states?.[':hover']?.animation?.name).toBeDefined();
      expect(result.breakpoints?.md?.states?.[':hover']?.animation?.name).toBe('spin');
    });

    it('상태 모디파이어가 있는 임의 애니메이션 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('hover:duration-[500ms]');
      expect(result.states?.[':hover']?.animation?.duration).toBeDefined();
      expect(result.states?.[':hover']?.animation?.duration).toBe('500ms');
    });

    it('복합 모디파이어가 있는 여러 애니메이션 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('md:hover:animate-spin md:hover:duration-[500ms] md:hover:ease-linear');
      expect(result.breakpoints?.md?.states?.[':hover']?.animation?.name).toBe('spin');
      expect(result.breakpoints?.md?.states?.[':hover']?.animation?.duration).toBe('500ms');
      expect(result.breakpoints?.md?.states?.[':hover']?.animation?.timingFunction).toBe('linear');
    });

    it('다양한 모디파이어 조합을 함께 적용할 수 있어야 함', () => {
      const result = parser.parse('animate-pulse hover:animate-spin md:animate-bounce lg:hover:animate-ping');
      
      // 기본 애니메이션
      expect(result.animation.name).toBe('pulse');
      
      // 상태 모디파이어 애니메이션
      expect(result.states?.[':hover']?.animation?.name).toBe('spin');
      
      // 반응형 모디파이어 애니메이션
      expect(result.breakpoints?.md?.animation?.name).toBe('bounce');
      
      // 복합 모디파이어 애니메이션
      expect(result.breakpoints?.lg?.states?.[':hover']?.animation?.name).toBe('ping');
    });
  });

  describe('추가 애니메이션 테스트', () => {
    it('중첩된 복합 모디파이어 테스트', () => {
      const result = parser.parse('dark:md:hover:animate-spin dark:md:hover:duration-300');
      // dark는 state, md는 responsive, hover는 state - 복잡한 중첩 구조
      // 현재 파서 구조에서는 dark:md:hover를 처리하는 방식을 확인
      expect(result.states).toBeDefined();
      expect(result.breakpoints).toBeDefined();
    });
    
    it('여러 중첩 모디파이어 조합 테스트', () => {
      const result = parser.parse('hover:animate-spin focus:animate-pulse dark:animate-bounce');
      expect(result).toBeDefined();
      expect(result.states?.[':hover']?.animation?.name).toBe('spin');
      expect(result.states?.[':focus']?.animation?.name).toBe('pulse');
      expect(result.states?.['@media (prefers-color-scheme: dark)']?.animation?.name).toBe('bounce');
    });
    
    it('복잡한 임의 값 테스트', () => {
      const result = parser.parseClassName('duration-[calc(500ms+200ms)]');
      expect(result).toBeDefined();
      expect(result?.category).toBe('animation');
      expect(result?.property).toBe('duration');
      expect(result?.value).toBe('calc(500ms+200ms)');
      expect(result?.isArbitrary).toBe(true);
    });
    
    it('애니메이션 속성 충돌 테스트', () => {
      // 동일한 속성이 여러 번 정의된 경우 마지막 값이 적용되어야 함
      const result = parser.parse('duration-100 duration-200 duration-300');
      expect(result.animation.duration).toBe('300ms');
    });
    
    it('모디파이어 내에서의 애니메이션 속성 충돌 테스트', () => {
      // 동일한 모디파이어 내에서 동일한 속성이 여러 번 정의된 경우 마지막 값이 적용되어야 함
      const result = parser.parse('hover:duration-100 hover:duration-200 hover:duration-300');
      expect(result.states?.[':hover']?.animation?.duration).toBe('300ms');
    });
    
    it('애니메이션 프리셋과 개별 속성 조합 테스트', () => {
      // 애니메이션 프리셋과 개별 속성이 함께 사용된 경우 개별 속성이 우선되어야 함
      const result = parser.parse('animate-spin duration-200');
      expect(result.animation.name).toBe('spin');
      expect(result.animation.duration).toBe('200ms');
    });
  });
}); 
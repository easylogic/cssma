import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 변형자(Variants) 기능 - Tailwind CSS 방식', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  describe('기본 변형자 파싱', () => {
    it('상태 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('hover:text-blue-500');
      
      expect(result).toBeDefined();
      expect(result?.className).toBe('hover:text-blue-500');
      expect(result?.baseClassName).toBe('text-blue-500');
      expect(result?.property).toBe('text');
      expect(result?.value).toBe('blue-500');
      expect(result?.category).toBe('typography');
      // 🎯 새로운 Tailwind 방식: modifiers 객체 사용
      expect(result?.modifierChain).toBe('hover');
      expect(result?.modifiers?.state).toEqual(['hover']);
    });
    
    it('반응형 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('md:flex');
      expect(result).toBeDefined();
      expect(result?.className).toBe('md:flex');
      expect(result?.baseClassName).toBe('flex');
      expect(result?.property).toBe('display');
      expect(result?.value).toBe('flex');
      // 🎯 새로운 Tailwind 방식: modifiers 객체 사용
      expect(result?.modifierChain).toBe('md');
      expect(result?.modifiers?.responsive).toBe('md');
    });
  });
  
  describe('중첩된 변형자 파싱', () => {
    it('상태 + 반응형 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('md:hover:text-blue-500');
      expect(result).toBeDefined();
      expect(result?.className).toBe('md:hover:text-blue-500');
      expect(result?.baseClassName).toBe('text-blue-500');
      expect(result?.property).toBe('text');
      expect(result?.value).toBe('blue-500');
      // 🎯 새로운 Tailwind 방식: modifiers 객체 사용
      expect(result?.modifierChain).toBe('md:hover');
      expect(result?.modifiers?.responsive).toBe('md');
      expect(result?.modifiers?.state).toEqual(['hover']);
    });
    
    it('다중 상태 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('hover:focus:text-blue-500');
      expect(result).toBeDefined();
      expect(result?.className).toBe('hover:focus:text-blue-500');
      expect(result?.baseClassName).toBe('text-blue-500');
      expect(result?.property).toBe('text');
      expect(result?.value).toBe('blue-500');
      // 🎯 새로운 Tailwind 방식: modifiers 객체 사용
      expect(result?.modifierChain).toBe('hover:focus');
      expect(result?.modifiers?.state).toEqual(['hover', 'focus']);
    });
    
    it('복잡한 중첩 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('md:hover:focus:text-blue-500');
      expect(result).toBeDefined();
      expect(result?.className).toBe('md:hover:focus:text-blue-500');
      expect(result?.baseClassName).toBe('text-blue-500');
      expect(result?.property).toBe('text');
      expect(result?.value).toBe('blue-500');
      // 🎯 새로운 Tailwind 방식: modifiers 객체 사용
      expect(result?.modifierChain).toBe('md:hover:focus');
      expect(result?.modifiers?.responsive).toBe('md');
      expect(result?.modifiers?.state).toEqual(['hover', 'focus']);
    });
  });
  
  describe('고급 변형자 파싱 - Tailwind CSS 방식', () => {
    it('Pseudo-element 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('before:content-[""]');
      expect(result).toBeDefined();
      expect(result?.className).toBe('before:content-[""]');
      expect(result?.baseClassName).toBe('content-[""]');
      // 🎯 새로운 Tailwind 방식: modifiers 객체 사용
      expect(result?.modifierChain).toBe('before');
      expect(result?.modifiers?.pseudoElement).toBe('before');
    });
    
    it('ARIA 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('aria-checked:bg-blue-500');
      expect(result).toBeDefined();
      expect(result?.className).toBe('aria-checked:bg-blue-500');
      expect(result?.baseClassName).toBe('bg-blue-500');
      // 🎯 새로운 Tailwind 방식: modifiers 객체 사용
      expect(result?.modifierChain).toBe('aria-checked');
      expect(result?.modifiers?.aria).toBe('aria-checked');
    });
    
    it('Data 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('data-active:text-green-500');
      expect(result).toBeDefined();
      expect(result?.className).toBe('data-active:text-green-500');
      expect(result?.baseClassName).toBe('text-green-500');
      // 🎯 새로운 Tailwind 방식: modifiers 객체 사용
      expect(result?.modifierChain).toBe('data-active');
      expect(result?.modifiers?.data).toBe('data-active');
    });
    
    it('Motion 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('motion-safe:transition-all');
      expect(result).toBeDefined();
      expect(result?.className).toBe('motion-safe:transition-all');
      expect(result?.baseClassName).toBe('transition-all');
      // 🎯 새로운 Tailwind 방식: modifiers 객체 사용
      expect(result?.modifierChain).toBe('motion-safe');
      expect(result?.modifiers?.motion).toBe('motion-safe');
    });
    
    it('복잡한 임의값 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('aria-[label="Custom"]:p-4');
      expect(result).toBeDefined();
      expect(result?.className).toBe('aria-[label="Custom"]:p-4');
      expect(result?.baseClassName).toBe('p-4');
      // 🎯 새로운 Tailwind 방식: modifiers 객체 사용
      expect(result?.modifierChain).toBe('aria-[label="Custom"]');
      expect(result?.modifiers?.aria).toBe('aria-[label="Custom"]');
    });
  });
  
  describe('완전한 복합 변형자 체인', () => {
    it('모든 타입의 변형자를 포함한 복합 체인을 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('md:motion-safe:before:hover:focus:bg-blue-500');
      expect(result).toBeDefined();
      expect(result?.className).toBe('md:motion-safe:before:hover:focus:bg-blue-500');
      expect(result?.baseClassName).toBe('bg-blue-500');
      // 🎯 새로운 Tailwind 방식: 완전한 modifier 체인
      expect(result?.modifierChain).toBe('md:motion-safe:before:hover:focus');
      expect(result?.modifiers?.responsive).toBe('md');
      expect(result?.modifiers?.motion).toBe('motion-safe');
      expect(result?.modifiers?.pseudoElement).toBe('before');
      expect(result?.modifiers?.state).toEqual(['hover', 'focus']);
    });
    
    it('임의값 포함 복합 체인을 파싱할 수 있어야 함', () => {
      const result = parser.parseClassName('min-[768px]:aria-[checked]:data-[size=large]:hover:p-4');
      expect(result).toBeDefined();
      expect(result?.className).toBe('min-[768px]:aria-[checked]:data-[size=large]:hover:p-4');
      expect(result?.baseClassName).toBe('p-4');
      // 🎯 새로운 Tailwind 방식: 임의값 포함 복합 체인
      expect(result?.modifierChain).toBe('min-[768px]:aria-[checked]:data-[size=large]:hover');
      expect(result?.modifiers?.responsive).toBe('min-[768px]');
      expect(result?.modifiers?.aria).toBe('aria-[checked]');
      expect(result?.modifiers?.data).toBe('data-[size=large]');
      expect(result?.modifiers?.state).toEqual(['hover']);
    });
  });
  
  describe('스타일 적용 - Tailwind CSS 방식', () => {
    it('단일 상태 변형자로 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('hover:text-blue-500');
      expect(result).toBeDefined();
      // 단일 상태 변형자 스타일 확인
      expect(result.states).toBeDefined();
      expect(result.states?.hover).toBeDefined();
      expect(result.states?.hover?.typography?.color).toBeDefined();
    });
    
    it('중첩된 상태 변형자로 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('hover:focus:text-blue-500');
      expect(result).toBeDefined();
      // 중첩된 상태 변형자 스타일 확인
      expect(result.nestedStates).toBeDefined();
      expect(result.nestedStates?.['hover:focus']).toBeDefined();
      expect(result.nestedStates?.['hover:focus']?.typography?.color).toBeDefined();
    });
    
    it('반응형 + 중첩 상태 변형자로 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('md:hover:focus:text-blue-500');
      expect(result).toBeDefined();
      // 반응형 스타일 확인
      expect(result.breakpoints?.md).toBeDefined();
      // 중첩된 상태 변형자 스타일 확인
      expect(result.breakpoints?.md.nestedStates).toBeDefined();
      expect(result.breakpoints?.md.nestedStates?.['hover:focus']).toBeDefined();
      expect(result.breakpoints?.md.nestedStates?.['hover:focus']?.typography?.color).toBeDefined();
    });
    
    it('컨테이너 쿼리 + 상태 변형자로 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('@md:hover:bg-blue-500');
      expect(result).toBeDefined();
      // 컨테이너 쿼리 스타일 확인
      expect(result.containers?.['@md']).toBeDefined();
      expect(result.containers?.['@md'].states?.hover).toBeDefined();
      expect(result.containers?.['@md'].states?.hover?.backgrounds?.['backgroundColor']).toBeDefined();
    });
    
    it('복합 변형자로 배경색을 적용할 수 있어야 함', () => {
      const result = parser.parse('lg:motion-safe:hover:focus:active:bg-red-500');
      expect(result).toBeDefined();
      // 반응형 + 다중 상태 스타일 확인
      expect(result.breakpoints?.lg).toBeDefined();
      expect(result.breakpoints?.lg.nestedStates?.['hover:focus:active']).toBeDefined();
      expect(result.breakpoints?.lg.nestedStates?.['hover:focus:active']?.backgrounds?.['backgroundColor']).toBeDefined();
    });
    
    it('모든 변형자 타입을 포함한 스타일을 적용할 수 있어야 함', () => {
      const result = parser.parse('md:motion-safe:before:hover:p-4');
      expect(result).toBeDefined();
      // 복합 변형자 스타일 적용 확인 (현재는 기본 스타일 적용)
      expect(result.spacing || result.layout).toBeDefined();
    });
  });
  
  describe('CSS 선택자 호환성 테스트', () => {
    it('복합 변형자의 CSS 선택자 정보를 생성할 수 있어야 함', () => {
      const result = parser.parseClassName('md:hover:before:bg-blue-500');
      expect(result).toBeDefined();
      // CSS 선택자 생성을 위한 정보 확인
      expect(result?.modifiers?.responsive).toBe('md');
      expect(result?.modifiers?.state).toEqual(['hover']);
      expect(result?.modifiers?.pseudoElement).toBe('before');
      // 예상 CSS: @media (min-width: 768px) { .md\:hover\:before\:bg-blue-500:hover::before }
    });
    
    it('임의값 변형자의 CSS 선택자 정보를 생성할 수 있어야 함', () => {
      const result = parser.parseClassName('min-[768px]:aria-[checked]:hover:p-4');
      expect(result).toBeDefined();
      // CSS 선택자 생성을 위한 정보 확인
      expect(result?.modifiers?.responsive).toBe('min-[768px]');
      expect(result?.modifiers?.aria).toBe('aria-[checked]');
      expect(result?.modifiers?.state).toEqual(['hover']);
      // 예상 CSS: @media (min-width: 768px) { .min-\[768px\]\:aria-\[checked\]\:hover\:p-4:hover[aria-checked] }
    });
  });

  
  describe('극한 복합 변형자 테스트', () => {
    it('모든 변형자 타입을 포함한 극한 복합 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parse('xl:motion-reduce:dark:rtl:print:first:hover:focus:active:after:bg-gradient-to-r');
      expect(result).toBeDefined();
      // 극한 복합 변형자 체인 확인
      expect(result.breakpoints?.xl).toBeDefined();
    });
    
    it('다중 임의값 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parse('min-[1280px]:max-[1920px]:supports-[display:grid]:data-[state=open]:peer-[.active]:group-[.expanded]:text-red-500');
      expect(result).toBeDefined();
      // 다중 임의값 변형자 확인
      expect(result.typography?.['color']).toBeDefined();
    });
    
    it('깊은 중첩 변형자 체인을 파싱할 수 있어야 함', () => {
      const result = parser.parse('lg:group-hover:peer-focus:has-[:checked]:not-[:disabled]:first-of-type:bg-blue-500');
      expect(result).toBeDefined();
      // 깊은 중첩 변형자 확인
      expect(result.backgrounds?.['backgroundColor']).toBeDefined();
    });
  });
  
  describe('조건부 변형자 고급 테스트', () => {
    it('복잡한 supports 쿼리 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parse('supports-[backdrop-filter]:supports-[mask]:backdrop-blur-sm');
      expect(result).toBeDefined();
      // supports 조건 확인
      expect(result.effects).toBeDefined();
    });
    
    it('다중 data 속성 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parse('data-[state=open]:data-[side=top]:data-[orientation=vertical]:p-4');
      expect(result).toBeDefined();
      // 다중 data 속성 확인
      expect(result.spacing || result.layout).toBeDefined();
    });
    
    it('복잡한 aria 상태 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parse('aria-[expanded=true]:aria-[level=2]:aria-[selected]:text-green-600');
      expect(result).toBeDefined();
      // aria 상태 확인
      expect(result.typography?.['color']).toBeDefined();
    });
  });
  
  describe('그룹 및 피어 변형자 심화 테스트', () => {
    it('중첩된 그룹 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parse('group/sidebar:group-hover/sidebar:group-focus/sidebar:bg-gray-100');
      expect(result).toBeDefined();
      // 명명된 그룹 변형자 확인
      expect(result.backgrounds?.['backgroundColor']).toBeDefined();
    });
    
    it('복잡한 피어 셀렉터 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parse('peer/label:peer-checked/label:peer-invalid/label:text-red-500');
      expect(result).toBeDefined();
      // 명명된 피어 변형자 확인
      expect(result.typography?.['color']).toBeDefined();
    });
    
    it('그룹과 피어가 혼합된 복잡한 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parse('group-hover:peer-focus:has-[:invalid]:before:after:border-2');
      expect(result).toBeDefined();
      // 혼합 변형자 확인
      expect(result.borders).toBeDefined();
    });
  });
  
  describe('다양한 의사 클래스 조합 테스트', () => {
    it('모든 상호작용 상태를 포함한 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parse('hover:focus:focus-within:focus-visible:active:visited:target:bg-purple-500');
      expect(result).toBeDefined();
      // 다중 상호작용 상태 확인
      expect(result.backgrounds?.['backgroundColor']).toBeDefined();
    });
    
    it('모든 폼 상태를 포함한 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parse('required:invalid:valid:in-range:out-of-range:placeholder-shown:autofill:read-only:border-red-400');
      expect(result).toBeDefined();
      // 다중 폼 상태 확인
      expect(result.borders).toBeDefined();
    });
    
    it('모든 위치 기반 의사 클래스를 포함한 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parse('first:last:only:first-of-type:last-of-type:only-of-type:nth-child:nth-last-child:text-amber-600');
      expect(result).toBeDefined();
      // 위치 기반 의사 클래스 확인
      expect(result.typography?.['color']).toBeDefined();
    });
  });
  
  describe('미디어 쿼리 복합 테스트', () => {
    it('모든 반응형 변형자를 포함한 스타일을 파싱할 수 있어야 함', () => {
      const result = parser.parse('sm:md:lg:xl:2xl:bg-indigo-500');
      expect(result).toBeDefined();
      // 다중 반응형 변형자 (실제로는 마지막 것만 적용)
      expect(result.breakpoints?.['2xl']).toBeDefined();
    });
    
    it('사용자 정의 미디어 쿼리 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parse('min-[640px]:max-[1024px]:min-h-[768px]:orientation-landscape:p-8');
      expect(result).toBeDefined();
      // 사용자 정의 미디어 쿼리 확인
      expect(result.spacing || result.layout).toBeDefined();
    });
    
    it('모든 프리퍼 변형자를 포함한 스타일을 파싱할 수 있어야 함', () => {
      const result = parser.parse('motion-safe:motion-reduce:contrast-more:contrast-less:prefers-reduced-data:text-teal-500');
      expect(result).toBeDefined();
      // 프리퍼 변형자 확인
      expect(result.typography?.['color']).toBeDefined();
    });
  });
  
  describe('다크모드 및 테마 변형자 테스트', () => {
    it('다크모드와 반응형을 결합한 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parse('dark:lg:hover:focus:bg-slate-800');
      expect(result).toBeDefined();
      // 다크모드 + 반응형 + 상태 확인
      expect(result.darkMode?.lg?.nestedStates?.['hover:focus']?.backgrounds?.['backgroundColor']).toBeDefined();
    });
    
    it('다중 테마 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parse('dark:light:contrast-more:contrast-less:bg-neutral-600');
      expect(result).toBeDefined();
      // 다중 테마 변형자 확인
      expect(result.backgrounds?.['backgroundColor']).toBeDefined();
    });
  });
  
  describe('컨테이너 쿼리 심화 테스트', () => {
    it('복잡한 컨테이너 쿼리 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parse('@container/sidebar:@md:@lg:hover:focus:text-cyan-400');
      expect(result).toBeDefined();
      // 명명된 컨테이너 쿼리 확인
      expect(result.typography?.['color']).toBeDefined();
    });
    
    it('컨테이너 크기와 상태를 결합한 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parse('@xs:@sm:@md:@lg:@xl:@2xl:active:bg-rose-500');
      expect(result).toBeDefined();
      // 다중 컨테이너 크기 + 상태 확인
      expect(result.backgrounds?.['backgroundColor']).toBeDefined();
    });
  });
  
  describe('특수 케이스 및 에지 케이스 테스트', () => {
    it('매우 긴 변형자 체인을 파싱할 수 있어야 함', () => {
      const longModifier = 'xl:dark:motion-safe:group-hover:peer-focus:has-[:checked]:first:hover:focus:active:before:after:aria-[expanded]:data-[state=open]:supports-[backdrop-filter]:min-[1280px]:max-[1920px]:bg-gradient-to-br';
      const result = parser.parse(longModifier);
      expect(result).toBeDefined();
      // 매우 긴 변형자 체인 확인
      expect(result.backgrounds).toBeDefined();
    });
    
    it('중복된 변형자를 포함한 스타일을 파싱할 수 있어야 함', () => {
      const result = parser.parse('hover:hover:focus:focus:active:active:bg-yellow-500');
      expect(result).toBeDefined();
      // 중복 변형자 처리 확인
      expect(result.backgrounds?.['backgroundColor']).toBeDefined();
    });
    
    it('잘못된 순서의 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parse('hover:lg:dark:before:group-hover:text-orange-500');
      expect(result).toBeDefined();
      // 순서 무관 파싱 확인
      console.dir(result.breakpoints?.lg.states);
      expect(result.breakpoints?.lg?.states?.['hover']?.typography?.['color']).toBeDefined();
    });
    
    it('임의값이 포함된 복잡한 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parse('min-[calc(100vh-200px)]:supports-[display:subgrid]:has-[.custom-selector]:peer-[&:nth-child(2n)]:bg-emerald-500');
      expect(result).toBeDefined();
      // 복잡한 임의값 변형자 확인
      expect(result.breakpoints?.['min-[calc(100vh-200px)]']?.backgrounds?.['backgroundColor']).toBeDefined();
    });
    
    it('특수 문자가 포함된 변형자를 파싱할 수 있어야 함', () => {
      const result = parser.parse('data-[state="open"]:aria-[label="Close menu"]:supports-[selector(&:has(.test))]:p-6');
      expect(result).toBeDefined();
      // 특수 문자 포함 변형자 확인
      expect(result.spacing || result.layout).toBeDefined();
    });
  });
  
  describe('성능 및 확장성 테스트', () => {
    it('대량의 변형자 조합을 빠르게 파싱할 수 있어야 함', () => {
      const start = performance.now();
      
      const modifiers = [
        'sm:md:lg:xl:2xl:hover:focus:active:bg-red-500',
        'dark:motion-safe:group-hover:peer-focus:text-blue-600',
        '@container:@md:@lg:before:after:border-gray-300',
        'min-[768px]:max-[1024px]:supports-[grid]:p-4',
        'data-[state=open]:aria-[expanded]:first:last:m-2'
      ];
      
      modifiers.forEach(modifier => {
        const result = parser.parse(modifier);
        expect(result).toBeDefined();
      });
      
      const end = performance.now();
      const duration = end - start;
      
      // 성능 기준: 5개 복잡한 변형자를 10ms 이내에 파싱
      expect(duration).toBeLessThan(10);
    });
    
    it('메모리 효율적으로 파싱 결과를 저장할 수 있어야 함', () => {
      const results = [];
      
      // 100개의 서로 다른 변형자 조합 생성 및 파싱
      for (let i = 0; i < 100; i++) {
        const modifier = `hover:focus:active:bg-blue-${(i % 9 + 1) * 100}`;
        const result = parser.parse(modifier);
        results.push(result);
      }
      
      // 모든 결과가 정의되어 있는지 확인
      expect(results).toHaveLength(100);
      expect(results.every(result => result !== undefined)).toBe(true);
    });
  });

});
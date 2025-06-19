/**
 * CSSMA v2 Parser Test
 * 파서 기능 테스트를 위한 파일
 */

import { UnifiedParser } from '../src/parser';
import type { CSSMAPreset, ParserConfig } from '../src/types';

// 테스트용 간단한 프리셋 생성
const testPreset: CSSMAPreset = {
  name: 'test-preset',
  version: '1.0.0',
  spacing: {
    '0': 0,
    '1': 4,
    '2': 8,
    '4': 16,
    '8': 32,
    '16': 64,
  },
  colors: {
    blue: {
      '500': { r: 0, g: 0, b: 1 },
      '700': { r: 0, g: 0, b: 0.7 }
    },
    red: {
      '500': { r: 1, g: 0, b: 0 }
    },
    green: { r: 0, g: 1, b: 0 }
  },
  typography: {
    fontSize: {
      'sm': 14,
      'base': 16,
      'lg': 18,
      'xl': 20
    },
    fontWeight: {
      'normal': 400,
      'medium': 500,
      'bold': 700
    },
    lineHeight: {
      'tight': 1.25,
      'normal': 1.5,
      'loose': 2
    },
    letterSpacing: {
      'tight': -0.025,
      'normal': 0,
      'wide': 0.025
    },
    fontFamily: {
      'sans': 'Inter, sans-serif',
      'serif': 'Georgia, serif',
      'mono': 'Menlo, monospace'
    }
  },
  effects: {
    borderRadius: {
      'sm': 2,
      'md': 6,
      'lg': 8,
      'full': 9999
    },
    boxShadow: {
      'sm': {
        offsetX: 0,
        offsetY: 2,
        blurRadius: 4,
        spreadRadius: 0,
        color: { r: 0, g: 0, b: 0, a: 0.1 }
      },
      'md': {
        offsetX: 0,
        offsetY: 4,
        blurRadius: 6,
        spreadRadius: 0,
        color: { r: 0, g: 0, b: 0, a: 0.15 }
      }
    },
    opacity: {
      '50': 0.5,
      '75': 0.75,
      '100': 1
    },
    blur: {
      'sm': 4,
      'md': 8,
      'lg': 16
    }
  },
  layout: {
    width: {
      'full': '100%',
      'screen': '100vw',
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '3/4': '75%'
    },
    height: {
      'full': '100%',
      'screen': '100vh',
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%'
    },
    maxWidth: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px'
    },
    maxHeight: {},
    minWidth: {},
    minHeight: {}
  },
  animation: {
    presets: {
      'spin': {
        name: 'spin',
        duration: 1000,
        timingFunction: 'linear',
        iterationCount: 'infinite',
        keyframes: [
          { offset: 0, properties: { transform: 'rotate(0deg)' } },
          { offset: 1, properties: { transform: 'rotate(360deg)' } }
        ]
      },
      'pulse': {
        name: 'pulse',
        duration: 2000,
        timingFunction: 'ease-in-out',
        iterationCount: 'infinite',
        keyframes: [
          { offset: 0, properties: { opacity: '1', transform: 'scale(1)' } },
          { offset: 0.5, properties: { opacity: '0.5', transform: 'scale(1.05)' } },
          { offset: 1, properties: { opacity: '1', transform: 'scale(1)' } }
        ]
      }
    },
    durations: {
      'fast': 150,
      'normal': 300,
      'slow': 500
    },
    easings: {
      'linear': 'linear',
      'in': 'cubic-bezier(0.4, 0, 1, 1)',
      'out': 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)'
    }
  }
};

// 파서 설정
const parserConfig: ParserConfig = {
  enableArbitraryValues: true,
  enableStateModifiers: true,
  enableResponsiveModifiers: true,
  // 커스텀 모디파이어 추가
  stateModifiers: [
    'hover', 'focus', 'active', 'disabled', 'visited', 
    'focus-within', 'focus-visible', 'group-hover', 
    'peer-hover', 'dark', 'print', 'rtl', 'ltr' // 커스텀 모디파이어 추가
  ],
  breakpointModifiers: [
    'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'mobile', 'tablet', 'desktop' // 커스텀 모디파이어 추가
  ]
};

// 파서 인스턴스 생성
const parser = new UnifiedParser(parserConfig, testPreset);

// 테스트 함수
function testParser() {
  console.log('🧪 CSSMA v2 Parser Test');
  console.log('====================\n');

  // 기본 테스트 생략...

  // 커스텀 상태 모디파이어 테스트
  console.log('🔍 커스텀 상태 모디파이어 테스트');
  console.log('====================\n');
  testClass('print:hidden');
  testClass('rtl:text-right');
  testClass('ltr:text-left');

  // 커스텀 반응형 모디파이어 테스트
  console.log('🔍 커스텀 반응형 모디파이어 테스트');
  console.log('====================\n');
  testClass('3xl:text-lg');
  testClass('mobile:w-full');
  testClass('tablet:p-8');
  testClass('desktop:m-16');

  // 커스텀 중첩 모디파이어 테스트
  console.log('🔍 커스텀 중첩 모디파이어 테스트');
  console.log('====================\n');
  testClass('print:tablet:hidden');
  testClass('rtl:desktop:text-right');
  testClass('mobile:hover:bg-blue-700');

  // 커스텀 모디파이어가 포함된 복합 테스트
  console.log('🔍 커스텀 모디파이어 복합 테스트');
  console.log('====================\n');
  testComplexClasses('p-4 rtl:text-right print:hidden mobile:w-full tablet:p-8');
}

// 단일 클래스 테스트 함수
function testClass(className: string) {
  console.log(`Testing class: "${className}"`);
  const match = parser.debugMatchClassName(className);
  console.log('Match result:', match);
  
  const parsed = parser.parseClassName(className);
  console.log('Parsed result:', JSON.stringify(parsed, null, 2));
  console.log('-------------------\n');
}

// 복합 클래스 테스트 함수
function testComplexClasses(classNames: string) {
  console.log(`\n📋 Testing complex classes: "${classNames}"`);
  const parsed = parser.parse(classNames);
  console.log('Parsed result:', JSON.stringify(parsed, null, 2));
  console.log('====================\n');
}

// 테스트 실행
testParser(); 
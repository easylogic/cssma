import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - 디버그 테스트', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());
  
  it('md:flex 클래스를 파싱할 수 있어야 함', () => {
    const parsedClass = parser.parseClassName('md:flex');
    console.log('파싱된 클래스:', JSON.stringify(parsedClass, null, 2));
    
    const result = parser.parse('md:flex');
    console.log('파싱 결과:', JSON.stringify(result, null, 2));
  });
  
  it('md:max-lg:flex 클래스를 파싱할 수 있어야 함', () => {
    const parsedClass = parser.parseClassName('md:max-lg:flex');
    console.log('중첩 브레이크포인트 파싱된 클래스:', JSON.stringify(parsedClass, null, 2));
    
    const result = parser.parse('md:max-lg:flex');
    console.log('중첩 브레이크포인트 파싱 결과:', JSON.stringify(result, null, 2));
  });
  
  it('md:hover:flex 클래스를 파싱할 수 있어야 함', () => {
    const parsedClass = parser.parseClassName('md:hover:flex');
    console.log('브레이크포인트 + 상태 파싱된 클래스:', JSON.stringify(parsedClass, null, 2));
    
    const result = parser.parse('md:hover:flex');
    console.log('브레이크포인트 + 상태 파싱 결과:', JSON.stringify(result, null, 2));
  });
  
  it('@md:hover:flex 클래스를 파싱할 수 있어야 함', () => {
    const parsedClass = parser.parseClassName('@md:hover:flex');
    console.log('컨테이너 + 상태 파싱된 클래스:', JSON.stringify(parsedClass, null, 2));
    
    const result = parser.parse('@md:hover:flex');
    console.log('컨테이너 + 상태 파싱 결과:', JSON.stringify(result, null, 2));
  });
}); 
import { describe, it, expect } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { loadConfig, loadPreset } from '../src/config';

describe('CSSParser - Isolation', () => {
  const parser = new CSSParser(loadConfig(), loadPreset());

  it('isolate 클래스 파싱', () => {
    const result = parser.parseClassName('isolate');
    expect(result).toBeTruthy();
    expect(result?.category).toBe('layout');
    expect(result?.property).toBe('isolate');
    expect(result?.value).toBe('');

    const styles = parser.parse('isolate');
    expect(styles.layout).toBeDefined();
    expect(styles.layout.isolation).toBe('isolate');
  });

  it('isolation-auto 클래스 파싱', () => {
    const result = parser.parseClassName('isolation-auto');
    expect(result).toBeTruthy();
    expect(result?.category).toBe('layout');
    expect(result?.property).toBe('isolation');
    expect(result?.value).toBe('auto');

    const styles = parser.parse('isolation-auto');
    expect(styles.layout).toBeDefined();
    expect(styles.layout.isolation).toBe('auto');
  });

  it('반응형 isolation', () => {
    const styles = parser.parse('md:isolate');
    expect(styles.breakpoints).toBeDefined();
    expect(styles.breakpoints!['md']).toBeDefined();
    expect(styles.breakpoints!['md'].layout).toBeDefined();
    expect(styles.breakpoints!['md'].layout!.isolation).toBe('isolate');
  });

  it('상태 수정자', () => {
    const styles = parser.parse('hover:isolate');
    expect(styles.states).toBeDefined();
    expect(styles.states!['hover']).toBeDefined();
    expect(styles.states!['hover'].layout).toBeDefined();
    expect(styles.states!['hover'].layout!.isolation).toBe('isolate');
  });
});

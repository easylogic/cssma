import { parseSizeStyleValue } from '../../src/parser/size';

describe('Size Style Parser', () => {
  // ... existing tests ...

  describe('Size Constraints', () => {
    describe('Min Width', () => {
      it('should parse arbitrary min width', () => {
        expect(parseSizeStyleValue('min-w-[100]')).toEqual({
          property: 'minWidth',
          value: 100,
          variant: 'arbitrary'
        });
      });

      it('should parse min-w-0', () => {
        expect(parseSizeStyleValue('min-w-0')).toEqual({
          property: 'minWidth',
          value: 0,
          variant: 'preset'
        });
      });

      it('should parse min-w-full', () => {
        expect(parseSizeStyleValue('min-w-full')).toEqual({
          property: 'minWidth',
          value: '100%',
          variant: 'preset'
        });
      });
    });

    describe('Max Width', () => {
      it('should parse arbitrary max width', () => {
        expect(parseSizeStyleValue('max-w-[200]')).toEqual({
          property: 'maxWidth',
          value: 200,
          variant: 'arbitrary'
        });
      });

      it('should parse max-w-none', () => {
        expect(parseSizeStyleValue('max-w-none')).toEqual({
          property: 'maxWidth',
          value: Infinity,
          variant: 'preset'
        });
      });

      it('should parse max-w-full', () => {
        expect(parseSizeStyleValue('max-w-full')).toEqual({
          property: 'maxWidth',
          value: '100%',
          variant: 'preset'
        });
      });
    });

    describe('Min Height', () => {
      it('should parse arbitrary min height', () => {
        expect(parseSizeStyleValue('min-h-[50]')).toEqual({
          property: 'minHeight',
          value: 50,
          variant: 'arbitrary'
        });
      });

      it('should parse min-h-0', () => {
        expect(parseSizeStyleValue('min-h-0')).toEqual({
          property: 'minHeight',
          value: 0,
          variant: 'preset'
        });
      });

      it('should parse min-h-full', () => {
        expect(parseSizeStyleValue('min-h-full')).toEqual({
          property: 'minHeight',
          value: '100%',
          variant: 'preset'
        });
      });
    });

    describe('Max Height', () => {
      it('should parse arbitrary max height', () => {
        expect(parseSizeStyleValue('max-h-[150]')).toEqual({
          property: 'maxHeight',
          value: 150,
          variant: 'arbitrary'
        });
      });

      it('should parse max-h-none', () => {
        expect(parseSizeStyleValue('max-h-none')).toEqual({
          property: 'maxHeight',
          value: Infinity,
          variant: 'preset'
        });
      });

      it('should parse max-h-full', () => {
        expect(parseSizeStyleValue('max-h-full')).toEqual({
          property: 'maxHeight',
          value: '100%',
          variant: 'preset'
        });
      });
    });
  });
}); 
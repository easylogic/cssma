import { parseStrokeStyleValue } from '../../src/parser/stroke';

describe('Stroke Style Parser', () => {
  describe('Individual Stroke Weights', () => {
    describe('Top Stroke', () => {
      it('should parse arbitrary top stroke width', () => {
        expect(parseStrokeStyleValue('stroke-t-[2]')).toEqual({
          property: 'strokeTopWeight',
          value: 2,
          variant: 'arbitrary'
        });
      });

      it('should parse preset top stroke width', () => {
        expect(parseStrokeStyleValue('stroke-t-2')).toEqual({
          property: 'strokeTopWeight',
          value: 2,
          variant: 'preset'
        });
      });

      it('should parse Figma variable for top stroke', () => {
        expect(parseStrokeStyleValue('stroke-t-$[strokes/top]')).toEqual({
          property: 'strokeTopWeight',
          value: 'strokes/top',
          variant: 'figma-variable',
          variableId: 'strokes/top'
        });
      });

      it('should return null for invalid variable path', () => {
        expect(parseStrokeStyleValue('stroke-t-$[]')).toBeNull();
      });
    });

    describe('Right Stroke', () => {
      it('should parse arbitrary right stroke width', () => {
        expect(parseStrokeStyleValue('stroke-r-[2]')).toEqual({
          property: 'strokeRightWeight',
          value: 2,
          variant: 'arbitrary'
        });
      });

      it('should parse Figma variable for right stroke', () => {
        expect(parseStrokeStyleValue('stroke-r-$[strokes/right]')).toEqual({
          property: 'strokeRightWeight',
          value: 'strokes/right',
          variant: 'figma-variable',
          variableId: 'strokes/right'
        });
      });
    });

    describe('Bottom Stroke', () => {
      it('should parse arbitrary bottom stroke width', () => {
        expect(parseStrokeStyleValue('stroke-b-[2]')).toEqual({
          property: 'strokeBottomWeight',
          value: 2,
          variant: 'arbitrary'
        });
      });

      it('should parse Figma variable for bottom stroke', () => {
        expect(parseStrokeStyleValue('stroke-b-$[strokes/bottom]')).toEqual({
          property: 'strokeBottomWeight',
          value: 'strokes/bottom',
          variant: 'figma-variable',
          variableId: 'strokes/bottom'
        });
      });
    });

    describe('Left Stroke', () => {
      it('should parse arbitrary left stroke width', () => {
        expect(parseStrokeStyleValue('stroke-l-[2]')).toEqual({
          property: 'strokeLeftWeight',
          value: 2,
          variant: 'arbitrary'
        });
      });

      it('should parse Figma variable for left stroke', () => {
        expect(parseStrokeStyleValue('stroke-l-$[strokes/left]')).toEqual({
          property: 'strokeLeftWeight',
          value: 'strokes/left',
          variant: 'figma-variable',
          variableId: 'strokes/left'
        });
      });
    });

    describe('Zero Values', () => {
      it('should parse zero stroke width', () => {
        expect(parseStrokeStyleValue('stroke-t-0')).toEqual({
          property: 'strokeTopWeight',
          value: 0,
          variant: 'preset'
        });
      });
    });
  });
}); 
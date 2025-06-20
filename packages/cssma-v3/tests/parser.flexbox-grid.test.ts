import { describe, expect, test } from 'vitest';
import { CSSParser } from '../src/core/parser';
import { FlexboxGridParser } from '../src/core/parsers/flexbox-grid-parser';
import { Config } from '../src/types';

const config: Config = {
  prefix: '',
  separator: ':',
  important: false
};

const preset = {
  name: 'default',
  spacing: {
    '0': 0,
    '1': 4,
    '2': 8,
    '3': 12,
    '4': 16,
    '5': 20,
    '6': 24,
    '8': 32,
    '10': 40,
    '12': 48,
    '16': 64,
    '20': 80,
    '24': 96,
    '32': 128,
    '40': 160,
    '48': 192,
    '56': 224,
    '64': 256,
    '72': 288,
    '80': 320,
    '96': 384
  },
  screens: {
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px'
  }
};

const parser = new CSSParser(config, preset);

describe('Flexbox & Grid Parser', () => {
  describe('Display Utilities', () => {
    test('should parse display utilities', () => {
      expect(parser.parseClass('block')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('inline-block')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('inline')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('flex')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('inline-flex')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('grid')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('inline-grid')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('hidden')?.category).toBe('flexbox-grid');
    });

    test('should parse display values correctly', () => {
      const blockResult = parser.parse('block');
      expect(blockResult.flexboxGrid?.display).toBe('block');

      const flexResult = parser.parse('flex');
      expect(flexResult.flexboxGrid?.display).toBe('flex');

      const gridResult = parser.parse('grid');
      expect(gridResult.flexboxGrid?.display).toBe('grid');

      const hiddenResult = parser.parse('hidden');
      expect(hiddenResult.flexboxGrid?.display).toBe('none');
    });
  });

  describe('Flex Direction', () => {
    test('should parse flex direction utilities', () => {
      expect(parser.parseClass('flex-row')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('flex-row-reverse')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('flex-col')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('flex-col-reverse')?.category).toBe('flexbox-grid');
    });

    test('should parse flex direction values correctly', () => {
      const rowResult = parser.parse('flex-row');
      expect(rowResult.flexboxGrid?.flexDirection).toBe('row');

      const colResult = parser.parse('flex-col');
      expect(colResult.flexboxGrid?.flexDirection).toBe('column');

      const rowReverseResult = parser.parse('flex-row-reverse');
      expect(rowReverseResult.flexboxGrid?.flexDirection).toBe('row-reverse');

      const colReverseResult = parser.parse('flex-col-reverse');
      expect(colReverseResult.flexboxGrid?.flexDirection).toBe('column-reverse');
    });
  });

  describe('Flex Wrap', () => {
    test('should parse flex wrap utilities', () => {
      expect(parser.parseClass('flex-wrap')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('flex-wrap-reverse')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('flex-nowrap')?.category).toBe('flexbox-grid');
    });

    test('should parse flex wrap values correctly', () => {
      const wrapResult = parser.parse('flex-wrap');
      expect(wrapResult.flexboxGrid?.flexWrap).toBe('wrap');

      const nowrapResult = parser.parse('flex-nowrap');
      expect(nowrapResult.flexboxGrid?.flexWrap).toBe('nowrap');

      const wrapReverseResult = parser.parse('flex-wrap-reverse');
      expect(wrapResult.flexboxGrid?.flexWrap).toBe('wrap');
    });
  });

  describe('Flex Shorthand', () => {
    test('should parse flex shorthand utilities', () => {
      expect(parser.parseClass('flex-1')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('flex-auto')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('flex-initial')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('flex-none')?.category).toBe('flexbox-grid');
    });

    test('should parse flex shorthand values correctly', () => {
      const flex1Result = parser.parse('flex-1');
      expect(flex1Result.flexboxGrid?.flex).toBe('1 1 0%');

      const flexAutoResult = parser.parse('flex-auto');
      expect(flexAutoResult.flexboxGrid?.flex).toBe('1 1 auto');

      const flexInitialResult = parser.parse('flex-initial');
      expect(flexInitialResult.flexboxGrid?.flex).toBe('0 1 auto');

      const flexNoneResult = parser.parse('flex-none');
      expect(flexNoneResult.flexboxGrid?.flex).toBe('none');
    });
  });

  describe('Flex Grow', () => {
    test('should parse flex grow utilities', () => {
      expect(parser.parseClass('grow')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('grow-0')?.category).toBe('flexbox-grid');
    });

    test('should parse flex grow values correctly', () => {
      const growResult = parser.parse('grow');
      expect(growResult.flexboxGrid?.flexGrow).toBe('1');

      const grow0Result = parser.parse('grow-0');
      expect(grow0Result.flexboxGrid?.flexGrow).toBe('0');
    });
  });

  describe('Flex Shrink', () => {
    test('should parse flex shrink utilities', () => {
      expect(parser.parseClass('shrink')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('shrink-0')?.category).toBe('flexbox-grid');
    });

    test('should parse flex shrink values correctly', () => {
      const shrinkResult = parser.parse('shrink');
      expect(shrinkResult.flexboxGrid?.flexShrink).toBe('1');

      const shrink0Result = parser.parse('shrink-0');
      expect(shrinkResult.flexboxGrid?.flexShrink).toBe('1');
    });
  });

  describe('Order', () => {
    test('should parse order utilities', () => {
      expect(parser.parseClass('order-1')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('order-2')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('order-first')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('order-last')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('order-none')?.category).toBe('flexbox-grid');
    });

    test('should parse order values correctly', () => {
      const order1Result = parser.parse('order-1');
      expect(order1Result.flexboxGrid?.order).toBe('1');

      const orderFirstResult = parser.parse('order-first');
      expect(orderFirstResult.flexboxGrid?.order).toBe('-9999');

      const orderLastResult = parser.parse('order-last');
      expect(orderLastResult.flexboxGrid?.order).toBe('9999');

      const orderNoneResult = parser.parse('order-none');
      expect(orderNoneResult.flexboxGrid?.order).toBe('0');
    });
  });

  describe('Grid Template Columns', () => {
    test('should parse grid template columns utilities', () => {
      expect(parser.parseClass('grid-cols-1')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('grid-cols-2')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('grid-cols-3')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('grid-cols-12')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('grid-cols-none')?.category).toBe('flexbox-grid');
    });

    test('should parse grid template columns values correctly', () => {
      const cols1Result = parser.parse('grid-cols-1');
      expect(cols1Result.flexboxGrid?.gridTemplateColumns).toBe('repeat(1, minmax(0, 1fr))');

      const cols3Result = parser.parse('grid-cols-3');
      expect(cols3Result.flexboxGrid?.gridTemplateColumns).toBe('repeat(3, minmax(0, 1fr))');

      const colsNoneResult = parser.parse('grid-cols-none');
      expect(colsNoneResult.flexboxGrid?.gridTemplateColumns).toBe('none');
    });
  });

  describe('Grid Column Span', () => {
    test('should parse grid column span utilities', () => {
      expect(parser.parseClass('col-span-1')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('col-span-2')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('col-span-full')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('col-auto')?.category).toBe('flexbox-grid');
    });

    test('should parse grid column span values correctly', () => {
      const colSpan1Result = parser.parse('col-span-1');
      expect(colSpan1Result.flexboxGrid?.gridColumn).toBe('span 1 / span 1');

      const colSpan2Result = parser.parse('col-span-2');
      expect(colSpan2Result.flexboxGrid?.gridColumn).toBe('span 2 / span 2');

      const colSpanFullResult = parser.parse('col-span-full');
      expect(colSpanFullResult.flexboxGrid?.gridColumn).toBe('1 / -1');

      const colAutoResult = parser.parse('col-auto');
      expect(colAutoResult.flexboxGrid?.gridColumn).toBe('auto');
    });
  });

  describe('Grid Column Start/End', () => {
    test('should parse grid column start/end utilities', () => {
      expect(parser.parseClass('col-start-1')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('col-start-2')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('col-end-1')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('col-end-3')?.category).toBe('flexbox-grid');
    });

    test('should parse grid column start/end values correctly', () => {
      const colStart2Result = parser.parse('col-start-2');
      expect(colStart2Result.flexboxGrid?.gridColumnStart).toBe('2');

      const colEnd3Result = parser.parse('col-end-3');
      expect(colEnd3Result.flexboxGrid?.gridColumnEnd).toBe('3');
    });
  });

  describe('Grid Template Rows', () => {
    test('should parse grid template rows utilities', () => {
      expect(parser.parseClass('grid-rows-1')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('grid-rows-2')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('grid-rows-6')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('grid-rows-none')?.category).toBe('flexbox-grid');
    });

    test('should parse grid template rows values correctly', () => {
      const rows1Result = parser.parse('grid-rows-1');
      expect(rows1Result.flexboxGrid?.gridTemplateRows).toBe('repeat(1, minmax(0, 1fr))');

      const rows2Result = parser.parse('grid-rows-2');
      expect(rows2Result.flexboxGrid?.gridTemplateRows).toBe('repeat(2, minmax(0, 1fr))');

      const rowsNoneResult = parser.parse('grid-rows-none');
      expect(rowsNoneResult.flexboxGrid?.gridTemplateRows).toBe('none');
    });
  });

  describe('Grid Row Span', () => {
    test('should parse grid row span utilities', () => {
      expect(parser.parseClass('row-span-1')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('row-span-2')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('row-span-full')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('row-auto')?.category).toBe('flexbox-grid');
    });

    test('should parse grid row span values correctly', () => {
      const rowSpan1Result = parser.parse('row-span-1');
      expect(rowSpan1Result.flexboxGrid?.gridRow).toBe('span 1 / span 1');

      const rowSpan2Result = parser.parse('row-span-2');
      expect(rowSpan2Result.flexboxGrid?.gridRow).toBe('span 2 / span 2');

      const rowSpanFullResult = parser.parse('row-span-full');
      expect(rowSpanFullResult.flexboxGrid?.gridRow).toBe('1 / -1');

      const rowAutoResult = parser.parse('row-auto');
      expect(rowAutoResult.flexboxGrid?.gridRow).toBe('auto');
    });
  });

  describe('Grid Row Start/End', () => {
    test('should parse grid row start/end utilities', () => {
      expect(parser.parseClass('row-start-1')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('row-start-2')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('row-end-1')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('row-end-3')?.category).toBe('flexbox-grid');
    });

    test('should parse grid row start/end values correctly', () => {
      const rowStart2Result = parser.parse('row-start-2');
      expect(rowStart2Result.flexboxGrid?.gridRowStart).toBe('2');

      const rowEnd3Result = parser.parse('row-end-3');
      expect(rowEnd3Result.flexboxGrid?.gridRowEnd).toBe('3');
    });
  });

  describe('Gap', () => {
    test('should parse gap utilities', () => {
      // Gap은 현재 spacing 카테고리로 분류됨 (Spacing과 Flexbox 양쪽에서 지원)
      expect(parser.parseClass('gap-0')?.category).toBe('spacing');
      expect(parser.parseClass('gap-1')?.category).toBe('spacing');
      expect(parser.parseClass('gap-4')?.category).toBe('spacing');
      expect(parser.parseClass('gap-x-2')?.category).toBe('spacing');
      expect(parser.parseClass('gap-y-4')?.category).toBe('spacing');
    });

    test('should parse gap values correctly', () => {
      const gap0Result = parser.parse('gap-0');
      expect(gap0Result.spacing?.gap).toBe(0);

      const gap4Result = parser.parse('gap-4');
      expect(gap4Result.spacing?.gap).toBe(16);

      const gapX2Result = parser.parse('gap-x-2');
      expect(gapX2Result.spacing?.gap).toEqual({ column: 8 });

      const gapY4Result = parser.parse('gap-y-4');
      expect(gapY4Result.spacing?.gap).toEqual({ row: 16 });
    });
  });

  describe('Justify Content', () => {
    test('should parse justify content utilities', () => {
      expect(parser.parseClass('justify-start')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('justify-end')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('justify-center')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('justify-between')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('justify-around')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('justify-evenly')?.category).toBe('flexbox-grid');
    });

    test('should parse justify content values correctly', () => {
      const justifyStartResult = parser.parse('justify-start');
      expect(justifyStartResult.flexboxGrid?.justifyContent).toBe('flex-start');

      const justifyCenterResult = parser.parse('justify-center');
      expect(justifyCenterResult.flexboxGrid?.justifyContent).toBe('center');

      const justifyBetweenResult = parser.parse('justify-between');
      expect(justifyBetweenResult.flexboxGrid?.justifyContent).toBe('space-between');
    });
  });

  describe('Align Content', () => {
    test('should parse align content utilities', () => {
      expect(parser.parseClass('content-start')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('content-end')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('content-center')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('content-between')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('content-around')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('content-evenly')?.category).toBe('flexbox-grid');
    });

    test('should parse align content values correctly', () => {
      const contentStartResult = parser.parse('content-start');
      expect(contentStartResult.flexboxGrid?.alignContent).toBe('flex-start');

      const contentCenterResult = parser.parse('content-center');
      expect(contentCenterResult.flexboxGrid?.alignContent).toBe('center');

      const contentBetweenResult = parser.parse('content-between');
      expect(contentBetweenResult.flexboxGrid?.alignContent).toBe('space-between');
    });
  });

  describe('Align Items', () => {
    test('should parse align items utilities', () => {
      expect(parser.parseClass('items-start')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('items-end')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('items-center')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('items-baseline')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('items-stretch')?.category).toBe('flexbox-grid');
    });

    test('should parse align items values correctly', () => {
      const itemsStartResult = parser.parse('items-start');
      expect(itemsStartResult.flexboxGrid?.alignItems).toBe('flex-start');

      const itemsCenterResult = parser.parse('items-center');
      expect(itemsCenterResult.flexboxGrid?.alignItems).toBe('center');

      const itemsBaselineResult = parser.parse('items-baseline');
      expect(itemsBaselineResult.flexboxGrid?.alignItems).toBe('baseline');
    });
  });

  describe('Align Self', () => {
    test('should parse align self utilities', () => {
      expect(parser.parseClass('self-auto')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('self-start')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('self-end')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('self-center')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('self-stretch')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('self-baseline')?.category).toBe('flexbox-grid');
    });

    test('should parse align self values correctly', () => {
      const selfAutoResult = parser.parse('self-auto');
      expect(selfAutoResult.flexboxGrid?.alignSelf).toBe('auto');

      const selfCenterResult = parser.parse('self-center');
      expect(selfCenterResult.flexboxGrid?.alignSelf).toBe('center');

      const selfEndResult = parser.parse('self-end');
      expect(selfEndResult.flexboxGrid?.alignSelf).toBe('flex-end');
    });
  });

  describe('Flex Basis', () => {
    test('should parse flex basis spacing scale', () => {
      expect(parser.parseClass('basis-0')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('basis-1')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('basis-4')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('basis-96')?.category).toBe('flexbox-grid');
    });
    test('should parse flex basis spacing scale values', () => {
      expect(parser.parse('basis-0').flexboxGrid?.flexBasis).toBe('0px');
      expect(parser.parse('basis-1').flexboxGrid?.flexBasis).toBe('0.25rem');
      expect(parser.parse('basis-4').flexboxGrid?.flexBasis).toBe('1rem');
    });
    test('should parse flex basis percentage values', () => {
      expect(parser.parse('basis-1/2').flexboxGrid?.flexBasis).toBe('50%');
      const basis1_3 = parseFloat(parser.parse('basis-1/3').flexboxGrid?.flexBasis || '0');
      expect(basis1_3).toBeCloseTo(33.333333);
      const basis2_3 = parseFloat(parser.parse('basis-2/3').flexboxGrid?.flexBasis || '0');
      expect(basis2_3).toBeCloseTo(66.666667);
      expect(parser.parse('basis-3/4').flexboxGrid?.flexBasis).toBe('75%');
    });
    test('should parse flex basis special values', () => {
      expect(parser.parse('basis-auto').flexboxGrid?.flexBasis).toBe('auto');
      expect(parser.parse('basis-px').flexboxGrid?.flexBasis).toBe('1px');
      expect(parser.parse('basis-full').flexboxGrid?.flexBasis).toBe('100%');
    });
    test('should parse flex basis arbitrary value', () => {
      // 예: basis-[42px] → 42px
      expect(parser.parse('basis-[42px]').flexboxGrid?.flexBasis).toBe('42px');
      expect(parser.parse('basis-[10%]').flexboxGrid?.flexBasis).toBe('10%');
      expect(parser.parse('basis-[var(--my-basis)]').flexboxGrid?.flexBasis).toBe('var(--my-basis)');
    });
  });

  describe('Grid Auto Columns', () => {
    test('should parse grid auto columns utilities', () => {
      expect(parser.parseClass('auto-cols-auto')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('auto-cols-min')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('auto-cols-max')?.category).toBe('flexbox-grid');
      expect(parser.parseClass('auto-cols-fr')?.category).toBe('flexbox-grid');
    });
    test('should parse grid auto columns values', () => {
      expect(parser.parse('auto-cols-auto').flexboxGrid?.gridAutoColumns).toBe('auto');
      expect(parser.parse('auto-cols-min').flexboxGrid?.gridAutoColumns).toBe('min-content');
      expect(parser.parse('auto-cols-max').flexboxGrid?.gridAutoColumns).toBe('max-content');
      expect(parser.parse('auto-cols-fr').flexboxGrid?.gridAutoColumns).toBe('minmax(0, 1fr)');
    });
    test('should parse grid auto columns arbitrary value', () => {
      expect(parser.parse('auto-cols-[200px]').flexboxGrid?.gridAutoColumns).toBe('200px');
      expect(parser.parse('auto-cols-[minmax(0,2fr)]').flexboxGrid?.gridAutoColumns).toBe('minmax(0,2fr)');
    });
  });

  // Grid Auto Rows
  describe('Grid Auto Rows', () => {
    it('parses grid-auto-rows presets', () => {
      expect(parser.parse('auto-rows-auto').flexboxGrid).toEqual({ gridAutoRows: 'auto' });
      expect(parser.parse('auto-rows-min').flexboxGrid).toEqual({ gridAutoRows: 'min-content' });
      expect(parser.parse('auto-rows-max').flexboxGrid).toEqual({ gridAutoRows: 'max-content' });
      expect(parser.parse('auto-rows-fr').flexboxGrid).toEqual({ gridAutoRows: 'minmax(0, 1fr)' });
    });

    it('parses grid-auto-rows with arbitrary values', () => {
      expect(parser.parse('auto-rows-[30rem]').flexboxGrid).toEqual({ gridAutoRows: '30rem' });
      expect(parser.parse('auto-rows-[minmax(0,_50vh)]').flexboxGrid).toEqual({ gridAutoRows: 'minmax(0, 50vh)' });
    });
  });
}); 
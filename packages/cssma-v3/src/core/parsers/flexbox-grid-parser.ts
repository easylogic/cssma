/**
 * Flexbox & Grid Parser
 * Tailwind CSS의 모든 Flexbox 및 Grid 유틸리티 클래스를 파싱합니다.
 */

import { ParsedStyle, ParsedClass, FlexboxGridStyles, DesignPreset } from '../../types';

export class FlexboxGridParser {
  /**
   * FlexboxGrid 스타일을 적용합니다.
   * @param parsedClass 파싱된 클래스
   * @param styles 스타일 객체
   * @param preset 디자인 프리셋 (옵션)
   */
  static applyFlexboxGridStyle(
    parsedClass: ParsedClass, 
    styles: { flexboxGrid?: FlexboxGridStyles }, 
    preset?: DesignPreset
  ): void {
    const result = this.parse(parsedClass.baseClassName);
    if (!result) return;

    if (!styles.flexboxGrid) {
      styles.flexboxGrid = {};
    }

    // sr-only 특별 처리
    if (parsedClass.baseClassName === 'sr-only') {
      styles.flexboxGrid.position = 'absolute';
      styles.flexboxGrid.width = '1px';
      styles.flexboxGrid.height = '1px';
      styles.flexboxGrid.padding = '0';
      styles.flexboxGrid.margin = '-1px';
      styles.flexboxGrid.overflow = 'hidden';
      styles.flexboxGrid.clip = 'rect(0, 0, 0, 0)';
      styles.flexboxGrid.whiteSpace = 'nowrap';
      styles.flexboxGrid.borderWidth = '0';
      return;
    }

    // not-sr-only 특별 처리
    if (parsedClass.baseClassName === 'not-sr-only') {
      styles.flexboxGrid.position = 'static';
      styles.flexboxGrid.width = 'auto';
      styles.flexboxGrid.height = 'auto';
      styles.flexboxGrid.padding = '0';
      styles.flexboxGrid.margin = '0';
      styles.flexboxGrid.overflow = 'visible';
      styles.flexboxGrid.clip = 'auto';
      styles.flexboxGrid.whiteSpace = 'normal';
      styles.flexboxGrid.borderWidth = '0';
      return;
    }

    // 개별 파서를 사용하여 속성 값 설정
    if (result.property) {
      switch (result.property) {
        case 'display':
          styles.flexboxGrid.display = result.value;
          break;
        case 'flexDirection':
          styles.flexboxGrid.flexDirection = result.value;
          break;
        case 'flexWrap':
          styles.flexboxGrid.flexWrap = result.value;
          break;
        case 'flex':
          styles.flexboxGrid.flex = result.value;
          break;
        case 'flexGrow':
          styles.flexboxGrid.flexGrow = result.value;
          break;
        case 'flexShrink':
          styles.flexboxGrid.flexShrink = result.value;
          break;
        case 'flexBasis':
          styles.flexboxGrid.flexBasis = result.value;
          break;
        case 'order':
          styles.flexboxGrid.order = result.value;
          break;
        case 'gridTemplateColumns':
          styles.flexboxGrid.gridTemplateColumns = result.value;
          break;
        case 'gridColumn':
          styles.flexboxGrid.gridColumn = result.value;
          break;
        case 'gridTemplateRows':
          styles.flexboxGrid.gridTemplateRows = result.value;
          break;
        case 'gridRow':
          styles.flexboxGrid.gridRow = result.value;
          break;
        case 'gridColumnStart':
          styles.flexboxGrid.gridColumnStart = result.value;
          break;
        case 'gridColumnEnd':
          styles.flexboxGrid.gridColumnEnd = result.value;
          break;
        case 'gridRowStart':
          styles.flexboxGrid.gridRowStart = result.value;
          break;
        case 'gridRowEnd':
          styles.flexboxGrid.gridRowEnd = result.value;
          break;
        case 'gridAutoFlow':
          styles.flexboxGrid.gridAutoFlow = result.value;
          break;
        case 'gap':
          styles.flexboxGrid.gap = result.value;
          break;
        case 'columnGap':
          styles.flexboxGrid.columnGap = result.value;
          break;
        case 'rowGap':
          styles.flexboxGrid.rowGap = result.value;
          break;
        case 'justifyContent':
          styles.flexboxGrid.justifyContent = result.value;
          break;
        case 'justifyItems':
          styles.flexboxGrid.justifyItems = result.value;
          break;
        case 'justifySelf':
          styles.flexboxGrid.justifySelf = result.value;
          break;
        case 'alignContent':
          styles.flexboxGrid.alignContent = result.value;
          break;
        case 'alignItems':
          styles.flexboxGrid.alignItems = result.value;
          break;
        case 'alignSelf':
          styles.flexboxGrid.alignSelf = result.value;
          break;
        case 'placeContent':
          styles.flexboxGrid.placeContent = result.value;
          break;
        case 'placeItems':
          styles.flexboxGrid.placeItems = result.value;
          break;
        case 'placeSelf':
          styles.flexboxGrid.placeSelf = result.value;
          break;
      }
    }
  }

  // Display 관련
  static parseDisplay(className: string): ParsedStyle | null {
    const displayMap: Record<string, string> = {
      'block': 'block',
      'inline-block': 'inline-block',
      'inline': 'inline',
      'flex': 'flex',
      'inline-flex': 'inline-flex',
      'table': 'table',
      'inline-table': 'inline-table',
      'table-caption': 'table-caption',
      'table-cell': 'table-cell',
      'table-column': 'table-column',
      'table-column-group': 'table-column-group',
      'table-footer-group': 'table-footer-group',
      'table-header-group': 'table-header-group',
      'table-row-group': 'table-row-group',
      'table-row': 'table-row',
      'flow-root': 'flow-root',
      'grid': 'grid',
      'inline-grid': 'inline-grid',
      'contents': 'contents',
      'list-item': 'list-item',
      'hidden': 'none'
    };

    if (className in displayMap) {
      return {
        property: 'display',
        value: displayMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // Flex Direction
  static parseFlexDirection(className: string): ParsedStyle | null {
    const flexDirectionMap: Record<string, string> = {
      'flex-row': 'row',
      'flex-row-reverse': 'row-reverse',
      'flex-col': 'column',
      'flex-col-reverse': 'column-reverse'
    };

    if (className in flexDirectionMap) {
      return {
        property: 'flexDirection',
        value: flexDirectionMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // Flex Wrap
  static parseFlexWrap(className: string): ParsedStyle | null {
    const flexWrapMap: Record<string, string> = {
      'flex-wrap': 'wrap',
      'flex-wrap-reverse': 'wrap-reverse',
      'flex-nowrap': 'nowrap'
    };

    if (className in flexWrapMap) {
      return {
        property: 'flexWrap',
        value: flexWrapMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // Flex
  static parseFlex(className: string): ParsedStyle | null {
    const flexMap: Record<string, string> = {
      'flex-1': '1 1 0%',
      'flex-auto': '1 1 auto',
      'flex-initial': '0 1 auto',
      'flex-none': 'none'
    };

    if (className in flexMap) {
      return {
        property: 'flex',
        value: flexMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // Flex Grow
  static parseFlexGrow(className: string): ParsedStyle | null {
    if (className === 'grow') {
      return {
        property: 'flexGrow',
        value: '1',
        variant: 'preset'
      };
    }

    if (className.startsWith('grow-')) {
      const value = className.slice(5);
      return {
        property: 'flexGrow',
        value: value,
        variant: 'preset'
      };
    }

    return null;
  }

  // Flex Shrink
  static parseFlexShrink(className: string): ParsedStyle | null {
    if (className === 'shrink') {
      return {
        property: 'flexShrink',
        value: '1',
        variant: 'preset'
      };
    }

    if (className.startsWith('shrink-')) {
      const value = className.slice(7);
      return {
        property: 'flexShrink',
        value: value,
        variant: 'preset'
      };
    }

    return null;
  }

  // Flex Basis
  static parseFlexBasis(className: string): ParsedStyle | null {
    if (!className.startsWith('basis-')) return null;

    const value = className.slice(6);

    // Handle preset values
    const basisMap: Record<string, string> = {
      'auto': 'auto',
      'px': '1px',
      '0': '0px',
      '0.5': '0.125rem',
      '1': '0.25rem',
      '1.5': '0.375rem',
      '2': '0.5rem',
      '2.5': '0.625rem',
      '3': '0.75rem',
      '3.5': '0.875rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '7': '1.75rem',
      '8': '2rem',
      '9': '2.25rem',
      '10': '2.5rem',
      '11': '2.75rem',
      '12': '3rem',
      '14': '3.5rem',
      '16': '4rem',
      '20': '5rem',
      '24': '6rem',
      '28': '7rem',
      '32': '8rem',
      '36': '9rem',
      '40': '10rem',
      '44': '11rem',
      '48': '12rem',
      '52': '13rem',
      '56': '14rem',
      '60': '15rem',
      '64': '16rem',
      '72': '18rem',
      '80': '20rem',
      '96': '24rem',
      'full': '100%',
      '1/2': '50%',
      '1/3': '33.333333%',
      '2/3': '66.666667%',
      '1/4': '25%',
      '2/4': '50%',
      '3/4': '75%',
      '1/5': '20%',
      '2/5': '40%',
      '3/5': '60%',
      '4/5': '80%',
      '1/6': '16.666667%',
      '2/6': '33.333333%',
      '3/6': '50%',
      '4/6': '66.666667%',
      '5/6': '83.333333%',
      '1/12': '8.333333%',
      '2/12': '16.666667%',
      '3/12': '25%',
      '4/12': '33.333333%',
      '5/12': '41.666667%',
      '6/12': '50%',
      '7/12': '58.333333%',
      '8/12': '66.666667%',
      '9/12': '75%',
      '10/12': '83.333333%',
      '11/12': '91.666667%'
    };

    if (value in basisMap) {
      return {
        property: 'flexBasis',
        value: basisMap[value],
        variant: 'preset'
      };
    }

    // Handle arbitrary values
    if (value.startsWith('[') && value.endsWith(']')) {
      const arbitraryValue = value.slice(1, -1);
      return {
        property: 'flexBasis',
        value: arbitraryValue,
        variant: 'arbitrary'
      };
    }

    return null;
  }

  // Order
  static parseOrder(className: string): ParsedStyle | null {
    if (!className.startsWith('order-')) return null;

    const value = className.slice(6);

    if (value === 'first') {
      return {
        property: 'order',
        value: '-9999',
        variant: 'preset'
      };
    }

    if (value === 'last') {
      return {
        property: 'order',
        value: '9999',
        variant: 'preset'
      };
    }

    if (value === 'none') {
      return {
        property: 'order',
        value: '0',
        variant: 'preset'
      };
    }

    // Handle numeric values (1-12)
    const order = parseInt(value);
    if (!isNaN(order) && order >= 1 && order <= 12) {
      return {
        property: 'order',
        value: order.toString(),
        variant: 'preset'
      };
    }

    // Handle arbitrary values
    if (value.startsWith('[') && value.endsWith(']')) {
      const arbitraryValue = value.slice(1, -1);
      return {
        property: 'order',
        value: arbitraryValue,
        variant: 'arbitrary'
      };
    }

    return null;
  }

  // Grid Template Columns
  static parseGridTemplateColumns(className: string): ParsedStyle | null {
    const gridColsMap: Record<string, string> = {
      'grid-cols-1': 'repeat(1, minmax(0, 1fr))',
      'grid-cols-2': 'repeat(2, minmax(0, 1fr))',
      'grid-cols-3': 'repeat(3, minmax(0, 1fr))',
      'grid-cols-4': 'repeat(4, minmax(0, 1fr))',
      'grid-cols-5': 'repeat(5, minmax(0, 1fr))',
      'grid-cols-6': 'repeat(6, minmax(0, 1fr))',
      'grid-cols-7': 'repeat(7, minmax(0, 1fr))',
      'grid-cols-8': 'repeat(8, minmax(0, 1fr))',
      'grid-cols-9': 'repeat(9, minmax(0, 1fr))',
      'grid-cols-10': 'repeat(10, minmax(0, 1fr))',
      'grid-cols-11': 'repeat(11, minmax(0, 1fr))',
      'grid-cols-12': 'repeat(12, minmax(0, 1fr))',
      'grid-cols-none': 'none'
    };

    if (className in gridColsMap) {
      return {
        property: 'gridTemplateColumns',
        value: gridColsMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // Grid Column Span
  static parseGridColumn(className: string): ParsedStyle | null {
    const gridColumnMap: Record<string, string> = {
      'col-auto': 'auto',
      'col-span-1': 'span 1 / span 1',
      'col-span-2': 'span 2 / span 2',
      'col-span-3': 'span 3 / span 3',
      'col-span-4': 'span 4 / span 4',
      'col-span-5': 'span 5 / span 5',
      'col-span-6': 'span 6 / span 6',
      'col-span-7': 'span 7 / span 7',
      'col-span-8': 'span 8 / span 8',
      'col-span-9': 'span 9 / span 9',
      'col-span-10': 'span 10 / span 10',
      'col-span-11': 'span 11 / span 11',
      'col-span-12': 'span 12 / span 12',
      'col-span-full': '1 / -1'
    };

    if (className in gridColumnMap) {
      return {
        property: 'gridColumn',
        value: gridColumnMap[className],
        variant: 'preset'
      };
    }

    // Column start/end
    if (className.startsWith('col-start-')) {
      const value = className.slice(11);
      return {
        property: 'gridColumnStart',
        value: value === 'auto' ? 'auto' : value,
        variant: 'preset'
      };
    }

    if (className.startsWith('col-end-')) {
      const value = className.slice(9);
      return {
        property: 'gridColumnEnd',
        value: value === 'auto' ? 'auto' : value,
        variant: 'preset'
      };
    }

    return null;
  }

  // Grid Template Rows
  static parseGridTemplateRows(className: string): ParsedStyle | null {
    const gridRowsMap: Record<string, string> = {
      'grid-rows-1': 'repeat(1, minmax(0, 1fr))',
      'grid-rows-2': 'repeat(2, minmax(0, 1fr))',
      'grid-rows-3': 'repeat(3, minmax(0, 1fr))',
      'grid-rows-4': 'repeat(4, minmax(0, 1fr))',
      'grid-rows-5': 'repeat(5, minmax(0, 1fr))',
      'grid-rows-6': 'repeat(6, minmax(0, 1fr))',
      'grid-rows-none': 'none'
    };

    if (className in gridRowsMap) {
      return {
        property: 'gridTemplateRows',
        value: gridRowsMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // Grid Row Span
  static parseGridRow(className: string): ParsedStyle | null {
    const gridRowMap: Record<string, string> = {
      'row-auto': 'auto',
      'row-span-1': 'span 1 / span 1',
      'row-span-2': 'span 2 / span 2',
      'row-span-3': 'span 3 / span 3',
      'row-span-4': 'span 4 / span 4',
      'row-span-5': 'span 5 / span 5',
      'row-span-6': 'span 6 / span 6',
      'row-span-full': '1 / -1'
    };

    if (className in gridRowMap) {
      return {
        property: 'gridRow',
        value: gridRowMap[className],
        variant: 'preset'
      };
    }

    // Row start/end
    if (className.startsWith('row-start-')) {
      const value = className.slice(11);
      return {
        property: 'gridRowStart',
        value: value === 'auto' ? 'auto' : value,
        variant: 'preset'
      };
    }

    if (className.startsWith('row-end-')) {
      const value = className.slice(9);
      return {
        property: 'gridRowEnd',
        value: value === 'auto' ? 'auto' : value,
        variant: 'preset'
      };
    }

    return null;
  }

  // Grid Auto Flow
  static parseGridAutoFlow(className: string): ParsedStyle | null {
    const gridFlowMap: Record<string, string> = {
      'grid-flow-row': 'row',
      'grid-flow-col': 'column',
      'grid-flow-dense': 'dense',
      'grid-flow-row-dense': 'row dense',
      'grid-flow-col-dense': 'column dense'
    };

    if (className in gridFlowMap) {
      return {
        property: 'gridAutoFlow',
        value: gridFlowMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // Gap
  static parseGap(className: string): ParsedStyle | null {
    if (!className.startsWith('gap')) return null;

    const gapMap: Record<string, string> = {
      'gap-0': '0px',
      'gap-px': '1px',
      'gap-0.5': '0.125rem',
      'gap-1': '0.25rem',
      'gap-1.5': '0.375rem',
      'gap-2': '0.5rem',
      'gap-2.5': '0.625rem',
      'gap-3': '0.75rem',
      'gap-3.5': '0.875rem',
      'gap-4': '1rem',
      'gap-5': '1.25rem',
      'gap-6': '1.5rem',
      'gap-7': '1.75rem',
      'gap-8': '2rem',
      'gap-9': '2.25rem',
      'gap-10': '2.5rem',
      'gap-11': '2.75rem',
      'gap-12': '3rem',
      'gap-14': '3.5rem',
      'gap-16': '4rem',
      'gap-20': '5rem',
      'gap-24': '6rem',
      'gap-28': '7rem',
      'gap-32': '8rem',
      'gap-36': '9rem',
      'gap-40': '10rem',
      'gap-44': '11rem',
      'gap-48': '12rem',
      'gap-52': '13rem',
      'gap-56': '14rem',
      'gap-60': '15rem',
      'gap-64': '16rem',
      'gap-72': '18rem',
      'gap-80': '20rem',
      'gap-96': '24rem'
    };

    // Regular gap
    if (className in gapMap) {
      return {
        property: 'gap',
        value: gapMap[className],
        variant: 'preset'
      };
    }

    // Gap X
    if (className.startsWith('gap-x-')) {
      const value = className.slice(6);
      const gapKey = `gap-${value}` as keyof typeof gapMap;
      if (gapKey in gapMap) {
        return {
          property: 'columnGap',
          value: gapMap[gapKey],
          variant: 'preset'
        };
      }
    }

    // Gap Y
    if (className.startsWith('gap-y-')) {
      const value = className.slice(6);
      const gapKey = `gap-${value}` as keyof typeof gapMap;
      if (gapKey in gapMap) {
        return {
          property: 'rowGap',
          value: gapMap[gapKey],
          variant: 'preset'
        };
      }
    }

    return null;
  }

  // Justify Content
  static parseJustifyContent(className: string): ParsedStyle | null {
    const justifyContentMap: Record<string, string> = {
      'justify-start': 'flex-start',
      'justify-end': 'flex-end',
      'justify-center': 'center',
      'justify-between': 'space-between',
      'justify-around': 'space-around',
      'justify-evenly': 'space-evenly'
    };

    if (className in justifyContentMap) {
      return {
        property: 'justifyContent',
        value: justifyContentMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // Justify Items
  static parseJustifyItems(className: string): ParsedStyle | null {
    const justifyItemsMap: Record<string, string> = {
      'justify-items-start': 'start',
      'justify-items-end': 'end',
      'justify-items-center': 'center',
      'justify-items-stretch': 'stretch'
    };

    if (className in justifyItemsMap) {
      return {
        property: 'justifyItems',
        value: justifyItemsMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // Justify Self
  static parseJustifySelf(className: string): ParsedStyle | null {
    const justifySelfMap: Record<string, string> = {
      'justify-self-auto': 'auto',
      'justify-self-start': 'start',
      'justify-self-end': 'end',
      'justify-self-center': 'center',
      'justify-self-stretch': 'stretch'
    };

    if (className in justifySelfMap) {
      return {
        property: 'justifySelf',
        value: justifySelfMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // Align Content
  static parseAlignContent(className: string): ParsedStyle | null {
    const alignContentMap: Record<string, string> = {
      'content-center': 'center',
      'content-start': 'flex-start',
      'content-end': 'flex-end',
      'content-between': 'space-between',
      'content-around': 'space-around',
      'content-evenly': 'space-evenly'
    };

    if (className in alignContentMap) {
      return {
        property: 'alignContent',
        value: alignContentMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // Align Items
  static parseAlignItems(className: string): ParsedStyle | null {
    const alignItemsMap: Record<string, string> = {
      'items-start': 'flex-start',
      'items-end': 'flex-end',
      'items-center': 'center',
      'items-baseline': 'baseline',
      'items-stretch': 'stretch'
    };

    if (className in alignItemsMap) {
      return {
        property: 'alignItems',
        value: alignItemsMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // Align Self
  static parseAlignSelf(className: string): ParsedStyle | null {
    const alignSelfMap: Record<string, string> = {
      'self-auto': 'auto',
      'self-start': 'flex-start',
      'self-end': 'flex-end',
      'self-center': 'center',
      'self-stretch': 'stretch',
      'self-baseline': 'baseline'
    };

    if (className in alignSelfMap) {
      return {
        property: 'alignSelf',
        value: alignSelfMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // Place Content
  static parsePlaceContent(className: string): ParsedStyle | null {
    const placeContentMap: Record<string, string> = {
      'place-content-center': 'center',
      'place-content-start': 'start',
      'place-content-end': 'end',
      'place-content-between': 'space-between',
      'place-content-around': 'space-around',
      'place-content-evenly': 'space-evenly',
      'place-content-stretch': 'stretch'
    };

    if (className in placeContentMap) {
      return {
        property: 'placeContent',
        value: placeContentMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // Place Items
  static parsePlaceItems(className: string): ParsedStyle | null {
    const placeItemsMap: Record<string, string> = {
      'place-items-start': 'start',
      'place-items-end': 'end',
      'place-items-center': 'center',
      'place-items-stretch': 'stretch'
    };

    if (className in placeItemsMap) {
      return {
        property: 'placeItems',
        value: placeItemsMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // Place Self
  static parsePlaceSelf(className: string): ParsedStyle | null {
    const placeSelfMap: Record<string, string> = {
      'place-self-auto': 'auto',
      'place-self-start': 'start',
      'place-self-end': 'end',
      'place-self-center': 'center',
      'place-self-stretch': 'stretch'
    };

    if (className in placeSelfMap) {
      return {
        property: 'placeSelf',
        value: placeSelfMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  /**
   * 메인 파싱 메서드 - 모든 flexbox/grid 관련 클래스를 파싱
   */
  static parse(className: string): ParsedStyle | null {
    // Special cases for sr-only
    if (className === 'sr-only' || className === 'not-sr-only') {
      return {
        property: 'srOnly',
        value: className === 'sr-only' ? 'true' : 'false',
        variant: 'preset'
      };
    }
    
    // Display
    const display = this.parseDisplay(className);
    if (display) return display;

    // Flex direction
    const flexDirection = this.parseFlexDirection(className);
    if (flexDirection) return flexDirection;

    // Flex wrap
    const flexWrap = this.parseFlexWrap(className);
    if (flexWrap) return flexWrap;

    // Flex
    const flex = this.parseFlex(className);
    if (flex) return flex;

    // Flex grow - also handle 'grow' and 'grow-N'
    if (className === 'grow') {
      return { property: 'flexGrow', value: '1', variant: 'preset' };
    }
    if (className.startsWith('grow-')) {
      const value = className.slice(5);
      return { property: 'flexGrow', value: value, variant: 'preset' };
    }
    const flexGrow = this.parseFlexGrow(className);
    if (flexGrow) return flexGrow;

    // Flex shrink - also handle 'shrink' and 'shrink-N'
    if (className === 'shrink') {
      return { property: 'flexShrink', value: '1', variant: 'preset' };
    }
    if (className.startsWith('shrink-')) {
      const value = className.slice(7);
      return { property: 'flexShrink', value: value, variant: 'preset' };
    }
    const flexShrink = this.parseFlexShrink(className);
    if (flexShrink) return flexShrink;

    // Flex basis
    const flexBasis = this.parseFlexBasis(className);
    if (flexBasis) return flexBasis;

    // Order
    const order = this.parseOrder(className);
    if (order) return order;

    // Grid template columns
    const gridTemplateColumns = this.parseGridTemplateColumns(className);
    if (gridTemplateColumns) return gridTemplateColumns;

    // Grid columns
    const gridColumn = this.parseGridColumn(className);
    if (gridColumn) return gridColumn;

    // Grid template rows
    const gridTemplateRows = this.parseGridTemplateRows(className);
    if (gridTemplateRows) return gridTemplateRows;

    // Grid rows
    const gridRow = this.parseGridRow(className);
    if (gridRow) return gridRow;

    // Grid auto flow
    const gridAutoFlow = this.parseGridAutoFlow(className);
    if (gridAutoFlow) return gridAutoFlow;

    // Gap
    const gap = this.parseGap(className);
    if (gap) return gap;

    // Justify content
    const justifyContent = this.parseJustifyContent(className);
    if (justifyContent) return justifyContent;

    // Justify items
    const justifyItems = this.parseJustifyItems(className);
    if (justifyItems) return justifyItems;

    // Justify self
    const justifySelf = this.parseJustifySelf(className);
    if (justifySelf) return justifySelf;

    // Align content
    const alignContent = this.parseAlignContent(className);
    if (alignContent) return alignContent;

    // Align items
    const alignItems = this.parseAlignItems(className);
    if (alignItems) return alignItems;

    // Align self
    const alignSelf = this.parseAlignSelf(className);
    if (alignSelf) return alignSelf;

    // Place content
    const placeContent = this.parsePlaceContent(className);
    if (placeContent) return placeContent;

    // Place items
    const placeItems = this.parsePlaceItems(className);
    if (placeItems) return placeItems;

    // Place self
    const placeSelf = this.parsePlaceSelf(className);
    if (placeSelf) return placeSelf;

    // Grid Auto Columns
    if (className.startsWith('auto-cols-')) {
      const value = className.slice(10);
      
      // Handle preset values
      const autoColsMap: Record<string, string> = {
        'auto': 'auto',
        'min': 'min-content',
        'max': 'max-content',
        'fr': 'minmax(0, 1fr)'
      };

      if (value in autoColsMap) {
        return {
          property: 'gridAutoColumns',
          value: autoColsMap[value],
          variant: 'preset'
        };
      }

      // Handle arbitrary values
      if (value.startsWith('[') && value.endsWith(']')) {
        const arbitraryValue = value.slice(1, -1);
        return {
          property: 'gridAutoColumns',
          value: arbitraryValue,
          variant: 'arbitrary'
        };
      }
    }

    // Grid Auto Rows
    if (className.startsWith('auto-rows-')) {
      const value = className.slice(10);
      
      // Handle preset values
      const autoRowsMap: Record<string, string> = {
        'auto': 'auto',
        'min': 'min-content',
        'max': 'max-content',
        'fr': 'minmax(0, 1fr)'
      };

      if (value in autoRowsMap) {
        return {
          property: 'gridAutoRows',
          value: autoRowsMap[value],
          variant: 'preset'
        };
      }

      // Handle arbitrary values
      if (value.startsWith('[') && value.endsWith(']')) {
        const arbitraryValue = value.slice(1, -1).replace(/_/g, ' ');
        return {
          property: 'gridAutoRows',
          value: arbitraryValue,
          variant: 'arbitrary'
        };
      }
    }

    return null;
  }
} 
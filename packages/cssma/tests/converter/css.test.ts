import { describe, it, expect } from 'vitest';
import { convertStylesToCss } from '../../src/converter/index';
import { ParsedStyle } from '../../src/types';

describe('convertStylesToCss', () => {
  it('should convert layout styles to CSS', () => {
    const styles: ParsedStyle[] = [
      { property: 'width', value: 100, variant: 'preset' },
      { property: 'height', value: 50, variant: 'preset' },
      { property: 'layoutMode', value: 'HORIZONTAL', variant: 'preset' },
    ];

    const result = convertStylesToCss(styles);

    expect(result).toEqual({
      width: '100px',
      height: '50px',
      display: 'flex',
      'flex-direction': 'row',
    });
  });

  it('should convert spacing styles to CSS', () => {
    const styles: ParsedStyle[] = [
      { property: 'padding', value: 16, variant: 'preset' },
      { property: 'gap', value: 8, variant: 'preset' },
      { property: 'paddingHorizontal', value: 12, variant: 'preset' },
    ];

    const result = convertStylesToCss(styles);

    expect(result).toEqual({
      padding: '16px',
      gap: '8px',
      'padding-left': '12px',
      'padding-right': '12px',
    });
  });

  it('should convert font styles to CSS', () => {
    const styles: ParsedStyle[] = [
      { property: 'fontSize', value: 14, variant: 'preset' },
      { property: 'fontFamily', value: 'Arial', variant: 'preset' },
      { property: 'fontWeight', value: 'bold', variant: 'preset' },
    ];

    const result = convertStylesToCss(styles);

    expect(result).toEqual({
      'font-size': '14px',
      'font-family': 'Arial',
      'font-weight': 'bold',
    });
  });

  it('should convert text styles to CSS', () => {
    const styles: ParsedStyle[] = [
      { property: 'color', value: '#ff0000', variant: 'preset' },
      { property: 'textAlign', value: 'center', variant: 'preset' },
      { property: 'letterSpacing', value: 2, variant: 'preset' },
    ];

    const result = convertStylesToCss(styles);

    expect(result).toEqual({
      color: '#ff0000',
      'text-align': 'center',
      'letter-spacing': '2px',
    });
  });

  it('should convert background styles to CSS', () => {
    const styles: ParsedStyle[] = [
      { property: 'backgroundColor', value: '#blue', variant: 'preset' },
      { property: 'backgroundSize', value: 'cover', variant: 'preset' },
    ];

    const result = convertStylesToCss(styles);

    expect(result).toEqual({
      'background-color': '#blue',
      'background-size': 'cover',
    });
  });

  it('should convert border styles to CSS', () => {
    const styles: ParsedStyle[] = [
      { property: 'borderWidth', value: 2, variant: 'preset' },
      { property: 'borderColor', value: '#000000', variant: 'preset' },
      { property: 'borderRadius', value: 8, variant: 'preset' },
    ];

    const result = convertStylesToCss(styles);

    expect(result).toEqual({
      'border-width': '2px',
      'border-color': '#000000',
      'border-radius': '8px',
    });
  });

  it('should convert shadow and shape styles to CSS', () => {
    const styles: ParsedStyle[] = [
      { property: 'boxShadow', value: '0 2px 4px rgba(0,0,0,0.1)', variant: 'preset' },
      { property: 'opacity', value: 0.8, variant: 'preset' },
    ];

    const result = convertStylesToCss(styles);

    expect(result).toEqual({
      'box-shadow': '0 2px 4px rgba(0,0,0,0.1)',
      opacity: '0.8',
    });
  });

  it('should convert gradient styles to CSS', () => {
    const styles: ParsedStyle[] = [
      { property: 'backgroundColor', value: 'linear', variant: 'preset' },
      { property: 'gradientStops', value: ['#ff0000 0%', '#0000ff 100%'], variant: 'preset' },
      { property: 'gradientDirection', value: 'to right', variant: 'preset' },
    ];

    const result = convertStylesToCss(styles);

    expect(result).toEqual({
      'background-image': 'linear-gradient(to right, #ff0000 0%, #0000ff 100%)',
    });
  });

  it('should handle position styles', () => {
    const styles: ParsedStyle[] = [
      { property: 'position', value: 'absolute', variant: 'preset' },
      { property: 'top', value: 10, variant: 'preset' },
      { property: 'left', value: 20, variant: 'preset' },
      { property: 'zIndex', value: 100, variant: 'preset' },
    ];

    const result = convertStylesToCss(styles);

    expect(result).toEqual({
      position: 'absolute',
      top: '10px',
      left: '20px',
      'z-index': '100',
    });
  });

  it('should handle flex alignment', () => {
    const styles: ParsedStyle[] = [
      { property: 'layoutMode', value: 'VERTICAL', variant: 'preset' },
      { property: 'counterAxisAlignItems', value: 'CENTER', variant: 'preset' },
      { property: 'primaryAxisAlignItems', value: 'SPACE_BETWEEN', variant: 'preset' },
    ];

    const result = convertStylesToCss(styles);

    expect(result).toEqual({
      display: 'flex',
      'flex-direction': 'column',
      'align-items': 'center',
      'justify-content': 'space-between',
    });
  });

  it('should handle mixed styles', () => {
    const styles: ParsedStyle[] = [
      { property: 'width', value: 200, variant: 'preset' },
      { property: 'backgroundColor', value: '#ffffff', variant: 'preset' },
      { property: 'padding', value: 16, variant: 'preset' },
      { property: 'borderRadius', value: 4, variant: 'preset' },
      { property: 'fontSize', value: 16, variant: 'preset' },
      { property: 'color', value: '#333333', variant: 'preset' },
    ];

    const result = convertStylesToCss(styles);

    expect(result).toEqual({
      width: '200px',
      'background-color': '#ffffff',
      padding: '16px',
      'border-radius': '4px',
      'font-size': '16px',
      color: '#333333',
    });
  });

  it('should handle string values', () => {
    const styles: ParsedStyle[] = [
      { property: 'width', value: '100%', variant: 'arbitrary' },
      { property: 'height', value: 'auto', variant: 'preset' },
      { property: 'overflow', value: 'hidden', variant: 'preset' },
    ];

    const result = convertStylesToCss(styles);

    expect(result).toEqual({
      width: '100%',
      height: 'auto',
      overflow: 'hidden',
    });
  });
}); 
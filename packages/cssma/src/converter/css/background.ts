import { ParsedStyle } from '../../types';

export function convertBackgroundToCss(styles: ParsedStyle[]): Record<string, string> {
  const result: Record<string, string> = {};

  for (const style of styles) {
    switch (style.property) {
      case 'backgroundColor':
        result['background-color'] = String(style.value);
        break;
      case 'backgroundImage':
        result['background-image'] = String(style.value);
        break;
      case 'backgroundSize':
        result['background-size'] = String(style.value);
        break;
      case 'backgroundRepeat':
        result['background-repeat'] = String(style.value);
        break;
      case 'backgroundPosition':
        result['background-position'] = String(style.value);
        break;
      case 'backgroundBlendMode':
        result['background-blend-mode'] = String(style.value);
        break;
    }
  }

  return result;
}

export function convertGradientToCss(styles: ParsedStyle[]): Record<string, string> {
  const result: Record<string, string> = {};
  let gradientType = 'linear';
  let gradientStops: string[] = [];
  let gradientDirection = '';

  for (const style of styles) {
    switch (style.property) {
      case 'backgroundColor':
        gradientType = String(style.value); // 'linear', 'radial', 'conic'
        break;
      case 'gradientStops':
        gradientStops = Array.isArray(style.value) 
          ? style.value.map(stop => String(stop))
          : [String(style.value)];
        break;
      case 'gradientDirection':
        gradientDirection = String(style.value);
        break;
      case 'gradientAngle':
        gradientDirection = `${String(style.value)}deg`;
        break;
    }
  }

  if (gradientStops.length > 0) {
    const stopsString = gradientStops.join(', ');
    
    if (gradientType === 'linear') {
      const direction = gradientDirection || 'to bottom';
      result['background-image'] = `linear-gradient(${direction}, ${stopsString})`;
    } else if (gradientType === 'radial') {
      result['background-image'] = `radial-gradient(${stopsString})`;
    } else if (gradientType === 'conic') {
      result['background-image'] = `conic-gradient(${stopsString})`;
    }
  }

  return result;
}

export function convertImageToCss(styles: ParsedStyle[]): Record<string, string> {
  return convertBackgroundToCss(styles);
} 
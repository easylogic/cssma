import { FigmaGradient, FigmaColor, FigmaGradientStop } from '../types';
import { GRADIENT_TRANSFORMS } from '../config/tokens';
import { parseColor } from '../utils/colors';

type GradientType = 'linear' | 'radial' | 'conic';
type GradientDirection = keyof typeof GRADIENT_TRANSFORMS;

interface GradientConfig {
  type: GradientType;
  direction?: GradientDirection;
  angle?: number;
  stops: {
    color: string;
    position?: number;
    type: 'from' | 'via' | 'to';
  }[];
}

function parseGradientConfig(value: string): GradientConfig {
  const parts = value.split(' ');
  const config: GradientConfig = {
    type: 'linear',
    stops: []
  };

  console.log(parts);

  parts.forEach(part => {
    // 그라디언트 타입 및 방향 파싱
    if (part.startsWith('bg-')) {
      if (part.startsWith('bg-linear-')) {
        config.type = 'linear';
        const dirOrAngle = part.replace('bg-linear-', '');
        if (dirOrAngle.startsWith('[') && dirOrAngle.endsWith(']')) {
          // 커스텀 각도
          const angle = parseFloat(dirOrAngle.slice(1, -1));
          if (!isNaN(angle)) {
            config.angle = angle;
          }
        } else if (dirOrAngle.startsWith('to-')) {
          config.direction = dirOrAngle as GradientDirection;
        } else {
          // 숫자 각도
          const angle = parseFloat(dirOrAngle);
          if (!isNaN(angle)) {
            config.angle = angle;
          }
        }
      } else if (part === 'bg-radial') {
        config.type = 'radial';
      } else if (part.startsWith('bg-conic-')) {
        config.type = 'conic';
        const angle = part.replace('bg-conic-', '');
        if (angle.startsWith('[') && angle.endsWith(']')) {
          const value = parseFloat(angle.slice(1, -1));
          if (!isNaN(value)) {
            config.angle = value;
          }
        } else {
          const value = parseFloat(angle);
          if (!isNaN(value)) {
            config.angle = value;
          }
        }
      } else if (part.startsWith('bg-conic')) {
        config.type = 'conic';
      }
    }
    
    // 색상 중지점 파싱
    if (part.startsWith('from-[')) {
      const color = part.match(/from-\[(.*?)\]/)?.[1];
      if (color) {
        config.stops.push({ color, type: 'from' });
      }
    } else if (part.startsWith('from-')) {
      const color = part.replace('from-', '');
      if (color) {
        config.stops.push({ color, type: 'from' });
      }
    } else if (part.startsWith('via-[')) {
      const color = part.match(/via-\[(.*?)\]/)?.[1];
      if (color) {
        config.stops.push({ color, type: 'via' });
      }
    } else if (part.startsWith('via-')) {
      const color = part.replace('via-', '');
      if (color) {
        config.stops.push({ color, type: 'via' });
      }
    } else if (part.startsWith('to-[')) {
      const color = part.match(/to-\[(.*?)\]/)?.[1];
      if (color) {
        config.stops.push({ color, type: 'to' });
      }
    } else if (part.startsWith('to-')) {
      const color = part.replace('to-', '');
      if (color) {
        config.stops.push({ color, type: 'to' });
      }
    }
  });

  return config;
}

function createGradientStops(config: GradientConfig): FigmaGradientStop[] {
  const stops: FigmaGradientStop[] = [];
  const totalStops = config.stops.length;

  config.stops.forEach((stop, index) => {
    const color = parseColor(stop.color);
    let position: number;

    switch (stop.type) {
      case 'from':
        position = 0;
        break;
      case 'via':
        position = (index / (totalStops - 1)) || 0.5;
        break;
      case 'to':
        position = 1;
        break;
      default:
        position = index / (totalStops - 1);
    }

    stops.push({ position, color });
  });

  // 기본 색상 추가 (stops가 비어있는 경우)
  if (stops.length === 0) {
    stops.push(
      { position: 0, color: { r: 0, g: 0, b: 0 } },
      { position: 1, color: { r: 0, g: 0, b: 0 } }
    );
  }

  return stops;
}

export function convertGradient(value: string): FigmaGradient {
  const config = parseGradientConfig(value);
  const gradientStops = createGradientStops(config);

  switch (config.type) {
    case 'radial':
      return {
        type: 'GRADIENT_RADIAL',
        gradientStops,
        centerX: 0.5,
        centerY: 0.5,
        radius: 0.5
      };
    case 'conic':
      return {
        type: 'GRADIENT_ANGULAR',
        gradientStops,
        centerX: 0.5,
        centerY: 0.5,
        rotation: config.angle || 0
      };
    default: // linear
      let transform: number[][];
      if (config.angle !== undefined) {
        const angleRad = (config.angle * Math.PI) / 180;
        transform = [
          [Math.cos(angleRad), -Math.sin(angleRad), 0],
          [Math.sin(angleRad), Math.cos(angleRad), 0]
        ];
      } else {
        const direction = config.direction || 'to-r';
        transform = GRADIENT_TRANSFORMS[direction].map(row => [...row]);
      }
      
      return {
        type: 'GRADIENT_LINEAR',
        gradientStops,
        gradientTransform: transform
      };
  }
} 
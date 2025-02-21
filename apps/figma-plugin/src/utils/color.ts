type RGBAValue = {
  r: number;
  g: number;
  b: number;
  a?: number;
};

export function hexToRGBA(hex: string): RGBAValue {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse alpha value if present (8 digit hex)
  const hasAlpha = hex.length === 8;
  const alpha = hasAlpha ? parseInt(hex.slice(6, 8), 16) / 255 : undefined;
  
  // Parse RGB values
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  
  return {
    r,
    g,
    b,
    ...(alpha !== undefined && { a: alpha })
  };
}
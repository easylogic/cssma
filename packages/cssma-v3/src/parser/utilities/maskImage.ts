// Tailwind mask-image utility parser
// https://tailwindcss.com/docs/mask-image

const linearRe = /^(-)?mask-linear-(\d+)$/;
const linearFromRe = /^mask-linear-from-(.+)$/;
const linearToRe = /^mask-linear-to-(.+)$/;
const radialFromRe = /^mask-radial-from-(.+)$/;
const radialToRe = /^mask-radial-to-(.+)$/;
const radialAtRe = /^mask-radial-at-(.+)$/;
const radialSizeRe = /^mask-radial-(closest-side|closest-corner|farthest-side|farthest-corner)$/;
const conicFromRe = /^mask-conic-from-(.+)$/;
const conicToRe = /^mask-conic-to-(.+)$/;
const conicAngleRe = /^mask-conic-(\d+)$/;
const xyFromToRe = /^mask-([xy])-(from|to)-(.+)$/;
const arbitraryRe = /^mask-\[(.+)\]$/;
const customVarRe = /^mask-\((--[\w-]+)\)$/;
const gradientArbitraryRe = /^mask-(linear|radial|conic)-\[(.+)\]$/;
const gradientCustomVarRe = /^mask-(linear|radial|conic)-\((--[\w-]+)\)$/;

export function parseMaskImage(token: string): any | null {
  if (token === 'mask-none') {
    return { type: 'mask-image', value: 'none', raw: token, arbitrary: false };
  }
  let m;
  if ((m = arbitraryRe.exec(token))) {
    return { type: 'mask-image', value: m[1], raw: token, arbitrary: true };
  }
  if ((m = customVarRe.exec(token))) {
    return { type: 'mask-image', value: `var(${m[1]})`, raw: token, arbitrary: true };
  }
  if ((m = gradientArbitraryRe.exec(token))) {
    return { type: 'mask-image', preset: m[1], value: m[2], raw: token, arbitrary: true };
  }
  if ((m = gradientCustomVarRe.exec(token))) {
    return { type: 'mask-image', preset: m[1], value: `var(${m[2]})`, raw: token, arbitrary: true };
  }
  if ((m = linearRe.exec(token))) {
    return { type: 'mask-image', preset: 'linear', angle: Number(m[2]) * (m[1] ? -1 : 1), raw: token, arbitrary: false };
  }
  if ((m = linearFromRe.exec(token))) {
    return { type: 'mask-image', preset: 'linear-from', value: m[1], raw: token, arbitrary: false };
  }
  if ((m = linearToRe.exec(token))) {
    return { type: 'mask-image', preset: 'linear-to', value: m[1], raw: token, arbitrary: false };
  }
  if ((m = xyFromToRe.exec(token))) {
    return { type: 'mask-image', preset: `${m[1]}-${m[2]}`, value: m[3], raw: token, arbitrary: false };
  }
  if ((m = radialFromRe.exec(token))) {
    return { type: 'mask-image', preset: 'radial-from', value: m[1], raw: token, arbitrary: false };
  }
  if ((m = radialToRe.exec(token))) {
    return { type: 'mask-image', preset: 'radial-to', value: m[1], raw: token, arbitrary: false };
  }
  if ((m = radialAtRe.exec(token))) {
    return { type: 'mask-image', preset: 'radial-at', value: m[1], raw: token, arbitrary: false };
  }
  if ((m = radialSizeRe.exec(token))) {
    return { type: 'mask-image', preset: m[1], raw: token, arbitrary: false };
  }
  if ((m = conicFromRe.exec(token))) {
    return { type: 'mask-image', preset: 'conic-from', value: m[1], raw: token, arbitrary: false };
  }
  if ((m = conicToRe.exec(token))) {
    return { type: 'mask-image', preset: 'conic-to', value: m[1], raw: token, arbitrary: false };
  }
  if ((m = conicAngleRe.exec(token))) {
    return { type: 'mask-image', preset: 'conic', angle: Number(m[1]), raw: token, arbitrary: false };
  }
  return null;
} 
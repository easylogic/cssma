// Tailwind scale utility parser
// https://tailwindcss.com/docs/scale

const scaleNoneRe = /^scale-none$/;
const scaleRe = /^(-?)scale-(\d+)$/;
const scaleCustomPropRe = /^scale-\((--[\w-]+)\)$/;
const scaleArbitraryRe = /^scale-\[(.+)\]$/;

const scaleXRe = /^(-?)scale-x-(\d+)$/;
const scaleXCustomPropRe = /^scale-x-\((--[\w-]+)\)$/;
const scaleXArbitraryRe = /^scale-x-\[(.+)\]$/;

const scaleYRe = /^(-?)scale-y-(\d+)$/;
const scaleYCustomPropRe = /^scale-y-\((--[\w-]+)\)$/;
const scaleYArbitraryRe = /^scale-y-\[(.+)\]$/;

const scaleZRe = /^(-?)scale-z-(\d+)$/;
const scaleZCustomPropRe = /^scale-z-\((--[\w-]+)\)$/;
const scaleZArbitraryRe = /^scale-z-\[(.+)\]$/;

const scale3dRe = /^scale-3d$/;

export function parseScale(token: string): any | null {
  if (scaleNoneRe.test(token)) {
    return { type: 'scale', value: 'none', raw: token, preset: 'none', arbitrary: false };
  }
  if (scale3dRe.test(token)) {
    return { type: 'scale-3d', value: 'var(--tw-scale-x) var(--tw-scale-y) var(--tw-scale-z)', raw: token, preset: '3d', arbitrary: false };
  }
  let m;
  if ((m = scaleRe.exec(token))) {
    const negative = m[1] === '-';
    return {
      type: 'scale',
      value: negative ? `calc(${m[2]}% * -1) calc(${m[2]}% * -1)` : `${m[2]}% ${m[2]}%`,
      raw: token,
      negative,
      arbitrary: false,
    };
  }
  if ((m = scaleCustomPropRe.exec(token))) {
    return {
      type: 'scale',
      value: `var(${m[1]}) var(${m[1]})`,
      raw: token,
      customProperty: true,
      arbitrary: false,
    };
  }
  if ((m = scaleArbitraryRe.exec(token))) {
    return {
      type: 'scale',
      value: m[1],
      raw: token,
      arbitrary: true,
    };
  }
  // scale-x
  if ((m = scaleXRe.exec(token))) {
    const negative = m[1] === '-';
    return {
      type: 'scale-x',
      value: negative ? `calc(${m[2]}% * -1) var(--tw-scale-y)` : `${m[2]}% var(--tw-scale-y)`,
      raw: token,
      negative,
      arbitrary: false,
    };
  }
  if ((m = scaleXCustomPropRe.exec(token))) {
    return {
      type: 'scale-x',
      value: `var(${m[1]}) var(--tw-scale-y)`,
      raw: token,
      customProperty: true,
      arbitrary: false,
    };
  }
  if ((m = scaleXArbitraryRe.exec(token))) {
    return {
      type: 'scale-x',
      value: `${m[1]} var(--tw-scale-y)`,
      raw: token,
      arbitrary: true,
    };
  }
  // scale-y
  if ((m = scaleYRe.exec(token))) {
    const negative = m[1] === '-';
    return {
      type: 'scale-y',
      value: negative ? `var(--tw-scale-x) calc(${m[2]}% * -1)` : `var(--tw-scale-x) ${m[2]}%`,
      raw: token,
      negative,
      arbitrary: false,
    };
  }
  if ((m = scaleYCustomPropRe.exec(token))) {
    return {
      type: 'scale-y',
      value: `var(--tw-scale-x) var(${m[1]})`,
      raw: token,
      customProperty: true,
      arbitrary: false,
    };
  }
  if ((m = scaleYArbitraryRe.exec(token))) {
    return {
      type: 'scale-y',
      value: `var(--tw-scale-x) ${m[1]}`,
      raw: token,
      arbitrary: true,
    };
  }
  // scale-z
  if ((m = scaleZRe.exec(token))) {
    const negative = m[1] === '-';
    return {
      type: 'scale-z',
      value: negative ? `var(--tw-scale-x) var(--tw-scale-y) calc(${m[2]}% * -1)` : `var(--tw-scale-x) var(--tw-scale-y) ${m[2]}%`,
      raw: token,
      negative,
      arbitrary: false,
    };
  }
  if ((m = scaleZCustomPropRe.exec(token))) {
    return {
      type: 'scale-z',
      value: `var(--tw-scale-x) var(--tw-scale-y) var(${m[1]})`,
      raw: token,
      customProperty: true,
      arbitrary: false,
    };
  }
  if ((m = scaleZArbitraryRe.exec(token))) {
    return {
      type: 'scale-z',
      value: `var(--tw-scale-x) var(--tw-scale-y) ${m[1]}`,
      raw: token,
      arbitrary: true,
    };
  }
  return null;
} 
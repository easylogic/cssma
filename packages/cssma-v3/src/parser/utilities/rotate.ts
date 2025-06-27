// Tailwind rotate utility parser
// https://tailwindcss.com/docs/rotate

const rotateNoneRe = /^rotate-none$/;
const rotateRe = /^(-?)rotate-(\d+)$/;
const rotateCustomPropRe = /^rotate-\((--[\w-]+)\)$/;
const rotateArbitraryRe = /^rotate-\[(.+)\]$/;

const rotateXRe = /^(-?)rotate-x-(\d+)$/;
const rotateXCustomPropRe = /^rotate-x-\((--[\w-]+)\)$/;
const rotateXArbitraryRe = /^rotate-x-\[(.+)\]$/;

const rotateYRe = /^(-?)rotate-y-(\d+)$/;
const rotateYCustomPropRe = /^rotate-y-\((--[\w-]+)\)$/;
const rotateYArbitraryRe = /^rotate-y-\[(.+)\]$/;

const rotateZRe = /^(-?)rotate-z-(\d+)$/;
const rotateZCustomPropRe = /^rotate-z-\((--[\w-]+)\)$/;
const rotateZArbitraryRe = /^rotate-z-\[(.+)\]$/;

export function parseRotate(token: string): any | null {
  if (rotateNoneRe.test(token)) {
    return { type: 'rotate', value: 'none', raw: token, preset: 'none', arbitrary: false };
  }
  let m;
  if ((m = rotateRe.exec(token))) {
    const negative = m[1] === '-';
    return {
      type: 'rotate',
      value: negative ? `calc(${m[2]}deg * -1)` : `${m[2]}deg`,
      raw: token,
      negative,
      arbitrary: false,
    };
  }
  if ((m = rotateCustomPropRe.exec(token))) {
    return {
      type: 'rotate',
      value: `var(${m[1]})`,
      raw: token,
      customProperty: true,
      arbitrary: false,
    };
  }
  if ((m = rotateArbitraryRe.exec(token))) {
    return {
      type: 'rotate',
      value: m[1],
      raw: token,
      arbitrary: true,
    };
  }
  // rotate-x
  if ((m = rotateXRe.exec(token))) {
    const negative = m[1] === '-';
    return {
      type: 'rotate-x',
      value: negative ? `-${m[2]}deg` : `${m[2]}deg`,
      raw: token,
      negative,
      arbitrary: false,
    };
  }
  if ((m = rotateXCustomPropRe.exec(token))) {
    return {
      type: 'rotate-x',
      value: `var(${m[1]})`,
      raw: token,
      customProperty: true,
      arbitrary: false,
    };
  }
  if ((m = rotateXArbitraryRe.exec(token))) {
    return {
      type: 'rotate-x',
      value: m[1],
      raw: token,
      arbitrary: true,
    };
  }
  // rotate-y
  if ((m = rotateYRe.exec(token))) {
    const negative = m[1] === '-';
    return {
      type: 'rotate-y',
      value: negative ? `-${m[2]}deg` : `${m[2]}deg`,
      raw: token,
      negative,
      arbitrary: false,
    };
  }
  if ((m = rotateYCustomPropRe.exec(token))) {
    return {
      type: 'rotate-y',
      value: `var(${m[1]})`,
      raw: token,
      customProperty: true,
      arbitrary: false,
    };
  }
  if ((m = rotateYArbitraryRe.exec(token))) {
    return {
      type: 'rotate-y',
      value: m[1],
      raw: token,
      arbitrary: true,
    };
  }
  // rotate-z
  if ((m = rotateZRe.exec(token))) {
    const negative = m[1] === '-';
    return {
      type: 'rotate-z',
      value: negative ? `-${m[2]}deg` : `${m[2]}deg`,
      raw: token,
      negative,
      arbitrary: false,
    };
  }
  if ((m = rotateZCustomPropRe.exec(token))) {
    return {
      type: 'rotate-z',
      value: `var(${m[1]})`,
      raw: token,
      customProperty: true,
      arbitrary: false,
    };
  }
  if ((m = rotateZArbitraryRe.exec(token))) {
    return {
      type: 'rotate-z',
      value: m[1],
      raw: token,
      arbitrary: true,
    };
  }
  return null;
} 
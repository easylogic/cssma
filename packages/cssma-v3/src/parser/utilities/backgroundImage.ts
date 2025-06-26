// Tailwind background-image utility parser (full v4.1 spec)
// https://tailwindcss.com/docs/background-image

const directions = [
  't', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl'
];

export function parseBackgroundImage(token: string): any | null {
  // bg-none
  if (token === 'bg-none') {
    return { type: 'background-image', preset: 'none', raw: token, arbitrary: false };
  }
  // bg-[<arbitrary-value>]
  const arbitrary = token.match(/^bg-\[(.+)]$/);
  if (arbitrary) {
    return { type: 'background-image', preset: arbitrary[1], raw: token, arbitrary: true };
  }
  // bg-(image:<custom-property>)
  const imageVar = token.match(/^bg-\(image:(--[a-zA-Z0-9-_]+)\)$/);
  if (imageVar) {
    return { type: 'background-image', preset: `image:${imageVar[1]}`, raw: token, arbitrary: true };
  }
  // bg-gradient-to-{dir}
  const gradTo = token.match(/^bg-gradient-to-([a-z]{1,2})$/);
  if (gradTo && directions.includes(gradTo[1])) {
    return { type: 'background-image', preset: `gradient-to-${gradTo[1]}`, raw: token, arbitrary: false };
  }
  // bg-(--custom)
  const customProp = token.match(/^bg-\((--[a-zA-Z0-9-_]+)\)$/);
  if (customProp) {
    return { type: 'background-image', preset: customProp[1], raw: token, arbitrary: true };
  }
  // bg-linear-to-{dir}
  const linearTo = token.match(/^bg-linear-to-([a-z]{1,2})$/);
  if (linearTo && directions.includes(linearTo[1])) {
    return { type: 'background-image', preset: `linear-to-${linearTo[1]}`, raw: token, arbitrary: false };
  }
  // bg-linear-{angle} / -bg-linear-{angle}
  const gradAngle = token.match(/^-?bg-linear-([0-9]{1,3})$/);
  if (gradAngle) {
    return { type: 'background-image', preset: `${token.startsWith('-') ? '-' : ''}linear-${gradAngle[1]}`, raw: token, arbitrary: false };
  }
  // bg-linear-(<custom-property>)
  const gradVar = token.match(/^bg-linear-\((--[a-zA-Z0-9-_]+)\)$/);
  if (gradVar) {
    return { type: 'background-image', preset: `linear:var(${gradVar[1]})`, raw: token, arbitrary: true };
  }
  // bg-linear-[<value>]
  const gradArb = token.match(/^bg-linear-\[(.+)]$/);
  if (gradArb) {
    return { type: 'background-image', preset: `linear:${gradArb[1]}`, raw: token, arbitrary: true };
  }
  // bg-radial
  if (token === 'bg-radial') {
    return { type: 'background-image', preset: 'radial', raw: token, arbitrary: false };
  }
  // bg-radial-(<custom-property>)
  const radialVar = token.match(/^bg-radial-\((--[a-zA-Z0-9-_]+)\)$/);
  if (radialVar) {
    return { type: 'background-image', preset: `radial:var(${radialVar[1]})`, raw: token, arbitrary: true };
  }
  // bg-radial-[<value>]
  const radialArb = token.match(/^bg-radial-\[(.+)]$/);
  if (radialArb) {
    return { type: 'background-image', preset: `radial:${radialArb[1]}`, raw: token, arbitrary: true };
  }
  // bg-conic-{angle} / -bg-conic-{angle}
  const conicAngle = token.match(/^-?bg-conic-([0-9]{1,3})$/);
  if (conicAngle) {
    return { type: 'background-image', preset: `${token.startsWith('-') ? '-' : ''}conic-${conicAngle[1]}`, raw: token, arbitrary: false };
  }
  // bg-conic-(<custom-property>)
  const conicVar = token.match(/^bg-conic-\((--[a-zA-Z0-9-_]+)\)$/);
  if (conicVar) {
    return { type: 'background-image', preset: `conic:var(${conicVar[1]})`, raw: token, arbitrary: true };
  }
  // bg-conic-[<value>]
  const conicArb = token.match(/^bg-conic-\[(.+)]$/);
  if (conicArb) {
    return { type: 'background-image', preset: `conic:${conicArb[1]}`, raw: token, arbitrary: true };
  }
  return null;
} 
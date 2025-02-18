import { Collection } from '../types';

export const SEMANTIC: Collection = {
  name: "Semantic",
  modes: ["Value"],
  values: {
    // Typography
    "text/body/xs": { Value: "{typography/size/xs}" },
    "text/body/sm": { Value: "{typography/size/sm}" },
    "text/body/md": { Value: "{typography/size/md}" },
    "text/body/lg": { Value: "{typography/size/lg}" },
    "text/heading/sm": { Value: "{typography/size/xl}" },
    "text/heading/md": { Value: "{typography/size/2xl}" },
    "text/heading/lg": { Value: "{typography/size/3xl}" },
    "text/heading/xl": { Value: "{typography/size/4xl}" },

    // Component Sizes
    "component/height/compact": { Value: "{size/height/xs}" },
    "component/height/default": { Value: "{size/height/sm}" },
    "component/height/large": { Value: "{size/height/md}" },
    "component/height/xlarge": { Value: "{size/height/lg}" },

    // Icon Sizes
    "icon/size/inline": { Value: "{size/icon/sm}" },
    "icon/size/default": { Value: "{size/icon/md}" },
    "icon/size/large": { Value: "{size/icon/lg}" },
    "icon/size/hero": { Value: "{size/icon/xl}" },

    // Border Radius
    "shape/rounded/none": { Value: "{radius/none}" },
    "shape/rounded/sm": { Value: "{radius/xs}" },
    "shape/rounded/md": { Value: "{radius/sm}" },
    "shape/rounded/lg": { Value: "{radius/md}" },
    "shape/rounded/pill": { Value: "{radius/full}" },

    // Spacing
    "space/inline/xs": { Value: "{spacing/2}" },
    "space/inline/sm": { Value: "{spacing/4}" },
    "space/inline/md": { Value: "{spacing/8}" },
    "space/inline/lg": { Value: "{spacing/12}" },
    "space/stack/xs": { Value: "{spacing/4}" },
    "space/stack/sm": { Value: "{spacing/8}" },
    "space/stack/md": { Value: "{spacing/16}" },
    "space/stack/lg": { Value: "{spacing/24}" },
    "space/layout/xs": { Value: "{spacing/16}" },
    "space/layout/sm": { Value: "{spacing/24}" },
    "space/layout/md": { Value: "{spacing/32}" },
    "space/layout/lg": { Value: "{spacing/48}" },

    // Border Widths
    "border/width/none": { Value: "{borderWidth/none}" },
    "border/width/default": { Value: "{borderWidth/thin}" },
    "border/width/heavy": { Value: "{borderWidth/thick}" },

    // Colors - Text
    "text/color/default": { Value: "{gray/900/light}" },
    "text/color/secondary": { Value: "{gray/500/light}" },
    "text/color/disabled": { Value: "{gray/300/light}" },
    "text/color/inverse": { Value: "{gray/50/light}" },

    // Colors - Status
    "status/info/default": { Value: "{blue/500/light}" },
    "status/info/hover": { Value: "{blue/600/light}" },
    "status/info/pressed": { Value: "{blue/700/light}" },
    "status/info/ghost/hover": { Value: "{bluealpha/500/light/16}" },
    "status/info/ghost/pressed": { Value: "{bluealpha/500/light/32}" },

    "status/success/default": { Value: "{green/500/light}" },
    "status/success/hover": { Value: "{green/600/light}" },
    "status/success/pressed": { Value: "{green/700/light}" },
    "status/success/ghost/hover": { Value: "{color/success/ghost/hover/light}" },
    "status/success/ghost/pressed": { Value: "{color/success/ghost/pressed/light}" },

    "status/warning/default": { Value: "{yellow/500/light}" },
    "status/warning/hover": { Value: "{yellow/600/light}" },
    "status/warning/pressed": { Value: "{yellow/700/light}" },
    "status/warning/ghost/hover": { Value: "{color/warning/ghost/hover/light}" },
    "status/warning/ghost/pressed": { Value: "{color/warning/ghost/pressed/light}" },

    "status/error/default": { Value: "{red/500/light}" },
    "status/error/hover": { Value: "{red/600/light}" },
    "status/error/pressed": { Value: "{red/700/light}" },
    "status/error/ghost/hover": { Value: "{color/error/ghost/hover/light}" },
    "status/error/ghost/pressed": { Value: "{color/error/ghost/pressed/light}" },

    // Colors - Surface
    "surface/color/default": { Value: "{gray/50/light}" },
    "surface/color/hover": { Value: "{gray/100/light}" },
    "surface/color/pressed": { Value: "{gray/200/light}" },
    "surface/color/disabled": { Value: "{gray/100/light}" },
    "surface/color/transparent": { Value: "{color/transparent}" }
  }
} as const; 
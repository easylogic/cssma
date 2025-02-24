import { Collection } from '../types';

export const SEMANTIC: Collection = {
  name: "Semantic",
  modes: ["Value"],
  values: {
    // Typography
    "text/body/2xs": { Value: "{typography/size/2xs}" },
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

    // Text Colors
    "text/color/default": { Value: "{color/text/default}" },
    "text/color/secondary": { Value: "{color/text/subtle}" },
    "text/color/subtle": { Value: "{color/text/subtle}" },
    "text/color/muted": { Value: "{color/text/muted}" },
    "text/color/disabled": { Value: "{color/text/disabled}" },
    "text/color/inverse": { Value: "{color/text/onAccent}" },

    // Surface Colors
    "surface/color/default": { Value: "{color/background/default}" },
    "surface/color/hover": { Value: "{color/background/subtle}" },
    "surface/color/pressed": { Value: "{color/background/muted}" },
    "surface/color/disabled": { Value: "{color/background/emphasized}" },
    "surface/color/transparent": { Value: "{color/transparent}" },
    "surface/color/border": { Value: "{color/border/default}" },
    "surface/color/border/hover": { Value: "{color/border/emphasized}" },
    "surface/color/border/pressed": { Value: "{color/border/emphasized}" },
    "surface/color/border/disabled": { Value: "{color/border/subtle}" },

    // Border Colors
    "border/color/default": { Value: "{color/border/default}" },
    "border/color/hover": { Value: "{color/border/emphasized}" },
    "border/color/pressed": { Value: "{color/border/emphasized}" },
    "border/color/disabled": { Value: "{color/border/subtle}" },

    // Component Border Colors
    "component/base/border/color/default": { Value: "{color/border/default}" },
    "component/base/border/color/hover": { Value: "{color/border/emphasized}" },
    "component/base/border/color/pressed": { Value: "{color/border/emphasized}" },
    "component/base/border/color/disabled": { Value: "{color/border/subtle}" },

    // Status Colors - Neutral
    "status/neutral/default": { Value: "{color/action/secondary/default}" },
    "status/neutral/hover": { Value: "{color/action/secondary/hover}" },
    "status/neutral/pressed": { Value: "{color/action/secondary/pressed}" },
    "status/neutral/disabled": { Value: "{color/action/secondary/disabled}" },
    "status/neutral/ghost/hover": { Value: "{color/action/secondary/ghost/hover}" },
    "status/neutral/ghost/pressed": { Value: "{color/action/secondary/ghost/pressed}" },

    // Status Colors - Info
    "status/info/default": { Value: "{color/action/primary/default}" },
    "status/info/hover": { Value: "{color/action/primary/hover}" },
    "status/info/pressed": { Value: "{color/action/primary/pressed}" },
    "status/info/disabled": { Value: "{color/action/primary/disabled}" },
    "status/info/ghost/hover": { Value: "{color/action/primary/ghost/hover}" },
    "status/info/ghost/pressed": { Value: "{color/action/primary/ghost/pressed}" },

    // Status Colors - Success
    "status/success/default": { Value: "{color/status/success/default}" },
    "status/success/hover": { Value: "{color/status/success/hover}" },
    "status/success/pressed": { Value: "{color/status/success/pressed}" },
    "status/success/disabled": { Value: "{color/action/secondary/disabled}" },
    "status/success/ghost/hover": { Value: "{color/status/success/ghost/hover}" },
    "status/success/ghost/pressed": { Value: "{color/status/success/ghost/pressed}" },

    // Status Colors - Warning
    "status/warning/default": { Value: "{color/status/warning/default}" },
    "status/warning/hover": { Value: "{color/status/warning/hover}" },
    "status/warning/pressed": { Value: "{color/status/warning/pressed}" },
    "status/warning/disabled": { Value: "{color/action/secondary/disabled}" },
    "status/warning/ghost/hover": { Value: "{color/status/warning/ghost/hover}" },
    "status/warning/ghost/pressed": { Value: "{color/status/warning/ghost/pressed}" },

    // Status Colors - Error
    "status/error/default": { Value: "{color/status/error/default}" },
    "status/error/hover": { Value: "{color/status/error/hover}" },
    "status/error/pressed": { Value: "{color/status/error/pressed}" },
    "status/error/disabled": { Value: "{color/action/secondary/disabled}" },
    "status/error/ghost/hover": { Value: "{color/status/error/ghost/hover}" },
    "status/error/ghost/pressed": { Value: "{color/status/error/ghost/pressed}" },

    // Status Colors - Secondary
    "status/secondary/default": { Value: "{color/action/secondary/default}" },
    "status/secondary/hover": { Value: "{color/action/secondary/hover}" },
    "status/secondary/pressed": { Value: "{color/action/secondary/pressed}" },
    "status/secondary/disabled": { Value: "{color/action/secondary/disabled}" },
    "status/secondary/ghost/hover": { Value: "{color/action/secondary/ghost/hover}" },
    "status/secondary/ghost/pressed": { Value: "{color/action/secondary/ghost/pressed}" },

    // Common Component Patterns
    "component/base/height/xs": { Value: "{size/height/xs}" },
    "component/base/height/sm": { Value: "{size/height/sm}" },
    "component/base/height/md": { Value: "{size/height/md}" },
    "component/base/height/lg": { Value: "{size/height/lg}" },
    "component/base/height/xl": { Value: "{size/height/xl}" },

    "component/base/gap/xs": { Value: "{spacing/2}" },
    "component/base/gap/sm": { Value: "{spacing/4}" },
    "component/base/gap/md": { Value: "{spacing/8}" },
    "component/base/gap/lg": { Value: "{spacing/12}" },
    "component/base/gap/xl": { Value: "{spacing/16}" },

    "component/base/padding/none": { Value: "{spacing/none}" },
    "component/base/padding/xs": { Value: "{spacing/2}" },
    "component/base/padding/sm": { Value: "{spacing/4}" },
    "component/base/padding/md": { Value: "{spacing/8}" },
    "component/base/padding/lg": { Value: "{spacing/12}" },
    "component/base/padding/xl": { Value: "{spacing/16}" },

    "component/base/icon/xs": { Value: "{size/icon/xs}" },
    "component/base/icon/sm": { Value: "{size/icon/sm}" },
    "component/base/icon/md": { Value: "{size/icon/md}" },
    "component/base/icon/lg": { Value: "{size/icon/lg}" },
    "component/base/icon/xl": { Value: "{size/icon/xl}" },

    "component/base/radius/none": { Value: "{radius/none}" },
    "component/base/radius/sm": { Value: "{radius/xs}" },
    "component/base/radius/md": { Value: "{radius/sm}" },
    "component/base/radius/lg": { Value: "{radius/md}" },
    "component/base/radius/pill": { Value: "{radius/full}" },
    "component/base/radius/full": { Value: "{radius/full}" },

    "component/base/border/width/thin": { Value: "{borderWidth/thin}" },
    "component/base/border/width/thick": { Value: "{borderWidth/thick}" },
    "component/base/border/width/thicker": { Value: "{borderWidth/thickest}" }
  }
} as const; 
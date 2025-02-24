import { Collection } from '../types';

export const COLOR: Collection = {
  name: "Color",
  modes: ["Light", "Dark"],
  values: {
    // Base Background Colors
    "color/background/default": {
      Light: "{color/white}",
      Dark: "{gray/900/dark}"
    },
    "color/background/subtle": {
      Light: "{gray/100/light}",
      Dark: "{gray/800/dark}"
    },
    "color/background/muted": {
      Light: "{gray/200/light}",
      Dark: "{gray/700/dark}"
    },
    "color/background/emphasized": {
      Light: "{gray/300/light}",
      Dark: "{gray/600/dark}"
    },

    // Base Text Colors
    "color/text/default": {
      Light: "{gray/900/light}",
      Dark: "{gray/50/dark}"
    },
    "color/text/subtle": {
      Light: "{gray/700/light}",
      Dark: "{gray/300/dark}"
    },
    "color/text/muted": {
      Light: "{gray/500/light}",
      Dark: "{gray/500/dark}"
    },
    "color/text/disabled": {
      Light: "{gray/400/light}",
      Dark: "{gray/600/dark}"
    },
    "color/text/onAccent": {
      Light: "{gray/50/light}",
      Dark: "{gray/900/dark}"
    },

    // Base Border Colors
    "color/border/default": {
      Light: "{gray/200/light}",
      Dark: "{gray/700/dark}"
    },
    "color/border/subtle": {
      Light: "{gray/100/light}",
      Dark: "{gray/800/dark}"
    },
    "color/border/emphasized": {
      Light: "{gray/300/light}",
      Dark: "{gray/600/dark}"
    },

    // Action Colors - Primary
    "color/action/primary/default": {
      Light: "{blue/500/light}",
      Dark: "{blue/400/dark}"
    },
    "color/action/primary/hover": {
      Light: "{blue/600/light}",
      Dark: "{blue/300/dark}"
    },
    "color/action/primary/pressed": {
      Light: "{blue/700/light}",
      Dark: "{blue/200/dark}"
    },
    "color/action/primary/disabled": {
      Light: "{blue/200/light}",
      Dark: "{blue/800/dark}"
    },
    "color/action/primary/ghost/hover": {
      Light: "{bluealpha/500/light/16}",
      Dark: "{bluealpha/500/dark/16}"
    },
    "color/action/primary/ghost/pressed": {
      Light: "{bluealpha/500/light/32}",
      Dark: "{bluealpha/500/dark/32}"
    },

    // Action Colors - Secondary
    "color/action/secondary/default": {
      Light: "{gray/700/light}",
      Dark: "{gray/300/dark}"
    },
    "color/action/secondary/hover": {
      Light: "{gray/800/light}",
      Dark: "{gray/200/dark}"
    },
    "color/action/secondary/pressed": {
      Light: "{gray/900/light}",
      Dark: "{gray/100/dark}"
    },
    "color/action/secondary/disabled": {
      Light: "{gray/200/light}",
      Dark: "{gray/800/dark}"
    },
    "color/action/secondary/ghost/hover": {
      Light: "{grayalpha/50/light/8}",
      Dark: "{grayalpha/50/dark/8}"
    },
    "color/action/secondary/ghost/pressed": {
      Light: "{grayalpha/50/light/16}",
      Dark: "{grayalpha/50/dark/16}"
    },

    // Status Colors - Success
    "color/status/success/default": {
      Light: "{green/500/light}",
      Dark: "{green/400/dark}"
    },
    "color/status/success/hover": {
      Light: "{green/600/light}",
      Dark: "{green/300/dark}"
    },
    "color/status/success/pressed": {
      Light: "{green/700/light}",
      Dark: "{green/200/dark}"
    },
    "color/status/success/ghost/hover": {
      Light: "{greenalpha/500/light/16}",
      Dark: "{greenalpha/500/dark/16}"
    },
    "color/status/success/ghost/pressed": {
      Light: "{greenalpha/500/light/32}",
      Dark: "{greenalpha/500/dark/32}"
    },

    // Status Colors - Warning
    "color/status/warning/default": {
      Light: "{yellow/500/light}",
      Dark: "{yellow/400/dark}"
    },
    "color/status/warning/hover": {
      Light: "{yellow/600/light}",
      Dark: "{yellow/300/dark}"
    },
    "color/status/warning/pressed": {
      Light: "{yellow/700/light}",
      Dark: "{yellow/200/dark}"
    },
    "color/status/warning/ghost/hover": {
      Light: "{yellowalpha/500/light/16}",
      Dark: "{yellowalpha/500/dark/16}"
    },
    "color/status/warning/ghost/pressed": {
      Light: "{yellowalpha/500/light/32}",
      Dark: "{yellowalpha/500/dark/32}"
    },

    // Status Colors - Error
    "color/status/error/default": {
      Light: "{red/500/light}",
      Dark: "{red/400/dark}"
    },
    "color/status/error/hover": {
      Light: "{red/600/light}",
      Dark: "{red/300/dark}"
    },
    "color/status/error/pressed": {
      Light: "{red/700/light}",
      Dark: "{red/200/dark}"
    },
    "color/status/error/ghost/hover": {
      Light: "{redalpha/500/light/16}",
      Dark: "{redalpha/500/dark/16}"
    },
    "color/status/error/ghost/pressed": {
      Light: "{redalpha/500/light/32}",
      Dark: "{redalpha/500/dark/32}"
    }
  }
}; 
import { Collection } from '../types';

export const COLOR: Collection = {
  name: "Color",
  modes: ["Light", "Dark"],
  values: {
    // Background colors
    "semantic/bg/default": {
      Light: "{primitive/gray/50/light}",
      Dark: "{primitive/gray/900/dark}"
    },
    "semantic/bg/subtle": {
      Light: "{primitive/gray/100/light}",
      Dark: "{primitive/gray/800/dark}"
    },
    "semantic/bg/muted": {
      Light: "{primitive/gray/200/light}",
      Dark: "{primitive/gray/700/dark}"
    },
    "semantic/bg/emphasized": {
      Light: "{primitive/gray/300/light}",
      Dark: "{primitive/gray/600/dark}"
    },

    // Text colors
    "semantic/text/default": {
      Light: "{primitive/gray/900/light}",
      Dark: "{primitive/gray/50/dark}"
    },
    "semantic/text/subtle": {
      Light: "{primitive/gray/700/light}",
      Dark: "{primitive/gray/300/dark}"
    },
    "semantic/text/muted": {
      Light: "{primitive/gray/500/light}",
      Dark: "{primitive/gray/500/dark}"
    },
    "semantic/text/disabled": {
      Light: "{primitive/gray/400/light}",
      Dark: "{primitive/gray/600/dark}"
    },
    "semantic/text/onAccent": {
      Light: "{primitive/gray/50/light}",
      Dark: "{primitive/gray/900/dark}"
    },

    // Border colors
    "semantic/border/default": {
      Light: "{primitive/gray/200/light}",
      Dark: "{primitive/gray/700/dark}"
    },
    "semantic/border/subtle": {
      Light: "{primitive/gray/100/light}",
      Dark: "{primitive/gray/800/dark}"
    },
    "semantic/border/emphasized": {
      Light: "{primitive/gray/300/light}",
      Dark: "{primitive/gray/600/dark}"
    },

    // Action colors - Primary
    "semantic/action/primary/default": {
      Light: "{primitive/blue/600/light}",
      Dark: "{primitive/blue/500/dark}"
    },
    "semantic/action/primary/hover": {
      Light: "{primitive/blue/700/light}",
      Dark: "{primitive/blue/400/dark}"
    },
    "semantic/action/primary/pressed": {
      Light: "{primitive/blue/800/light}",
      Dark: "{primitive/blue/300/dark}"
    },
    "semantic/action/primary/disabled": {
      Light: "{primitive/blue/200/light}",
      Dark: "{primitive/blue/800/dark}"
    },
    "semantic/action/primary/ghost/hover": {
      Light: "{primitive/bluealpha/500/light/16}",
      Dark: "{primitive/bluealpha/500/dark/16}"
    },
    "semantic/action/primary/ghost/pressed": {
      Light: "{primitive/bluealpha/500/light/32}",
      Dark: "{primitive/bluealpha/500/dark/32}"
    },

    // Action colors - Secondary
    "semantic/action/secondary/default": {
      Light: "{primitive/gray/600/light}",
      Dark: "{primitive/gray/400/dark}"
    },
    "semantic/action/secondary/hover": {
      Light: "{primitive/gray/700/light}",
      Dark: "{primitive/gray/300/dark}"
    },
    "semantic/action/secondary/pressed": {
      Light: "{primitive/gray/800/light}",
      Dark: "{primitive/gray/200/dark}"
    },
    "semantic/action/secondary/disabled": {
      Light: "{primitive/gray/200/light}",
      Dark: "{primitive/gray/800/dark}"
    },
    "semantic/action/secondary/ghost/hover": {
      Light: "{primitive/grayalpha/50/light/8}",
      Dark: "{primitive/grayalpha/50/dark/8}"
    },
    "semantic/action/secondary/ghost/pressed": {
      Light: "{primitive/grayalpha/50/light/16}",
      Dark: "{primitive/grayalpha/50/dark/16}"
    },

    // Status colors - Success
    "semantic/status/success/default": {
      Light: "{primitive/green/600/light}",
      Dark: "{primitive/green/500/dark}"
    },
    "semantic/status/success/hover": {
      Light: "{primitive/green/700/light}",
      Dark: "{primitive/green/400/dark}"
    },
    "semantic/status/success/pressed": {
      Light: "{primitive/green/800/light}",
      Dark: "{primitive/green/300/dark}"
    },

    // Status colors - Error (Danger)
    "semantic/status/error/default": {
      Light: "{primitive/red/600/light}",
      Dark: "{primitive/red/500/dark}"
    },
    "semantic/status/error/hover": {
      Light: "{primitive/red/700/light}",
      Dark: "{primitive/red/400/dark}"
    },
    "semantic/status/error/pressed": {
      Light: "{primitive/red/800/light}",
      Dark: "{primitive/red/300/dark}"
    },
    "semantic/status/error/ghost/hover": {
      Light: "{primitive/redalpha/500/light/16}",
      Dark: "{primitive/redalpha/500/dark/16}"
    },
    "semantic/status/error/ghost/pressed": {
      Light: "{primitive/redalpha/500/light/32}",
      Dark: "{primitive/redalpha/500/dark/32}"
    }
  }
}; 
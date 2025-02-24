import { Collection } from '../types';


export const PRIMITIVE: Collection = {
  name: "Primitive",
  modes: ["Value"],
  values: {
    // Gray scale
    "gray/50/light": { Value: "#FAFAFA" },  // #FAFAFA
    "gray/50/dark": { Value: "#1F1F1F" },   // #1F1F1F
    "gray/100/light": { Value: "#F5F5F5" }, // #F5F5F5
    "gray/100/dark": { Value: "#292929" },  // #292929
    "gray/200/light": { Value: "#EDEDED" }, // #EDEDED
    "gray/200/dark": { Value: "#333333" },  // #333333
    "gray/300/light": { Value: "#DEDEDE" }, // #DEDEDE
    "gray/300/dark": { Value: "#474747" },  // #474747
    "gray/400/light": { Value: "#BDBDBD" }, // #BDBDBD
    "gray/400/dark": { Value: "#616161" },  // #616161
    "gray/500/light": { Value: "#A3A3A3" }, // #A3A3A3
    "gray/500/dark": { Value: "#7A7A7A" },  // #7A7A7A
    "gray/600/light": { Value: "#858585" }, // #858585
    "gray/600/dark": { Value: "#999999" },  // #999999
    "gray/700/light": { Value: "#616161" }, // #616161
    "gray/700/dark": { Value: "#BDBDBD" },  // #BDBDBD
    "gray/800/light": { Value: "#424242" }, // #424242
    "gray/800/dark": { Value: "#DEDEDE" },  // #DEDEDE
    "gray/900/light": { Value: "#1F1F1F" }, // #1F1F1F
    "gray/900/dark": { Value: "#F5F5F5" },  // #F5F5F5

    // Blue scale
    "blue/50/light": { Value: "#F0F7FF" },  // #F0F7FF
    "blue/50/dark": { Value: "#0F1F3D" },   // #0F1F3D
    "blue/100/light": { Value: "#E1F0FF" }, // #E1F0FF
    "blue/100/dark": { Value: "#142952" },  // #142952
    "blue/200/light": { Value: "#C7E2FF" }, // #C7E2FF
    "blue/200/dark": { Value: "#1F3D7A" },  // #1F3D7A
    "blue/300/light": { Value: "#94CAFF" }, // #94CAFF
    "blue/300/dark": { Value: "#2952A3" },  // #2952A3
    "blue/400/light": { Value: "#61B0FF" }, // #61B0FF
    "blue/400/dark": { Value: "#3D7AE0" },  // #3D7AE0
    "blue/500/light": { Value: "#0077FF" }, // #0077FF
    "blue/500/dark": { Value: "#52A3FF" },  // #52A3FF
    "blue/600/light": { Value: "#006BE6" }, // #006BE6
    "blue/600/dark": { Value: "#7AC2FF" },  // #7AC2FF
    "blue/700/light": { Value: "#0059C2" }, // #0059C2
    "blue/700/dark": { Value: "#A3D9FF" },  // #A3D9FF
    "blue/800/light": { Value: "#004A9E" }, // #004A9E
    "blue/800/dark": { Value: "#C2E8FF" },  // #C2E8FF
    "blue/900/light": { Value: "#003D7A" }, // #003D7A
    "blue/900/dark": { Value: "#E1F5FF" },  // #E1F5FF

    // Red scale
    "red/50/light": { Value: "#FFF2F2" },   // #FFF2F2
    "red/50/dark": { Value: "#3D0F0F" },    // #3D0F0F
    "red/100/light": { Value: "#FFE6E6" },  // #FFE6E6
    "red/100/dark": { Value: "#521414" },   // #521414
    "red/200/light": { Value: "#FFD9D9" },  // #FFD9D9
    "red/200/dark": { Value: "#7A1F1F" },   // #7A1F1F
    "red/300/light": { Value: "#FCBABA" },  // #FCBABA
    "red/300/dark": { Value: "#A32929" },   // #A32929
    "red/400/light": { Value: "#FC9E9E" },  // #FC9E9E
    "red/400/dark": { Value: "#E03D3D" },   // #E03D3D
    "red/500/light": { Value: "#ED3B3B" },  // #ED3B3B
    "red/500/dark": { Value: "#FF5252" },   // #FF5252
    "red/600/light": { Value: "#D63535" },  // #D63535
    "red/600/dark": { Value: "#FF7A7A" },   // #FF7A7A
    "red/700/light": { Value: "#B32C2C" },  // #B32C2C
    "red/700/dark": { Value: "#FFA3A3" },   // #FFA3A3
    "red/800/light": { Value: "#912323" },  // #912323
    "red/800/dark": { Value: "#FFC2C2" },   // #FFC2C2
    "red/900/light": { Value: "#701C1C" },  // #701C1C
    "red/900/dark": { Value: "#FFE1E1" },   // #FFE1E1

    // Green scale
    "green/50/light": { Value: "#F0FAF0" },  // #F0FAF0
    "green/50/dark": { Value: "#0F3D0F" },   // #0F3D0F
    "green/100/light": { Value: "#E1F5E1" }, // #E1F5E1
    "green/100/dark": { Value: "#145214" },  // #145214
    "green/200/light": { Value: "#D1F0D1" }, // #D1F0D1
    "green/200/dark": { Value: "#1F7A1F" },  // #1F7A1F
    "green/300/light": { Value: "#B3E6B3" }, // #B3E6B3
    "green/300/dark": { Value: "#29A329" },  // #29A329
    "green/400/light": { Value: "#94DB94" }, // #94DB94
    "green/400/dark": { Value: "#3DE03D" },  // #3DE03D
    "green/500/light": { Value: "#33CC33" }, // #33CC33
    "green/500/dark": { Value: "#52FF52" },  // #52FF52
    "green/600/light": { Value: "#2EB82E" }, // #2EB82E
    "green/600/dark": { Value: "#7AFF7A" },  // #7AFF7A
    "green/700/light": { Value: "#269926" }, // #269926
    "green/700/dark": { Value: "#A3FFA3" },  // #A3FFA3
    "green/800/light": { Value: "#1F7D1F" }, // #1F7D1F
    "green/800/dark": { Value: "#C2FFC2" },  // #C2FFC2
    "green/900/light": { Value: "#176117" }, // #176117
    "green/900/dark": { Value: "#E1FFE1" },  // #E1FFE1

    // Yellow scale
    "yellow/50/light": { Value: "#FFF8F0" },  // #FFF8F0
    "yellow/50/dark": { Value: "#3D3D0F" },   // #3D3D0F
    "yellow/100/light": { Value: "#FFF4E6" }, // #FFF4E6
    "yellow/100/dark": { Value: "#525214" },  // #525214
    "yellow/200/light": { Value: "#FFEAD1" }, // #FFEAD1
    "yellow/200/dark": { Value: "#7A7A1F" },  // #7A7A1F
    "yellow/300/light": { Value: "#FFE0B3" }, // #FFE0B3
    "yellow/300/dark": { Value: "#A3A329" },  // #A3A329
    "yellow/400/light": { Value: "#FFCC94" }, // #FFCC94
    "yellow/400/dark": { Value: "#E0E03D" },  // #E0E03D
    "yellow/500/light": { Value: "#FFB861" }, // #FFB861
    "yellow/500/dark": { Value: "#FFB861" },  // #FFB861
    "yellow/600/light": { Value: "#EBA357" }, // #EBA357
    "yellow/600/dark": { Value: "#FFE07A" },  // #FFE07A
    "yellow/700/light": { Value: "#CC8F47" }, // #CC8F47
    "yellow/700/dark": { Value: "#FFF58F" },  // #FFF58F
    "yellow/800/light": { Value: "#A3703D" }, // #A3703D
    "yellow/800/dark": { Value: "#FFFFA3" },  // #FFFFA3
    "yellow/900/light": { Value: "#7A5229" }, // #7A5229
    "yellow/900/dark": { Value: "#FFFFE1" },  // #FFFFE1

    // Alpha variants
    "grayalpha/50/light/8": { Value: "#FAFAFA14" },   // #FAFAFA14
    "grayalpha/50/light/16": { Value: "#FAFAFA29" },  // #FAFAFA29
    "grayalpha/50/light/24": { Value: "#FAFAFA3D" },  // #FAFAFA3D
    "grayalpha/50/light/32": { Value: "#FAFAFA52" },  // #FAFAFA52
    "grayalpha/50/light/40": { Value: "#FAFAFA66" },  // #FAFAFA66

    "grayalpha/50/dark/8": { Value: "#1F1F1F14" },    // #1F1F1F14
    "grayalpha/50/dark/16": { Value: "#1F1F1F29" },   // #1F1F1F29
    "grayalpha/50/dark/24": { Value: "#1F1F1F3D" },   // #1F1F1F3D
    "grayalpha/50/dark/32": { Value: "#1F1F1F52" },   // #1F1F1F52
    "grayalpha/50/dark/40": { Value: "#1F1F1F66" },   // #1F1F1F66

    "bluealpha/500/light/16": { Value: "#0077FF29" }, // #0077FF29
    "bluealpha/500/light/24": { Value: "#0077FF3D" }, // #0077FF3D
    "bluealpha/500/light/32": { Value: "#0077FF52" }, // #0077FF52
    "bluealpha/500/light/40": { Value: "#0077FF66" }, // #0077FF66
    "bluealpha/500/dark/16": { Value: "#52A3FF29" },  // #52A3FF29
    "bluealpha/500/dark/24": { Value: "#52A3FF3D" },  // #52A3FF3D
    "bluealpha/500/dark/32": { Value: "#52A3FF52" },  // #52A3FF52
    "bluealpha/500/dark/40": { Value: "#52A3FF66" },  // #52A3FF66

    "redalpha/500/light/16": { Value: "#ED3B3B29", scopes: ['ALL_FILLS'] },  // #ED3B3B29
    "redalpha/500/light/32": { Value: "#ED3B3B52", scopes: ['ALL_FILLS'] },  // #ED3B3B52
    "redalpha/500/dark/16": { Value: "#FF525229", scopes: ['ALL_FILLS'] },   // #FF525229
    "redalpha/500/dark/32": { Value: "#FF525252", scopes: ['ALL_FILLS'] },   // #FF525252


    // Colors - Transparent
    "color/transparent": { Value: "#00000000", scopes: ['ALL_FILLS'] },

    // Colors - Base
    "color/white": { Value: "#FFFFFF", scopes: ['ALL_FILLS'] },               // #FFFFFF

    // Colors - Text
    "color/text/light": { Value: "#1F1F1F", scopes: ['TEXT_FILL'] },         // #1F1F1F
    "color/text/dark": { Value: "#F5F5F5", scopes: ['TEXT_FILL'] },          // #F5F5F5
    "color/text/disabled/light": { Value: "#A3A3A3", scopes: ['TEXT_FILL'] }, // #A3A3A3
    "color/text/disabled/dark": { Value: "#7A7A7A", scopes: ['TEXT_FILL'] },  // #7A7A7A

    // Colors - Status
    "color/info/ghost/hover/light": { Value: "#E1F0FF14", scopes: ['ALL_FILLS'] },
    "color/info/ghost/hover/dark": { Value: "#14295214", scopes: ['ALL_FILLS']  },
    "color/info/ghost/pressed/light": { Value: "#C7E2FF32", scopes: ['ALL_FILLS'] },
    "color/info/ghost/pressed/dark": { Value: "#1F3D7A32", scopes: ['ALL_FILLS'] },

    "color/success/ghost/hover/light": { Value: "#B3E6B314", scopes: ['ALL_FILLS'] },
    "color/success/ghost/hover/dark": { Value: "#14521414", scopes: ['ALL_FILLS'] },
    "color/success/ghost/pressed/light": { Value: "#94DB9432", scopes: ['ALL_FILLS'] },
    "color/success/ghost/pressed/dark": { Value: "#1F7A1F32", scopes: ['ALL_FILLS'] },

    "color/warning/ghost/hover/light": { Value: "#FFEAD114", scopes: ['ALL_FILLS'] },
    "color/warning/ghost/hover/dark": { Value: "#52521414", scopes: ['ALL_FILLS'] },
    "color/warning/ghost/pressed/light": { Value: "#FFD9D932", scopes: ['ALL_FILLS'] },
    "color/warning/ghost/pressed/dark": { Value: "#7A7A1F32", scopes: ['ALL_FILLS'] },

    "color/error/ghost/hover/light": { Value: "#FFE6E614", scopes: ['ALL_FILLS'] },
    "color/error/ghost/hover/dark": { Value: "#52141414", scopes: ['ALL_FILLS'] },
    "color/error/ghost/pressed/light": { Value: "#FFD9D932", scopes: ['ALL_FILLS'] },
    "color/error/ghost/pressed/dark": { Value: "#7A1F1F32", scopes: ['ALL_FILLS'] },

    // Colors - Background
    "color/bg/default/light": { Value: "#FFFFFF", scopes: ['ALL_FILLS'] },            // #FFFFFF
    "color/bg/default/dark": { Value: "#1F1F1F", scopes: ['ALL_FILLS'] },    // #1F1F1F
    "color/bg/hover/light": { Value: "#FAFAFA", scopes: ['ALL_FILLS'] },     // #FAFAFA
    "color/bg/hover/dark": { Value: "#292929", scopes: ['ALL_FILLS'] },      // #292929
    "color/bg/pressed/light": { Value: "#F5F5F5", scopes: ['ALL_FILLS'] },   // #F5F5F5
    "color/bg/pressed/dark": { Value: "#333333", scopes: ['ALL_FILLS'] },    // #333333
    "color/bg/disabled/light": { Value: "#F5F5F5", scopes: ['ALL_FILLS'] },  // #F5F5F5
    "color/bg/disabled/dark": { Value: "#292929", scopes: ['ALL_FILLS'] },   // #292929

    // Typography - Font Sizes
    "typography/size/2xs": { Value: 10, scopes: ['FONT_SIZE'] },
    "typography/size/xs": { Value: 12, scopes: ['FONT_SIZE'] },
    "typography/size/sm": { Value: 14, scopes: ['FONT_SIZE'] },
    "typography/size/md": { Value: 16, scopes: ['FONT_SIZE'] },
    "typography/size/lg": { Value: 18, scopes: ['FONT_SIZE'] },
    "typography/size/xl": { Value: 20, scopes: ['FONT_SIZE'] },
    "typography/size/2xl": { Value: 24, scopes: ['FONT_SIZE'] },
    "typography/size/3xl": { Value: 30, scopes: ['FONT_SIZE'] },
    "typography/size/4xl": { Value: 36, scopes: ['FONT_SIZE'] },

    // Typography - Line Heights
    "typography/lineHeight/2xs": { Value: 14, scopes: ['LINE_HEIGHT'] },
    "typography/lineHeight/xs": { Value: 16, scopes: ['LINE_HEIGHT'] },
    "typography/lineHeight/sm": { Value: 20, scopes: ['LINE_HEIGHT'] },
    "typography/lineHeight/md": { Value: 24, scopes: ['LINE_HEIGHT'] },
    "typography/lineHeight/lg": { Value: 28, scopes: ['LINE_HEIGHT'] },
    "typography/lineHeight/xl": { Value: 28, scopes: ['LINE_HEIGHT'] },
    "typography/lineHeight/2xl": { Value: 32, scopes: ['LINE_HEIGHT'] },
    "typography/lineHeight/3xl": { Value: 36, scopes: ['LINE_HEIGHT'] },
    "typography/lineHeight/4xl": { Value: 40, scopes: ['LINE_HEIGHT'] },

    // Sizes - Component Heights
    "size/height/xs": { Value: 24, scopes: ['WIDTH_HEIGHT'] },
    "size/height/sm": { Value: 32, scopes: ['WIDTH_HEIGHT'] },
    "size/height/md": { Value: 40, scopes: ['WIDTH_HEIGHT'] },
    "size/height/lg": { Value: 48, scopes: ['WIDTH_HEIGHT'] },
    "size/height/xl": { Value: 56, scopes: ['WIDTH_HEIGHT'] },

    // Sizes - Icon Sizes
    "size/icon/xs": { Value: 12, scopes: ['WIDTH_HEIGHT'] },
    "size/icon/sm": { Value: 16, scopes: ['WIDTH_HEIGHT'] },
    "size/icon/md": { Value: 20, scopes: ['WIDTH_HEIGHT'] },
    "size/icon/lg": { Value: 24, scopes: ['WIDTH_HEIGHT'] },
    "size/icon/xl": { Value: 32, scopes: ['WIDTH_HEIGHT'] },

    // Radii
    "radius/none": { Value: 0, scopes: ['CORNER_RADIUS'] },
    "radius/xs": { Value: 4, scopes: ['CORNER_RADIUS'] },
    "radius/sm": { Value: 6, scopes: ['CORNER_RADIUS'] },
    "radius/md": { Value: 8, scopes: ['CORNER_RADIUS'] },
    "radius/lg": { Value: 12, scopes: ['CORNER_RADIUS'] },
    "radius/xl": { Value: 16, scopes: ['CORNER_RADIUS'] },
    "radius/full": { Value: 9999, scopes: ['CORNER_RADIUS'] },

    // Spacing
    "spacing/none": { Value: 0, scopes: ['GAP'] },
    "spacing/2": { Value: 2, scopes: ['GAP'] },
    "spacing/4": { Value: 4, scopes: ['GAP'] },
    "spacing/8": { Value: 8, scopes: ['GAP'] },
    "spacing/12": { Value: 12, scopes: ['GAP'] },
    "spacing/16": { Value: 16, scopes: ['GAP'] },
    "spacing/20": { Value: 20, scopes: ['GAP'] },
    "spacing/24": { Value: 24, scopes: ['GAP'] },
    "spacing/32": { Value: 32, scopes: ['GAP'] },
    "spacing/40": { Value: 40, scopes: ['GAP'] },
    "spacing/48": { Value: 48, scopes: ['GAP'] },

    // Border Widths
    "borderWidth/none": { Value: 0, scopes: ['STROKE_FLOAT'] },
    "borderWidth/thin": { Value: 1, scopes: ['STROKE_FLOAT'] },
    "borderWidth/thick": { Value: 2, scopes: ['STROKE_FLOAT'] },
    "borderWidth/thicker": { Value: 3, scopes: ['STROKE_FLOAT'] },

    // Opacity
    "opacity/0": { Value: 0, scopes: ['OPACITY'] },
    "opacity/5": { Value: 0.05, scopes: ['OPACITY'] },
    "opacity/10": { Value: 0.1, scopes: ['OPACITY'] },
    "opacity/20": { Value: 0.2, scopes: ['OPACITY'] },
    "opacity/30": { Value: 0.3, scopes: ['OPACITY'] },
    "opacity/40": { Value: 0.4, scopes: ['OPACITY'] },
    "opacity/50": { Value: 0.5, scopes: ['OPACITY'] },
    "opacity/60": { Value: 0.6, scopes: ['OPACITY'] },
    "opacity/70": { Value: 0.7, scopes: ['OPACITY'] },
    "opacity/80": { Value: 0.8, scopes: ['OPACITY'] },
    "opacity/90": { Value: 0.9, scopes: ['OPACITY'] },
    "opacity/100": { Value: 1, scopes: ['OPACITY'] },

  }
} as const; 
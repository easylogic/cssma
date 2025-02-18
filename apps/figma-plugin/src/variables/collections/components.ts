import { Collection } from "../types";

export const COMPONENTS: Collection = {
  name: "Components",
  modes: ["Value"],
  values: {
    // Button Component
    "button/height/small": { Value: "{component/height/compact}" },
    "button/height/medium": { Value: "{component/height/default}" },
    "button/height/large": { Value: "{component/height/large}" },

    "button/spacing/small/horizontal": { Value: "{space/inline/sm}" },
    "button/spacing/small/vertical": { Value: "{space/inline/sm}" },
    "button/spacing/medium/horizontal": { Value: "{space/inline/md}" },
    "button/spacing/medium/vertical": { Value: "{space/inline/md}" },
    "button/spacing/large/horizontal": { Value: "{space/inline/lg}" },
    "button/spacing/large/vertical": { Value: "{space/inline/lg}" },

    "button/spacing/small/gap": { Value: "{space/inline/xs}" },
    "button/spacing/medium/gap": { Value: "{space/inline/sm}" },
    "button/spacing/large/gap": { Value: "{space/inline/md}" },

    "button/typography/small/size": { Value: "{text/body/sm}" },
    "button/typography/small/lineHeight": { Value: "{text/body/sm}" },
    "button/typography/medium/size": { Value: "{text/body/md}" },
    "button/typography/medium/lineHeight": { Value: "{text/body/md}" },
    "button/typography/large/size": { Value: "{text/body/lg}" },
    "button/typography/large/lineHeight": { Value: "{text/body/lg}" },

    "button/icon/small": { Value: "{icon/size/inline}" },
    "button/icon/medium": { Value: "{icon/size/default}" },
    "button/icon/large": { Value: "{icon/size/large}" },

    "button/radius/small": { Value: "{shape/rounded/sm}" },
    "button/radius/medium": { Value: "{shape/rounded/md}" },
    "button/radius/large": { Value: "{shape/rounded/lg}" },

    // Tag Component
    "tag/height/small": { Value: "{component/height/compact}" },
    "tag/height/medium": { Value: "{component/height/default}" },
    "tag/height/large": { Value: "{component/height/large}" },

    "tag/spacing/small/horizontal": { Value: "{space/inline/sm}" },
    "tag/spacing/small/vertical": { Value: "{space/inline/xs}" },
    "tag/spacing/medium/horizontal": { Value: "{space/inline/md}" },
    "tag/spacing/medium/vertical": { Value: "{space/inline/sm}" },
    "tag/spacing/large/horizontal": { Value: "{space/inline/lg}" },
    "tag/spacing/large/vertical": { Value: "{space/inline/md}" },

    "tag/spacing/small/gap": { Value: "{space/inline/xs}" },
    "tag/spacing/medium/gap": { Value: "{space/inline/sm}" },
    "tag/spacing/large/gap": { Value: "{space/inline/md}" },

    "tag/typography/small/size": { Value: "{text/body/xs}" },
    "tag/typography/small/lineHeight": { Value: "{text/body/xs}" },
    "tag/typography/medium/size": { Value: "{text/body/sm}" },
    "tag/typography/medium/lineHeight": { Value: "{text/body/sm}" },
    "tag/typography/large/size": { Value: "{text/body/md}" },
    "tag/typography/large/lineHeight": { Value: "{text/body/md}" },

    "tag/icon/small": { Value: "{icon/size/inline}" },
    "tag/icon/medium": { Value: "{icon/size/default}" },
    "tag/icon/large": { Value: "{icon/size/large}" },

    "tag/radius/small/rounded": { Value: "{shape/rounded/sm}" },
    "tag/radius/small/circular": { Value: "{shape/rounded/pill}" },
    "tag/radius/medium/rounded": { Value: "{shape/rounded/md}" },
    "tag/radius/medium/circular": { Value: "{shape/rounded/pill}" },
    "tag/radius/large/rounded": { Value: "{shape/rounded/lg}" },
    "tag/radius/large/circular": { Value: "{shape/rounded/pill}" }
  }
} as const; 

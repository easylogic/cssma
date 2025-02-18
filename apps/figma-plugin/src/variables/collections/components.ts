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

    // Avatar Component
    "avatar/size/small": { Value: "{component/height/compact}" },
    "avatar/size/medium": { Value: "{component/height/default}" },
    "avatar/size/large": { Value: "{component/height/large}" },

    "avatar/typography/small/size": { Value: "{text/body/sm}" },
    "avatar/typography/small/lineHeight": { Value: "{text/body/sm}" },
    "avatar/typography/medium/size": { Value: "{text/body/md}" },
    "avatar/typography/medium/lineHeight": { Value: "{text/body/md}" },
    "avatar/typography/large/size": { Value: "{text/body/lg}" },
    "avatar/typography/large/lineHeight": { Value: "{text/body/lg}" },

    "avatar/radius/small": { Value: "{shape/rounded/pill}" },
    "avatar/radius/medium": { Value: "{shape/rounded/pill}" },
    "avatar/radius/large": { Value: "{shape/rounded/pill}" },

    "avatar/border/width/small": { Value: "{border/width/default}" },
    "avatar/border/width/medium": { Value: "{border/width/default}" },
    "avatar/border/width/large": { Value: "{border/width/default}" },

    "avatar/badge/size/small": { Value: "{size/icon/xs}" },
    "avatar/badge/size/medium": { Value: "{size/icon/sm}" },
    "avatar/badge/size/large": { Value: "{size/icon/md}" },

    "avatar/badge/offset/small": { Value: "{spacing/2}" },
    "avatar/badge/offset/medium": { Value: "{spacing/4}" },
    "avatar/badge/offset/large": { Value: "{spacing/4}" },

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

    "tag/radius/small": { Value: "{shape/rounded/sm}" },
    "tag/radius/medium": { Value: "{shape/rounded/md}" },
    "tag/radius/large": { Value: "{shape/rounded/lg}" },

    // Badge Component
    "badge/height/small": { Value: "{component/height/compact}" },
    "badge/height/medium": { Value: "{component/height/default}" },
    "badge/height/large": { Value: "{component/height/large}" },

    "badge/spacing/small/horizontal": { Value: "{space/inline/sm}" },
    "badge/spacing/small/vertical": { Value: "{space/inline/xs}" },
    "badge/spacing/medium/horizontal": { Value: "{space/inline/md}" },
    "badge/spacing/medium/vertical": { Value: "{space/inline/sm}" },
    "badge/spacing/large/horizontal": { Value: "{space/inline/lg}" },
    "badge/spacing/large/vertical": { Value: "{space/inline/md}" },

    "badge/spacing/small/gap": { Value: "{space/inline/xs}" },
    "badge/spacing/medium/gap": { Value: "{space/inline/sm}" },
    "badge/spacing/large/gap": { Value: "{space/inline/md}" },

    "badge/typography/small/size": { Value: "{text/body/2xs}" },
    "badge/typography/small/lineHeight": { Value: "{text/body/2xs}" },
    "badge/typography/medium/size": { Value: "{text/body/xs}" },
    "badge/typography/medium/lineHeight": { Value: "{text/body/xs}" },
    "badge/typography/large/size": { Value: "{text/body/sm}" },
    "badge/typography/large/lineHeight": { Value: "{text/body/sm}" },

    "badge/icon/small": { Value: "{icon/size/inline}" },
    "badge/icon/medium": { Value: "{icon/size/inline}" },
    "badge/icon/large": { Value: "{icon/size/inline}" },

    // Badge radius by shape
    "badge/radius/small/rounded": { Value: "{shape/rounded/sm}" },
    "badge/radius/small/pill": { Value: "{shape/rounded/pill}" },
    "badge/radius/small/square": { Value: "{shape/rounded/none}" },

    "badge/radius/medium/rounded": { Value: "{shape/rounded/md}" },
    "badge/radius/medium/pill": { Value: "{shape/rounded/pill}" },
    "badge/radius/medium/square": { Value: "{shape/rounded/none}" },

    "badge/radius/large/rounded": { Value: "{shape/rounded/lg}" },
    "badge/radius/large/pill": { Value: "{shape/rounded/pill}" },
    "badge/radius/large/square": { Value: "{shape/rounded/none}" }
  }
} as const; 

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
    "tag/height/small": { Value: "{component/base/height/xs}" },
    "tag/height/medium": { Value: "{component/base/height/sm}" },
    "tag/height/large": { Value: "{component/base/height/md}" },

    "tag/spacing/small/horizontal": { Value: "{component/base/padding/xs}" },
    "tag/spacing/small/vertical": { Value: "{component/base/padding/xs}" },
    "tag/spacing/medium/horizontal": { Value: "{component/base/padding/sm}" },
    "tag/spacing/medium/vertical": { Value: "{component/base/padding/sm}" },
    "tag/spacing/large/horizontal": { Value: "{component/base/padding/md}" },
    "tag/spacing/large/vertical": { Value: "{component/base/padding/md}" },

    "tag/spacing/small/gap": { Value: "{component/base/gap/xs}" },
    "tag/spacing/medium/gap": { Value: "{component/base/gap/sm}" },
    "tag/spacing/large/gap": { Value: "{component/base/gap/md}" },

    "tag/typography/small/size": { Value: "{text/body/xs}" },
    "tag/typography/small/lineHeight": { Value: "{text/body/xs}" },
    "tag/typography/medium/size": { Value: "{text/body/sm}" },
    "tag/typography/medium/lineHeight": { Value: "{text/body/sm}" },
    "tag/typography/large/size": { Value: "{text/body/md}" },
    "tag/typography/large/lineHeight": { Value: "{text/body/md}" },

    "tag/icon/small": { Value: "{component/base/icon/xs}" },
    "tag/icon/medium": { Value: "{component/base/icon/sm}" },
    "tag/icon/large": { Value: "{component/base/icon/md}" },

    "tag/radius/small/rounded": { Value: "{component/base/radius/sm}" },
    "tag/radius/small/circular": { Value: "{component/base/radius/pill}" },
    "tag/radius/medium/rounded": { Value: "{component/base/radius/md}" },
    "tag/radius/medium/circular": { Value: "{component/base/radius/pill}" },
    "tag/radius/large/rounded": { Value: "{component/base/radius/lg}" },
    "tag/radius/large/circular": { Value: "{component/base/radius/pill}" },

    "tag/border/width/thin": { Value: "{component/base/border/width/thin}" },

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
    "badge/radius/large/square": { Value: "{shape/rounded/none}" },

    // Menu Component
    // Menu specific dimensions (직접 값만 유지)
    "menu/container/small/minWidth": { Value: 160 },
    "menu/container/small/maxWidth": { Value: 280 },
    "menu/container/medium/minWidth": { Value: 200 },
    "menu/container/medium/maxWidth": { Value: 320 },
    "menu/container/large/minWidth": { Value: 240 },
    "menu/container/large/maxWidth": { Value: 360 },

    // Menu specific spacing (직접 값만 유지)
    "menu/item/indent": { Value: 16 },      // 서브메뉴 들여쓰기
    "menu/item/shortcut/gap": { Value: 40 }, // 단축키와 텍스트 사이 간격
    "menu/group/header/gap": { Value: 12 },  // 그룹 헤더와 아이템 사이 간격
  }
} as const; 

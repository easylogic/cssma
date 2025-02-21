import { Collection } from "../types";

export const COMPONENTS: Collection = {
  name: "Components",
  modes: ["Value"],
  values: {
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

// handlers/icon/showcase.ts
import { IconVariantProps } from "@/types/icon";
import { ShowcaseStructure } from "@/showcase/types";

export const ICON_SHOWCASE_STRUCTURE: ShowcaseStructure<IconVariantProps, {}> = {
  title: "Icon",
  description: "아이콘은 시각적 의미를 전달하고 사용자 인터페이스를 보완하는 데 사용됩니다.",
  anatomy: {
    image: {
      name: "Icon Anatomy",
      components: [
        {
          name: "Container",
          type: "container",
          props: {
            layoutMode: "HORIZONTAL",
            padding: 8,
            fills: []
          },
          children: [
            {
              name: "Icon",
              type: "icon",
              props: {
                size: 24
              }
            }
          ]
        }
      ]
    },
    parts: [
      {
        name: "Container",
        description: "아이콘을 감싸는 컨테이너로, 일관된 크기와 정렬을 제공합니다."
      },
      {
        name: "Icon",
        description: "실제 아이콘 그래픽이 표시되는 영역입니다."
      }
    ]
  },
  sections: [
    {
      id: "sizes",
      title: "Sizes",
      description: "다양한 컨텍스트에 맞는 아이콘 크기",
      examples: [
        {
          handler: 'icon',
          variant: { size: 'xs', name: 'home' }
        },
        {
          handler: 'icon',
          variant: { size: 'sm', name: 'home' }
        },
        {
          handler: 'icon',
          variant: { size: 'md', name: 'home' }
        },
        {
          handler: 'icon',
          variant: { size: 'lg', name: 'home' }
        },
        {
          handler: 'icon',
          variant: { size: 'xl', name: 'home' }
        }
      ]
    },
    {
      id: "variants",
      title: "Variants",
      description: "아이콘의 시각적 스타일",
      examples: [
        {
          handler: 'icon',
          variant: { variant: 'filled', name: 'home' }
        },
        {
          handler: 'icon',
          variant: { variant: 'outlined', name: 'home' }
        }
      ]
    }
  ]
};
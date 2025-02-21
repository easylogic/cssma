import { ButtonInstance, ButtonVariantProps } from "@/types/button";
import { ShowcaseStructure } from "./types";

export const BUTTON_SHOWCASE_STRUCTURE: ShowcaseStructure<ButtonVariantProps, ButtonInstance> = {
    title: "Button",
    description: "Buttons allow users to take actions, and make choices, with a single tap.",
    anatomy: {
        image: {
            name: "Button Anatomy",
            description: "Anatomy of a button component",
            components: [
                // 메인 버튼 컴포넌트
                {
                    name: "Root",
                    type: "container",
                    props: {
                        layoutMode: "HORIZONTAL",
                        padding: { vertical: 8, horizontal: 16 },
                        itemSpacing: 8,
                        cornerRadius: 6,
                        fills: [{ type: 'SOLID', color: { r: 0.2, g: 0.4, b: 1 } }],
                        width: 160,
                        height: 40
                    },
                    children: [
                        {
                            name: "Icon",
                            type: "icon",
                            props: {
                                name: "add",
                                size: 20,
                                color: { r: 1, g: 1, b: 1 }
                            }
                        },
                        {
                            name: "Label",
                            type: "text",
                            props: {
                                text: "Button",
                                fontSize: 14,
                                color: { r: 1, g: 1, b: 1 },
                                fontWeight: 500
                            }
                        }
                    ]
                },
                // 설명선과 레이블
                {
                    name: "Annotations",
                    type: "container",
                    props: {
                        layoutMode: "VERTICAL",
                        itemSpacing: 24,
                        fills: []
                    },
                    children: [
                        // Root 설명
                        {
                            name: "RootAnnotation",
                            type: "container",
                            props: {
                                layoutMode: "HORIZONTAL",
                                itemSpacing: 8,
                                fills: []
                            },
                            children: [
                                {
                                    name: "Line",
                                    type: "vector",
                                    props: {
                                        stroke: { r: 0.4, g: 0.4, b: 0.4 },
                                        strokeWidth: 1,
                                        dashPattern: [4, 4]
                                    }
                                },
                                {
                                    name: "Label",
                                    type: "text",
                                    props: {
                                        text: "Container",
                                        fontSize: 12,
                                        color: { r: 0.4, g: 0.4, b: 0.4 }
                                    }
                                }
                            ]
                        },
                        // Icon 설명
                        {
                            name: "IconAnnotation",
                            type: "container",
                            props: {
                                layoutMode: "HORIZONTAL",
                                itemSpacing: 8,
                                fills: []
                            },
                            children: [
                                {
                                    name: "Line",
                                    type: "vector",
                                    props: {
                                        stroke: { r: 0.4, g: 0.4, b: 0.4 },
                                        strokeWidth: 1,
                                        dashPattern: [4, 4]
                                    }
                                },
                                {
                                    name: "Label",
                                    type: "text",
                                    props: {
                                        text: "Optional Icon",
                                        fontSize: 12,
                                        color: { r: 0.4, g: 0.4, b: 0.4 }
                                    }
                                }
                            ]
                        },
                        // Label 설명
                        {
                            name: "LabelAnnotation",
                            type: "container",
                            props: {
                                layoutMode: "HORIZONTAL",
                                itemSpacing: 8,
                                fills: []
                            },
                            children: [
                                {
                                    name: "Line",
                                    type: "vector",
                                    props: {
                                        stroke: { r: 0.4, g: 0.4, b: 0.4 },
                                        strokeWidth: 1,
                                        dashPattern: [4, 4]
                                    }
                                },
                                {
                                    name: "Label",
                                    type: "text",
                                    props: {
                                        text: "Text Label",
                                        fontSize: 12,
                                        color: { r: 0.4, g: 0.4, b: 0.4 }
                                    }
                                }
                            ]
                        }
                    ]
                },
                // 치수 표시
                {
                    name: "Measurements",
                    type: "container",
                    props: {
                        layoutMode: "VERTICAL",
                        itemSpacing: 16,
                        fills: []
                    },
                    children: [
                        {
                            name: "PaddingMeasure",
                            type: "container",
                            props: {
                                layoutMode: "HORIZONTAL",
                                fills: [],
                                stroke: { r: 0.6, g: 0.6, b: 0.6 },
                                strokeWidth: 1,
                                dashPattern: [2, 2]
                            }
                        },
                        {
                            name: "SpacingMeasure",
                            type: "container",
                            props: {
                                layoutMode: "HORIZONTAL",
                                fills: [],
                                stroke: { r: 0.6, g: 0.6, b: 0.6 },
                                strokeWidth: 1,
                                dashPattern: [2, 2]
                            }
                        }
                    ]
                }
            ]
        },
        parts: [
            {
                name: "Root",
                description: "The container that holds the button"
            },
            {
                name: "Icon",
                description: "The icon displayed on the button"
            },
            {
                name: "Label",
                description: "The text displayed on the button"
            },
        ]
    },
    guidelines: {
        rules: [
            {
                do: "Use a button to allow users to take actions or make choices.",
                dont: "Don't use a button to display information."
            }
        ]
    },
    usage: {
        examples: [
          {
            title: "폼 액션",
            description: "폼 제출과 취소를 위한 버튼 그룹",
            code: `<Button type="primary">저장하기</Button>
      <Button type="secondary">취소</Button>`,
            preview: {
              handler: 'button',
              variant: { type: 'primary', variant: 'filled' },
              customProps: { text: '저장하기' }
            }
          },
          {
            title: "위험 작업",
            description: "삭제와 같은 위험 작업을 위한 버튼",
            code: `<Button type="danger" icon={{ name: 'trash' }}>삭제</Button>`,
            preview: {
              handler: 'button',
              variant: { type: 'danger', variant: 'filled' },
              customProps: { 
                text: '삭제',
                icon: { name: 'trash', position: 'left' }
              }
            }
          }
        ]
    },
    sections: [
      {
        id: "overview",
        title: "Overview",
        description: "Basic button examples showing primary use cases",
        examples: [
          {
            handler: 'button',
            variant: {
              type: 'primary',
              variant: 'filled',
              size: 'medium',
            },
            customProps: {
              text: 'Primary Action'
            }
          },
          {
            handler: 'button',
            variant: {
              type: 'secondary',
              variant: 'outlined',
              size: 'medium',
            },
            customProps: {
              text: 'Secondary'
            }
          }
        ]
      },
      {
        id: "types",
        title: "Types",
        description: "Different button types for various levels of emphasis",
        examples: [
          {
            handler: 'button',
            variant: {
              type: 'primary',
              variant: 'filled',
            },
            customProps: { text: 'Primary' }
          },
          {
            handler: 'button',
            variant: {
              type: 'secondary',
              variant: 'filled',
            },
            customProps: { text: 'Secondary' }
          },
          {
            handler: 'button',
            variant: {
              type: 'neutral',
              variant: 'filled',
            },
            customProps: { text: 'Neutral' }
          },
          {
            handler: 'button',
            variant: {
              type: 'danger',
              variant: 'filled',
            },
            customProps: { text: 'Danger' }
          }
        ]
      },
      {
        id: "variants",
        title: "Variants",
        description: "Visual styles that can be applied to any button type",
        examples: [
          {
            handler: 'button',
            variant: {
              type: 'primary',
              variant: 'filled',
            },
            customProps: { text: 'Filled' }
          },
          {
            handler: 'button',
            variant: {
              type: 'primary',
              variant: 'outlined',
            },
            customProps: { text: 'Outlined' }
          },
          {
            handler: 'button',
            variant: {
              type: 'primary',
              variant: 'ghost',
            },
            customProps: { text: 'Ghost' }
          }
        ]
      },
      {
        id: "sizes",
        title: "Sizes",
        description: "Different sizes to accommodate various use cases",
        examples: [
          {
            handler: 'button',
            variant: {
              type: 'primary',
              variant: 'filled',
            },
            customProps: { 
              icon: {
                name: 'add',
                position: 'left'
              }, text: 'Small' }
          },
          {
            handler: 'button',
            variant: {
              type: 'primary',
              variant: 'filled',
            },
            customProps: { text: 'Medium' }
          },
          {
            handler: 'button',
            variant: {
              type: 'primary',
              variant: 'filled',
            },
            customProps: { text: 'Large' }
          }
        ]
      },
      {
        id: "states",
        title: "States",
        description: "Interactive states that provide visual feedback",
        examples: [
          {
            handler: 'button',
            variant: {
              type: 'primary',
              variant: 'filled',
              state: 'default',
            },
            customProps: { text: 'Default' }
          },
          {
            handler: 'button',
            variant: {
              type: 'primary',
              variant: 'filled',
              state: 'hover',
            },
            customProps: { text: 'Hover' }
          },
          {
            handler: 'button',
            variant: {
              type: 'primary',
              variant: 'filled',
              state: 'pressed',
            },
            customProps: { text: 'Pressed' }
          },
          {
            handler: 'button',
            variant: {
              type: 'primary',
              variant: 'filled',
              state: 'disabled',
            },
            customProps: { text: 'Disabled' }
          }
        ]
      },
      {
        id: "icons",
        title: "Icons",
        description: "Buttons with icons for enhanced visual communication",
        examples: [
          {
            handler: 'button',
            variant: {
              type: 'primary',
              variant: 'filled',
            },
            customProps: { 
              icon: {
                name: 'add',
                position: 'left'
              }, text: 'Add item' }
          },
          {
            handler: 'button',
            variant: {
              type: 'primary',
              variant: 'filled',
            },
            customProps: { 
              icon: {
                name: 'arrow-right',
                position: 'right'
              }, text: 'Next' }
          },
          {
            handler: 'button',
            variant: {
              type: 'primary',
              variant: 'filled',
            },
            customProps: { 
              icon: {
                name: 'add',
                position: 'left'
              }, text: 'Add item' }
          }
        ]
      }
    ],
    relatedComponents: [
      {
        name: "IconButton",
        description: "아이콘만 있는 버튼이 필요한 경우 사용"
      },
      {
        name: "ButtonGroup",
        description: "연관된 버튼들을 그룹화할 때 사용"
      },
      {
        name: "ToggleButton",
        description: "토글 동작이 필요한 경우 사용"
      }
    ]
  };
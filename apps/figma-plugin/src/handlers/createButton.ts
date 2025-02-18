import { ButtonVariant } from '../types/button';
import { BUTTON_SIZES, BUTTON_STYLES, BUTTON_VARIANTS } from '../constants/buttonStyles';
import { ComponentPageData, createComponentPage, createHandlers } from './createBase';
import { variables } from '@/variables';

class ComponentCache {
  private static instance: ComponentCache;
  private buttonSet: ComponentSetNode | null = null;

  private constructor() {}

  static getInstance(): ComponentCache {
    if (!ComponentCache.instance) {
      ComponentCache.instance = new ComponentCache();
    }
    return ComponentCache.instance;
  }

  getButtonSet(): ComponentSetNode | null {
    return this.buttonSet;
  }

  setButtonSet(set: ComponentSetNode): void {
    this.buttonSet = set;
  }
}

export const buttonHandlers = {
  createButton: async (variant: ButtonVariant) => {
    const size = BUTTON_SIZES[variant.size || 'medium'];
    const state = variant.state || 'default';

    // 버튼 컴포넌트 생성
    const button = figma.createComponent();
    button.name = `size=${variant.size || 'medium'}, type=${variant.type || 'primary'}, variant=${variant.variant || 'filled'}, state=${state}`;
    
    // 레이아웃 설정
    await setupButtonLayout(button, size);

    // 스타일 적용
    await applyButtonStyle(button, variant);

    // 텍스트 추가
    await addButtonText(button, size, variant);

    return button;
  },

  createComponentSet: async () => {
    const cache = ComponentCache.getInstance();
    if (cache.getButtonSet()) return cache.getButtonSet();

    const components = await createButtonVariants();
    const componentSet = await combineButtonVariants(components);

    cache.setButtonSet(componentSet);
    return componentSet;
  },

  createInstance: async (variant: ButtonVariant, props: { 
    text?: string;
    icon?: string;
  } = {}) => {
    const component = ComponentCache.getInstance().getButtonSet()?.defaultVariant.createInstance();
    if (!component) return null;

    component.setProperties({
      size: variant.size!,
      type: variant.type!,
      variant: variant.variant!,
      state: variant.state!,
    });

    if (props.text) {
      const textNode = component.findOne(node => node.type === "TEXT") as TextNode;
      if (textNode) textNode.characters = props.text;
    }


    // swap icon component
    if (props.icon) {
    }

    return component;
  },

  createPage: async () => {
    const pageData: ComponentPageData = {
      title: "Button",
      description: "Buttons allow users to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation.",
      anatomy: {
        image: await (async () => {
          // Create container frame for anatomy visualization
          const container = figma.createFrame();
          container.name = "Button Anatomy";
          container.layoutMode = "HORIZONTAL";
          container.counterAxisAlignItems = "CENTER";
          container.itemSpacing = 80;  // Increased spacing between button and annotations
          container.fills = [];
          container.resize(800, 300);  // Increased size for better visibility
          container.paddingLeft = container.paddingRight = 40;
          container.paddingTop = container.paddingBottom = 40;

          // Create simplified button visualization
          const buttonVisualization = figma.createFrame();
          buttonVisualization.name = "Button Visualization";
          buttonVisualization.resize(200, 48);  // Wider button for better visibility
          buttonVisualization.cornerRadius = 6;
          buttonVisualization.fills = [{ type: 'SOLID', color: { r: 0.95, g: 0.95, b: 0.95 } }];
          buttonVisualization.strokes = [{ type: 'SOLID', color: { r: 0.8, g: 0.8, b: 0.8 } }];
          buttonVisualization.strokeWeight = 1;
          buttonVisualization.layoutMode = "HORIZONTAL";
          buttonVisualization.primaryAxisAlignItems = "CENTER";
          buttonVisualization.counterAxisAlignItems = "CENTER";
          buttonVisualization.itemSpacing = 8;
          buttonVisualization.paddingLeft = buttonVisualization.paddingRight = 16;

          // Add icon placeholder
          const iconPlaceholder = figma.createFrame();
          iconPlaceholder.name = "Icon Placeholder";
          iconPlaceholder.resize(20, 20);
          iconPlaceholder.cornerRadius = 4;
          iconPlaceholder.fills = [{ type: 'SOLID', color: { r: 0.7, g: 0.7, b: 0.7 } }];
          iconPlaceholder.strokes = [{ type: 'SOLID', color: { r: 0.6, g: 0.6, b: 0.6 } }];
          iconPlaceholder.strokeWeight = 1;
          iconPlaceholder.dashPattern = [4, 4];  // Dashed stroke
          buttonVisualization.appendChild(iconPlaceholder);

          // Add text placeholder
          const textNode = await createHandlers.text({
            text: "Button Text",
            fontSize: 14,
            fills: [{ type: 'SOLID', color: { r: 0.3, g: 0.3, b: 0.3 } }]
          });
          buttonVisualization.appendChild(textNode);
          
          // Create annotations container
          const annotationsContainer = figma.createFrame();
          annotationsContainer.name = "Annotations";
          annotationsContainer.layoutMode = "VERTICAL";
          annotationsContainer.itemSpacing = 32;  // Increased spacing between annotations
          annotationsContainer.fills = [];
          annotationsContainer.resize(400, 200);
          annotationsContainer.counterAxisAlignItems = "MIN";

          // Add annotations with arrows
          const parts = [
            { 
              name: "Container", 
              description: "Main wrapper element",
              y: 0,
              isRoot: true
            },
            { 
              name: "Icon (optional)", 
              description: "Visual enhancement",
              y: buttonVisualization.height / 3,
              isRoot: false
            },
            { 
              name: "Label", 
              description: "Action description",
              y: buttonVisualization.height * 2/3,
              isRoot: false
            }
          ];

          for (const part of parts) {
            // Create annotation group
            const annotationGroup = figma.createFrame();
            annotationGroup.name = part.name + " Annotation";
            annotationGroup.layoutMode = "HORIZONTAL";
            annotationGroup.itemSpacing = 16;  // Increased spacing
            annotationGroup.fills = [];
            annotationGroup.resize(300, 40);
            annotationGroup.counterAxisAlignItems = "CENTER";

            // Create connector line
            const connector = figma.createVector();
            connector.name = "Connector";
            connector.strokeWeight = 1;
            connector.strokes = [{ type: 'SOLID', color: { r: 0.4, g: 0.4, b: 0.4 } }];
            
            // Create arrow path with horizontal and vertical segments
            const startX = 0;
            const endX = 60;
            const arrowY = 20;
            
            connector.vectorNetwork = {
              vertices: [
                { x: startX, y: arrowY },
                { x: endX - 20, y: arrowY },
                { x: endX, y: arrowY }
              ],
              segments: [
                { start: 0, end: 1 },
                { start: 1, end: 2 }
              ]
            };

            if (!part.isRoot) {
              connector.dashPattern = [4, 4];  // Dashed line for non-root elements
            }

            // Create label container
            const labelFrame = figma.createFrame();
            labelFrame.name = "Label Container";
            labelFrame.layoutMode = "VERTICAL";
            labelFrame.itemSpacing = 4;
            labelFrame.fills = [];
            labelFrame.counterAxisAlignItems = "MIN";

            // Add title
            const title = await createHandlers.text({
              text: part.name,
              fontSize: 14,
              fills: [{ type: 'SOLID', color: { r: 0.2, g: 0.2, b: 0.2 } }]
            });

            // Add description
            const description = await createHandlers.text({
              text: part.description,
              fontSize: 12,
              fills: [{ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } }]
            });

            labelFrame.appendChild(title);
            labelFrame.appendChild(description);

            annotationGroup.appendChild(connector);
            annotationGroup.appendChild(labelFrame);
            annotationsContainer.appendChild(annotationGroup);
          }

          // Add components to container
          container.appendChild(buttonVisualization);
          container.appendChild(annotationsContainer);

          return container;
        })(),
        parts: [
          {
            name: "Container",
            description: "The main wrapper that holds all button elements and handles interactions. It manages the button's size, background, borders, and spacing."
          },
          {
            name: "Label",
            description: "The text content of the button that describes its action. Should be clear, concise, and action-oriented."
          },
          {
            name: "Icon (optional)",
            description: "Visual element that can be added before or after the label to enhance meaning. Should be relevant to the action."
          }
        ]
      },
      properties: [
        {
          name: "size",
          type: "'small' | 'medium' | 'large'",
          default: "medium",
          description: "Controls the size of the button. Use larger sizes for primary actions and smaller sizes for more compact layouts.",
          options: ["small", "medium", "large"]
        },
        {
          name: "type",
          type: "'primary' | 'secondary' | 'tertiary' | 'danger'",
          default: "primary",
          description: "Determines the visual style and importance level of the button.",
          options: ["primary", "secondary", "tertiary", "danger"]
        },
        {
          name: "variant",
          type: "'filled' | 'outlined' | 'ghost'",
          default: "filled",
          description: "Controls the visual style of the button's background and border.",
          options: ["filled", "outlined", "ghost"]
        },
        {
          name: "state",
          type: "'default' | 'hover' | 'pressed' | 'disabled'",
          default: "default",
          description: "Represents the current interaction state of the button.",
          options: ["default", "hover", "pressed", "disabled"]
        },
        {
          name: "icon",
          type: "'none' | 'left' | 'right'",
          default: "none",
          description: "Determines if and where an icon should be displayed relative to the button text.",
          options: ["none", "left", "right"]
        },
        {
          name: "loading",
          type: "boolean",
          default: "false",
          description: "When true, displays a loading spinner and prevents user interaction."
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "When true, prevents user interaction and shows a disabled state."
        }
      ],
      variants: [
        {
          title: "Types",
          description: "Different button types for various levels of emphasis in the interface.",
          examples: [
            await buttonHandlers.createInstance({ size: 'medium', type: 'primary', variant: 'filled', state: 'default' }, { text: "Primary" }),
            await buttonHandlers.createInstance({ size: 'medium', type: 'primary', variant: 'outlined', state: 'default' }, { text: "Primary" }),
            await buttonHandlers.createInstance({ size: 'medium', type: 'primary', variant: 'ghost', state: 'default' }, { text: "Primary" }),
            await buttonHandlers.createInstance({ size: 'medium', type: 'secondary', variant: 'filled', state: 'default' }, { text: "Secondary" }),
            await buttonHandlers.createInstance({ size: 'medium', type: 'secondary', variant: 'outlined', state: 'default' }, { text: "Secondary" }),
            await buttonHandlers.createInstance({ size: 'medium', type: 'secondary', variant: 'ghost', state: 'default' }, { text: "Secondary" })
          ]
        },
        {
          title: "Sizes",
          description: "Button sizes to accommodate different use cases and layouts.",
          examples: [
            await buttonHandlers.createInstance({ size: 'small', type: 'primary', variant: 'filled', state: 'default' }, { text: "Small" }),
            await buttonHandlers.createInstance({ size: 'medium', type: 'primary', variant: 'filled', state: 'default' }, { text: "Medium" }),
            await buttonHandlers.createInstance({ size: 'large', type: 'primary', variant: 'filled', state: 'default' }, { text: "Large" })
          ]
        },
        {
          title: "Variants",
          description: "Visual styles that can be applied to any button type.",
          examples: [
            await buttonHandlers.createInstance({ size: 'medium', type: 'primary', variant: 'filled', state: 'default' }, { text: "Filled" }),
            await buttonHandlers.createInstance({ size: 'medium', type: 'primary', variant: 'outlined', state: 'default' }, { text: "Outlined" }),
            await buttonHandlers.createInstance({ size: 'medium', type: 'primary', variant: 'ghost', state: 'default' }, { text: "Ghost" })
          ]
        },
        {
          title: "States",
          description: "Interactive states that provide visual feedback to users.",
          examples: [
            await buttonHandlers.createInstance({ size: 'medium', type: 'primary', variant: 'filled', state: 'default' }, { text: "Default" }),
            await buttonHandlers.createInstance({ size: 'medium', type: 'primary', variant: 'filled', state: 'hover' }, { text: "Hover" }),
            await buttonHandlers.createInstance({ size: 'medium', type: 'primary', variant: 'filled', state: 'pressed' }, { text: "Pressed" }),
            await buttonHandlers.createInstance({ size: 'medium', type: 'primary', variant: 'filled', state: 'disabled' }, { text: "Disabled" })
          ]
        }
      ],
      bestPractices: [
        {
          title: "Button Hierarchy",
          description: "Use primary buttons for main actions, secondary for alternative actions, and tertiary for supplementary actions.",
        },
        {
          title: "Label Text",
          description: "Use clear, concise, action-oriented text that describes what the button does.",
        },
        {
          title: "Icon Usage",
          description: "Use icons to reinforce the button's action, not just for decoration.",
        },
        {
          title: "Consistent Spacing",
          description: "Maintain consistent spacing between buttons and surrounding elements.",
        }
      ],
      usage: {
        description: "Buttons are used to help users perform actions and make choices. Buttons make actions immediately visible and easy to perform.",
        examples: [
          {
            title: "Form Actions",
            description: "Use primary and secondary buttons for form submission and cancellation.",
            component: await (async () => {
              const container = figma.createFrame();
              container.name = "Form Actions Example";
              container.layoutMode = "HORIZONTAL";
              container.itemSpacing = 16;
              container.fills = [];
              container.counterAxisAlignItems = "CENTER";

              const submitButton = await buttonHandlers.createInstance({
                size: 'medium',
                type: 'primary',
                variant: 'filled',
                state: 'default'
              }, {
                text: "Submit",
              });

              container.appendChild(submitButton!);

              const cancelButton = await buttonHandlers.createInstance({
                size: 'medium',
                type: 'secondary',
                variant: 'ghost',
                state: 'default'
              }, {
                text: "Cancel",
              });


              return container;
            })()
          },
          {
            title: "Dialog Actions",
            description: "Use buttons in dialogs to confirm or cancel actions.",
            component: await (async () => {
              const container = figma.createFrame();
              container.name = "Dialog Actions Example";
              container.layoutMode = "HORIZONTAL";
              container.itemSpacing = 16;
              container.fills = [];
              container.counterAxisAlignItems = "CENTER";

              const confirmButton = await buttonHandlers.createInstance({
                size: 'medium',
                type: 'primary',
                variant: 'filled',
                state: 'default'
              }, {
                text: "Confirm",
              });

              const closeButton = await buttonHandlers.createInstance({
                size: 'medium',
                type: 'secondary',
                variant: 'outlined',
                state: 'default'
              }, {
                text: "Close",
              });

              container.appendChild(confirmButton!);
              container.appendChild(closeButton!);

              return container;
            })()
          },
          {
            title: "Toolbar Actions",
            description: "Use ghost or outlined buttons in toolbars for frequent actions.",
            component: await (async () => {
              const container = figma.createFrame();
              container.name = "Toolbar Actions Example";
              container.layoutMode = "HORIZONTAL";
              container.itemSpacing = 8;
              container.fills = [];
              container.counterAxisAlignItems = "CENTER";

              const editButton = await buttonHandlers.createInstance({
                size: 'small',
                type: 'secondary',
                variant: 'ghost',
                state: 'default'
              }, {
                text: "Edit",
              });


              const copyButton = await buttonHandlers.createInstance({
                size: 'small',
                type: 'secondary',
                variant: 'ghost',
                state: 'default'
              }, {
                text: "Copy",
              });


              const shareButton = await buttonHandlers.createInstance({
                size: 'small',
                type: 'secondary',
                variant: 'ghost',
                state: 'default'
              }, {
                text: "Share",
              });

              container.appendChild(editButton!);
              container.appendChild(copyButton!);
              container.appendChild(shareButton!);

              return container;
            })()
          },
          {
            title: "Dangerous Actions",
            description: "Use danger buttons for destructive actions that need user attention.",
            component: await (async () => {
              const container = figma.createFrame();
              container.name = "Dangerous Actions Example";
              container.layoutMode = "HORIZONTAL";
              container.itemSpacing = 16;
              container.fills = [];
              container.counterAxisAlignItems = "CENTER";

              const deleteButton = await buttonHandlers.createInstance({
                size: 'medium',
                type: 'danger',
                variant: 'filled',
                state: 'default'
              }, {
                text: "Delete",
              });


              const cancelButton = await buttonHandlers.createInstance({
                size: 'medium',
                type: 'secondary',
                variant: 'ghost',
                state: 'default'
              }, {
                text: "Cancel",
              });

              container.appendChild(deleteButton!);
              container.appendChild(cancelButton!);

              return container;
            })()
          }
        ]
      }
    };

    return createComponentPage(pageData);
  }
};

// 헬퍼 함수들
async function setupButtonLayout(button: ComponentNode, size: typeof BUTTON_SIZES[keyof typeof BUTTON_SIZES]) {
  button.layoutMode = "HORIZONTAL";
  button.counterAxisAlignItems = "CENTER";
  button.primaryAxisAlignItems = "CENTER";
  
  // Set size
  variables.setBindVariable(button, 'height', size.height);
  
  // Set padding
  variables.setBindVariable(button, 'paddingLeft', size.paddingHorizontal);
  variables.setBindVariable(button, 'paddingRight', size.paddingHorizontal);
  variables.setBindVariable(button, 'paddingTop', size.paddingVertical);
  variables.setBindVariable(button, 'paddingBottom', size.paddingVertical);
  variables.setBindVariable(button, 'itemSpacing', size.spacing);
  
  // Set border radius
  variables.setBindVariable(button, 'topLeftRadius', size.borderRadius);
  variables.setBindVariable(button, 'topRightRadius', size.borderRadius);
  variables.setBindVariable(button, 'bottomLeftRadius', size.borderRadius);
  variables.setBindVariable(button, 'bottomRightRadius', size.borderRadius);

  button.primaryAxisSizingMode = "AUTO";
  button.counterAxisSizingMode = "AUTO";
}

async function applyButtonStyle(button: ComponentNode, variant: ButtonVariant) {
  const styleKey = `${variant.type || 'primary'}-${variant.variant || 'filled'}-${variant.state || 'default'}` as keyof typeof BUTTON_STYLES;
  const style = BUTTON_STYLES[styleKey];

  // Set background
  button.fills = [variables.bindVariable(style.background)];
  
  // Set border
  if (variant.variant === 'outlined') {
    button.strokes = [variables.bindVariable(style.border)];
    variables.setBindVariable(button, 'strokeWeight', 'border/width/default');
    button.strokeAlign = 'INSIDE';
  } else if (variant.variant === 'ghost') {
    button.strokes = [];
  } else {
    button.strokes = [];
  }
}

async function addButtonText(button: ComponentNode, size: typeof BUTTON_SIZES[keyof typeof BUTTON_SIZES], variant: ButtonVariant) {
  const styleKey = `${variant.type || 'primary'}-${variant.variant || 'filled'}-${variant.state || 'default'}` as keyof typeof BUTTON_STYLES;
  const style = BUTTON_STYLES[styleKey];

  const text = await createHandlers.text({
    text: variant.text || "Button",
    fills: [variables.bindVariable(style.text)],
    textAlignHorizontal: "CENTER"
  });

  variables.setBindVariable(text, 'fontSize', size.fontSize);

  button.appendChild(text);
  text.layoutSizingHorizontal = "FILL";
}

async function createButtonVariants() {
  const components: ComponentNode[] = [];
  
  for (const variant of BUTTON_VARIANTS) {
    const component = await buttonHandlers.createButton(variant);
    components.push(component);
  }
  
  return components;
}

async function combineButtonVariants(components: ComponentNode[]) {
  const componentSet = figma.combineAsVariants(components, figma.currentPage);
  componentSet.name = "Button";
  componentSet.layoutMode = "HORIZONTAL";
  componentSet.layoutWrap = "WRAP";
  componentSet.itemSpacing = 40;
  componentSet.counterAxisSpacing = 40;
  componentSet.paddingLeft = componentSet.paddingRight = 40;
  componentSet.paddingTop = componentSet.paddingBottom = 40;
  componentSet.resize(1800, componentSet.height);
  componentSet.primaryAxisSizingMode = "FIXED";
  componentSet.counterAxisSizingMode = "AUTO";
  componentSet.fills = [
    {
      type: "SOLID",
      color: {
        r: 1,
        g: 1,
        b: 1
      }
    }
  ]


  
  return componentSet;
}
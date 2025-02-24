import { CardFooterProps, CardFooterVariantProps } from '@/types/card';
import { variables } from '@/variables';
import { buttonHandlers } from '../../button';
import { FOOTER_SIZES, FOOTER_VARIANTS } from '@/constants/cardStyles';
import { CARD_FOOTER_STYLES } from '@/constants/card/styles';


export class CardFooterManager {
  private static instance: CardFooterManager;
  private componentSet: ComponentSetNode | null = null;
  private variantMap = new Map<string, ComponentNode>();

  private readonly ROLES = {
    ACTION_CONTAINER: 'footer-action-container',
    PRIMARY_ACTION: 'footer-primary-action',
    SECONDARY_ACTION: 'footer-secondary-action'
  } as const;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new CardFooterManager();
    }
    return this.instance;
  }

  private getVariantKey(variant: CardFooterVariantProps): string {
    return [
      'size=' + (variant.size || 'medium'),
      'variant=' + (variant.variant || 'filled'),
      'withActions=' + (variant.withActions || false),
      'alignment=' + (variant.alignment || 'right')
    ].join(',');
  }

  private setupBaseLayout(node: FrameNode | ComponentNode, size?: typeof FOOTER_SIZES[keyof typeof FOOTER_SIZES]) {
    node.layoutMode = "HORIZONTAL";
    node.primaryAxisAlignItems = "MIN";
    node.counterAxisAlignItems = "CENTER";

    if (size) {
      variables.setBindVariable(node, 'height', size.height);
      variables.setBindVariable(node, 'paddingLeft', size.padding);
      variables.setBindVariable(node, 'paddingRight', size.padding);
      variables.setBindVariable(node, 'paddingTop', size.padding);
      variables.setBindVariable(node, 'paddingBottom', size.padding);
      variables.setBindVariable(node, 'itemSpacing', size.spacing);
    }
  }

  private async createActionButton(
    text: string, 
    size: typeof FOOTER_SIZES[keyof typeof FOOTER_SIZES], 
    role: string,
    options: {
      variant?: 'filled' | 'outlined' | 'ghost';
      type?: 'primary' | 'secondary' | 'neutral' | 'danger';
    } = {}
  ) {
    const isSecondary = role === this.ROLES.SECONDARY_ACTION;
    
    const button = await buttonHandlers.createInstance({
      size: size.buttonSize,
      variant: options.variant || (isSecondary ? 'outlined' : 'filled'),
      type: options.type || (isSecondary ? 'secondary' : 'primary')
    }, { text });
    
    if (button) {
      button.setPluginData('role', role);
    }
    return button;
  }

  private async createActionContainer(
    size: typeof FOOTER_SIZES[keyof typeof FOOTER_SIZES], 
    alignment: string,
    options: {
      primaryAction?: {
        variant?: 'filled' | 'outlined' | 'ghost';
        type?: 'primary' | 'secondary' | 'neutral' | 'danger';
      };
      secondaryAction?: {
        variant?: 'filled' | 'outlined' | 'ghost';
        type?: 'primary' | 'secondary' | 'neutral' | 'danger';
      };
    } = {}
  ) {
    const container = figma.createFrame();
    container.name = "Action Container";
    container.setPluginData('role', this.ROLES.ACTION_CONTAINER);
    container.layoutMode = "HORIZONTAL";
    variables.setBindVariable(container, 'itemSpacing', size.spacing);
    container.fills = [];

    switch (alignment) {
      case 'center':
        container.primaryAxisAlignItems = "CENTER";
        break;
      case 'right':
        container.primaryAxisAlignItems = "MAX";
        break;
      case 'space-between':
        container.primaryAxisAlignItems = "SPACE_BETWEEN";
        break;
      default:
        container.primaryAxisAlignItems = "MIN";
    }

    // 기본 액션 버튼 추가
    const primaryAction = await this.createActionButton(
      "Primary", 
      size, 
      this.ROLES.PRIMARY_ACTION,
      options.primaryAction
    );
    const secondaryAction = await this.createActionButton(
      "Secondary", 
      size, 
      this.ROLES.SECONDARY_ACTION,
      options.secondaryAction
    );

    if (primaryAction && secondaryAction) {
      container.appendChild(primaryAction);
      container.appendChild(secondaryAction);
    }

    return container;
  }

  private findNodeByRole(component: ComponentNode | InstanceNode, role: string): SceneNode | null {
    return component.findOne(node => node.getPluginData('role') === role);
  }

  async createComponent(variant: CardFooterVariantProps): Promise<ComponentNode> {
    const footer = figma.createComponent();
    const size = FOOTER_SIZES[variant.size || 'medium'];
    footer.name = this.getVariantKey(variant);
    
    // 기본 레이아웃 설정
    this.setupBaseLayout(footer, size);
    
    // 액션 컨테이너 (옵션)
    if (variant.withActions) {
      const actionContainer = await this.createActionContainer(size, variant.alignment || 'right');
      if (actionContainer) {
        footer.appendChild(actionContainer);

        actionContainer.layoutSizingHorizontal = "FILL";
        actionContainer.layoutSizingVertical = "HUG";
      }
    }
    
    await this.applyStyle(footer, variant);
    
    return footer;
  }

  private async createVariantComponents(): Promise<ComponentNode[]> {
    return Promise.all(FOOTER_VARIANTS.map(variant => this.createComponent(variant)));
  }

  async getComponentSet(): Promise<ComponentSetNode> {
    if (this.componentSet) return this.componentSet;

    const components = await this.createVariantComponents();
    this.componentSet = figma.combineAsVariants(components, figma.currentPage);
    this.setupComponentSetLayout(this.componentSet);


    components.forEach(component => {
      this.variantMap.set(component.name, component);
      component.layoutSizingHorizontal = "FILL";
      component.layoutSizingVertical = "HUG";
    });

    return this.componentSet;
  }

  private setupComponentSetLayout(componentSet: ComponentSetNode) {
    componentSet.name = "Card Footer";
    componentSet.layoutMode = "VERTICAL";
    componentSet.itemSpacing = 40;
    componentSet.counterAxisSpacing = 40;
    componentSet.paddingLeft = componentSet.paddingRight = 40;
    componentSet.paddingTop = componentSet.paddingBottom = 40;
    componentSet.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    componentSet.primaryAxisSizingMode = "AUTO";
    componentSet.counterAxisSizingMode = "AUTO";
    componentSet.resize(400, componentSet.height);

    componentSet.descriptionMarkdown = `
# Card Footer Component

Contains action buttons and additional information.

## Properties
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| withActions | \`boolean\` | \`false\` | Shows action buttons |
| alignment | \`string\` | \`right\` | Button alignment |
| actions | \`string[]\` | \`[]\` | Action button texts |

## Alignment Options
- \`left\`: Left-aligned actions
- \`center\`: Center-aligned actions
- \`right\`: Right-aligned actions
- \`space-between\`: Distributed actions

## Button Properties
- Size adapts to footer size
- Consistent spacing between buttons
- Proper hierarchy (primary/secondary)

## Variants
- **Size**: \`small\` \`medium\` \`large\`
- **Style**: \`filled\` \`outlined\` \`elevated\`

## Best Practices
- Limit number of actions (2-3 max)
- Use clear action labels
- Maintain consistent button styles
- Consider mobile responsiveness
    `.trim();
  }

  private getVariantFromProps(props: CardFooterProps): CardFooterVariantProps {
    return {
      size: props.size || 'medium',
      variant: props.variant || 'filled',
      withActions: !!props.actions?.length,
      alignment: props.alignment || 'right'
    };
  }

  async createInstance(props: CardFooterProps = {}) {
    const componentSet = await this.getComponentSet();
    if (!componentSet) return null;

    const variant = this.getVariantFromProps(props);
    const variantKey = this.getVariantKey(variant);
    const targetVariant = this.variantMap.get(variantKey) || componentSet.defaultVariant;
    
    if (!targetVariant) return null;

    const instance = targetVariant.createInstance();
    await this.updateInstance(instance, props);
    
    return instance;
  }

  async updateInstance(instance: InstanceNode, props: CardFooterProps = {}) {
    if (props.actions?.length) {
      const actionContainer = this.findNodeByRole(instance, this.ROLES.ACTION_CONTAINER) as FrameNode;
      if (actionContainer) {
        // 기존 버튼 제거
        actionContainer.children.forEach(child => child.remove());
        
        // 새 버튼 추가
        for (const action of props.actions) {
          const button = await this.createActionButton(action, FOOTER_SIZES[props.size || 'medium'], this.ROLES.PRIMARY_ACTION);
          if (button) {
            actionContainer.appendChild(button);
          }
        }
      }
    }
  }

  private async applyStyle(footer: ComponentNode, variant: CardFooterVariantProps) {
    const variantStyle = CARD_FOOTER_STYLES[variant.variant || 'filled'];
    const state = variant.disabled ? 'disabled' : 'default';

    // 배경색 설정
    footer.fills = [variables.bindVariable(variantStyle.background[state])];
    
    // 테두리 설정
    if (variant.variant === 'outlined') {
      footer.strokes = [variables.bindVariable(variantStyle.border[state])];
      variables.setBindVariable(footer, 'strokeWeight', 'border/width/default');
      footer.strokeAlign = 'INSIDE';
    }

    // // 텍스트 색상 설정
    // const textNodes = footer.findAll(node => node.type === "TEXT") as TextNode[];
    // textNodes.forEach(textNode => {
    //   textNode.fills = [variables.bindVariable(variantStyle.text[state])];
    // });

    // 그림자 효과 설정 (elevated 변형일 경우)
    if (variant.variant === 'elevated') {
      const shadow: Effect = {
        type: 'DROP_SHADOW',
        color: { r: 0, g: 0, b: 0, a: 0.1 },
        offset: { x: 0, y: 2 },
        radius: 4,
        spread: 0,
        visible: true,
        blendMode: 'NORMAL'
      };
      footer.effects = [shadow];
    }
  }
} 
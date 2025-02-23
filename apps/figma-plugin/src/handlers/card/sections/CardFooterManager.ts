import { CardFooterProps, CardFooterVariantProps, FOOTER_SIZES, FOOTER_VARIANTS } from '@/types/card';
import { variables } from '@/variables';
import { buttonHandlers } from '../../button';

export class CardFooterManager {
  private static instance: CardFooterManager;
  private componentSet: ComponentSetNode | null = null;
  private variantMap = new Map<string, ComponentNode>();

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
    node.layoutSizingHorizontal = "FILL";
    node.layoutSizingVertical = "HUG";

    if (size) {
      variables.setBindVariable(node, 'height', size.height);
      variables.setBindVariable(node, 'paddingLeft', size.padding);
      variables.setBindVariable(node, 'paddingRight', size.padding);
      variables.setBindVariable(node, 'paddingTop', size.padding);
      variables.setBindVariable(node, 'paddingBottom', size.padding);
      variables.setBindVariable(node, 'itemSpacing', size.spacing);
    }
  }

  private async createActionButton(text: string, size: typeof FOOTER_SIZES[keyof typeof FOOTER_SIZES]) {
    const button = await buttonHandlers.createInstance({
      size: size.buttonSize,
      variant: 'filled',
      type: 'primary'
    }, { text });
    return button;
  }

  private async createActionContainer(size: typeof FOOTER_SIZES[keyof typeof FOOTER_SIZES], alignment: string) {
    const container = figma.createFrame();
    container.name = "Action Container";
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

    container.layoutSizingHorizontal = "FILL";
    container.layoutSizingVertical = "HUG";

    // 기본 액션 버튼 추가
    const primaryAction = await this.createActionButton("Primary", size);
    const secondaryAction = await this.createActionButton("Secondary", size);
    if (primaryAction && secondaryAction) {
      container.appendChild(primaryAction);
      container.appendChild(secondaryAction);
    }

    return container;
  }

  async createComponent(variant: CardFooterVariantProps): Promise<ComponentNode> {
    console.log('👣 CardFooterManager.createComponent:', { variant });
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
      }
    }
    
    // 스타일 적용
    await this.applyStyle(footer, variant);
    
    return footer;
  }

  private async applyStyle(footer: ComponentNode, variant: CardFooterVariantProps) {
    // variant에 따른 스타일 적용
    if (variant.variant === 'outlined') {
      footer.strokes = [variables.bindVariable('surface/color/border')];
      variables.setBindVariable(footer, 'strokeWeight', 'border/width/default');
    } else if (variant.variant === 'elevated') {
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
    });

    return this.componentSet;
  }

  private setupComponentSetLayout(componentSet: ComponentSetNode) {
    componentSet.name = "Card Footer";
    componentSet.layoutMode = "HORIZONTAL";
    componentSet.layoutWrap = "WRAP";
    componentSet.itemSpacing = 40;
    componentSet.counterAxisSpacing = 40;
    componentSet.paddingLeft = componentSet.paddingRight = 40;
    componentSet.paddingTop = componentSet.paddingBottom = 40;
    componentSet.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    componentSet.primaryAxisSizingMode = "AUTO";
    componentSet.counterAxisSizingMode = "AUTO";
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
    console.log('👣 CardFooterManager.createInstance:', { props });
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
    // 액션 버튼 업데이트
    if (props.actions?.length) {
      const actionContainer = instance.findOne(node => node.name === "Action Container") as FrameNode;
      if (actionContainer) {
        // 기존 버튼 제거
        actionContainer.children.forEach(child => child.remove());
        
        // 새 버튼 추가
        for (const action of props.actions) {
          const button = await this.createActionButton(action, FOOTER_SIZES[props.size || 'medium']);
          if (button) {
            actionContainer.appendChild(button);
          }
        }
      }
    }
  }
} 
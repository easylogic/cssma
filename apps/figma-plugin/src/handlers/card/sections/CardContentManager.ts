import { CardContentProps, CardContentVariantProps, CONTENT_SIZES, CONTENT_VARIANTS } from '@/types/card';
import { variables } from '@/variables';
import { createHandlers } from '../../createBase';

export class CardContentManager {
  private static instance: CardContentManager;
  private componentSet: ComponentSetNode | null = null;
  private variantMap = new Map<string, ComponentNode>();

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new CardContentManager();
    }
    return this.instance;
  }

  private getVariantKey(variant: CardContentVariantProps): string {
    return [
      'size=' + (variant.size || 'medium'),
      'variant=' + (variant.variant || 'filled'),
      'withTitle=' + (variant.withTitle || false),
      'withDescription=' + (variant.withDescription || false)
    ].join(',');
  }

  private setupBaseLayout(node: FrameNode | ComponentNode, size?: typeof CONTENT_SIZES[keyof typeof CONTENT_SIZES]) {
    node.layoutMode = "VERTICAL";
    node.primaryAxisAlignItems = "MIN";
    node.counterAxisAlignItems = "MIN";
    node.layoutSizingHorizontal = "FILL";
    node.layoutSizingVertical = "HUG";

    if (size) {
      variables.setBindVariable(node, 'paddingLeft', size.padding);
      variables.setBindVariable(node, 'paddingRight', size.padding);
      variables.setBindVariable(node, 'paddingTop', size.padding);
      variables.setBindVariable(node, 'paddingBottom', size.padding);
      variables.setBindVariable(node, 'itemSpacing', size.spacing);
    }
  }

  private async createTitle(size: typeof CONTENT_SIZES[keyof typeof CONTENT_SIZES]) {
    const title = await createHandlers.text({
      text: "Title",
      name: "Title",
      fills: [variables.bindVariable(`text/color/default`)]
    });
    variables.setBindVariable(title, 'fontSize', size.fontSize.title);
    return title;
  }

  private async createDescription(size: typeof CONTENT_SIZES[keyof typeof CONTENT_SIZES]) {
    const description = await createHandlers.text({
      text: "Description goes here. This can be a longer text that spans multiple lines and provides detailed information.",
      name: "Description",
      fills: [variables.bindVariable(`text/color/secondary`)]
    });
    variables.setBindVariable(description, 'fontSize', size.fontSize.description);
    return description;
  }

  async createComponent(variant: CardContentVariantProps): Promise<ComponentNode> {
    console.log('📝 CardContentManager.createComponent:', { variant });
    const content = figma.createComponent();
    const size = CONTENT_SIZES[variant.size || 'medium'];
    content.name = this.getVariantKey(variant);
    
    // 기본 레이아웃 설정
    this.setupBaseLayout(content, size);
    
    // 제목 (옵션)
    if (variant.withTitle) {
      const title = await this.createTitle(size);
      content.appendChild(title);
    }
    
    // 설명 (옵션)
    if (variant.withDescription) {
      const description = await this.createDescription(size);
      content.appendChild(description);
    }
    
    // 스타일 적용
    await this.applyStyle(content, variant);
    
    return content;
  }

  private async applyStyle(content: ComponentNode, variant: CardContentVariantProps) {
    // variant에 따른 스타일 적용
    if (variant.variant === 'outlined') {
      content.strokes = [variables.bindVariable('surface/color/border')];
      variables.setBindVariable(content, 'strokeWeight', 'border/width/default');
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
      content.effects = [shadow];
    }
  }

  private async createVariantComponents(): Promise<ComponentNode[]> {
    return Promise.all(CONTENT_VARIANTS.map(variant => this.createComponent(variant)));
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
    componentSet.name = "Card Content";
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

  private getVariantFromProps(props: CardContentProps): CardContentVariantProps {
    return {
      size: props.size || 'medium',
      variant: props.variant || 'filled',
      withTitle: !!props.title,
      withDescription: !!props.description
    };
  }

  async createInstance(props: CardContentProps = {}) {
    console.log('📝 CardContentManager.createInstance:', { props });
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

  async updateInstance(instance: InstanceNode, props: CardContentProps = {}) {
    const updateText = (name: string, value?: string) => {
      if (!value) return;
      const node = instance.findOne(node => node.name === name) as TextNode;
      if (node) node.characters = value;
    };

    updateText("Title", props.title);
    updateText("Description", props.description);
  }
} 
import { CardMediaProps, CardMediaVariantProps, MEDIA_SIZES, MEDIA_VARIANTS } from '@/types/card';
import { variables } from '@/variables';

export class CardMediaManager {
  private static instance: CardMediaManager;
  private componentSet: ComponentSetNode | null = null;
  private variantMap = new Map<string, ComponentNode>();

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new CardMediaManager();
    }
    return this.instance;
  }

  private getVariantKey(variant: CardMediaVariantProps): string {
    return [
      'size=' + (variant.size || 'medium'),
      'variant=' + (variant.variant || 'filled'),
      'aspectRatio=' + variant.aspectRatio,
      'withOverlay=' + (variant.withOverlay || false)
    ].join(',');
  }

  private setupBaseLayout(node: FrameNode | ComponentNode, size?: typeof MEDIA_SIZES[keyof typeof MEDIA_SIZES]) {
    node.layoutMode = "VERTICAL";
    node.primaryAxisAlignItems = "CENTER";
    node.counterAxisAlignItems = "CENTER";
    node.layoutSizingVertical = "FIXED";
    node.layoutSizingHorizontal = "FIXED";

    if (size) {
      node.resize(Number(size.width), 0); // 높이는 aspectRatio에 따라 계산됨
      variables.setBindVariable(node, 'topLeftRadius', size.borderRadius);
      variables.setBindVariable(node, 'topRightRadius', size.borderRadius);
      variables.setBindVariable(node, 'bottomLeftRadius', size.borderRadius);
      variables.setBindVariable(node, 'bottomRightRadius', size.borderRadius);
    }
  }

  private calculateHeight(width: number, aspectRatio: string): number {
    const [w, h] = aspectRatio.split('/').map(Number);
    return (width * h) / w;
  }

  private async createPlaceholder(width: number, height: number) {
    const placeholder = figma.createFrame();
    placeholder.name = "Placeholder";
    placeholder.resize(width, height);
    placeholder.fills = [variables.bindVariable('surface/color/default')];
    placeholder.strokes = [variables.bindVariable('surface/color/border')];
    placeholder.strokeWeight = 1;
    placeholder.lockAspectRatio();
    return placeholder;
  }

  private async createOverlay(width: number, height: number) {
    const overlay = figma.createRectangle();
    overlay.name = "Overlay";
    overlay.resize(width, height);
    overlay.fills = [{
      type: 'SOLID',
      color: { r: 0, g: 0, b: 0 },
      opacity: 0.4
    }];
    overlay.lockAspectRatio();
    return overlay;
  }

  async createComponent(variant: CardMediaVariantProps): Promise<ComponentNode> {
    console.log('🖼️ CardMediaManager.createComponent:', { variant });
    const media = figma.createComponent();
    const size = MEDIA_SIZES[variant.size || 'medium'];
    media.name = this.getVariantKey(variant);
    
    // 기본 레이아웃 설정
    this.setupBaseLayout(media, size);
    
    // 크기 계산
    const width = Number(size.width);
    const height = this.calculateHeight(width, variant.aspectRatio);
    media.resize(width, height);
    
    // 플레이스홀더 생성
    const placeholder = await this.createPlaceholder(width, height);
    media.appendChild(placeholder);
    
    // 오버레이 (옵션)
    if (variant.withOverlay) {
      const overlay = await this.createOverlay(width, height);
      media.appendChild(overlay);
    }
    
    // 스타일 적용
    await this.applyStyle(media, variant);
    
    return media;
  }

  private async applyStyle(media: ComponentNode, variant: CardMediaVariantProps) {
    // variant에 따른 스타일 적용
    if (variant.variant === 'outlined') {
      media.strokes = [variables.bindVariable('surface/color/border')];
      variables.setBindVariable(media, 'strokeWeight', 'border/width/default');
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
      media.effects = [shadow];
    }
  }

  private async createVariantComponents(): Promise<ComponentNode[]> {
    return Promise.all(MEDIA_VARIANTS.map(variant => this.createComponent(variant)));
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
    componentSet.name = "Card Media";
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

  private getVariantFromProps(props: CardMediaProps): CardMediaVariantProps {
    return {
      size: props.size || 'medium',
      variant: props.variant || 'filled',
      aspectRatio: props.aspectRatio || '16/9',
      withOverlay: props.overlay
    };
  }

  async createInstance(props: CardMediaProps = {}) {
    console.log('🖼️ CardMediaManager.createInstance:', { props });
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

  async updateInstance(instance: InstanceNode, props: CardMediaProps = {}) {
    // 이미지 업데이트 (실제로는 이미지 URL을 처리하는 로직이 필요)
    if (props.image) {
      const placeholder = instance.findOne(node => node.name === "Placeholder") as FrameNode;
      if (placeholder) {
        // TODO: 이미지 로딩 및 적용 로직
        placeholder.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];
      }
    }
  }
} 
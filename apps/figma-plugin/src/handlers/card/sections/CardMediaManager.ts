import { CardMediaProps, CardMediaVariantProps } from '@/types/card';
import { variables } from '@/variables';
import { MEDIA_SIZES, MEDIA_VARIANTS } from '@/constants/cardStyles';
import { CARD_MEDIA_STYLES } from '@/constants/card/styles';

export class CardMediaManager {
  private static instance: CardMediaManager;
  private componentSet: ComponentSetNode | null = null;
  private variantMap = new Map<string, ComponentNode>();
  private imageUrlId: string | null = null;

  private readonly ROLES = {
    PLACEHOLDER: 'media-placeholder',
    IMAGE: 'media-image',
    CONTAINER: 'media-container'
  } as const;

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
      'aspectRatio=' + variant.aspectRatio
    ].join(',');
  }

  private setupBaseLayout(node: FrameNode | ComponentNode, size?: typeof MEDIA_SIZES[keyof typeof MEDIA_SIZES]) {
    node.layoutMode = "HORIZONTAL";
    node.primaryAxisAlignItems = "CENTER";
    node.counterAxisAlignItems = "CENTER";
    node.layoutSizingVertical = "FIXED";
    node.layoutSizingHorizontal = "FIXED";
    node.fills = [variables.bindVariable('surface/color/default')];

    if (size) {
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
    placeholder.setPluginData('role', this.ROLES.PLACEHOLDER);
    placeholder.resize(width, height);
    placeholder.fills = [variables.bindVariable('surface/color/default')];
    placeholder.strokes = [variables.bindVariable('component/base/border/color/default')];
    placeholder.strokeWeight = 1;
    placeholder.constrainProportions = true;
    return placeholder;
  }

  private findNodeByRole(component: ComponentNode | InstanceNode, role: string): SceneNode | null {
    return component.findOne(node => node.getPluginData('role') === role);
  }

  async createComponent(variant: CardMediaVariantProps): Promise<ComponentNode> {
    const media = figma.createComponent();
    const size = MEDIA_SIZES[variant.size || 'medium'];
    media.name = this.getVariantKey(variant);
    media.setPluginData('role', this.ROLES.CONTAINER);
    
    // 기본 레이아웃 설정
    this.setupBaseLayout(media, size);
    
    // 크기 계산
    const width = Number(size.width);
    const height = this.calculateHeight(width, variant.aspectRatio);
    media.resize(width, height);

    media.lockAspectRatio();
    
    // 플레이스홀더 생성
    const placeholder = await this.createPlaceholder(width, height);
    media.appendChild(placeholder);
    placeholder.layoutPositioning = "ABSOLUTE";
    placeholder.constraints = { horizontal: "STRETCH", vertical: "STRETCH" };
    placeholder.x = 0;
    placeholder.y = 0;
    
    await this.applyStyle(media, variant);
    
    return media;
  }

  private async applyStyle(media: ComponentNode, variant: CardMediaVariantProps) {
    const variantStyle = CARD_MEDIA_STYLES[variant.variant || 'filled'];
    const state = variant.disabled ? 'disabled' : 'default';

    // 오버레이 설정
    if (variant.withOverlay) {
      const overlay = figma.createFrame();
      overlay.name = "Overlay";
      overlay.fills = [variables.bindVariable(variantStyle.overlay[state])];
      media.appendChild(overlay);
      
      overlay.layoutPositioning = "ABSOLUTE";
      overlay.constraints = { horizontal: "STRETCH", vertical: "STRETCH" };
      overlay.x = 0;
      overlay.y = 0;
      overlay.resize(media.width, media.height);
    }

    // 미디어 컨테이너 스타일 적용
    const placeholder = this.findNodeByRole(media, this.ROLES.PLACEHOLDER) as FrameNode;
    if (placeholder) {
      // 배경색 설정
      placeholder.fills = [variables.bindVariable('surface/color/default')];
      
      // 테두리 설정
      if (variant.variant === 'outlined') {
        placeholder.strokes = [variables.bindVariable('border/color/default')];
        variables.setBindVariable(placeholder, 'strokeWeight', 'border/width/default');
        placeholder.strokeAlign = 'INSIDE';
      } else {
        placeholder.strokes = [];
      }
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
    componentSet.resize(400, componentSet.height);

    // 이미지 URL 프로퍼티만 추가
    this.imageUrlId = componentSet.addComponentProperty('imageUrl', 'TEXT', '');

    componentSet.descriptionMarkdown = `
# Card Media Component

Displays images or videos with configurable aspect ratios.

## Properties
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| imageUrl | \`text\` | - | URL of the image to display |
| aspectRatio | \`string\` | \`16/9\` | Media aspect ratio |

## Aspect Ratios
- \`16/9\`: Landscape/Video (1.78:1)
- \`4/3\`: Standard (1.33:1)
- \`1/1\`: Square (1:1)

## Features
- Maintains aspect ratio
- Supports image loading
- Responsive scaling

## Best Practices
- Use consistent aspect ratios
- Optimize image resolution
- Test with different image types
    `.trim();
  }

  private getVariantFromProps(props: CardMediaProps): CardMediaVariantProps {
    return {
      size: props.size || 'medium',
      variant: props.variant || 'filled',
      aspectRatio: props.aspectRatio || '16/9'
    };
  }

  async createInstance(props: CardMediaProps = {}) {
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
    // 이미지 업데이트
    if (props.image) {
      const placeholder = this.findNodeByRole(instance, this.ROLES.PLACEHOLDER) as FrameNode;
      if (placeholder) {
        try {
          const response = await fetch(props.image);
          const imageData = await response.arrayBuffer();
          const image = figma.createImage(new Uint8Array(imageData));
          placeholder.fills = [{
            type: 'IMAGE',
            imageHash: image.hash,
            scaleMode: 'FILL'
          }];
        } catch (error) {
          console.error('Failed to load image:', error);
          placeholder.fills = [variables.bindVariable('surface/color/default')];
        }
      }
    } else {
      const placeholder = this.findNodeByRole(instance, this.ROLES.PLACEHOLDER) as FrameNode;
      if (placeholder) {
        placeholder.fills = [variables.bindVariable('surface/color/default')];
        placeholder.strokes = [variables.bindVariable('component/base/border/color/default')];
      }
    }
  }
} 
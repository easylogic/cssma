import { CardContentProps, CardContentVariantProps } from '@/types/card';
import { variables } from '@/variables';
import { createHandlers } from '../../createBase';
import { CONTENT_SIZES, CONTENT_VARIANTS } from '@/constants/cardStyles';
import { CARD_CONTENT_STYLES } from '@/constants/card/styles';

export class CardContentManager {
  private static instance: CardContentManager;
  private componentSet: ComponentSetNode | null = null;
  private variantMap = new Map<string, ComponentNode>();
  private descriptionId: string | null = null;

  private readonly ROLES = {
    DESCRIPTION: 'description'
  }

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
      'withDescription=' + (variant.withDescription || false)
    ].join(',');
  }

  private setupBaseLayout(node: FrameNode | ComponentNode, size?: typeof CONTENT_SIZES[keyof typeof CONTENT_SIZES]) {
    node.layoutMode = "VERTICAL";
    node.primaryAxisAlignItems = "MIN";
    node.counterAxisAlignItems = "MIN";

    if (size) {
      variables.setBindVariable(node, 'paddingLeft', size.padding);
      variables.setBindVariable(node, 'paddingRight', size.padding);
      variables.setBindVariable(node, 'paddingTop', size.padding);
      variables.setBindVariable(node, 'paddingBottom', size.padding);
      variables.setBindVariable(node, 'itemSpacing', size.spacing);
    }
  }

  private async createDescription(size: typeof CONTENT_SIZES[keyof typeof CONTENT_SIZES]) {
    const description = await createHandlers.text({
      text: "Description goes here. This can be a longer text that spans multiple lines and provides detailed information.",
      name: "Description",
      fills: [variables.bindVariable(`text/color/secondary`)]
    });
    description.setPluginData('role', this.ROLES.DESCRIPTION);
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

    console.log(variant);
    
    // 설명 (옵션)
    if (variant.withDescription) {
      const description = await this.createDescription(size);
      content.appendChild(description);
      description.layoutSizingHorizontal = "FILL";
      description.layoutSizingVertical = "HUG";
    }
    
    // 스타일 적용
    await this.applyStyle(content, variant);
    
    return content;
  }

  private async applyStyle(content: ComponentNode, variant: CardContentVariantProps) {
    const variantStyle = CARD_CONTENT_STYLES[variant.variant || 'filled'];
    const state = variant.disabled ? 'disabled' : 'default';


    console.log('🔍 CardContentManager.applyStyle:', { variantStyle, state });
    // 배경색 설정
    content.fills = [variables.bindVariable(variantStyle.background[state])];
    
    // 테두리 설정
    if (variant.variant === 'outlined') {
      content.strokes = [variables.bindVariable(variantStyle.border[state])];
      variables.setBindVariable(content, 'strokeWeight', 'border/width/default');
      content.strokeAlign = 'INSIDE';
    }

    // 텍스트 색상 설정
    const textNodes = content.findAll(node => node.type === "TEXT") as TextNode[];
    textNodes.forEach(textNode => {
      textNode.fills = [variables.bindVariable(variantStyle.text[state])];
    });
  }

  private async createVariantComponents(): Promise<ComponentNode[]> {
    return Promise.all(CONTENT_VARIANTS.map(variant => this.createComponent(variant)));
  }

  private findNodeByRole(component: ComponentNode, role: string): TextNode | null {
    return component.findOne(node => node.getPluginData('role') === role) as TextNode | null;
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

      // description 적용
      const description = this.findNodeByRole(component, this.ROLES.DESCRIPTION);
      if (description) {
        description.componentPropertyReferences = {
          characters: this.descriptionId!
        }
      }
    });

    return this.componentSet;
  }

  private setupComponentSetLayout(componentSet: ComponentSetNode) {
    componentSet.name = "Card Content";
    componentSet.layoutMode = "VERTICAL";
    componentSet.itemSpacing = 40;
    componentSet.counterAxisSpacing = 40;
    componentSet.paddingLeft = componentSet.paddingRight = 40;
    componentSet.paddingTop = componentSet.paddingBottom = 40;
    componentSet.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    componentSet.resize(400, componentSet.height);
    componentSet.primaryAxisSizingMode = "AUTO";
    componentSet.counterAxisSizingMode = "FIXED";

    componentSet.descriptionMarkdown = `
# Card Content Component

Main content area for text and other elements.

## Properties
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| title | \`text\` | - | Content title |
| description | \`text\` | - | Main content text |
| withDescription | \`boolean\` | \`true\` | Shows description |

## Text Properties
- Description: \`{description}\`

## Variants
- **Size**: \`small\` \`medium\` \`large\`
- **Style**: \`filled\` \`outlined\` \`elevated\`

## Typography
- Title: Uses semantic text styles
- Description: Supports multi-line text
- Proper line height and spacing

## Best Practices
- Keep content concise and readable
- Use appropriate text hierarchy
- Consider line length for readability
- Maintain consistent padding
    `.trim();

    this.descriptionId = componentSet.addComponentProperty('description', 'TEXT', 'Description goes here. This can be a longer text that spans multiple lines and provides detailed information.');

    for(const key in componentSet.componentPropertyDefinitions) {
      if (key.startsWith('description') && key.includes('#')) {
        this.descriptionId = key;
      }
    }
  }

  private getVariantFromProps(props: CardContentProps): CardContentVariantProps {
    return {
      size: props.size || 'medium',
      variant: props.variant || 'filled',
      withDescription: !!props.withDescription,
    };
  }

  async createInstance(props: CardContentProps = {}) {
    console.log('📝 CardContentManager.createInstance:', { props });
    const componentSet = await this.getComponentSet();
    if (!componentSet) return null;

    const variant = this.getVariantFromProps(props);
    const variantKey = this.getVariantKey(variant);
    const targetVariant = this.variantMap.get(variantKey) || componentSet.defaultVariant;
    console.log(targetVariant, variantKey);
    if (!targetVariant) return null;

    const instance = targetVariant.createInstance();
    console.log(instance);
    await this.updateInstance(instance, props);
    
    return instance;
  }

  async updateInstance(instance: InstanceNode, props: CardContentProps = {}) {
    const updateText = (name: string, value?: string) => {
      if (!value) return;
      const node = instance.findOne(node => node.name === name) as TextNode;
      if (node) node.characters = value;
    };

    if (props.description) {
      updateText("Description", props.description);
    }
  }
} 
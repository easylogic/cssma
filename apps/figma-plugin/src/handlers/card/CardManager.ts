import { CardVariantProps, CardInstance } from '@/types/card';
import { variables } from '@/variables';
import { CardHeaderManager } from './sections/CardHeaderManager';
import { CardMediaManager } from './sections/CardMediaManager';
import { CardContentManager } from './sections/CardContentManager';
import { CardFooterManager } from './sections/CardFooterManager';
import { CARD_SIZES } from '@/constants/cardStyles';

export class CardCreator {
  private static instance: CardCreator;
  private componentSet: ComponentSetNode | null = null;
  private variantMap = new Map<string, ComponentNode>();

  // 섹션 매니저 인스턴스
  private headerManager = CardHeaderManager.getInstance();
  private mediaManager = CardMediaManager.getInstance();
  private contentManager = CardContentManager.getInstance();
  private footerManager = CardFooterManager.getInstance();

  private readonly ROLES = {
    SECTIONS_CONTAINER: 'card-sections-container',
    LOADING_OVERLAY: 'card-loading-overlay',
    LOADING_INDICATOR: 'card-loading-indicator'
  } as const;

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new CardCreator();
    }
    return this.instance;
  }

  private getVariantKey(variant: CardVariantProps): string {
    const sections = [
      variant.header && 'header',
      variant.media && 'media',
      'content',
      variant.footer && 'footer'
    ].filter(Boolean);

    return [
      'size=' + (variant.size || 'medium'),
      'variant=' + (variant.variant || 'filled'),
      'status=' + (variant.status || 'default'),
      'interactive=' + (variant.interactive || false),
      'loading=' + (variant.loading || false),
      'sections=' + sections.join('+')
    ].join(',');
  }

  private setupBaseLayout(node: FrameNode | ComponentNode, size: typeof CARD_SIZES[keyof typeof CARD_SIZES]) {
    // 먼저 레이아웃 모드 설정
    node.layoutMode = "VERTICAL";
    node.primaryAxisAlignItems = "MIN";
    node.counterAxisAlignItems = "MIN";
    node.primaryAxisSizingMode = "AUTO";
    node.counterAxisSizingMode = "AUTO";
    
    // 크기 설정
    node.resize(size.width, node.height);

    // 스타일 변수 설정
    variables.setBindVariable(node, 'itemSpacing', size.spacing);
    // variables.setBindVariable(node, 'paddingLeft', size.padding);
    // variables.setBindVariable(node, 'paddingRight', size.padding);
    // variables.setBindVariable(node, 'paddingTop', size.padding);
    // variables.setBindVariable(node, 'paddingBottom', size.padding);
    variables.setBindVariable(node, 'topLeftRadius', size.borderRadius);
    variables.setBindVariable(node, 'topRightRadius', size.borderRadius);
    variables.setBindVariable(node, 'bottomLeftRadius', size.borderRadius);
    variables.setBindVariable(node, 'bottomRightRadius', size.borderRadius);
  }

  private async createSectionsContainer(size: typeof CARD_SIZES[keyof typeof CARD_SIZES]) {
    const container = figma.createFrame();
    container.name = "Sections";
    container.setPluginData('role', this.ROLES.SECTIONS_CONTAINER);
    variables.setBindVariable(container, 'topLeftRadius', size.borderRadius);
    variables.setBindVariable(container, 'topRightRadius', size.borderRadius);
    variables.setBindVariable(container, 'bottomLeftRadius', size.borderRadius);
    variables.setBindVariable(container, 'bottomRightRadius', size.borderRadius);
    
    // 레이아웃 설정
    container.layoutMode = "VERTICAL";
    container.primaryAxisSizingMode = "AUTO";
    container.counterAxisSizingMode = "AUTO";
    variables.setBindVariable(container, 'itemSpacing', size.spacing);
    
    // 스타일 설정
    container.fills = [];
    
    return container;
  }

  private async createLoadingOverlay(width: number, height: number) {
    const overlay = figma.createFrame();
    overlay.name = "Loading Overlay";
    overlay.setPluginData('role', this.ROLES.LOADING_OVERLAY);
    
    // 레이아웃 설정
    overlay.layoutMode = "HORIZONTAL";
    overlay.primaryAxisAlignItems = "CENTER";
    overlay.counterAxisAlignItems = "CENTER";
    overlay.resize(width, height);
    
    // 스타일 설정
    overlay.fills = [{ 
      type: 'SOLID', 
      color: { r: 1, g: 1, b: 1 },
      opacity: 0.7 
    }];
    
    // 로딩 인디케이터 추가
    const indicator = figma.createFrame();
    indicator.name = "Loading Indicator";
    indicator.setPluginData('role', this.ROLES.LOADING_INDICATOR);
    indicator.resize(32, 32);
    indicator.cornerRadius = 16;
    indicator.fills = [variables.bindVariable('surface/color/secondary')];
    
    overlay.appendChild(indicator);
    return overlay;
  }

  private findNodeByRole(component: ComponentNode | InstanceNode, role: string): SceneNode | null {
    return component.findOne(node => node.getPluginData('role') === role);
  }

  async createComponent(variant: CardVariantProps): Promise<ComponentNode> {
    console.log('🎯 CardManager.createComponent - Start', { variant });
    
    const card = figma.createComponent();
    const size = CARD_SIZES[variant.size || 'medium'];
    card.name = this.getVariantKey(variant);
    
    // 기본 레이아웃 설정
    this.setupBaseLayout(card, size);
    
    // 섹션 컨테이너 생성
    const sectionsContainer = await this.createSectionsContainer(size);
    card.appendChild(sectionsContainer);
    sectionsContainer.layoutSizingHorizontal = "FILL";
    sectionsContainer.layoutSizingVertical = "HUG";
    
    // 섹션 추가
    if (variant.header) {
      console.log('👤 Creating header:', variant.header);
      const headerInstance = await this.headerManager.createInstance({
        size: variant.size,
        variant: variant.variant,
        ...variant.header
      });
      if (headerInstance) {
        sectionsContainer.appendChild(headerInstance);
        headerInstance.layoutSizingHorizontal = "FILL";
        headerInstance.layoutSizingVertical = "HUG";
      }
    }
    
    if (variant.media) {
      console.log('🖼️ Creating media:', variant.media);
      const mediaInstance = await this.mediaManager.createInstance({
        size: variant.size,
        variant: variant.variant,
        aspectRatio: variant.media.aspectRatio || '16/9',
        withOverlay: variant.interactive
      });
      if (mediaInstance) {
        sectionsContainer.appendChild(mediaInstance);
        mediaInstance.layoutSizingHorizontal = "FILL";
        mediaInstance.layoutSizingVertical = "HUG";
      }
    }
    
    if (variant.content) {
      // 컨텐츠는 항상 추가
      console.log('📝 Creating content:', variant.content);
      const contentInstance = await this.contentManager.createInstance({
        size: variant.size,
        variant: variant.variant,
        withDescription: variant.content?.withDescription,
        description: variant.content?.description
      });
      if (contentInstance) {
        sectionsContainer.appendChild(contentInstance);
        contentInstance.layoutSizingHorizontal = "FILL";
        contentInstance.layoutSizingVertical = "HUG";
      }
    }
    
    if (variant.footer) {
      console.log('👣 Creating footer:', variant.footer);
      const footerInstance = await this.footerManager.createInstance({
        size: variant.size,
        variant: variant.variant,
        withActions: variant.footer.withActions,
        alignment: variant.footer.alignment
      });
      if (footerInstance) {
        sectionsContainer.appendChild(footerInstance);
        footerInstance.layoutSizingHorizontal = "FILL";
      }
    }
    
    // 스타일 적용
    await this.applyStyle(card, variant);
    
    return card;
  }

  private async applyStyle(card: ComponentNode, variant: CardVariantProps) {
    const state = variant.status || 'default';
    
    // 배경색 설정
    card.fills = [variables.bindVariable(`surface/color/${state}`)];
    
    // 테두리 설정
    card.strokes = [variables.bindVariable(`surface/color/border`)];
    variables.setBindVariable(card, 'strokeWeight', 'border/width/default');
    card.strokeAlign = 'CENTER';
    
    // 그림자 설정
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
      card.effects = [shadow];
    }
    
    // 상호작용 상태 설정
    if (variant.interactive) {
      card.setRelaunchData({ 
        click: 'Click to interact',
        hover: 'Hover to preview'
      });
    }

    // 로딩 상태 설정
    if (variant.loading) {
      const overlay = await this.createLoadingOverlay(card.width, card.height);
      card.appendChild(overlay);
    }
  }

  private async createVariantComponents(): Promise<ComponentNode[]> {
    const variants: CardVariantProps[] = [
      // 기본 레이아웃 변형
      { size: 'medium', variant: 'filled', content: { withDescription: true } },
      { size: 'medium', variant: 'filled', header: {} },
      { size: 'medium', variant: 'filled', media: { aspectRatio: '16/9' } },
      { size: 'medium', variant: 'filled', footer: { withActions: true } },
      { size: 'medium', variant: 'filled', header: {}, media: { aspectRatio: '16/9' } },
      { size: 'medium', variant: 'filled', media: { aspectRatio: '16/9' }, footer: { withActions: true } },
      { size: 'medium', variant: 'filled', header: {}, footer: { withActions: true } },
      { 
        size: 'medium', 
        variant: 'filled', 
        header: {}, 
        media: { aspectRatio: '16/9' }, 
        footer: { withActions: true } 
      },
      
      // 크기 변형
      { 
        size: 'small', 
        variant: 'filled', 
        header: {}, 
        media: { aspectRatio: '16/9' }, 
        footer: { withActions: true } 
      },
      { 
        size: 'large', 
        variant: 'filled', 
        header: {}, 
        media: { aspectRatio: '16/9' }, 
        footer: { withActions: true } 
      },
      
      // 스타일 변형
      { 
        size: 'medium', 
        variant: 'outlined', 
        header: {}, 
        media: { aspectRatio: '16/9' }, 
        footer: { withActions: true } 
      },
      { 
        size: 'medium', 
        variant: 'elevated', 
        header: {}, 
        media: { aspectRatio: '16/9' }, 
        footer: { withActions: true } 
      },
      
      // 상태 변형
      { size: 'medium', variant: 'filled', status: 'error' },
      { size: 'medium', variant: 'filled', loading: true },
      { size: 'medium', variant: 'filled', interactive: true },
      
      // 특수 조합
      { 
        size: 'medium', 
        variant: 'elevated', 
        interactive: true,
        header: { withAvatar: true },
        media: { aspectRatio: '16/9' },
        footer: { withActions: true }
      },
      { 
        size: 'large', 
        variant: 'outlined', 
        status: 'error',
        header: { withExtra: true },
        content: { withDescription: true },
        footer: { withActions: true, alignment: 'right' }
      }
    ];

    return Promise.all(variants.map(variant => this.createComponent(variant)));
  }

  async getComponentSet(): Promise<ComponentSetNode> {
    if (this.componentSet) return this.componentSet;

    const components = await this.createVariantComponents();
    
    // 1. 먼저 컴포넌트 세트 생성
    this.componentSet = figma.combineAsVariants(components, figma.currentPage);
    
    // 2. 컴포넌트 세트의 레이아웃 설정
    this.setupComponentSetLayout(this.componentSet);

    // 3. 각 컴포넌트의 레이아웃 설정
    components.forEach(component => {
      this.variantMap.set(component.name, component);
      
      component.layoutSizingHorizontal = "FIXED";
      component.layoutSizingVertical = "HUG";
      
      // // 그 다음 자식 요소들의 레이아웃 설정
      // component.children.forEach(child => {
      //   if (child.type === "FRAME" || child.type === "INSTANCE") {
      //     child.layoutSizingHorizontal = "FILL";
      //     child.layoutSizingVertical = "HUG";
      //   }
      // });
    });

    return this.componentSet;
  }

  private setupComponentSetLayout(componentSet: ComponentSetNode) {
    componentSet.name = "Card";
    
    // 먼저 레이아웃 모드 설정
    componentSet.layoutMode = "HORIZONTAL";
    componentSet.layoutWrap = "WRAP";
    componentSet.primaryAxisSizingMode = "FIXED";
    componentSet.counterAxisSizingMode = "AUTO";
    
    // 그 다음 나머지 속성 설정
    componentSet.itemSpacing = 40;
    componentSet.counterAxisSpacing = 40;
    componentSet.paddingLeft = componentSet.paddingRight = 40;
    componentSet.paddingTop = componentSet.paddingBottom = 40;
    componentSet.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    componentSet.resize(1800, componentSet.height);

    // 컴포넌트 세트 설명 추가
    componentSet.descriptionMarkdown = `
# Card Component

A versatile container for displaying content and actions.

## Sections
- Header (optional): Title, subtitle, avatar, or actions
- Media (optional): Images or videos with optional overlay
- Content (required): Main content area
- Footer (optional): Actions and additional information

## Properties
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| size | \`small\` \`medium\` \`large\` | \`medium\` | Controls the overall size |
| variant | \`filled\` \`outlined\` \`elevated\` | \`filled\` | Visual style |
| status | \`default\` \`error\` | \`default\` | Current status |
| interactive | \`boolean\` | \`false\` | Makes card clickable |
| loading | \`boolean\` | \`false\` | Shows loading state |

## Best Practices
- Use cards to group related information
- Combine different sections based on content needs
- Consider interactive state for clickable cards
- Use proper hierarchy with title and content
    `.trim();
  }

  async createInstance(variant: CardVariantProps, props: CardInstance = {}) {
    const componentSet = await this.getComponentSet();
    if (!componentSet) return null;

    // 적절한 변형 찾기
    const variantKey = this.getVariantKey(variant);
    const targetVariant = this.variantMap.get(variantKey) || componentSet.defaultVariant;
    
    if (!targetVariant) return null;

    const instance = targetVariant.createInstance();
    
    // 인스턴스 업데이트
    await this.updateInstance(instance, props);
    
    return instance;
  }

  async updateInstance(instance: InstanceNode, props: CardInstance = {}) {
    const sectionsContainer = this.findNodeByRole(instance, this.ROLES.SECTIONS_CONTAINER) as FrameNode;
    if (!sectionsContainer) return;

    // 헤더 업데이트
    if (props.header) {
      const header = sectionsContainer.findOne(node => 
        node.type === "INSTANCE" && node.name.includes("Card Header")
      ) as InstanceNode;
      if (header) {
        await this.headerManager.updateInstance(header, props.header);
      }
    }
    
    // 미디어 업데이트
    if (props.media) {
      const media = sectionsContainer.findOne(node => 
        node.type === "INSTANCE" && node.name.includes("Card Media")
      ) as InstanceNode;
      if (media) {
        await this.mediaManager.updateInstance(media, props.media);
      }
    }
    
    // 컨텐츠 업데이트
    if (props.content) {
      const content = sectionsContainer.findOne(node => 
        node.type === "INSTANCE" && node.name.includes("Card Content")
      ) as InstanceNode;
      if (content) {
        await this.contentManager.updateInstance(content, props.content);
      }
    }
    
    // 푸터 업데이트
    if (props.footer) {
      const footer = sectionsContainer.findOne(node => 
        node.type === "INSTANCE" && node.name.includes("Card Footer")
      ) as InstanceNode;
      if (footer) {
        await this.footerManager.updateInstance(footer, props.footer);
      }
    }
  }
} 
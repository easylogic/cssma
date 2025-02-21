// handlers/icon/IconManager.ts
import { ICON_SIZES, ICON_VARIANTS } from "@/constants/iconStyles";
import { IconSizeOption, IconVariantProps } from "@/types/icon";
import { variables } from "@/variables";

export class IconManager {
  private static instance: IconManager;
  private componentSet: ComponentSetNode | null = null;
  private variantMap = new Map<string, ComponentNode>();

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new IconManager();
    }
    return this.instance;
  }

  private getVariantKey(variant: IconVariantProps): string {
    return [
      'size=' + (variant.size || 'medium'),
      'variant=' + (variant.variant || 'filled'),
      'name=' + (variant.name || 'placeholder')
    ].join(',');
  }

  async createComponent(variant: IconVariantProps): Promise<ComponentNode> {
    const icon = figma.createComponent();
    const size = ICON_SIZES[variant.size || 'md'];

    // 컴포넌트 이름 설정
    icon.name = this.getVariantKey(variant);

    console.log('[IconManager] Creating component with variant:', icon.name);

    // 레이아웃 설정
    await this.setupLayout(icon, size);

    // instance swap 아이콘 컨테이너 추가
    await this.addIconContainer(icon, variant);

    return icon;
  }

  async getComponentSet(): Promise<ComponentSetNode> {
    if (this.componentSet) {
      return this.componentSet;
    }

    // 모든 변형 생성
    const components = await Promise.all(
      ICON_VARIANTS.map(variant => this.createComponent(variant))
    );

    // ComponentSet 생성
    this.componentSet = figma.combineAsVariants(components, figma.currentPage);
    this.setupComponentSetLayout(this.componentSet);

    // 변형 맵 업데이트
    components.forEach(component => {
      this.variantMap.set(component.name, component);
    });

    return this.componentSet;
  }

  async createInstance(
    variant: IconVariantProps,
    props?: { color?: string }
  ): Promise<InstanceNode | null> {
    const componentSet = await this.getComponentSet();
    const instance = componentSet.defaultVariant.createInstance();
    
    // 변형 속성 설정
    instance.setProperties({
      size: variant.size || 'md',
      variant: variant.variant || 'filled',
      name: variant.name
    });

    // 색상 설정 (있는 경우)
    if (props?.color) {
      instance.fills = [variables.bindVariable(props.color)];
    }

    return instance;
  }

  private setupComponentSetLayout(componentSet: ComponentSetNode) {
    componentSet.name = "Icon";
    componentSet.layoutMode = "HORIZONTAL";
    componentSet.layoutWrap = "WRAP";
    componentSet.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    componentSet.itemSpacing = 20;

    componentSet.primaryAxisSizingMode = "AUTO";
    componentSet.counterAxisSizingMode = "AUTO";

    componentSet.resize(200, componentSet.height);
  }

  private async setupLayout(icon: ComponentNode, size: IconSizeOption): Promise<void> {
    // 기본 레이아웃 설정
    icon.layoutMode = "HORIZONTAL";
    icon.primaryAxisAlignItems = "CENTER";
    icon.counterAxisAlignItems = "CENTER";
    
    // 크기 설정
    variables.setBindVariable(icon, 'width', size.size);
    variables.setBindVariable(icon, 'height', size.size);
    
    // 패딩 설정
    variables.setBindVariable(icon, 'paddingLeft', size.padding);
    variables.setBindVariable(icon, 'paddingRight', size.padding);
    variables.setBindVariable(icon, 'paddingTop', size.padding);
    variables.setBindVariable(icon, 'paddingBottom', size.padding);

    // 자동 크기 조정
    icon.primaryAxisSizingMode = "FIXED";
    icon.counterAxisSizingMode = "FIXED";

    // 클립 콘텐츠
    icon.clipsContent = true;
  }

  private async addIconContainer(icon: ComponentNode, variant: IconVariantProps): Promise<void> {

    const container = figma.createFrame();
    container.name = "Icon Container";
    container.layoutMode = "HORIZONTAL";
    container.primaryAxisAlignItems = "CENTER";
    container.counterAxisAlignItems = "CENTER";
    
    container.fills = [];
    icon.appendChild(container);
    container.layoutSizingHorizontal = "FILL";
    container.layoutSizingVertical = "FILL";



    // 스와핑 가능한 placeholder 추가
    const placeholder = figma.createFrame();
    placeholder.name = variant.name;
    placeholder.fills = [variables.bindVariable('surface/color/default')];

    container.appendChild(placeholder);
    placeholder.layoutSizingHorizontal = "FILL";
    placeholder.layoutSizingVertical = "FILL";
    
    if (variant.variant === 'outlined') {
      placeholder.strokes = [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }];
      placeholder.strokeWeight = 2;
      placeholder.fills = [];
    }

  }
}
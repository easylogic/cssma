import { BUTTON_SHAPES, BUTTON_SIZES, BUTTON_STYLES, BUTTON_VARIANTS } from "@/constants/buttonStyles";
import { ButtonIconProps, ButtonSize, ButtonSizeConfig, ButtonSizeOption, ButtonVariantProps } from "@/types/button";
import { ComponentSize } from "@/types/component";
import { variables } from "@/variables";
import { iconHandlers } from "../icon";

export class ButtonCreator {
  private static instance: ButtonCreator;
  private componentSet: ComponentSetNode | null = null;
  private variantMap = new Map<string, ComponentNode>();

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new ButtonCreator();
    }
    return this.instance;
  }

  private getVariantKey(variant: ButtonVariantProps): string {
    return [
      'size=' + (variant.size || 'medium'),
      'variant=' + (variant.variant || 'filled'),
      'type=' + (variant.type || 'default'),
      'state=' + (variant.state || 'default'),
      'shape=' + (variant.shape || 'rounded'),
      'icon=' + (variant.icon ? 'with-icon' : 'no-icon')
    ].join(',');
  }

  async createComponent(variant: ButtonVariantProps): Promise<ComponentNode> {
    const button = figma.createComponent();
    const size = BUTTON_SIZES[variant.size || 'medium'];

    // 컴포넌트 이름 설정
    button.name = this.getVariantKey(variant);

    // 레이아웃 설정
    await this.setupLayout(button, size, variant);
    
    // 스타일 적용
    await this.applyStyle(button, variant);
    
    // 아이콘 추가 (있는 경우)
    if (variant.icon) {
      await this.addIcon(button, size, variant);
    }
    
    // 텍스트 추가
    await this.addText(button, size, variant);

    return button;
  }

  async getComponentSet(): Promise<ComponentSetNode> {
    if (this.componentSet) {
      return this.componentSet;
    }

    // 모든 변형 생성
    const components = await Promise.all(
      BUTTON_VARIANTS.map(variant => this.createComponent(variant))
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


  async updateInstance(
    instance: InstanceNode,
    props: {
      text?: string;
      icon?: ButtonIconProps;
    }
  ): Promise<void> {
    if (props.text) {
      const textNode = instance.findOne(node => node.type === "TEXT") as TextNode;
      if (textNode) textNode.characters = props.text;
    }

    if (props.icon) {
      const iconNode = instance.findOne(node => node.name === "Icon") as InstanceNode;
      if (iconNode) {
        // 아이콘 업데이트 로직
        // iconNode.swapComponent(props.icon as ComponentNode);
      }
    }
  }

  async createInstance (
    variant: ButtonVariantProps,
    props: { text?: string; icon?: ButtonIconProps } = {}
  ) {
    console.log('[ButtonManager] Creating instance with variant:', variant);
    
    const componentSet = await this.getComponentSet();
    console.log('[ButtonManager] ComponentSet:', componentSet?.name);
    
    if (!componentSet) {
      console.error('[ButtonManager] Failed to get component set');
      return null;
    }

    // 변형 키 생성
    const variantKey = this.getVariantKey(variant);
    console.log('[ButtonManager] Looking for variant with key:', variantKey);

    // 해당하는 변형 찾기
    const targetVariant = componentSet.findOne(node => 
      node.type === "COMPONENT" && node.name === variantKey
    ) as ComponentNode;

    if (!targetVariant) {
      console.error('[ButtonManager] Could not find matching variant');
      console.log('[ButtonManager] Available variants:', componentSet.children.length);
      return componentSet.defaultVariant.createInstance();
    }

    console.log('[ButtonManager] Found matching variant:', targetVariant.name);
    const instance = targetVariant.createInstance();
    
    // 변형 속성 설정
    try {
      console.log('[ButtonManager] Setting properties:', {
        size: variant.size || 'medium',
        variant: variant.variant || 'filled',
        type: variant.type || 'default',
        state: variant.state || 'default',
        shape: variant.shape || 'rounded'
      });

      instance.setProperties({
        size: variant.size || 'medium',
        variant: variant.variant || 'filled',
        type: variant.type || 'default',
        state: variant.state || 'default',
        shape: variant.shape || 'rounded'
      });
    } catch (error) {
      console.error('[ButtonManager] Error setting properties:', error);
    }

    // 인스턴스 업데이트
    try {
      console.log('[ButtonManager] Updating instance with props:', props);
      await this.updateInstance(instance, props);
    } catch (error) {
      console.error('[ButtonManager] Error updating instance:', error);
    }

    return instance;
  }


  private setupComponentSetLayout(componentSet: ComponentSetNode) {
    componentSet.name = "Button";
    componentSet.layoutMode = "HORIZONTAL";
    componentSet.layoutWrap = "WRAP";
    componentSet.itemSpacing = 40;
    componentSet.counterAxisSpacing = 40;
    componentSet.paddingLeft = componentSet.paddingRight = 40;
    componentSet.paddingTop = componentSet.paddingBottom = 40;
    componentSet.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    componentSet.resize(580, componentSet.height);

    componentSet.primaryAxisSizingMode = "FIXED";
    componentSet.counterAxisSizingMode = "AUTO";
  }

  private async setupLayout(button: ComponentNode, size: ButtonSizeOption, variant: ButtonVariantProps): Promise<void> {
    // 1. 기본 레이아웃 모드 설정
    button.layoutMode = "HORIZONTAL";
    button.counterAxisAlignItems = "CENTER";
    button.primaryAxisAlignItems = "CENTER";


    
    // 2. 크기 설정
    variables.setBindVariable(button, 'height', size.height);
    
    // 3. 패딩 설정
    variables.setBindVariable(button, 'paddingLeft', size.paddingHorizontal);
    variables.setBindVariable(button, 'paddingRight', size.paddingHorizontal);
    variables.setBindVariable(button, 'paddingTop', size.paddingVertical);
    variables.setBindVariable(button, 'paddingBottom', size.paddingVertical);
    
    // 4. 아이템 간격 설정
    variables.setBindVariable(button, 'itemSpacing', size.spacing);
    
    // 5. 모서리 반경 설정
    const shape = variant.shape || 'rounded';
    const borderRadius = BUTTON_SHAPES[shape][variant.size || 'medium'];
    variables.setBindVariable(button, 'topLeftRadius', borderRadius);
    variables.setBindVariable(button, 'topRightRadius', borderRadius);
    variables.setBindVariable(button, 'bottomLeftRadius', borderRadius);
    variables.setBindVariable(button, 'bottomRightRadius', borderRadius);
    
    // 6. 자동 크기 조정 설정
    button.primaryAxisSizingMode = "AUTO";
    button.counterAxisSizingMode = "AUTO";

    // 7. 클립 콘텐츠 설정
    button.clipsContent = true;

    // 8. 이펙트 설정 (필요한 경우)
    button.effects = [];  // 기본적으로 이펙트 초기화
  }

  private async applyStyle(button: ComponentNode, variant: ButtonVariantProps): Promise<void> {
    const styleKey = `${variant.type || 'default'}-${variant.variant || 'filled'}` as keyof typeof BUTTON_STYLES;
    const style = BUTTON_STYLES[styleKey];
    const state = variant.state || 'default';

    // 1. 배경색 설정
    button.fills = [variables.bindVariable(style.background[state])];
    
    // 2. 테두리 설정
    if (variant.variant === 'outlined') {
      // outlined 변형일 경우 테두리 스타일 적용
      button.strokes = [variables.bindVariable(style.border[state])];
      variables.setBindVariable(button, 'strokeWeight', 'border/width/default');
      button.strokeAlign = 'INSIDE';
    } else {
      // filled와 ghost 변형일 경우 테두리 제거
      button.strokes = [];
    }
  }

  private async addIcon(button: ComponentNode, size: ButtonSizeOption, variant: ButtonVariantProps): Promise<void> {
    console.log('[ButtonManager] Adding icon with variant:', variant.icon);
    
    if (!variant.icon?.name) {
      console.log('[ButtonManager] No icon name provided, skipping icon creation');
      return;
    }

    const styleKey = `${variant.type || 'default'}-${variant.variant || 'filled'}` as keyof typeof BUTTON_STYLES;
    const style = BUTTON_STYLES[styleKey];
    const state = variant.state || 'default';

    try {
      // 1. 아이콘 프레임 생성
      console.log('[ButtonManager] Creating icon instance with:', {
        size: variant.icon.size || 'md',
        variant: variant.icon.variant || 'filled',
        name: 'placeholder' // variant.icon.name
      });

      const icon = await iconHandlers.createInstance({
        size: variant.icon.size || 'md',
        variant: variant.icon.variant || 'filled',
        name: 'placeholder' // variant.icon.name
      });

      if (!icon) {
        console.error('[ButtonManager] Failed to create icon instance');
        return;
      }
      
      console.log('[ButtonManager] Successfully created icon instance');
      
      // 2. 아이콘 크기 설정
      console.log('[ButtonManager] Setting icon size:', size.iconSize);
      variables.setBindVariable(icon, 'width', size.iconSize);
      variables.setBindVariable(icon, 'height', size.iconSize);
      
      // 3. 아이콘 색상 설정
      console.log('[ButtonManager] Setting icon color from style:', style.text[state]);
      // icon.fills = [variables.bindVariable(style.text[state])];

      // 4. 아이콘 레이아웃 설정
      console.log('[ButtonManager] Setting icon layout');
      icon.layoutMode = "HORIZONTAL";
      icon.primaryAxisAlignItems = "CENTER";
      icon.counterAxisAlignItems = "CENTER";
      icon.constraints = {
        horizontal: "SCALE",
        vertical: "SCALE"
      };

      // 5. 아이콘 위치 설정
      const position = variant.icon.position || 'left';
      console.log('[ButtonManager] Setting icon position:', position);
      
      if (position === 'right') {
        console.log('[ButtonManager] Appending icon to end');
        button.appendChild(icon);
      } else {
        console.log('[ButtonManager] Inserting icon at start');
        button.insertChild(0, icon);
      }

      console.log('[ButtonManager] Successfully added icon to button');

    } catch (error) {
      console.error('[ButtonManager] Error in addIcon:', error);
    }
  }

  // 폰트 설정을 위한 헬퍼 함수
private async loadFonts(fontFamily: string = "Inter", styles: string[] = ["Regular", "Medium", "Bold"]): Promise<void> {
    for (const style of styles) {
        try {
            await figma.loadFontAsync({ family: fontFamily, style });
        } catch (error) {
            console.error(`Failed to load font ${fontFamily}-${style}:`, error);
            // 폰트 로드 실패 시 기본 폰트로 폴백
            await figma.loadFontAsync({ family: "System", style: "Regular" });
        }
    }
}

  private async addText(button: ComponentNode, size: ButtonSizeOption, variant: ButtonVariantProps): Promise<void> {
    const styleKey = `${variant.type || 'default'}-${variant.variant || 'filled'}` as keyof typeof BUTTON_STYLES;
    const style = BUTTON_STYLES[styleKey];
    const state = variant.state || 'default';

    await this.loadFonts("Inter", ["Regular", "Medium", "Bold"]);

    // 1. 텍스트 노드 생성
    const text = figma.createText();
    text.name = "Label";
    
    // 2. 텍스트 내용 설정
    text.characters = variant.label || "Button";
    
    // 3. 텍스트 스타일 설정
    text.fills = [variables.bindVariable(style.text[state])];
    variables.setBindVariable(text, 'fontSize', size.fontSize);
    variables.setBindVariable(text, 'lineHeight', size.lineHeight);
    
    // 4. 텍스트 정렬 설정
    text.textAlignHorizontal = "CENTER";
    text.textAlignVertical = "CENTER";
    
    // 5. 텍스트 자동 크기 조정
    text.textAutoResize = "WIDTH_AND_HEIGHT";
    
    // 6. 텍스트 제약 조건 설정
    text.constraints = {
      horizontal: "SCALE",
      vertical: "CENTER"
    };

    // 7. 폰트 설정 (필요한 경우)
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    text.fontName = { family: "Inter", style: "Regular" };

    // 8. 텍스트 추가
    button.appendChild(text);
  }
}
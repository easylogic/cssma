// src/core/base/ComponentManager.ts
export abstract class ComponentManager<
  TVariant extends ComponentVariant,
  TInstance extends ComponentInstance
> {
  protected componentSet: ComponentSetNode | null = null;
  protected variantMap: Map<string, ComponentNode> = new Map();

  protected abstract getVariantKey(variant: TVariant): string;
  protected abstract createVariant(variant: TVariant): Promise<ComponentNode>;
  protected abstract setupComponentSetLayout(componentSet: ComponentSetNode): void;
  protected abstract updateInstance(
    instance: InstanceNode,
    variant: TVariant,
    props: TInstance
  ): Promise<void>;

  async getComponentSet(): Promise<ComponentSetNode> {
    if (this.componentSet) {
      return this.componentSet;
    }

    const components = await this.createAllVariants();
    this.componentSet = figma.combineAsVariants(components, figma.currentPage);
    this.setupComponentSetLayout(this.componentSet);
    
    return this.componentSet;
  }

  async createInstance(variant: TVariant, props: TInstance = {} as TInstance): Promise<InstanceNode | null> {
    const variantKey = this.getVariantKey(variant);
    let master = this.variantMap.get(variantKey);

    if (!master) {
      const componentSet = await this.getComponentSet();
      master = this.findVariant(componentSet, variant);
      if (master) {
        this.variantMap.set(variantKey, master);
      }
    }

    if (!master) return null;

    const instance = master.createInstance();
    await this.updateInstance(instance, variant, props);

    return instance;
  }

  protected findVariant(componentSet: ComponentSetNode, variant: TVariant): ComponentNode | null {
    const variantKey = this.getVariantKey(variant);
    return componentSet.children.find(child => child.name === variantKey) as ComponentNode || null;
  }

  protected async createAllVariants(): Promise<ComponentNode[]> {
    const components: ComponentNode[] = [];
    for (const variant of this.getVariants()) {
      const component = await this.createVariant(variant);
      components.push(component);
    }
    return components;
  }

  protected abstract getVariants(): TVariant[];
}
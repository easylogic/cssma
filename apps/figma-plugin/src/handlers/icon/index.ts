// handlers/icon/index.ts
import { IconManager } from './IconManager';
import { IconVariantProps } from '@/types/icon';

export const iconHandlers = {
  createIcon: async (variant: IconVariantProps) => {
    return IconManager.getInstance().createComponent(variant);
  },

  createComponentSet: async () => {
    return IconManager.getInstance().getComponentSet();
  },

  createInstance: async (variant: IconVariantProps, props?: { color?: string }) => {
    return IconManager.getInstance().createInstance(variant, props);
  }
};
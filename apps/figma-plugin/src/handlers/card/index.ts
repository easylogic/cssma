import { CardCreator } from './CardManager';
import { CardVariantProps, CardHeaderProps, CardMediaProps, CardContentProps, CardFooterProps } from '@/types/card';
import { CardContentManager } from './sections/CardContentManager';
import { CardHeaderManager } from './sections/CardHeaderManager';
import { CardMediaManager } from './sections/CardMediaManager';
import { CardFooterManager } from './sections/CardFooterManager';

export const cardHandlers = {
  createCard: async (variant: CardVariantProps) => {
    return CardCreator.getInstance().createComponent(variant);
  },

  createComponentSet: async () => {
    return Promise.all([
      await CardHeaderManager.getInstance().getComponentSet(),      
      await CardContentManager.getInstance().getComponentSet(),
      await CardMediaManager.getInstance().getComponentSet(),
      await CardFooterManager.getInstance().getComponentSet(),
      await CardCreator.getInstance().getComponentSet()
    ]);
  },

  createInstance: async (
    variant: CardVariantProps,
    props: {
      header?: CardHeaderProps;
      media?: CardMediaProps;
      content?: CardContentProps;
      footer?: CardFooterProps;
    } = {}
  ) => {
    return CardCreator.getInstance().createInstance(variant, props);
  }
}; 
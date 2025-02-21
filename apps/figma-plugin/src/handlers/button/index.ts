import { ButtonIconProps, ButtonVariantProps } from "@/types/button";
import { ButtonCreator } from "./ButtonManager";

export const buttonHandlers = {
    createComponentSet: async () => {
      return ButtonCreator.getInstance().getComponentSet();
    },
  
    createInstance: async (
      variant: ButtonVariantProps,
      props: { text?: string; icon?: ButtonIconProps } = {}
    ) => {
        return ButtonCreator.getInstance().createInstance(variant, props);
    },

    updateInstance: async (
        instance: InstanceNode,
        props: { text?: string; icon?: ButtonIconProps } = {}
    ) => {
        return ButtonCreator.getInstance().updateInstance(instance, props);
    }
};
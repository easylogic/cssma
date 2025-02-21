import { IconSizeConfig, IconVariantProps } from "@/types/icon";

export const ICON_SIZES: IconSizeConfig = {
    xs: {
      size: 'component/base/icon/xs',    // 16px
      padding: 'component/base/padding/none'
    },
    sm: {
      size: 'component/base/icon/sm',    // 20px
      padding: 'component/base/padding/none'
    },
    md: {
      size: 'component/base/icon/md',    // 24px
      padding: 'component/base/padding/xs'
    },
    lg: {
      size: 'component/base/icon/lg',    // 32px
      padding: 'component/base/padding/xs'
    },
    xl: {
      size: 'component/base/icon/xl',    // 40px
      padding: 'component/base/padding/sm'
    }
  } as const;
  
  // 기본 아이콘 variants 정의
  export const ICON_VARIANTS: IconVariantProps[] = [
    // Size variants with filled style
    { size: 'xs', variant: 'filled', name: 'placeholder' },
    { size: 'sm', variant: 'filled', name: 'placeholder' },
    { size: 'md', variant: 'filled', name: 'placeholder' },
    { size: 'lg', variant: 'filled', name: 'placeholder' },
    { size: 'xl', variant: 'filled', name: 'placeholder' },
  
    // Size variants with outlined style
    { size: 'xs', variant: 'outlined', name: 'placeholder' },
    { size: 'sm', variant: 'outlined', name: 'placeholder' },
    { size: 'md', variant: 'outlined', name: 'placeholder' },
    { size: 'lg', variant: 'outlined', name: 'placeholder' },
    { size: 'xl', variant: 'outlined', name: 'placeholder' }
  ] as const;
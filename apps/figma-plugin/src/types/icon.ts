export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconVariant = 'filled' | 'outlined';

export interface IconVariantProps {
  size?: IconSize;
  variant?: IconVariant;
  name: string;     // 실제 swap할 아이콘 이름
}

export interface IconSizeOption {
  size: string;     // 아이콘 크기
  padding: string;  // 컨테이너 패딩
}

export type IconSizeConfig = {
  [key in IconSize]: IconSizeOption;
};
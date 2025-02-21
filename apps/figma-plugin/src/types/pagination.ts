/**
 * Pagination Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive pagination component set in Figma.
 * This type system supports:
 * - Auto-layout based structure for flexible sizing
 * - Consistent spacing and alignment
 * - Component properties for easy customization
 * - Variant combinations for all possible states
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type PaginationSize = 'small' | 'medium' | 'large';
export type PaginationVariant = 'filled' | 'outlined' | 'ghost';
export type PaginationState = 'default' | 'hover' | 'pressed' | 'disabled';
export type PaginationType = 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next';
export type PaginationAlign = 'start' | 'center' | 'end';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type PaginationSizeConfig = {
  [key in PaginationSize]: {
    height: string;
    fontSize: string;
    lineHeight: string;
    iconSize: string;
    spacing: {
      item: string;      // 아이템 간격
      icon: string;      // 아이콘과 텍스트 간격
      section: string;   // 섹션 간격 (prev/next, pages)
    };
    padding: {
      item: {
        horizontal: string;
        vertical: string;
      };
      input: {
        horizontal: string;
        vertical: string;
      };
    };
    borderRadius: string;
    borderWidth: string;
    input: {
      width: string;
      height: string;
    };
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface PaginationStateStyle {
  default: string;
  hover: string;
  pressed: string;
  disabled: string;
}

export interface PaginationItemStyle {
  background: PaginationStateStyle;
  text: PaginationStateStyle;
  icon: PaginationStateStyle;
  border: PaginationStateStyle;
}

export interface PaginationInputStyle {
  background: PaginationStateStyle;
  text: PaginationStateStyle;
  placeholder: PaginationStateStyle;
  border: PaginationStateStyle;
}

export interface PaginationStyle {
  root: {
    background: PaginationStateStyle;
    border: PaginationStateStyle;
  };
  item: {
    default: PaginationItemStyle;   // 일반 페이지
    active: PaginationItemStyle;    // 현재 페이지
    control: PaginationItemStyle;   // 이전/다음 버튼
    ellipsis: PaginationItemStyle;  // 생략 부분
  };
  input: PaginationInputStyle;
  total: {
    text: PaginationStateStyle;
    label: PaginationStateStyle;
  };
  sizeChanger: {
    trigger: PaginationItemStyle;
    menu: {
      background: PaginationStateStyle;
      border: PaginationStateStyle;
      shadow: PaginationStateStyle;
      item: PaginationItemStyle;
    };
  };
}

export type PaginationStyles = {
  [key in PaginationVariant]: PaginationStyle;
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface PaginationIconProps {
  name: string;
  size?: number;
}

export interface PaginationItemProps {
  type: PaginationType;
  page?: number;
  active?: boolean;
  disabled?: boolean;
  icon?: PaginationIconProps;
}

export interface PaginationSizeChangerProps {
  options?: number[];
  value?: number;
  disabled?: boolean;
  onChange?: (size: number) => void;
}

export interface PaginationQuickJumperProps {
  disabled?: boolean;
  placeholder?: string;
  onChange?: (page: number) => void;
}

export interface PaginationTotalProps {
  template?: string;
  formatter?: (total: number, range: [number, number]) => string;
}

export interface PaginationLocaleProps {
  items_per_page?: string;
  jump_to?: string;
  jump_to_confirm?: string;
  page?: string;
  prev_page?: string;
  next_page?: string;
  prev_5?: string;
  next_5?: string;
  prev_3?: string;
  next_3?: string;
}

export interface PaginationVariantProps {
  size?: PaginationSize;
  variant?: PaginationVariant;
  state?: PaginationState;
  pageSize?: number;
  current?: number;
  defaultCurrent?: number;
  defaultPageSize?: number;
  showSizeChanger?: boolean;
  sizeChanger?: PaginationSizeChangerProps;
  showQuickJumper?: boolean;
  quickJumper?: PaginationQuickJumperProps;
  showTotal?: boolean;
  total?: number;
  totalFormatter?: PaginationTotalProps;
  align?: PaginationAlign;
  responsive?: boolean;
  showLessItems?: boolean;
  simple?: boolean;
  disabled?: boolean;
  hideOnSinglePage?: boolean;
  showTitle?: boolean;
  locale?: PaginationLocaleProps;
  ariaLabel?: string;
  role?: string;
}

export interface PaginationInstance {
  current: number;
  pageSize: number;
  total: number;
  sizeChanger?: PaginationSizeChangerProps;
  quickJumper?: PaginationQuickJumperProps;
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreatePaginationOptions {
  variants?: PaginationVariant[];
} 
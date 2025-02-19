export type PaginationSize = 'small' | 'medium' | 'large';
export type PaginationVariant = 'filled' | 'outlined' | 'ghost';
export type PaginationStatus = 'default' | 'error';

export type PaginationSizeConfig = {
  [key in PaginationSize]: {
    height: string;
    fontSize: string;
    borderRadius: string;
    borderWidth: string;
    iconSize: string;
    spacing: string;
    padding: string;
  };
};

export interface PaginationStyle {
  background: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
    active: string;
  };
  border: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
    active: string;
  };
  text: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
    active: string;
  };
  icon: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
  };
}

export type PaginationStyles = {
  [key: string]: PaginationStyle;
};

export interface PaginationVariantProps {
  size?: PaginationSize;
  variant?: PaginationVariant;
  status?: PaginationStatus;
  total?: number;
  current?: number;
  pageSize?: number;
  showSizeChanger?: boolean;
  showQuickJumper?: boolean;
  showTotal?: boolean;
  simple?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  role?: string;
}

export interface PaginationInstance {
  current: number;
  pageSize: number;
  total: number;
}

export interface CreatePaginationOptions {
  variants?: PaginationVariant[];
} 
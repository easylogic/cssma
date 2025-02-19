export type BreadcrumbSize = 'small' | 'medium' | 'large';
export type BreadcrumbVariant = 'filled' | 'outlined';
export type BreadcrumbStatus = 'default' | 'error';

export type BreadcrumbSizeConfig = {
  [key in BreadcrumbSize]: {
    height: string;
    fontSize: string;
    iconSize: string;
    spacing: string;
    padding: string;
  };
};

export interface BreadcrumbStyle {
  background: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
  };
  text: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
  };
  separator: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
  };
}

export type BreadcrumbStyles = {
  [key: string]: BreadcrumbStyle;
};

export interface BreadcrumbItem {
  text: string;
  icon?: string;
  href?: string;
  disabled?: boolean;
}

export interface BreadcrumbVariantProps {
  size?: BreadcrumbSize;
  variant?: BreadcrumbVariant;
  status?: BreadcrumbStatus;
  items: BreadcrumbItem[];
  separator?: string;
  maxItems?: number;
  ariaLabel?: string;
  role?: string;
}

export interface BreadcrumbInstance {
  items: BreadcrumbItem[];
  separator: string;
}

export interface CreateBreadcrumbOptions {
  variants?: BreadcrumbVariant[];
} 
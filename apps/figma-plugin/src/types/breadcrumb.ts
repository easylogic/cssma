export interface BreadcrumbSize {
  small: { height: number; fontSize: number; spacing: number };
  medium: { height: number; fontSize: number; spacing: number };
}

export interface BreadcrumbStyle {
  text: string;
  separator: string;
  hover: string;
  active: string;
}

export interface BreadcrumbStyles {
  [key: string]: BreadcrumbStyle;
}

export interface BreadcrumbVariant {
  size?: 'small' | 'medium';
  state?: 'default' | 'hover' | 'pressed' | 'disabled';
}

export interface CreateBreadcrumbOptions {
  variants?: BreadcrumbVariant[];
} 
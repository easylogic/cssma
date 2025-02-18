export type PaginationSize = 'small' | 'medium' | 'large';
export type PaginationVariant = 'filled' | 'outlined' | 'ghost';
export type PaginationShape = 'rounded' | 'circular';

export interface PaginationVariantProps {
  size?: PaginationSize;
  variant?: PaginationVariant;
  shape?: PaginationShape;
  currentPage?: number;
  totalPages?: number;
  siblingCount?: number;
  boundaryCount?: number;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  showPrevButton?: boolean;
  showNextButton?: boolean;
  disabled?: boolean;
  ariaLabel?: string;
  role?: string;
}

export type PaginationSizeConfig = {
  [key in PaginationSize]: {
    height: number;
    minWidth: number;
    fontSize: number;
    lineHeight: number;
    spacing: number;
    iconSize: number;
    borderRadius: {
      rounded: number;
      circular: number;
    };
  };
};

export type PaginationStyleConfig = {
  [key in PaginationVariant]: {
    item: {
      background: {
        default: string;
        hover: string;
        pressed: string;
        selected: string;
        disabled: string;
      };
      border: {
        default: string;
        hover: string;
        pressed: string;
        selected: string;
        disabled: string;
      };
      text: {
        default: string;
        hover: string;
        pressed: string;
        selected: string;
        disabled: string;
      };
      icon: {
        default: string;
        hover: string;
        pressed: string;
        selected: string;
        disabled: string;
      };
    };
    ellipsis: {
      text: string;
    };
  };
}; 
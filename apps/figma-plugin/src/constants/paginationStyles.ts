import { PaginationSizeConfig, PaginationStyleConfig, PaginationVariantProps } from '../types/pagination';

export const PAGINATION_SIZES: PaginationSizeConfig = {
  small: {
    height: 28,
    minWidth: 28,
    fontSize: 12,
    lineHeight: 16,
    spacing: 4,
    iconSize: 16,
    borderRadius: {
      rounded: 4,
      circular: 14
    }
  },
  medium: {
    height: 36,
    minWidth: 36,
    fontSize: 14,
    lineHeight: 20,
    spacing: 6,
    iconSize: 20,
    borderRadius: {
      rounded: 6,
      circular: 18
    }
  },
  large: {
    height: 44,
    minWidth: 44,
    fontSize: 16,
    lineHeight: 24,
    spacing: 8,
    iconSize: 24,
    borderRadius: {
      rounded: 8,
      circular: 22
    }
  }
} as const;

export const PAGINATION_STYLES: PaginationStyleConfig = {
  filled: {
    item: {
      background: {
        default: 'semantic/bg/default',
        hover: 'semantic/bg/hover',
        pressed: 'semantic/bg/pressed',
        selected: 'semantic/action/primary/default',
        disabled: 'semantic/bg/disabled'
      },
      border: {
        default: 'semantic/border/default',
        hover: 'semantic/border/hover',
        pressed: 'semantic/border/pressed',
        selected: 'semantic/action/primary/default',
        disabled: 'semantic/border/disabled'
      },
      text: {
        default: 'semantic/text/default',
        hover: 'semantic/text/default',
        pressed: 'semantic/text/default',
        selected: 'semantic/text/inverse',
        disabled: 'semantic/text/disabled'
      },
      icon: {
        default: 'semantic/text/muted',
        hover: 'semantic/text/default',
        pressed: 'semantic/text/default',
        selected: 'semantic/text/inverse',
        disabled: 'semantic/text/disabled'
      }
    },
    ellipsis: {
      text: 'semantic/text/muted'
    }
  },
  outlined: {
    item: {
      background: {
        default: 'semantic/bg/default',
        hover: 'semantic/bg/hover',
        pressed: 'semantic/bg/pressed',
        selected: 'semantic/bg/default',
        disabled: 'semantic/bg/disabled'
      },
      border: {
        default: 'semantic/border/default',
        hover: 'semantic/border/hover',
        pressed: 'semantic/border/pressed',
        selected: 'semantic/action/primary/default',
        disabled: 'semantic/border/disabled'
      },
      text: {
        default: 'semantic/text/default',
        hover: 'semantic/text/default',
        pressed: 'semantic/text/default',
        selected: 'semantic/action/primary/default',
        disabled: 'semantic/text/disabled'
      },
      icon: {
        default: 'semantic/text/muted',
        hover: 'semantic/text/default',
        pressed: 'semantic/text/default',
        selected: 'semantic/action/primary/default',
        disabled: 'semantic/text/disabled'
      }
    },
    ellipsis: {
      text: 'semantic/text/muted'
    }
  },
  ghost: {
    item: {
      background: {
        default: 'transparent',
        hover: 'semantic/bg/hover',
        pressed: 'semantic/bg/pressed',
        selected: 'semantic/bg/selected',
        disabled: 'transparent'
      },
      border: {
        default: 'transparent',
        hover: 'transparent',
        pressed: 'transparent',
        selected: 'transparent',
        disabled: 'transparent'
      },
      text: {
        default: 'semantic/text/default',
        hover: 'semantic/text/default',
        pressed: 'semantic/text/default',
        selected: 'semantic/action/primary/default',
        disabled: 'semantic/text/disabled'
      },
      icon: {
        default: 'semantic/text/muted',
        hover: 'semantic/text/default',
        pressed: 'semantic/text/default',
        selected: 'semantic/action/primary/default',
        disabled: 'semantic/text/disabled'
      }
    },
    ellipsis: {
      text: 'semantic/text/muted'
    }
  }
} as const;

export const PAGINATION_VARIANTS: PaginationVariantProps[] = [
  // Basic variants
  { size: 'small', variant: 'filled', shape: 'rounded', currentPage: 1, totalPages: 5 },
  { size: 'small', variant: 'outlined', shape: 'rounded', currentPage: 1, totalPages: 5 },
  { size: 'small', variant: 'ghost', shape: 'rounded', currentPage: 1, totalPages: 5 },
  { size: 'medium', variant: 'filled', shape: 'rounded', currentPage: 1, totalPages: 5 },
  { size: 'medium', variant: 'outlined', shape: 'rounded', currentPage: 1, totalPages: 5 },
  { size: 'medium', variant: 'ghost', shape: 'rounded', currentPage: 1, totalPages: 5 },
  { size: 'large', variant: 'filled', shape: 'rounded', currentPage: 1, totalPages: 5 },
  { size: 'large', variant: 'outlined', shape: 'rounded', currentPage: 1, totalPages: 5 },
  { size: 'large', variant: 'ghost', shape: 'rounded', currentPage: 1, totalPages: 5 },

  // Shape variants
  { size: 'medium', variant: 'filled', shape: 'rounded', currentPage: 1, totalPages: 5 },
  { size: 'medium', variant: 'filled', shape: 'circular', currentPage: 1, totalPages: 5 },

  // With different page counts
  { size: 'medium', variant: 'filled', shape: 'rounded', currentPage: 1, totalPages: 3 },
  { size: 'medium', variant: 'filled', shape: 'rounded', currentPage: 1, totalPages: 5 },
  { size: 'medium', variant: 'filled', shape: 'rounded', currentPage: 1, totalPages: 10 },

  // With different current pages
  { size: 'medium', variant: 'filled', shape: 'rounded', currentPage: 1, totalPages: 5 },
  { size: 'medium', variant: 'filled', shape: 'rounded', currentPage: 3, totalPages: 5 },
  { size: 'medium', variant: 'filled', shape: 'rounded', currentPage: 5, totalPages: 5 },

  // With different sibling counts
  { size: 'medium', variant: 'filled', shape: 'rounded', currentPage: 5, totalPages: 10, siblingCount: 0 },
  { size: 'medium', variant: 'filled', shape: 'rounded', currentPage: 5, totalPages: 10, siblingCount: 1 },
  { size: 'medium', variant: 'filled', shape: 'rounded', currentPage: 5, totalPages: 10, siblingCount: 2 },

  // With different boundary counts
  { size: 'medium', variant: 'filled', shape: 'rounded', currentPage: 5, totalPages: 10, boundaryCount: 0 },
  { size: 'medium', variant: 'filled', shape: 'rounded', currentPage: 5, totalPages: 10, boundaryCount: 1 },
  { size: 'medium', variant: 'filled', shape: 'rounded', currentPage: 5, totalPages: 10, boundaryCount: 2 },

  // With/without navigation buttons
  { size: 'medium', variant: 'filled', shape: 'rounded', currentPage: 1, totalPages: 5, showFirstButton: false, showLastButton: false },
  { size: 'medium', variant: 'filled', shape: 'rounded', currentPage: 1, totalPages: 5, showPrevButton: false, showNextButton: false },
  { size: 'medium', variant: 'filled', shape: 'rounded', currentPage: 1, totalPages: 5, showFirstButton: true, showLastButton: true, showPrevButton: true, showNextButton: true },

  // Disabled state
  { size: 'medium', variant: 'filled', shape: 'rounded', currentPage: 1, totalPages: 5, disabled: true },

  // Complex combinations
  { 
    size: 'medium',
    variant: 'filled',
    shape: 'circular',
    currentPage: 5,
    totalPages: 10,
    siblingCount: 1,
    boundaryCount: 1,
    showFirstButton: true,
    showLastButton: true,
    showPrevButton: true,
    showNextButton: true
  },
  { 
    size: 'large',
    variant: 'outlined',
    shape: 'rounded',
    currentPage: 5,
    totalPages: 20,
    siblingCount: 2,
    boundaryCount: 2,
    showFirstButton: true,
    showLastButton: true,
    showPrevButton: true,
    showNextButton: true
  }
] as const; 
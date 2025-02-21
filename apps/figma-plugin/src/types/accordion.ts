/**
 * Accordion Component Types for Figma
 * 
 * Defines the structure and variants for creating a comprehensive accordion component set in Figma.
 * This type system supports:
 * - Auto-layout based structure for flexible sizing
 * - Consistent spacing and alignment
 * - Component properties for easy customization
 * - Variant combinations for all possible states
 */

// --------------------------------------------------------
// Core Types
// --------------------------------------------------------

export type AccordionSize = 'small' | 'medium' | 'large';
export type AccordionVariant = 'filled' | 'outlined' | 'ghost';
export type AccordionState = 'default' | 'hover' | 'pressed' | 'disabled';
export type AccordionTriggerType = 'click' | 'hover';
export type AccordionExpandIconPlacement = 'start' | 'end';

// --------------------------------------------------------
// Size Configuration
// --------------------------------------------------------

export type AccordionSizeConfig = {
  [key in AccordionSize]: {
    height: string;
    fontSize: string;
    lineHeight: string;
    iconSize: string;
    spacing: {
      item: string;      // 아이템 간격
      icon: string;      // 아이콘과 텍스트 간격
      content: string;   // 헤더와 콘텐츠 간격
      group: string;     // 그룹 간격
    };
    padding: {
      header: {
        horizontal: string;
        vertical: string;
      };
      content: {
        horizontal: string;
        vertical: string;
      };
    };
    borderRadius: string;
    borderWidth: string;
  };
};

// --------------------------------------------------------
// Style Configuration
// --------------------------------------------------------

export interface AccordionStateStyle {
  default: string;
  hover: string;
  pressed: string;
  disabled: string;
}

export interface AccordionHeaderStyle {
  background: AccordionStateStyle;
  text: AccordionStateStyle;
  icon: AccordionStateStyle;
  expandIcon: AccordionStateStyle;
  border: AccordionStateStyle;
  shadow?: AccordionStateStyle;
}

export interface AccordionContentStyle {
  background: AccordionStateStyle;
  text: AccordionStateStyle;
  border: AccordionStateStyle;
  shadow?: AccordionStateStyle;
}

export interface AccordionTransitionStyle {
  duration: string;
  timing: string;
  delay?: string;
}

export interface AccordionStyle {
  root: {
    background: AccordionStateStyle;
    border: AccordionStateStyle;
    shadow?: AccordionStateStyle;
  };
  item: {
    default: {
      header: AccordionHeaderStyle;
      content: AccordionContentStyle;
    };
    expanded: {
      header: AccordionHeaderStyle;
      content: AccordionContentStyle;
    };
    disabled: {
      header: AccordionHeaderStyle;
      content: AccordionContentStyle;
    };
  };
  divider: {
    line: AccordionStateStyle;
    spacing: {
      default: string;
      compact: string;
      loose: string;
    };
  };
  transition?: {
    header?: AccordionTransitionStyle;
    content?: AccordionTransitionStyle;
    expandIcon?: AccordionTransitionStyle;
  };
}

export type AccordionStyles = {
  [key in AccordionVariant]: AccordionStyle;
};

// --------------------------------------------------------
// Component Properties
// --------------------------------------------------------

export interface AccordionIconProps {
  name: string;
  size?: number;
}

export interface AccordionHeaderProps {
  icon?: AccordionIconProps;
  title: string;
  subtitle?: string;
  extra?: string;
  expandIcon?: AccordionIconProps;
  expandIconPlacement?: AccordionExpandIconPlacement;
}

export interface AccordionItemProps {
  key: string;
  header: AccordionHeaderProps;
  content: string;
  disabled?: boolean;
  showDivider?: boolean;
  dividerSpacing?: 'default' | 'compact' | 'loose';
}

export interface AccordionGroupProps {
  key: string;
  items: AccordionItemProps[];
  showDivider?: boolean;
  dividerSpacing?: 'default' | 'compact' | 'loose';
}

export interface AccordionAnimationProps {
  animated?: boolean;
  duration?: number;
  timing?: string;
}

export interface AccordionVariantProps {
  size?: AccordionSize;
  variant?: AccordionVariant;
  items: (AccordionItemProps | AccordionGroupProps)[];
  defaultExpandedKeys?: string[];
  expandedKeys?: string[];
  triggerType?: AccordionTriggerType;
  multiple?: boolean;
  collapsible?: boolean;
  destroyInactivePanel?: boolean;
  animation?: AccordionAnimationProps;
  onChange?: (keys: string[]) => void;
  ariaLabel?: string;
  role?: string;
}

export interface AccordionInstance {
  items: (AccordionItemProps | AccordionGroupProps)[];
  expandedKeys: string[];
}

// --------------------------------------------------------
// Component Creation
// --------------------------------------------------------

export interface CreateAccordionOptions {
  variants?: AccordionVariant[];
} 
export type AccordionSize = 'small' | 'medium' | 'large';
export type AccordionVariant = 'filled' | 'outlined' | 'ghost';
export type AccordionStatus = 'default' | 'error';

export type AccordionSizeConfig = {
  [key in AccordionSize]: {
    height: string;
    fontSize: string;
    borderRadius: string;
    borderWidth: string;
    iconSize: string;
    spacing: string;
    padding: string;
    contentPadding: string;
  };
};

export interface AccordionStyle {
  header: {
    background: {
      default: string;
      hover: string;
      pressed: string;
      disabled: string;
      expanded: string;
    };
    border: {
      default: string;
      hover: string;
      pressed: string;
      disabled: string;
      expanded: string;
    };
    text: {
      default: string;
      hover: string;
      pressed: string;
      disabled: string;
      expanded: string;
    };
    icon: {
      default: string;
      hover: string;
      pressed: string;
      disabled: string;
      expanded: string;
    };
  };
  content: {
    background: string;
    border: string;
    text: string;
  };
}

export type AccordionStyles = {
  [key: string]: AccordionStyle;
};

export interface AccordionItem {
  key: string;
  title: string;
  subtitle?: string;
  icon?: string;
  disabled?: boolean;
  content: string;
}

export interface AccordionVariantProps {
  size?: AccordionSize;
  variant?: AccordionVariant;
  status?: AccordionStatus;
  items: AccordionItem[];
  expandIcon?: string;
  collapseIcon?: string;
  defaultExpanded?: string[];
  expandedKeys?: string[];
  multiple?: boolean;
  collapsible?: boolean;
  disabled?: boolean;
  showDivider?: boolean;
  ariaLabel?: string;
  role?: string;
}

export interface AccordionInstance {
  items: AccordionItem[];
  expandedKeys: string[];
}

export interface CreateAccordionOptions {
  variants?: AccordionVariant[];
} 
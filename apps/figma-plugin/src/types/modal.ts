export type ModalSize = 'small' | 'medium' | 'large';
export type ModalVariant = 'default' | 'alert' | 'form';
export type ModalStatus = 'default' | 'error' | 'success' | 'warning';

export type ModalSizeConfig = {
  [key in ModalSize]: {
    width: string;
    minHeight: string;
    borderRadius: string;
    padding: string;
    spacing: string;
    headerHeight: string;
    footerHeight: string;
  };
};

export interface ModalStyle {
  background: {
    overlay: string;
    content: string;
    header: string;
    footer: string;
  };
  border: {
    content: string;
    header: string;
    footer: string;
  };
  text: {
    title: string;
    content: string;
    close: string;
  };
  shadow: {
    content: string;
  };
}

export type ModalStyles = {
  [key: string]: ModalStyle;
};

export interface ModalVariantProps {
  size?: ModalSize;
  variant?: ModalVariant;
  status?: ModalStatus;
  title?: string;
  closable?: boolean;
  maskClosable?: boolean;
  centered?: boolean;
  fullscreen?: boolean;
  footer?: boolean;
  ariaLabel?: string;
  role?: string;
}

export interface ModalInstance {
  title?: string;
  content?: string;
  footer?: boolean;
}

export interface CreateModalOptions {
  variants?: ModalVariant[];
} 
export enum ModalSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export interface ModalProps {
  size?: ModalSize;
  title: string;
  content: string;
  hasCloseButton?: boolean;
  onClose?: () => void;
} 
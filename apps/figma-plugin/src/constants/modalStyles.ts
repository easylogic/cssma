import { ModalSize } from '../types/modal';

export const MODAL_STYLES = {
  padding: {
    small: 16,
    medium: 24,
    large: 32,
  },
  borderRadius: 8,
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sizes: {
    [ModalSize.SMALL]: {
      width: 400,
    },
    [ModalSize.MEDIUM]: {
      width: 600,
    },
    [ModalSize.LARGE]: {
      width: 800,
    },
  },
} as const; 
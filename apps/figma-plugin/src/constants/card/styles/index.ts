import { CardStyles } from '@/types/card';
import { CARD_ROOT_STYLES } from './rootStyles';
import { CARD_HEADER_STYLES } from './headerStyles';
import { CARD_CONTENT_STYLES } from './contentStyles';
import { CARD_MEDIA_STYLES } from './mediaStyles';
import { CARD_FOOTER_STYLES } from './footerStyles';

export * from './rootStyles';
export * from './headerStyles';
export * from './contentStyles';
export * from './mediaStyles';
export * from './footerStyles';

export const CARD_STYLES: CardStyles = {
  'filled': {
    root: CARD_ROOT_STYLES.filled,
    header: CARD_HEADER_STYLES.filled,
    content: CARD_CONTENT_STYLES.filled,
    media: CARD_MEDIA_STYLES.filled,
    footer: CARD_FOOTER_STYLES.filled
  },
  'outlined': {
    root: CARD_ROOT_STYLES.outlined,
    header: CARD_HEADER_STYLES.outlined,
    content: CARD_CONTENT_STYLES.outlined,
    media: CARD_MEDIA_STYLES.outlined,
    footer: CARD_FOOTER_STYLES.outlined
  },
  'elevated': {
    root: CARD_ROOT_STYLES.elevated,
    header: CARD_HEADER_STYLES.elevated,
    content: CARD_CONTENT_STYLES.elevated,
    media: CARD_MEDIA_STYLES.elevated,
    footer: CARD_FOOTER_STYLES.elevated
  }
} as const; 
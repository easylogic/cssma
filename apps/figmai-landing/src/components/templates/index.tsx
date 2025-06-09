import React from 'react';
import ButtonPrimary from './ButtonPrimary';
import ButtonOutline from './ButtonOutline';
import ButtonGradient from './ButtonGradient';
import ButtonIcon from './ButtonIcon';
import ButtonFloating from './ButtonFloating';
import CardBasic from './CardBasic';
import CardProduct from './CardProduct';
import CardProfile from './CardProfile';
import CardPricing from './CardPricing';
import CardFeature from './CardFeature';
import CardStats from './CardStats';
import CardTestimonial from './CardTestimonial';
import CardBlog from './CardBlog';
import CardDashboard from './CardDashboard';
import CardEvent from './CardEvent';
import CardSocial from './CardSocial';
import BadgeStatus from './BadgeStatus';
import BadgeNotification from './BadgeNotification';
import LoadingSpinner from './LoadingSpinner';
import LoadingSkeleton from './LoadingSkeleton';
import FormLogin from './FormLogin';
import FormContact from './FormContact';
import FormSearch from './FormSearch';
import NavHeader from './NavHeader';
import NavSidebar from './NavSidebar';
import NavBreadcrumb from './NavBreadcrumb';
import ModalConfirm from './ModalConfirm';
import TableSimple from './TableSimple';
import FeedbackAlert from './FeedbackAlert';
import FeedbackToast from './FeedbackToast';
import LayoutDashboard from './LayoutDashboard';

// Template ID를 키로 하는 컴포넌트 맵
export const templateComponents: Record<string, React.ComponentType<any>> = {
  // Buttons
  'btn-primary': ButtonPrimary,
  'btn-outline': ButtonOutline,
  'btn-gradient': ButtonGradient,
  'btn-icon': ButtonIcon,
  'btn-floating': ButtonFloating,
  
  // Cards
  'card-basic': CardBasic,
  'card-product': CardProduct,
  'card-profile': CardProfile,
  'card-pricing': CardPricing,
  'card-feature': CardFeature,
  'card-stats': CardStats,
  'card-testimonial': CardTestimonial,
  'card-blog': CardBlog,
  'card-dashboard': CardDashboard,
  'card-event': CardEvent,
  'card-social': CardSocial,
  
  // Badges
  'badge-status': BadgeStatus,
  'badge-notification': BadgeNotification,
  
  // Loading
  'loading-spinner': LoadingSpinner,
  'loading-skeleton': LoadingSkeleton,
  
  // Forms
  'form-login': FormLogin,
  'form-contact': FormContact,
  'form-search': FormSearch,
  
  // Navigation
  'nav-header': NavHeader,
  'nav-sidebar': NavSidebar,
  'nav-breadcrumb': NavBreadcrumb,
  
  // Modals
  'modal-confirm': ModalConfirm,
  
  // Tables
  'table-simple': TableSimple,

  // Feedback
  'feedback-alert': FeedbackAlert,
  'feedback-toast': FeedbackToast,

  // Layout
  'layout-dashboard': LayoutDashboard,
};

export function getTemplateComponent(templateId: string): React.ComponentType<any> | null {
  return templateComponents[templateId] || null;
} 
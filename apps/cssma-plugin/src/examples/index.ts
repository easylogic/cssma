import buttonExample from './button.json';
import cardExample from './card.json';
import inputExample from './input.json';
import navbarExample from './navbar.json';
import modalExample from './modal.json';
import dropdownExample from './dropdown.json';
import tabsExample from './tabs.json';
import alertExample from './alert.json';
import formExample from './form.json';
import tableExample from './table.json';
import tooltipExample from './tooltip.json';
import avatarExample from './avatar.json';
import landingHeroExample from './landing-hero.json';
import landingProductExample from './landing-product.json';
import landingSaasExample from './landing-saas.json';
import landingSlidesExample from './landing-slides.json';
import simpleTestExample from './simple-test.json';

import badgeExample from './badge.json';
import featureCardsExample from './feature-cards.json';
import navigationExample from './navigation.json';
import progressExample from './progress.json';
import statsCardsExample from './stats-cards.json';

export const examples = {
  button: buttonExample,
  card: cardExample,
  input: inputExample,
  navbar: navbarExample,
  modal: modalExample,
  dropdown: dropdownExample,
  tabs: tabsExample,
  alert: alertExample,
  form: formExample,
  table: tableExample,
  tooltip: tooltipExample,
  avatar: avatarExample,
  badge: badgeExample,
  featureCards: featureCardsExample,
  navigation: navigationExample,
  progress: progressExample,
  statsCards: statsCardsExample,
  landingHero: landingHeroExample,
  landingProduct: landingProductExample,
  landingSaas: landingSaasExample,
  landingSlides: landingSlidesExample,
  simpleTest: simpleTestExample,
} as const;

export type ExampleType = keyof typeof examples;

export default examples; 
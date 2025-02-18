import { CardVariantProps } from '../types/card';
import { CARD_SIZES, CARD_STYLES, CARD_VARIANTS } from '../constants/cardStyles';
import { ComponentPageData, createComponentPage, createHandlers } from './createBase';
import { variables } from '@/variables';
import { buttonHandlers } from './createButton';

class ComponentCache {
  private static instance: ComponentCache;
  private cardSet: ComponentSetNode | null = null;

  private constructor() {}

  static getInstance(): ComponentCache {
    if (!ComponentCache.instance) {
      ComponentCache.instance = new ComponentCache();
    }
    return ComponentCache.instance;
  }

  getCardSet(): ComponentSetNode | null {
    return this.cardSet;
  }

  setCardSet(set: ComponentSetNode): void {
    this.cardSet = set;
  }
}

export const cardHandlers = {
  createCard: async (variant: CardVariantProps) => {
    const size = CARD_SIZES[variant.size || 'medium'];
    const style = CARD_STYLES[variant.variant || 'elevated'];

    // Create card component
    const card = figma.createComponent();
    card.name = `size=${variant.size || 'medium'}, variant=${variant.variant || 'elevated'}, interaction=${variant.interaction || 'none'}, hasHeader=${variant.hasHeader}, hasMedia=${variant.hasMedia}, hasFooter=${variant.hasFooter}, hasActions=${variant.hasActions}`;
    
    // Add ARIA attributes
    card.setPluginData('role', variant.role || (variant.interaction === 'clickable' ? 'button' : 'article'));
    if (variant.ariaLabel) {
      card.setPluginData('aria-label', variant.ariaLabel);
    }

    // Set layout
    card.layoutMode = "VERTICAL";
    card.itemSpacing = size.spacing;
    card.paddingLeft = card.paddingRight = size.padding;
    card.paddingTop = card.paddingBottom = size.padding;
    card.cornerRadius = size.borderRadius;
    card.resize(400, 1);
    card.primaryAxisSizingMode = "AUTO";
    card.counterAxisSizingMode = "FIXED";

    // Set background and border
    card.fills = [variables.bindVariable(style.background.default)];
    if (variant.variant === 'outlined' || variant.variant === 'filled') {
      card.strokes = [variables.bindVariable(style.border.default)];
      card.strokeWeight = 1;
    }

    // Add header if needed
    if (variant.hasHeader) {
      const header = figma.createFrame();
      header.name = "Header";
      header.layoutMode = "HORIZONTAL";
      header.itemSpacing = size.headerSpacing;
      header.fills = [];
      header.layoutAlign = "STRETCH";
      header.primaryAxisSizingMode = "FIXED";
      header.counterAxisSizingMode = "AUTO";

      const title = await createHandlers.text({
        text: 'Card Title',
        fontSize: size.padding,
        fills: [variables.bindVariable('semantic/text/default')],
        textAutoResize: "HEIGHT",
      });
      title.name = "title";
      title.layoutGrow = 1;

      header.appendChild(title);
      card.appendChild(header);
    }

    // Add media if needed
    if (variant.hasMedia) {
      const media = figma.createFrame();
      media.name = "Media";
      media.resize(400 - (size.padding * 2), size.mediaHeight);
      media.fills = [variables.bindVariable('semantic/bg/muted')];
      media.layoutAlign = "STRETCH";
      card.appendChild(media);
    }

    // Add content
    const content = figma.createFrame();
    content.name = "Content";
    content.layoutMode = "VERTICAL";
    content.itemSpacing = size.spacing;
    content.fills = [];
    content.layoutAlign = "STRETCH";
    content.primaryAxisSizingMode = "AUTO";
    content.counterAxisSizingMode = "FIXED";

    const text = await createHandlers.text({
      text: 'Card content goes here. This can be a description, details, or any other information.',
      fontSize: size.padding - 4,
      fills: [variables.bindVariable('semantic/text/default')],
      textAutoResize: "HEIGHT",
    });
    text.name = "text";
    text.layoutGrow = 1;

    content.appendChild(text);
    card.appendChild(content);

    // Add footer if needed
    if (variant.hasFooter) {
      const footer = figma.createFrame();
      footer.name = "Footer";
      footer.layoutMode = "HORIZONTAL";
      footer.itemSpacing = size.footerSpacing;
      footer.fills = [];
      footer.layoutAlign = "STRETCH";
      footer.primaryAxisSizingMode = "FIXED";
      footer.counterAxisSizingMode = "AUTO";

      const footerText = await createHandlers.text({
        text: 'Footer content',
        fontSize: size.padding - 4,
        fills: [variables.bindVariable('semantic/text/muted')],
        textAutoResize: "HEIGHT",
      });
      footerText.name = "footerText";
      footerText.layoutGrow = 1;

      footer.appendChild(footerText);
      card.appendChild(footer);
    }

    // Add actions if needed
    if (variant.hasActions) {
      const actions = figma.createFrame();
      actions.name = "Actions";
      actions.layoutMode = "HORIZONTAL";
      actions.itemSpacing = size.actionSpacing;
      actions.fills = [];
      actions.layoutAlign = "STRETCH";
      actions.primaryAxisSizingMode = "FIXED";
      actions.counterAxisSizingMode = "AUTO";
      actions.primaryAxisAlignItems = "MAX";

      const secondaryButton = await buttonHandlers.createInstance(
        {
          size: 'small',
          variant: 'ghost',
          type: 'secondary',
          state: 'default'
        },
        { text: 'Secondary' }
      );

      const primaryButton = await buttonHandlers.createInstance(
        {
          size: 'small',
          variant: variant.variant === 'filled' ? 'ghost' : 'filled',
          type: 'primary',
          state: 'default'
        },
        { text: 'Primary' }
      );

      if (secondaryButton && primaryButton) {
        secondaryButton.name = "secondaryAction";
        primaryButton.name = "primaryAction";
        actions.appendChild(secondaryButton);
        actions.appendChild(primaryButton);
        card.appendChild(actions);
      }
    }

    // Add hover and pressed states if clickable
    if (variant.interaction === 'clickable') {
      const hoverState = card.clone();
      hoverState.name = "Hover";
      hoverState.fills = [variables.bindVariable(style.background.hover)];
      if (variant.variant === 'outlined' || variant.variant === 'filled') {
        hoverState.strokes = [variables.bindVariable(style.border.hover)];
      }

      const pressedState = card.clone();
      pressedState.name = "Pressed";
      pressedState.fills = [variables.bindVariable(style.background.pressed)];
      if (variant.variant === 'outlined' || variant.variant === 'filled') {
        pressedState.strokes = [variables.bindVariable(style.border.pressed)];
      }
    }

    return card;
  },

  createComponentSet: async () => {
    const cache = ComponentCache.getInstance();
    if (cache.getCardSet()) return cache.getCardSet();

    const components: ComponentNode[] = [];
    
    for (const variant of CARD_VARIANTS) {
      const component = await cardHandlers.createCard(variant);
      components.push(component);
    }

    const componentSet = figma.combineAsVariants(components, figma.currentPage);
    componentSet.name = "Card";

    // Add component properties
    componentSet.addComponentProperty('size', 'VARIANT', 'The size of the card');
    componentSet.addComponentProperty('variant', 'VARIANT', 'The visual style of the card (elevated, outlined, filled)');
    componentSet.addComponentProperty('interaction', 'VARIANT', 'The interaction behavior of the card');
    componentSet.addComponentProperty('hasHeader', 'BOOLEAN', 'Whether to show the card header');
    componentSet.addComponentProperty('hasMedia', 'BOOLEAN', 'Whether to show the media section');
    componentSet.addComponentProperty('hasFooter', 'BOOLEAN', 'Whether to show the card footer');
    componentSet.addComponentProperty('hasActions', 'BOOLEAN', 'Whether to show action buttons');
    componentSet.addComponentProperty('title', 'TEXT', 'The title text of the card');
    componentSet.addComponentProperty('content', 'TEXT', 'The main content text of the card');
    componentSet.addComponentProperty('footerText', 'TEXT', 'The footer text of the card');

    setupComponentSetLayout(componentSet);

    cache.setCardSet(componentSet);
    return componentSet;
  },

  createInstance: async (variant: CardVariantProps, props: { title?: string; content?: string; footerText?: string } = {}) => {
    const component = ComponentCache.getInstance().getCardSet()?.defaultVariant.createInstance();
    if (!component) return null;

    component.setProperties({
      size: variant.size || 'medium',
      variant: variant.variant || 'elevated',
      interaction: variant.interaction || 'none',
      hasHeader: variant.hasHeader ?? false,
      hasMedia: variant.hasMedia ?? false,
      hasFooter: variant.hasFooter ?? false,
      hasActions: variant.hasActions ?? false,
    });

    if (props.title && variant.hasHeader) {
      const title = component.findOne(node => node.name === "title") as TextNode;
      if (title) title.characters = props.title;
    }

    if (props.content) {
      const content = component.findOne(node => node.name === "text") as TextNode;
      if (content) content.characters = props.content;
    }

    if (props.footerText && variant.hasFooter) {
      const footer = component.findOne(node => node.name === "footerText") as TextNode;
      if (footer) footer.characters = props.footerText;
    }

    return component;
  },

  createPage: async () => {
    const pageData: ComponentPageData = {
      title: "Card",
      description: "Cards contain content and actions about a single subject.",
      anatomy: {
        parts: [
          { name: "Container", description: "The main container that holds all card content" },
          { name: "Header", description: "Optional section for title and metadata" },
          { name: "Media", description: "Optional section for images or other media" },
          { name: "Content", description: "The main content area of the card" },
          { name: "Footer", description: "Optional section for supplementary content" },
          { name: "Actions", description: "Optional section for action buttons" }
        ]
      },
      properties: [
        {
          name: "size",
          type: "enum",
          default: "medium",
          description: "The size of the card",
          options: ["small", "medium", "large"]
        },
        {
          name: "variant",
          type: "enum",
          default: "elevated",
          description: "The visual style of the card",
          options: ["elevated", "outlined", "filled"]
        },
        {
          name: "interaction",
          type: "enum",
          default: "none",
          description: "The interaction behavior",
          options: ["none", "clickable"]
        },
        {
          name: "hasHeader",
          type: "boolean",
          default: "false",
          description: "Whether to show the header"
        },
        {
          name: "hasMedia",
          type: "boolean",
          default: "false",
          description: "Whether to show media"
        },
        {
          name: "hasFooter",
          type: "boolean",
          default: "false",
          description: "Whether to show the footer"
        },
        {
          name: "hasActions",
          type: "boolean",
          default: "false",
          description: "Whether to show actions"
        }
      ],
      variants: [
        {
          title: "Sizes",
          description: "Different sizes of cards.",
          examples: [
            await cardHandlers.createInstance(
              { size: 'small' },
              { content: "Small card content" }
            ),
            await cardHandlers.createInstance(
              { size: 'medium' },
              { content: "Medium card content" }
            ),
            await cardHandlers.createInstance(
              { size: 'large' },
              { content: "Large card content" }
            )
          ]
        },
        {
          title: "Variants",
          description: "Different visual styles of cards.",
          examples: [
            await cardHandlers.createInstance(
              { variant: 'elevated' },
              { content: "Elevated card" }
            ),
            await cardHandlers.createInstance(
              { variant: 'outlined' },
              { content: "Outlined card" }
            ),
            await cardHandlers.createInstance(
              { variant: 'filled' },
              { content: "Filled card" }
            )
          ]
        },
        {
          title: "Interactive",
          description: "Cards with different interaction states.",
          examples: [
            await cardHandlers.createInstance(
              { interaction: 'none' },
              { content: "Non-interactive card" }
            ),
            await cardHandlers.createInstance(
              { interaction: 'clickable' },
              { content: "Clickable card" }
            )
          ]
        },
        {
          title: "Complex",
          description: "Cards with multiple sections.",
          examples: [
            await cardHandlers.createInstance(
              { hasHeader: true, hasMedia: true, hasFooter: true, hasActions: true },
              { 
                title: "Complex Card",
                content: "A card with all optional sections enabled.",
                footerText: "Last updated: Today"
              }
            )
          ]
        }
      ],
      usage: {
        description: "Use cards to group related content and actions.",
        examples: [
          {
            title: "Product Card",
            description: "A typical product card with image and actions.",
            component: await (async () => {
              // Create the card component directly
              const card = figma.createComponent();
              card.name = "Product Card";
              card.layoutMode = "VERTICAL";
              card.itemSpacing = 16;
              card.fills = [variables.bindVariable('semantic/bg/default')];
              card.cornerRadius = 8;
              card.resize(400, 1);
              card.primaryAxisSizingMode = "AUTO";
              card.counterAxisSizingMode = "FIXED";

              // Add header
              const header = figma.createFrame();
              header.name = "Header";
              header.layoutMode = "HORIZONTAL";
              header.itemSpacing = 16;
              header.fills = [];
              header.layoutAlign = "STRETCH";

              const title = await createHandlers.text({
                text: "Product Name",
                fontSize: 18,
                fills: [variables.bindVariable('semantic/text/default')],
                textAutoResize: "HEIGHT"
              });
              header.appendChild(title);

              // Add media
              const media = figma.createFrame();
              media.name = "Media";
              media.resize(400, 200);
              media.fills = [variables.bindVariable('semantic/bg/muted')];

              // Add content
              const content = figma.createFrame();
              content.name = "Content";
              content.layoutMode = "VERTICAL";
              content.itemSpacing = 16;
              content.fills = [];
              content.layoutAlign = "STRETCH";

              const description = await createHandlers.text({
                text: "Product description with details about features and benefits.",
                fontSize: 14,
                fills: [variables.bindVariable('semantic/text/default')],
                textAutoResize: "HEIGHT"
              });
              content.appendChild(description);

              card.appendChild(header);
              card.appendChild(media);
              card.appendChild(content);
              return card;
            })()
          }
        ]
      }
    };

    return createComponentPage(pageData);
  }
};

function setupComponentSetLayout(componentSet: ComponentSetNode) {
  componentSet.layoutMode = "HORIZONTAL";
  componentSet.layoutWrap = "WRAP";
  componentSet.itemSpacing = 40;
  componentSet.counterAxisSpacing = 40;
  componentSet.paddingLeft = componentSet.paddingRight = 40;
  componentSet.paddingTop = componentSet.paddingBottom = 40;
  componentSet.resize(800, componentSet.height);
  componentSet.primaryAxisSizingMode = "FIXED";
  componentSet.counterAxisSizingMode = "AUTO";
  componentSet.fills = [variables.bindVariable('semantic/bg/default')];
} 
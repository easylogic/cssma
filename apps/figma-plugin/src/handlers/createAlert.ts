import { AlertVariant } from '../types/alert';
import { ALERT_SIZES, ALERT_STYLES, ALERT_VARIANTS } from '../constants/alertStyles';
import { ComponentPageData, createComponentPage, createHandlers } from './createBase';
import { variables } from '@/variables';

class ComponentCache {
  private static instance: ComponentCache;
  private alertSet: ComponentSetNode | null = null;

  private constructor() {}

  static getInstance(): ComponentCache {
    if (!ComponentCache.instance) {
      ComponentCache.instance = new ComponentCache();
    }
    return ComponentCache.instance;
  }

  getAlertSet(): ComponentSetNode | null {
    return this.alertSet;
  }

  setAlertSet(set: ComponentSetNode): void {
    this.alertSet = set;
  }
}

export const alertHandlers = {
  createAlert: async (variant: AlertVariant) => {
    const size = ALERT_SIZES[variant.size || 'medium'];
    const type = variant.type || 'info';
    const variantStyle = variant.variant || 'filled';
    const style = ALERT_STYLES[type][variantStyle];

    // Create alert component
    const alert = figma.createComponent();
    alert.name = `size=${variant.size || 'medium'}, type=${type}, variant=${variantStyle}, hasIcon=${variant.hasIcon}, hasTitle=${variant.hasTitle}, closable=${variant.closable}, action=${variant.action}`;
    
    // Add ARIA attributes
    alert.setPluginData('role', variant.role || 'alert');
    alert.setPluginData('aria-live', variant.ariaLive || (type === 'error' ? 'assertive' : 'polite'));
    if (variant.ariaLabel) {
      alert.setPluginData('aria-label', variant.ariaLabel);
    }

    // Set layout
    alert.layoutMode = "HORIZONTAL";
    alert.itemSpacing = size.spacing;
    alert.paddingLeft = alert.paddingRight = size.padding;
    alert.paddingTop = alert.paddingBottom = size.padding;
    alert.cornerRadius = size.borderRadius;
    alert.resize(400, 1);
    alert.primaryAxisSizingMode = "FIXED";
    alert.counterAxisSizingMode = "AUTO";

    // Set background and border
    alert.fills = [variables.bindVariable(style.background)];
    if (variantStyle === 'outlined') {
      alert.strokes = [variables.bindVariable(style.border)];
      alert.strokeWeight = 1;
    }

    // Create content container
    const contentContainer = figma.createFrame();
    contentContainer.name = "Content";
    contentContainer.layoutMode = "VERTICAL";
    contentContainer.itemSpacing = size.spacing / 2;
    contentContainer.fills = [];
    contentContainer.layoutGrow = 1;
    contentContainer.primaryAxisSizingMode = "AUTO";
    contentContainer.counterAxisSizingMode = "FIXED";
    contentContainer.layoutAlign = "STRETCH";
    contentContainer.paddingLeft = 0;
    contentContainer.paddingRight = 0;
    contentContainer.paddingTop = 0;
    contentContainer.paddingBottom = 0;

    // Add icon if needed
    if (variant.hasIcon) {
      const iconContainer = figma.createFrame();
      iconContainer.name = "Icon";
      iconContainer.resize(size.iconSize, size.iconSize);
      iconContainer.fills = [];
      iconContainer.primaryAxisSizingMode = "FIXED";
      iconContainer.counterAxisSizingMode = "FIXED";

      const icon = figma.createVector();
      icon.name = type === 'info' ? 'Info' :
                  type === 'success' ? 'Check' :
                  type === 'warning' ? 'Warning' :
                  'Error';
      
      // Set icon paths based on type
      if (type === 'info') {
        icon.vectorNetwork = {
          vertices: [
            { x: 8, y: 8, strokeCap: 'ROUND' },
            { x: 8, y: 12, strokeCap: 'ROUND' },
            { x: 8, y: 16, strokeCap: 'ROUND' }
          ],
          segments: [
            { start: 0, end: 1 },
            { start: 1, end: 2 }
          ]
        };
      } else if (type === 'success') {
        icon.vectorNetwork = {
          vertices: [
            { x: 4, y: 8 },
            { x: 8, y: 12 },
            { x: 12, y: 4 }
          ],
          segments: [
            { start: 0, end: 1 },
            { start: 1, end: 2 }
          ]
        };
      } else if (type === 'warning') {
        icon.vectorNetwork = {
          vertices: [
            { x: 8, y: 4 },
            { x: 8, y: 10 },
            { x: 8, y: 12 }
          ],
          segments: [
            { start: 0, end: 1 },
            { start: 1, end: 2 }
          ]
        };
      } else {
        icon.vectorNetwork = {
          vertices: [
            { x: 4, y: 4 },
            { x: 12, y: 12 },
            { x: 4, y: 12 },
            { x: 12, y: 4 }
          ],
          segments: [
            { start: 0, end: 1 },
            { start: 2, end: 3 }
          ]
        };
      }

      icon.strokes = [variables.bindVariable(style.icon)];
      icon.strokeWeight = 1.5;
      icon.strokeCap = "ROUND";
      icon.strokeJoin = "ROUND";

      iconContainer.appendChild(icon);
      alert.appendChild(iconContainer);
    }

    // Add title if needed
    if (variant.hasTitle) {
      const title = await createHandlers.text({
        text: 'Alert Title',
        fontSize: size.fontSize,
        lineHeight: size.lineHeight,
        fills: [variables.bindVariable(style.text)],
        textAutoResize: "HEIGHT"
      });
      title.name = "title";
      title.layoutGrow = 1;
      title.textAutoResize = "HEIGHT";
      title.textTruncation = "DISABLED";
      contentContainer.appendChild(title);
      title.layoutSizingVertical = "HUG";
    }

    // Add description
    const description = await createHandlers.text({
      text: 'This is an alert message that can contain important information.',
      fontSize: variant.hasTitle ? size.fontSize - 2 : size.fontSize,
      lineHeight: variant.hasTitle ? size.lineHeight - 4 : size.lineHeight,
      fills: [variables.bindVariable(style.text)],
      textAutoResize: "HEIGHT",
    });
    description.name = "description";
    description.layoutGrow = 1;
    description.textTruncation = "DISABLED";
    description.layoutAlign = "STRETCH";
    description.textAlignHorizontal = "LEFT";
    description.resize(contentContainer.width - contentContainer.paddingLeft - contentContainer.paddingRight, description.height);
    contentContainer.appendChild(description);
    description.layoutSizingVertical = "HUG";

    alert.appendChild(contentContainer);

    // Add action button if needed
    if (variant.action) {
      const actionButton = await createHandlers.button({
        text: 'Action',
        size: 'small',
        variant: variantStyle === 'filled' ? 'secondary' : 'primary',
      });
      actionButton.name = "action";
      alert.appendChild(actionButton);
    }

    // Add close button if needed
    if (variant.closable) {
      const closeContainer = figma.createFrame();
      closeContainer.name = "Close";
      closeContainer.resize(size.iconSize, size.iconSize);
      closeContainer.fills = [];
      closeContainer.setPluginData('role', 'button');
      closeContainer.setPluginData('aria-label', 'Close alert');

      const closeIcon = figma.createVector();
      closeIcon.name = "Close";
      closeIcon.vectorNetwork = {
        vertices: [
          { x: 4, y: 4 },
          { x: 12, y: 12 },
          { x: 4, y: 12 },
          { x: 12, y: 4 }
        ],
        segments: [
          { start: 0, end: 1 },
          { start: 2, end: 3 }
        ]
      };
      closeIcon.strokes = [variables.bindVariable(style.icon)];
      closeIcon.strokeWeight = 1.5;
      closeIcon.strokeCap = "ROUND";
      closeIcon.strokeJoin = "ROUND";

      closeContainer.appendChild(closeIcon);
      alert.appendChild(closeContainer);
    }

    return alert;
  },

  createComponentSet: async () => {
    const cache = ComponentCache.getInstance();
    if (cache.getAlertSet()) return cache.getAlertSet();

    const components: ComponentNode[] = [];
    
    for (const variant of ALERT_VARIANTS) {
      const component = await alertHandlers.createAlert(variant);
      components.push(component);
    }

    const componentSet = figma.combineAsVariants(components, figma.currentPage);
    componentSet.name = "Alert";

    // Add component properties
    componentSet.addComponentProperty('type', 'VARIANT', 'The type of alert (info, success, warning, error)');
    componentSet.addComponentProperty('variant', 'VARIANT', 'The visual style of the alert (filled, outlined)');
    componentSet.addComponentProperty('size', 'VARIANT', 'The size of the alert');
    componentSet.addComponentProperty('hasIcon', 'BOOLEAN', 'Whether to show the alert icon');
    componentSet.addComponentProperty('hasTitle', 'BOOLEAN', 'Whether to show the alert title');
    componentSet.addComponentProperty('closable', 'BOOLEAN', 'Whether the alert can be closed');
    componentSet.addComponentProperty('action', 'BOOLEAN', 'Whether to show an action button');
    componentSet.addComponentProperty('title', 'TEXT', 'The title text of the alert');
    componentSet.addComponentProperty('description', 'TEXT', 'The description text of the alert');
    componentSet.addComponentProperty('actionText', 'TEXT', 'The text of the action button');

    setupComponentSetLayout(componentSet);

    cache.setAlertSet(componentSet);
    return componentSet;
  },

  createInstance: async (variant: AlertVariant, props: { title?: string; description?: string; actionText?: string } = {}) => {
    const component = ComponentCache.getInstance().getAlertSet()?.defaultVariant.createInstance();
    if (!component) return null;

    component.setProperties({
      type: variant.type || 'info',
      variant: variant.variant || 'filled',
      size: variant.size || 'medium',
      hasIcon: variant.hasIcon ?? true,
      hasTitle: variant.hasTitle ?? false,
      closable: variant.closable ?? false,
      action: variant.action ?? false,
    });

    if (props.title && variant.hasTitle) {
      const title = component.findOne(node => node.name === "title") as TextNode;
      if (title) title.characters = props.title;
    }

    if (props.description) {
      const description = component.findOne(node => node.name === "description") as TextNode;
      if (description) description.characters = props.description;
    }

    if (props.actionText && variant.action) {
      const action = component.findOne(node => node.name === "action") as InstanceNode;
      if (action) action.setProperties({ text: props.actionText });
    }

    return component;
  },

  createPage: async () => {
    const pageData: ComponentPageData = {
      title: "Alert",
      description: "Alerts display important messages and feedback to users.",
      anatomy: {
        parts: [
          { name: "Icon", description: "Visual indicator of the alert type" },
          { name: "Title", description: "Optional heading text for the alert" },
          { name: "Description", description: "Main message of the alert" },
          { name: "Action", description: "Optional action button" },
          { name: "Close", description: "Optional button to dismiss the alert" }
        ]
      },
      properties: [
        {
          name: "type",
          type: "enum",
          default: "info",
          description: "The type of alert",
          options: ["info", "success", "warning", "error"]
        },
        {
          name: "variant",
          type: "enum",
          default: "filled",
          description: "The visual style of the alert",
          options: ["filled", "outlined"]
        },
        {
          name: "size",
          type: "enum",
          default: "medium",
          description: "The size of the alert",
          options: ["small", "medium", "large"]
        },
        {
          name: "hasIcon",
          type: "boolean",
          default: "true",
          description: "Whether to show the alert icon"
        },
        {
          name: "hasTitle",
          type: "boolean",
          default: "false",
          description: "Whether to show the alert title"
        },
        {
          name: "closable",
          type: "boolean",
          default: "false",
          description: "Whether the alert can be closed"
        },
        {
          name: "action",
          type: "boolean",
          default: "false",
          description: "Whether to show an action button"
        }
      ],
      variants: [
        {
          title: "Types",
          description: "Different types of alerts for various contexts.",
          examples: [
            await alertHandlers.createInstance(
              { type: 'info', hasTitle: true },
              { title: "Information", description: "This is an informational alert." }
            ),
            await alertHandlers.createInstance(
              { type: 'success', hasTitle: true },
              { title: "Success", description: "Operation completed successfully." }
            ),
            await alertHandlers.createInstance(
              { type: 'warning', hasTitle: true },
              { title: "Warning", description: "Please review this important message." }
            ),
            await alertHandlers.createInstance(
              { type: 'error', hasTitle: true },
              { title: "Error", description: "Something went wrong. Please try again." }
            )
          ]
        },
        {
          title: "Variants",
          description: "Different visual styles of alerts.",
          examples: [
            await alertHandlers.createInstance(
              { type: 'info', variant: 'filled' },
              { description: "Filled variant" }
            ),
            await alertHandlers.createInstance(
              { type: 'info', variant: 'outlined' },
              { description: "Outlined variant" }
            )
          ]
        },
        {
          title: "Sizes",
          description: "Different sizes of alerts.",
          examples: [
            await alertHandlers.createInstance(
              { size: 'small' },
              { description: "Small alert" }
            ),
            await alertHandlers.createInstance(
              { size: 'medium', hasTitle: true },
              { title: "Medium Alert", description: "With title and description" }
            ),
            await alertHandlers.createInstance(
              { size: 'large', hasTitle: true, action: true, closable: true },
              { title: "Large Alert", description: "With title, action, and close button", actionText: "Learn More" }
            )
          ]
        }
      ],
      usage: {
        description: "Use alerts to provide feedback about an action or to highlight important information.",
        examples: [
          {
            title: "Form Feedback",
            description: "Use alerts to show form submission results.",
            component: await (async () => {
              const container = figma.createFrame();
              container.name = "Form Feedback Examples";
              container.layoutMode = "VERTICAL";
              container.itemSpacing = 16;
              container.fills = [];

              const alerts = [
                await alertHandlers.createInstance(
                  { type: 'success', variant: 'filled', hasTitle: true },
                  { title: "Form Submitted", description: "Your information has been saved successfully." }
                ),
                await alertHandlers.createInstance(
                  { type: 'error', variant: 'outlined', hasTitle: true, action: true },
                  { title: "Submission Failed", description: "Please check your input and try again.", actionText: "Retry" }
                )
              ];

              alerts.forEach(alert => container.appendChild(alert!));
              return container;
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
import { ProgressVariantProps } from '../types/progress';
import { PROGRESS_SIZES, PROGRESS_STYLES, PROGRESS_VARIANTS } from '../constants/progressStyles';
import { ComponentPageData, createComponentPage, createHandlers } from './createBase';
import { variables } from '@/variables';

class ComponentCache {
  private static instance: ComponentCache;
  private progressSet: ComponentSetNode | null = null;

  private constructor() {}

  static getInstance(): ComponentCache {
    if (!ComponentCache.instance) {
      ComponentCache.instance = new ComponentCache();
    }
    return ComponentCache.instance;
  }

  getProgressSet(): ComponentSetNode | null {
    return this.progressSet;
  }

  setProgressSet(set: ComponentSetNode): void {
    this.progressSet = set;
  }
}

export const progressHandlers = {
  createProgress: async (variant: ProgressVariantProps) => {
    const size = PROGRESS_SIZES[variant.size || 'medium'];
    const style = PROGRESS_STYLES[variant.status || 'default'];
    const isLinear = variant.variant !== 'circular';
    const value = variant.value ?? 0;

    // Create progress component
    const progress = figma.createComponent();
    progress.name = `variant=${variant.variant || 'linear'}, size=${variant.size || 'medium'}, status=${variant.status || 'default'}, value=${value}`;
    
    // Add ARIA attributes
    progress.setPluginData('role', variant.role || 'progressbar');
    progress.setPluginData('aria-valuemin', '0');
    progress.setPluginData('aria-valuemax', '100');
    if (!variant.indeterminate) {
      progress.setPluginData('aria-valuenow', value.toString());
    }
    if (variant.ariaLabel) {
      progress.setPluginData('aria-label', variant.ariaLabel);
    }

    // Create container
    const container = figma.createFrame();
    container.name = "Container";
    container.layoutMode = "VERTICAL";
    container.itemSpacing = size.spacing;
    container.fills = [];
    container.primaryAxisSizingMode = "AUTO";
    container.counterAxisSizingMode = "AUTO";

    // Add label if needed
    if (variant.label) {
      const labelContainer = figma.createFrame();
      labelContainer.name = "LabelContainer";
      labelContainer.layoutMode = "HORIZONTAL";
      labelContainer.itemSpacing = size.labelSpacing;
      labelContainer.fills = [];
      labelContainer.layoutAlign = "STRETCH";

      const label = await createHandlers.text({
        text: variant.label,
        fontSize: size.fontSize,
        fills: [variables.bindVariable(style.text.default)]
      });
      label.name = "label";
      labelContainer.appendChild(label);

      // Add value display if needed
      if (variant.showValue && !variant.indeterminate) {
        const valueText = await createHandlers.text({
          text: variant.formatValue ? variant.formatValue(value) : `${value}%`,
          fontSize: size.fontSize,
          fills: [variables.bindVariable(style.text.default)]
        });
        valueText.name = "value";
        labelContainer.appendChild(valueText);
      }

      container.appendChild(labelContainer);
    }

    // Create progress indicator
    if (isLinear) {
      // Linear progress
      const track = figma.createFrame();
      track.name = "Track";
      track.resize(200, size.linear.height);
      track.cornerRadius = size.linear.borderRadius;
      track.fills = [variables.bindVariable(style.track.default)];
      track.layoutAlign = "STRETCH";

      const indicator = figma.createFrame();
      indicator.name = "Indicator";
      indicator.resize(variant.indeterminate ? 40 : (200 * value / 100), size.linear.height);
      indicator.cornerRadius = size.linear.borderRadius;
      indicator.fills = [variables.bindVariable(style.indicator.default)];

      if (variant.indeterminate) {
        // Add indeterminate animation properties
        indicator.x = -40;
        indicator.setPluginData('animation', JSON.stringify({
          type: 'indeterminate',
          duration: 1.5,
          easing: 'easeInOut'
        }));
      }

      track.appendChild(indicator);
      container.appendChild(track);
    } else {
      // Circular progress
      const track = figma.createEllipse();
      track.name = "Track";
      track.resize(size.circular.size, size.circular.size);
      track.fills = [];
      track.strokes = [variables.bindVariable(style.track.default)];
      track.strokeWeight = size.circular.thickness;
      track.strokeCap = "ROUND";

      const indicator = figma.createEllipse();
      indicator.name = "Indicator";
      indicator.resize(size.circular.size, size.circular.size);
      indicator.fills = [];
      indicator.strokes = [variables.bindVariable(style.indicator.default)];
      indicator.strokeWeight = size.circular.thickness;
      indicator.strokeCap = "ROUND";

      if (variant.indeterminate) {
        // Add indeterminate animation properties
        indicator.setPluginData('animation', JSON.stringify({
          type: 'rotate',
          duration: 1,
          easing: 'linear',
          infinite: true
        }));
      } else {
        // Calculate stroke dash array for progress
        const circumference = Math.PI * size.circular.size;
        const strokeDashArray = [
          (circumference * value) / 100,
          circumference - (circumference * value) / 100
        ];
        indicator.strokeAlign = "OUTSIDE";
        indicator.dashPattern = strokeDashArray;
      }

      const circularContainer = figma.createFrame();
      circularContainer.name = "CircularContainer";
      circularContainer.resize(size.circular.size, size.circular.size);
      circularContainer.fills = [];
      circularContainer.appendChild(track);
      circularContainer.appendChild(indicator);

      container.appendChild(circularContainer);
    }

    // Add description if needed
    if (variant.description) {
      const description = await createHandlers.text({
        text: variant.description,
        fontSize: size.descriptionFontSize,
        fills: [variables.bindVariable(style.description.default)]
      });
      description.name = "description";
      container.appendChild(description);
    }

    progress.appendChild(container);
    return progress;
  },

  createComponentSet: async () => {
    const cache = ComponentCache.getInstance();
    if (cache.getProgressSet()) return cache.getProgressSet();

    const components: ComponentNode[] = [];
    
    for (const variant of PROGRESS_VARIANTS) {
      const component = await progressHandlers.createProgress(variant);
      components.push(component);
    }

    const componentSet = figma.combineAsVariants(components, figma.currentPage);
    componentSet.name = "Progress";

    // Add component properties
    componentSet.addComponentProperty('variant', 'VARIANT', 'The type of progress indicator');
    componentSet.addComponentProperty('size', 'VARIANT', 'The size of the progress indicator');
    componentSet.addComponentProperty('status', 'VARIANT', 'The status of the progress');
    componentSet.addComponentProperty('value', 'TEXT', 'The current progress value (0-100)');
    componentSet.addComponentProperty('indeterminate', 'BOOLEAN', 'Whether the progress is indeterminate');
    componentSet.addComponentProperty('showValue', 'BOOLEAN', 'Whether to show the progress value');
    componentSet.addComponentProperty('label', 'TEXT', 'The label text');
    componentSet.addComponentProperty('description', 'TEXT', 'The description text');

    setupComponentSetLayout(componentSet);

    cache.setProgressSet(componentSet);
    return componentSet;
  },

  createInstance: async (variant: ProgressVariantProps, props: { 
    label?: string;
    description?: string;
    value?: number;
  } = {}) => {
    const component = ComponentCache.getInstance().getProgressSet()?.defaultVariant.createInstance();
    if (!component) return null;

    component.setProperties({
      variant: variant.variant || 'linear',
      size: variant.size || 'medium',
      status: variant.status || 'default',
      value: (props.value ?? variant.value ?? 0).toString(),
      indeterminate: variant.indeterminate ?? false,
      showValue: variant.showValue ?? false,
      label: props.label || variant.label || '',
      description: props.description || variant.description || ''
    });

    return component;
  },

  createPage: async () => {
    const pageData: ComponentPageData = {
      title: "Progress",
      description: "Progress indicators inform users about the status of ongoing processes.",
      anatomy: {
        parts: [
          { name: "Track", description: "The background track that shows the total progress range" },
          { name: "Indicator", description: "The filled portion that shows the current progress" },
          { name: "Label", description: "Optional text label describing the progress" },
          { name: "Value", description: "Optional numerical representation of progress" },
          { name: "Description", description: "Optional description providing additional context" }
        ]
      },
      properties: [
        {
          name: "variant",
          type: "enum",
          default: "linear",
          description: "The type of progress indicator",
          options: ["linear", "circular"]
        },
        {
          name: "size",
          type: "enum",
          default: "medium",
          description: "The size of the progress indicator",
          options: ["small", "medium", "large"]
        },
        {
          name: "status",
          type: "enum",
          default: "default",
          description: "The status of the progress",
          options: ["default", "success", "warning", "error"]
        },
        {
          name: "value",
          type: "number",
          default: "0",
          description: "The current progress value (0-100)"
        },
        {
          name: "indeterminate",
          type: "boolean",
          default: "false",
          description: "Whether the progress is indeterminate"
        },
        {
          name: "showValue",
          type: "boolean",
          default: "false",
          description: "Whether to show the progress value"
        },
        {
          name: "label",
          type: "string",
          description: "The label text"
        },
        {
          name: "description",
          type: "string",
          description: "The description text"
        }
      ],
      variants: [
        {
          title: "Variants",
          description: "Different types of progress indicators.",
          examples: [
            await progressHandlers.createInstance(
              { variant: 'linear', value: 50 },
              { label: "Linear progress" }
            ),
            await progressHandlers.createInstance(
              { variant: 'circular', value: 50 },
              { label: "Circular progress" }
            )
          ]
        },
        {
          title: "Sizes",
          description: "Different sizes of progress indicators.",
          examples: [
            await progressHandlers.createInstance(
              { size: 'small', value: 50 }
            ),
            await progressHandlers.createInstance(
              { size: 'medium', value: 50 }
            ),
            await progressHandlers.createInstance(
              { size: 'large', value: 50 }
            )
          ]
        },
        {
          title: "Statuses",
          description: "Different status styles of progress.",
          examples: [
            await progressHandlers.createInstance(
              { status: 'default', value: 50 },
              { label: "Default" }
            ),
            await progressHandlers.createInstance(
              { status: 'success', value: 100 },
              { label: "Success" }
            ),
            await progressHandlers.createInstance(
              { status: 'warning', value: 70 },
              { label: "Warning" }
            ),
            await progressHandlers.createInstance(
              { status: 'error', value: 30 },
              { label: "Error" }
            )
          ]
        },
        {
          title: "States",
          description: "Different states of progress indicators.",
          examples: [
            await progressHandlers.createInstance(
              { value: 50, showValue: true },
              { label: "Determinate" }
            ),
            await progressHandlers.createInstance(
              { indeterminate: true },
              { label: "Indeterminate" }
            )
          ]
        }
      ],
      usage: {
        description: "Use progress indicators to show the status of operations that take time.",
        examples: [
          {
            title: "File Upload",
            description: "Using progress to show file upload status.",
            component: await (async () => {
              const container = figma.createComponent();
              container.name = "File Upload Example";
              container.layoutMode = "VERTICAL";
              container.itemSpacing = 24;
              container.fills = [];
              container.resize(300, 1);
              container.primaryAxisSizingMode = "AUTO";
              container.counterAxisSizingMode = "FIXED";

              const progresses = [
                await progressHandlers.createInstance(
                  { 
                    variant: 'linear',
                    status: 'success',
                    value: 100,
                    showValue: true
                  },
                  { 
                    label: "document.pdf",
                    description: "Upload complete"
                  }
                ),
                await progressHandlers.createInstance(
                  { 
                    variant: 'linear',
                    value: 60,
                    showValue: true
                  },
                  { 
                    label: "image.jpg",
                    description: "2 MB of 3.4 MB"
                  }
                ),
                await progressHandlers.createInstance(
                  { 
                    variant: 'linear',
                    status: 'error',
                    value: 30,
                    showValue: true
                  },
                  { 
                    label: "video.mp4",
                    description: "Upload failed - Click to retry"
                  }
                )
              ];

              progresses.forEach(progress => progress && container.appendChild(progress));
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
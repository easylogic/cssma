import type { NodeData } from '../types';

export interface AngularComponentOptions {
  componentName?: string;
  selector?: string;
  standalone?: boolean;
  includeProps?: boolean;
  includeStyles?: boolean;
}

/**
 * Convert NodeData to Angular component
 */
export function generateAngularComponent(
  nodeData: NodeData,
  options: AngularComponentOptions = {}
): { ts: string; html: string; css?: string } {
  const {
    componentName = 'Component',
    selector,
    standalone = true,
    includeProps = false,
    includeStyles = true
  } = options;

  const componentSelector = selector || componentName.toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase();
  const propTypes = new Set<string>();
  
  const html = generateAngularTemplate(nodeData, propTypes);
  const ts = generateAngularTypeScript(nodeData, {
    ...options,
    componentName,
    selector: componentSelector,
    propTypes: Array.from(propTypes)
  });
  const css = includeStyles ? generateAngularStyles(nodeData) : undefined;

  return { ts, html, css };
}

/**
 * Generate Angular TypeScript component
 */
function generateAngularTypeScript(
  nodeData: NodeData,
  options: AngularComponentOptions & { propTypes: string[] }
): string {
  const { componentName = 'Component', selector, standalone = true, includeProps = false, propTypes = [] } = options;

  let ts = '';

  // Imports
  ts += `import { Component`;
  if (includeProps && propTypes.length > 0) {
    ts += `, Input`;
  }
  ts += ` } from '@angular/core';\n`;
  
  if (standalone) {
    ts += `import { CommonModule } from '@angular/common';\n`;
  }
  ts += '\n';

  // Component decorator
  ts += `@Component({\n`;
  ts += `  selector: '${selector}',\n`;
  
  if (standalone) {
    ts += `  standalone: true,\n`;
    ts += `  imports: [CommonModule],\n`;
  }
  
  ts += `  templateUrl: './${componentName.toLowerCase()}.component.html',\n`;
  ts += `  styleUrls: ['./${componentName.toLowerCase()}.component.css']\n`;
  ts += `})\n`;

  // Component class
  ts += `export class ${componentName}Component {\n`;
  
  if (includeProps && propTypes.length > 0) {
    propTypes.forEach(prop => {
      const propName = prop.split(':')[0].trim();
      ts += `  @Input() ${propName}?: () => void;\n`;
    });
    ts += '\n';
  }

  ts += `  constructor() {}\n`;
  ts += `}\n`;

  return ts;
}

/**
 * Generate Angular template from NodeData
 */
function generateAngularTemplate(
  nodeData: NodeData,
  propTypes: Set<string>,
  depth: number = 0
): string {
  const { type, name, styles, text, children } = nodeData;
  const indent = '  '.repeat(depth);

  // Convert styles to class
  const className = styles || '';

  switch (type) {
    case 'TEXT':
      return `${indent}<span class="${className}">{{ '${text || 'Text'}' }}</span>`;

    case 'FRAME':
      const childrenTemplate = children?.map(child => 
        generateAngularTemplate(child, propTypes, depth + 1)
      ).join('\n') || '';

      return `${indent}<div class="${className}">\n${childrenTemplate}\n${indent}</div>`;

    case 'ELLIPSE':
      return `${indent}<div class="${className} rounded-full"></div>`;

    case 'RECTANGLE':
      return `${indent}<div class="${className}"></div>`;

    case 'BUTTON':
      propTypes.add('onClick?: () => void;');
      const buttonChildren = children?.map(child => 
        generateAngularTemplate(child, propTypes, depth + 1)
      ).join('\n') || '';

      return `${indent}<button class="${className}" (click)="onClick && onClick()">\n${buttonChildren}\n${indent}</button>`;

    default:
      return `${indent}<div class="${className}">\n${children?.map(child => 
        generateAngularTemplate(child, propTypes, depth + 1)
      ).join('\n') || ''}\n${indent}</div>`;
  }
}

/**
 * Generate Angular component styles
 */
function generateAngularStyles(nodeData: NodeData): string {
  return `/* Component styles */
:host {
  display: block;
}

/* Add your custom styles here */
`;
}

/**
 * Generate multiple Angular components from NodeData array
 */
export function generateAngularComponents(
  nodeDataArray: NodeData[],
  options: AngularComponentOptions = {}
): { [componentName: string]: { ts: string; html: string; css?: string } } {
  const components: { [componentName: string]: { ts: string; html: string; css?: string } } = {};

  nodeDataArray.forEach((nodeData, index) => {
    const componentName = options.componentName || nodeData.name || `Component${index + 1}`;
    components[componentName] = generateAngularComponent(nodeData, {
      ...options,
      componentName
    });
  });

  return components;
}

/**
 * Generate Angular component with Storybook story
 */
export function generateAngularWithStorybook(
  nodeData: NodeData,
  options: AngularComponentOptions = {}
): { component: { ts: string; html: string; css?: string }; story: string } {
  const componentName = options.componentName || nodeData.name || 'Component';
  
  const component = generateAngularComponent(nodeData, options);
  
  const story = `import type { Meta, StoryObj } from '@storybook/angular';
import { ${componentName}Component } from './${componentName.toLowerCase()}.component';

const meta: Meta<${componentName}Component> = {
  title: 'Components/${componentName}',
  component: ${componentName}Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<${componentName}Component>;

export const Default: Story = {
  args: {},
};
`;

  return { component, story };
} 
import type { NodeData } from '../types';

export interface ReactComponentOptions {
  componentName?: string;
  typescript?: boolean;
  includeProps?: boolean;
  exportDefault?: boolean;
}

/**
 * Convert NodeData to React component string
 */
export function generateReactComponent(
  nodeData: NodeData,
  options: ReactComponentOptions = {}
): string {
  const {
    componentName = 'Component',
    typescript = true,
    includeProps = false,
    exportDefault = true
  } = options;

  const imports = new Set<string>();
  const propTypes = new Set<string>();

  // Generate component JSX
  const jsx = generateJSXFromNodeData(nodeData, imports, propTypes);

  // Build component string
  let componentCode = '';

  // Add imports
  if (imports.size > 0) {
    componentCode += `import React from 'react';\n`;
    if (imports.has('useState')) {
      componentCode += `import { useState } from 'react';\n`;
    }
    componentCode += '\n';
  } else {
    componentCode += `import React from 'react';\n\n`;
  }

  // Add prop interface for TypeScript
  if (typescript && includeProps && propTypes.size > 0) {
    componentCode += `interface ${componentName}Props {\n`;
    propTypes.forEach(prop => {
      componentCode += `  ${prop}\n`;
    });
    componentCode += '}\n\n';
  }

  // Add component function
  const propsParam = includeProps 
    ? typescript 
      ? `props: ${componentName}Props` 
      : 'props'
    : '';

  componentCode += `${exportDefault ? 'export default ' : 'export '}function ${componentName}(${propsParam}) {\n`;
  componentCode += `  return (\n`;
  componentCode += jsx.split('\n').map(line => `    ${line}`).join('\n');
  componentCode += `\n  );\n`;
  componentCode += `}\n`;

  return componentCode;
}

/**
 * Generate JSX from NodeData recursively
 */
function generateJSXFromNodeData(
  nodeData: NodeData,
  imports: Set<string>,
  propTypes: Set<string>,
  depth: number = 0
): string {
  const { type, name, styles, text, children } = nodeData;
  const indent = '  '.repeat(depth);

  // Convert styles to className
  const className = styles || '';

  switch (type) {
    case 'TEXT':
      return `${indent}<span className="${className}">${text || 'Text'}</span>`;

    case 'FRAME':
      const childrenJSX = children?.map(child => 
        generateJSXFromNodeData(child, imports, propTypes, depth + 1)
      ).join('\n') || '';

      return `${indent}<div className="${className}">\n${childrenJSX}\n${indent}</div>`;

    case 'ELLIPSE':
      return `${indent}<div className="${className} rounded-full"></div>`;

    case 'RECTANGLE':
      return `${indent}<div className="${className}"></div>`;

    case 'BUTTON':
      imports.add('useState');
      propTypes.add('onClick?: () => void;');
      const buttonChildren = children?.map(child => 
        generateJSXFromNodeData(child, imports, propTypes, depth + 1)
      ).join('\n') || '';

      return `${indent}<button className="${className}" onClick={props.onClick}>\n${buttonChildren}\n${indent}</button>`;

    default:
      return `${indent}<div className="${className}">\n${children?.map(child => 
        generateJSXFromNodeData(child, imports, propTypes, depth + 1)
      ).join('\n') || ''}\n${indent}</div>`;
  }
}

/**
 * Generate multiple React components from NodeData array
 */
export function generateReactComponents(
  nodeDataArray: NodeData[],
  options: ReactComponentOptions = {}
): { [componentName: string]: string } {
  const components: { [componentName: string]: string } = {};

  nodeDataArray.forEach((nodeData, index) => {
    const componentName = options.componentName || nodeData.name || `Component${index + 1}`;
    components[componentName] = generateReactComponent(nodeData, {
      ...options,
      componentName
    });
  });

  return components;
}

/**
 * Generate React component with Storybook story
 */
export function generateReactWithStorybook(
  nodeData: NodeData,
  options: ReactComponentOptions = {}
): { component: string; story: string } {
  const componentName = options.componentName || nodeData.name || 'Component';
  
  const component = generateReactComponent(nodeData, options);
  
  const story = `import type { Meta, StoryObj } from '@storybook/react';
import ${componentName} from './${componentName}';

const meta: Meta<typeof ${componentName}> = {
  title: 'Components/${componentName}',
  component: ${componentName},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
`;

  return { component, story };
} 
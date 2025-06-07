import type { NodeData } from '../types';

export interface VueComponentOptions {
  componentName?: string;
  typescript?: boolean;
  composition?: boolean; // Composition API vs Options API
  includeProps?: boolean;
  sfc?: boolean; // Single File Component
}

/**
 * Convert NodeData to Vue component string
 */
export function generateVueComponent(
  nodeData: NodeData,
  options: VueComponentOptions = {}
): string {
  const {
    componentName = 'Component',
    typescript = true,
    composition = true,
    includeProps = false,
    sfc = true
  } = options;

  if (sfc) {
    return generateSFC(nodeData, options);
  } else {
    return generateVueScript(nodeData, options);
  }
}

/**
 * Generate Vue Single File Component
 */
function generateSFC(
  nodeData: NodeData,
  options: VueComponentOptions
): string {
  const { componentName = 'Component', typescript = true, composition = true, includeProps = false } = options;
  
  const propTypes = new Set<string>();
  const template = generateVueTemplate(nodeData, propTypes);
  const script = generateVueScript(nodeData, { ...options, sfc: false });

  let sfc = `<template>\n${template}\n</template>\n\n`;
  sfc += script;
  
  // Add styles if needed
  sfc += `\n<style scoped>\n/* Component styles */\n</style>\n`;

  return sfc;
}

/**
 * Generate Vue script section
 */
function generateVueScript(
  nodeData: NodeData,
  options: VueComponentOptions
): string {
  const { componentName = 'Component', typescript = true, composition = true, includeProps = false } = options;
  
  const propTypes = new Set<string>();
  generateVueTemplate(nodeData, propTypes); // To collect prop types

  let script = '';

  if (composition) {
    // Composition API
    script += `<script${typescript ? ' lang="ts"' : ''}>\n`;
    script += `import { defineComponent } from 'vue';\n\n`;
    
    if (includeProps && propTypes.size > 0) {
      script += `interface Props {\n`;
      propTypes.forEach(prop => {
        script += `  ${prop}\n`;
      });
      script += `}\n\n`;
    }

    script += `export default defineComponent({\n`;
    script += `  name: '${componentName}',\n`;
    
    if (includeProps && propTypes.size > 0) {
      script += `  props: {\n`;
      propTypes.forEach(prop => {
        const propName = prop.split(':')[0].trim();
        script += `    ${propName}: { type: Function, required: false },\n`;
      });
      script += `  },\n`;
    }
    
    script += `  setup(props) {\n`;
    script += `    return {\n`;
    script += `      // reactive data and methods\n`;
    script += `    };\n`;
    script += `  }\n`;
    script += `});\n`;
    script += `</script>`;
  } else {
    // Options API
    script += `<script${typescript ? ' lang="ts"' : ''}>\n`;
    script += `export default {\n`;
    script += `  name: '${componentName}',\n`;
    
    if (includeProps && propTypes.size > 0) {
      script += `  props: {\n`;
      propTypes.forEach(prop => {
        const propName = prop.split(':')[0].trim();
        script += `    ${propName}: { type: Function, required: false },\n`;
      });
      script += `  },\n`;
    }
    
    script += `  data() {\n`;
    script += `    return {\n`;
    script += `      // component data\n`;
    script += `    };\n`;
    script += `  },\n`;
    script += `  methods: {\n`;
    script += `    // component methods\n`;
    script += `  }\n`;
    script += `};\n`;
    script += `</script>`;
  }

  return script;
}

/**
 * Generate Vue template from NodeData
 */
function generateVueTemplate(
  nodeData: NodeData,
  propTypes: Set<string>,
  depth: number = 1
): string {
  const { type, name, styles, text, children } = nodeData;
  const indent = '  '.repeat(depth);

  // Convert styles to class
  const className = styles || '';

  switch (type) {
    case 'TEXT':
      return `${indent}<span class="${className}">{{ ${text ? `'${text}'` : "'Text'"} }}</span>`;

    case 'FRAME':
      const childrenTemplate = children?.map(child => 
        generateVueTemplate(child, propTypes, depth + 1)
      ).join('\n') || '';

      return `${indent}<div class="${className}">\n${childrenTemplate}\n${indent}</div>`;

    case 'ELLIPSE':
      return `${indent}<div class="${className} rounded-full"></div>`;

    case 'RECTANGLE':
      return `${indent}<div class="${className}"></div>`;

    case 'BUTTON':
      propTypes.add('onClick?: () => void;');
      const buttonChildren = children?.map(child => 
        generateVueTemplate(child, propTypes, depth + 1)
      ).join('\n') || '';

      return `${indent}<button class="${className}" @click="onClick">\n${buttonChildren}\n${indent}</button>`;

    default:
      return `${indent}<div class="${className}">\n${children?.map(child => 
        generateVueTemplate(child, propTypes, depth + 1)
      ).join('\n') || ''}\n${indent}</div>`;
  }
}

/**
 * Generate multiple Vue components from NodeData array
 */
export function generateVueComponents(
  nodeDataArray: NodeData[],
  options: VueComponentOptions = {}
): { [componentName: string]: string } {
  const components: { [componentName: string]: string } = {};

  nodeDataArray.forEach((nodeData, index) => {
    const componentName = options.componentName || nodeData.name || `Component${index + 1}`;
    components[componentName] = generateVueComponent(nodeData, {
      ...options,
      componentName
    });
  });

  return components;
}

/**
 * Generate Vue component with Storybook story
 */
export function generateVueWithStorybook(
  nodeData: NodeData,
  options: VueComponentOptions = {}
): { component: string; story: string } {
  const componentName = options.componentName || nodeData.name || 'Component';
  
  const component = generateVueComponent(nodeData, options);
  
  const story = `import type { Meta, StoryObj } from '@storybook/vue3';
import ${componentName} from './${componentName}.vue';

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
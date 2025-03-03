import { ComponentDefinition } from '../types';

const buttonSystem: ComponentDefinition = {
  type: 'COMPONENT_SET',
  id: 'button-system',
  name: 'Button',
  props: {
    variantProperties: {
      size: ['sm', 'md', 'lg'],
      style: ['primary', 'secondary', 'outline', 'ghost'],
      state: ['default', 'hover', 'pressed', 'disabled']
    },
    propertyDefinitions: {
      text: {
        type: 'TEXT',
        defaultValue: 'Button'
      },
      icon: {
        type: 'TEXT',
        defaultValue: ''
      },
      iconPosition: {
        type: 'VARIANT',
        options: ['left', 'right'],
        defaultValue: 'left'
      },
      disabled: {
        type: 'BOOLEAN',
        defaultValue: false
      }
    },
    variants: {
      'primary-sm-default': {
        id: 'button-primary-sm-default',
        name: 'Button/Primary/Small/Default',
        variant: {
          size: 'sm',
          style: 'primary',
          state: 'default'
        },
        styles: 'flex w-auto h-auto items-center justify-center gap-[8] px-[12] py-[6] bg-blue-600 rounded-md',
        children: [
          {
            type: 'TEXT',
            name: 'Icon/Left',
            styles: 'w-auto h-auto text-sm text-white',
            bind: {
              text: 'icon',
              visible: {
                property: 'iconPosition',
                value: 'left'
              }
            }
          },
          {
            type: 'TEXT',
            name: 'Label',
            styles: 'w-auto h-auto text-sm font-medium text-white',
            bind: { text: 'text' }
          },
          {
            type: 'TEXT',
            name: 'Icon/Right',
            styles: 'w-auto h-auto text-sm text-white',
            bind: {
              text: 'icon',
              visible: {
                property: 'iconPosition',
                value: 'right'
              }
            }
          }
        ]
      },
      'primary-sm-hover': {
        id: 'button-primary-sm-hover',
        name: 'Button/Primary/Small/Hover',
        variant: {
          size: 'sm',
          style: 'primary',
          state: 'hover'
        },
        styles: 'flex w-auto h-auto items-center justify-center gap-[8] px-[12] py-[6] bg-blue-700 rounded-md',
        children: [/* Same structure as default */]
      },
      'primary-md-default': {
        id: 'button-primary-md-default',
        name: 'Button/Primary/Medium/Default',
        variant: {
          size: 'md',
          style: 'primary',
          state: 'default'
        },
        styles: 'flex w-auto h-auto items-center justify-center gap-[8] px-[16] py-[8] bg-blue-600 rounded-md',
        children: [
          {
            type: 'TEXT',
            name: 'Icon/Left',
            styles: 'w-auto h-auto text-base text-white',
            bind: {
              text: 'icon',
              visible: {
                property: 'iconPosition',
                value: 'left'
              }
            }
          },
          {
            type: 'TEXT',
            name: 'Label',
            styles: 'w-auto h-auto text-base font-medium text-white',
            bind: { text: 'text' }
          },
          {
            type: 'TEXT',
            name: 'Icon/Right',
            styles: 'w-auto h-auto text-base text-white',
            bind: {
              text: 'icon',
              visible: {
                property: 'iconPosition',
                value: 'right'
              }
            }
          }
        ]
      },
      'secondary-md-default': {
        id: 'button-secondary-md-default',
        name: 'Button/Secondary/Medium/Default',
        variant: {
          size: 'md',
          style: 'secondary',
          state: 'default'
        },
        styles: 'flex w-auto h-auto items-center justify-center gap-[8] px-[16] py-[8] bg-gray-100 rounded-md',
        children: [
          {
            type: 'TEXT',
            name: 'Icon/Left',
            styles: 'w-auto h-auto text-base text-gray-600',
            bind: {
              text: 'icon',
              visible: {
                property: 'iconPosition',
                value: 'left'
              }
            }
          },
          {
            type: 'TEXT',
            name: 'Label',
            styles: 'w-auto h-auto text-base font-medium text-gray-600',
            bind: { text: 'text' }
          }
        ]
      }
    }
  },
  defaultVariant: 'primary-md-default'
};

// Example of creating button instances
const buttonInstances = {
  type: 'FRAME',
  name: 'Button Examples',
  styles: 'flex-col w-full h-auto gap-[24] p-[32]',
  children: [
    // Primary Button with Icon
    {
      type: 'INSTANCE',
      name: 'Primary Button with Left Icon',
      componentId: 'button-primary-md-default',
      variantProps: {
        size: 'md',
        style: 'primary',
        state: 'default'
      },
      properties: {
        text: 'Get Started',
        icon: '→',
        iconPosition: 'left'
      }
    },
    // Secondary Button
    {
      type: 'INSTANCE',
      name: 'Secondary Button',
      componentId: 'button-secondary-md-default',
      variantProps: {
        size: 'md',
        style: 'secondary',
        state: 'default'
      },
      properties: {
        text: 'Learn More'
      }
    },
    // Disabled Primary Button
    {
      type: 'INSTANCE',
      name: 'Disabled Primary Button',
      componentId: 'button-primary-md-default',
      variantProps: {
        size: 'md',
        style: 'primary',
        state: 'disabled'
      },
      properties: {
        text: 'Submit',
        disabled: true
      },
      styles: 'opacity-50'
    }
  ]
};

export { buttonSystem, buttonInstances }; 
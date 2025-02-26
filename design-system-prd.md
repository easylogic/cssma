# Figma Design System PRD

## 1. Overview

### 1.1 Purpose
- Provide consistent user experience
- Streamline design-development workflow
- Enhance component reusability
- Reduce design decision time

### 1.2 Goals
- [ ] Build core component library
- [ ] Establish design token system
- [ ] Provide documentation and guidelines
- [ ] Implement theme system (light/dark modes)

### 1.3 Scope
1. Basic Components
   - Button
   - Icon
   - Typography
   - Input
   - Card

2. Composite Components
   - Navigation
   - Dialog
   - Form
   - Table

## 2. Design Principles

### 2.1 Consistency
- Use unified design language across components
- Apply consistent interaction patterns
- Maintain unified naming conventions

### 2.2 Reusability
- Modular component design
- Extensible variant system
- Composition-based structure

### 2.3 Accessibility
- WCAG 2.1 AA compliance
- Keyboard interaction support
- Sufficient color contrast

## 3. Token System

### 3.1 Hierarchy
```typescript
1. Primitive Tokens
   ├── Colors
   ├── Spacing
   ├── Typography
   └── Effects

2. Semantic Tokens
   ├── Background
   ├── Text
   ├── Border
   └── Interactive

3. Component Tokens
   ├── Button
   ├── Card
   ├── Input
   └── Navigation
```

### 3.2 Token Categories
1. Colors
   - Brand Colors
   - UI Colors
   - Status Colors
   - Text Colors

2. Typography
   - Font Families
   - Font Sizes
   - Line Heights
   - Font Weights

3. Layout
   - Spacing
   - Sizing
   - Breakpoints
   - Grid

4. Effects
   - Shadows
   - Borders
   - Opacity
   - Animations

## 4. Component Architecture

### 4.1 Structure
```
components/
├── atomic/        # Basic components
├── molecular/     # Composite components
├── organisms/     # Page sections
└── templates/     # Page templates
```

### 4.2 Component Composition
```typescript
interface ComponentStructure {
  variants: {      // Variants
    size: ['sm', 'md', 'lg'];
    variant: ['filled', 'outlined', 'ghost'];
    state: ['default', 'hover', 'pressed', 'disabled'];
  };
  properties: {    // Properties
    required: ['variant'];
    optional: ['size', 'disabled', 'onClick'];
  };
  composition: {   // Composition
    slots: ['prefix', 'content', 'suffix'];
    children: boolean;
  };
}
```

### 4.3 State Management
```typescript
interface ComponentState {
  interactive: {
    hover: boolean;
    pressed: boolean;
    focused: boolean;
  };
  disabled: boolean;
  loading: boolean;
  error: boolean;
}
```

## 5. Implementation Guidelines

### 5.1 Component Creation Patterns

#### Base Structure
```typescript
class ComponentManager {
  private static instance: ComponentManager;
  private componentSet: ComponentSetNode | null = null;
  private variantMap = new Map<string, ComponentNode>();

  private constructor() {}
  static getInstance() { ... }
}
```

#### Core Methods
- `createComponent`: Create a single component
- `createComponentSet`: Create component set with all variants
- `createInstance`: Create component instance
- `updateInstance`: Update instance properties

#### Type System
```typescript
// Basic types
type ComponentSize = 'small' | 'medium' | 'large';
type ComponentVariant = 'filled' | 'outlined' | 'elevated';
type ComponentState = 'default' | 'hover' | 'pressed' | 'disabled';

// Variant properties interface
interface BaseVariantProps {
  size?: ComponentSize;
  variant?: ComponentVariant;
  disabled?: boolean;
}

// Instance properties interface
interface ComponentProps extends Partial<BaseVariantProps> {
  // Component-specific properties
}
```

#### Style System
```typescript
interface ComponentStateStyle {
  default: string;
  hover: string;
  pressed: string;
  disabled: string;
}

interface ComponentStyle {
  background: ComponentStateStyle;
  border: ComponentStateStyle;
  text?: ComponentStateStyle;
}
```

### 5.2 Layout System

#### Base Layout Setup
```typescript
private setupBaseLayout(node: ComponentNode, size: typeof COMPONENT_SIZES[keyof typeof COMPONENT_SIZES]) {
  // Layout mode setup
  node.layoutMode = "HORIZONTAL" | "VERTICAL";
  node.primaryAxisAlignItems = "CENTER";
  node.counterAxisAlignItems = "CENTER";
  
  // Size setup
  node.layoutSizingHorizontal = "FIXED" | "FILL";
  node.layoutSizingVertical = "FIXED" | "HUG";
  
  // Style variable setup
  variables.setBindVariable(node, 'borderRadius', size.borderRadius);
  variables.setBindVariable(node, 'padding', size.padding);
  variables.setBindVariable(node, 'spacing', size.spacing);
}
```

#### Absolute Positioning
```typescript
// For overlays and badges
node.layoutPositioning = "ABSOLUTE";
node.constraints = { horizontal: "STRETCH", vertical: "STRETCH" };
node.x = 0;
node.y = 0;
```

### 5.3 Style Application Patterns

#### Base Style Application
```typescript
private async applyStyle(node: ComponentNode, variant: ComponentVariantProps) {
  const variantStyle = COMPONENT_STYLES[variant.variant || 'filled'];
  const state = variant.disabled ? 'disabled' : 'default';

  // Background color
  node.fills = [variables.bindVariable(variantStyle.background[state])];
  
  // Border setup
  if (variant.variant === 'outlined') {
    node.strokes = [variables.bindVariable(variantStyle.border[state])];
    variables.setBindVariable(node, 'strokeWeight', 'border/width/default');
  }
}
```

### 5.4 Component Set Organization

#### Variant Definition
```typescript
const COMPONENT_VARIANTS: ComponentVariantProps[] = [
  // Size variants
  { size: 'small', variant: 'filled' },
  { size: 'medium', variant: 'filled' },
  { size: 'large', variant: 'filled' },

  // Style variants
  { size: 'medium', variant: 'filled' },
  { size: 'medium', variant: 'outlined' },
  { size: 'medium', variant: 'elevated' },

  // State variants
  { size: 'medium', variant: 'filled', disabled: true }
]
```

#### Component Set Layout
```typescript
private setupComponentSetLayout(componentSet: ComponentSetNode) {
  componentSet.layoutMode = "HORIZONTAL";
  componentSet.layoutWrap = "WRAP";
  componentSet.itemSpacing = 40;
  componentSet.counterAxisSpacing = 40;
  componentSet.primaryAxisSizingMode = "AUTO";
  componentSet.counterAxisSizingMode = "AUTO";
}
```

### 5.5 Token System Implementation

#### Token Hierarchy
```typescript
// 1. Primitive tokens
const PRIMITIVE = {
  "gray/50/light": { Value: "#FAFAFA" },
  "gray/100/light": { Value: "#F5F5F5" },
}

// 2. Color tokens
const COLOR = {
  "color/background/default": {
    Light: "{color/white}",
    Dark: "{gray/900/dark}"
  }
}

// 3. Semantic tokens
const SEMANTIC = {
  "surface/color/default": { Value: "{color/background/default}" },
  "text/color/default": { Value: "{color/text/default}" },
  "border/color/default": { Value: "{color/border/default}" }
}
```

#### Token Application Patterns
```typescript
// Direct binding
node.fills = [variables.bindVariable('surface/color/default')];

// Variable binding
variables.setBindVariable(node, 'borderRadius', 'component/base/radius/sm');

// State tokens
const stateTokens = {
  default: 'surface/color/default',
  hover: 'surface/color/hover',
  pressed: 'surface/color/pressed',
  disabled: 'surface/color/disabled'
};
```

#### Token Naming Convention
1. Hierarchical Structure
   - `category/subcategory/variant`
   - Example: `surface/color/default`, `text/body/sm`

2. Size Steps
   - xs, sm, md, lg, xl
   - Example: `component/base/padding/sm`

3. State Distinctions
   - default, hover, pressed, disabled
   - Example: `surface/color/hover`

## 6. Quality Standards

### 6.1 Design Quality
- [ ] Visual feedback for all states
- [ ] Consistent border radius
- [ ] Accurate typography scale
- [ ] Appropriate spacing and alignment

### 6.2 Technical Quality
- [ ] Performance optimization
- [ ] Memory management
- [ ] Error handling
- [ ] Type safety

### 6.3 Documentation Quality
- [ ] Component usage guides
- [ ] Property and variant documentation
- [ ] Example code
- [ ] Change history

## 7. Deployment Strategy

### 7.1 Version Control
```typescript
interface Version {
  major: number;  // Breaking changes
  minor: number;  // Feature additions
  patch: number;  // Bug fixes
}
```

### 7.2 Deployment Process
1. Development
   - Component implementation
   - Documentation writing
   - Code review

2. Validation
   - Design review
   - Functionality testing
   - Accessibility checks

3. Deployment
   - Version tagging
   - Changelog creation
   - Release notes

## 8. Maintenance Plan

### 8.1 Monitoring
- Component usage analytics
- Performance metrics
- Error logging

### 8.2 Update Cycle
- Weekly: Bug fixes
- Monthly: Feature improvements
- Quarterly: Major updates

### 8.3 Support Policy
- Support for latest 2 major versions
- Priority for security updates
- Backward compatibility guarantee 

## 9. Component Set Showcase

### 9.1 Showcase Structure
```typescript
interface ComponentShowcase {
  metadata: {
    title: string;
    description: string;
    version: string;
    lastUpdated: string;
    status: 'draft' | 'beta' | 'stable' | 'deprecated';
  };
  
  anatomy: {
    image: ComponentNode;
    parts: Array<{
      name: string;
      description: string;
      required: boolean;
    }>;
  };

  properties: Array<{
    name: string;
    type: string;
    default: string;
    description: string;
    options?: string[];
    required: boolean;
  }>;

  variants: Array<{
    title: string;
    description: string;
    examples: ComponentNode[];
  }>;

  states: Array<{
    name: string;
    description: string;
    visual: ComponentNode;
    interaction?: string;
  }>;

  usage: {
    description: string;
    examples: Array<{
      title: string;
      description: string;
      component: ComponentNode;
      code?: string;
    }>;
  };

  bestPractices: Array<{
    title: string;
    description: string;
    do: {
      image: ComponentNode;
      description: string;
    };
    dont: {
      image: ComponentNode;
      description: string;
    };
  }>;
}
```

### 9.2 Showcase Page Layout
```typescript
interface ShowcaseLayout {
  header: {
    title: string;
    description: string;
    metadata: ShowcaseMetadata;
  };
  
  sections: {
    anatomy: {
      width: number;
      spacing: number;
      layout: 'horizontal' | 'vertical';
    };
    
    variants: {
      columns: number;
      spacing: {
        horizontal: number;
        vertical: number;
      };
      background: string;
    };
    
    examples: {
      width: number;
      maxHeight: number;
      spacing: number;
    };
  };
  
  styling: {
    colors: Record<string, string>;
    typography: Record<string, TextStyle>;
    spacing: Record<string, number>;
  };
}
```

### 9.3 Interactive Examples
```typescript
interface ShowcaseInteraction {
  preview: {
    canvas: {
      width: number;
      height: number;
      background: string;
    };
    
    controls: Array<{
      type: 'select' | 'toggle' | 'input' | 'color';
      property: string;
      options?: string[];
      default: any;
    }>;
    
    states: {
      hover: boolean;
      pressed: boolean;
      focused: boolean;
      disabled: boolean;
    };
  };
  
  playground: {
    editable: string[];
    presets: Record<string, ComponentProps>;
    export: {
      formats: string[];
      settings: Record<string, any>;
    };
  };
}
```

### 9.4 Documentation Integration
```typescript
interface ShowcaseDocumentation {
  codeExamples: {
    languages: string[];
    frameworks: string[];
    snippets: Record<string, string>;
  };
  
  designTokens: {
    used: string[];
    customizable: string[];
    relationships: Record<string, string[]>;
  };
  
  accessibility: {
    guidelines: string[];
    testCases: string[];
    violations: string[];
  };
  
  versioning: {
    changelog: Array<{
      version: string;
      changes: string[];
      date: string;
    }>;
    migrations: Record<string, string>;
  };
}
```

### 9.5 Showcase Generation
```typescript
interface ShowcaseGenerator {
  input: {
    component: ComponentSetNode;
    variants: ComponentNode[];
    documentation: ComponentDocumentation;
  };
  
  output: {
    format: 'figma' | 'html' | 'mdx';
    assets: {
      images: boolean;
      code: boolean;
      tokens: boolean;
    };
    structure: {
      sections: string[];
      order: string[];
    };
  };
  
  settings: {
    template: string;
    branding: Record<string, string>;
    localization: Record<string, string>;
  };
}
```

### 9.6 Quality Checklist
```typescript
interface ShowcaseQuality {
  content: {
    required: string[];
    recommended: string[];
    optional: string[];
  };
  
  visual: {
    alignment: boolean;
    spacing: boolean;
    contrast: boolean;
    typography: boolean;
  };
  
  technical: {
    performance: boolean;
    accessibility: boolean;
    responsiveness: boolean;
    compatibility: boolean;
  };
  
  documentation: {
    completeness: boolean;
    accuracy: boolean;
    clarity: boolean;
    examples: boolean;
  };
}
```

### 9.7 Showcase Examples
```typescript
// Example showcase configuration for a Button component
const ButtonShowcase: ComponentShowcase = {
  metadata: {
    title: "Button",
    description: "Interactive button component with multiple variants and states",
    version: "1.0.0",
    status: "stable",
    lastUpdated: "2024-03-15",
    maintainers: ["Design Systems Team"]
  },
  
  anatomy: {
    image: "button-anatomy.png",
    parts: [
      {
        name: "Container",
        description: "Main button wrapper with background and border",
        required: true,
        styles: ["background", "border", "shadow"]
      },
      {
        name: "Label",
        description: "Text content of the button",
        required: true,
        styles: ["typography", "color"]
      },
      {
        name: "Icon",
        description: "Optional leading or trailing icon",
        required: false,
        styles: ["size", "color", "spacing"]
      },
      {
        name: "LoadingSpinner",
        description: "Indicates loading state",
        required: false,
        styles: ["size", "color", "animation"]
      }
    ]
  },
  
  properties: [
    {
      name: "size",
      type: "enum",
      options: ["small", "medium", "large"],
      default: "medium",
      description: "Controls the overall size of the button",
      required: false
    },
    {
      name: "variant",
      type: "enum",
      options: ["filled", "outlined", "ghost"],
      default: "filled",
      description: "Determines the visual style of the button",
      required: true
    },
    {
      name: "type",
      type: "enum",
      options: ["primary", "secondary", "danger"],
      default: "primary",
      description: "Defines the semantic meaning and color scheme",
      required: false
    },
    {
      name: "icon",
      type: "object",
      properties: {
        name: "string",
        position: "enum('left' | 'right')",
        size: "enum('small' | 'medium' | 'large')"
      },
      description: "Optional icon configuration",
      required: false
    },
    {
      name: "disabled",
      type: "boolean",
      default: false,
      description: "Disables button interactions",
      required: false
    },
    {
      name: "loading",
      type: "boolean",
      default: false,
      description: "Shows loading state",
      required: false
    }
  ],

  variants: [
    {
      title: "Sizes",
      description: "Available button sizes for different contexts",
      examples: [
        {
          name: "Small",
          props: { size: "small", label: "Small Button" },
          usage: "Use in tight spaces or for secondary actions"
        },
        {
          name: "Medium",
          props: { size: "medium", label: "Medium Button" },
          usage: "Default size, suitable for most cases"
        },
        {
          name: "Large",
          props: { size: "large", label: "Large Button" },
          usage: "Use for primary calls to action"
        }
      ]
    },
    {
      title: "Variants",
      description: "Visual styles for different purposes",
      examples: [
        {
          name: "Filled",
          props: { variant: "filled", label: "Filled Button" },
          usage: "Primary actions with high emphasis"
        },
        {
          name: "Outlined",
          props: { variant: "outlined", label: "Outlined Button" },
          usage: "Secondary actions or in contrast with filled buttons"
        },
        {
          name: "Ghost",
          props: { variant: "ghost", label: "Ghost Button" },
          usage: "Subtle actions or in toolbars"
        }
      ]
    },
    {
      title: "Types",
      description: "Semantic variations for different contexts",
      examples: [
        {
          name: "Primary",
          props: { type: "primary", label: "Primary Action" },
          usage: "Main calls to action"
        },
        {
          name: "Secondary",
          props: { type: "secondary", label: "Secondary Action" },
          usage: "Alternative or complementary actions"
        },
        {
          name: "Danger",
          props: { type: "danger", label: "Delete" },
          usage: "Destructive or warning actions"
        }
      ]
    }
  ],

  states: [
    {
      name: "Default",
      description: "Normal state of the button",
      visual: "button-default.png",
      tokens: {
        background: "surface/color/default",
        text: "text/color/default"
      }
    },
    {
      name: "Hover",
      description: "When the cursor is over the button",
      visual: "button-hover.png",
      interaction: "Mouse enter/leave",
      tokens: {
        background: "surface/color/hover",
        text: "text/color/hover"
      }
    },
    {
      name: "Pressed",
      description: "When the button is being clicked",
      visual: "button-pressed.png",
      interaction: "Mouse down/up",
      tokens: {
        background: "surface/color/pressed",
        text: "text/color/pressed"
      }
    },
    {
      name: "Disabled",
      description: "When the button is not interactive",
      visual: "button-disabled.png",
      tokens: {
        background: "surface/color/disabled",
        text: "text/color/disabled"
      }
    },
    {
      name: "Loading",
      description: "When the button action is processing",
      visual: "button-loading.png",
      interaction: "Async operation feedback",
      tokens: {
        opacity: "opacity/50"
      }
    }
  ],

  usage: {
    description: "Buttons are used to trigger actions or navigate between pages",
    examples: [
      {
        title: "Form Submit",
        description: "Primary action button at the end of a form",
        component: {
          variant: "filled",
          type: "primary",
          label: "Submit Form",
          size: "large"
        },
        code: `<Button
  variant="filled"
  type="primary"
  size="large"
  onClick={handleSubmit}
>
  Submit Form
</Button>`
      },
      {
        title: "Dialog Actions",
        description: "Button group in a dialog footer",
        component: [
          {
            variant: "ghost",
            label: "Cancel",
            type: "secondary"
          },
          {
            variant: "filled",
            label: "Confirm",
            type: "primary"
          }
        ],
        code: `<DialogFooter>
  <Button variant="ghost" type="secondary">
    Cancel
  </Button>
  <Button variant="filled" type="primary">
    Confirm
  </Button>
</DialogFooter>`
      },
      {
        title: "Toolbar Button",
        description: "Icon button in a toolbar",
        component: {
          variant: "ghost",
          icon: { name: "edit", position: "left" },
          size: "small"
        },
        code: `<Button
  variant="ghost"
  size="small"
  icon={{ name: "edit", position: "left" }}
/>`
      }
    ]
  },

  bestPractices: [
    {
      title: "Label Clarity",
      description: "Use clear, action-oriented labels",
      do: {
        image: "button-do-label.png",
        description: "Use specific, action-oriented text like 'Save Changes'"
      },
      dont: {
        image: "button-dont-label.png",
        description: "Avoid vague text like 'OK' or 'Click Here'"
      }
    },
    {
      title: "Icon Usage",
      description: "Use icons to enhance button meaning",
      do: {
        image: "button-do-icon.png",
        description: "Use relevant icons that complement the label"
      },
      dont: {
        image: "button-dont-icon.png",
        description: "Avoid decorative icons that don't add meaning"
      }
    },
    {
      title: "Hierarchy",
      description: "Maintain clear visual hierarchy",
      do: {
        image: "button-do-hierarchy.png",
        description: "Use different variants to show action importance"
      },
      dont: {
        image: "button-dont-hierarchy.png",
        description: "Avoid using the same variant for all actions"
      }
    }
  ],

  designTokens: {
    used: [
      "surface/color/*",
      "text/color/*",
      "component/base/height/*",
      "component/base/padding/*",
      "component/base/radius/*"
    ],
    customizable: [
      "button/background/*",
      "button/text/*",
      "button/border/*",
      "button/shadow/*"
    ]
  },

  accessibility: {
    guidelines: [
      "Must be keyboard focusable",
      "Should have sufficient color contrast",
      "Loading state should be announced to screen readers",
      "Icon-only buttons must have aria-label"
    ],
    roles: {
      default: "button",
      submit: "submit",
      reset: "reset"
    },
    interactions: {
      keyboard: ["Enter", "Space"],
      mouse: ["Click", "Hover"],
      touch: ["Tap"]
    }
  }
};
``` 

## 10. Component Implementation Specifications

### 10.1 Component Manager Structure
```typescript
class ComponentManager {
  // Singleton Pattern
  private static instance: ComponentManager;
  private componentSet: ComponentSetNode | null = null;
  private variantMap = new Map<string, ComponentNode>();

  // Section Managers (for composite components)
  private sectionManagers: {
    header?: SectionManager;
    content?: SectionManager;
    footer?: SectionManager;
  };

  // Variant Key Generation
  private getVariantKey(variant: ComponentVariantProps): string {
    return [
      'size=' + (variant.size || 'medium'),
      'variant=' + (variant.variant || 'filled'),
      'state=' + (variant.state || 'default'),
      // Additional variant properties
    ].join(',');
  }

  // Component Creation Methods
  async createComponent(variant: ComponentVariantProps): Promise<ComponentNode>;
  async createInstance(variant: ComponentVariantProps, props: any): Promise<InstanceNode>;
  async updateInstance(instance: InstanceNode, props: any): Promise<void>;
}
```

### 10.2 Component Layout Management
```typescript
interface LayoutConfig {
  base: {
    mode: "HORIZONTAL" | "VERTICAL";
    primaryAxisAlignItems: "MIN" | "CENTER" | "MAX" | "SPACE_BETWEEN";
    counterAxisAlignItems: "MIN" | "CENTER" | "MAX";
    primaryAxisSizingMode: "FIXED" | "AUTO";
    counterAxisSizingMode: "FIXED" | "AUTO";
  };
  
  sizing: {
    width?: number | "FILL_CONTAINER";
    height?: number | "HUG_CONTENTS";
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
  };
  
  spacing: {
    padding: {
      horizontal: string;
      vertical: string;
    };
    gap: string;
    margin?: string;
  };
  
  constraints: {
    horizontal: "SCALE" | "CENTER" | "LEFT" | "RIGHT" | "STRETCH";
    vertical: "SCALE" | "CENTER" | "TOP" | "BOTTOM" | "STRETCH";
  };
}
```

### 10.3 Style Application System
```typescript
interface StyleSystem {
  tokens: {
    background: string;
    border: string;
    text: string;
    shadow?: string;
    opacity?: string;
  };

  states: {
    default: Record<string, string>;
    hover: Record<string, string>;
    pressed: Record<string, string>;
    disabled: Record<string, string>;
    loading?: Record<string, string>;
  };

  variants: {
    filled: Record<string, Record<string, string>>;
    outlined: Record<string, Record<string, string>>;
    ghost: Record<string, Record<string, string>>;
  };
}

interface StyleApplication {
  applyBackground(node: SceneNode, variant: string, state: string): void;
  applyBorder(node: SceneNode, variant: string, state: string): void;
  applyTypography(node: TextNode, variant: string, state: string): void;
  applyShadow(node: SceneNode, variant: string, state: string): void;
  applyOpacity(node: SceneNode, variant: string, state: string): void;
}
```

### 10.4 Component Set Management
```typescript
interface ComponentSetConfig {
  name: string;
  description: string;
  layout: {
    mode: "HORIZONTAL" | "VERTICAL";
    wrap: boolean;
    spacing: number;
    padding: number;
    width: number;
    background: Paint;
  };
  
  variants: {
    properties: string[];
    combinations: string[][];
    excluded: string[];
  };
  
  organization: {
    grouping: string[];
    order: string[];
    sections: string[];
  };
}
```

### 10.5 Instance Management
```typescript
interface InstanceManager {
  create(variant: ComponentVariantProps): InstanceNode;
  update(instance: InstanceNode, props: any): void;
  swap(instance: InstanceNode, newVariant: string): void;
  
  findByRole(instance: InstanceNode, role: string): SceneNode | null;
  findByName(instance: InstanceNode, name: string): SceneNode | null;
  
  setProperties(instance: InstanceNode, props: Record<string, any>): void;
  getProperties(instance: InstanceNode): Record<string, any>;
}
```

### 10.6 Component Event System
```typescript
interface ComponentEventSystem {
  interactions: {
    hover: boolean;
    click: boolean;
    focus: boolean;
    drag?: boolean;
  };

  triggers: {
    onHover?: string;
    onClick?: string;
    onFocus?: string;
    onDrag?: string;
  };

  feedback: {
    visual: boolean;
    haptic?: boolean;
    sound?: boolean;
  };

  relaunchData: Record<string, string>;
}
```

### 10.7 Component Testing Specifications
```typescript
interface ComponentTestSpec {
  layout: {
    sizing: boolean;
    alignment: boolean;
    spacing: boolean;
    constraints: boolean;
  };

  style: {
    tokens: boolean;
    states: boolean;
    variants: boolean;
    themes: boolean;
  };

  interaction: {
    events: boolean;
    feedback: boolean;
    accessibility: boolean;
  };

  performance: {
    renderTime: number;
    memoryUsage: number;
    instanceLimit: number;
  };
}
```

### 10.8 Component Integration
```typescript
interface ComponentIntegration {
  dependencies: {
    required: string[];
    optional: string[];
  };

  compatibility: {
    figmaVersion: string;
    pluginVersion: string;
    apiVersion: string;
  };

  resources: {
    assets: string[];
    fonts: string[];
    styles: string[];
  };

  initialization: {
    setup: () => Promise<void>;
    cleanup: () => Promise<void>;
    reset: () => Promise<void>;
  };
}
```

### 10.9 Error Handling
```typescript
interface ComponentErrorHandling {
  validation: {
    props: (props: any) => boolean;
    state: (state: any) => boolean;
    style: (style: any) => boolean;
  };

  fallbacks: {
    props: Record<string, any>;
    style: Record<string, any>;
    content: Record<string, any>;
  };

  recovery: {
    onError: (error: Error) => void;
    onWarning: (warning: string) => void;
    onMissingDependency: (dep: string) => void;
  };
}
```

### 10.10 Component Documentation
```typescript
interface ComponentDocumentation {
  metadata: {
    name: string;
    version: string;
    author: string;
    lastUpdated: string;
  };

  technical: {
    architecture: string;
    dependencies: string[];
    limitations: string[];
    performance: string[];
  };

  usage: {
    setup: string[];
    examples: string[];
    troubleshooting: string[];
  };

  maintenance: {
    updates: string[];
    migrations: string[];
    deprecations: string[];
  };
}
``` 

## 11. Headless Component Set Patterns

### 11.1 Base Component Manager
```typescript
class ComponentManager<V extends BaseVariantProps, P extends BaseProps> {
  protected static instance: ComponentManager;
  protected componentSet: ComponentSetNode | null = null;
  protected variantMap = new Map<string, ComponentNode>();

  // Singleton pattern
  protected constructor() {}
  static getInstance(): ComponentManager;

  // Core methods
  protected abstract getVariantKey(variant: V): string;
  protected abstract createComponent(variant: V): Promise<ComponentNode>;
  protected abstract setupBaseLayout(node: ComponentNode, variant: V): Promise<void>;
  protected abstract applyStyle(node: ComponentNode, variant: V): Promise<void>;
}
```

### 11.2 Section Management
```typescript
interface SectionManager<V extends BaseVariantProps, P extends BaseProps> {
  // Core methods
  createComponent(variant: V): Promise<ComponentNode>;
  createInstance(props: P): Promise<InstanceNode>;
  updateInstance(instance: InstanceNode, props: P): Promise<void>;
  
  // Layout methods
  setupBaseLayout(node: ComponentNode, variant: V): Promise<void>;
  applyStyle(node: ComponentNode, variant: V): Promise<void>;
  
  // Utility methods
  getVariantKey(variant: V): string;
  findNodeByRole(component: ComponentNode | InstanceNode, role: string): SceneNode | null;
}

// Example section manager implementation
class CardSectionManager implements SectionManager<CardSectionVariantProps, CardSectionProps> {
  private static instance: CardSectionManager;
  private componentSet: ComponentSetNode | null = null;
  private variantMap = new Map<string, ComponentNode>();
  
  protected constructor() {}
  static getInstance(): CardSectionManager;
}
```

### 11.3 Component Set Organization
```typescript
interface ComponentSetStructure {
  // Component set configuration
  name: string;
  sections: string[];
  roles: Record<string, string>;
  
  // Layout configuration
  layout: {
    mode: "HORIZONTAL" | "VERTICAL";
    wrap: boolean;
    spacing: number;
    padding: number;
  };
  
  // Section configuration
  sectionManagers: {
    header?: SectionManager;
    content?: SectionManager;
    media?: SectionManager;
    footer?: SectionManager;
  };
}

// Example component set setup
class CompositeComponentSet {
  protected setupComponentSetLayout(componentSet: ComponentSetNode) {
    componentSet.name = this.name;
    componentSet.layoutMode = this.layout.mode;
    componentSet.layoutWrap = this.layout.wrap;
    componentSet.itemSpacing = this.layout.spacing;
    componentSet.counterAxisSpacing = this.layout.spacing;
    componentSet.paddingLeft = componentSet.paddingRight = this.layout.padding;
    componentSet.paddingTop = componentSet.paddingBottom = this.layout.padding;
    componentSet.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  }
}
```

### 11.4 Variant System
```typescript
interface VariantSystem<V extends BaseVariantProps> {
  // Variant registration
  variants: V[];
  defaultVariant: V;
  
  // Variant methods
  createVariants(): Promise<ComponentNode[]>;
  combineVariants(components: ComponentNode[]): Promise<ComponentSetNode>;
  
  // Variant utilities
  getVariantFromProps(props: Partial<V>): V;
  getVariantKey(variant: V): string;
}

// Example variant configuration
const COMPONENT_VARIANTS: CardVariantProps[] = [
  // Base variants
  {
    size: 'medium',
    variant: 'filled',
    content: { withDescription: true }
  },
  
  // Section combinations
  {
    size: 'medium',
    variant: 'filled',
    header: {},
    content: { withDescription: true },
    footer: { withActions: true }
  }
];
```

### 11.5 Instance Management
```typescript
interface InstanceSystem<V extends BaseVariantProps, P extends BaseProps> {
  // Instance creation
  createInstance(variant: V, props?: P): Promise<InstanceNode>;
  updateInstance(instance: InstanceNode, props: P): Promise<void>;
  
  // Section handling
  setupSection(instance: InstanceNode, section: string, props: any): Promise<void>;
  updateSection(instance: InstanceNode, section: string, props: any): Promise<void>;
  
  // Utility methods
  findNodeByRole(instance: InstanceNode, role: string): SceneNode | null;
}

// Example instance handling
class ComponentInstanceManager {
  async createInstance(variant: V, props: P = {}) {
    const componentSet = await this.getComponentSet();
    if (!componentSet) return null;

    const variantKey = this.getVariantKey(variant);
    const targetVariant = this.variantMap.get(variantKey);
    
    if (!targetVariant) return null;

    const instance = targetVariant.createInstance();
    await this.updateInstance(instance, props);
    
    return instance;
  }
}
```

### 11.6 Style Management
```typescript
interface StyleSystem {
  // Style definitions
  styles: Record<string, ComponentStyle>;
  tokens: Record<string, string>;
  
  // Style application
  applyStyle(node: ComponentNode, variant: V): Promise<void>;
  applyBackground(node: ComponentNode, style: ComponentStyle, state: string): void;
  applyBorder(node: ComponentNode, style: ComponentStyle, state: string): void;
  
  // Token binding
  bindVariable(token: string): Paint;
  setBindVariable(node: SceneNode, property: string, token: string): void;
}

// Example style application
class StyleManager {
  async applyStyle(node: ComponentNode, variant: V) {
    const style = this.styles[variant.variant || 'filled'];
    const state = variant.disabled ? 'disabled' : 'default';

    // Apply background
    node.fills = [this.bindVariable(style.background[state])];
    
    // Apply border
    if (variant.variant === 'outlined') {
      node.strokes = [this.bindVariable(style.border[state])];
      this.setBindVariable(node, 'strokeWeight', 'border/width/default');
    }
  }
}
```

### 11.7 Implementation Example
```typescript
// Example Card component implementation
class CardManager extends ComponentManager<CardVariantProps, CardProps> {
  private headerManager = CardHeaderManager.getInstance();
  private contentManager = CardContentManager.getInstance();
  private mediaManager = CardMediaManager.getInstance();
  private footerManager = CardFooterManager.getInstance();

  async createComponent(variant: CardVariantProps): Promise<ComponentNode> {
    const card = figma.createComponent();
    const size = CARD_SIZES[variant.size || 'medium'];
    
    // Setup base structure
    card.name = this.getVariantKey(variant);
    await this.setupBaseLayout(card, size);
    
    // Create sections container
    const sectionsContainer = await this.createSectionsContainer(size);
    card.appendChild(sectionsContainer);
    
    // Add sections based on variant
    if (variant.header) {
      const header = await this.headerManager.createInstance(variant.header);
      if (header) sectionsContainer.appendChild(header);
    }
    
    if (variant.media) {
      const media = await this.mediaManager.createInstance(variant.media);
      if (media) sectionsContainer.appendChild(media);
    }
    
    // Apply styles
    await this.applyStyle(card, variant);
    
    return card;
  }

  async createInstance(variant: CardVariantProps, props: CardProps = {}) {
    const componentSet = await this.getComponentSet();
    if (!componentSet) return null;

    const variantKey = this.getVariantKey(variant);
    const instance = this.variantMap.get(variantKey)?.createInstance();
    
    if (instance) {
      await this.updateInstance(instance, props);
    }
    
    return instance;
  }
}
```

### 11.8 Usage Example
```typescript
// Using the Card component
const cardManager = CardManager.getInstance();

// Create component set
await cardManager.createComponentSet();

// Create instance
const cardInstance = await cardManager.createInstance(
  {
    size: 'medium',
    variant: 'filled',
    header: {
      withTitle: true,
      withSubtitle: true
    },
    content: {
      withDescription: true
    },
    footer: {
      withActions: true
    }
  },
  {
    header: {
      title: 'Card Title',
      subtitle: 'Card Subtitle'
    },
    content: {
      description: 'Card content goes here'
    },
    footer: {
      actions: ['Cancel', 'Submit']
    }
  }
);
``` 

## 12. Figma Code Snippets

### 12.1 Layout Management
```typescript
// Auto Layout Setup
function setupAutoLayout(node: FrameNode) {
  node.layoutMode = "VERTICAL";
  node.primaryAxisSizingMode = "AUTO";
  node.counterAxisSizingMode = "AUTO";
  node.primaryAxisAlignItems = "CENTER";
  node.counterAxisAlignItems = "CENTER";
  node.itemSpacing = 10;
}

// Responsive Layout
function makeResponsive(node: FrameNode) {
  node.layoutSizingHorizontal = "FILL";
  node.layoutSizingVertical = "HUG";
  node.minWidth = 200;
  node.maxWidth = 800;
  node.clipsContent = false;
}

// Grid Layout
function setupGrid(node: FrameNode) {
  const grid = figma.createFrame();
  grid.layoutMode = "HORIZONTAL";
  grid.layoutWrap = "WRAP";
  grid.itemSpacing = 16;
  grid.counterAxisSpacing = 16;
  grid.paddingLeft = grid.paddingRight = 16;
  grid.paddingTop = grid.paddingBottom = 16;
  return grid;
}
```

### 12.2 Style Management
```typescript
// Apply Variable Styles
function applyVariableStyles(node: SceneNode) {
  // Background color
  node.fills = [{
    type: "SOLID",
    color: variables.bindVariable("surface/color/default")
  }];

  // Border
  node.strokes = [{
    type: "SOLID",
    color: variables.bindVariable("border/color/default")
  }];

  // Effects (shadows)
  node.effects = [{
    type: "DROP_SHADOW",
    color: { r: 0, g: 0, b: 0, a: 0.1 },
    offset: { x: 0, y: 2 },
    radius: 4,
    visible: true
  }];
}

// State-based Styles
function applyStateStyles(node: SceneNode, state: string) {
  const styles = {
    default: {
      background: "surface/color/default",
      border: "border/color/default"
    },
    hover: {
      background: "surface/color/hover",
      border: "border/color/hover"
    },
    pressed: {
      background: "surface/color/pressed",
      border: "border/color/pressed"
    }
  };

  const currentStyle = styles[state];
  node.fills = [variables.bindVariable(currentStyle.background)];
  node.strokes = [variables.bindVariable(currentStyle.border)];
}
```

### 12.3 Component Utilities
```typescript
// Find Node by Role
function findNodeByRole(root: SceneNode, role: string): SceneNode | null {
  if (root.getPluginData('role') === role) return root;
  if ('children' in root) {
    for (const child of root.children) {
      const found = findNodeByRole(child, role);
      if (found) return found;
    }
  }
  return null;
}

// Create Text Node with Styles
async function createStyledText(options: {
  text: string;
  fontSize: number;
  color: string;
  weight?: number;
}) {
  const text = figma.createText();
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  text.characters = options.text;
  text.fontSize = options.fontSize;
  text.fills = [variables.bindVariable(options.color)];
  return text;
}

// Create Icon Container
function createIconContainer(size: number) {
  const container = figma.createFrame();
  container.resize(size, size);
  container.layoutMode = "HORIZONTAL";
  container.primaryAxisAlignItems = "CENTER";
  container.counterAxisAlignItems = "CENTER";
  container.fills = [];
  return container;
}
```

### 12.4 Event Handling
```typescript
// Add Interactive States
function makeInteractive(node: SceneNode) {
  node.setRelaunchData({
    hover: 'Hover state',
    pressed: 'Pressed state',
    focused: 'Focus state'
  });
}

// Setup Component Properties
function setupProperties(component: ComponentNode) {
  component.componentPropertyDefinitions = {
    variant: {
      type: "VARIANT",
      defaultValue: "default",
      options: ["default", "primary", "secondary"]
    },
    disabled: {
      type: "BOOLEAN",
      defaultValue: false
    },
    size: {
      type: "INSTANCE_SWAP",
      defaultValue: "medium",
      options: ["small", "medium", "large"]
    }
  };
}
```

### 12.5 Performance Optimization
```typescript
// Component Instance Pooling
class InstancePool {
  private pool: Map<string, InstanceNode[]> = new Map();
  private maxSize = 50;

  acquire(key: string): InstanceNode | null {
    const instances = this.pool.get(key) || [];
    return instances.pop() || null;
  }

  release(key: string, instance: InstanceNode) {
    if (!this.pool.has(key)) {
      this.pool.set(key, []);
    }
    if (this.pool.get(key).length < this.maxSize) {
      this.pool.get(key).push(instance);
    }
  }
}

// Batch Updates
async function batchUpdate(nodes: SceneNode[], updates: any[]) {
  figma.skipInvisibleInstanceChildren = true;
  
  const batches = chunk(nodes, 100);
  for (const batch of batches) {
    await Promise.all(batch.map((node, i) => updateNode(node, updates[i])));
    await new Promise(resolve => setTimeout(resolve, 16));
  }
}
```

### 12.6 Debug Utilities
```typescript
// Visual Debug Helper
function debugLayout(node: FrameNode) {
  node.fills = [{
    type: "SOLID",
    color: { r: 1, g: 0, b: 0 },
    opacity: 0.1
  }];
  node.strokes = [{
    type: "SOLID",
    color: { r: 1, g: 0, b: 0 },
    opacity: 0.5
  }];
  node.strokeWidth = 1;
}

// Performance Monitoring
class PerformanceMonitor {
  private static timers = new Map<string, number>();

  static start(label: string) {
    this.timers.set(label, Date.now());
  }

  static end(label: string) {
    const start = this.timers.get(label);
    if (start) {
      const duration = Date.now() - start;
      console.log(`${label}: ${duration}ms`);
      this.timers.delete(label);
    }
  }
}
```

### 12.7 Token Management
```typescript
// Token Resolution
function resolveToken(token: string): any {
  const parts = token.split('/');
  let value = tokens;
  for (const part of parts) {
    value = value[part];
  }
  return value;
}

// Token Application
function applyTokens(node: SceneNode, tokenMap: Record<string, string>) {
  for (const [property, token] of Object.entries(tokenMap)) {
    const value = resolveToken(token);
    if (property === 'fill') {
      node.fills = [variables.bindVariable(token)];
    } else if (property === 'stroke') {
      node.strokes = [variables.bindVariable(token)];
    } else {
      variables.setBindVariable(node, property, token);
    }
  }
}
``` 
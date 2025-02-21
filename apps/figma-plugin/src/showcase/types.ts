// showcase/types.ts

export type ShowcaseHandler = 'button' | 'icon' | 'avatar' | 'alert' | 'badge' | 'breadcrumb' | 'button' | 'card' | 'carousel' | 'checkbox' | 'chip' | 'dialog' | 'drawer' | 'dropdown' | 'input' | 'list' | 'menu' | 'modal' | 'pagination' | 'popover' | 'progress' | 'radio' | 'rating' | 'select' | 'slider' | 'switch' | 'table' | 'tabs' | 'tag' | 'tooltip' | 'tree' | 'typography';

export type Example<Variants, Props> = {
  handler: ShowcaseHandler,
  variant: Variants,
  customProps?: Props
};

export interface ShowcaseSection<Variants, Props> {
    id: string;
    title: string;
    description?: string;
    guidelines?: Guidelines;
    usage?: Usage;
    examples: Example<Variants, Props>[];
  }

  export interface GuidelinesRule {
    do: string;
    dont: string;
  }

  export interface Guidelines {
    rules: GuidelinesRule[];
  }

  export interface UsageExample {
    title: string;
    description: string;
    code: string;
  }
  
  export interface Usage {
    examples: UsageExample[];
  }
  
  export interface AnatomyPart {
    name: string;
    description: string;
  }
  
  export interface AnatomyComponent {
    name: string;
    type: 'container' | 'icon' | 'text' | 'vector';
    props?: Record<string, any>;
    children?: AnatomyComponent[];
  }
  
  export interface AnatomyImage {
    name: string;
    description: string;
    components: AnatomyComponent[];
  }
  
  export interface Anatomy {
    image: AnatomyImage;
    parts: AnatomyPart[];
  }

  export interface RelatedComponent {
    name: string;
    description: string;
  }


  export interface ShowcaseStructure<Variants, Props> {
    title: string;
    description?: string;
    anatomy?: Anatomy;
    guidelines?: Guidelines;
    usage?: Usage;
    sections: ShowcaseSection<Variants, Props>[];
    relatedComponents?: RelatedComponent[];
  }
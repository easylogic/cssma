// src/core/types/component.ts
export interface ComponentStyle {
    [key: string]: {
      [state: string]: string;
    };
  }
  
  export interface ComponentSize {
    height: string;
    fontSize: string;
    lineHeight: string;
    iconSize?: string;
    spacing?: string;
    padding?: {
      horizontal: string;
      vertical: string;
    };
    borderRadius?: string;
  }
  
  export interface ComponentVariant {
    size?: string;
    type?: string;
    variant?: string;
    state?: string;
    [key: string]: any;
  }
  
  export interface ComponentInstance {
    text?: string;
    icon?: {
      name: string;
      position?: string;
    };
    [key: string]: any;
  }
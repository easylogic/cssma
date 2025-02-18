// Variable value types
export type VariableValue = number | string | { r: number; g: number; b: number; a?: number };

// Variable type mapping to Figma's API
export type VariableResolvedType = "COLOR" | "FLOAT" | "STRING" | "BOOLEAN";

// Collection definition
export interface Collection {
  name: string;
  modes: string[];
  values: {
    [key: string]: {
      [mode: string]: VariableValue;
    };
  };
}

export interface VariableCollection {
  id: string;
  name: string;
  modes: {
    modeId: string;
    name: string;
  }[];
  variables: { [key: string]: Variable };
}

export interface VariableManager {
  collections: { [key: string]: VariableCollection };
  initialize(): Promise<void>;
  getVariable(name: string | number): Variable | number | null;
  bindVariable(name: string): Paint;
  setBindVariable(node: SceneNode, field: VariableBindableNodeField, value: string | number): void;
} 
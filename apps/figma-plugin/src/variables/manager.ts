import { Collection, VariableResolvedType } from './types';
import { PRIMITIVE } from './collections/primitive';
import { COLOR } from './collections/color';
import { SEMANTIC } from './collections/semantic';
import { COMPONENTS } from './collections/components';
import { hexToRGBA } from '@/utils/color';

class VariablesManager {
  private static instance: VariablesManager;
  private collections: { [key: string]: VariableCollection } = {};
  private variables: { [key: string]: Variable } = {};

  private constructor() {}

  static getInstance(): VariablesManager {
    if (!VariablesManager.instance) {
      VariablesManager.instance = new VariablesManager();
    }
    return VariablesManager.instance;
  }

  async createCollection(collection: Collection) {
    console.log(`📦 Creating collection: ${collection.name}`);
    const figmaCollection = figma.variables.createVariableCollection(collection.name);
    
    // Set up modes
    collection.modes.forEach((modeName, index) => {
      // console.log(`  🔄 Setting up mode: ${modeName}`);
      if (index === 0) {
        figmaCollection.renameMode(figmaCollection.modes[0].modeId, modeName);
      } else {
        figmaCollection.addMode(modeName);
      }
    });

    // Create variables
    for (const name in collection.values) {
      // console.log(`  ⚙️ Creating variable: ${name}`);
      const modeValues = collection.values[name];

      const firstValue = modeValues[collection.modes[0]];
      // console.log(`    📊 First value type: ${typeof firstValue}`);
      // console.log(`    📊 First value: ${JSON.stringify(firstValue)}`);

      let resolveType: VariableResolvedType = 'FLOAT';
      let value: VariableValue = 0;

      if (typeof firstValue === 'number') {
        resolveType = 'FLOAT';
        value = firstValue;
        // console.log(`    💡 Resolved as FLOAT: ${value}`);
      } else if (typeof firstValue === 'string') {
        if (firstValue.includes('#')) {
          // console.log(`    💡 Resolved as COLOR: ${firstValue}`);
          resolveType = 'COLOR';
          value = hexToRGBA(firstValue);
          // console.log(`    💡 Resolved as COLOR: `,value);
        } else if (firstValue.includes('{')) {
          const realKey = firstValue.replace('{', '').replace('}', '');
          // console.log(`    🔍 Found reference to: ${realKey}`);
          const variable = this.variables[realKey];
          if (variable) {
            resolveType = variable.resolvedType;
            value = {
              type: 'VARIABLE_ALIAS',
              id: variable.id,
            };
            // console.log(`    🔗 Linked to variable: ${realKey} (${resolveType})`);
          } else {
            resolveType = 'STRING';
            value = firstValue;
            // console.log(`    ⚠️ Reference not found, fallback to STRING`);
          }
        } else {
          resolveType = 'BOOLEAN';
          value = firstValue === 'true';
          // console.log(`    💡 Resolved as BOOLEAN: ${value}`);
        }
      } else if (typeof firstValue === 'boolean') {
        resolveType = 'BOOLEAN';
        value = firstValue;
        // console.log(`    💡 Resolved as BOOLEAN: ${value}`);
      } else if (typeof firstValue === 'object') {
        resolveType = 'COLOR';
        value = firstValue;
        // console.log(`    💡 Resolved as COLOR: ${JSON.stringify(value)}`);
      }

      try {
        // console.log(`    🎯 Creating variable with type: ${resolveType}`, value);
        const variable = figma.variables.createVariable(name, figmaCollection, resolveType);
        
        // Set values for each mode
        for (const modeName in modeValues) {
          let value: VariableValue = modeValues[modeName];

          if (typeof value === 'string') {
            if (value.includes('#')) {
              value = hexToRGBA(value);
            } else if (value.includes('{')) {
              const realKey = value.replace('{', '').replace('}', '');
              value = {
                type: 'VARIABLE_ALIAS',
                id: this.variables[realKey].id,
              };
            }
          }

          const modeId = figmaCollection.modes.find(m => m.name === modeName)?.modeId;
          if (modeId) {
            // console.log(`      ✨ Setting value for mode ${modeName}: ${JSON.stringify(value)}`);
            variable.setValueForMode(modeId, value);
          } else {
            // console.warn(`      ⚠️ Mode ID not found for: ${modeName}`);
          }
        }

        this.variables[name] = variable;
        // console.log(`    ✅ Variable created successfully: ${name}`);
      } catch (error) {
        // console.error(`    ❌ Failed to create variable: ${name}`);
        // console.error(`    Error: ${error.message}`);
      }
    }

    this.collections[collection.name] = figmaCollection;
    console.log(`✅ Collection created successfully: ${collection.name}`);
  }

  async initialize() {
    console.log('🚀 Initializing VariablesManager');
    
    // Remove existing collections
    const existingCollections = figma.variables.getLocalVariableCollections();
    // console.log(`🧹 Removing ${existingCollections.length} existing collections`);
    existingCollections.forEach(collection => {
      // console.log(`  🗑️ Removing collection: ${collection.name}`);
      collection.remove();
    });

    // Create new collections
    console.log('📦 Creating new collections');
    try {
      await this.createCollection(PRIMITIVE);
      await this.createCollection(COLOR);
      await this.createCollection(SEMANTIC);
      await this.createCollection(COMPONENTS);
      console.log('✅ All collections created successfully');
    } catch (error) {
      console.error('❌ Failed to create collections');
      console.error(`Error: ${error.message}`);
    }
  }

  getVariable(name: string | number): Variable | number | null {
    if (typeof name === 'number') {
      return name;
    }
    const variable = this.variables[name];
    if (!variable) {
      console.warn(`⚠️ Variable not found: ${name}`);
    }
    return variable || null;
  }

  setBindVariable(node: SceneNode, field: VariableBindableNodeField | VariableBindableTextField, value: string | number): void {
    console.log(`🔗 Binding variable to ${node.name}.${field}`);
    console.log(`  📊 Value: ${value} (${typeof value})`);

    if (typeof value === 'number' || typeof value === 'boolean') {

      if (field === 'height') {
        (node as FrameNode).resize(value, value);
      } else if (field === 'width') {
        (node as FrameNode).resize(value, value);
      } else {
        node[field] = value;
      }

      console.log(`  ✅ Set ${field} to ${value}`);
      return;
    }

    const variable = this.variables[value];
    console.log(`  🔍 Variable: ${variable.id}`, variable);
    if (!variable) {

      if (typeof value === 'string') {
        node[field] = value;
        console.log(`  ✅ Set ${field} to ${value}`);
        return;
      }

      console.warn(`  ⚠️ Variable not found: ${value}`);
      return;
    }

    try {
      node.setBoundVariable(field, variable);
      console.log(`  ✅ Bound variable successfully`);
    } catch (error) {
      console.error(`  ❌ Failed to bind variable`);
      console.error(`  Error: ${error.message}`, node, field, variable, value);
    }
  }

  bindVariable(name: string): Paint {
    console.log(`🎨 Binding paint variable: ${name}`);
    const variable = this.variables[name];
    if (!variable) {
      console.warn(`  ⚠️ Variable not found: ${name}`);
      // 디버깅을 위한 빨간색 반환
      return { 
        type: 'SOLID', 
        color: { r: 1, g: 0, b: 0 },
        opacity: 0.3 // 반투명하게 설정하여 에러임을 시각적으로 표시
      };
    }

    try {
      const paint = figma.variables.setBoundVariableForPaint(
        { type: 'SOLID', color: { r: 0, g: 0, b: 0 } },
        'color',
        variable
      );
      console.log(`  ✅ Paint bound successfully for: ${name}`);
      return paint;
    } catch (error) {
      console.error(`  ❌ Failed to bind paint variable: ${name}`);
      console.error(`  Error: ${error.message}`);
      // 바인딩 실패 시 노란색 반환
      return { 
        type: 'SOLID', 
        color: { r: 1, g: 1, b: 0 },
        opacity: 0.3 // 반투명하게 설정하여 에러임을 시각적으로 표시
      };
    }
  }
}

export const variables = VariablesManager.getInstance(); 
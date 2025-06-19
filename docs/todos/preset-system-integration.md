# CSSMA Preset System Integration

## 🎯 Overview

Integrate the CSSMA preset system into existing parsers and bridge system to provide standardized design tokens and seamless Tailwind compatibility.

## 📊 Priority: High
**Roadmap Reference**: [Phase 2: Design Token Integration](../ROADMAP.md#design-token-integration)

## 🔗 Dependencies
- Bridge System (can be developed in parallel)
- Animation System (already completed, needs preset integration)

## ⏱️ Effort Estimation
- **Total**: 3-4 days
- **Complexity**: Medium
- **Risk Level**: Low

## 🎯 Success Criteria

### Functional Requirements
- [ ] Replace hardcoded tokens in existing parsers with preset system
- [ ] Support all 4 built-in presets (@cssma/preset-tailwind-v3, v4, minimal, figma-optimized)
- [ ] Enable custom preset loading and extension
- [ ] Integrate with Bridge System for Figma sync
- [ ] Backward compatibility with existing code

### Quality Requirements
- [ ] 95%+ test coverage for preset loading
- [ ] Performance: Preset loading < 100ms
- [ ] TypeScript strict mode compliance
- [ ] Zero breaking changes to existing APIs

## 📋 Implementation Plan

### Phase 1: Parser Integration (1-2 days)
**Files to modify**: 
- `packages/cssma/src/parser/class-names/spacing.ts`
- `packages/cssma/src/parser/class-names/background.ts`
- `packages/cssma/src/config/tokens.ts`

#### Step 1.1: Replace Hardcoded Tokens
```typescript
// Before (hardcoded)
const SPACING_MAP = {
  "0": 0, "1": 4, "2": 8, "3": 12, "4": 16
};

// After (preset-based)
import { presetLoader } from '../config/preset-loader';

export class SpacingParser {
  private spacingTokens: Record<string, number>;
  
  async initialize(presetConfig: CSSMAConfig) {
    const preset = await presetLoader.loadConfig(presetConfig);
    this.spacingTokens = preset.spacing || {};
  }
  
  parseClassName(className: string): ParsedClassName | null {
    // Use this.spacingTokens instead of hardcoded SPACING_MAP
  }
}
```

#### Step 1.2: Update Parser Factory
```typescript
// packages/cssma/src/parser/index.ts
export class CSSMAParser {
  private preset: CSSMAPreset;
  
  async initialize(config: CSSMAConfig = {}) {
    // Default to Tailwind v3 if no preset specified
    const defaultConfig = {
      preset: '@cssma/preset-tailwind-v3',
      ...config
    };
    
    this.preset = await presetLoader.loadConfig(defaultConfig);
    
    // Initialize all parsers with preset data
    await this.spacingParser.initialize(this.preset);
    await this.colorParser.initialize(this.preset);
    // ... other parsers
  }
}
```

### Phase 2: Bridge System Integration (1 day)
**Files to create/modify**:
- `packages/cssma/src/bridge/preset-bridge.ts`
- `packages/cssma/src/bridge/tailwind-parser.ts` (modify)

#### Step 2.1: Preset-to-Tailwind Bridge
```typescript
// packages/cssma/src/bridge/preset-bridge.ts
export class PresetTailwindBridge {
  /**
   * Convert CSSMA preset to Tailwind config format
   */
  async convertPresetToTailwind(presetConfig: CSSMAConfig): Promise<TailwindConfig> {
    const preset = await presetLoader.loadConfig(presetConfig);
    return presetLoader.toTailwindConfig(preset);
  }
  
  /**
   * Convert Tailwind config to CSSMA preset format
   */
  convertTailwindToPreset(tailwindConfig: TailwindConfig): CSSMAPreset {
    return {
      colors: this.extractColors(tailwindConfig.theme?.colors),
      spacing: this.extractSpacing(tailwindConfig.theme?.spacing),
      typography: this.extractTypography(tailwindConfig.theme),
    };
  }
}
```

#### Step 2.2: Bridge System Update
```typescript
// packages/cssma/src/bridge/tailwind-parser.ts (modify existing)
import { PresetTailwindBridge } from './preset-bridge';

export class TailwindConfigParser {
  private presetBridge = new PresetTailwindBridge();
  
  async parseConfig(config: TailwindConfig): Promise<ParseResult> {
    // Convert Tailwind config to CSSMA preset first
    const preset = this.presetBridge.convertTailwindToPreset(config);
    
    // Then use preset system for consistent parsing
    return this.parseFromPreset(preset);
  }
}
```

### Phase 3: Configuration System (1 day)
**Files to create**:
- `packages/cssma/cssma.config.js` (example)
- `packages/cssma/src/config/config-loader.ts`

#### Step 3.1: Configuration File Support
```typescript
// packages/cssma/src/config/config-loader.ts
export class ConfigLoader {
  async loadFromFile(configPath?: string): Promise<CSSMAConfig> {
    const defaultPaths = [
      'cssma.config.js',
      'cssma.config.ts',
      'cssma.config.json'
    ];
    
    const configFile = configPath || this.findConfigFile(defaultPaths);
    
    if (configFile) {
      return await import(configFile);
    }
    
    // Default configuration
    return {
      preset: '@cssma/preset-tailwind-v3'
    };
  }
}
```

#### Step 3.2: Example Configuration Files
```javascript
// packages/cssma/cssma.config.js (example)
module.exports = {
  preset: '@cssma/preset-tailwind-v3',
  extend: {
    colors: {
      'brand-primary': { r: 0.2, g: 0.4, b: 1.0 },
      'brand-secondary': { r: 0.8, g: 0.2, b: 0.4 }
    },
    spacing: {
      '18': 72, // 18 * 4px = 72px
      '22': 88  // 22 * 4px = 88px
    }
  }
};
```

### Phase 4: Testing & Documentation (1 day)
**Files to create**:
- `packages/cssma/tests/config/preset-integration.test.ts`
- `docs/guides/preset-configuration.md`

## 🧪 Testing Strategy

### Integration Tests
```typescript
describe('Preset System Integration', () => {
  describe('Parser Integration', () => {
    it('should use preset tokens in spacing parser', async () => {
      const parser = new CSSMAParser();
      await parser.initialize({
        preset: '@cssma/preset-figma-optimized'
      });
      
      const result = parser.parseClassName('p-1');
      expect(result.value).toBe(8); // Figma preset: 1 = 8px
    });
    
    it('should support custom preset extension', async () => {
      const parser = new CSSMAParser();
      await parser.initialize({
        preset: '@cssma/preset-minimal',
        extend: {
          spacing: { 'custom': 42 }
        }
      });
      
      const result = parser.parseClassName('p-custom');
      expect(result.value).toBe(42);
    });
  });
  
  describe('Bridge Integration', () => {
    it('should convert preset to Tailwind config', async () => {
      const bridge = new PresetTailwindBridge();
      const tailwindConfig = await bridge.convertPresetToTailwind({
        preset: '@cssma/preset-tailwind-v3'
      });
      
      expect(tailwindConfig.theme.colors['red-500']).toBeDefined();
    });
  });
});
```

## 🔧 Migration Guide

### For Existing Users
```typescript
// Before (v0.2.x)
import { parseClassName } from 'cssma';
const result = parseClassName('p-4'); // Uses hardcoded tokens

// After (v0.3.x) - Backward compatible
import { parseClassName } from 'cssma';
const result = parseClassName('p-4'); // Uses Tailwind v3 preset by default

// After (v0.3.x) - With custom preset
import { CSSMAParser } from 'cssma';
const parser = new CSSMAParser();
await parser.initialize({
  preset: '@cssma/preset-figma-optimized'
});
const result = parser.parseClassName('p-1'); // Uses 8px instead of 4px
```

### Configuration Migration
```javascript
// Create cssma.config.js for custom settings
module.exports = {
  // Use Tailwind v3 preset for full compatibility
  preset: '@cssma/preset-tailwind-v3',
  
  // Or use Figma-optimized preset for better Figma integration
  // preset: '@cssma/preset-figma-optimized',
  
  // Extend with custom tokens
  extend: {
    colors: {
      'brand': { r: 0.2, g: 0.4, b: 1.0 }
    }
  }
};
```

## 🎯 Immediate Next Steps

### Day 1: Parser Integration
1. **Morning**: Modify spacing parser to use preset system
2. **Afternoon**: Update color and background parsers

### Day 2: Bridge Integration  
1. **Morning**: Create preset-bridge.ts
2. **Afternoon**: Integrate with existing bridge system

### Day 3: Configuration System
1. **Morning**: Implement config file loading
2. **Afternoon**: Create example configurations

### Day 4: Testing & Polish
1. **Morning**: Write comprehensive tests
2. **Afternoon**: Documentation and examples

## 📊 Success Metrics

- [ ] All existing tests pass with preset system
- [ ] New preset-based tests achieve 95% coverage
- [ ] Performance: Preset loading < 100ms
- [ ] Zero breaking changes to public APIs
- [ ] Documentation covers all preset usage patterns

## 🔗 Related Issues

This integrates with:
- Bridge System TODO (bridge-system.md)
- Animation System (already completed)
- Future Component Library development

## 📚 Documentation Updates

- [ ] Update main README with preset configuration
- [ ] Create preset configuration guide
- [ ] Add migration guide for existing users
- [ ] Update API documentation with preset examples 
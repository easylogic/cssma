import { describe, it, expect } from "vitest";
import { loadConfig, loadPreset, mergeConfigs } from '../src/config';

describe('Config Module', () => {
  describe('loadConfig', () => {
    it('should load default configuration', () => {
      const config = loadConfig();
      expect(config).toBeDefined();
      expect(config.prefix).toBe('');
      expect(config.separator).toBe(':');
      expect(config.important).toBe(false);
    });

    it('should merge custom configuration with defaults', () => {
      const customConfig = { prefix: 'tw-', important: true };
      const config = loadConfig(customConfig);
      expect(config.prefix).toBe('tw-');
      expect(config.separator).toBe(':'); // Default value preserved
      expect(config.important).toBe(true); // Custom value applied
    });
  });

  describe('loadPreset', () => {
    it('should load default preset', () => {
      const preset = loadPreset();
      expect(preset).toBeDefined();
      expect(preset.name).toBeDefined();
      expect(preset.colors).toBeDefined();
      expect(preset.spacing).toBeDefined();
      expect(preset.typography).toBeDefined();
      expect(preset.layout).toBeDefined();
      expect(preset.effects).toBeDefined();
      expect(preset.animation).toBeDefined();
    });

    it('should load a named preset if specified', () => {
      const preset = loadPreset('minimal');
      expect(preset).toBeDefined();
      expect(preset.name).toBe('minimal');
    });

    it('should merge custom preset with defaults', () => {
      const customPreset = {
        name: 'custom',
        colors: {
          primary: { r: 0.1, g: 0.2, b: 0.8 },
        },
      };
      const preset = loadPreset(customPreset);
      expect(preset.name).toBe('custom');
      expect(preset.colors.primary).toEqual({ r: 0.1, g: 0.2, b: 0.8 });
      // Default categories should still be present
      expect(preset.spacing).toBeDefined();
      expect(preset.typography).toBeDefined();
    });
  });

  describe('mergeConfigs', () => {
    it('should merge configurations correctly', () => {
      const defaultConfig = { a: 1, b: 2, c: { d: 3, e: 4 } };
      const customConfig = { b: 5, c: { d: 6 } };
      const result = mergeConfigs(defaultConfig, customConfig);
      
      expect(result).toEqual({
        a: 1,
        b: 5,
        c: { d: 6, e: 4 },
      });
    });

    it('should handle undefined custom config', () => {
      const defaultConfig = { a: 1, b: 2 };
      const result = mergeConfigs(defaultConfig, undefined);
      expect(result).toEqual(defaultConfig);
    });

    it('should handle arrays correctly', () => {
      const defaultConfig = { arr: [1, 2, 3] };
      const customConfig = { arr: [4, 5] };
      const result = mergeConfigs(defaultConfig, customConfig);
      expect(result.arr).toEqual([4, 5]);
    });
  });
});

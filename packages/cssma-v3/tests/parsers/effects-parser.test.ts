describe('text-shadow utilities', () => {
  test('should apply text-shadow styles', () => {
    const styles: any = {};
    
    EffectsParser.applyEffectStyle({ property: 'text-shadow', value: 'sm', isArbitrary: false }, styles, mockPreset);
    expect(styles.effects.textShadow).toBe('0 1px 2px rgba(0, 0, 0, 0.05)');

    // Reset
    styles.effects = {};
    EffectsParser.applyEffectStyle({ property: 'text-shadow', value: '', isArbitrary: false }, styles, mockPreset);
    expect(styles.effects.textShadow).toBe('0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)');

    // Reset
    styles.effects = {};
    EffectsParser.applyEffectStyle({ property: 'text-shadow', value: 'md', isArbitrary: false }, styles, mockPreset);
    expect(styles.effects.textShadow).toBe('0 4px 8px rgba(0, 0, 0, 0.12), 0 2px 4px rgba(0, 0, 0, 0.08)');

    // Reset
    styles.effects = {};
    EffectsParser.applyEffectStyle({ property: 'text-shadow', value: 'lg', isArbitrary: false }, styles, mockPreset);
    expect(styles.effects.textShadow).toBe('0 15px 35px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07)');

    // Reset
    styles.effects = {};
    EffectsParser.applyEffectStyle({ property: 'text-shadow', value: 'xl', isArbitrary: false }, styles, mockPreset);
    expect(styles.effects.textShadow).toBe('0 20px 40px rgba(0, 0, 0, 0.1)');

    // Reset
    styles.effects = {};
    EffectsParser.applyEffectStyle({ property: 'text-shadow', value: '2xl', isArbitrary: false }, styles, mockPreset);
    expect(styles.effects.textShadow).toBe('0 25px 50px rgba(0, 0, 0, 0.25)');

    // Reset
    styles.effects = {};
    EffectsParser.applyEffectStyle({ property: 'text-shadow', value: 'none', isArbitrary: false }, styles, mockPreset);
    expect(styles.effects.textShadow).toBe('none');
  });

  test('should apply arbitrary text-shadow values', () => {
    const styles: any = {};
    
    EffectsParser.applyEffectStyle({ 
      property: 'text-shadow', 
      value: '2px 2px 4px rgba(0,0,0,0.5)', 
      isArbitrary: true 
    }, styles, mockPreset);
    expect(styles.effects.textShadow).toBe('2px 2px 4px rgba(0,0,0,0.5)');
  });
}); 
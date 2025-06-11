/**
 * Global style registry to prevent duplicate style injection
 */
class StyleRegistry {
  private injectedStyles = new Set<string>();
  private styleElements = new Map<string, HTMLStyleElement>();

  /**
   * Check if style is already injected
   */
  hasStyle(hash: string): boolean {
    return this.injectedStyles.has(hash);
  }

  /**
   * Inject style into document head
   */
  injectStyle(hash: string, styleContent: string): void {
    if (this.hasStyle(hash)) {
      return; // Already injected
    }

    if (typeof document === 'undefined') {
      // SSR environment - skip injection
      return;
    }

    try {
      const styleElement = document.createElement('style');
      styleElement.setAttribute('data-cssma-hash', hash);
      styleElement.textContent = styleContent;
      
      document.head.appendChild(styleElement);
      
      this.injectedStyles.add(hash);
      this.styleElements.set(hash, styleElement);
    } catch (error) {
      console.error('Failed to inject style:', error);
    }
  }

  /**
   * Remove style from document
   */
  removeStyle(hash: string): void {
    if (!this.hasStyle(hash)) {
      return;
    }

    const styleElement = this.styleElements.get(hash);
    if (styleElement && styleElement.parentNode) {
      styleElement.parentNode.removeChild(styleElement);
    }

    this.injectedStyles.delete(hash);
    this.styleElements.delete(hash);
  }

  /**
   * Clear all injected styles
   */
  clearAll(): void {
    this.styleElements.forEach((element) => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });

    this.injectedStyles.clear();
    this.styleElements.clear();
  }

  /**
   * Get all injected style hashes
   */
  getInjectedHashes(): string[] {
    return Array.from(this.injectedStyles);
  }

  /**
   * Get total number of injected styles
   */
  getStyleCount(): number {
    return this.injectedStyles.size;
  }
}

// Global singleton instance
const globalStyleRegistry = new StyleRegistry();

/**
 * Inject dynamic style into document head
 * @param hash Unique hash for the style
 * @param styleContent CSS content to inject
 */
export function injectDynamicStyle(hash: string, styleContent: string): void {
  globalStyleRegistry.injectStyle(hash, styleContent);
}

/**
 * Check if a style is already injected
 * @param hash Style hash to check
 */
export function hasInjectedStyle(hash: string): boolean {
  return globalStyleRegistry.hasStyle(hash);
}

/**
 * Remove a specific injected style
 * @param hash Style hash to remove
 */
export function removeDynamicStyle(hash: string): void {
  globalStyleRegistry.removeStyle(hash);
}

/**
 * Clear all injected dynamic styles
 */
export function clearAllDynamicStyles(): void {
  globalStyleRegistry.clearAll();
}

/**
 * Get statistics about injected styles
 */
export function getStyleStats(): {
  count: number;
  hashes: string[];
} {
  return {
    count: globalStyleRegistry.getStyleCount(),
    hashes: globalStyleRegistry.getInjectedHashes()
  };
}

/**
 * Batch inject multiple styles
 * @param styles Array of style objects with hash and content
 */
export function batchInjectStyles(styles: Array<{ hash: string; content: string }>): void {
  styles.forEach(({ hash, content }) => {
    globalStyleRegistry.injectStyle(hash, content);
  });
}

/**
 * Create a scoped style injector for a specific component or context
 */
export function createScopedStyleInjector(scope: string) {
  const scopedHashes = new Set<string>();

  return {
    inject(hash: string, styleContent: string): void {
      const scopedHash = `${scope}-${hash}`;
      globalStyleRegistry.injectStyle(scopedHash, styleContent);
      scopedHashes.add(scopedHash);
    },

    cleanup(): void {
      scopedHashes.forEach((hash) => {
        globalStyleRegistry.removeStyle(hash);
      });
      scopedHashes.clear();
    },

    getHashes(): string[] {
      return Array.from(scopedHashes);
    }
  };
} 
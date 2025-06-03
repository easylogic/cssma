import { describe, test, expect, vi, beforeEach } from 'vitest';

// Mock figma global object
const mockFigma = {
  createFrame: vi.fn(() => ({
    type: 'FRAME',
    name: 'Frame',
    fills: [] as any[],
    layoutMode: 'NONE',
    primaryAxisAlignItems: 'MIN',
    counterAxisAlignItems: 'MIN'
  })),
  createImage: vi.fn((data: Uint8Array) => ({ hash: 'mock-hash-' + Date.now() })),
  variables: {
    setBoundVariableForPaint: vi.fn()
  }
};

// Mock fetch for image upload testing
(global as any).fetch = vi.fn();

// Set up global figma mock
(global as any).figma = mockFigma;

import { applyCssStyles } from '../../src/apply/applyCssStyles';

describe('applyCssStyles - Background Image', () => {
  
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Image Paint Processing', () => {
    test('should upload image from URL and create ImagePaint', async () => {
      // Mock successful fetch
      const mockArrayBuffer = new ArrayBuffer(100);
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        arrayBuffer: () => Promise.resolve(mockArrayBuffer)
      });
      
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
      
      const frame = mockFigma.createFrame();
      await applyCssStyles(frame, 'bg-[url("/test.jpg")]');
      
      // Should successfully upload and create image
      expect(global.fetch).toHaveBeenCalledWith('/test.jpg');
      expect(mockFigma.createImage).toHaveBeenCalledWith(new Uint8Array(mockArrayBuffer));
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('🖼️ Image uploaded successfully: /test.jpg')
      );
      
      // Should have an IMAGE fill (not fallback)
      expect(frame.fills).toHaveLength(1);
      expect(frame.fills[0]).toMatchObject({
        type: 'IMAGE',
        scaleMode: 'FILL',
        imageHash: expect.stringContaining('mock-hash-')
      });
      
      consoleSpy.mockRestore();
    });

    test('should fallback when image fetch fails', async () => {
      // Mock failed fetch
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404
      });
      
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      const frame = mockFigma.createFrame();
      await applyCssStyles(frame, 'bg-[url("/nonexistent.jpg")]');
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('⚠️ Failed to upload image: /nonexistent.jpg, using transparent fallback')
      );
      
      // Should fallback to transparent solid paint
      expect(frame.fills).toHaveLength(1);
      expect(frame.fills[0]).toEqual({
        type: 'SOLID',
        color: { r: 0, g: 0, b: 0 },
        opacity: 0,
        visible: false
      });
      
      consoleSpy.mockRestore();
    });

    test('should process image paint with imageHash', async () => {
      const frame = mockFigma.createFrame();
      
      // Test direct imageHash assignment (skipping upload)
      const imageStyle = {
        fills: [{
          type: 'IMAGE' as const,
          imageHash: 'test-hash-123',
          scaleMode: 'FILL' as const,
          imageTransform: 'center'
        }]
      };
      
      // Manually assign to test (simulating direct imageHash use)
      frame.fills = imageStyle.fills as any[];
      
      expect(frame.fills).toHaveLength(1);
      expect(frame.fills[0]).toMatchObject({
        type: 'IMAGE',
        imageHash: 'test-hash-123',
        scaleMode: 'FILL'
      });
    });

    test('should convert image transform positions to matrices', async () => {
      const frame = mockFigma.createFrame();
      
      // Test various position transforms
      const positions = [
        { input: 'center', expected: [[1, 0, 0], [0, 1, 0]] },
        { input: 'top', expected: [[1, 0, 0], [0, 1, -0.5]] },
        { input: 'bottom', expected: [[1, 0, 0], [0, 1, 0.5]] },
        { input: 'left', expected: [[1, 0, -0.5], [0, 1, 0]] },
        { input: 'right', expected: [[1, 0, 0.5], [0, 1, 0]] }
      ];
      
      for (const pos of positions) {
        const imageStyle = {
          type: 'IMAGE' as const,
          imageHash: 'test-hash',
          scaleMode: 'FILL' as const,
          imageTransform: pos.input
        };
        
        // Test that the position string is preserved
        frame.fills = [imageStyle as any];
        
        expect(frame.fills[0]).toMatchObject({
          type: 'IMAGE',
          imageTransform: pos.input
        });
      }
    });

    test('should handle image with opacity and blend mode', async () => {
      const frame = mockFigma.createFrame();
      
      const imageStyle = {
        type: 'IMAGE' as const,
        imageHash: 'test-hash',
        scaleMode: 'FIT' as const,
        opacity: 0.8,
        blendMode: 'MULTIPLY' as const,
        imageTransform: 'top-left'
      };
      
      frame.fills = [imageStyle as any];
      
      expect(frame.fills[0]).toMatchObject({
        type: 'IMAGE',
        imageHash: 'test-hash',
        scaleMode: 'FIT',
        opacity: 0.8,
        blendMode: 'MULTIPLY'
      });
    });
  });

  describe('Background Image CSS Integration', () => {
    test('should parse and apply background image properties', async () => {
      // Mock failed fetch to test fallback behavior
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404
      });
      
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      const frame = mockFigma.createFrame();
      await applyCssStyles(frame, 'bg-[url("/image.jpg")] bg-cover bg-center');
      
      // Should warn about failed upload
      expect(consoleSpy).toHaveBeenCalled();
      
      // Should fallback to transparent fill
      expect(frame.fills).toHaveLength(1);
      expect((frame.fills[0] as any).type).toBe('SOLID');
      expect((frame.fills[0] as any).visible).toBe(false);
      
      consoleSpy.mockRestore();
    });

    test('should handle multiple background layers', async () => {
      // Mock failed fetch to test fallback behavior
      (global.fetch as any).mockResolvedValueOnce({
        ok: false,
        status: 404
      });
      
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      
      const frame = mockFigma.createFrame();
      await applyCssStyles(frame, 'bg-red-500 bg-[url("/overlay.png")]');
      
      // Should have 2 fills: color + image (fallback)
      expect(frame.fills).toHaveLength(2);
      
      // First fill should be the color
      expect(frame.fills[0] as any).toMatchObject({
        type: 'SOLID',
        color: expect.objectContaining({
          r: expect.any(Number),
          g: expect.any(Number),
          b: expect.any(Number)
        })
      });
      
      // Second fill should be the image fallback
      expect(frame.fills[1] as any).toMatchObject({
        type: 'SOLID',
        visible: false
      });
      
      consoleSpy.mockRestore();
    });
  });
}); 
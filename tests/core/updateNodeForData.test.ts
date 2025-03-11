import { describe, test, expect, vi, beforeEach } from 'vitest'
import { updateNodeForData } from '../../src/core/updateNodeForData'
import { applyCssStyles } from '../../src/apply/applyStyles'
import { createNodeForData } from '../../src/core/createNodeForData'
import type { NodeType } from '../../src/types/figma'

// Mock dependencies
vi.mock('../../src/apply/applyStyles')
vi.mock('../../src/core/createNodeForData')

// Helper function to create mock nodes
const createMockNode = (type: NodeType, props = {}): SceneNode => ({
  type,
  name: 'test-node',
  visible: true,
  remove: vi.fn(),
  ...props
})

describe('updateNodeForData', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic Property Updates', () => {
    test('should update node name', async () => {
      const node = createMockNode('FRAME')
      await updateNodeForData(node, {
        type: 'FRAME',
        name: 'updated-name'
      })

      expect(node.name).toBe('updated-name')
    })

    test('should apply styles', async () => {
      const node = createMockNode('FRAME')
      const styles = 'color: red;'
      
      await updateNodeForData(node, {
        type: 'FRAME',
        styles
      })

      expect(applyCssStyles).toHaveBeenCalledWith(node, styles)
    })
  })

  describe('Size Updates', () => {
    test('should update both width and height', async () => {
      const resize = vi.fn()
      const node = createMockNode('FRAME', { 
        resize,
        width: 100,
        height: 100
      })

      await updateNodeForData(node, {
        type: 'FRAME',
        props: {
          width: 200,
          height: 300
        }
      })

      expect(resize).toHaveBeenCalledWith(200, 300)
    })

    test('should update only width', async () => {
      const resize = vi.fn()
      const node = createMockNode('FRAME', {
        resize,
        width: 100,
        height: 100
      })

      await updateNodeForData(node, {
        type: 'FRAME',
        props: {
          width: 200
        }
      })

      expect(resize).toHaveBeenCalledWith(200, 100)
    })
  })

  describe('Text Node Updates', () => {
    test('should update text content', async () => {
      const node = createMockNode('TEXT', {
        characters: 'old text'
      }) as TextNode

      await updateNodeForData(node, {
        type: 'TEXT',
        text: 'new text'
      })

      expect(node.characters).toBe('new text')
    })

    test('should not update text if not provided', async () => {
      const node = createMockNode('TEXT', {
        characters: 'old text'
      }) as TextNode

      await updateNodeForData(node, {
        type: 'TEXT'
      })

      expect(node.characters).toBe('old text')
    })
  })

  describe('Instance Node Updates', () => {
    test('should update component properties', async () => {
      const node = createMockNode('INSTANCE', {
        componentProperties: {
          text: { type: 'TEXT', value: 'old value' }
        }
      }) as InstanceNode

      await updateNodeForData(node, {
        type: 'INSTANCE',
        props: {
          componentProperties: {
            text: 'new value'
          }
        }
      })

      expect(node.componentProperties.text.value).toBe('new value')
    })

    test('should ignore invalid component properties', async () => {
      const node = createMockNode('INSTANCE', {
        componentProperties: {
          text: { type: 'TEXT', value: 'old value' }
        }
      }) as InstanceNode

      await updateNodeForData(node, {
        type: 'INSTANCE',
        props: {
          componentProperties: {
            invalid: 'value'
          }
        }
      })

      expect(node.componentProperties.text.value).toBe('old value')
    })
  })

  describe('Children Updates', () => {
    test('should replace children in replace mode', async () => {
      const childNode1 = createMockNode('FRAME')
      const childNode2 = createMockNode('FRAME')
      const insertChild = vi.fn()
      const appendChild = vi.fn()

      const node = createMockNode('FRAME', {
        children: [childNode1, childNode2],
        insertChild,
        appendChild
      }) as FrameNode

      const newChildData = [
        { type: 'FRAME' as const, name: 'new-child-1' },
        { type: 'FRAME' as const, name: 'new-child-2' }
      ]

      vi.mocked(createNodeForData).mockImplementation(
        (data) => Promise.resolve(createMockNode(data.type, { name: data.name }))
      )

      await updateNodeForData(node, {
        type: 'FRAME',
        children: newChildData
      }, {
        updateMode: 'replace'
      })

      expect(childNode1.remove).toHaveBeenCalled()
      expect(childNode2.remove).toHaveBeenCalled()
      expect(createNodeForData).toHaveBeenCalledTimes(2)
    })

    test('should merge children in merge mode', async () => {
      const childNode1 = createMockNode('FRAME')
      const appendChild = vi.fn()

      const node = createMockNode('FRAME', {
        children: [childNode1],
        appendChild
      }) as FrameNode

      const newChildData = [
        { type: 'FRAME' as const, name: 'new-child' }
      ]

      await updateNodeForData(node, {
        type: 'FRAME',
        children: newChildData
      }, {
        updateMode: 'merge'
      })

      expect(childNode1.remove).not.toHaveBeenCalled()
      expect(createNodeForData).toHaveBeenCalledTimes(1)
    })

    test('should hide extra children when preserveChildren is true', async () => {
      const childNode1 = createMockNode('FRAME')
      const childNode2 = createMockNode('FRAME', { visible: true })

      const node = createMockNode('FRAME', {
        children: [childNode1, childNode2]
      }) as FrameNode

      await updateNodeForData(node, {
        type: 'FRAME',
        children: [{ type: 'FRAME' as const, name: 'new-child' }]
      }, {
        preserveChildren: true
      })

      expect(childNode2.visible).toBe(false)
    })
  })

  describe('Error Handling', () => {
    test('should log error and throw on invalid update', async () => {
      const node = createMockNode('FRAME')
      const consoleError = vi.spyOn(console, 'error')

      await expect(updateNodeForData(node, {
        type: 'INVALID_TYPE' as any,
        name: 'test'
      })).rejects.toThrow()

      expect(consoleError).toHaveBeenCalled()
    })

    test('should handle missing properties gracefully', async () => {
      const node = createMockNode('FRAME')

      await expect(updateNodeForData(node, {
        type: 'FRAME'
      })).resolves.not.toThrow()
    })
  })
}) 
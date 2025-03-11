// 1. vi.mock 호출은 최상단에 위치
vi.mock('../../src/apply/applyCssStyles')
vi.mock('../../src/core/createNodeForData')

// 2. imports
import { describe, test, expect, vi, beforeEach } from 'vitest'
import { NodeType, TextNode, InstanceNode, FrameNode, Transform } from '../../src/types/figma'
import { updateNodeForData, updateNodesForDataArray, updateNodeStyles, updateTextContent } from '../../src/core/updateNodeForData'
import { applyCssStyles } from '../../src/apply/applyCssStyles'

// Mock console.warn
const consoleWarnMock = vi.fn()
console.warn = consoleWarnMock

// Helper function to create mock nodes
const createMockNode = (type: NodeType, props = {}): SceneNode & {
  characters: string;
  children: SceneNode[];
} => {
  const baseNode = {
    id: 'test-id',
    type,
    name: 'test-node',
    visible: true,
    locked: false,
    removed: false,
    parent: null,
    toString: () => `[${type} Node]`,
    remove: vi.fn(),
    setRelaunchData: vi.fn(),
    getRelaunchData: vi.fn(),
    setPluginData: vi.fn(),
    getPluginData: vi.fn(),
    setSharedPluginData: vi.fn(),
    getSharedPluginData: vi.fn(),
    clone: vi.fn(),
    exportSettings: [],
    blendMode: 'NORMAL',
    preserveRatio: false,
    constraints: { horizontal: 'MIN', vertical: 'MIN' },
    layoutAlign: 'INHERIT',
    layoutGrow: 0,
    opacity: 1,
    isMask: false,
    effects: [],
    effectStyleId: '',
    expanded: false,
    backgrounds: [],
    backgroundStyleId: '',
    absoluteTransform: [[1, 0, 0], [0, 1, 0]] as Transform,
    width: 100,
    height: 100,
    x: 0,
    y: 0,
    rotation: 0,
    resize: vi.fn(),
    resizeWithoutConstraints: vi.fn(),
    insertChild: vi.fn(),
    ...props
  }

  switch (type) {
    case 'TEXT':
      return {
        ...baseNode,
        type: 'TEXT' as const,
        characters: 'default text',
        hasMissingFont: false,
        textAlignHorizontal: 'LEFT',
        textAlignVertical: 'TOP',
        textAutoResize: 'NONE',
        paragraphIndent: 0,
        paragraphSpacing: 0,
        autoRename: false,
        fontSize: 16,
        fontName: { family: 'Arial', style: 'Regular' },
        textCase: 'ORIGINAL',
        textDecoration: 'NONE',
        letterSpacing: { value: 0, unit: 'PIXELS' },
        lineHeight: { value: 20, unit: 'PIXELS' },
        hyperlink: null,
        getRangeFontSize: vi.fn(),
        setRangeFontSize: vi.fn(),
        getRangeFontName: vi.fn(),
        setRangeFontName: vi.fn(),
        getRangeTextCase: vi.fn(),
        setRangeTextCase: vi.fn(),
        getRangeTextDecoration: vi.fn(),
        setRangeTextDecoration: vi.fn(),
        getRangeLetterSpacing: vi.fn(),
        setRangeLetterSpacing: vi.fn(),
        getRangeLineHeight: vi.fn(),
        setRangeLineHeight: vi.fn(),
        getRangeHyperlink: vi.fn(),
        setRangeHyperlink: vi.fn(),
        getRangeFills: vi.fn(),
        setRangeFills: vi.fn(),
        getRangeTextStyleId: vi.fn(),
        setRangeTextStyleId: vi.fn(),
        getRangeFillStyleId: vi.fn(),
        setRangeFillStyleId: vi.fn(),
        insertCharacters: vi.fn(),
        deleteCharacters: vi.fn(),
        ...props
      } as TextNode

    case 'INSTANCE':
      return {
        ...baseNode,
        type: 'INSTANCE' as const,
        children: [],
        mainComponent: null,
        swapComponent: vi.fn(),
        detachInstance: vi.fn(),
        scaleFactor: 1,
        componentProperties: {},
        exposedInstances: [],
        overrides: [],
        resetOverrides: vi.fn(),
        overflowDirection: 'NONE',
        documentationLinks: [],
        ...props
      } as InstanceNode

    case 'FRAME':
      return {
        ...baseNode,
        type: 'FRAME' as const,
        children: [],
        layoutMode: 'NONE',
        primaryAxisSizingMode: 'FIXED',
        counterAxisSizingMode: 'FIXED',
        primaryAxisAlignItems: 'MIN',
        counterAxisAlignItems: 'MIN',
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        itemSpacing: 0,
        layoutGrids: [],
        gridStyleId: '',
        clipsContent: true,
        guides: [],
        ...props
      } as FrameNode

    default:
      throw new Error(`Unsupported node type: ${type}`)
  }
}

describe('updateNodeForData', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(applyCssStyles).mockClear()
    consoleWarnMock.mockClear()
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
      const styles = 'bg-[#FF0000]'
      
      await updateNodeForData(node, {
        type: 'FRAME',
        styles
      })

      expect(applyCssStyles).toHaveBeenCalledWith(node, styles)
    })

    test('should update multiple properties', async () => {
      const node = createMockNode('FRAME')
      const styles = 'w-[200] h-[300] opacity-[0.5] rotate-[45deg] bg-[#FF0000]'
      
      await updateNodeForData(node, {
        type: 'FRAME',
        name: 'updated-name',
        styles
      })

      // 스타일 적용 검증
      expect(applyCssStyles).toHaveBeenCalledWith(node, styles)
      expect(node.name).toBe('updated-name')
    })
  })

  describe('Text Node Updates', () => {
    test('should update text content', async () => {
      const node = createMockNode('TEXT')
      const newText = 'Updated text content'
      
      await updateNodeForData(node, {
        type: 'TEXT',
        text: newText
      })

      expect(node.characters).toBe(newText)
    })

    test('should update text properties', async () => {
      const node = createMockNode('TEXT')
      const styles = 'font-size-[24px] text-case-[UPPER] text-decoration-[UNDERLINE]'
      await updateNodeForData(node, {
        type: 'TEXT',
        styles,
        text: 'Updated text content'
      })

      expect(applyCssStyles).toHaveBeenCalledWith(node, styles)
      expect(node.characters).toBe('Updated text content')
    })
  })

  describe('Children Updates', () => {
    test('should replace children when updateMode is replace', async () => {
      const node = createMockNode('FRAME')
      const existingChild = createMockNode('TEXT')
      node.children = [existingChild]

      await updateNodeForData(node, {
        type: 'FRAME',
        children: [
          { type: 'TEXT', text: 'New child' }
        ]
      }, { updateMode: 'replace' })

      expect(existingChild.remove).toHaveBeenCalled()
    })

    test('should preserve existing children when preserveChildren is true', async () => {
      const node = createMockNode('FRAME')
      const existingChild = createMockNode('TEXT')
      node.children = [existingChild]

      await updateNodeForData(node, {
        type: 'FRAME',
        children: []
      }, { preserveChildren: true })

      expect(existingChild.remove).not.toHaveBeenCalled()
      expect(existingChild.visible).toBe(false)
    })

    test('should merge new children with existing ones', async () => {
      const node = createMockNode('FRAME')
      const existingChild = createMockNode('TEXT')
      node.children = [existingChild]

      await updateNodeForData(node, {
        type: 'FRAME',
        children: [
          { type: 'TEXT', text: 'New child' }
        ]
      }, { updateMode: 'merge' })

      expect(existingChild.remove).not.toHaveBeenCalled()
      expect(existingChild.visible).toBe(true)
    })
  })

  describe('Error Handling', () => {
    test('should handle missing properties gracefully', async () => {
      const node = createMockNode('FRAME')
      await updateNodeForData(node, {
        type: 'FRAME'
      })

      expect(node.name).toBe('test-node') // name should remain unchanged
    })

    test('should handle type mismatch by maintaining node structure', async () => {
      const node = createMockNode('FRAME')
      const existingChild = createMockNode('TEXT')
      node.children = [existingChild]
      
      // 타입이 다른 데이터로 업데이트 시도
      await updateNodeForData(node, {
        type: 'TEXT',
        text: 'test'
      })

      // 노드의 타입과 구조가 유지되어야 함
      expect(node.type).toBe('FRAME')
      expect(node.children).toContain(existingChild)
      
      // 대신 경고 로그가 출력되어야 함
      expect(consoleWarnMock).toHaveBeenCalledWith(
        expect.stringContaining('Type mismatch: Cannot update FRAME node with TEXT data')
      )
    })

    test('should handle undefined data gracefully', async () => {
      const node = createMockNode('FRAME')
      await updateNodeForData(node, {} as any)
      expect(node.name).toBe('test-node')
    })

    test('should handle null values in data gracefully', async () => {
      const node = createMockNode('FRAME')
      await updateNodeForData(node, {
        type: 'FRAME',
        name: null as any,
        styles: null as any
      })
      expect(node.name).toBe('test-node')
      expect(applyCssStyles).not.toHaveBeenCalled()
    })
  })

  describe('Complex Updates', () => {
    test('should handle nested children updates', async () => {
      const node = createMockNode('FRAME')
      const childFrame = createMockNode('FRAME')
      const grandChild = createMockNode('TEXT')
      childFrame.children = [grandChild]
      node.children = [childFrame]

      await updateNodeForData(node, {
        type: 'FRAME',
        children: [{
          type: 'FRAME',
          children: [{
            type: 'TEXT',
            text: 'Updated grandchild'
          }]
        }]
      })

      expect(grandChild.characters).toBe('Updated grandchild')
    })

    test('should handle multiple styles updates', async () => {
      const node = createMockNode('FRAME')
      
      await updateNodeForData(node, {
        type: 'FRAME',
        styles: 'w-[100] h-[200]'
      })

      await updateNodeForData(node, {
        type: 'FRAME',
        styles: 'bg-[#FF0000]'
      })

      expect(applyCssStyles).toHaveBeenCalledTimes(2)
    })

    test('should handle concurrent updates', async () => {
      const node = createMockNode('FRAME')
      
      await Promise.all([
        updateNodeForData(node, {
          type: 'FRAME',
          styles: 'w-[100]'
        }),
        updateNodeForData(node, {
          type: 'FRAME',
          styles: 'h-[200]'
        })
      ])

      expect(applyCssStyles).toHaveBeenCalledTimes(2)
    })

    test('should handle deep style updates', async () => {
      const node = createMockNode('FRAME')
      const childFrame = createMockNode('FRAME')
      const grandChild = createMockNode('TEXT')
      childFrame.children = [grandChild]
      node.children = [childFrame]

      await updateNodeForData(node, {
        type: 'FRAME',
        styles: 'bg-[#FF0000]',
        children: [{
          type: 'FRAME',
          styles: 'bg-[#00FF00]',
          children: [{
            type: 'TEXT',
            styles: 'text-[#0000FF]',
            text: 'Colored text'
          }]
        }]
      })

      expect(applyCssStyles).toHaveBeenNthCalledWith(1, node, 'bg-[#FF0000]')
      expect(applyCssStyles).toHaveBeenNthCalledWith(2, childFrame, 'bg-[#00FF00]')
      expect(applyCssStyles).toHaveBeenNthCalledWith(3, grandChild, 'text-[#0000FF]')
      expect(grandChild.characters).toBe('Colored text')
    })

    test('should handle reordering of children', async () => {
      const node = createMockNode('FRAME')
      const child1 = createMockNode('TEXT')
      const child2 = createMockNode('TEXT')
      node.children = [child1, child2]

      await updateNodeForData(node, {
        type: 'FRAME',
        children: [
          { type: 'TEXT', text: child2.characters },
          { type: 'TEXT', text: child1.characters }
        ]
      })

      expect(node.insertChild).toHaveBeenCalled()
      expect(node.children[0]).toBe(child1)
      expect(node.children[1]).toBe(child2)
    })

    test('should handle mixed update modes in nested structure', async () => {
      const node = createMockNode('FRAME')
      const child1 = createMockNode('FRAME')
      const child2 = createMockNode('FRAME')
      const grandChild1 = createMockNode('TEXT')
      const grandChild2 = createMockNode('TEXT')
      
      child1.children = [grandChild1]
      child2.children = [grandChild2]
      node.children = [child1, child2]

      await updateNodeForData(node, {
        type: 'FRAME',
        children: [
          {
            type: 'FRAME',
            children: [{ type: 'TEXT', text: 'New text 1' }],
            // 첫 번째 자식은 replace 모드
          },
          {
            type: 'FRAME',
            children: [{ type: 'TEXT', text: 'New text 2' }],
            // 두 번째 자식은 merge 모드
          }
        ]
      }, {
        updateMode: 'merge',  // 최상위는 merge 모드
        preserveChildren: true
      })

      expect(grandChild1.remove).toHaveBeenCalled()  // replace로 인해 제거됨
      expect(grandChild2.visible).toBe(true)  // merge로 인해 유지됨
    })

    test('should handle style inheritance', async () => {
      const node = createMockNode('FRAME')
      const child = createMockNode('TEXT')
      node.children = [child]

      await updateNodeForData(node, {
        type: 'FRAME',
        styles: 'font-[Arial] text-[20px]',  // 부모의 스타일
        children: [
          {
            type: 'TEXT',
            styles: 'text-[#FF0000]',  // 자식의 스타일
            text: 'Inherited style text'
          }
        ]
      })

      // 부모와 자식 모두 각자의 스타일이 적용되어야 함
      expect(applyCssStyles).toHaveBeenNthCalledWith(1, node, 'font-[Arial] text-[20px]')
      expect(applyCssStyles).toHaveBeenNthCalledWith(2, child, 'text-[#FF0000]')
    })

    test('should handle empty or invalid styles gracefully', async () => {
      const node = createMockNode('FRAME')
      
      // 빈 스타일
      await updateNodeForData(node, {
        type: 'FRAME',
        styles: ''
      })
      expect(applyCssStyles).not.toHaveBeenCalled()

      // 잘못된 형식의 스타일
      await updateNodeForData(node, {
        type: 'FRAME',
        styles: 'invalid-style'
      })
      expect(applyCssStyles).toHaveBeenCalledWith(node, 'invalid-style')
      // applyCssStyles가 잘못된 스타일을 처리하는 것은 해당 함수의 책임
    })
  })

  describe('Helper Functions', () => {
    test('should update styles only', async () => {
      const node = createMockNode('FRAME')
      const styles = 'bg-[#FF0000]'
      
      await updateNodeStyles(node, styles)

      expect(applyCssStyles).toHaveBeenCalledWith(node, styles)
    })

    test('should update text content only', async () => {
      const node = createMockNode('TEXT')
      const text = 'Updated text'
      
      await updateTextContent(node, text)

      expect(node.characters).toBe(text)
    })

    test('should update multiple nodes', async () => {
      const nodes = [
        createMockNode('FRAME'),
        createMockNode('TEXT')
      ]
      
      const dataArray = [
        { type: 'FRAME', styles: 'bg-[#FF0000]' },
        { type: 'TEXT', text: 'Updated text' }
      ]

      await updateNodesForDataArray(nodes, dataArray)

      expect(applyCssStyles).toHaveBeenCalledWith(nodes[0], 'bg-[#FF0000]')
      expect(nodes[1].characters).toBe('Updated text')
    })
  })
}) 
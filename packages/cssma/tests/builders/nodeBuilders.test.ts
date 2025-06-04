import { describe, it, expect } from 'vitest';
import { 
  FRAME, 
  GROUP, 
  TEXT, 
  RECT, 
  ELLIPSE, 
  COMPONENT, 
  VECTOR, 
  POLYGON, 
  STAR, 
  LINE, 
  BOOLEAN_OPERATION,
  SECTION,
  COMPONENT_SET, 
  INSTANCE 
} from '../../src/builders/nodeBuilders';

describe('Node Builders', () => {
  describe('Basic Node Builders', () => {
    it('should create FRAME NodeData', () => {
      const frameData = FRAME('Test Frame', 'w-[100] h-[100] bg-red-500', []);
      
      expect(frameData).toEqual({
        type: 'FRAME',
        name: 'Test Frame',
        styles: 'w-[100] h-[100] bg-red-500',
        children: []
      });
    });

    it('should create GROUP NodeData', () => {
      const groupData = GROUP('Test Group', 'w-[200] h-[200]', [
        RECT('Child 1', 'w-[50] h-[50] bg-red-500'),
        RECT('Child 2', 'w-[50] h-[50] bg-blue-500')
      ]);
      
      expect(groupData).toEqual({
        type: 'GROUP',
        name: 'Test Group',
        styles: 'w-[200] h-[200]',
        children: [
          {
            type: 'RECTANGLE',
            name: 'Child 1',
            styles: 'w-[50] h-[50] bg-red-500'
          },
          {
            type: 'RECTANGLE',
            name: 'Child 2',
            styles: 'w-[50] h-[50] bg-blue-500'
          }
        ]
      });
    });

    it('should create TEXT NodeData', () => {
      const textData = TEXT('Test Text', 'text-lg font-bold', 'Hello World');
      
      expect(textData).toEqual({
        type: 'TEXT',
        name: 'Test Text',
        styles: 'text-lg font-bold',
        text: 'Hello World'
      });
    });

    it('should create RECT NodeData', () => {
      const rectData = RECT('Test Rectangle', 'w-[50] h-[50] bg-blue-500');
      
      expect(rectData).toEqual({
        type: 'RECTANGLE',
        name: 'Test Rectangle',
        styles: 'w-[50] h-[50] bg-blue-500'
      });
    });

    it('should create ELLIPSE NodeData', () => {
      const ellipseData = ELLIPSE('Test Ellipse', 'w-[60] h-[60] bg-green-500');
      
      expect(ellipseData).toEqual({
        type: 'ELLIPSE',
        name: 'Test Ellipse',
        styles: 'w-[60] h-[60] bg-green-500'
      });
    });

    it('should create POLYGON NodeData', () => {
      const polygonData = POLYGON('Test Polygon', 'w-[40] h-[40] bg-yellow-500');
      
      expect(polygonData).toEqual({
        type: 'POLYGON',
        name: 'Test Polygon',
        styles: 'w-[40] h-[40] bg-yellow-500'
      });
    });

    it('should create STAR NodeData', () => {
      const starData = STAR('Test Star', 'w-[45] h-[45] bg-purple-500');
      
      expect(starData).toEqual({
        type: 'STAR',
        name: 'Test Star',
        styles: 'w-[45] h-[45] bg-purple-500'
      });
    });

    it('should create LINE NodeData', () => {
      const lineData = LINE('Test Line', 'stroke-black stroke-2');
      
      expect(lineData).toEqual({
        type: 'LINE',
        name: 'Test Line',
        styles: 'stroke-black stroke-2'
      });
    });

    it('should create VECTOR NodeData', () => {
      const vectorData = VECTOR('Test Vector', 'stroke-red-500 stroke-2', ['M10 10L20 20']);
      
      expect(vectorData).toEqual({
        type: 'VECTOR',
        name: 'Test Vector',
        styles: 'stroke-red-500 stroke-2',
        paths: ['M10 10L20 20']
      });
    });
  });

  describe('Advanced Node Builders', () => {
    it('should create COMPONENT NodeData', () => {
      const componentData = COMPONENT('Test Component', 'flex-col gap-[8]', [
        TEXT('Label', 'text-sm', 'Button')
      ]);
      
      expect(componentData).toEqual({
        type: 'COMPONENT',
        name: 'Test Component',
        styles: 'flex-col gap-[8]',
        children: [
          {
            type: 'TEXT',
            name: 'Label',
            styles: 'text-sm',
            text: 'Button'
          }
        ]
      });
    });

    it('should create BOOLEAN_OPERATION NodeData', () => {
      const booleanData = BOOLEAN_OPERATION('Union Shape', 'UNION', 'fill-blue-500', [
        ELLIPSE('Circle 1', 'w-[60] h-[60]'),
        ELLIPSE('Circle 2', 'w-[60] h-[60]')
      ]);
      
      expect(booleanData).toEqual({
        type: 'BOOLEAN_OPERATION',
        name: 'Union Shape',
        styles: 'fill-blue-500',
        children: [
          {
            type: 'ELLIPSE',
            name: 'Circle 1',
            styles: 'w-[60] h-[60]'
          },
          {
            type: 'ELLIPSE',
            name: 'Circle 2',
            styles: 'w-[60] h-[60]'
          }
        ],
        props: {
          booleanOperation: 'UNION'
        }
      });
    });

    it('should create SECTION NodeData', () => {
      const sectionData = SECTION('Design Section', 'w-full p-[24]', [
        TEXT('Title', 'text-2xl font-bold', 'Section Title')
      ]);
      
      expect(sectionData).toEqual({
        type: 'SECTION',
        name: 'Design Section',
        styles: 'w-full p-[24]',
        children: [
          {
            type: 'TEXT',
            name: 'Title',
            styles: 'text-2xl font-bold',
            text: 'Section Title'
          }
        ]
      });
    });

    it('should create COMPONENT_SET NodeData', () => {
      const componentSetData = COMPONENT_SET(
        'Button Set',
        [
          {
            variantProperties: { variant: 'primary', size: 'medium' },
            styles: 'px-[16] py-[8] bg-blue-500',
            children: [
              TEXT('Label', 'text-white', '{{text}}')
            ]
          },
          {
            variantProperties: { variant: 'secondary', size: 'medium' },
            styles: 'px-[16] py-[8] bg-gray-500',
            children: [
              TEXT('Label', 'text-white', '{{text}}')
            ]
          }
        ],
        {
          text: {
            type: 'TEXT',
            defaultValue: 'Button'
          }
        }
      );
      
      expect(componentSetData.type).toBe('COMPONENT_SET');
      expect(componentSetData.name).toBe('Button Set');
      expect(componentSetData.children).toHaveLength(2);
      expect(componentSetData.props?.componentProperties).toEqual({
        text: {
          type: 'TEXT',
          defaultValue: 'Button'
        }
      });
    });

    it('should create INSTANCE NodeData', () => {
      const instanceData = INSTANCE(
        'Button Instance',
        'Button Component',
        'm-[8]',
        { variant: 'primary', size: 'large' }
      );
      
      expect(instanceData).toEqual({
        type: 'INSTANCE',
        name: 'Button Instance',
        styles: 'm-[8]',
        props: {
          componentName: 'Button Component',
          variantProperties: { variant: 'primary', size: 'large' }
        }
      });
    });
  });

  describe('Complex Nested Structures', () => {
    it('should create complex nested structure with multiple node types', () => {
      const complexStructure = FRAME('Complex Layout', 'flex-col gap-[16] p-[24]', [
        SECTION('Header Section', 'w-full', [
          TEXT('Title', 'text-2xl font-bold', 'Dashboard')
        ]),
        GROUP('Icon Group', 'flex-row gap-[8]', [
          VECTOR('Home Icon', 'stroke-black stroke-2', ['M3 12L5 10M5 10L12 3L19 10M5 10V20']),
          VECTOR('Settings Icon', 'stroke-gray-600 stroke-2', ['M12 15A3 3 0 1 0 12 9A3 3 0 0 0 12 15'])
        ]),
        BOOLEAN_OPERATION('Shape Combination', 'SUBTRACT', 'fill-red-500', [
          RECT('Base', 'w-[100] h-[100]'),
          ELLIPSE('Hole', 'w-[50] h-[50]')
        ])
      ]);
      
      expect(complexStructure.type).toBe('FRAME');
      expect(complexStructure.children).toHaveLength(3);
      expect(complexStructure.children?.[0].type).toBe('SECTION');
      expect(complexStructure.children?.[1].type).toBe('GROUP');
      expect(complexStructure.children?.[2].type).toBe('BOOLEAN_OPERATION');
    });
  });

  describe('Default Parameters', () => {
    it('should use default empty strings for optional style parameters', () => {
      const frameData = FRAME('Simple Frame');
      
      expect(frameData).toEqual({
        type: 'FRAME',
        name: 'Simple Frame',
        styles: '',
        children: []
      });
    });

    it('should use default empty arrays for children (except for nodes that require children)', () => {
      // Note: GROUP requires children, so we test with FRAME instead
      const frameData = FRAME('Simple Frame', 'w-[100] h-[100]');
      
      expect(frameData).toEqual({
        type: 'FRAME',
        name: 'Simple Frame',
        styles: 'w-[100] h-[100]',
        children: []
      });
    });

    it('should use default empty string for text content', () => {
      const textData = TEXT('Empty Text', 'text-lg');
      
      expect(textData).toEqual({
        type: 'TEXT',
        name: 'Empty Text',
        styles: 'text-lg',
        text: ''
      });
    });

    it('should use default empty array for vector paths', () => {
      const vectorData = VECTOR('Empty Vector', 'stroke-black');
      
      expect(vectorData).toEqual({
        type: 'VECTOR',
        name: 'Empty Vector',
        styles: 'stroke-black',
        paths: []
      });
    });
  });

  describe('Boolean Operation Types', () => {
    it('should create UNION boolean operation', () => {
      const union = BOOLEAN_OPERATION('Union', 'UNION', '', []);
      expect(union.props?.booleanOperation).toBe('UNION');
    });

    it('should create INTERSECT boolean operation', () => {
      const intersect = BOOLEAN_OPERATION('Intersect', 'INTERSECT', '', []);
      expect(intersect.props?.booleanOperation).toBe('INTERSECT');
    });

    it('should create SUBTRACT boolean operation', () => {
      const subtract = BOOLEAN_OPERATION('Subtract', 'SUBTRACT', '', []);
      expect(subtract.props?.booleanOperation).toBe('SUBTRACT');
    });

    it('should create EXCLUDE boolean operation', () => {
      const exclude = BOOLEAN_OPERATION('Exclude', 'EXCLUDE', '', []);
      expect(exclude.props?.booleanOperation).toBe('EXCLUDE');
    });
  });
}); 
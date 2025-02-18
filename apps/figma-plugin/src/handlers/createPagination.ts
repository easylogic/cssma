import { PaginationVariantProps } from '../types/pagination';
import { PAGINATION_SIZES, PAGINATION_STYLES, PAGINATION_VARIANTS } from '../constants/paginationStyles';
import { ComponentPageData, createComponentPage, createHandlers } from './createBase';
import { variables } from '@/variables';

class ComponentCache {
  private static instance: ComponentCache;
  private paginationSet: ComponentSetNode | null = null;

  private constructor() {}

  static getInstance(): ComponentCache {
    if (!ComponentCache.instance) {
      ComponentCache.instance = new ComponentCache();
    }
    return ComponentCache.instance;
  }

  getPaginationSet(): ComponentSetNode | null {
    return this.paginationSet;
  }

  setPaginationSet(set: ComponentSetNode): void {
    this.paginationSet = set;
  }
}

function generatePageRange(currentPage: number, totalPages: number, siblingCount: number = 1, boundaryCount: number = 1): (number | 'ellipsis')[] {
  const range = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, i) => start + i);

  // Calculate the main range
  const startPages = range(1, Math.min(boundaryCount, totalPages));
  const endPages = range(Math.max(totalPages - boundaryCount + 1, boundaryCount + 1), totalPages);

  const siblingsStart = Math.max(
    Math.min(
      currentPage - siblingCount,
      totalPages - boundaryCount - siblingCount * 2 - 1
    ),
    boundaryCount + 2
  );

  const siblingsEnd = Math.min(
    Math.max(
      currentPage + siblingCount,
      boundaryCount + siblingCount * 2 + 2
    ),
    endPages.length > 0 ? endPages[0] - 2 : totalPages - 1
  );

  // Combine the ranges
  const itemList = [
    ...startPages,
    ...(siblingsStart > boundaryCount + 2 ? ['ellipsis'] : boundaryCount + 1 < totalPages - boundaryCount ? [boundaryCount + 1] : []),
    ...range(siblingsStart, siblingsEnd),
    ...(siblingsEnd < totalPages - boundaryCount - 1 ? ['ellipsis'] : totalPages - boundaryCount > boundaryCount ? [totalPages - boundaryCount] : []),
    ...endPages
  ];

  return [...new Set(itemList)];
}

export const paginationHandlers = {
  createPagination: async (variant: PaginationVariantProps) => {
    const size = PAGINATION_SIZES[variant.size || 'medium'];
    const style = PAGINATION_STYLES[variant.variant || 'filled'];
    const shape = variant.shape || 'rounded';
    const currentPage = variant.currentPage || 1;
    const totalPages = variant.totalPages || 1;
    const siblingCount = variant.siblingCount ?? 1;
    const boundaryCount = variant.boundaryCount ?? 1;

    // Create pagination component
    const pagination = figma.createComponent();
    pagination.name = `size=${variant.size || 'medium'}, variant=${variant.variant || 'filled'}, shape=${shape}, currentPage=${currentPage}, totalPages=${totalPages}`;
    
    // Add ARIA attributes
    pagination.setPluginData('role', variant.role || 'navigation');
    if (variant.ariaLabel) {
      pagination.setPluginData('aria-label', variant.ariaLabel);
    }
    if (variant.disabled) {
      pagination.setPluginData('aria-disabled', 'true');
    }

    // Create container
    const container = figma.createFrame();
    container.name = "Container";
    container.layoutMode = "HORIZONTAL";
    container.itemSpacing = size.spacing;
    container.fills = [];
    container.primaryAxisSizingMode = "AUTO";
    container.counterAxisSizingMode = "AUTO";

    // Add first/prev buttons if needed
    if (variant.showFirstButton) {
      const firstButton = await createPaginationItem('first', size, style, shape, variant.disabled);
      container.appendChild(firstButton);
    }

    if (variant.showPrevButton) {
      const prevButton = await createPaginationItem('prev', size, style, shape, variant.disabled);
      container.appendChild(prevButton);
    }

    // Generate page items
    const pageRange = generatePageRange(currentPage, totalPages, siblingCount, boundaryCount);
    for (const page of pageRange) {
      if (page === 'ellipsis') {
        const ellipsis = await createPaginationItem('ellipsis', size, style, shape, variant.disabled);
        container.appendChild(ellipsis);
      } else {
        const isSelected = page === currentPage;
        const pageItem = await createPaginationItem(
          page.toString(),
          size,
          style,
          shape,
          variant.disabled,
          isSelected
        );
        container.appendChild(pageItem);
      }
    }

    // Add next/last buttons if needed
    if (variant.showNextButton) {
      const nextButton = await createPaginationItem('next', size, style, shape, variant.disabled);
      container.appendChild(nextButton);
    }

    if (variant.showLastButton) {
      const lastButton = await createPaginationItem('last', size, style, shape, variant.disabled);
      container.appendChild(lastButton);
    }

    pagination.appendChild(container);
    return pagination;
  },

  createComponentSet: async () => {
    const cache = ComponentCache.getInstance();
    if (cache.getPaginationSet()) return cache.getPaginationSet();

    const components: ComponentNode[] = [];
    
    for (const variant of PAGINATION_VARIANTS) {
      const component = await paginationHandlers.createPagination(variant);
      components.push(component);
    }

    const componentSet = figma.combineAsVariants(components, figma.currentPage);
    componentSet.name = "Pagination";

    // Add component properties
    componentSet.addComponentProperty('size', 'VARIANT', 'The size of the pagination');
    componentSet.addComponentProperty('variant', 'VARIANT', 'The visual style of the pagination');
    componentSet.addComponentProperty('shape', 'VARIANT', 'The shape of the pagination items');
    componentSet.addComponentProperty('currentPage', 'TEXT', 'The current page number');
    componentSet.addComponentProperty('totalPages', 'TEXT', 'The total number of pages');
    componentSet.addComponentProperty('siblingCount', 'TEXT', 'Number of siblings to show');
    componentSet.addComponentProperty('boundaryCount', 'TEXT', 'Number of boundary pages to show');
    componentSet.addComponentProperty('showFirstButton', 'BOOLEAN', 'Whether to show first page button');
    componentSet.addComponentProperty('showLastButton', 'BOOLEAN', 'Whether to show last page button');
    componentSet.addComponentProperty('showPrevButton', 'BOOLEAN', 'Whether to show previous page button');
    componentSet.addComponentProperty('showNextButton', 'BOOLEAN', 'Whether to show next page button');
    componentSet.addComponentProperty('disabled', 'BOOLEAN', 'Whether the pagination is disabled');

    setupComponentSetLayout(componentSet);

    cache.setPaginationSet(componentSet);
    return componentSet;
  },

  createInstance: async (variant: PaginationVariantProps) => {
    const component = ComponentCache.getInstance().getPaginationSet()?.defaultVariant.createInstance();
    if (!component) return null;

    component.setProperties({
      size: variant.size || 'medium',
      variant: variant.variant || 'filled',
      shape: variant.shape || 'rounded',
      currentPage: (variant.currentPage || 1).toString(),
      totalPages: (variant.totalPages || 1).toString(),
      siblingCount: (variant.siblingCount ?? 1).toString(),
      boundaryCount: (variant.boundaryCount ?? 1).toString(),
      showFirstButton: variant.showFirstButton ?? false,
      showLastButton: variant.showLastButton ?? false,
      showPrevButton: variant.showPrevButton ?? true,
      showNextButton: variant.showNextButton ?? true,
      disabled: variant.disabled ?? false
    });

    return component;
  },

  createPage: async () => {
    const pageData: ComponentPageData = {
      title: "Pagination",
      description: "Pagination enables navigation between pages of content.",
      anatomy: {
        parts: [
          { name: "Container", description: "The main container that holds all pagination items" },
          { name: "Navigation Buttons", description: "Optional buttons for first, previous, next, and last pages" },
          { name: "Page Items", description: "Numbered buttons for direct page navigation" },
          { name: "Ellipsis", description: "Indicates skipped page numbers" }
        ]
      },
      properties: [
        {
          name: "size",
          type: "enum",
          default: "medium",
          description: "The size of the pagination",
          options: ["small", "medium", "large"]
        },
        {
          name: "variant",
          type: "enum",
          default: "filled",
          description: "The visual style of the pagination",
          options: ["filled", "outlined", "ghost"]
        },
        {
          name: "shape",
          type: "enum",
          default: "rounded",
          description: "The shape of the pagination items",
          options: ["rounded", "circular"]
        },
        {
          name: "currentPage",
          type: "number",
          default: "1",
          description: "The current page number"
        },
        {
          name: "totalPages",
          type: "number",
          default: "1",
          description: "The total number of pages"
        },
        {
          name: "siblingCount",
          type: "number",
          default: "1",
          description: "Number of siblings to show"
        },
        {
          name: "boundaryCount",
          type: "number",
          default: "1",
          description: "Number of boundary pages to show"
        },
        {
          name: "showFirstButton",
          type: "boolean",
          default: "false",
          description: "Whether to show first page button"
        },
        {
          name: "showLastButton",
          type: "boolean",
          default: "false",
          description: "Whether to show last page button"
        },
        {
          name: "showPrevButton",
          type: "boolean",
          default: "true",
          description: "Whether to show previous page button"
        },
        {
          name: "showNextButton",
          type: "boolean",
          default: "true",
          description: "Whether to show next page button"
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Whether the pagination is disabled"
        }
      ],
      variants: [
        {
          title: "Sizes",
          description: "Different sizes of pagination.",
          examples: [
            await paginationHandlers.createInstance(
              { size: 'small', totalPages: 5 }
            ),
            await paginationHandlers.createInstance(
              { size: 'medium', totalPages: 5 }
            ),
            await paginationHandlers.createInstance(
              { size: 'large', totalPages: 5 }
            )
          ]
        },
        {
          title: "Variants",
          description: "Different visual styles of pagination.",
          examples: [
            await paginationHandlers.createInstance(
              { variant: 'filled', totalPages: 5 }
            ),
            await paginationHandlers.createInstance(
              { variant: 'outlined', totalPages: 5 }
            ),
            await paginationHandlers.createInstance(
              { variant: 'ghost', totalPages: 5 }
            )
          ]
        },
        {
          title: "Shapes",
          description: "Different shapes of pagination items.",
          examples: [
            await paginationHandlers.createInstance(
              { shape: 'rounded', totalPages: 5 }
            ),
            await paginationHandlers.createInstance(
              { shape: 'circular', totalPages: 5 }
            )
          ]
        },
        {
          title: "Navigation",
          description: "Different navigation button combinations.",
          examples: [
            await paginationHandlers.createInstance(
              { 
                totalPages: 10,
                showFirstButton: true,
                showLastButton: true,
                showPrevButton: true,
                showNextButton: true
              }
            ),
            await paginationHandlers.createInstance(
              { 
                totalPages: 10,
                showFirstButton: false,
                showLastButton: false,
                showPrevButton: true,
                showNextButton: true
              }
            )
          ]
        }
      ],
      usage: {
        description: "Use pagination to help users navigate through multiple pages of content.",
        examples: [
          {
            title: "Table Pagination",
            description: "Using pagination with a data table.",
            component: await (async () => {
              const container = figma.createComponent();
              container.name = "Table Pagination Example";
              container.layoutMode = "HORIZONTAL";
              container.itemSpacing = 16;
              container.fills = [];
              container.primaryAxisAlignItems = "CENTER";
              container.counterAxisAlignItems = "CENTER";

              const pagination = await paginationHandlers.createInstance({
                size: 'medium',
                variant: 'outlined',
                shape: 'rounded',
                currentPage: 3,
                totalPages: 10,
                showFirstButton: true,
                showLastButton: true
              });

              if (pagination) container.appendChild(pagination);
              return container;
            })()
          }
        ]
      }
    };

    return createComponentPage(pageData);
  }
};

async function createPaginationItem(
  content: string,
  size: typeof PAGINATION_SIZES[keyof typeof PAGINATION_SIZES],
  style: typeof PAGINATION_STYLES[keyof typeof PAGINATION_STYLES],
  shape: 'rounded' | 'circular',
  disabled: boolean = false,
  selected: boolean = false
): Promise<FrameNode> {
  const item = figma.createFrame();
  item.name = content;
  item.layoutMode = "HORIZONTAL";
  item.primaryAxisAlignItems = "CENTER";
  item.counterAxisAlignItems = "CENTER";
  item.resize(size.minWidth, size.height);
  item.cornerRadius = size.borderRadius[shape];

  // Set background and border
  item.fills = [variables.bindVariable(
    disabled ? style.item.background.disabled :
    selected ? style.item.background.selected :
    style.item.background.default
  )];

  if (style.item.border.default !== 'transparent') {
    item.strokes = [variables.bindVariable(
      disabled ? style.item.border.disabled :
      selected ? style.item.border.selected :
      style.item.border.default
    )];
    item.strokeWeight = 1;
  }

  // Add content
  if (content === 'ellipsis') {
    const text = await createHandlers.text({
      text: '...',
      fontSize: size.fontSize,
      fills: [variables.bindVariable(style.ellipsis.text)]
    });
    item.appendChild(text);
  } else if (['first', 'prev', 'next', 'last'].includes(content)) {
    const icon = figma.createFrame();
    icon.name = `${content}Icon`;
    icon.resize(size.iconSize, size.iconSize);
    icon.fills = [variables.bindVariable(
      disabled ? style.item.icon.disabled :
      selected ? style.item.icon.selected :
      style.item.icon.default
    )];
    item.appendChild(icon);
  } else {
    const text = await createHandlers.text({
      text: content,
      fontSize: size.fontSize,
      fills: [variables.bindVariable(
        disabled ? style.item.text.disabled :
        selected ? style.item.text.selected :
        style.item.text.default
      )]
    });
    item.appendChild(text);
  }

  return item;
}

function setupComponentSetLayout(componentSet: ComponentSetNode) {
  componentSet.layoutMode = "HORIZONTAL";
  componentSet.layoutWrap = "WRAP";
  componentSet.itemSpacing = 40;
  componentSet.counterAxisSpacing = 40;
  componentSet.paddingLeft = componentSet.paddingRight = 40;
  componentSet.paddingTop = componentSet.paddingBottom = 40;
  componentSet.resize(800, componentSet.height);
  componentSet.primaryAxisSizingMode = "FIXED";
  componentSet.counterAxisSizingMode = "AUTO";
  componentSet.fills = [variables.bindVariable('semantic/bg/default')];
} 
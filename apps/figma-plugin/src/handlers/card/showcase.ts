import { ComponentPageData, createComponentPage, createHandlers } from '../createBase';
import { cardHandlers } from './index';
import { CardVariantProps } from '@/types/card';

// 예시 컴포넌트 생성을 위한 헬퍼 함수
async function createExampleCard(variant: CardVariantProps, props = {}) {
  try {
    const instance = await cardHandlers.createInstance(variant, props);
    if (!instance) {
      console.error('Failed to create card instance');
      return createFallbackCard();
    }
    return instance;
  } catch (error) {
    console.error('Error creating card instance:', error);
    return createFallbackCard();
  }
}

// 폴백 카드 생성 함수
function createFallbackCard() {
  const fallback = figma.createFrame();
  fallback.name = "Fallback Card";
  fallback.resize(320, 200);
  fallback.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];
  return fallback;
}

// 예시 컨테이너 생성 함수
async function createExampleContainer(name: string, options = {}) {
  const container = figma.createFrame();
  container.name = name;
  container.layoutMode = "HORIZONTAL";
  container.itemSpacing = 16;
  container.fills = [];
  container.counterAxisAlignItems = "CENTER";
  Object.assign(container, options);
  return container;
}

export const createCardPage = async () => {
  const pageData: ComponentPageData = {
    title: "Card",
    description: "Cards are flexible containers that group related content and actions. They can display various types of content including text, images, and interactive elements.",
    anatomy: {
      image: await (async () => {
        const container = await createExampleContainer("Card Anatomy", {
          width: 800,
          height: 400,
          itemSpacing: 80
        });

        // Create simplified card visualization
        const cardVisualization = figma.createFrame();
        cardVisualization.name = "Card Visualization";
        cardVisualization.layoutMode = "VERTICAL";
        cardVisualization.resize(320, 320);
        cardVisualization.itemSpacing = 8;
        cardVisualization.cornerRadius = 8;
        cardVisualization.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
        cardVisualization.strokes = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];
        cardVisualization.strokeWeight = 1;

        // Add header placeholder
        const header = figma.createFrame();
        header.name = "Header";
        header.layoutMode = "VERTICAL";
        header.resize(320, 64);
        header.fills = [{ type: 'SOLID', color: { r: 0.95, g: 0.95, b: 0.95 } }];
        cardVisualization.appendChild(header);

        // Add media placeholder
        const media = figma.createFrame();
        media.name = "Media";
        media.resize(320, 180);
        media.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];
        cardVisualization.appendChild(media);

        // Add content placeholder
        const content = figma.createFrame();
        content.name = "Content";
        content.layoutMode = "VERTICAL";
        content.resize(320, 80);
        content.fills = [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.98 } }];
        cardVisualization.appendChild(content);

        // Add footer placeholder
        const footer = figma.createFrame();
        footer.name = "Footer";
        footer.layoutMode = "HORIZONTAL";
        footer.resize(320, 48);
        footer.fills = [{ type: 'SOLID', color: { r: 0.95, g: 0.95, b: 0.95 } }];
        cardVisualization.appendChild(footer);

        // Create annotations container
        const annotationsContainer = await createHandlers.container({
          name: "Annotations",
          width: 400,
          height: 320,
          spacing: 32,
          direction: "VERTICAL"
        });

        // Add annotations
        const parts = [
          { 
            name: "Header", 
            description: "Optional section for titles and metadata"
          },
          { 
            name: "Media", 
            description: "Optional section for images or videos"
          },
          { 
            name: "Content", 
            description: "Main content area for text and other elements"
          },
          { 
            name: "Footer", 
            description: "Optional section for actions and additional info"
          }
        ];

        for (const part of parts) {
          const annotation = await createHandlers.annotation({
            title: part.name,
            description: part.description
          });
          annotationsContainer.appendChild(annotation);
        }

        container.appendChild(cardVisualization);
        container.appendChild(annotationsContainer);

        return container;
      })(),
      parts: [
        {
          name: "Header",
          description: "Optional section that typically contains a title, subtitle, avatar, or other metadata about the card's content."
        },
        {
          name: "Media",
          description: "Optional section for displaying images, videos, or other media content. Can include an overlay for better text contrast."
        },
        {
          name: "Content",
          description: "The main content area of the card. Can contain text, lists, or other components. Always present in the card."
        },
        {
          name: "Footer",
          description: "Optional section typically used for actions or additional information. Often contains buttons or links."
        }
      ]
    },
    properties: [
      {
        name: "size",
        type: "'small' | 'medium' | 'large'",
        default: "medium",
        description: "Controls the overall size and padding of the card.",
        options: ["small", "medium", "large"]
      },
      {
        name: "variant",
        type: "'filled' | 'outlined' | 'elevated'",
        default: "filled",
        description: "Determines the visual style of the card.",
        options: ["filled", "outlined", "elevated"]
      },
      {
        name: "status",
        type: "'default' | 'error'",
        default: "default",
        description: "Indicates the current status of the card.",
        options: ["default", "error"]
      },
      {
        name: "interactive",
        type: "boolean",
        default: "false",
        description: "When true, the entire card becomes clickable and shows hover states."
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "When true, the card appears disabled and cannot be interacted with."
      },
      {
        name: "loading",
        type: "boolean",
        default: "false",
        description: "When true, displays a loading state for the card content."
      }
    ],
    variants: [
      {
        title: "Sizes",
        description: "Cards come in three sizes to accommodate different amounts of content.",
        examples: await Promise.all([
          createExampleCard(
            { size: 'small', variant: 'filled' },
            { content: { title: "Small Card", description: "Compact size for limited content." } }
          ),
          createExampleCard(
            { size: 'medium', variant: 'filled' },
            { content: { title: "Medium Card", description: "Standard size for most use cases." } }
          ),
          createExampleCard(
            { size: 'large', variant: 'filled' },
            { content: { title: "Large Card", description: "Expanded size for rich content." } }
          )
        ])
      },
      {
        title: "Variants",
        description: "Different visual styles to match your design needs.",
        examples: await Promise.all([
          createExampleCard(
            { variant: 'filled' },
            { content: { title: "Filled Card", description: "Standard card with solid background." } }
          ),
          createExampleCard(
            { variant: 'outlined' },
            { content: { title: "Outlined Card", description: "Card with border and transparent background." } }
          ),
          createExampleCard(
            { variant: 'elevated' },
            { content: { title: "Elevated Card", description: "Card with shadow for depth." } }
          )
        ])
      },
      {
        title: "Sections",
        description: "Cards can include various combinations of sections.",
        examples: [
          await cardHandlers.createInstance({
            header: {
              title: "With Header",
              subtitle: "Supporting text"
            },
            content: {
              description: "Card with header section."
            }
          }),
          await cardHandlers.createInstance({
            content: {
              description: "Card with media section."
            },
            media: {
              image: "placeholder.jpg",
              aspectRatio: "16/9"
            }
          }),
          await cardHandlers.createInstance({
            content: {
              description: "Card with footer section."
            },
            footer: {
              actions: ["Action 1", "Action 2"]
            }
          })
        ]
      },
      {
        title: "States",
        description: "Cards can display different states.",
        examples: [
          await cardHandlers.createInstance({
            interactive: true,
            content: {
              title: "Interactive",
              description: "Clickable card with hover state."
            }
          }),
          await cardHandlers.createInstance({
            disabled: true,
            content: {
              title: "Disabled",
              description: "Card in disabled state."
            }
          }),
          await cardHandlers.createInstance({
            loading: true,
            content: {
              title: "Loading",
              description: "Card in loading state."
            }
          })
        ]
      }
    ],
    bestPractices: [
      {
        title: "Content Hierarchy",
        description: "Maintain clear visual hierarchy with headings and content. Use consistent spacing between elements."
      },
      {
        title: "Media Usage",
        description: "When using media, ensure it's relevant to the content and maintains good aspect ratios."
      },
      {
        title: "Action Placement",
        description: "Place primary actions in the footer. Limit the number of actions to avoid overwhelming users."
      },
      {
        title: "Responsive Behavior",
        description: "Design cards to work well at different widths. Consider how content will reflow."
      }
    ],
    usage: {
      description: "Cards are versatile containers that can be used in many contexts, from dashboards to article lists.",
      examples: await Promise.all([
        {
          title: "Article Preview",
          description: "Use cards to display article previews with images and excerpts.",
          component: await createExampleCard({
            variant: 'filled',
            size: 'medium'
          }, {
            media: {
              image: "article.jpg",
              aspectRatio: "16/9"
            },
            header: {
              title: "Article Title",
              subtitle: "Author Name • 5 min read"
            },
            content: {
              description: "A brief excerpt from the article that gives readers a preview of the content..."
            },
            footer: {
              actions: ["Read More", "Save"]
            }
          })
        },
        {
          title: "Product Card",
          description: "Display product information in a compact format.",
          component: await createExampleCard({
            variant: 'elevated',
            size: 'small'
          }, {
            media: {
              image: "product.jpg",
              aspectRatio: "1/1"
            },
            content: {
              title: "Product Name",
              description: "$99.99"
            },
            footer: {
              actions: ["Add to Cart"]
            }
          })
        },
        {
          title: "Dashboard Widget",
          description: "Use cards to organize dashboard content.",
          component: await createExampleCard({
            variant: 'outlined',
            size: 'large'
          }, {
            header: {
              title: "Analytics Overview",
              extra: "Last 7 days"
            },
            content: {
              description: "Chart or metrics would go here"
            },
            footer: {
              actions: ["View Details"]
            }
          })
        }
      ])
    }
  };

  return createComponentPage(pageData);
}; 
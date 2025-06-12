import React from 'react';
import { NodeData } from 'cssma';
import { useCssmaRuntime } from './hooks';

interface NodeRendererProps {
  data: NodeData;
  className?: string;
  style?: React.CSSProperties;
  /** CSS generation options */
  cssOptions?: {
    /** Generate all classes including standard ones (default: false - runtime only) */
    includeStandard?: boolean;
    /** Custom filter function to determine which classes to process */
    filter?: (className: string) => boolean;
  };
}

export function NodeRenderer({ data, className = '', style = {}, cssOptions }: NodeRendererProps) {
  const { className: processedClassName, skippedClasses } = useCssmaRuntime(data.styles || '', cssOptions);
  
  const combinedClassName = [processedClassName, className].filter(Boolean).join(' ');

  // Log skipped classes in development
  if (process.env.NODE_ENV === 'development' && skippedClasses.length > 0) {
    console.debug(`NodeRenderer [${data.type}]: Skipped standard classes:`, skippedClasses);
  }

  const renderChildren = () => {
    if (!data.children || data.children.length === 0) {
      return null;
    }

    return data.children.map((child, index) => (
      <NodeRenderer key={index} data={child} cssOptions={cssOptions} />
    ));
  };

  const commonProps = {
    className: combinedClassName,
    style,
    ...(data.props || {})
  };

  switch (data.type) {
    case 'FRAME':
      return (
        <div {...commonProps}>
          {renderChildren()}
        </div>
      );

    case 'GROUP':
      return (
        <div {...commonProps}>
          {renderChildren()}
        </div>
      );

    case 'TEXT':
      return (
        <span {...commonProps}>
          {data.text || data.name || ''}
        </span>
      );

    case 'RECTANGLE':
      return <div {...commonProps} />;

    case 'ELLIPSE':
      return <div {...commonProps} />;

    case 'POLYGON':
      return <div {...commonProps} />;

    case 'STAR':
      return <div {...commonProps} />;

    case 'VECTOR':
      return <div {...commonProps} />;

    case 'LINE':
      return <div {...commonProps} />;

    case 'SECTION':
      return (
        <section {...commonProps}>
          {renderChildren()}
        </section>
      );

    case 'COMPONENT':
      return (
        <div {...commonProps}>
          {renderChildren()}
        </div>
      );

    case 'INSTANCE':
      return (
        <div {...commonProps}>
          {renderChildren()}
        </div>
      );

    default:
      return (
        <div {...commonProps}>
          {renderChildren()}
        </div>
      );
  }
} 
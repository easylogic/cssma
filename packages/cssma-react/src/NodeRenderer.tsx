import React from 'react';
import { NodeData } from 'cssma';
import { useCssma } from './hooks';

interface NodeRendererProps {
  data: NodeData;
  className?: string;
  style?: React.CSSProperties;
}

export function NodeRenderer({ data, className = '', style = {} }: NodeRendererProps) {
  const { className: processedClassName } = useCssma(data.styles || '');
  
  const combinedClassName = [processedClassName, className].filter(Boolean).join(' ');

  const renderChildren = () => {
    if (!data.children || data.children.length === 0) {
      return null;
    }

    return data.children.map((child, index) => (
      <NodeRenderer key={index} data={child} />
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
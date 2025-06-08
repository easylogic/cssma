import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { LivePreview } from './LivePreview';

interface CssConverterProps {
  selectedElement: any;
  cssInput: string;
  onCssInputChange: (value: string) => void;
  onAnalyzeSelection: () => void;
  onApplyStyles: () => void;
}

export function CssConverter({
  selectedElement,
  cssInput,
  onCssInputChange,
  onAnalyzeSelection,
  onApplyStyles
}: CssConverterProps) {
  const [isPreviewEnabled, setIsPreviewEnabled] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">
          {selectedElement ? (
            <span>Selected: {selectedElement.name} ({selectedElement.type})</span>
          ) : (
            <span>No element selected</span>
          )}
        </div>
        <Button onClick={onAnalyzeSelection} variant="outline" size="sm">
          Analyze Selection
        </Button>
      </div>

      {/* Live Preview Section */}
      <LivePreview
        cssInput={cssInput}
        selectedElement={selectedElement}
        isEnabled={isPreviewEnabled}
        onToggle={() => setIsPreviewEnabled(!isPreviewEnabled)}
      />

      <Textarea
        placeholder="Enter CSS or Tailwind code here..."
        value={cssInput}
        onChange={(e) => onCssInputChange(e.target.value)}
        className="min-h-[200px] font-mono text-sm"
      />

      <div className="flex justify-end">
        <Button onClick={onApplyStyles} disabled={!selectedElement}>
          Apply Styles
        </Button>
      </div>
    </div>
  );
} 
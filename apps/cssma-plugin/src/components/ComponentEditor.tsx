import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import examples from '../examples';

interface ComponentEditorProps {
  selectedExample: string;
  componentSpec: string;
  onExampleChange: (value: string) => void;
  onSpecChange: (value: string) => void;
  onAnalyzeSelection: () => void;
  onCreateComponent: () => void;
}

export function ComponentEditor({
  selectedExample,
  componentSpec,
  onExampleChange,
  onSpecChange,
  onAnalyzeSelection,
  onCreateComponent
}: ComponentEditorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Select value={selectedExample} onValueChange={onExampleChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select example" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="custom">Custom</SelectItem>
            {Object.keys(examples).map((key) => (
              <SelectItem key={key} value={key}>
                {key}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={onAnalyzeSelection} variant="outline" size="sm">
          Analyze Selection
        </Button>
      </div>

      <Textarea
        value={componentSpec}
        onChange={(e) => onSpecChange(e.target.value)}
        placeholder="Enter component specification in JSON format..."
        className="min-h-[300px] font-mono text-sm"
      />

      <div className="flex justify-end">
        <Button onClick={onCreateComponent}>
          Create Component
        </Button>
      </div>
    </div>
  );
} 
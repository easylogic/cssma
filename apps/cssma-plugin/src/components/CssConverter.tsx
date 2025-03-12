import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

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
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">CSS-to-Figma Converter</CardTitle>
        <CardDescription>
          Convert Tailwind CSS or regular CSS to Figma styles.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {selectedElement ? (
          <div className="space-y-4">
            <div>
              <Label>Selected Element</Label>
              <div className="p-2 bg-slate-100 rounded text-sm">
                {selectedElement.name} ({selectedElement.type})
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="css-input">Tailwind CSS or CSS Code</Label>
              <Textarea
                id="css-input"
                value={cssInput}
                onChange={(e) => onCssInputChange(e.target.value)}
                placeholder="Example: flex-col bg-white p-4 rounded-lg"
                className="min-h-[150px]"
              />
            </div>
          </div>
        ) : (
          <div className="p-4 text-center border border-dashed rounded-lg">
            Please select an element in Figma canvas
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline" onClick={onAnalyzeSelection}>
          Analyze Selection
        </Button>
        <Button onClick={onApplyStyles} disabled={!selectedElement || !cssInput || cssInput.trim() === ''}>
          Apply Styles
        </Button>
      </CardFooter>
    </Card>
  );
} 
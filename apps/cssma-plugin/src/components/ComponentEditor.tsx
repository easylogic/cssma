import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Component Creator</CardTitle>
        <CardDescription>
          Create Figma components from JSON specifications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="example-select">Example Components</Label>
            <Select value={selectedExample} onValueChange={onExampleChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select example..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="custom">Custom Input</SelectItem>
                <SelectItem value="alert">Alert</SelectItem>
                <SelectItem value="avatar">Avatar</SelectItem>
                <SelectItem value="button">Button</SelectItem>
                <SelectItem value="card">Card</SelectItem>
                <SelectItem value="dropdown">Dropdown</SelectItem>
                <SelectItem value="form">Form</SelectItem>
                <SelectItem value="input">Input</SelectItem>
                <SelectItem value="modal">Modal</SelectItem>
                <SelectItem value="navbar">Navbar</SelectItem>
                <SelectItem value="table">Table</SelectItem>
                <SelectItem value="tabs">Tabs</SelectItem>
                <SelectItem value="tooltip">Tooltip</SelectItem>
                <hr />
                <SelectItem value="landingSlides">Landing Slides</SelectItem>
                <SelectItem value="landingHero">Landing Hero</SelectItem>
                <SelectItem value="landingProduct">Landing Product</SelectItem>
                <SelectItem value="landingSaas">Landing SaaS</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="component-spec">Component JSON Specification</Label>
            <Textarea
              id="component-spec"
              value={componentSpec}
              onChange={(e) => onSpecChange(e.target.value)}
              placeholder='{"type": "FRAME", "name": "Button", "styles": "flex-row bg-blue-500 p-[16] rounded-lg", ...}'
              className="min-h-[250px] font-mono text-xs"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <Button variant="outline" onClick={onAnalyzeSelection}>
          Generate JSON from Selection
        </Button>
        <Button onClick={onCreateComponent} disabled={!componentSpec.trim()}>
          Create Component
        </Button>
      </CardFooter>
    </Card>
  );
} 
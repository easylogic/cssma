import React from 'react';
import { Button } from '@/components/ui/button';

interface GenerateTabProps {
  onCreateRectangle: () => void;
}

export function GenerateTab({ onCreateRectangle }: GenerateTabProps) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-medium">도형 생성</h2>
        <Button 
          onClick={onCreateRectangle}
          size="sm"
          className="w-full"
        >
          <div className="flex items-center gap-2">
            디자인시스템 컴포넌트 생성
          </div>
        </Button>
      </div>
    </div>
  );
} 
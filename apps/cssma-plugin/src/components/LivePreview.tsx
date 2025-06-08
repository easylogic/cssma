import React, { useEffect, useState, useMemo } from 'react';
import { processCssStyles } from 'cssma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface LivePreviewProps {
  cssInput: string;
  selectedElement: any;
  isEnabled: boolean;
  onToggle: () => void;
}

interface PreviewStyles {
  width?: string;
  height?: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  border?: string;
  boxShadow?: string;
  display?: string;
  flexDirection?: string;
  alignItems?: string;
  justifyContent?: string;
  gap?: string;
  [key: string]: any;
}

export function LivePreview({ cssInput, selectedElement, isEnabled, onToggle }: LivePreviewProps) {
  const [previewStyles, setPreviewStyles] = useState<PreviewStyles>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // CSS를 웹 스타일로 변환하는 함수
  const convertToWebStyles = (figmaStyles: any): PreviewStyles => {
    const webStyles: PreviewStyles = {};

    if (figmaStyles.width) {
      webStyles.width = typeof figmaStyles.width === 'number' ? `${figmaStyles.width}px` : figmaStyles.width;
    }
    if (figmaStyles.height) {
      webStyles.height = typeof figmaStyles.height === 'number' ? `${figmaStyles.height}px` : figmaStyles.height;
    }
    if (figmaStyles.backgroundColor) {
      webStyles.backgroundColor = figmaStyles.backgroundColor;
    }
    if (figmaStyles.color) {
      webStyles.color = figmaStyles.color;
    }
    if (figmaStyles.fontSize) {
      webStyles.fontSize = typeof figmaStyles.fontSize === 'number' ? `${figmaStyles.fontSize}px` : figmaStyles.fontSize;
    }
    if (figmaStyles.fontWeight) {
      webStyles.fontWeight = figmaStyles.fontWeight;
    }
    if (figmaStyles.padding) {
      webStyles.padding = typeof figmaStyles.padding === 'number' ? `${figmaStyles.padding}px` : figmaStyles.padding;
    }
    if (figmaStyles.borderRadius) {
      webStyles.borderRadius = typeof figmaStyles.borderRadius === 'number' ? `${figmaStyles.borderRadius}px` : figmaStyles.borderRadius;
    }
    if (figmaStyles.boxShadow) {
      webStyles.boxShadow = figmaStyles.boxShadow;
    }
    if (figmaStyles.display) {
      webStyles.display = figmaStyles.display;
    }
    if (figmaStyles.flexDirection) {
      webStyles.flexDirection = figmaStyles.flexDirection;
    }
    if (figmaStyles.alignItems) {
      webStyles.alignItems = figmaStyles.alignItems;
    }
    if (figmaStyles.justifyContent) {
      webStyles.justifyContent = figmaStyles.justifyContent;
    }
    if (figmaStyles.gap) {
      webStyles.gap = typeof figmaStyles.gap === 'number' ? `${figmaStyles.gap}px` : figmaStyles.gap;
    }

    return webStyles;
  };

  // CSS 입력이 변경될 때마다 프리뷰 업데이트
  useEffect(() => {
    if (!isEnabled || !cssInput.trim()) {
      setPreviewStyles({});
      setError(null);
      return;
    }

    const updatePreview = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // CSS 문자열을 Figma 스타일로 변환
        const figmaStyles = processCssStyles(cssInput);
        
        // Figma 스타일을 웹 스타일로 변환
        const webStyles = convertToWebStyles(figmaStyles);
        
        setPreviewStyles(webStyles);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        setPreviewStyles({});
      } finally {
        setIsLoading(false);
      }
    };

    // 디바운스를 위한 타이머
    const timer = setTimeout(updatePreview, 300);
    return () => clearTimeout(timer);
  }, [cssInput, isEnabled]);

  // 프리뷰 컨텐츠 생성
  const previewContent = useMemo(() => {
    if (selectedElement?.type === 'TEXT') {
      return selectedElement.name || 'Sample Text';
    }
    if (selectedElement?.type === 'FRAME') {
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '12px', color: '#666' }}>Frame Preview</span>
        </div>
      );
    }
    return 'Live Preview';
  }, [selectedElement]);

  if (!isEnabled) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Live Preview</CardTitle>
            <Button variant="outline" size="sm" onClick={onToggle}>
              <Eye className="w-4 h-4 mr-1" />
              Enable
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-500 text-center py-8">
            Enable live preview to see CSS changes in real-time
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-sm font-medium">Live Preview</CardTitle>
            {isLoading && <RefreshCw className="w-3 h-3 animate-spin" />}
            {error && <Badge variant="destructive" className="text-xs">Error</Badge>}
          </div>
          <Button variant="outline" size="sm" onClick={onToggle}>
            <EyeOff className="w-4 h-4 mr-1" />
            Disable
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="text-sm text-red-500 p-4 bg-red-50 rounded border">
            <strong>Preview Error:</strong> {error}
          </div>
        ) : (
          <div className="border rounded p-4 bg-gray-50 min-h-[120px] flex items-center justify-center">
            <div
              style={{
                ...previewStyles,
                minWidth: '60px',
                minHeight: '30px',
                transition: 'all 0.2s ease-in-out'
              }}
              className="preview-element"
            >
              {previewContent}
            </div>
          </div>
        )}
        
        {/* 스타일 정보 표시 */}
        {Object.keys(previewStyles).length > 0 && (
          <div className="mt-3 p-3 bg-gray-100 rounded text-xs">
            <div className="font-medium mb-2">Applied Styles:</div>
            <div className="space-y-1">
              {Object.entries(previewStyles).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="text-gray-600">{key}:</span>
                  <span className="font-mono">{String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 
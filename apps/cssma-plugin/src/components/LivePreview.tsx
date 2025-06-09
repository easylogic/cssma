import React, { useEffect, useState, useMemo } from 'react';
import { processCssStyles } from 'cssma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, RefreshCw, X } from 'lucide-react';
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
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  alignItems?: string;
  justifyContent?: string;
  gap?: string;
  [key: string]: any;
}

export function LivePreview({ cssInput, selectedElement, isEnabled, onToggle }: LivePreviewProps) {
  const [previewStyles, setPreviewStyles] = useState<PreviewStyles>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rawFigmaStyles, setRawFigmaStyles] = useState<any>({});

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
      const validFlexDirections = ['row', 'column', 'row-reverse', 'column-reverse'];
      if (validFlexDirections.includes(figmaStyles.flexDirection)) {
        webStyles.flexDirection = figmaStyles.flexDirection as 'row' | 'column' | 'row-reverse' | 'column-reverse';
      }
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

  // nodeData를 재귀적으로 렌더링하는 함수
  const renderNodeData = (data: any, depth: number = 0): React.ReactNode => {
    if (!data) return null;

    const indent = '  '.repeat(depth);
    
    if (typeof data === 'object' && data !== null) {
      return (
        <div key={depth}>
          {Object.entries(data).map(([key, value]) => (
            <div key={key} className="text-xs">
              <span className="text-blue-600 font-mono">{indent}{key}:</span>
              {typeof value === 'object' && value !== null ? (
                <div className="ml-2">
                  {renderNodeData(value, depth + 1)}
                </div>
              ) : (
                <span className="text-gray-700 ml-1 font-mono">
                  {typeof value === 'string' ? `"${value}"` : String(value)}
                </span>
              )}
            </div>
          ))}
        </div>
      );
    }

    return (
      <span className="text-gray-700 font-mono text-xs">
        {typeof data === 'string' ? `"${data}"` : String(data)}
      </span>
    );
  };

  // CSS 입력이 변경될 때마다 프리뷰 업데이트
  useEffect(() => {
    if (!isEnabled || !cssInput.trim()) {
      setPreviewStyles({});
      setRawFigmaStyles({});
      setError(null);
      return;
    }

    const updatePreview = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // CSS 문자열을 Figma 스타일로 변환
        const figmaStyles = processCssStyles(cssInput);
        setRawFigmaStyles(figmaStyles);
        
        // Figma 스타일을 웹 스타일로 변환
        const webStyles = convertToWebStyles(figmaStyles);
        
        setPreviewStyles(webStyles);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
        setPreviewStyles({});
        setRawFigmaStyles({});
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

  // 토글 버튼만 반환 (활성화되지 않은 경우)
  if (!isEnabled) {
    return (
      <Button variant="outline" size="sm" onClick={onToggle}>
        <Eye className="w-4 h-4 mr-1" />
        Live Preview
      </Button>
    );
  }

  // 모달 형태로 전체 화면 오버레이
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-[95vw] h-[95vh] max-w-7xl flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gray-50 rounded-t-lg">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold">Live Preview</h2>
            {isLoading && <RefreshCw className="w-5 h-5 animate-spin text-blue-500" />}
            {error && <Badge variant="destructive">Error</Badge>}
            {!error && !isLoading && <Badge variant="default" className="bg-green-500">Active</Badge>}
          </div>
          <Button variant="ghost" size="sm" onClick={onToggle}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 p-6 overflow-hidden">
          {/* Main Preview Area - 큰 영역 */}
          <div className="w-full h-2/3 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 flex items-center justify-center mb-6">
            {error ? (
              <div className="text-center p-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-500 text-2xl">⚠️</span>
                </div>
                <h3 className="text-lg font-medium text-red-900 mb-2">Preview Error</h3>
                <p className="text-sm text-red-600 max-w-md">{error}</p>
              </div>
            ) : (
              <div
                style={{
                  ...previewStyles,
                  minWidth: '100px',
                  minHeight: '60px',
                  transition: 'all 0.3s ease-in-out'
                }}
                className="preview-element bg-white border border-gray-200 rounded-lg shadow-lg flex items-center justify-center text-lg"
              >
                {previewContent}
              </div>
            )}
          </div>

          {/* Bottom Section: nodeData and FigmaStyles - 모달 크기에 맞게 큰 영역 */}
          <div className="grid grid-cols-2 gap-8 h-1/3">
            {/* Left: nodeData */}
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                  NodeData
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full overflow-hidden">
                <div className="bg-gray-50 rounded-lg p-4 h-full overflow-y-auto">
                  {selectedElement ? (
                    <div className="text-sm font-mono">
                      {renderNodeData(selectedElement)}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 italic">
                      No element selected
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Right: FigmaStyles */}
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  Converted FigmaStyles
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full overflow-hidden">
                <div className="bg-gray-50 rounded-lg p-4 h-full overflow-y-auto">
                  {Object.keys(rawFigmaStyles).length > 0 ? (
                    <div className="text-sm font-mono">
                      {renderNodeData(rawFigmaStyles)}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 italic">
                      {cssInput.trim() ? 'Processing...' : 'Enter CSS to see converted styles'}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import examples from './examples';
import './index.css';

// 예제 타입 정의
type ExampleComponents = {
  [key: string]: any;
};

function App() {
  const [activeTab, setActiveTab] = useState('converter');
  const [cssInput, setCssInput] = useState('');
  const [componentSpec, setComponentSpec] = useState('');
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [selectedExample, setSelectedExample] = useState('custom');

  // 예제 로드
  const loadExample = (exampleKey: string) => {
    // 'custom'은 직접 입력 옵션
    if (exampleKey === 'custom') {
      // 기존 컴포넌트 스펙 유지 또는 초기화
      setComponentSpec('');
      return;
    }
    
    // 예제 컴포넌트 로드
    if (exampleKey && (examples as ExampleComponents)[exampleKey]) {
      setComponentSpec(JSON.stringify((examples as ExampleComponents)[exampleKey], null, 2));
    }
  };

  // 예제 선택 변경 시 로드
  useEffect(() => {
    if (selectedExample) {
      loadExample(selectedExample);
    }
  }, [selectedExample]);

  // 플러그인 메시지 핸들러
  useEffect(() => {
    window.onmessage = (event) => {
      const message = event.data.pluginMessage;
      
      if (!message) return;
      
      console.log('Received message:', message);
      
      if (message.type === 'show-converter') {
        setActiveTab('converter');
      } else if (message.type === 'show-component-creator') {
        setActiveTab('component');
      } else if (message.type === 'selection-change') {
        setSelectedElement(message.message);
      } else if (message.type === 'analysis-result') {
        // 트리 모드인지 확인
        const isTreeMode = message.isTreeMode;
        
        // 결과 포맷 처리
        if (isTreeMode) {
          // 트리 구조 결과 처리
          const formattedResult = formatTreeResult(message.message);
          setComponentSpec(formattedResult);
        } else {
          // 일반 결과 처리 (여러 노드)
          setComponentSpec(JSON.stringify(message.message, null, 2));
        }
        
        // 컴포넌트 탭으로 전환
        setActiveTab('component');
      }
    };
    
    // 초기 선택 정보 요청
    parent.postMessage({ pluginMessage: { type: 'init' } }, '*');
    
    return () => { window.onmessage = null; };
  }, []);
  
  // 트리 구조 결과를 보기 좋게 포맷팅
  const formatTreeResult = (node: any) => {
    // 노드 정보를 정리 (불필요한 depth 정보 등 제거)
    const cleanNode = (node: any) => {
      const { depth, children, ...rest } = node;
      const cleanedNode = { ...rest };
      
      if (children && children.length > 0) {
        cleanedNode.children = children.map(cleanNode);
      }
      
      return cleanedNode;
    };
    
    // 결과 포맷팅
    return JSON.stringify(cleanNode(node), null, 2);
  };

  // CSS/Tailwind 스타일 적용
  const applyStyles = () => {
    parent.postMessage({
      pluginMessage: {
        type: 'apply-styles',
        cssInput
      }
    }, '*');
  };

  // 디자인 선택 분석
  const analyzeSelection = () => {
    parent.postMessage({
      pluginMessage: {
        type: 'analyze-selection'
      }
    }, '*');
  };

  // 컴포넌트 생성
  const createComponent = () => {
    try {
      const spec = JSON.parse(componentSpec);
      parent.postMessage({
        pluginMessage: {
          type: 'create-component',
          componentSpec: spec
        }
      }, '*');
    } catch (error) {
      console.error('Invalid JSON:', error);
      alert('JSON 형식이 올바르지 않습니다.');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white text-[#333333] overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-[#E5E5E5]">
          <TabsList className="h-10 w-full justify-start bg-transparent px-2 gap-1">
            <TabsTrigger 
              value="converter" 
              className="h-9 px-4 text-sm data-[state=active]:bg-[#F5F5F5] rounded-md"
            >
              CSS 변환기
            </TabsTrigger>
            <TabsTrigger 
              value="component" 
              className="h-9 px-4 text-sm data-[state=active]:bg-[#F5F5F5] rounded-md"
            >
              컴포넌트 생성
            </TabsTrigger>
          </TabsList>
        </div>

        {/* CSS 변환기 탭 */}
        <TabsContent value="converter" className="flex-1 overflow-auto p-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">CSS-to-Figma 변환</CardTitle>
              <CardDescription>
                Tailwind CSS 또는 일반 CSS를 Figma 스타일로 변환합니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedElement ? (
                <div className="space-y-4">
                  <div>
                    <Label>선택된 요소</Label>
                    <div className="p-2 bg-slate-100 rounded text-sm">
                      {selectedElement.name} ({selectedElement.type})
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="css-input">Tailwind CSS 또는 CSS 코드</Label>
                    <Textarea
                      id="css-input"
                      value={cssInput}
                      onChange={(e) => setCssInput(e.target.value)}
                      placeholder="예: flex-col bg-white p-4 rounded-lg"
                      className="min-h-[150px]"
                    />
                  </div>
                </div>
              ) : (
                <div className="p-4 text-center border border-dashed rounded-lg">
                  Figma 캔버스에서 요소를 선택해주세요
                </div>
              )}
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" onClick={analyzeSelection}>
                선택 요소 분석
              </Button>
              <Button onClick={applyStyles} disabled={!selectedElement || !cssInput || cssInput.trim() === ''}>
                스타일 적용
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* 컴포넌트 생성 탭 */}
        <TabsContent value="component" className="flex-1 overflow-auto p-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">컴포넌트 생성</CardTitle>
              <CardDescription>
                JSON 스펙으로 Figma 컴포넌트를 생성합니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="example-select">예제 컴포넌트</Label>
                  <Select value={selectedExample} onValueChange={setSelectedExample}>
                    <SelectTrigger>
                      <SelectValue placeholder="예제 선택..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="custom">직접 입력</SelectItem>
                      <SelectItem value="button">버튼</SelectItem>
                      <SelectItem value="card">카드</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="component-spec">컴포넌트 JSON 스펙</Label>
                  <Textarea
                    id="component-spec"
                    value={componentSpec}
                    onChange={(e) => setComponentSpec(e.target.value)}
                    placeholder='{"type": "FRAME", "name": "Button", "styles": "flex-row bg-blue-500 p-[16] rounded-lg", ...}'
                    className="min-h-[250px] font-mono text-xs"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" onClick={analyzeSelection}>
                선택 요소에서 JSON 생성
              </Button>
              <Button onClick={createComponent} disabled={!componentSpec.trim()}>
                컴포넌트 생성
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

window.onload = () => {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
};
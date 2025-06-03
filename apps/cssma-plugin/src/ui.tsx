import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ComponentEditor } from './components/ComponentEditor';
import { CssConverter } from './components/CssConverter';
import { AITab } from './components/tool/ai-tab';
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
    if (exampleKey === 'custom') {
      setComponentSpec('');
      return;
    }
    
    if (exampleKey && (examples as ExampleComponents)[exampleKey]) {
      setComponentSpec(JSON.stringify((examples as ExampleComponents)[exampleKey], null, 2));
    }
  };

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
        const isTreeMode = message.isTreeMode;
        
        if (isTreeMode) {
          const formattedResult = formatTreeResult(message.message);
          setComponentSpec(formattedResult);
        } else {
          setComponentSpec(JSON.stringify(message.message, null, 2));
        }
        
        setActiveTab('component');
      }
    };
    
    parent.postMessage({ pluginMessage: { type: 'init' } }, '*');
    
    return () => { window.onmessage = null; };
  }, []);
  
  const formatTreeResult = (node: any) => {
    const cleanNode = (node: any) => {
      const { depth, children, ...rest } = node;
      const cleanedNode = { ...rest };
      
      if (children && children.length > 0) {
        cleanedNode.children = children.map(cleanNode);
      }
      
      return cleanedNode;
    };
    
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
      alert('JSON format is incorrect.');
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
              CSS Converter
            </TabsTrigger>
            <TabsTrigger 
              value="component" 
              className="h-9 px-4 text-sm data-[state=active]:bg-[#F5F5F5] rounded-md"
            >
              Component Creator
            </TabsTrigger>
            <TabsTrigger 
              value="ai" 
              className="h-9 px-4 text-sm data-[state=active]:bg-[#F5F5F5] rounded-md"
            >
              AI Generator
            </TabsTrigger>
          </TabsList>
        </div>

        {/* CSS 변환기 탭 */}
        <TabsContent value="converter" className="flex-1 overflow-auto p-4">
          <CssConverter
            selectedElement={selectedElement}
            cssInput={cssInput}
            onCssInputChange={setCssInput}
            onAnalyzeSelection={analyzeSelection}
            onApplyStyles={applyStyles}
          />
        </TabsContent>

        {/* 컴포넌트 생성 탭 */}
        <TabsContent value="component" className="flex-1 overflow-auto p-4">
          <ComponentEditor
            selectedExample={selectedExample}
            componentSpec={componentSpec}
            onExampleChange={setSelectedExample}
            onSpecChange={setComponentSpec}
            onAnalyzeSelection={analyzeSelection}
            onCreateComponent={createComponent}
          />
        </TabsContent>

        {/* AI 생성 탭 */}
        <TabsContent value="ai" className="flex-1 overflow-hidden">
          <AITab />
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
import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GenerateTab } from '@/components/tool/generate-tab';
import './index.css';
import { AITab } from './components/tool/ai-tab';

function App() {

  const handleDesignSystem = () => {
    parent.postMessage({ 
      pluginMessage: { 
        type: 'create-design-system'
      } 
    }, '*');
  };

  useEffect(() => {
    window.onmessage = (event) => {
      const message = event.data.pluginMessage;
      console.log(message);
    };
    return () => { window.onmessage = null; };
  });

  return (
    <div className="flex flex-col h-screen bg-white text-[#333333] overflow-hidden">
      <Tabs defaultValue="ai" className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b border-[#E5E5E5]">
          <TabsList className="h-8 w-full justify-start bg-transparent px-2 gap-1">
            <TabsTrigger 
              value="generate" 
              className="h-7 px-3 text-xs data-[state=active]:bg-[#F5F5F5] rounded-none"
            >
              Create Design system
            </TabsTrigger>
            <TabsTrigger 
              value="ai" 
              className="h-7 px-3 text-xs data-[state=active]:bg-[#F5F5F5] rounded-none"
            >
              AI Design
            </TabsTrigger>
            
          </TabsList>
        </div>

        <TabsContent value="generate" className="flex-1 overflow-hidden">
          <GenerateTab onCreateRectangle={handleDesignSystem} />
        </TabsContent>
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
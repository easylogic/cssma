import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GenerateTab } from '@/components/tool/generate-tab';
import './index.css';

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
    <div className="flex flex-col h-screen bg-white text-[#333333]">
      <Tabs defaultValue="generate" className="flex-1 flex flex-col">
        <div className="border-b border-[#E5E5E5]">
          <TabsList className="h-8 w-full justify-start bg-transparent px-2 gap-1">
            <TabsTrigger 
              value="generate" 
              className="h-7 px-3 text-xs data-[state=active]:bg-[#F5F5F5] rounded-none"
            >
              Create Design system
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="generate" className="flex-1">
          <GenerateTab onCreateRectangle={handleDesignSystem} />
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
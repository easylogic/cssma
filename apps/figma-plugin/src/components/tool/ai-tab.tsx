import { ChatUI } from '../ChatUI';
import { generateDesign } from '../../services/anthropic';
import { useState } from 'react';
import sample from './sample.json';
import mobileShop from './mobile-shop.json';
import eLearning from './e-learning.json';
import healthWellness from './health-wellness.json';
import mobileFinance from './mobile-finance.json';
import musicStreaming from './music-streaming.json';
import productivityDashboard from './productivity-dashboard.json';
import recipePlanner from './recipe-planner.json';
import smartHome from './smart-home.json';
import socialAnalytics from './social-analytics.json';
import travelBooking from './travel-booking.json';
import cardSamples from './card-samples.json';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const list = [
  {
    name: 'card-samples',
    designSpec: cardSamples
  },
  {
    name: 'sample',
    designSpec: sample
  },
  {
    name: 'mobile-shop',
    designSpec: mobileShop
  },
  {
    name: 'e-learning',
    designSpec: eLearning
  },
    {
      name: 'health-wellness',
      designSpec: healthWellness
    },
  {
    name: 'mobile-finance',
    designSpec: mobileFinance
  },
  {
    name: 'music-streaming',
    designSpec: musicStreaming
  },
  {
    name: 'productivity-dashboard',
    designSpec: productivityDashboard
  },
  {
    name: 'recipe-planner',
    designSpec: recipePlanner
  },
  {
    name: 'smart-home',
    designSpec: smartHome
  },
  {
    name: 'social-analytics',
    designSpec: socialAnalytics
  },
  {
    name: 'travel-booking',
    designSpec: travelBooking
  }
]

export const AITab: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSendMessage = async (message: string) => {
    setIsGenerating(true);
    try {
      // AI로부터 디자인 스펙 생성
      const designSpec = await generateDesign(message);
      
      // Figma 플러그인 메시지 형식으로 전송
      parent.postMessage({
        pluginMessage: {
          type: 'create-design',
          designSpec: [{...designSpec, name: 'ai sample'}]
        }
      }, '*');

    } catch (error) {
      console.error('Error generating design:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDesignChange = (value: string) => {
    console.log('Selected design:', value);
    const design = list.find(item => item.name === value);
    if (design) {
      console.log('Selected design:', design.designSpec);
      parent.postMessage({
        pluginMessage: {
          type: 'create-design',
          designSpec: [design]
        }
      }, '*');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Select 영역 */}
      <div className="flex-none border-b border-border">
        <div className="p-4">
          <Select onValueChange={handleDesignChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="디자인 선택" />
            </SelectTrigger>
            <SelectContent>
              {list.map((design) => (
                <SelectItem key={design.name} value={design.name}>
                  <div className="flex flex-col">
                    <span className="font-medium">{design.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Chat UI 영역 */}
      <div className="flex-1 overflow-hidden">
        <ChatUI onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}; 
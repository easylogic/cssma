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
import badge from '../../examples/badge.json';
import progress from '../../examples/progress.json';
import statsCards from '../../examples/stats-cards.json';
import navigation from '../../examples/navigation.json';
import featureCards from '../../examples/feature-cards.json';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';

const list = [
  {
    name: 'Basic Components',
    children: [
      {
        name: 'badge',
        displayName: 'Badge Components',
        designSpec: badge
      },
      {
        name: 'progress',
        displayName: 'Progress Bars',
        designSpec: progress
      },
      {
        name: 'navigation',
        displayName: 'Navigation Menus',
        designSpec: navigation
      },
      {
        name: 'feature-cards',
        displayName: 'Feature Cards',
        designSpec: featureCards
      },
      {
        name: 'stats-cards',
        displayName: 'Statistics Cards',
        designSpec: statsCards
      }
    ]
  },
  {
    name: 'Sample Designs',
    children: [
      {
        name: 'card-samples',
        displayName: 'Card Samples',
        designSpec: cardSamples
      },
      {
        name: 'sample',
        displayName: 'Basic Sample',
        designSpec: sample
      }
    ]
  },
  {
    name: 'Mobile Apps',
    children: [
      {
        name: 'mobile-shop',
        displayName: 'Mobile Shop',
        designSpec: mobileShop
      },
      {
        name: 'mobile-finance',
        displayName: 'Mobile Finance',
        designSpec: mobileFinance
      }
    ]
  },
  {
    name: 'Web Applications',
    children: [
      {
        name: 'e-learning',
        displayName: 'E-Learning Platform',
        designSpec: eLearning
      },
      {
        name: 'health-wellness',
        displayName: 'Health & Wellness',
        designSpec: healthWellness
      },
      {
        name: 'music-streaming',
        displayName: 'Music Streaming',
        designSpec: musicStreaming
      },
      {
        name: 'productivity-dashboard',
        displayName: 'Productivity Dashboard',
        designSpec: productivityDashboard
      },
      {
        name: 'recipe-planner',
        displayName: 'Recipe Planner',
        designSpec: recipePlanner
      },
      {
        name: 'smart-home',
        displayName: 'Smart Home',
        designSpec: smartHome
      },
      {
        name: 'social-analytics',
        displayName: 'Social Analytics',
        designSpec: socialAnalytics
      },
      {
        name: 'travel-booking',
        displayName: 'Travel Booking',
        designSpec: travelBooking
      }
    ]
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
    // 모든 카테고리에서 디자인 찾기
    let selectedDesign = null;
    
    for (const category of list) {
      const design = category.children.find(item => item.name === value);
      if (design) {
        selectedDesign = design;
        break;
      }
    }
    
    if (selectedDesign) {
      console.log('Selected design:', selectedDesign.designSpec);
      parent.postMessage({
        pluginMessage: {
          type: 'create-design',
          designSpec: [selectedDesign]
        }
      }, '*');
    }
  };

  const handleAnalyze = () => {
    parent.postMessage({
      pluginMessage: {
        type: 'analyze-design',
      }
    }, '*');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Select 영역 */}
      <div className="flex-none flex flex-row gap-1 border-b border-border">
        <div className="p-4 flex-1">
          <Select onValueChange={handleDesignChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="디자인 선택" />
            </SelectTrigger>
            <SelectContent>
              {list.map((category) => (
                <div key={category.name}>
                  <div className="px-2 py-1 text-xs font-medium text-gray-500 uppercase">
                    {category.name}
                  </div>
                  {category.children.map((design) => (
                    <SelectItem key={design.name} value={design.name}>
                      <div className="flex flex-col">
                        <span className="font-medium">{design.displayName}</span>
                      </div>
                    </SelectItem>
                  ))}
                </div>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="p-4">
          <Button variant="outline" className="w-full" onClick={handleAnalyze}>
            <span>분석</span>
          </Button>
        </div>
      </div>

      {/* Chat UI 영역 */}
      <div className="flex-1 overflow-hidden">
        <ChatUI onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}; 
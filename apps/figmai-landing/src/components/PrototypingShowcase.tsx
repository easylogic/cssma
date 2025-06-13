"use client";

import { useState } from 'react';
import { 
  parseStyles, 
  convertStylesToFigma,
  generatePrototypingInfo,
  FigmaReaction,
  FigmaTransition 
} from 'cssma';

interface PrototypeExample {
  name: string;
  classes: string;
  description: string;
  expectedReactions: string[];
}

const prototypingExamples: PrototypeExample[] = [
  {
    name: 'Hover Button',
    classes: 'transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-600 bg-blue-500 px-4 py-2 rounded',
    description: 'Smooth hover animation with scale and color change',
    expectedReactions: ['ON_HOVER trigger', 'SMART_ANIMATE transition', '300ms duration']
  },
  {
    name: 'Click Animation',
    classes: 'animate-pulse bg-red-500 rounded-full w-12 h-12',
    description: 'Pulsing animation triggered by click',
    expectedReactions: ['ON_CLICK trigger', 'Pulse animation', 'Infinite duration']
  },
  {
    name: 'Delayed Transition',
    classes: 'transition-opacity duration-500 delay-200 ease-out opacity-0 hover:opacity-100',
    description: 'Fade in with delay on hover',
    expectedReactions: ['ON_HOVER trigger', 'DISSOLVE transition', '200ms delay']
  },
  {
    name: 'Complex Animation',
    classes: 'transition-transform duration-700 ease-in-out hover:rotate-180 hover:scale-110 bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16',
    description: 'Rotation and scale with gradient background',
    expectedReactions: ['ON_HOVER trigger', 'SMART_ANIMATE', 'Transform properties']
  }
];

export default function PrototypingShowcase() {
  const [selectedExample, setSelectedExample] = useState(0);
  const [analysisResults, setAnalysisResults] = useState<any>(null);

  const analyzeExample = (classes: string) => {
    try {
      const parsedStyles = parseStyles(classes);
      const figmaProperties = convertStylesToFigma(parsedStyles);
      const prototyping = generatePrototypingInfo(parsedStyles);
      
      setAnalysisResults({
        figmaProperties,
        prototyping
      });
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalysisResults({ error: 'Failed to analyze styles' });
    }
  };

  const currentExample = prototypingExamples[selectedExample];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎬 Figma Prototyping Integration
        </h1>
        <p className="text-xl text-gray-600">
          Convert CSS animations to Figma prototype reactions automatically
        </p>
      </div>

      {/* Example Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {prototypingExamples.map((example, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedExample(index);
              analyzeExample(example.classes);
            }}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedExample === index
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <h3 className="font-semibold text-gray-900 mb-2">{example.name}</h3>
            <p className="text-sm text-gray-600">{example.description}</p>
          </button>
        ))}
      </div>

      {/* Current Example Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            🎨 Live Preview
          </h3>
          
          {/* Preview Element */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex items-center justify-center mb-4">
            <div className={currentExample.classes}>
              {currentExample.name.includes('Button') ? 'Hover Me' : ''}
            </div>
          </div>

          {/* CSS Classes */}
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
            <code>{currentExample.classes}</code>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            ⚡ Figma Reactions Generated
          </h3>

          {analysisResults && !analysisResults.error ? (
            <div className="space-y-4">
              {/* Generated Reactions */}
              {analysisResults.prototyping.reactions.map((reaction: FigmaReaction, index: number) => (
                <div key={index} className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-purple-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Reaction {index + 1}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Trigger:</span>
                      <div className="text-purple-600 font-mono">{reaction.trigger.type}</div>
                    </div>
                    
                    <div>
                      <span className="font-medium text-gray-700">Action:</span>
                      <div className="text-purple-600 font-mono">{reaction.action?.type || 'N/A'}</div>
                    </div>
                    
                    {reaction.action?.transition && (
                      <>
                        <div>
                          <span className="font-medium text-gray-700">Transition:</span>
                          <div className="text-purple-600 font-mono">{reaction.action.transition.type}</div>
                        </div>
                        
                        <div>
                          <span className="font-medium text-gray-700">Duration:</span>
                          <div className="text-purple-600 font-mono">{reaction.action.transition.duration}s</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}

              {/* Recommendations */}
              {analysisResults.prototyping.recommendations.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">💡 Recommendations</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    {analysisResults.prototyping.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-2">🔍</div>
              <p className="text-gray-500">
                Select an example to see generated Figma reactions
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Feature Comparison */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          ✨ CSS vs Figma Prototyping Mapping
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">CSS Transitions</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• hover: → ON_HOVER trigger</li>
              <li>• transition-duration → duration</li>
              <li>• ease-in-out → EASE_IN_AND_OUT</li>
              <li>• transform → SMART_ANIMATE</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">CSS Animations</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• animate-pulse → ON_CLICK</li>
              <li>• animate-spin → continuous</li>
              <li>• @keyframes → SMART_ANIMATE</li>
              <li>• animation-delay → timeout</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Figma Benefits</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• Native prototype mode</li>
              <li>• Device testing</li>
              <li>• Stakeholder sharing</li>
              <li>• Advanced interactions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Usage Example */}
      <div className="mt-8 bg-gray-900 text-gray-100 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">🛠️ Usage in Code</h3>
        <pre className="text-sm overflow-x-auto">
{`import { convertStylesToFigmaWithPrototyping } from 'cssma';

const result = convertStylesToFigmaWithPrototyping(parsedStyles);

// Apply to Figma node
await node.setReactionsAsync(result.prototyping.reactions);

// Or use in plugin
figma.ui.postMessage({
  type: 'APPLY_PROTOTYPING',
  reactions: result.prototyping.reactions
});`}
        </pre>
      </div>
    </div>
  );
} 
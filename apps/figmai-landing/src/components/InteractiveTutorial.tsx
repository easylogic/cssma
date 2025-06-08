"use client";

import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle, 
  Circle, 
  Play, 
  RotateCcw,
  Lightbulb,
  Target,
  Trophy,
  BookOpen,
  Code2,
  Palette
} from 'lucide-react';
import { parseStyles, convertStylesToFigma } from 'cssma';

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  instruction: string;
  expectedInput: string;
  expectedOutput: any;
  hint: string;
  category: 'basics' | 'intermediate' | 'advanced';
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "Basic Button Styling",
    description: "Learn how to create a simple button with Tailwind CSS classes",
    instruction: "Create a blue button with padding and rounded corners. Use the classes: 'bg-blue-500 px-4 py-2 rounded-lg text-white'",
    expectedInput: "bg-blue-500 px-4 py-2 rounded-lg text-white",
    expectedOutput: {
      backgroundColor: "#3b82f6",
      paddingLeft: "16px",
      paddingRight: "16px",
      paddingTop: "8px",
      paddingBottom: "8px",
      borderRadius: "8px",
      color: "#ffffff"
    },
    hint: "Remember: bg-blue-500 sets the background color, px-4 py-2 sets padding, rounded-lg adds border radius",
    category: 'basics'
  },
  {
    id: 2,
    title: "Flexbox Layout",
    description: "Master flexbox layouts with Tailwind CSS",
    instruction: "Create a flex container that centers items both horizontally and vertically. Use: 'flex items-center justify-center'",
    expectedInput: "flex items-center justify-center",
    expectedOutput: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    hint: "flex enables flexbox, items-center centers vertically, justify-center centers horizontally",
    category: 'basics'
  },
  {
    id: 3,
    title: "Card Component",
    description: "Build a card component with shadow and border",
    instruction: "Create a card with white background, shadow, border, and padding. Use: 'bg-white shadow-lg border border-gray-200 p-6 rounded-xl'",
    expectedInput: "bg-white shadow-lg border border-gray-200 p-6 rounded-xl",
    expectedOutput: {
      backgroundColor: "#ffffff",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      borderWidth: "1px",
      borderColor: "#e5e7eb",
      padding: "24px",
      borderRadius: "12px"
    },
    hint: "shadow-lg creates a large shadow, border adds a border, p-6 adds padding on all sides",
    category: 'intermediate'
  },
  {
    id: 4,
    title: "Responsive Grid",
    description: "Create responsive grid layouts",
    instruction: "Create a responsive grid with 1 column on mobile, 2 on tablet, 3 on desktop. Use: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'",
    expectedInput: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
    expectedOutput: {
      display: "grid",
      gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
      gap: "16px"
    },
    hint: "grid enables CSS Grid, grid-cols-* sets column count, md: and lg: are responsive prefixes",
    category: 'intermediate'
  },
  {
    id: 5,
    title: "Advanced Animation",
    description: "Add hover effects and transitions",
    instruction: "Create a button with hover effects and smooth transitions. Use: 'bg-purple-500 hover:bg-purple-600 transform hover:scale-105 transition-all duration-300'",
    expectedInput: "bg-purple-500 hover:bg-purple-600 transform hover:scale-105 transition-all duration-300",
    expectedOutput: {
      backgroundColor: "#8b5cf6",
      transform: "scale(1)",
      transitionProperty: "all",
      transitionDuration: "300ms"
    },
    hint: "hover: prefix applies styles on hover, transform enables transforms, transition-all animates all properties",
    category: 'advanced'
  }
];

export default function InteractiveTutorial() {
  const [currentStep, setCurrentStep] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [output, setOutput] = useState<any>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const currentTutorialStep = tutorialSteps[currentStep];

  useEffect(() => {
    // Reset state when step changes
    setUserInput('');
    setIsCorrect(false);
    setShowHint(false);
    setOutput(null);
  }, [currentStep]);

  const checkAnswer = () => {
    try {
      const styles = parseStyles(userInput.trim());
      setOutput(styles);
      
      // Simple check - in real implementation, you'd want more sophisticated comparison
      const isInputCorrect = userInput.trim().toLowerCase() === currentTutorialStep.expectedInput.toLowerCase();
      setIsCorrect(isInputCorrect);
      
      if (isInputCorrect && !completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2000);
      }
    } catch (error) {
      setOutput({ error: 'Invalid CSS classes' });
      setIsCorrect(false);
    }
  };

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetStep = () => {
    setUserInput('');
    setIsCorrect(false);
    setShowHint(false);
    setOutput(null);
  };

  const loadExample = () => {
    setUserInput(currentTutorialStep.expectedInput);
  };

  const progressPercentage = ((completedSteps.length) / tutorialSteps.length) * 100;

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Interactive Tutorial</h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Trophy className="w-4 h-4" />
              <span>{completedSteps.length}/{tutorialSteps.length} completed</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {/* Step Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {tutorialSteps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  index === currentStep
                    ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-300'
                    : completedSteps.includes(index)
                    ? 'bg-green-100 text-green-700 border-2 border-green-300'
                    : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-gray-300'
                }`}
              >
                {completedSteps.includes(index) ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <Circle className="w-4 h-4" />
                )}
                <span>Step {step.id}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Celebration Animation */}
        {showCelebration && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
            <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                <span className="font-medium">Great job! Step completed!</span>
              </div>
            </div>
          </div>
        )}

        {/* Main Tutorial Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Instructions */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-3 h-3 rounded-full ${
                currentTutorialStep.category === 'basics' ? 'bg-green-500' :
                currentTutorialStep.category === 'intermediate' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                {currentTutorialStep.category}
              </span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              {currentTutorialStep.title}
            </h3>
            
            <p className="text-gray-600 mb-6">
              {currentTutorialStep.description}
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-2">
                <Target className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Your Task:</h4>
                  <p className="text-blue-800 text-sm">{currentTutorialStep.instruction}</p>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter Tailwind CSS classes:
              </label>
              <div className="relative">
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type your Tailwind CSS classes here..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={checkAnswer}
                disabled={!userInput.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Play className="w-4 h-4" />
                Check Answer
              </button>
              
              <button
                onClick={loadExample}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Code2 className="w-4 h-4" />
                Load Example
              </button>
              
              <button
                onClick={resetStep}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>

            {/* Hint */}
            {showHint && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-yellow-900 mb-1">Hint:</h4>
                    <p className="text-yellow-800 text-sm">{currentTutorialStep.hint}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowHint(!showHint)}
              className="text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
              
              <button
                onClick={nextStep}
                disabled={currentStep === tutorialSteps.length - 1}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Panel - Preview & Output */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Live Preview & Output
            </h3>

            {/* Visual Preview */}
            {userInput && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Visual Preview:</h4>
                <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                  <div className={`inline-block ${userInput}`}>
                    Sample Element
                  </div>
                </div>
              </div>
            )}

            {/* Result Status */}
            {output && (
              <div className="mb-6">
                <div className={`flex items-center gap-2 mb-3 ${
                  isCorrect ? 'text-green-600' : 'text-red-600'
                }`}>
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                  <span className="font-medium">
                    {isCorrect ? 'Correct! Well done!' : 'Not quite right, try again!'}
                  </span>
                </div>
              </div>
            )}

            {/* CSS Output */}
            {output && !output.error && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Generated CSS:</h4>
                <div className="bg-gray-900 text-gray-100 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                  <pre>{JSON.stringify(output, null, 2)}</pre>
                </div>
              </div>
            )}

            {/* Error Display */}
            {output && output.error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-red-800 text-sm">{output.error}</div>
              </div>
            )}

            {/* Expected Output (for reference) */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Expected Output:</h4>
              <div className="bg-gray-100 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <pre>{JSON.stringify(currentTutorialStep.expectedOutput, null, 2)}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Completion Message */}
        {completedSteps.length === tutorialSteps.length && (
          <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-8 text-center">
            <Trophy className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Congratulations! 🎉
            </h3>
            <p className="text-gray-600 mb-6">
              You've completed all tutorial steps! You're now ready to use CSSMA like a pro.
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Try Advanced Examples
              </button>
              <button className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
                Share Your Progress
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
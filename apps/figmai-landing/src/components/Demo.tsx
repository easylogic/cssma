"use client";

import {
  TrendingUp,
  Clock,
  Star,
  Users,
  ArrowRight,
  Copy,
  RefreshCw,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { 
  parseStyles, 
  convertStylesToFigma,
  generateReactComponent,
  generateVueComponent,
  generateAngularComponent,
  generateCSS
} from "cssma";

export default function Demo() {
  const [outputTab, setOutputTab] = useState<"figma" | "react" | "vue" | "angular" | "css">("figma");
  const [cssInput, setCssInput] = useState(
    JSON.stringify({
      type: "FRAME",
      name: "Button",
      styles: "flex items-center justify-center px-4 py-2 bg-blue-500 rounded-lg",
      children: [
        {
          type: "TEXT",
          name: "Button Text",
          styles: "text-sm font-medium text-white",
          text: "Click me",
        },
      ],
    }, null, 2)
  );
  const [output, setOutput] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<
    (typeof examplePresets)[0] | null
  >(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted on client side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const examplePresets = [
    {
      name: "Card Component",
      nodeData: {
        type: "FRAME",
        name: "Card",
        styles:
          "flex flex-col bg-white rounded-lg p-4 gap-3 border border-gray-200 shadow-sm",
        children: [
          {
            type: "TEXT",
            name: "Title",
            styles: "text-lg font-semibold text-gray-900",
            text: "Card Title",
          },
          {
            type: "TEXT",
            name: "Description",
            styles: "text-sm text-gray-600",
            text: "This is a card description with some sample text.",
          },
        ],
      },
      color: "purple",
    },
    {
      name: "Button",
      nodeData: {
        type: "FRAME",
        name: "Button",
        styles:
          "flex items-center justify-center px-4 py-2 bg-blue-500 rounded-lg",
        children: [
          {
            type: "TEXT",
            name: "Button Text",
            styles: "text-sm font-medium text-white",
            text: "Click me",
          },
        ],
      },
      color: "blue",
    },
    {
      name: "Profile Card",
      nodeData: {
        type: "FRAME",
        name: "Profile Card",
        styles:
          "flex-col items-center bg-white rounded-xl p-6 shadow-lg border border-gray-100",
        children: [
          {
            type: "ELLIPSE",
            name: "Avatar",
            styles: "w-16 h-16 bg-gray-300",
          },
          {
            type: "FRAME",
            name: "Info",
            styles: "flex-col items-center gap-1 mt-4",
            children: [
              {
                type: "TEXT",
                name: "Name",
                styles: "text-lg font-semibold text-gray-900",
                text: "John Doe",
              },
              {
                type: "TEXT",
                name: "Role",
                styles: "text-sm text-gray-500",
                text: "Software Engineer",
              },
            ],
          },
          {
            type: "FRAME",
            name: "Actions",
            styles: "flex gap-2 mt-4",
            children: [
              {
                type: "FRAME",
                name: "Follow Button",
                styles:
                  "flex items-center justify-center px-4 py-2 bg-blue-500 rounded-lg",
                children: [
                  {
                    type: "TEXT",
                    name: "Follow Text",
                    styles: "text-sm font-medium text-white",
                    text: "Follow",
                  },
                ],
              },
              {
                type: "FRAME",
                name: "Message Button",
                styles:
                  "flex items-center justify-center px-4 py-2 bg-gray-100 rounded-lg border border-gray-300",
                children: [
                  {
                    type: "TEXT",
                    name: "Message Text",
                    styles: "text-sm font-medium text-gray-700",
                    text: "Message",
                  },
                ],
              },
            ],
          },
        ],
      },
      color: "green",
    },
    {
      name: "Toast Notification",
      nodeData: {
        type: "FRAME",
        name: "Toast",
        styles:
          "flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg",
        children: [
          {
            type: "FRAME",
            name: "Icon Container",
            styles:
              "flex items-center justify-center w-6 h-6 bg-green-500 rounded-full",
            children: [
              {
                type: "TEXT",
                name: "Check Icon",
                styles: "text-white text-xs",
                text: "✓",
              },
            ],
          },
          {
            type: "FRAME",
            name: "Content",
            styles: "flex flex-col gap-1",
            children: [
              {
                type: "TEXT",
                name: "Title",
                styles: "text-sm font-medium text-green-900",
                text: "Success!",
              },
              {
                type: "TEXT",
                name: "Message",
                styles: "text-sm text-green-700",
                text: "Your changes have been saved successfully.",
              },
            ],
          },
        ],
      },
      color: "red",
    },
  ];

  const makerStats = [
    {
      icon: TrendingUp,
      value: "10x",
      label: "Faster Development",
      description: "From design to deployment",
    },
    {
      icon: Clock,
      value: "2hrs",
      label: "Average Project Time",
      description: "Concept to MVP",
    },
    {
      icon: Star,
      value: "98%",
      label: "Code Quality Score",
      description: "Production-ready output",
    },
    {
      icon: Users,
      value: "50K+",
      label: "Active Makers",
      description: "Growing community",
    },
  ];

  const makerStories = [
    {
      name: "Sarah Chen",
      role: "Product Designer → Full-Stack Maker",
      company: "Former Airbnb",
      story:
        "I went from struggling with CSS to shipping complete apps in days. Figm.ai transformed my career from designer to full-stack maker.",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b950?w=64&h=64&fit=crop&crop=face",
      metrics: { projects: 12, saves: "300+ hours" },
    },
    {
      name: "Alex Rodriguez",
      role: "Frontend Engineer → Indie Maker",
      company: "Ex-Netflix",
      story:
        "The speed of converting Figma designs to perfect CSS is incredible. I've built 5 SaaS products this year alone.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      metrics: { revenue: "$50K MRR", products: 5 },
    },
    {
      name: "Maria Santos",
      role: "UX Designer → No-Code Founder",
      company: "Design Systems Lead",
      story:
        "Building our design system with Figm.ai saved months of development time. Our team velocity increased 5x.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      metrics: { team: "20+ devs", efficiency: "5x faster" },
    },
  ];

  // Convert NodeData to different formats
  const convertToFormat = async (nodeData: any, format: string): Promise<string> => {
    try {
      switch (format) {
        case 'figma':
          const convertedNode = convertNodeDataToFigma(nodeData);
          return JSON.stringify(convertedNode, null, 2);
          
        case 'react':
          return generateReactComponent(nodeData, {
            componentName: nodeData.name || 'Component',
            typescript: true,
            includeProps: true
          });
          
        case 'vue':
          return generateVueComponent(nodeData, {
            componentName: nodeData.name || 'Component',
            typescript: true,
            composition: true,
            sfc: true
          });
          
        case 'angular':
          const { ts, html, css } = generateAngularComponent(nodeData, {
            componentName: nodeData.name || 'Component',
            standalone: true
          });
          return `// ${nodeData.name || 'Component'}.component.ts\n${ts}\n\n// ${nodeData.name || 'Component'}.component.html\n${html}\n\n// ${nodeData.name || 'Component'}.component.css\n${css}`;
          
        case 'css':
          return generateCSS(nodeData, {
            format: 'css',
            useClasses: true,
            includeComments: true
          });
          
        default:
          return 'Unsupported format';
      }
    } catch (error) {
      return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  };

  // Convert NodeData styles to Figma properties recursively
  const convertNodeDataToFigma = (nodeData: any): any => {
    const convertedNode = { ...nodeData };

    // Convert styles to figmaProperties if styles exist
    if (nodeData.styles) {
      try {
        const parsedStyles = parseStyles(nodeData.styles);
        const figmaProperties = convertStylesToFigma(parsedStyles);
        convertedNode.figmaProperties = figmaProperties;
      } catch (error) {
        console.error('Error converting styles:', error);
        convertedNode.figmaProperties = { error: 'Failed to convert styles' };
      }
    }

    // Recursively convert children
    if (nodeData.children && Array.isArray(nodeData.children)) {
      convertedNode.children = nodeData.children.map((child: any) =>
        convertNodeDataToFigma(child)
      );
    }

    delete convertedNode.styles;
    return convertedNode;
  };

  // Auto-convert when input or output tab changes
  useEffect(() => {
    if (!isMounted) return;
    
    const handleAutoConvert = async () => {
      if (!cssInput.trim()) return;
      
      setIsConverting(true);
      try {
        const nodeData = JSON.parse(cssInput.trim());
        const result = await convertToFormat(nodeData, outputTab);
        setOutput(result);
      } catch (error) {
        setOutput(`Error: ${error instanceof Error ? error.message : 'Invalid JSON'}`);
      }
      setIsConverting(false);
    };

    handleAutoConvert();
  }, [cssInput, outputTab, isMounted]);

  const copyToClipboard = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(output).catch(err => {
        console.error('Failed to copy text: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = output;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      });
    }
  };

  const loadPreset = (preset: (typeof examplePresets)[0]) => {
    setSelectedPreset(preset);
    setCssInput(JSON.stringify(preset.nodeData, null, 2));
  };

  const renderNodeData = (
    nodeData: any,
    key: string = "0"
  ): React.ReactNode => {
    const { type, name, styles, text, children } = nodeData;

    const renderElement = () => {
      switch (type) {
        case "TEXT":
          return (
            <span key={key} className={styles || ""}>
              {text || "Text"}
            </span>
          );
        case "FRAME":
          return (
            <div key={key} className={styles || ""}>
              {text && <span>{text}</span>}
              {children &&
                children.map((child: any, index: number) =>
                  renderNodeData(child, `${key}-${index}`)
                )}
            </div>
          );
        case "ELLIPSE":
          return (
            <div key={key} className={`rounded-full ${styles || ""}`}>
              {children &&
                children.map((child: any, index: number) =>
                  renderNodeData(child, `${key}-${index}`)
                )}
            </div>
          );
        default:
          return (
            <div key={key} className={styles || ""}>
              {text && <span>{text}</span>}
              {children &&
                children.map((child: any, index: number) =>
                  renderNodeData(child, `${key}-${index}`)
                )}
            </div>
          );
      }
    };

    return renderElement();
  };

  const renderPreview = () => {
    if (selectedPreset) {
      return renderNodeData(selectedPreset.nodeData);
    }

    try {
      const nodeData = JSON.parse(cssInput);
      return renderNodeData(nodeData);
    } catch {
      return (
        <div className="text-gray-500 text-center">
          <p>Invalid JSON format</p>
          <p className="text-sm">Please check your NodeData structure</p>
        </div>
      );
    }
  };

  const outputTabs = [
    { id: 'figma', label: 'Figma Properties', description: 'Figma API properties' },
    { id: 'react', label: 'React', description: 'React component' },
    { id: 'vue', label: 'Vue', description: 'Vue SFC component' },
    { id: 'angular', label: 'Angular', description: 'Angular component' },
    { id: 'css', label: 'CSS', description: 'Pure CSS styles' },
  ];

  // Don't render until mounted on client
  if (!isMounted) {
    return (
      <section
        id="demo"
        className="py-24 bg-gradient-to-br from-gray-50 via-white to-purple-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/3 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="demo"
      className="py-24 bg-gradient-to-br from-gray-50 via-white to-purple-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            See{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              CSSMA in Action
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Input CSSMA NodeData and see it converted to multiple formats in real-time
          </p>
        </div>

        {/* Demo Container */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Demo Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-white">Live CSSMA Converter</h3>
                <p className="text-purple-100">
                  NodeData → Multiple Output Formats
                </p>
              </div>
              <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-lg px-4 py-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-white">Live</span>
              </div>
            </div>
          </div>

          {/* Demo Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">
                    CSSMA NodeData Input
                  </h4>
                  <span className="text-sm text-gray-500">
                    JSON format
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Example Presets */}
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Try these examples:</p>
                    <div className="flex flex-wrap gap-2">
                      {examplePresets.map((preset, index) => (
                        <button
                          key={index}
                          onClick={() => loadPreset(preset)}
                          className={`px-3 py-1 text-xs rounded-md transition-colors ${
                            preset.color === "purple"
                              ? "bg-purple-100 text-purple-700 hover:bg-purple-200"
                              : preset.color === "blue"
                              ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                              : preset.color === "green"
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : preset.color === "red"
                              ? "bg-red-100 text-red-700 hover:bg-red-200"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Live Preview */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Live Preview
                    </label>
                    <div className="w-full h-[200px] p-4 bg-gray-50 rounded-lg border border-gray-200 overflow-auto">
                      <div className="flex items-center justify-center h-full">
                        {renderPreview()}
                      </div>
                    </div>
                  </div>

                  {/* NodeData Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NodeData JSON
                    </label>
                    <textarea
                      value={cssInput}
                      onChange={(e) => {
                        setCssInput(e.target.value);
                        setSelectedPreset(null);
                      }}
                      className="w-full h-64 p-3 bg-gray-900 text-green-400 rounded-lg font-mono text-sm border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors resize-none"
                      placeholder="Enter CSSMA NodeData JSON..."
                    />
                  </div>
                </div>
              </div>

              {/* Output Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Generated Output
                  </h4>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    <Copy size={16} />
                    Copy
                  </button>
                </div>

                {/* Output Format Tabs */}
                <div className="border-b border-gray-200 mb-4">
                  <div className="flex flex-wrap gap-1">
                    {outputTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setOutputTab(tab.id as any)}
                        className={`px-3 py-2 text-sm font-medium transition-colors rounded-t-lg ${
                          outputTab === tab.id
                            ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Output Content */}
                <div className="relative">
                  <textarea
                    value={output}
                    readOnly
                    className="w-full h-96 p-4 bg-gray-50 text-gray-800 rounded-xl font-mono text-sm border border-gray-200 resize-none"
                    placeholder={`${outputTabs.find(t => t.id === outputTab)?.description} will appear here...`}
                  />
                  {isConverting && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                      <div className="text-center text-gray-600">
                        <RefreshCw size={32} className="mx-auto mb-2 animate-spin" />
                        <p>Converting...</p>
                      </div>
                    </div>
                  )}
                  {!output && !isConverting && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <RefreshCw size={32} className="mx-auto mb-2 opacity-50" />
                        <p>Enter NodeData to see conversion</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 mb-20">
          {makerStats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              <div className="text-lg font-semibold text-purple-600 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Maker Stories */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Maker Success Stories
            </h3>
            <p className="text-xl text-gray-600">
              Real people, real results, real transformations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {makerStories.map((story, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={story.avatar}
                    alt={story.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">
                      {story.name}
                    </h4>
                    <p className="text-sm text-purple-600 font-medium">
                      {story.role}
                    </p>
                    <p className="text-xs text-gray-500">{story.company}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{story.story}"
                </p>
                <div className="flex justify-between text-center border-t border-gray-100 pt-4">
                  {Object.entries(story.metrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-sm font-bold text-purple-600">
                        {value}
                      </div>
                      <div className="text-xs text-gray-500 capitalize">
                        {key}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-6">
              Ready to Start Your Maker Journey?
            </h3>
            <p className="text-xl mb-8 text-purple-100">
              Join thousands of designers who became full-stack makers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/easylogic/cssma"
                className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Started Free
              </a>
              <a
                href="#pricing"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-colors"
              >
                View Pricing
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

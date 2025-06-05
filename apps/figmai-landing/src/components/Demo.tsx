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
import React, { useState } from "react";
import { parseStyles, convertStylesToFigma } from "@easylogic/cssma";

export default function Demo() {
  const [activeTab, setActiveTab] = useState<"css-to-figma" | "figma-to-css">(
    "css-to-figma"
  );
  const [cssInput, setCssInput] = useState(
    "flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg"
  );
  const [figmaOutput, setFigmaOutput] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<
    (typeof examplePresets)[0] | null
  >(null);

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
            styles: "flex-col gap-1",
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

  const [figmaInput, setFigmaInput] = useState(`{
  "layoutMode": "VERTICAL",
  "primaryAxisAlignItems": "MIN",
  "counterAxisAlignItems": "STRETCH", 
  "width": 320,
  "layoutSizingVertical": "HUG",
  "itemSpacing": 16,
  "paddingTop": 24,
  "paddingRight": 24,
  "paddingBottom": 24,
  "paddingLeft": 24,
  "fills": [{
    "type": "GRADIENT_LINEAR",
    "gradientStops": [
      {"position": 0, "color": {"r": 0.4, "g": 0.49, "b": 0.92}},
      {"position": 1, "color": {"r": 0.46, "g": 0.29, "b": 0.64}}
    ]
  }],
  "cornerRadius": 12,
  "effects": [{
    "type": "DROP_SHADOW",
    "color": {"r": 0, "g": 0, "b": 0, "a": 0.1},
    "offset": {"x": 0, "y": 4},
    "radius": 20
  }]
}`);

  const [convertedOutput, setConvertedOutput] = useState("");
  const [isConverting, setIsConverting] = useState(false);

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

  // Convert NodeData styles to Figma properties recursively
  const convertNodeDataToFigma = (nodeData: any): any => {
    const convertedNode = { ...nodeData };

    // Convert styles for current node if it has styles
    if (nodeData.styles) {
      try {
        const parsedStyles = parseStyles(nodeData.styles);
        const figmaProperties = convertStylesToFigma(parsedStyles);
        convertedNode.figmaProperties = figmaProperties;
      } catch (error) {
        console.warn(`Failed to convert styles for ${nodeData.name}:`, error);
        convertedNode.figmaProperties = { error: "Failed to convert styles" };
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

  const handleConvert = async () => {
    setIsConverting(true);

    try {
      if (activeTab === "css-to-figma") {
        // Parse the NodeData JSON
        const data = JSON.parse(cssInput.trim());

        // Convert all node styles to Figma properties
        const convertedData = convertNodeDataToFigma(data);
        setFigmaOutput(JSON.stringify(convertedData, null, 2));
      } else {
        // TODO: Implement Figma to CSS conversion when available
        setFigmaOutput(`/* Generated Tailwind CSS */
.figma-element {
  @apply flex flex-col w-[320px] h-auto gap-4 p-6;
  @apply bg-gradient-to-br from-indigo-400 via-purple-400 to-purple-600;
  @apply rounded-xl shadow-lg border border-white border-opacity-20;
}

/* Alternative: Utility Classes */
<div className="flex flex-col w-[320px] h-auto gap-4 p-6 bg-gradient-to-br from-indigo-400 via-purple-400 to-purple-600 rounded-xl shadow-lg border border-white border-opacity-20">
  <!-- Your content here -->
</div>`);
      }
    } catch (error) {
      console.error("Conversion error:", error);
      setFigmaOutput("Error during conversion. Please check your input.");
    }

    setIsConverting(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(figmaOutput);
  };

  const loadPreset = (preset: (typeof examplePresets)[0]) => {
    setSelectedPreset(preset);

    // Convert NodeData to CSS string for input display
    const extractStyles = (nodeData: any): string => {
      return JSON.stringify(nodeData, null, 2);
    };

    setCssInput(extractStyles(preset.nodeData));

    // Automatically convert the preset data
    try {
      const convertedData = convertNodeDataToFigma(preset.nodeData);
      setFigmaOutput(JSON.stringify(convertedData, null, 2));
    } catch (error) {
      setFigmaOutput(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  };

  const renderNodeData = (
    nodeData: any,
    key: string = "0"
  ): React.ReactNode => {
    const { type, name, styles, text, children } = nodeData;

    // Create the appropriate element based on type
    const renderElement = () => {
      switch (type) {
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

        case "TEXT":
          return (
            <span key={key} className={styles || ""}>
              {text || name}
            </span>
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

        case "RECTANGLE":
          return (
            <div key={key} className={styles || ""}>
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
    // If a preset is selected, render based on actual NodeData
    if (selectedPreset) {
      return (
        <div className="max-w-md">
          {renderNodeData(selectedPreset.nodeData)}
        </div>
      );
    }

    // If no preset selected, render based on cssInput (for manual input)
    if (cssInput.includes("text-")) {
      return <span className={cssInput}>Preview Text</span>;
    } else if (
      cssInput.includes("Button") ||
      cssInput.includes("button") ||
      cssInput.includes("bg-blue-500")
    ) {
      return <button className={cssInput}>Button Preview</button>;
    } else if (cssInput.includes("rounded-lg") && cssInput.includes("border")) {
      // Card Preview
      return (
        <div className="flex flex-col bg-white rounded-lg p-4 gap-3 border border-gray-200 shadow-sm max-w-xs">
          <span className="text-lg font-semibold text-gray-900">
            Card Title
          </span>
          <span className="text-sm text-gray-600">
            This is a card description with some sample text.
          </span>
        </div>
      );
    } else {
      return <div className={cssInput}>Preview Content</div>;
    }
  };

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
              Makers in Action
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real results from designers who became makers. Try the live
            converter below.
          </p>
        </div>

        {/* Live Demo Converter */}
        <div className="mb-20">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Demo Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Live CSSMA Demo</h3>
                  <p className="text-purple-100">
                    Experience real-time Tailwind CSS ↔ Figma conversion
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-white bg-opacity-20 rounded-lg px-4 py-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Live</span>
                </div>
              </div>
            </div>

            {/* Tab Switcher */}
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("css-to-figma")}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === "css-to-figma"
                      ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Tailwind CSS → Figma Properties
                </button>
                <button
                  onClick={() => setActiveTab("figma-to-css")}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === "figma-to-css"
                      ? "text-purple-600 border-b-2 border-purple-600 bg-purple-50"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Figma Properties → CSS
                </button>
              </div>
            </div>

            {/* Demo Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Input */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {activeTab === "css-to-figma"
                        ? "Tailwind CSS Input"
                        : "Figma Properties"}
                    </h4>
                    <span className="text-sm text-gray-500">
                      Edit and see magic happen
                    </span>
                  </div>

                  {activeTab === "css-to-figma" ? (
                    <div className="space-y-4">
                      {/* Example Presets */}
                      <div>
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
                        <div className="w-full h-[300px] p-4 bg-gray-50 rounded-lg border border-gray-200 overflow-auto">
                          <div className="flex items-center justify-center h-full">
                            {renderPreview()}
                          </div>
                        </div>
                      </div>

                      {/* CSS Code Input */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          TailwindCSS like styles
                        </label>
                        <textarea
                          value={cssInput}
                          onChange={(e) => {
                            setCssInput(e.target.value);
                            setSelectedPreset(null); // Reset preset when manually editing
                          }}
                          className="w-full h-32 p-3 bg-gray-900 text-green-400 rounded-lg font-mono text-sm border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors resize-none"
                          placeholder="Enter Tailwind CSS classes like: flex flex-col w-80 bg-blue-500 rounded-lg p-4..."
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <textarea
                        value={figmaInput}
                        onChange={(e) => setFigmaInput(e.target.value)}
                        className="w-full h-80 p-4 bg-gray-900 text-green-400 rounded-xl font-mono text-sm border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-colors resize-none"
                        placeholder="Paste Figma properties JSON..."
                      />
                    </div>
                  )}
                </div>

                {/* Output */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {activeTab === "css-to-figma"
                        ? "Figma Properties"
                        : "Generated CSS"}
                    </h4>
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 transition-colors"
                    >
                      <Copy size={16} />
                      Copy
                    </button>
                  </div>
                  <div className="relative">
                    <textarea
                      value={figmaOutput}
                      readOnly
                      className="w-full h-130 p-4 bg-gray-50 text-gray-800 rounded-xl font-mono text-sm border border-gray-200 resize-none"
                      placeholder="Converted output will appear here..."
                    />
                    {!figmaOutput && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-gray-400">
                          <RefreshCw
                            size={32}
                            className="mx-auto mb-2 opacity-50"
                          />
                          <p>Click convert to see the magic</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Convert Button */}
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleConvert}
                  disabled={isConverting}
                  className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
                >
                  {isConverting ? (
                    <>
                      <RefreshCw size={20} className="animate-spin" />
                      Converting...
                    </>
                  ) : (
                    <>
                      Convert Now
                      <ArrowRight
                        size={20}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
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
                    className="w-16 h-16 rounded-2xl object-cover mr-4"
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

                <blockquote className="text-gray-700 mb-6 italic">
                  &ldquo;{story.story}&rdquo;
                </blockquote>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
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

        {/* CTA */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-6">
              Ready to Start Your Maker Journey?
            </h3>
            <p className="text-xl mb-8 text-purple-100">
              Join thousands of designers who became full-stack makers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300">
                Watch Demo
              </button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-purple-200 text-sm">
              <span>• No credit card required</span>
              <span>• 14-day free trial</span>
              <span>• Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { NodeRenderer } from "cssma-react";
import { NodeData } from "cssma";

const testNodeData: NodeData = {
  type: "FRAME",
  name: "Test Card",
  styles:
    "flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm p-6 gap-4 w-[320] h-auto",
  children: [
    {
      type: "TEXT",
      name: "Card Title",
      styles: "text-xl font-semibold text-gray-900",
      text: "Dynamic Card Title",
    },
    {
      type: "TEXT",
      name: "Card Description",
      styles: "text-base text-gray-600 leading-relaxed",
      text: "This card is rendered dynamically using useCssma with w-[320] and other dynamic styles!",
    },
    {
      type: "FRAME",
      name: "Button Container",
      styles: "flex flex-row gap-3 mt-4",
      children: [
        {
          type: "FRAME",
          name: "Primary Button",
          styles:
            "flex items-center justify-center px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] rounded-md cursor-pointer",
          children: [
            {
              type: "TEXT",
              name: "Button Text",
              styles: "text-sm font-medium text-white",
              text: "Primary",
            },
          ],
        },
        {
          type: "FRAME",
          name: "Secondary Button",
          styles:
            "flex items-center justify-center px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-md cursor-pointer",
          children: [
            {
              type: "TEXT",
              name: "Button Text",
              styles: "text-sm font-medium text-gray-700",
              text: "Secondary",
            },
          ],
        },
      ],
    },
  ],
};

const testNodeData2: NodeData = {
  type: "FRAME",
  name: "Profile Card",
  styles:
    "flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm p-6 gap-4 w-[300] h-auto items-center text-center",
  children: [
    {
      type: "ELLIPSE",
      name: "Avatar",
      styles: "w-[80] h-[80] bg-[#E5E7EB]",
    },
    {
      type: "TEXT",
      name: "User Name",
      styles: "text-xl font-semibold text-gray-900",
      text: "John Doe",
    },
    {
      type: "TEXT",
      name: "User Title",
      styles: "text-sm text-[#6B7280]",
      text: "Senior Designer",
    },
    {
      type: "RECTANGLE",
      name: "Image Placeholder",
      styles: "w-[200] h-[120] bg-[#F3F4F6] rounded-md mt-4",
    },
  ],
};

// 새로운 테스트 케이스 - 더 많은 동적 클래스들
const testNodeData3: NodeData = {
  type: "FRAME",
  name: "Advanced Dynamic Card",
  styles:
    "flex flex-col bg-[#FFFFFF] border-[2] border-[#E5E7EB] rounded-[12] shadow-lg p-[24] gap-[16] w-[400] h-[300]",
  children: [
    {
      type: "TEXT",
      name: "Dynamic Title",
      styles: "text-[24] font-bold text-[#1F2937] mb-[12]",
      text: "All Dynamic Styles!",
    },
    {
      type: "FRAME",
      name: "Color Samples",
      styles: "flex flex-row gap-[8] mb-[16]",
      children: [
        {
          type: "RECTANGLE",
          name: "Red Sample",
          styles: "w-[40] h-[40] bg-[#EF4444] rounded-[8]",
        },
        {
          type: "RECTANGLE",
          name: "Green Sample",
          styles: "w-[40] h-[40] bg-[#10B981] rounded-[8]",
        },
        {
          type: "RECTANGLE",
          name: "Blue Sample",
          styles: "w-[40] h-[40] bg-[#3B82F6] rounded-[8]",
        },
        {
          type: "RECTANGLE",
          name: "Purple Sample",
          styles: "w-[40] h-[40] bg-[#8B5CF6] rounded-[8]",
        },
      ],
    },
    {
      type: "TEXT",
      name: "Dynamic Description",
      styles: "text-[14] text-[#6B7280] leading-[20]",
      text: "Every single style here uses dynamic values: w-[400], h-[300], bg-[#FFFFFF], text-[24], etc.",
    },
  ],
};

export default function TestRendererPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          NodeRenderer Test - Individual Class Approach
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Test Card 1</h2>
            <div className="flex justify-center">
              <NodeRenderer data={testNodeData} />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Test Card 2</h2>
            <div className="flex justify-center">
              <NodeRenderer data={testNodeData2} />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">All Dynamic Styles</h2>
            <div className="flex justify-center">
              <NodeRenderer data={testNodeData3} />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">
            New Individual Class Approach
          </h2>
          <div className="bg-white p-6 rounded-lg border">
            <p className="text-gray-600 mb-4">
              🎯 <strong>New Approach:</strong> Each dynamic class generates its
              own CSS rule
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Before (cssma-hash approach):
                </h3>
                <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                  <div className="text-red-600">
                    ❌ class=&quot;flex flex-col cssma-abc123&quot;
                  </div>
                  <div className="text-gray-500 mt-2">
                    .cssma-abc123 {"{"}
                    <br />
                    &nbsp;&nbsp;width: 320px;
                    <br />
                    &nbsp;&nbsp;height: 240px;
                    <br />
                    &nbsp;&nbsp;background-color: #FF0000;
                    <br />
                    {"}"}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  After (individual classes):
                </h3>
                <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                  <div className="text-green-600">
                    ✅ class=&quot;flex flex-col w-[320] h-[240] bg-[#FF0000]&quot;
                  </div>
                  <div className="text-gray-500 mt-2">
                    .w-\[320\] {"{ width: 320px; }"}
                    <br />
                    .h-\[240\] {"{ height: 240px; }"}
                    <br />
                    .bg-\[#FF0000\] {"{ background-color: #FF0000; }"}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
              <p className="text-green-800 text-sm">
                <strong>✅ Benefits:</strong>
              </p>
              <ul className="list-disc list-inside text-green-700 text-sm mt-2 space-y-1">
                <li>Tailwind-like class names preserved in HTML</li>
                <li>Developer tools show meaningful class names</li>
                <li>Better debugging experience</li>
                <li>Consistent with Tailwind philosophy</li>
                <li>Each dynamic class gets its own CSS rule</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Inspect Element Test</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 mb-2">
              🔍 <strong>Try this:</strong> Right-click on any card above and
              &quot;Inspect Element&quot;
            </p>
            <p className="text-yellow-700 text-sm">
              You should see class names like <code>w-[320]</code>,{" "}
              <code>bg-[#3B82F6]</code>, etc. in the HTML, and corresponding CSS
              rules like <code>.w-\[320\] {"{ width: 320px; }"}</code> in the
              &lt;head&gt;.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

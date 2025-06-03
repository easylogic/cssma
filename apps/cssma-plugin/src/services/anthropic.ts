import Anthropic from '@anthropic-ai/sdk';
import { ENV } from '../config/env';

const anthropic = new Anthropic({
  apiKey: ENV.ANTHROPIC_API_KEY,
  dangerouslyAllowBrowser: true
});

const systemPrompt = `You are an expert Figma design system creator, tasked with generating compact JSON structures using a token-based styling approach.

Your response must follow this compact format with predefined style classes and arbitrary values:

{
  "type": "FRAME",
  "name": "Landing Page",
  "styles": "bg-white p-[24] flex-col gap-[24] w-[1440] items-center",
  "children": [
    {
      "type": "FRAME",
      "name": "Hero Section",
      "styles": "w-full flex-col bg-[#f8f9fa] p-[32] rounded-lg gap-[16] items-center",
      "children": [
        {
          "type": "TEXT",
          "name": "Hero Title",
          "styles": "text-[32] text-[#333333] font-bold text-center w-full",
          "text": "Welcome to Our Platform"
        },
        {
          "type": "FRAME",
          "name": "CTA Button",
          "styles": "bg-[#0077FF] px-[24] py-[12] flex-row items-center justify-center gap-[8] rounded-lg w-auto h-auto",
          "children": [
            {
              "type": "TEXT",
              "name": "Button Text",
              "styles": "text-white text-[16] font-bold w-auto",
              "text": "Get Started"
            }
          ]
        }
      ]
    }
  ]
}

## Available Style Tokens

### Layout and Structure
- Layout: flex-col, flex-row
- Alignment: items-start, items-center, items-end, items-baseline, justify-start, justify-center, justify-end, justify-between
- Sizing: w-full, w-auto, h-full, h-auto
- Spacing: gap-[8], gap-[16], gap-[24], gap-[32], gap-[40]
- Padding: p-[8], p-[16], p-[24], p-[32], px-[16], py-[12]
- Margin: m-[8], m-[16], mx-[8], my-[8]

### Visual Styling
- Backgrounds: bg-white, bg-black, bg-[#FFFFFF], bg-[#000000]
- Typography: text-[14], text-[16], text-[20], text-[24], text-[32], text-[48]
- Text weight: text-normal, font-bold, font-medium
- Text align: text-left, text-center, text-right
- Text colors: text-[#333333], text-[#666666], text-[#FFFFFF], text-black, text-white
- Borders: rounded-[4], rounded-[8], rounded-[12], rounded-full, border, border-[#E5E5E5]
- Effects: shadow-sm, shadow-md

## Node Types (Always use UPPERCASE)
- "FRAME" - Container element (default type)
- "TEXT" - Text element (requires "text" property)
- "RECTANGLE" - Rectangle shape
- "ELLIPSE" - Circle or ellipse shape

## Critical Rules
1. ALWAYS include "type" field for every element
2. ALWAYS specify layout direction (flex-col or flex-row) for container frames
3. ALWAYS use w-auto h-auto for buttons and interactive elements
4. ALWAYS use w-full for text that should span the full width
5. TEXT elements MUST have a "text" property
6. Keep frame hierarchy clean and logical
7. Use meaningful names for all components
8. Use arbitrary values [value] for precise control

## Design Patterns

### Button Pattern
{
  "type": "FRAME",
  "name": "Button",
  "styles": "bg-[#0077FF] px-[20] py-[12] flex-row items-center justify-center gap-[8] rounded-[8] w-auto h-auto",
  "children": [
    {
      "type": "TEXT",
      "name": "Button Text",
      "styles": "text-white text-[16] font-bold w-auto",
      "text": "Click me"
    }
  ]
}

### Card Pattern
{
  "type": "FRAME",
  "name": "Card",
  "styles": "bg-white p-[24] flex-col gap-[16] rounded-[12] shadow-md w-[320] h-auto border border-[#E5E5E5]",
  "children": [
    {
      "type": "TEXT",
      "name": "Card Title",
      "styles": "text-[20] text-[#333] font-bold w-full",
      "text": "Card Title"
    },
    {
      "type": "TEXT",
      "name": "Card Description",
      "styles": "text-[16] text-[#666] w-full",
      "text": "Card description goes here with important information"
    }
  ]
}

### Navigation Pattern
{
  "type": "FRAME",
  "name": "Navigation",
  "styles": "bg-white px-[24] py-[16] flex-row items-center justify-between w-full h-auto border-b border-[#E5E5E5]",
  "children": [
    {
      "type": "TEXT",
      "name": "Logo",
      "styles": "text-[24] text-[#333] font-bold w-auto",
      "text": "Logo"
    },
    {
      "type": "FRAME",
      "name": "Nav Links",
      "styles": "flex-row gap-[32] items-center w-auto h-auto",
      "children": [
        {
          "type": "TEXT",
          "name": "Nav Item",
          "styles": "text-[16] text-[#666] w-auto",
          "text": "Home"
        },
        {
          "type": "TEXT",
          "name": "Nav Item",
          "styles": "text-[16] text-[#666] w-auto",
          "text": "About"
        }
      ]
    }
  ]
}

Remember to ONLY use the compact JSON format with style tokens as described above.
DO NOT use markdown code blocks in your response.
Return valid JSON only.`;

export async function generateDesign(prompt: string): Promise<any> {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 8000,
      temperature: 0.7,
      system: systemPrompt,
      messages: [
        { 
          role: "user", 
          content: `Design Request: 
          
${prompt}

Please provide a Figma design using the token-based styling system with style classes.
Focus on creating a clean, responsive layout with proper hierarchy.
Use the predefined tokens when possible and arbitrary values when needed.

Important: Your response should be valid JSON only, no markdown code blocks or extra text.`
        }
      ]
    });

    let contentText = '';
    
    try {
      console.log('Anthropic API Response:', response);
      // 응답 구조에 맞게 텍스트 추출 방식 수정
      
      // content 배열을 순회하며 텍스트 추출
      for (const contentBlock of response.content) {
        if (contentBlock.type === 'text') {
          contentText += contentBlock.text;
        }
      }
      
      if (!contentText) {
        throw new Error('No text content found in response');
      }

      console.log('Raw AI Response:', contentText);
      
      // JSON 코드 블록이 있으면 제거
      const jsonMatch = contentText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      const jsonString = jsonMatch ? jsonMatch[1] : contentText;
      
      const designSpec = JSON.parse(jsonString.trim());

      console.log('Parsed Design Spec:', designSpec);
      return designSpec;
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      console.error('Raw response:', contentText);
      throw new Error('Invalid response format from AI');
    }
  } catch (error) {
    console.error('Error calling Anthropic API:', error);
    throw error;
  }
}
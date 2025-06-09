import { NextRequest, NextResponse } from 'next/server';
import { coreTemplates } from '@/lib/template-data-core';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const template = coreTemplates.find(t => t.id === id);
    
    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    // Get related templates (same category, excluding current)
    const relatedTemplates = coreTemplates
      .filter(t => t.category.id === template.category.id && t.id !== id)
      .slice(0, 4);

    return NextResponse.json({
      template,
      relatedTemplates
    });

  } catch (error) {
    console.error('Error fetching template:', error);
    return NextResponse.json(
      { error: 'Failed to fetch template' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    
    // Find template index
    const templateIndex = coreTemplates.findIndex(t => t.id === id);
    
    if (templateIndex === -1) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }

    // Update usage count (for analytics)
    if (body.action === 'increment_usage') {
      coreTemplates[templateIndex].usageCount = 
        (coreTemplates[templateIndex].usageCount || 0) + 1;
    }

    return NextResponse.json({
      template: coreTemplates[templateIndex]
    });

  } catch (error) {
    console.error('Error updating template:', error);
    return NextResponse.json(
      { error: 'Failed to update template' },
      { status: 500 }
    );
  }
} 
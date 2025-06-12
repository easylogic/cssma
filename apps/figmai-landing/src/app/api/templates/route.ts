import { NextRequest, NextResponse } from 'next/server';
import { templateCategories, templates } from '@/lib/template-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  // Query parameters
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const complexity = searchParams.get('complexity');
  const tags = searchParams.get('tags')?.split(',');
  const featured = searchParams.get('featured') === 'true';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '12');
  const sortBy = searchParams.get('sortBy') || 'popular'; // popular, newest, name, complexity

  try {
    let filteredTemplates = [...templates];

    // Apply filters
    if (category) {
      filteredTemplates = filteredTemplates.filter(template => 
        template.category.id === category
      );
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredTemplates = filteredTemplates.filter(template =>
        template.name.toLowerCase().includes(searchLower) ||
        template.description.toLowerCase().includes(searchLower) ||
        template.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    if (complexity) {
      filteredTemplates = filteredTemplates.filter(template =>
        template.complexity === complexity
      );
    }

    if (tags && tags.length > 0) {
      filteredTemplates = filteredTemplates.filter(template =>
        tags.some(tag => template.tags.includes(tag))
      );
    }

    if (featured) {
      filteredTemplates = filteredTemplates.filter(template => template.featured);
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filteredTemplates.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'name':
        filteredTemplates.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'complexity':
        const complexityOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
        filteredTemplates.sort((a, b) => 
          complexityOrder[a.complexity] - complexityOrder[b.complexity]
        );
        break;
      case 'popular':
      default:
        filteredTemplates.sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0));
        break;
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTemplates = filteredTemplates.slice(startIndex, endIndex);

    // Calculate pagination info
    const totalCount = filteredTemplates.length;
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return NextResponse.json({
      templates: paginatedTemplates,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
        hasNextPage,
        hasPrevPage
      },
      filters: {
        category,
        search,
        complexity,
        tags,
        featured,
        sortBy
      }
    });

  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
} 
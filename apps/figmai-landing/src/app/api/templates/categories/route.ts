import { NextResponse } from 'next/server';
import { templateCategories, coreTemplates } from '@/lib/template-data-core';

export async function GET() {
  try {
    // Calculate template count for each category
    const categoriesWithCount = templateCategories.map(category => {
      const templateCount = coreTemplates.filter(
        template => template.category.id === category.id
      ).length;

      return {
        ...category,
        templateCount
      };
    });

    return NextResponse.json({
      categories: categoriesWithCount,
      totalCategories: categoriesWithCount.length
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
} 
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const tools = await prisma.tool.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(tools);
  } catch (error) {
    console.error('Error fetching tools:', error);
    return NextResponse.json({ error: 'Failed to fetch tools' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newTool = await prisma.tool.create({
      data: {
        name: body.name,
        description: body.description,
        category: body.category,
        url: body.url,
        pricing: body.pricing,
        image: body.image,
      }
    });
    
    return NextResponse.json(newTool);
  } catch (error) {
    console.error('Error creating tool:', error);
    return NextResponse.json({ error: 'Failed to create tool' }, { status: 500 });
  }
}

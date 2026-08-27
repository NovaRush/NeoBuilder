import { prisma } from '@/lib/db';
import { verifySession } from '@/lib/session';
import { generateWebsite, validateProjectData } from '@/lib/project-schema';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const session = await verifySession(token);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify project ownership
    const project = await prisma.project.findUnique({
      where: { id: params.id },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    if (project.userId !== session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Get the prompt from project data
    const projectData = project.projectData as any;
    const prompt = projectData.prompt;

    if (!prompt) {
      return NextResponse.json(
        { error: 'No prompt found for generation' },
        { status: 400 }
      );
    }

    try {
      // Import dynamically to avoid issues in edge runtime
      const { generateWebsite } = await import('@/lib/ai-service');
      const generatedData = await generateWebsite(prompt);

      // Validate the generated data
      const isValid = validateProjectData(generatedData);
      if (!isValid) {
        return NextResponse.json(
          { error: 'AI generated invalid project data' },
          { status: 400 }
        );
      }

      // Create version 1
      await prisma.projectVersion.create({
        data: {
          projectId: params.id,
          versionNumber: 1,
          projectData: generatedData,
          changeDescription: 'Initial generation',
        },
      });

      // Update project
      const updatedProject = await prisma.project.update({
        where: { id: params.id },
        data: {
          projectData: generatedData,
          status: 'ready',
        },
      });

      return NextResponse.json({ project: updatedProject });
    } catch (aiError: any) {
      console.error('AI generation error:', aiError);

      // Update project status to error
      await prisma.project.update({
        where: { id: params.id },
        data: { status: 'error' },
      });

      return NextResponse.json(
        { error: aiError.message || 'AI generation failed' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Generate error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

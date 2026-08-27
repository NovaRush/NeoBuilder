'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  slug: string;
  status: string;
  projectData: any;
  publishedData: any;
  published: boolean;
}

export default function ProjectBuilder() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.projectId as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  async function fetchProject() {
    try {
      const res = await fetch(`/api/projects/${projectId}`);
      if (res.status === 401) {
        router.push('/auth/signin');
        return;
      }
      if (res.status === 404) {
        setError('Project not found');
        setLoading(false);
        return;
      }
      const data = await res.json();
      setProject(data.project);
    } catch (err) {
      setError('Failed to load project');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader className="animate-spin text-blue-600" size={40} />
          <p className="text-gray-600 font-medium">Loading project...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
            <Link href="/dashboard" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-bold">
              <ArrowLeft size={20} /> Dashboard
            </Link>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Error</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link href="/dashboard" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="font-bold text-lg">{project.name}</h1>
              <p className="text-sm text-gray-500">Status: {project.status}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href={`/projects/${projectId}/settings`}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
            >
              Settings
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content - Split Screen */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {project.status === 'generating' ? (
          <div className="bg-white rounded-lg p-12 text-center border-2 border-dashed border-blue-300">
            <Loader className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
            <h2 className="text-2xl font-bold mb-2">Generating your website...</h2>
            <p className="text-gray-600">This may take a moment. Please don't refresh the page.</p>
          </div>
        ) : project.status === 'error' ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-12 text-center">
            <h2 className="text-2xl font-bold text-red-800 mb-2">Generation Failed</h2>
            <p className="text-red-700 mb-6">There was an error generating your website. Please try again.</p>
            <button
              onClick={() => fetchProject()}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-bold"
            >
              Try Again
            </button>
          </div>
        ) : project.status === 'ready' ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Chat */}
            <div className="bg-white rounded-lg border border-gray-200 flex flex-col h-96">
              <div className="border-b border-gray-200 p-4">
                <h2 className="font-bold">AI Chat</h2>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <div className="text-center text-gray-500 text-sm">
                  <p>Chat interface coming in Phase 4</p>
                </div>
              </div>
              <div className="border-t border-gray-200 p-4">
                <input
                  type="text"
                  disabled
                  placeholder="Chat with AI to make changes..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Right: Preview */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-96">
              <div className="border-b border-gray-200 p-4 bg-gray-50">
                <p className="font-bold text-sm">Live Preview</p>
              </div>
              <div className="flex-1 bg-white overflow-auto">
                <div className="p-4 text-center text-gray-500 text-sm">
                  <p>Preview rendering coming in Phase 3</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}

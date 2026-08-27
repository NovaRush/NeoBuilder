'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Loader, Save, Upload, Settings } from 'lucide-react';
import { LivePreview } from '@/components/LivePreview';
import { ProjectSchema } from '@/lib/project-schema';

interface Project {
  id: string;
  name: string;
  slug: string;
  status: string;
  projectData: ProjectSchema;
  publishedData: ProjectSchema;
  published: boolean;
}

export default function ProjectBuilder() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.projectId as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [generating, setGenerating] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [chatInput, setChatInput] = useState('');

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

      // If status is generating, trigger generation
      if (data.project.status === 'generating') {
        generateWebsite(data.project.id);
      }
    } catch (err) {
      setError('Failed to load project');
    } finally {
      setLoading(false);
    }
  }

  async function generateWebsite(id: string) {
    setGenerating(true);
    try {
      const res = await fetch(`/api/projects/${id}/generate`, {
        method: 'POST',
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Generation failed');
      } else {
        setProject(data.project);
        setChatMessages([{ role: 'assistant', content: 'I\'ve generated your website! You can now edit it or ask me to make changes.' }]);
      }
    } catch (err) {
      setError('Generation failed');
    } finally {
      setGenerating(false);
    }
  }

  async function handlePublish() {
    if (!project) return;

    try {
      const res = await fetch(`/api/projects/${projectId}/publish`, {
        method: 'POST',
      });

      if (res.ok) {
        const data = await res.json();
        setProject({ ...project, published: true });
        alert(`Published! Visit: ${data.url}`);
      } else {
        alert('Failed to publish');
      }
    } catch (err) {
      alert('Publishing failed');
    }
  }

  const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'localhost:3000';

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-blue-600 hover:text-blue-700">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="font-bold text-lg">{project.name}</h1>
              <p className="text-sm text-gray-500 capitalize">{project.status}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {project.status === 'ready' && (
              <>
                <button
                  onClick={handlePublish}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                    project.published
                      ? 'bg-green-100 text-green-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  <Upload size={18} />
                  {project.published ? 'Published' : 'Publish'}
                </button>
              </>
            )}
            <Link
              href={`/projects/${projectId}/settings`}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium flex items-center gap-2"
            >
              <Settings size={18} /> Settings
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {project.status === 'generating' ? (
          <div className="bg-white rounded-lg p-12 text-center border-2 border-dashed border-blue-300">
            <Loader className="animate-spin text-blue-600 mx-auto mb-4" size={48} />
            <h2 className="text-2xl font-bold mb-2">Generating your website...</h2>
            <p className="text-gray-600">This may take a moment. Please don't refresh the page.</p>
          </div>
        ) : project.status === 'error' ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-12 text-center">
            <h2 className="text-2xl font-bold text-red-800 mb-2">Generation Failed</h2>
            <p className="text-red-700 mb-6">There was an error generating your website.</p>
            <button
              onClick={() => generateWebsite(projectId)}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-bold"
            >
              Try Again
            </button>
          </div>
        ) : project.status === 'ready' ? (
          <div className="grid lg:grid-cols-2 gap-8 h-[calc(100vh-200px)]">
            {/* Left: Chat */}
            <div className="bg-white rounded-lg border border-gray-200 flex flex-col">
              <div className="border-b border-gray-200 p-4 bg-gradient-to-r from-blue-50 to-blue-100">
                <h2 className="font-bold text-lg">AI Chat Assistant</h2>
                <p className="text-sm text-gray-600">Ask me to modify your website</p>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.length === 0 ? (
                  <div className="text-center text-gray-500 text-sm mt-8">
                    <p className="mb-2">💬 Chat with AI to make changes</p>
                    <p className="text-xs">Examples:</p>
                    <p className="text-xs italic">• Make the design darker</p>
                    <p className="text-xs italic">• Add a pricing section</p>
                    <p className="text-xs italic">• Change the hero heading</p>
                  </div>
                ) : (
                  chatMessages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-blue-100 text-blue-900 ml-8'
                          : 'bg-gray-100 text-gray-900 mr-8'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  ))
                )}
              </div>
              <div className="border-t border-gray-200 p-4 space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Ask AI to modify your website..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                    disabled
                  />
                  <button
                    disabled
                    className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg font-medium disabled:opacity-50"
                  >
                    Send
                  </button>
                </div>
                <p className="text-xs text-gray-500">Chat editing coming in Phase 4</p>
              </div>
            </div>

            {/* Right: Preview */}
            <div className="bg-white rounded-lg border border-gray-200 flex flex-col overflow-hidden">
              <LivePreview projectData={project.projectData} />
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Loader, Calendar, Globe } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  status: string;
  published: boolean;
  slug: string;
  updatedAt: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const res = await fetch('/api/projects');
      if (res.status === 401) {
        router.push('/auth/signin');
        return;
      }
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (err) {
      console.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  }

  const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'localhost:3000';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-400 rounded-lg"></div>
            <span className="font-bold text-xl">NeoBuilder</span>
          </div>
          <button
            onClick={handleLogout}
            className="text-gray-600 hover:text-gray-900 font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Welcome back</h1>
          <p className="text-gray-600">Create and manage your AI-generated websites</p>
        </div>

        {/* Create Project Button */}
        <div className="mb-12">
          <Link
            href="/projects/new"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-bold text-lg"
          >
            <Plus size={20} /> Create Project
          </Link>
        </div>

        {/* Projects Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Your Projects</h2>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="animate-spin text-blue-600" size={32} />
            </div>
          ) : projects.length === 0 ? (
            <div className="bg-white rounded-lg border-2 border-dashed border-gray-300 p-12 text-center">
              <h3 className="text-xl font-bold mb-2">You haven't built anything yet</h3>
              <p className="text-gray-600 mb-6">Create your first project and let AI build it for you</p>
              <Link
                href="/projects/new"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 font-bold inline-block"
              >
                Create your first project
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold">{project.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{project.status}</p>
                      </div>
                      {project.published && (
                        <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">Published</span>
                      )}
                    </div>

                    {project.published && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <Globe size={14} />
                        <span>{`${project.slug}.${mainDomain}`}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <Calendar size={14} />
                      <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/projects/${project.id}`}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded font-bold text-center hover:bg-blue-700 text-sm"
                      >
                        Open Builder
                      </Link>
                      <Link
                        href={`/projects/${project.id}/settings`}
                        className="flex-1 bg-gray-200 text-gray-900 px-3 py-2 rounded font-bold text-center hover:bg-gray-300 text-sm"
                      >
                        Settings
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

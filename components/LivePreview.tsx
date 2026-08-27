'use client';

import { useEffect, useState } from 'react';
import { ProjectSchema } from '@/lib/project-schema';
import { ComponentRenderer } from './ComponentRenderer';
import { Monitor, Tablet, Smartphone } from 'lucide-react';

interface PreviewProps {
  projectData: ProjectSchema;
}

export function LivePreview({ projectData }: PreviewProps) {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const getContainerClass = () => {
    switch (device) {
      case 'tablet':
        return 'max-w-2xl';
      case 'mobile':
        return 'max-w-sm';
      default:
        return 'w-full';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Device Selector */}
      <div className="bg-gray-100 border-b border-gray-300 p-3 flex gap-2 justify-center">
        <button
          onClick={() => setDevice('desktop')}
          className={`p-2 rounded ${
            device === 'desktop'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-200'
          }`}
          title="Desktop"
        >
          <Monitor size={20} />
        </button>
        <button
          onClick={() => setDevice('tablet')}
          className={`p-2 rounded ${
            device === 'tablet'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-200'
          }`}
          title="Tablet"
        >
          <Tablet size={20} />
        </button>
        <button
          onClick={() => setDevice('mobile')}
          className={`p-2 rounded ${
            device === 'mobile'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-200'
          }`}
          title="Mobile"
        >
          <Smartphone size={20} />
        </button>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-auto bg-gray-50 flex items-center justify-center p-4">
        <div className={`bg-white shadow-lg ${getContainerClass()}`}>
          {projectData && projectData.pages?.length > 0 ? (
            <ComponentRenderer data={projectData} theme={projectData.theme} />
          ) : (
            <div className="p-8 text-center text-gray-500">
              <p>No project data to preview</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

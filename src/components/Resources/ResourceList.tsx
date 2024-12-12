import React from 'react';
import { Resource } from '../../types';
import { FileText, Download } from 'lucide-react';

interface ResourceListProps {
  resources: Resource[];
  isLoading: boolean;
}

const ResourceList: React.FC<ResourceListProps> = ({ resources, isLoading }) => {
  if (isLoading) {
    return <div className="text-center py-8">Yükleniyor...</div>;
  }

  if (resources.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Henüz kaynak eklenmemiş.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource) => (
        <div key={resource._id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={resource.image}
            alt={resource.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900">{resource.title}</h3>
            <div className="mt-2 space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium">Sınıf:</span>
                <span className="ml-2">{resource.grade}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium">Kategori:</span>
                <span className="ml-2">{resource.category}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {resource.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <a
              href={resource.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <Download size={18} className="mr-2" />
              İndir
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResourceList;
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Plus } from 'lucide-react';
import { Resource } from '../types';
import { useAuth } from '../context/AuthContext';
import ResourceForm from '../components/Resources/ResourceForm';
import ResourceList from '../components/Resources/ResourceList';
import axios from 'axios';

const ResourcesPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { token } = useAuth();

  const { data: resources, isLoading, refetch } = useQuery<Resource[]>(
    'resources',
    async () => {
      const response = await axios.get('https://teacher-assistant-server-0a050558c608.herokuapp.com/api/resources', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.resources;
    }
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Kaynaklar</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          <span>Yeni Kaynak</span>
        </button>
      </div>

      {isFormOpen && (
        <ResourceForm
          onClose={() => setIsFormOpen(false)}
          onSuccess={() => {
            setIsFormOpen(false);
            refetch();
          }}
        />
      )}

      <ResourceList resources={resources || []} isLoading={isLoading} />
    </div>
  );
};

export default ResourcesPage;
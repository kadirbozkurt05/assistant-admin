import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Plus } from 'lucide-react';
import { Exam } from '../types';
import { useAuth } from '../context/AuthContext';
import ExamForm from '../components/Exams/ExamForm';
import ExamList from '../components/Exams/ExamList';
import axios from 'axios';

const ExamsPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { token } = useAuth();

  const { data: exams, isLoading, refetch } = useQuery<Exam[]>(
    'exams',
    async () => {
      const response = await axios.get('https://teacher-assistant-server-0a050558c608.herokuapp.com/api/exams', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    }
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Sınavlar</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          <span>Yeni Sınav</span>
        </button>
      </div>

      {isFormOpen && (
        <ExamForm
          onClose={() => setIsFormOpen(false)}
          onSuccess={() => {
            setIsFormOpen(false);
            refetch();
          }}
        />
      )}

      <ExamList exams={exams || []} isLoading={isLoading} />
    </div>
  );
};

export default ExamsPage;
import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import ExamCard from '../components/Exams/ExamCard';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Exam } from '../types';

export default function Exams() {
  const { exams } = useApp();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exam.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || exam.status === statusFilter;
    
    // Faculty can only see their own exams
    const matchesUser = user?.role !== 'faculty' || exam.createdBy === user.id;
    
    return matchesSearch && matchesStatus && matchesUser;
  });

  const handleViewExam = (exam: Exam) => {
    console.log('View exam:', exam);
  };

  const handleEditExam = (exam: Exam) => {
    console.log('Edit exam:', exam);
  };

  const handleDeleteExam = (exam: Exam) => {
    if (confirm('Are you sure you want to delete this exam?')) {
      console.log('Delete exam:', exam);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {user?.role === 'faculty' ? 'My Exams' : 'Exam Management'}
          </h1>
          <p className="text-gray-600 mt-1">
            {user?.role === 'faculty' 
              ? 'Manage your scheduled exams and question papers'
              : 'Schedule, monitor, and manage all examinations'}
          </p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Schedule New Exam
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search exams by title, code, or subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Exam Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map(exam => (
          <ExamCard
            key={exam.id}
            exam={exam}
            onView={handleViewExam}
            onEdit={handleEditExam}
            onDelete={user?.role === 'coe' ? handleDeleteExam : undefined}
          />
        ))}
      </div>

      {filteredExams.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-lg mb-2">No exams found</div>
          <p className="text-gray-500">
            {searchTerm || statusFilter !== 'all' 
              ? 'Try adjusting your search criteria' 
              : 'Get started by scheduling your first exam'}
          </p>
        </div>
      )}
    </div>
  );
}
import React from 'react';
import { Calendar, Clock, MapPin, Users, Eye, Edit, Trash2 } from 'lucide-react';
import { Exam } from '../../types';
import { format, parseISO } from 'date-fns';

interface ExamCardProps {
  exam: Exam;
  onView?: (exam: Exam) => void;
  onEdit?: (exam: Exam) => void;
  onDelete?: (exam: Exam) => void;
}

export default function ExamCard({ exam, onView, onEdit, onDelete }: ExamCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{exam.title}</h3>
          <p className="text-sm text-gray-600">{exam.subject} • {exam.department}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(exam.status)}`}>
            {exam.status}
          </span>
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {exam.code}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4" />
          <span>{format(parseISO(exam.date), 'MMM d, yyyy')}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>{exam.startTime} - {exam.endTime}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="h-4 w-4" />
          <span>{exam.venue}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Users className="h-4 w-4" />
          <span>{exam.totalMarks} marks</span>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{exam.instructions}</p>

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500">
          Duration: {exam.duration} minutes
        </div>
        <div className="flex items-center space-x-2">
          {onView && (
            <button
              onClick={() => onView(exam)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="View Details"
            >
              <Eye className="h-4 w-4" />
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(exam)}
              className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Edit Exam"
            >
              <Edit className="h-4 w-4" />
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(exam)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete Exam"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
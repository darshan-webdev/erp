import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { format, parseISO } from 'date-fns';

export default function UpcomingExams() {
  const { exams } = useApp();

  const upcomingExams = exams
    .filter(exam => exam.status === 'scheduled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Upcoming Exams</h3>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {upcomingExams.map((exam) => (
          <div key={exam.id} className="border border-gray-100 rounded-lg p-4 hover:border-blue-200 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-gray-900">{exam.title}</h4>
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                {exam.code}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
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
          </div>
        ))}
      </div>
    </div>
  );
}
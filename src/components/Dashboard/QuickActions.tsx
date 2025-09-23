import React from 'react';
import { Plus, Calendar, FileText, Users, Download, Upload } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export default function QuickActions() {
  const { user } = useAuth();

  const actions = React.useMemo(() => {
    if (user?.role === 'coe') {
      return [
        { name: 'Schedule Exam', icon: Calendar, href: '/exams/new', color: 'bg-blue-500' },
        { name: 'Create Question', icon: FileText, href: '/questions/new', color: 'bg-green-500' },
        { name: 'Manage Users', icon: Users, href: '/users', color: 'bg-purple-500' },
        { name: 'Bulk Upload', icon: Upload, href: '/bulk-upload', color: 'bg-orange-500' },
        { name: 'Export Data', icon: Download, href: '/export', color: 'bg-indigo-500' }
      ];
    } else if (user?.role === 'faculty') {
      return [
        { name: 'Add Question', icon: Plus, href: '/questions/new', color: 'bg-blue-500' },
        { name: 'Create Paper', icon: FileText, href: '/papers/new', color: 'bg-green-500' },
        { name: 'Start Evaluation', icon: Users, href: '/evaluation', color: 'bg-purple-500' },
        { name: 'View Analytics', icon: Download, href: '/analytics', color: 'bg-orange-500' }
      ];
    } else {
      return [
        { name: 'Generate Tickets', icon: FileText, href: '/hall-tickets/generate', color: 'bg-blue-500' },
        { name: 'Arrange Seating', icon: Users, href: '/seating', color: 'bg-green-500' },
        { name: 'Track Attendance', icon: Calendar, href: '/attendance', color: 'bg-purple-500' },
        { name: 'Scan QR Codes', icon: Upload, href: '/qr-scan', color: 'bg-orange-500' }
      ];
    }
  }, [user]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.name}
              to={action.href}
              className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
            >
              <div className={`${action.color} p-2 rounded-lg group-hover:scale-110 transition-transform`}>
                <Icon className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                {action.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
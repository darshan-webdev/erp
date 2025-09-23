import React from 'react';
import { Clock, Calendar, FileText, Users, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { format } from 'date-fns';

export default function RecentActivity() {
  const { user } = useAuth();

  const activities = React.useMemo(() => {
    if (user?.role === 'coe') {
      return [
        {
          id: 1,
          type: 'exam_scheduled',
          title: 'New exam scheduled',
          description: 'Computer Networks Final Exam - CS301',
          time: new Date(2025, 0, 8, 10, 30),
          icon: Calendar,
          color: 'text-blue-600 bg-blue-50'
        },
        {
          id: 2,
          type: 'paper_approved',
          title: 'Question paper approved',
          description: 'Database Systems Mid-Term - CS302',
          time: new Date(2025, 0, 7, 15, 20),
          icon: FileText,
          color: 'text-green-600 bg-green-50'
        },
        {
          id: 3,
          type: 'results_published',
          title: 'Results published',
          description: 'Software Engineering - CS201',
          time: new Date(2025, 0, 6, 14, 10),
          icon: Award,
          color: 'text-purple-600 bg-purple-50'
        },
        {
          id: 4,
          type: 'attendance_updated',
          title: 'Attendance recorded',
          description: '142 students attended Data Structures exam',
          time: new Date(2025, 0, 5, 9, 45),
          icon: Users,
          color: 'text-orange-600 bg-orange-50'
        }
      ];
    } else if (user?.role === 'faculty') {
      return [
        {
          id: 1,
          type: 'question_added',
          title: 'Questions added to bank',
          description: 'Added 5 new questions for Computer Networks',
          time: new Date(2025, 0, 8, 11, 15),
          icon: FileText,
          color: 'text-blue-600 bg-blue-50'
        },
        {
          id: 2,
          type: 'paper_created',
          title: 'Question paper created',
          description: 'CS301 Final Exam paper ready for approval',
          time: new Date(2025, 0, 7, 16, 30),
          icon: Calendar,
          color: 'text-green-600 bg-green-50'
        },
        {
          id: 3,
          type: 'evaluation_pending',
          title: 'Evaluation reminder',
          description: '24 answer sheets pending evaluation',
          time: new Date(2025, 0, 6, 10, 0),
          icon: Clock,
          color: 'text-orange-600 bg-orange-50'
        }
      ];
    } else {
      return [
        {
          id: 1,
          type: 'hall_tickets',
          title: 'Hall tickets generated',
          description: '156 hall tickets for CS301 exam',
          time: new Date(2025, 0, 8, 12, 0),
          icon: FileText,
          color: 'text-blue-600 bg-blue-50'
        },
        {
          id: 2,
          type: 'seating_arranged',
          title: 'Seating arrangement completed',
          description: 'Main Hall A - 180 seats assigned',
          time: new Date(2025, 0, 7, 14, 15),
          icon: Users,
          color: 'text-green-600 bg-green-50'
        },
        {
          id: 3,
          type: 'attendance_updated',
          title: 'Attendance tracking setup',
          description: 'QR scanners configured for tomorrow\'s exam',
          time: new Date(2025, 0, 6, 16, 45),
          icon: Clock,
          color: 'text-purple-600 bg-purple-50'
        }
      ];
    }
  }, [user]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`${activity.color} p-2 rounded-lg flex-shrink-0`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {format(activity.time, 'MMM d, yyyy \'at\' h:mm a')}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
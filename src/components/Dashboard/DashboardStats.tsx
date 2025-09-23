import React from 'react';
import { Calendar, Users, FileText, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';

export default function DashboardStats() {
  const { exams, questions, results } = useApp();
  const { user } = useAuth();

  const stats = React.useMemo(() => {
    if (user?.role === 'coe') {
      return [
        {
          name: 'Total Exams',
          value: exams.length.toString(),
          icon: Calendar,
          color: 'bg-blue-500',
          change: '+12%',
          changeType: 'positive' as const
        },
        {
          name: 'Question Bank',
          value: questions.length.toString(),
          icon: FileText,
          color: 'bg-green-500',
          change: '+5.2%',
          changeType: 'positive' as const
        },
        {
          name: 'Students Enrolled',
          value: '2,847',
          icon: Users,
          color: 'bg-purple-500',
          change: '+3.1%',
          changeType: 'positive' as const
        },
        {
          name: 'Results Published',
          value: results.length.toString(),
          icon: TrendingUp,
          color: 'bg-orange-500',
          change: '+8.7%',
          changeType: 'positive' as const
        }
      ];
    } else if (user?.role === 'faculty') {
      const myExams = exams.filter(exam => exam.createdBy === user.id);
      return [
        {
          name: 'My Exams',
          value: myExams.length.toString(),
          icon: Calendar,
          color: 'bg-blue-500',
          change: '+2',
          changeType: 'positive' as const
        },
        {
          name: 'Questions Created',
          value: questions.filter(q => q.createdBy === user.id).length.toString(),
          icon: FileText,
          color: 'bg-green-500',
          change: '+15',
          changeType: 'positive' as const
        },
        {
          name: 'Pending Evaluations',
          value: '24',
          icon: Users,
          color: 'bg-orange-500',
          change: '-3',
          changeType: 'negative' as const
        },
        {
          name: 'Average Score',
          value: '78%',
          icon: TrendingUp,
          color: 'bg-purple-500',
          change: '+2.3%',
          changeType: 'positive' as const
        }
      ];
    } else {
      return [
        {
          name: 'Active Exams',
          value: exams.filter(exam => exam.status === 'ongoing').length.toString(),
          icon: Calendar,
          color: 'bg-blue-500',
          change: '3 ongoing',
          changeType: 'neutral' as const
        },
        {
          name: 'Hall Tickets',
          value: '156',
          icon: FileText,
          color: 'bg-green-500',
          change: 'All issued',
          changeType: 'positive' as const
        },
        {
          name: 'Attendance Rate',
          value: '94%',
          icon: Users,
          color: 'bg-purple-500',
          change: '+1.2%',
          changeType: 'positive' as const
        },
        {
          name: 'Seating Arranged',
          value: '98%',
          icon: TrendingUp,
          color: 'bg-orange-500',
          change: 'Complete',
          changeType: 'positive' as const
        }
      ];
    }
  }, [user, exams, questions, results]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.name} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 
                    stat.changeType === 'negative' ? 'text-red-600' : 
                    'text-gray-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
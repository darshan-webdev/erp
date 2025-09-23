import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  ClipboardList,
  BookOpen,
  GraduationCap,
  BarChart3,
  Bell,
  Shield,
  Settings,
  Award,
  MapPin
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const navigationItems = {
  coe: [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Exam Scheduling', href: '/exams', icon: Calendar },
    { name: 'Question Bank', href: '/questions', icon: BookOpen },
    { name: 'Paper Management', href: '/papers', icon: FileText },
    { name: 'Attendance', href: '/attendance', icon: Users },
    { name: 'Hall Tickets', href: '/hall-tickets', icon: ClipboardList },
    { name: 'Seating', href: '/seating', icon: MapPin },
    { name: 'Evaluation', href: '/evaluation', icon: GraduationCap },
    { name: 'Results', href: '/results', icon: Award },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'Security', href: '/security', icon: Shield },
    { name: 'Settings', href: '/settings', icon: Settings }
  ],
  faculty: [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'My Exams', href: '/exams', icon: Calendar },
    { name: 'Question Bank', href: '/questions', icon: BookOpen },
    { name: 'Paper Setting', href: '/papers', icon: FileText },
    { name: 'Evaluation', href: '/evaluation', icon: GraduationCap },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Notifications', href: '/notifications', icon: Bell }
  ],
  coordinator: [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Exam Schedule', href: '/exams', icon: Calendar },
    { name: 'Attendance', href: '/attendance', icon: Users },
    { name: 'Hall Tickets', href: '/hall-tickets', icon: ClipboardList },
    { name: 'Seating', href: '/seating', icon: MapPin },
    { name: 'Notifications', href: '/notifications', icon: Bell }
  ]
};

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  if (!user) return null;

  const menuItems = navigationItems[user.role] || [];

  return (
    <aside className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon
                  className={`flex-shrink-0 h-5 w-5 mr-3 transition-colors ${
                    isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Role Badge */}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              user.role === 'coe' ? 'bg-purple-500' : 
              user.role === 'faculty' ? 'bg-green-500' : 
              'bg-blue-500'
            }`}></div>
            <span className="text-xs font-medium text-gray-600 capitalize">
              {user.role === 'coe' ? 'Controller' : user.role}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{user.department}</p>
        </div>
      </div>
    </aside>
  );
}
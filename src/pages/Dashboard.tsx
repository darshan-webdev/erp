import React from 'react';
import DashboardStats from '../components/Dashboard/DashboardStats';
import RecentActivity from '../components/Dashboard/RecentActivity';
import UpcomingExams from '../components/Dashboard/UpcomingExams';
import QuickActions from '../components/Dashboard/QuickActions';
import AnalyticsChart from '../components/Analytics/AnalyticsChart';
import { useAuth } from '../context/AuthContext';

// Mock data for charts
const passRateData = [
  { name: 'CS101', value: 85 },
  { name: 'CS102', value: 92 },
  { name: 'CS201', value: 78 },
  { name: 'CS202', value: 88 },
  { name: 'CS301', value: 82 },
  { name: 'CS302', value: 90 }
];

const gradeDistribution = [
  { name: 'A+', value: 45 },
  { name: 'A', value: 120 },
  { name: 'B+', value: 180 },
  { name: 'B', value: 150 },
  { name: 'C+', value: 95 },
  { name: 'C', value: 60 }
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.name}
        </h1>
        <p className="text-gray-600 mt-1">
          {user?.role === 'coe' 
            ? 'Manage examinations and oversee academic operations' 
            : user?.role === 'faculty'
            ? 'Create questions, evaluate papers, and track student progress'
            : 'Coordinate exam logistics and ensure smooth operations'}
        </p>
      </div>

      {/* Stats */}
      <DashboardStats />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <UpcomingExams />
          
          {/* Analytics Charts */}
          {user?.role === 'coe' && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <AnalyticsChart
                type="bar"
                data={passRateData}
                title="Pass Rates by Subject"
                xAxisKey="name"
                yAxisKey="value"
              />
              <AnalyticsChart
                type="pie"
                data={gradeDistribution}
                title="Grade Distribution"
                yAxisKey="value"
              />
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <QuickActions />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
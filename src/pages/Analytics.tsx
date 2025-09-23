import React from 'react';
import AnalyticsChart from '../components/Analytics/AnalyticsChart';
import { TrendingUp, Users, Award, BookOpen } from 'lucide-react';

const performanceData = [
  { name: 'CS101', value: 85, students: 120 },
  { name: 'CS102', value: 92, students: 98 },
  { name: 'CS201', value: 78, students: 156 },
  { name: 'CS202', value: 88, students: 143 },
  { name: 'CS301', value: 82, students: 89 },
  { name: 'CS302', value: 90, students: 76 }
];

const gradeDistribution = [
  { name: 'A+', value: 45 },
  { name: 'A', value: 120 },
  { name: 'B+', value: 180 },
  { name: 'B', value: 150 },
  { name: 'C+', value: 95 },
  { name: 'C', value: 60 },
  { name: 'F', value: 25 }
];

const monthlyTrends = [
  { name: 'Jan', value: 87 },
  { name: 'Feb', value: 89 },
  { name: 'Mar', value: 84 },
  { name: 'Apr', value: 91 },
  { name: 'May', value: 88 },
  { name: 'Jun', value: 93 }
];

const difficultyAnalysis = [
  { name: 'Easy Questions', value: 89 },
  { name: 'Medium Questions', value: 76 },
  { name: 'Hard Questions', value: 62 }
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Analytics & Reporting</h1>
        <p className="text-gray-600 mt-1">
          Comprehensive insights into examination performance and trends
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Overall Pass Rate</p>
              <p className="text-3xl font-bold text-green-600 mt-2">87.5%</p>
              <p className="text-sm text-green-600 mt-1">+2.3% from last term</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">2,847</p>
              <p className="text-sm text-blue-600 mt-1">+156 new enrollments</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average GPA</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">7.8</p>
              <p className="text-sm text-purple-600 mt-1">+0.2 improvement</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Courses</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">24</p>
              <p className="text-sm text-orange-600 mt-1">6 new courses added</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <BookOpen className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          type="bar"
          data={performanceData}
          title="Subject-wise Pass Rates"
          xAxisKey="name"
          yAxisKey="value"
        />
        
        <AnalyticsChart
          type="pie"
          data={gradeDistribution}
          title="Overall Grade Distribution"
          yAxisKey="value"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          type="line"
          data={monthlyTrends}
          title="Monthly Performance Trends"
          xAxisKey="name"
          yAxisKey="value"
        />
        
        <AnalyticsChart
          type="bar"
          data={difficultyAnalysis}
          title="Performance by Question Difficulty"
          xAxisKey="name"
          yAxisKey="value"
        />
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Subjects</h3>
          <div className="space-y-3">
            {performanceData
              .sort((a, b) => b.value - a.value)
              .slice(0, 5)
              .map((subject, index) => (
                <div key={subject.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                    }`}>
                      {index + 1}
                    </span>
                    <span className="font-medium text-gray-900">{subject.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">{subject.value}%</div>
                    <div className="text-xs text-gray-500">{subject.students} students</div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium text-green-800">Improvement Trend</span>
              </div>
              <p className="text-sm text-green-700">
                Overall performance has improved by 5.2% compared to the previous semester.
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="font-medium text-blue-800">High Achievers</span>
              </div>
              <p className="text-sm text-blue-700">
                23% of students achieved A+ grades, the highest percentage in 3 years.
              </p>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="font-medium text-orange-800">Areas for Focus</span>
              </div>
              <p className="text-sm text-orange-700">
                CS201 shows lower performance - consider additional support resources.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
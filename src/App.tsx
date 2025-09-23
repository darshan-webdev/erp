import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Exams from './pages/Exams';
import Questions from './pages/Questions';
import Analytics from './pages/Analytics';
import HallTickets from './pages/HallTickets';

function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="exams" element={<Exams />} />
              <Route path="questions" element={<Questions />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="hall-tickets" element={<HallTickets />} />
              <Route path="papers" element={<div className="p-6"><h1 className="text-2xl font-bold">Paper Management</h1><p className="text-gray-600 mt-2">Create and manage question papers for examinations.</p></div>} />
              <Route path="attendance" element={<div className="p-6"><h1 className="text-2xl font-bold">Attendance Tracking</h1><p className="text-gray-600 mt-2">Monitor student attendance during examinations.</p></div>} />
              <Route path="seating" element={<div className="p-6"><h1 className="text-2xl font-bold">Seating Arrangement</h1><p className="text-gray-600 mt-2">Organize seating plans for examination halls.</p></div>} />
              <Route path="evaluation" element={<div className="p-6"><h1 className="text-2xl font-bold">Evaluation Management</h1><p className="text-gray-600 mt-2">Evaluate answer sheets and manage grading.</p></div>} />
              <Route path="results" element={<div className="p-6"><h1 className="text-2xl font-bold">Result Management</h1><p className="text-gray-600 mt-2">Publish and manage examination results.</p></div>} />
              <Route path="notifications" element={<div className="p-6"><h1 className="text-2xl font-bold">Notifications</h1><p className="text-gray-600 mt-2">Manage system notifications and alerts.</p></div>} />
              <Route path="security" element={<div className="p-6"><h1 className="text-2xl font-bold">Security Management</h1><p className="text-gray-600 mt-2">Monitor system security and access controls.</p></div>} />
              <Route path="settings" element={<div className="p-6"><h1 className="text-2xl font-bold">System Settings</h1><p className="text-gray-600 mt-2">Configure system preferences and settings.</p></div>} />
            </Route>
          </Routes>
        </Router>
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
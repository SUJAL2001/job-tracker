import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate } from
'react-router-dom';
import { ToastProvider } from './components/Toast';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { Dashboard } from './pages/Dashboard';
import { ResumeMatch } from './pages/ResumeMatch';
import { Companies } from './pages/Companies';
import { Settings } from './pages/Settings';
export function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="flex h-screen w-full bg-slate-50 overflow-hidden text-slate-900 font-sans">
          <Sidebar />
          <div className="flex-1 flex flex-col h-full overflow-hidden">
            <TopNav />
            <main className="flex-1 overflow-y-auto p-6">
              <Routes>
                <Route
                  path="/"
                  element={<Navigate to="/dashboard" replace />} />
                
                <Route path="/dashboard" element={<Dashboard />} />
                <Route
                  path="/all-jobs"
                  element={<Dashboard defaultFilter="all" />} />
                
                <Route
                  path="/matched-jobs"
                  element={<Dashboard defaultFilter="matched" />} />
                
                <Route path="/companies" element={<Companies />} />
                <Route path="/resume-match" element={<ResumeMatch />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ToastProvider>);

}
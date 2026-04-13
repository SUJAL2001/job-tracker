import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Briefcase,
  CheckSquare,
  Building2,
  FileText,
  Settings,
  Target } from
'lucide-react';
const navItems = [
{
  name: 'Dashboard',
  path: '/dashboard',
  icon: LayoutDashboard
},
{
  name: 'All Jobs',
  path: '/all-jobs',
  icon: Briefcase
},
{
  name: 'Matched Jobs',
  path: '/matched-jobs',
  icon: CheckSquare
},
{
  name: 'Companies',
  path: '/companies',
  icon: Building2
},
{
  name: 'Resume Match',
  path: '/resume-match',
  icon: FileText
},
{
  name: 'Settings',
  path: '/settings',
  icon: Settings
}];

export function Sidebar() {
  return (
    <div className="w-[240px] bg-navy flex flex-col h-full text-slate-300 shrink-0">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
          <Target className="w-5 h-5 text-white" />
        </div>
        <span className="text-white font-bold text-lg tracking-tight">
          JobTracker Pro
        </span>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1">
        {navItems.map((item) =>
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
              ${isActive ? 'bg-navy-800 text-white' : 'hover:bg-navy-800/50 hover:text-white'}
            `}>
          
            <item.icon className="w-5 h-5 opacity-70" />
            {item.name}
          </NavLink>
        )}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-800">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-navy-800/50 cursor-pointer transition-colors">
          <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center shrink-0 overflow-hidden">
            <img
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              alt="User avatar"
              className="w-full h-full object-cover" />
            
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              Alex Developer
            </p>
            <p className="text-xs text-slate-400 truncate">alex@example.com</p>
          </div>
          <Settings className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </div>);

}
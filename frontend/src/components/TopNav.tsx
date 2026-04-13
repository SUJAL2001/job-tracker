import React, { useEffect, useState, useRef } from 'react';
import {
  Search,
  Bell,
  RefreshCw,
  Moon,
  Briefcase,
  Building2 } from
'lucide-react';
import { useToast } from './Toast';
import { jobs, companies } from '../data/mockData';
import { motion, AnimatePresence } from 'framer-motion';
export function TopNav() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { addToast } = useToast();
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      addToast('↻ Refresh complete — 47 jobs updated', 'info');
    }, 1500);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
      searchRef.current &&
      !searchRef.current.contains(event.target as Node))
      {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const filteredJobs = jobs.
  filter((j) => j.title.toLowerCase().includes(searchQuery.toLowerCase())).
  slice(0, 3);
  const filteredCompanies = companies.
  filter((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase())).
  slice(0, 2);
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-30 relative">
      <div className="relative" ref={searchRef}>
        <div
          className={`flex items-center gap-2 text-slate-500 bg-slate-100 px-3 py-2 rounded-lg w-80 border transition-colors ${isSearchFocused ? 'border-emerald-500 bg-white ring-2 ring-emerald-500/20' : 'border-transparent'}`}>
          
          <Search className="w-4 h-4" />
          <input
            type="text"
            placeholder="Search jobs, companies, skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            className="bg-transparent border-none outline-none text-sm w-full text-slate-900 placeholder:text-slate-500" />
          
          {searchQuery &&
          <button
            onClick={() => setSearchQuery('')}
            className="text-slate-400 hover:text-slate-600">
            
              <span className="text-xs font-medium bg-slate-200 px-1.5 py-0.5 rounded">
                ESC
              </span>
            </button>
          }
        </div>

        <AnimatePresence>
          {isSearchFocused && searchQuery &&
          <motion.div
            initial={{
              opacity: 0,
              y: 10
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: 10
            }}
            className="absolute top-full left-0 mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
            
              <div className="p-2">
                {filteredJobs.length > 0 &&
              <div className="mb-2">
                    <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Jobs
                    </div>
                    {filteredJobs.map((job) =>
                <div
                  key={job.id}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                  
                        <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-500">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">
                            {job.title}
                          </div>
                          <div className="text-xs text-slate-500">
                            {job.companyName}
                          </div>
                        </div>
                      </div>
                )}
                  </div>
              }

                {filteredCompanies.length > 0 &&
              <div>
                    <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Companies
                    </div>
                    {filteredCompanies.map((company) =>
                <div
                  key={company.id}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-slate-50 rounded-lg cursor-pointer">
                  
                        <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-500">
                          <Building2 className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">
                            {company.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {company.openRoles} open roles
                          </div>
                        </div>
                      </div>
                )}
                  </div>
              }

                {filteredJobs.length === 0 &&
              filteredCompanies.length === 0 &&
              <div className="px-3 py-4 text-center text-sm text-slate-500">
                      No results found for "{searchQuery}"
                    </div>
              }
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-md transition-colors border border-slate-200">
          
          <RefreshCw
            className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-500' : ''}`} />
          
          Refresh Jobs
        </button>

        <div className="h-6 w-px bg-slate-200 mx-1"></div>

        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
          <Moon className="w-5 h-5" />
        </button>

        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
      </div>
    </header>);

}
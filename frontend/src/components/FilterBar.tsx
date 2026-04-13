import React, { useState } from 'react';
import {
  Search,
  LayoutGrid,
  List,
  SlidersHorizontal,
  Globe,
  DollarSign } from
'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
interface FilterBarProps {
  viewMode: 'card' | 'table';
  setViewMode: (mode: 'card' | 'table') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}
export function FilterBar({
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery
}: FilterBarProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  return (
    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col gap-3 transition-all">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-[300px]">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search roles, companies, tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
            
          </div>

          <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
            <option value="">All Companies</option>
            <option value="Google">Google</option>
            <option value="Meta">Meta</option>
            <option value="Stripe">Stripe</option>
          </select>

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-sm transition-colors ${showAdvanced ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'}`}>
            
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <span>Sort by:</span>
            <select className="px-2 py-1.5 bg-transparent font-medium border-none outline-none cursor-pointer hover:text-slate-900 focus:ring-0">
              <option value="score">Match Score</option>
              <option value="date">Date Posted</option>
              <option value="salary">Salary (High to Low)</option>
            </select>
          </div>

          <div className="h-6 w-px bg-slate-200 mx-1"></div>

          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              onClick={() => setViewMode('card')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'card' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}>
              
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-md transition-colors ${viewMode === 'table' ? 'bg-white shadow-sm text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}>
              
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showAdvanced &&
        <motion.div
          initial={{
            height: 0,
            opacity: 0
          }}
          animate={{
            height: 'auto',
            opacity: 1
          }}
          exit={{
            height: 0,
            opacity: 0
          }}
          className="overflow-hidden">
          
            <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-500">
                  Work Model
                </label>
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm cursor-pointer hover:bg-slate-100">
                    <input
                    type="checkbox"
                    className="rounded text-emerald-500 focus:ring-emerald-500" />
                  
                    <Globe className="w-3.5 h-3.5 text-slate-400" />
                    Remote Only
                  </label>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-slate-500">
                  Experience Level
                </label>
                <select className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
                  <option value="">Any Level</option>
                  <option value="Junior">Junior</option>
                  <option value="Mid">Mid-Level</option>
                  <option value="Senior">Senior</option>
                  <option value="Staff">Staff/Principal</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5 flex-1 min-w-[200px] max-w-xs">
                <label className="text-xs font-medium text-slate-500 flex justify-between">
                  <span>Minimum Salary</span>
                  <span className="text-slate-900 font-medium">$120k+</span>
                </label>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-slate-400" />
                  <input
                  type="range"
                  min="50"
                  max="300"
                  defaultValue="120"
                  className="w-full accent-emerald-500" />
                
                </div>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}
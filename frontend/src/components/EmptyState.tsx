import React from 'react';
import { SearchX, RefreshCw } from 'lucide-react';
interface EmptyStateProps {
  onRefresh: () => void;
}
export function EmptyState({ onRefresh }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-xl border border-slate-200 border-dashed">
      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
        <SearchX className="w-10 h-10 text-slate-300" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-1">
        No jobs found
      </h3>
      <p className="text-slate-500 mb-6 max-w-sm">
        We couldn't find any jobs matching your current filters. Try adjusting
        your search criteria or refresh the list.
      </p>
      <button
        onClick={onRefresh}
        className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 font-medium rounded-lg hover:bg-emerald-100 transition-colors">
        
        <RefreshCw className="w-4 h-4" />
        Refresh Jobs
      </button>
    </div>);

}
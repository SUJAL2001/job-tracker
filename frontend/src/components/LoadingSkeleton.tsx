import React from 'react';
export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) =>
      <div
        key={i}
        className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm h-[260px] flex flex-col">
        
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 animate-pulse"></div>
              <div>
                <div className="h-5 w-32 bg-slate-200 rounded animate-pulse mb-2"></div>
                <div className="h-3 w-20 bg-slate-100 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 animate-pulse"></div>
          </div>

          <div className="flex gap-2 mb-4">
            <div className="h-6 w-24 bg-slate-100 rounded-full animate-pulse"></div>
            <div className="h-6 w-20 bg-slate-100 rounded-full animate-pulse"></div>
          </div>

          <div className="mb-5 flex-1">
            <div className="h-3 w-24 bg-slate-100 rounded animate-pulse mb-3"></div>
            <div className="flex flex-wrap gap-2">
              <div className="h-6 w-16 bg-slate-100 rounded-md animate-pulse"></div>
              <div className="h-6 w-20 bg-slate-100 rounded-md animate-pulse"></div>
              <div className="h-6 w-14 bg-slate-100 rounded-md animate-pulse"></div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-slate-100 mt-auto">
            <div className="h-3 w-12 bg-slate-100 rounded animate-pulse"></div>
            <div className="flex gap-2">
              <div className="h-8 w-16 bg-slate-100 rounded-lg animate-pulse"></div>
              <div className="h-8 w-16 bg-slate-200 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      )}
    </div>);

}
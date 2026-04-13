import React, { useEffect, useState } from 'react';
import { StatsBar } from '../components/StatsBar';
import { FilterBar } from '../components/FilterBar';
import { JobCard } from '../components/JobCard';
import { JobTable } from '../components/JobTable';
import { EmptyState } from '../components/EmptyState';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { JobDetailPanel } from '../components/JobDetailPanel';
import { jobs as mockJobs, activityFeed, Job } from '../data/mockData';
import { useToast } from '../components/Toast';
import { Activity, Briefcase, CheckCircle, Building2 } from 'lucide-react';
interface DashboardProps {
  defaultFilter?: 'all' | 'matched';
}
export function Dashboard({ defaultFilter = 'all' }: DashboardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const { addToast } = useToast();
  // Simulate initial loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [defaultFilter]);
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      addToast('✓ 3 new jobs found at Google', 'success');
    }, 1500);
  };
  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
    setIsPanelOpen(true);
  };
  // Filter logic
  let filteredJobs = mockJobs.filter(
    (job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  if (defaultFilter === 'matched') {
    filteredJobs = filteredJobs.filter((job) => job.matchScore >= 80);
  }
  const strongMatchesCount = mockJobs.filter((j) => j.matchScore >= 80).length;
  return (
    <div className="max-w-[1600px] mx-auto pb-10 flex gap-8">
      <div className="flex-1 min-w-0">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            {defaultFilter === 'matched' ? 'Strong Matches' : 'Job Dashboard'}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Track and manage your job applications.
          </p>
        </div>

        <StatsBar
          totalJobs={mockJobs.length}
          strongMatches={strongMatchesCount}
          applied={4}
          lastRefreshed="10 mins ago"
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing} />
        

        <FilterBar
          viewMode={viewMode}
          setViewMode={setViewMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery} />
        

        {isLoading ?
        <LoadingSkeleton /> :
        filteredJobs.length === 0 ?
        <EmptyState onRefresh={() => setSearchQuery('')} /> :
        viewMode === 'card' ?
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredJobs.map((job) =>
          <JobCard
            key={job.id}
            job={job}
            onViewDetails={handleViewDetails} />

          )}
          </div> :

        <JobTable jobs={filteredJobs} onViewDetails={handleViewDetails} />
        }
      </div>

      {/* Activity Timeline Sidebar */}
      <div className="hidden lg:block w-80 shrink-0">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 sticky top-6">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-500" />
            Recent Activity
          </h3>

          <div className="relative border-l-2 border-slate-100 ml-3 space-y-6">
            {activityFeed.map((item, index) =>
            <div key={item.id} className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center">
                  {item.type === 'new_job' &&
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                }
                  {item.type === 'match' &&
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                }
                  {item.type === 'application' &&
                <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                }
                  {item.type === 'company_update' &&
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                }
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 mb-1">
                    {item.description}
                  </p>
                  <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                    {item.timestamp}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <JobDetailPanel
        job={selectedJob}
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)} />
      
    </div>);

}
import React from 'react';
import { Eye, ExternalLink, Bookmark } from 'lucide-react';
import { Job } from '../data/mockData';
import { SkillPill } from './SkillPill';
interface JobTableProps {
  jobs: Job[];
  onViewDetails: (job: Job) => void;
}
export function JobTable({ jobs, onViewDetails }: JobTableProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-500';
    if (score >= 60) return 'bg-amber-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500 font-semibold">
              <th className="px-5 py-4">Company & Role</th>
              <th className="px-5 py-4">Match Score</th>
              <th className="px-5 py-4">Location</th>
              <th className="px-5 py-4">Skills Match</th>
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {jobs.map((job) =>
            <tr
              key={job.id}
              className="hover:bg-slate-50/50 transition-colors group">
              
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm shrink-0"
                    style={{
                      backgroundColor: job.companyColor
                    }}>
                    
                      {job.companyName.charAt(0)}
                    </div>
                    <div>
                      <p
                      className="font-semibold text-slate-900 text-sm group-hover:text-emerald-600 transition-colors cursor-pointer"
                      onClick={() => onViewDetails(job)}>
                      
                        {job.title}
                      </p>
                      <p className="text-xs text-slate-500">
                        {job.companyName}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-slate-700 w-8">
                      {job.matchScore}%
                    </span>
                    <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                      className={`h-full rounded-full ${getScoreColor(job.matchScore)}`}
                      style={{
                        width: `${job.matchScore}%`
                      }} />
                    
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-slate-600">
                    {job.location.split(',')[0]}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {job.skillsMatched.slice(0, 2).map((skill) =>
                  <SkillPill key={skill} skill={skill} type="matched" />
                  )}
                    {job.skillsMissing.length > 0 &&
                  <span className="text-xs text-slate-400 ml-1">
                        +{job.skillsMissing.length} missing
                      </span>
                  }
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-slate-500">
                    {job.postedDate}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                    onClick={() => onViewDetails(job)}
                    className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
                    title="View Details">
                    
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                    className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    title="Apply Now">
                    
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <button
                    className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-md transition-colors"
                    title="Bookmark">
                    
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>);

}